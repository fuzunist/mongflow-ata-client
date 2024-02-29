import CreateEditCustomerForm from "@/components/AntForm/CreateEditCustomerForm";
import CreateEditContactForm from "@/components/AntForm/CreateEditContactForm";
import FormikForm from "@/components/FormikForm";
import {
  addContactToDB,
  addCustomerToDB,
  delCustomerFromDB,
  editContactToDB,
  editCustomerToDB,
} from "@/services/customer";
import { addContact, addCustomer, delCustomer, editContact, editCustomer } from "@/store/actions/apps";
import { useUser } from "@/store/hooks/user";
import { useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useContact, useContacts, useCustomer, useCustomers } from "@/store/hooks/apps";
import dayjs from "dayjs";
import "dayjs/locale/tr"

const CreateEditContact = ({ closeModal, editing, record }) => {
  const user = useUser();
  const selectedContact= useContact()
  const customers = useCustomers();
  const customer = useCustomer();
  const contacts = useContacts();

  const [error, setError] = useState("");
  const { t } = useTranslation();

   console.log( "record off", record)
  const userSelectedCustomer = useMemo(() => {
    return customers?.find((cus) => cus?.customerid === customer?.customerid);
  }, [customer, customers,record]);


  const companyContacts = useMemo(() => {
    return userSelectedCustomer?.contacts?.map((jsonString) =>
      JSON.parse(jsonString)
    );
  }, [customers, customer, record]);
   console.log("zox customer",customer)
  //  console.log("zox customerId", customerId)
   console.log("zox userSelectedCustomer", userSelectedCustomer)
 console.log(" zox companyContacts",companyContacts)

  const companyNames = customers?.map((customer) => ({
    id: customer.customerid,
    name: customer.companyname,
  }));

  const [fields, setFields] = useState([
    {
      name: ["companyname"],
      value: editing ? selectedContact?.companyname  : record ? record.companyname :  "",
    },
    {
      name: ["person"],
      value: editing ? selectedContact?.person?.toLocaleUpperCase('TR') : "",
    },
    {
      name: ["contacttype"],
      value: editing ? selectedContact?.contacttype   : "",
    },
    {
      name: ["date"],
      value: editing ? dayjs(selectedContact?.date)  : "",
    },
    {
      name: ["time"],
      value: editing ? dayjs(selectedContact?.time, "HH-mm") : "",
    },
    {
      name: ["result"],
      value: editing ? selectedContact?.result  : "",
    },
  ]);

  const onSubmit = async (values) => {
    console.log("finish values create contact", values);
    setError("");
    const company=companyNames?.find((item)=> item.id===values?.companyname)
 
   

    const jsDate = new Date(values.time.$d);
    
    const hours = jsDate.getHours();
    const minutes = jsDate.getMinutes();
    const seconds = jsDate.getSeconds();
    
    const time = `${hours}:${minutes}:${seconds}`;

    const data = {
      userid: user.userid,
      customerid: record ? customer.customerid : company?.id,
      companyname: record ? customer.companyname : company?.name,
      person: values?.person,
      contacttype: values.contacttype,
      date: values.date?.toISOString(),
      time: time,
      result: values.result,
    };
    console.log("data of contact craete", data);
    const response = await addContactToDB(user.tokens.access_token, data);
    console.log("response", response);
    if (response?.error) return setError(response.error);
    addContact(response);
    closeModal();
  };

  const onEdit = async (values) => {
     console.log("values in edit: ", values)
    setError("");

  const customerid=companyNames.find((item)=> item.name==values.companyname)?.id

 
    const jsDate = new Date(values.time.$d);
    
    const hours = jsDate.getHours();
    const minutes = jsDate.getMinutes();
    const seconds = jsDate.getSeconds();
    
    const time = `${hours}:${minutes}:${seconds}`;

    const data = {
      userid: user.userid,
      customerid: customerid,
      companyname:values.companyname,
      person: values.person.toLocaleUpperCase('TR'),
      contacttype: values.contacttype,
      date: dayjs(values.date, {locale: "tr-TR", format: "DD-MM-YYYY"}).toISOString(),
      time: time,
      result: values.result,
    };
    console.log("data in edit", data);

    const response = await editContactToDB(
      user.tokens.access_token,
      selectedContact.id,
      data
    );
    console.log("response", response);
    if (response?.error) return setError(response.error);
    editContact(response);

    closeModal();
  };
  return (
    <>
      <CreateEditContactForm
        error={error}
        setError={setError}
        editing={editing}
        fields={fields}
        onFinish={editing ? onEdit : onSubmit}
        onChange={(newFields) => {
          setFields(newFields);
        }}
        companyNames={companyNames}
        companyContacts={companyContacts}
        // setCustomerId={setCustomerId}
        record={record}
      />
    </>
  );
};

export default CreateEditContact;
