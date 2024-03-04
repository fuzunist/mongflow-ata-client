import CreateEditCustomerForm from "@/components/AntForm/CreateEditCustomerForm";
import FormikForm from "@/components/FormikForm";
import {
  addCustomerToDB,
  delCustomerFromDB,
  editCustomerToDB,
} from "@/services/customer";
import { addCustomer, delCustomer, editCustomer } from "@/store/actions/apps";
import { useUser } from "@/store/hooks/user";
import { useState, useMemo } from "react";
import { useTranslation } from "react-i18next";

const CreateEditCustomer = ({ closeModal, selectedCustomer, editing }) => {
  const user = useUser();
  const [error, setError] = useState("");
  const { t } = useTranslation();

  const selectedContacts = useMemo(() => {
    return selectedCustomer?.contacts?.map((jsonString) =>
      JSON.parse(jsonString)
    );
  }, [selectedCustomer]);

  const [fields, setFields] = useState([
    {
      name: ["companyname"],
      value: editing ? selectedCustomer?.companyname?.toLocaleUpperCase('TR') : "",
    },
    {
      name: ["taxid"],
      value: editing ? selectedCustomer?.taxid : "",
    },
    {
      name: ["taxoffice"],
      value: editing ? selectedCustomer?.taxoffice?.toLocaleUpperCase('TR') : "",
    },
    {
      name: ["email"],
      value: editing ? selectedCustomer?.email : "",
    },
    {
      name: ["phone"],
      value: editing ? selectedCustomer?.phone : "",
    },
    {
      name: ["address"],
      value: editing ? selectedCustomer?.address?.toLocaleUpperCase('TR') : "",
    },
    {
      name: ["website"],
      value: editing ? selectedCustomer?.website : "",
    },
    {
      name: ["products"],
      value: editing ? selectedCustomer?.products : [],
    },
    {
      name: ["customer_type"],
      value: editing ? selectedCustomer?.customer_type : [],
    },
    {
      name: ["contacts"],
      value: editing ? selectedContacts : [],
    },
  ]);

  const onSubmit = async (values) => {
    console.log("finish values on submit", values);
    setError("");

    const data = {
      companyname: values.companyname?.toLocaleUpperCase('TR'),
      taxid: values.taxid,
      taxoffice: values.taxoffice?.toLocaleUpperCase('TR'),
      email: values.email,
      phone: values.phone,
      address: values.address?.toLocaleUpperCase('TR'),
      website: values.website,
      products: values.products,
      customer_type: values.customer_type,
      contacts: values.contacts,

    };
    const response = await addCustomerToDB(user.tokens.access_token, data);
    console.log("response", response);
    if (response?.error) return setError(response.error);
    addCustomer(response);
    closeModal();
  };

  const onEdit = async (values) => {
    setError("");
    console.log("values in edit", values);
    const data = {
      companyname: values.companyname?.toLocaleUpperCase('TR'),
      taxid: values.taxid,
      taxoffice: values.taxoffice?.toLocaleUpperCase('TR'),
      email: values.email,
      phone: values.phone,
      address: values.address?.toLocaleUpperCase('TR'),
      website: values.website,
      products: values.products,
      customer_type: values.customer_type,
      contacts: values.contacts,
    };
    const response = await editCustomerToDB(
      user.tokens.access_token,
      selectedCustomer.customerid,
      data
    );
    console.log("response", response);
    if (response?.error) return setError(response.error);
    editCustomer(response);

    closeModal();
  };

  return (
    <>
      <CreateEditCustomerForm
        error={error}
        setError={setError}
        editing={editing}
        fields={fields}
        onFinish={editing ? onEdit : onSubmit}
        onChange={(newFields) => {
          setFields(newFields);
        }}
      />
    </>
  );
};

export default CreateEditCustomer;
