import React, { useState } from "react";
import { Button, Card, Form, Input, Select, Space, Typography } from "antd";
const { Paragraph } = Typography;
import { useTranslation } from "react-i18next";
import {
  CloseOutlined,
  PlusOutlined,
  MinusCircleOutlined,
} from "@ant-design/icons";
import FormError from "../FormikForm/FormError";

const { Option } = Select;

const CreateEditCustomerForm = ({ onChange, fields, onFinish, editing, error, setError }) => {
  const { t } = useTranslation();
const customerTypes = [{id:1, name: "Müşteri"}, {id:2, name: "Tedarikçi"}, {id:3, name: "İhracat"}, {id:4, name: "İthalat"}, {id:5, name: "Yeni Müşteri"}]

  const formItemLayout = {
    labelCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 4,
      },
    },
    wrapperCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 20,
      },
    },
  };
  const formItemLayoutWithOutLabel = {
    labelCol: { span: 12 }, wrapperCol: { span: 18 }
  };

  const options = [
    "Polyester",
    "Granül",
    "Boya",
    "Takoz",
    "Plaka",
    "Melanj",
    "Deşe",
    "Tow"
  ];
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
    setError(errorInfo)
  };
  const [form] = Form.useForm();
  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="font-bold text-2xl my-4 ">
        {editing ? "Müşteri Düzenle" : "Firma Ekle"}
      </h1>
      {error && <FormError error={error} variant={"danger"} />}
      <Form
    name="dynamic_form_nest_item"
     autoComplete="off"
        className="mt-4"
        //   layout="inline"
        {...formItemLayoutWithOutLabel}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        style={{
          maxWidth: 500,
        }}

        fields={fields}     
   
      >
        <Form.Item
          name="companyname"
          label="Şirket İsmi"
          rules={[
            {
              required: true,
              message: "Şirket İsmi Girilmelidir!",
            },
          ]}
        >
      <Input placeholder="Şirket İsmi" />
        </Form.Item>
        <Form.Item
          name="taxid"
          label="Vergi Numarası"
         
          
        >
      <Input placeholder="Vergi Numarası" />
        </Form.Item>
        <Form.Item
          name="taxoffice"
          label="Vergi Dairesi"
          
        >
      <Input placeholder="Vergi Dairesi" />
        </Form.Item>

        <Form.Item
         name="phone"
          label={t("phone")}
          
           >
          <Input placeholder={t("phone")} />
        </Form.Item>

        <Form.Item 
        name="email" 
        label={t("email")}
        
        >
          <Input placeholder={t("email")} />
        </Form.Item>

        <Form.Item name="address" 
        label={t("address")}
        
        >
          <Input placeholder={t("address")} />
        </Form.Item>

        <Form.Item name="website" 
        label={t("website")}
        placeholder={t("website")}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="products"
          label="Ürün Grupları"
          rules={[
            {
              type: "array",
            },
          ]}
        >
          
          <Select mode="multiple" placeholder="Ürün grubu seçin">
            {options.map((option, index) => (
              <Option key={index} value={option}>
                {option}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="customer_type"
          label="Müşteri Tipi"
          rules={[
            {
              type: "array",
          
            },
            {
              required: true,
              message: "Müşteri Tipi Girilmelidir!",
            }
          ]}
        >
          
          <Select mode="multiple" placeholder="Müşteri Tipi Seçiniz">
            {customerTypes.map((option, index) => (
              <Option key={index} value={option.id}>
                {option.name}
              </Option>
            ))}
          </Select>
        </Form.Item>
    
    
        <Form.List name="contacts">
          {(fields, { add, remove }, { errors }) => (
            <div
              style={{ display: "flex", rowGap: 16, flexDirection: "column" }}
            >
              {fields.map((field,index) => {
                console.log("field of contact", field);
                console.log("errors", errors);
                return (
                  <Card
                    size="small"
                    title={`Kişi ${field.name + 1}`}
                    key={field.key}
                    extra={
                      <CloseOutlined
                        onClick={() => remove(index)}
                      />
                    }
                  >
                    <Form.Item
                      isListField={true}
                      label="Kişi Adı"
                      name={[field.name, "name"]}
                      key={[field.key, "name"]}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      isListField={true}
                      label="Kişi Email"
                      name={[field.name, "email"]}
                      key={[field.key, "email"]}

                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      isListField={true}
                      label="Kişi Telefon"
                      name={[field.name, "phone"]}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      isListField={true}
                      label="Kişi Rolü"
                      name={[field.name, "role"]}
                    >
                      <Input />
                    </Form.Item>
                  </Card>
                );
              })}

              <Button type="dashed" onClick={() => add()} block>
                + Kişi Ekle
              </Button>
            </div>
          )}
        </Form.List>

      

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
            {editing ? "Müşteri Düzenle" : "Firma Ekle"}
          </Button>

        </Form.Item>
      </Form>
    </div>
  );
};
export default CreateEditCustomerForm;
