import React, { useEffect, useState } from "react";
import { Form, Input, Button, Select, DatePicker, Space, Switch } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import moment from "moment";
import { useTranslation } from "react-i18next";
import {
  useProducts,
  useOrders,
  useProductionRecipes,
} from "@/store/hooks/apps"; // Assuming this hook fetches all products.
import { Row, Col } from "antd";
import { Typography } from "antd";
import FormError from "../FormikForm/FormError";
import locale from "antd/es/date-picker/locale/tr_TR";

const CreateShiftForm = ({
  onSubmit,
  closeModal,
  editing = false,
  selected,
  error
}) => {
  const [form] = Form.useForm();
  const { t } = useTranslation();
  const products = useProducts();
  const orders = useOrders(); // Fetch orders
  const productionRecipes = useProductionRecipes(); // Fetch production recipes
  const { Title } = Typography;

  // State for the toggle
  const [isProductionForCustomer, setIsProductionForCustomer] = useState(true);
  const [selectedProductsAttributes, setSelectedProductsAttributes] = useState(
    {}
  );
  const [filteredOrders, setFilteredOrders] = useState({}); // State to store filtered orders based on selected product
  const [filteredProductionRecipes, setFilteredProductionRecipes] = useState(
    {}
  );

  // Filter for second-quality stocks
  const secondQualityStocks = products.filter(
    (product) => product.product_type === 3
  );

  console.log("Second quality stocks:", secondQualityStocks);

  // Filter for consumable products
  const consumableProducts = products.filter(
    (product) => product.product_type === 4
  );

  console.log("Consumable products:", consumableProducts);

  // Filter for raw material products
  const rawMaterialProducts = products.filter(
    (product) => product.product_type === 2
  );

  // Filter for recipe material products
  const recipeMaterialProducts = products.filter(
    (product) => product.product_type === 1
  );
  const lastProducts = products.filter(
    (product) => product.product_type === 0
  );

  useEffect(() => {
    console.log("Initial 'selected' object:", selected);
    console.log("Initial 'products' array:", products);

    if (editing && selected) {
      const presetAttributes = {};
      console.log("Selected productions:", selected.productions);
      selected.productions.forEach((prod, index) => {
        console.log(`Production ${index}:`, prod);
        const product = products.find((p) => p.product_id === prod.product_id);
        console.log(`Matching product for production ${index}:`, product);
        // Assuming there's a misunderstanding in how attributes are stored/accessed:
        if (product && product.attributes) {
          console.log(
            `Attributes for product ${product.product_id}:`,
            product.attributes
          );
          presetAttributes[index] = product.attributes.map((attribute) => {
            console.log(`Inspecting attribute ${attribute.id}:`, attribute);
            // Here we assume prod.attributes is an array of {id, value} objects
            const selectedAttribute = prod.attributes.find(
              (attr) => attr.id === attribute.id
            );
            console.log(
              `Selected attribute value for ${attribute.id}:`,
              selectedAttribute
            );
            return {
              ...attribute,
              selectedValue: selectedAttribute ? selectedAttribute.value : null,
            };
          });
        }
      });
      setSelectedProductsAttributes(presetAttributes);
      console.log("Preset attributes after processing:", presetAttributes);

      // Further form initialization...
    } else {
      form.resetFields();
    }
  }, [editing, selected, form, products]);

  const handleToggleChange = (checked) => {
    setIsProductionForCustomer(checked);
  };

  const handleProductChange = (productId, index) => {
    console.log(`Product ID changed to: ${productId} at index: ${index}`);
    const selectedProduct = products.find(
      (product) => product.product_id === productId
    );
    console.log(`Selected product:`, selectedProduct);
    const attributes = selectedProduct ? selectedProduct.attributes : [];
    console.log(`Attributes of selected product:`, attributes);
    const newSelectedProductsAttributes = {
      ...selectedProductsAttributes,
      [index]: attributes,
    };
    setSelectedProductsAttributes(newSelectedProductsAttributes);
    console.log(
      `Updated selectedProductsAttributes:`,
      newSelectedProductsAttributes
    );

    // New logic to filter orders based on the selected product
    const relatedOrders = orders.filter((order) =>
      order.products.some((p) => p.product_id === productId)
    );
    setFilteredOrders({ ...filteredOrders, [index]: relatedOrders });

    // Optionally reset the attributes in the form to ensure the user selects new values
    const productions = form.getFieldValue("productions");
    if (productions && productions[index]) {
      productions[index].attributes = {}; // Reset attributes for this product
      form.setFieldsValue({ productions });
    }
  };

  const handleOrderChange = (orderId, index) => {
    // Filter productionRecipes based on the selected order ID
    const relatedRecipes = productionRecipes.filter(
      (recipe) => recipe.order_id === orderId
    );

    // Update the state to hold the filtered recipes for this particular index
    const newFilteredProductionRecipes = {
      ...filteredProductionRecipes,
      [index]: relatedRecipes,
    };
    setFilteredProductionRecipes(newFilteredProductionRecipes);

    // Log the filtered recipes for debugging purposes
    console.log(`Filtered recipes for order ${orderId}:`, relatedRecipes);
  };

  const handleAddClick = (type) => {
    // Pass a `type` parameter to the `add` function
    const fields = form.getFieldValue("productions") || [];
    const newField = { type };
    form.setFieldsValue({ productions: [...fields, newField] });
  };

  const onFinish = (values) => {
    console.log("Received values of form:", values);
    closeModal();
  };

  useEffect(() => {
    // Assuming `secondQualityStocks` can change, make sure to update form values accordingly
    if (secondQualityStocks.length > 0) {
      const secondQualityInitialValues = secondQualityStocks.reduce(
        (acc, stock) => {
          acc[`secondQualityStocks.${stock.product_id}`] = ""; // Initialize with empty string or fetch existing values if editing
          return acc;
        },
        {}
      );
      console.log("secondQualityInitialValues", secondQualityInitialValues);
      form.setFieldsValue({ secondQuality: secondQualityInitialValues });
    }
  }, [secondQualityStocks, form]);

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onSubmit}
      initialValues={{
         date: moment(),
        shift: 1,
        productions: [{ type: "orderproduction" }],
      }}
    >
      <Row gutter={16}>
        {" "}
        {/* gutter prop adds spacing between columns */}
        <Col span={12}>
          {" "}
          {/* Adjust the span as needed for your layout */}
          <Form.Item
            name="date"
            label={t("Tarih")}
            rules={[{ required: false, message: t("Please select a date!") }]}
          >
            <DatePicker  style={{ width: "100%" }} locale={locale}
            placeholder="Tarih Seçiniz" format={"DD-MM-YYYY"} />
          </Form.Item>
        </Col>
        <Col span={12}>
          {" "}
          {/* Adjust the span as needed for your layout */}
          <Form.Item
            name="shift"
            label={t("Shift Selection")}
            rules={[{ required: false, message: t("Please select a shift!") }]}
          >
            <Select>
              <Select.Option value="1">1</Select.Option>
              <Select.Option value="2">2</Select.Option>
              <Select.Option value="3">3</Select.Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>
      <Form.List name="productions">
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name }, index) => (
              <div
                key={key}
                style={{
                  marginBottom: 2,
                  border: "1px solid #f0f0f0",
                  padding: 2,
                  borderRadius: 4,
                }}
              >
                {form.getFieldValue(["productions", name, "type"]) ===
                "orderproduction" ? (
                  <Space
                    direction="vertical"
                    size="large"
                    // style={{display:"flex"}}
                    style={{
                      display: "flex",
                      rowGap: 0.5,
                      flexDirection: "column",
                    }}
                  >
                    <Title level={4} style={{ textAlign: "center" }}>
                      Siparişe Üretim 
                    </Title>
                    {
                     <FormError
                     error={error}
                     variant={"danger"}
                   />
                    }
                    {/* Product Selection */}
                    <Form.Item
                      isListField={true}
                      name={[name, "product_id"]}
                      key={[key, "product_id"]}
                      rules={[
                        {
                          required: true,
                          message: t("Please select a product!"),
                        },
                      ]}
                      label={t("Product")}
                    >
                      <Select
                        placeholder={t("Select a product")}
                        onChange={(value) => handleProductChange(value, index)}
                      >
                        {lastProducts.map((product) => (
                          <Select.Option
                            key={product.product_id}
                            value={product.product_id}
                          >
                            {product.product_name}
                          </Select.Option>
                        ))}
                      </Select>
                    </Form.Item>

                    {/* Dynamically Generated Attribute Dropdowns */}
                    {selectedProductsAttributes[index]?.map(
                      (attribute, attrIndex) => (
                        <Form.Item
                          isListField={true}
                          name={[
                            name,
                            "attributes",
                            attribute.attribute_id.toString(),
                          ]}
                          key={[
                            key,
                            "attributes",
                            attribute.attribute_id.toString(),
                          ]}
                          label={attribute.attribute_name}
                          rules={[
                            {
                              required: true,
                              message: `${t("Please select")} ${
                                attribute.attribute_name
                              }`,
                            },
                          ]}
                        >
                          <Select placeholder={t("Select a value")}>
                            {attribute.values.map((value) => (
                              <Select.Option
                                key={value.value_id}
                                value={value.value_id}
                              >
                                {value.value}
                              </Select.Option>
                            ))}
                          </Select>
                        </Form.Item>
                      )
                    )}

                    {/* "Select Order" Dropdown */}
                    <Form.Item
                      isListField={true}
                      name={[name, "order_id"]}
                      key={[key, "order_id"]}
                      label={t("Select Order")}
                      rules={[
                        {
                          required: true,
                          message: t("Please select an order!"),
                        },
                      ]}
                    >
                      <Select
                        placeholder={t("Select an order")}
                        onChange={(value) => handleOrderChange(value, index)} // Bind handleOrderChange here
                      >
                        {filteredOrders[index]?.map((order) => (
                          <Select.Option
                            key={order.order_id}
                            value={order.order_id}
                          >
                            {order.order_number}
                          </Select.Option>
                        ))}
                      </Select>
                    </Form.Item>

                    {filteredProductionRecipes[index] && (
                      <Form.Item
                        isListField={true}
                        name={[name, "production_recipe_id"]}
                        key={[key, "production_recipe_id"]}
                        label={t("Select Production Recipe")}
                        rules={[
                          {
                            required: true,
                            message: t("Please select a production recipe!"),
                          },
                        ]}
                      >
                        <Select placeholder={t("Select a production recipe")}>
                          {filteredProductionRecipes[index].map((recipe) => (
                            <Select.Option key={recipe.id} value={recipe.id}>
                              {recipe.id}
                            </Select.Option>
                          ))}
                        </Select>
                      </Form.Item>
                    )}

                    {/* Quantity Input */}
                    <Form.Item
                      isListField={true}
                      name={[name, "quantity"]}
                      key={[key, "quantity"]}
                      rules={[
                        {
                          required: true,
                          message: t("Please enter a quantity!"),
                        },
                      ]}
                      label={t("Quantity")}
                    >
                      <Input
                        type="number"
                        min={0}
                        placeholder={t("Enter quantity")}
                      />
                    </Form.Item>

                    <Form.Item
                      isListField={true}
                      name={[name, "wastage"]}
                      label={t("Wastage %")}
                      rules={[
                        {
                          required: false,
                          message: t("Please select wastage!"),
                        },
                      ]}
                    >
                      <Select placeholder={t("Select wastage")}>
                        {Array.from({ length: 20 }, (_, i) => (
                          <Select.Option key={i + 1} value={parseFloat((i + 1)/100)}>
                            {i + 1}
                          </Select.Option>
                        ))}
                      </Select>
                    </Form.Item>

                    {secondQualityStocks.map((stock, index) => {
                      console.log("nammeee", name);
                      return (
                        <Form.Item
                          isListField={true}
                          name={[
                            name,
                            "secondQualityStocks",
                            stock.product_id.toString(),
                          ]}
                          key={[
                            key,
                            "secondQualityStocks",
                            stock.product_id.toString(),
                          ]}
                          label={`${stock.product_name}`}
                          rules={[
                            {
                              required: false,
                              message: t("Please enter a quantity!"),
                            },
                          ]}
                        >
                          <Input
                            type="number"
                            min={0}
                            placeholder={t("Enter quantity")}
                          />
                        </Form.Item>
                      );
                    })}

                    {consumableProducts.map((stock, index) => (
                      <Form.Item
                        isListField={true}
                        name={[
                          name,
                          "consumableProducts",
                          stock.product_id.toString(),
                        ]}
                        key={[
                          key,
                          "consumableProducts",
                          stock.product_id.toString(),
                        ]}
                        label={`${stock.product_name}`}
                        rules={[
                          {
                            required: false,
                            message: t("Please enter a quantity!"),
                          },
                        ]}
                      >
                        <Input
                          type="number"
                          min={0}
                          placeholder={t("Enter quantity")}
                        />
                      </Form.Item>
                    ))}
                  </Space>
                ) : (
                  // Fields for production for ourselves
                  <Space
                    direction="vertical"
                    size="large"
                    style={{ display: "flex" }}
                  >
                    <Title level={4} style={{ textAlign: "center" }}>
                      Hammadde İşleme {" "}
                    </Title>
                    {/* Used Product */}
                    <Form.Item
                      name={[name, "used_product"]}
                      label="Kullanılan Hammadde"
                      rules={[
                        {
                          required: true,
                          message: "Please select a used product!",
                        },
                      ]}
                    >
                      <Select placeholder="Select a product">
                        {rawMaterialProducts.map((product) => (
                          <Select.Option
                            key={product.product_id}
                            value={product.product_id}
                          >
                            {product.product_name}
                          </Select.Option>
                        ))}
                      </Select>
                    </Form.Item>

                    {/* Usage Quantity */}
                    <Form.Item
                      name={[name, "usage_quantity"]}
                      label="Kullanılan Miktar "
                      rules={[
                        {
                          required: true,
                          message: "Please input usage quantity!",
                        },
                      ]}
                    >
                      <Input
                        type="number"
                        min={0}
                        placeholder="Enter quantity"
                      />
                    </Form.Item>

                    {/* Output Product */}
                    <Form.Item
                      name={[name, "output_product"]}
                      label="Üretilen Hammadde"
                      rules={[
                        {
                          required: true,
                          message: "Please select an output product!",
                        },
                      ]}
                    >
                      <Select placeholder="Select a product">
                        {recipeMaterialProducts.map((product) => (
                          <Select.Option
                            key={product.product_id}
                            value={product.product_id}
                          >
                            {product.product_name}
                          </Select.Option>
                        ))}
                      </Select>
                    </Form.Item>

                    {/* Output Quantity */}
                    <Form.Item
                      name={[name, "output_quantity"]}
                      label="Üretilen Miktar"
                      rules={[
                        {
                          required: true,
                          message: "Please input output quantity!",
                        },
                      ]}
                    >
                      <Input
                        type="number"
                        min={0}
                        placeholder="Enter quantity"
                      />
                    </Form.Item>
                    <Form.Item
                      name={[name, "wastage"]}
                      label={t("Wastage %")}
                      rules={[
                        {
                          required: false,
                          message: t("Please select wastage!"),
                        },
                      ]}
                    >
                      <Select placeholder={t("Select wastage")}>
                        {Array.from({ length: 20 }, (_, i) => (
                          <Select.Option key={i + 1} value={parseFloat((i + 1)/100)}>
                            {i + 1}
                          </Select.Option>
                        ))}
                      </Select>
                    </Form.Item>

                    {consumableProducts.map((product) => (
                      <Form.Item
                        key={product.product_id}
                        name={[
                          name,
                          "consumableProducts",
                          product.product_id.toString(),
                        ]}
                        label={`${product.product_name}`}
                        rules={[
                          {
                            required: false,
                            message: t("Please enter a quantity!"),
                          },
                        ]}
                      >
                        <Input
                          type="number"
                        min={0}

                          placeholder={t("Enter quantity")}
                        />
                      </Form.Item>
                    ))}
                  </Space>
                )}
                <MinusCircleOutlined
                className="text-2xl text-red-600 font-black text-center flex justify-center items-center my-2 mb-2"
                  onClick={() => remove(name)}
                  
                />
              </div>
            ))}

            <Form.Item>
              <Button
                type="dashed"
                onClick={() => add({ type: "orderproduction" })}
                block
                icon={<PlusOutlined />}
              >
                Sipariş Üretimi Ekle{" "}
              </Button>
            </Form.Item>
            <Form.Item>
              <Button
                type="dashed"
                onClick={() => add({ type: "materialproduction" })}
                block
                icon={<PlusOutlined />}
              >
                Hammade Üretimi Ekle
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>

      <Form.Item className="flex justify-center items-center">
        <Button type="primary" htmlType="submit">
          {editing ? t("Update Production") : t("Vardiya Ekle")}
        </Button>
      </Form.Item>
      <FormError
                     error={error}
                     variant={"danger"}
                   />
    </Form>
  );
};

export default CreateShiftForm;
