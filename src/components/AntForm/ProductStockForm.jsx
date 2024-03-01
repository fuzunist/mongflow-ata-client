import React, { useEffect, useMemo, useState } from "react";
import {
  Button,
  Card,
  Cascader,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Select,
  Space,
  Typography,
} from "antd";
import { useTranslation } from "react-i18next";
import {
  CloseOutlined,
  PlusOutlined,
  MinusCircleOutlined,
} from "@ant-design/icons";
import FormError from "../FormikForm/FormError";
import { useProduct, useProducts } from "@/store/hooks/apps";
import { setProduct } from "@/store/actions/apps";
import locale from "antd/es/date-picker/locale/tr_TR";
import TextArea from "antd/es/input/TextArea";

const { Option } = Select;

const ProductStockForm = ({
  onChange,
  initialValues,
  fields,
  onFinish,
  error,
  setError,
  setCurrency,
  rate,
  currency,
}) => {
  const { t } = useTranslation();
  const selectedProduct = useProduct();
  const prods=useProducts()
// const [error, setError]= useState("")
  const formItemLayoutWithOutLabel = {
    labelCol: { span: "auto" },
    wrapperCol: { span: "auto" },
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
    setError(errorInfo);
  };
  const [form] = Form.useForm();

  const vat_rate = Form.useWatch(["vat_rate"], form);
  const vat_witholding_rate = Form.useWatch(["vat_witholding_rate"], form);
  const price = Form.useWatch(["price"], form);

  useEffect(() => {
    form.setFieldsValue({
      exchange_rate: rate,
      vat_witholding: price * vat_rate * vat_witholding_rate,
      vat_declaration: price * vat_rate * (1 - vat_witholding_rate),
      price_with_vat: price + price * vat_rate * (1 - vat_witholding_rate),
    });
  }, [rate, vat_rate, vat_witholding_rate, price]);

   console.log("productsss,", prods)
   console.log("selectedProduct?.attributes ", selectedProduct?.attributes )

  return (
    <div className="flex flex-col w-full justify-center items-center">
      <h1 className="font-bold text-2xl my-4 ">{"Ürün Stok Ekle"}</h1>
      {error && <FormError error={error} variant={"danger"} />}
      <Form
        name="dynamic_form_nest_item"
        autoComplete="off"
        className="flex flex-col mt-4 w-[80%] justify-center "
        //   layout="inline"
        {...formItemLayoutWithOutLabel}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        style={{
          maxWidth: 500,
        }}
        fields={fields}
        form={form}
      >
        <Form.Item
          rules={[
            {
              required: true,
              message: initialValues.product_id.label + " Girilmelidir!",
            },
          ]}
          name={"product_id"}
          label="Ürün"
        >
          <Select onChange={(e) => setProduct(e)}>
            {initialValues.product_id?.options?.map((product, index) => (
              <Option key={index} value={product.product_id}>
                {product?.product_name}
              </Option>
            ))}
          </Select>
        </Form.Item>

        {selectedProduct && selectedProduct?.attributes  ? (
          <div className="p-4 mb-6 border border-slate-200">
            
            {selectedProduct?.attributes?.map((item, index) => {
               console.log( "itemmm", item)
               if (item.attribute_name === "Paket") return null; // Skip iteration

              return (
                <Form.Item
                 rules ={[
                  {
                    required: true,
                    message: initialValues.attributes.label + " Girilmelidir!",
                  },
                  item.attribute_name === "Paket" && { type: "array" },
                ].filter(Boolean)}
                  key={index}
                  name={["attributes", item.attribute_id.toString()]}
                  label={item.attribute_name}
                 
                >
                  <Select mode={item.attribute_name==="Paket" ? "multiple" : ""}>
                    {item?.values.map((option, ind) => {
                      return (
                        <Option key={ind + 1000} value={option?.value_id}>
                          {option?.value}
                        </Option>
                      );
                    })}
                  </Select>
                </Form.Item>
              );
            })}
          </div>
        ) : selectedProduct?.attributes && (
          <Form.Item disabled label="Ürün Özellikleri">
            <Select
              disabled
              value={"Ürün Seçiniz"}
              label="Ürün Seçiniz"
            ></Select>
          </Form.Item>
        )}

        <Form.Item
          rules={[
            {
              required: true,
              message: initialValues.quantity.label + " Girilmelidir!",
            },
          ]}
          name={"quantity"}
          label={initialValues.quantity.label}
        >
          <InputNumber className="w-full" min={0} />
        </Form.Item>
        <Form.Item
          rules={[
            {
              required: true,
              message: "Döviz Tipi Girilmelidir!",
            },
          ]}
          name={"currency"}
          label="Döviz Tipi"
        >
          <Select onChange={(e) => setCurrency(e)}>
            {initialValues.currency?.options?.map((cr, index) => (
              <Option key={index} value={cr}>
                {cr}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          className={`${currency === "TL" ? "hidden" : ""}`}
          rules={[
            {
              required: true,
              message: "Döviz Kuru Girilmelidir!",
            },
          ]}
          name={"exchange_rate"}
          label="Döviz Kuru"
        >
          <Input type="number" />
        </Form.Item>

        <Form.Item
          rules={[
            {
              required: true,
              message: initialValues.price.label + " Girilmelidir!",
            },
          ]}
          name={"price"}
          label={initialValues.price.label}
        >
          <InputNumber className="w-full" prefix={currency} min={0} />
        </Form.Item>

        <Form.Item
          rules={[
            {
              required: true,
              message: "KDV Tevkifate Girilmelidir!",
            },
          ]}
          name={"vat_witholding_rate"}
          label="KDV Tevkifat Oranı"
        >
          <Select type="number">
            {initialValues.vat_witholding_rate?.options?.map((item, index) => (
              <Option key={index} value={item}>
                {item === 0
                  ? "Tevkifat Yok"
                  : item === 1
                  ? "Tamamına Tevkifat Uygula"
                  : item * 10 + "/10"}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          rules={[
            {
              required: true,
              message: "KDV Girilmelidir!",
            },
          ]}
          name={"vat_rate"}
          label="KDV"
        >
          <Select type="number">
            {initialValues.vat_rate?.options?.map((item, index) => (
              <Option key={index} value={item}>
                %{item * 100}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item name="vat_witholding" label="KDV Tevkifat">
          <InputNumber
            disabled={true}
            precision={4}
            step={0.1}
            className="w-full bg-white text-black cursor-default"
          />
        </Form.Item>

        <Form.Item name="vat_declaration" label="KDV Beyan">
          <InputNumber
            disabled={true}
            precision={4}
            step={0.1}
            className="w-full bg-white text-black cursor-default"
          />
        </Form.Item>

        <Form.Item name="price_with_vat" label="KDV Dahil Toplam">
          <InputNumber
            disabled={true}
            precision={4}
            step={0.1}
            className="w-full bg-white text-black cursor-default"
          />
        </Form.Item>

        <Form.Item
          rules={[
            {
              required: true,
              message: "Ödeme Şekli Girilmelidir!",
            },
          ]}
          name={"payment_type"}
          label="Ödeme Şekli"
        >
          <Select showSearch>
            {initialValues.payment_type?.options?.map((pt, index) => (
              <Option key={index} value={pt}>
                {pt}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          rules={[
            {
              required: true,
              message: "Ödeme Tarihi Girilmelidir",
            },
          ]}
          name={"payment_date"}
          label="Ödeme Tarihi"
        >
          <DatePicker
            className="w-full"
            locale={locale}
            format={"DD/MM/YYYY"}
          />
        </Form.Item>

        <Form.Item
          rules={[
            {
              required: true,
              message: initialValues.waybill.label + " Girilmelidir!",
            },
          ]}
          name={"waybill"}
          label={initialValues.waybill.label}
        >
          <Input type="text" />
        </Form.Item>

        <Form.Item
          rules={[
            {
              required: true,
              message: "İrsaliye Tarihi Girilmelidir!",
            },
          ]}
          name={"date"}
          label="İrsaliye Tarihi"
        >
          <DatePicker
            className="w-full"
            locale={locale}
            format={"DD/MM/YYYY"}
          />
        </Form.Item>

        <Form.Item
          rules={[
            {
              required: true,
              message: "Tedarikçi Girilmelidir!",
            },
          ]}
          name={"customer_id"}
          label="Tedarikçi"
        >
          <Select
            showSearch
            filterOption={(input, option) =>
              option.props.children
                .toLowerCase()
                .indexOf(input.toLowerCase()) >= 0 ||
              option.props.value.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            {initialValues.customer_id?.options?.map((cus, index) => (
              <Option key={index} value={cus.customerid}>
                {cus?.companyname}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          rules={[
            {
              required: true,
              message: "Depo İl İlçe Girilmelidir",
            },
          ]}
          name={"address"}
          label="Depo İl İlçe"
        >
          <Cascader
            options={initialValues.address.options}
            placeholder="İl İlçe Seçiniz"
            showSearch={{
              ...(inputValue, path) =>
                path.some(
                  (option) =>
                    option.label
                      .toLowerCase()
                      .indexOf(inputValue.toLowerCase()) > -1
                ),
            }}
          />
        </Form.Item>

        <Form.Item name={"details"} label="Alım Detayı">
          <TextArea />
        </Form.Item>
        <Form.Item
          wrapperCol={{
            span: 12,
            offset: 6,
          }}
          style={{
            marginTop: 18,
          }}
        >
          <Button type="primary" htmlType="submit" className="mx-[18%]">
            {"Stok Ekle"}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
export default ProductStockForm;
