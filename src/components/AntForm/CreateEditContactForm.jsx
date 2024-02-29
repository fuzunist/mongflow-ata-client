import React, { useMemo, useState } from "react";
import {
  Button,
  Card,
  DatePicker,
  Form,
  Input,
  Select,
  Space,
  TimePicker,
  Typography,
} from "antd";
import locale from "antd/es/date-picker/locale/tr_TR";
import { useTranslation } from "react-i18next";
import {
  CloseOutlined,
  PlusOutlined,
  MinusCircleOutlined,
} from "@ant-design/icons";
import FormError from "../FormikForm/FormError";
import { useCustomers } from "@/store/hooks/apps";
import { setCustomer } from "@/store/actions/apps";
const { Option } = Select;

const CreateEditContactForm = ({
  onChange,
  fields,
  onFinish,
  editing,
  error,
  setError,
  companyNames,
  // setCustomerId,
  companyContacts,
  record,
}) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();

  const customers = useCustomers();

  const personSelectOptions = useMemo(() => {
    return companyContacts?.map((item) => ({
      value: item.name,
      label: item.name,
    }));
  }, [companyContacts]);

  const formItemLayout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 24 },
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
    setError(errorInfo);
  };
  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="font-bold text-2xl my-4 ">
        {editing ? "İletişim Düzenle" : "İletişim Ekle"}
      </h1>
      {error && <FormError error={error} variant={"danger"} />}
      <Form
        form={form}
        name="dynamic_form_nest_item"
        autoComplete="off"
        className="mt-4"
        layout="horizontal"
        {...formItemLayout}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        style={{
          width: 300,
        }}
        fields={fields}
        //  initialValues={fields}
        // onFieldsChange={(_, allFields) => {
        //   onChange(allFields);
        // }}
        // onValuesChange={(_, allFields) => {
        //   onChange(allFields);
        // }}
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
          <Select
          disabled={(record || editing) ? true : false}

            onChange={(value) => {
              setCustomer(value)
              // setCustomerId(value);
              form.resetFields(["person"]);
            }}
            showSearch
            className="w-full"
            placeholder="Şirket Seçiniz"
            optionFilterProp="children"
            filterOption={(input, option) =>
              ((option?.label).toLocaleLowerCase() ?? "").includes(
                input.toLocaleLowerCase()
              )
            }
            filterSort={(optionA, optionB) =>
              (optionA?.label ?? "")
                .toLocaleLowerCase()
                .localeCompare((optionB?.label ?? "").toLocaleLowerCase())
            }
            options={companyNames.map((item) => ({
              value: item.id,
              label: item.name,
            }))}
          />
        </Form.Item>

        <Form.Item name="person" label={t("Kişi")}>
          <Select
            // validateTrigger

            className="w-full"
            // onChange={onPersonChange}
            disabled={companyContacts?.length === 0 ? true : false}
            options={personSelectOptions}
          />
        </Form.Item>
        <Form.Item
          name="contacttype"
          label={t("İletişim Türü")}
          rules={[
            {
              required: true,
              message: "İletişim Türü Girilmelidir!",
            },
          ]}
        >
          <Select
            placeholder="İletişim Türü Seçiniz"
            className="w-full"
            options={[
              {
                value: "Telefon",
                label: "Telefon",
              },
              {
                value: "E-posta",
                label: "E-posta",
              },
              {
                value: "Whatsapp",
                label: "Whatsapp",
              },
              {
                value: "Video Toplantı",
                label: "Video Toplantı",
              },
              {
                value: "Diğer",
                label: "Diğer",
              },
            ]}
          />
        </Form.Item>

        <Form.Item
          name="date"
          label={t("Tarih")}
          format={"DD-MM-YYYY"}
          locale={locale}
          rules={[
            {
              required: true,
              message: "Tarih Girilmelidir!",
            },
          ]}
        >
          <DatePicker
            format={"DD-MM-YYYY"}
            className="w-full"
            locale={locale}
            placeholder="Tarih Seçiniz"
          />
        </Form.Item>

        <Form.Item
          format={"HH:mm"}
          locale={locale}
          name="time"
          label={t("Saat")}
          rules={[
            {
              required: true,
              message: "Saat Girilmelidir!",
            },
          ]}
        >
          <TimePicker
            className="w-full"
            format={"HH:mm"}
            locale={locale}
            placeholder="Saat Seçiniz"
          />
        </Form.Item>

        <Form.Item
          name="result"
          label="Akıbet"
          rules={[
            {
              required: true,
              message: "Akıbeti Girilmelidir!",
            },
          ]}
        >
          <Input.TextArea
            className="w-full"
            placeholder="Akıbeti giriniz"
            autoSize={{
              minRows: 3,
              maxRows: 5,
            }}
          />
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
            {editing ? "İletişim Düzenle" : "İletişim Ekle"}
          </Button>
          {/* <Button htmlType="reset">reset</Button> */}
        </Form.Item>
      </Form>
    </div>
  );
};
export default CreateEditContactForm;
