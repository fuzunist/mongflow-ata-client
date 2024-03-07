import React, { useState } from "react";
import CreateProductionForm from "@/components/AntForm/CreateProductionForm";
import { useUser } from "@/store/hooks/user";
import { useTranslation } from "react-i18next";
import { message } from "antd";
import {
  addShiftsForOrderToDB,
  addShiftsForProcessToDB,
} from "@/services/shift";
import { v4 as uuidv4 } from "uuid";

const CreateProduction = ({ closeModal }) => {
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

  console.log("Productions for customer in the processProductionsForCustomers funtion in the CreateProduction.jsx:", productionsForCustomers);

  for (let production of productionsForCustomers) {
    // Convert and send each production to DB
    const formattedProduction = formatProductionForCustomerDB(production, values);
    console.log("Formatted production for customer before sending to addShiftsForOrderToDB:", formattedProduction);
    const response = await addShiftsForOrderToDB(access_token, formattedProduction);
    if (!response || response.error) {
      throw new Error(response.message || "Error adding production for customer");
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
    const formattedProduction = formatProductionForOurselvesDB(production, values);
    console.log("Formatted production for ourselves before sending to addShiftsForProcessToDB:", formattedProduction);
    const response = await addShiftsForProcessToDB(access_token, formattedProduction);
    console.error("Failed to add shifts for process:", error.response.data);
    if (!response || response.error) {
      throw new Error(response.message || "Error adding production for ourselves");
    }
  }
};



const formatProductionForCustomerDB = (production, values) => {
  
  const consumableProductsObj = production.consumableProducts.reduce((acc, quantity, index) => {
    if (quantity !== undefined) {
      
      const productId = index ;
      acc[productId.toString()] = quantity;
    }
    return acc;
  }, {});

  return {
    id: uuidv4(),
    date: values.date.format("YYYY-MM-DD"),
    shift_number: parseInt(values.shift, 10),
    production_recipe_id: production.production_recipe_id,
    quantity: parseInt(production.quantity, 10),
    wastage_percentage: parseFloat(production.wastage) / 100,
    second_quality_stocks: JSON.stringify(production.secondQualityStocks.reduce((acc, quantity, index) => {
      if (quantity !== undefined) {
        const productId = index; 
        acc[productId.toString()] = quantity;
      }
      return acc;
    }, {})),
    consumable_products: JSON.stringify(consumableProductsObj),
  };
};




const formatProductionForOurselvesDB = (production, values) => {
    // Preparing the used_products object
    const usedProductsObj = {
      [production.used_product.toString()]: production.usage_quantity
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






 

  return (
    <CreateProductionForm
      onSubmit={handleSubmit}
      error={error}
      closeModal={closeModal}
    />
  );
};

export default CreateProduction;
