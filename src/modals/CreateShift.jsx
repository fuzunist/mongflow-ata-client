import React, { useState } from "react";
import CreateShiftForm from "@/components/AntForm/CreateShiftForm";
import { useUser } from "@/store/hooks/user";
import { useTranslation } from "react-i18next";
import { App } from "antd";
import {
  addShiftToDB,
  addShiftsForOrderToDB,
  addShiftsForProcessToDB,
} from "@/services/shift";
import { v4 as uuidv4 } from "uuid";
import {
  useConsumableProductStocks,
  useProduct,
  useProducts,
  useRawMaterialStocks,
  useSecondQualityProductStocks,
} from "@/store/hooks/apps";
const CreateShift = ({ closeModal }) => {
  const rawMaterialStocks = useRawMaterialStocks();
  const consumableStocks = useConsumableProductStocks();
  const secondQualityStocks = useSecondQualityProductStocks();
  const products = useProducts();
  const { message } = App.useApp();

  const { t } = useTranslation();
  const user = useUser();
  const [error, setError] = useState("");

  const handleSubmit = async (values) => {
    setError(""); // Reset error state before proceeding

    const { access_token } = user.tokens; // Assuming the use of an access token for API calls

    // No need to filter here, as we've split the logic below

    try {
      // Process productions for customers (orders)
      await processProductionsForCustomers(values, access_token);

      // Process productions for ourselves
      await processProductionsForOurselves(values, access_token);

      console.log("All shifts added successfully");
      message.success(t("All shifts added successfully"));
      closeModal(); // Close modal on success
    } catch (err) {
      setError(err.message || "An error occurred"); // Set error state to display the error message
      console.error("Error in creating shift:", err); // Log the error
      message.error(t("An error occurred while saving the shift")); // Show error message
    }
  };

  // Helper function to process productions for customers
  const processProductionsForCustomers = async (values, access_token) => {
    const productionsForCustomers = values.productions.filter(
      (production) => production.type === "customer"
    );

    for (let production of productionsForCustomers) {
      // Convert and send each production to DB
      const formattedProduction = formatProductionForCustomerDB(
        production,
        values
      );
      const response = await addShiftsForOrderToDB(
        access_token,
        formattedProduction
      );
      if (!response || response.error) {
        throw new Error(
          response.message || "Error adding production for customer"
        );
      }
    }
  };

  // Helper function to process productions for ourselves
  const processProductionsForOurselves = async (values, access_token) => {
    const productionsForOurselves = values.productions.filter(
      (production) => production.type === "ourselves"
    );

    for (let production of productionsForOurselves) {
      // Convert and send each production to DB
      const formattedProduction = formatProductionForOurselvesDB(
        production,
        values
      );
      console.log(
        "Formatted production for ourselves before sending to addShiftsForProcessToDB:",
        formattedProduction
      );
      const response = await addShiftsForProcessToDB(
        access_token,
        formattedProduction
      );
      if (!response || response?.error) {
        throw new Error(
          response?.message || "Error adding production for ourselves"
        );
      }
    }
  };

  const formatProductionForCustomerDB = (production, values) => {
    const consumableProductsObj = production.consumableProducts.reduce(
      (acc, quantity, index) => {
        if (quantity !== undefined) {
          const productId = index;
          acc[productId.toString()] = quantity;
        }
        return acc;
      },
      {}
    );

    return {
      id: uuidv4(),
      date: values.date.format("YYYY-MM-DD"),
      shift_number: parseInt(values.shift, 10),
      production_recipe_id: production.production_recipe_id,
      quantity: parseInt(production.quantity, 10),
      wastage_percentage: parseFloat(production.wastage) / 100,
      second_quality_stocks: JSON.stringify(
        production.secondQualityStocks.reduce((acc, quantity, index) => {
          if (quantity !== undefined) {
            const productId = index;
            acc[productId.toString()] = quantity;
          }
          return acc;
        }, {})
      ),
      consumable_products: JSON.stringify(consumableProductsObj),
    };
  };

  const formatProductionForOurselvesDB = (production, values) => {
    // Preparing the used_products object
    const usedProductsObj = {
      [production.used_product.toString()]: production.usage_quantity,
    };
    return {
      id: uuidv4(), // Generate a UUID for each production
      date: values.date.format("YYYY-MM-DD"), // Format date from DatePicker
      shift_number: parseInt(values.shift, 10), // Ensure shift number is an integer
      // Collect used products and their quantities
      used_products: JSON.stringify(usedProductsObj),
      output_product_id: production.output_product, // Assuming `output_product` contains the selected output product id
      output_quantity: parseInt(production.output_quantity),
      wastage_percentage: parseFloat(production.wastage) / 100, // Convert wastage to float (e.g., 15 to 0.15)
      consumable_products: JSON.stringify(production.consumableProducts),
    };
  };

  const getStockArray = (stocks, products) => {
    console.log("products: cbb:", products);
    const filteredProducts = Object.entries(products)
      .filter(([_, value]) => value !== undefined && value !== "")
      .map(([key, value]) => ({
        product_id: parseInt(key),
        production: parseInt(value),
      }));

    console.log("filteredProducts: cbb:", filteredProducts);
    const newArr = filteredProducts
      .map(({ product_id, production }) => {
        if (stocks?.length !== 0) {
          const stockItem = stocks.find(
            (item) => item.product_id === product_id
          );
          if (stockItem) {
            return {
              product_id: product_id,
              quantity: stockItem.quantity,
              production: production,
              price: stockItem.price,
              product_name: stockItem.product_name,
            };
          } else {
            return null;
          }
        } else {
          return {
            product_id: product_id,
            production: production,
          };
        }
      })
      .filter((item) => item !== null);

    console.log(newArr);

    return newArr;
  };

  const onFinish = async (values) => {
    setError("");
    const uuid = uuidv4();
    console.log("values of craete shifts", values);

    const orderproductions = values.productions.filter(
      (item) => item.type === "orderproduction"
    );
    const materialproductions = values.productions.filter(
      (item) => item.type === "materialproduction"
    );

    const materialShifts = {
      ...values,
      productions: materialproductions,
      id: uuid,
    };
    const orderShifts = { ...values, productions: orderproductions, id: uuid };

    if (materialproductions?.length !== 0) {
      if (consumableStocks?.length === 0) {
        return setError("Yeterli Filtre/Başlık Stoğu Yok!");
      }

      materialShifts?.productions?.forEach((production) => {
        const usedRawMaterialId = production.used_product;
        const usedRawMaterialQuantity = production.usage_quantity;

        const rawMaterial = rawMaterialStocks.find(
          (item) => item.product_id === usedRawMaterialId
        );
        const rawMaterialName = products?.find(
          (item) => item.product_id === usedRawMaterialId
        ).product_name;
        const rawMaterialStock = rawMaterial?.quantity;

        if (!rawMaterialStock) {
          return setError(`Hata! Stokta ${rawMaterialName} yok! `);
        }
        if (usedRawMaterialQuantity > rawMaterialStock) {
          console.log("237");
          return setError(
            `Hata! Stoktaki ${rawMaterialName} miktarı ${rawMaterialStock}. Kullanılan miktar: ${usedRawMaterialQuantity} `
          );
        }
        const newUsedProducts = getStockArray(rawMaterialStocks, {
          [usedRawMaterialId]: usedRawMaterialQuantity,
        });
        const usedProductsCosts = newUsedProducts.reduce(
          (acc, val) => acc + val?.price * val?.production,
          0
        );
        // {id: usedRawMaterialId, production: usedRawMaterialQuantity, quantity:rawMaterialStock }

        production.usedProducts = newUsedProducts;
        production.usedProductsCosts = isNaN(usedProductsCosts)
          ? 0
          : usedProductsCosts;

        console.log("rawmat stocks", rawMaterialStocks);
        if (production.consumableProducts) {
          const newConsumableProducts = getStockArray(
            consumableStocks,
            production.consumableProducts
          );
          newConsumableProducts.forEach((item) => {
            const product = consumableStocks.find(
              (prod) => prod.product_id === item.product_id
            );
            const productName = product?.product_name;
            const productStock = product?.quantity;
            if (item.quantity < item.production) {
              console.log("268");
              return setError(
                `Hata! Stoktaki ${productName} miktarı ${productStock}. Girilen miktar: ${item.production} `
              );
            }
          });
          const consumableProductsCosts = newConsumableProducts.reduce(
            (acc, val) => acc + val?.price * val?.production,
            0
          );

          production.consumableProducts = newConsumableProducts;
          production.consumableProductsCosts = consumableProductsCosts;
        }
      });
    }

    if (orderproductions?.length !== 0) {
      if (consumableStocks?.length === 0) {
        return setError("Yeterli Filtre/Başlık Stoğu Yok!");
      }
      orderShifts?.productions?.forEach((production) => {
        if (production.consumableProducts) {
          const newConsumableProducts = getStockArray(
            consumableStocks,
            production.consumableProducts
          );
          newConsumableProducts.forEach((item) => {
            const product = consumableStocks.find(
              (prod) => prod.product_id === item.product_id
            );
            const productName = product?.product_name;
            const productStock = product?.quantity;
            if (item.quantity < item.production) {
              console.log("301");
              return setError(
                `Hata! Stoktaki ${productName} miktarı ${productStock}. Girilen miktar: ${item.production} `
              );
            }
          });
          const consumableProductsCosts = newConsumableProducts.reduce(
            (acc, val) => acc + val?.price * val?.production,
            0
          );
          production.consumableProductsCosts = consumableProductsCosts;

          production.consumableProducts = newConsumableProducts;
        }

        if (production.secondQualityStocks) {
          const newSecondQProducts = getStockArray(
            secondQualityStocks,
            production.secondQualityStocks
          );
          production.secondQualityStocks = newSecondQProducts;
        }
      });
    }

    if (error === "") {
      try {
        const data = {
          id: uuid,
          date: values.date.format("YYYY-MM-DD"),
          shift: values.shift,
          materialproductions: materialShifts.productions,
          orderproductions: orderShifts.productions,
        };
        console.log("data of addShiftToDB", data);

        const response = await addShiftToDB(user.tokens.access_token, data);

        console.log("response of addShiftToDB::: cvx", response);

        if (response?.error) {
          console.log(response?.error);
          return setError(response.error);
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      console.log("erorr in form", error);
    }
  };

  return (
    <CreateShiftForm
      onSubmit={onFinish}
      error={error}
      closeModal={closeModal}
    />
  );
};

export default CreateShift;
