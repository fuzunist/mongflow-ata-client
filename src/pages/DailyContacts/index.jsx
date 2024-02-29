import Row from "@/components/Row";
import Header from "./Header";
import Contact from "./Contact";
import {
  useContact,
  useContacts,
  useCustomer,
  useCustomers,
  useSearch,
} from "@/store/hooks/apps";
import Modal from "@/components/Modal";
import CreateEditCustomer from "@/modals/CreateEditCustomer";
import { delCustomer, setCustomer, setContact, delContact } from "@/store/actions/apps";
import { useMemo, useState } from "react";
import { useUser } from "@/store/hooks/user";
import { Popconfirm, Space, Table, Tag , message} from "antd";
import { ClipboardEditIcon, Trash2Icon } from "lucide-react";
import { delContactFromDB, delCustomerFromDB } from "@/services/customer";
import CreateEditContact from "@/modals/CreateEditContact";
import Card from "@/components/Card";
import dayjs from "dayjs";
const { Column, ColumnGroup } = Table;

const DailyContacts = () => {
  const customers = useCustomers();
  const contacts = useContacts();
  const today=dayjs().format("DD-MM-YYYY");


  const companyNames = customers.map((customer) => ({
    name: customer.companyname,
    id: customer.customerid,
  }));
  console.log("companyNames", companyNames);
  const selectedCustomer = useCustomer();
  const selectedContact= useContact()
  const searchValue = useSearch();
  const user = useUser();
  const [error, setError] = useState("");

  console.log("selected customer here,", selectedCustomer);
  console.log("selected Contact here,", selectedContact);
  

  const authenticate = useMemo(
    () => ["admin", "stock_manager", "boss"].includes(user.usertype),
    [user]
  );

  const onDelete = async (id) => {
    setError("");
    const response = await delContactFromDB(
      user.tokens.access_token,
      id
    );
    if (response?.error) return setError(response.error);
   

    setTimeout(() => {
    closeModal();
    delContact(id);
    message.success('İletişim başarılı bir şekilde silindi.');
    }, 2000);
    
  };

  const closeModal = () => setCustomer(null);

  const filteredContacts = useMemo(() => {
    if (!searchValue) return contacts;

    return contacts.filter(
      (contact) =>
        contact?.companyname?.toLowerCase()
          .startsWith(searchValue.toLowerCase()) ||
        contact?.person?.toLowerCase().startsWith(searchValue.toLowerCase())
    );
  }, [searchValue, contacts]);

  const dataSource = filteredContacts?.map((contact, index) => ({
    key: index,
    id: contact.id,
    customerid: contact.customerid,
    companyname: contact?.companyname,
    date: dayjs(contact?.date).format("DD-MM-YYYY"),
    contacttype: contact?.contacttype,
    time: contact?.time.slice(0,-3),
    result: contact?.result,
    person: contact?.person,
  }));

  const columns = [
    {
      title: "Tarih",
      dataIndex: "date",
      key: "date",
      render: (_, record) => {
        return (
          <div className={`${record.date===today ? "flex bg-green-100 p-2 " : ""}`}>{ record.date===today ? "Bugün" :record.date}</div>
      )},
    },
    {
      title: "Saat",
      dataIndex: "time",
      key: "time",
    },
    {
      title: "Şirket İsmi",
      dataIndex: "companyname",
      key: "companyname",
    },
    {
      title: "Görüşme Tipi",
      dataIndex: "contacttype",
      key: "contacttype",
    },
    {
      title: "Görüşülen Kişi",
      dataIndex: "person",
      key: "person",
    },

    {
      title: "Akıbet",
      dataIndex: "result",
      key: "result",
      render: (_, record) => (
        <Space size="middle">
          <div className="flex bg-slate-100 p-3 rounded-xl max-w-[250px] text-wrap break-words">{record.result}</div>
        </Space>
      ),
    },
    {
      title: "İşlemler",
      dataIndex: "action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <div className="flex" onClick={() => {
             console.log("record in dailycontacts index,", record)
            setCustomer(record.customerid)
            setContact(record.id)}}>
            <Modal
              width="40"
              className="rounded-full "
              text={
                <div className="bg-purple hover:bg-purple-hover rounded p-1.5 text-white">
                  <ClipboardEditIcon className="" size={18} strokeWidth={2.5} />
                </div>
              }
            >
              {({ close }) => (
                <CreateEditContact
                  editing={true}
                  closeModal={close}
                />
              )}
            </Modal>
          </div>
          <div className="flex">
          <Popconfirm
          placement="left"
          title={"Silmek istediğinizden emin misiniz?"}
        
          okText="Evet"
          cancelText="Hayır"
          onConfirm={() => onDelete(record.id)}
          onCancel={()=>message.error('İletişim silinmedi.')}
        >
            <button
              className="p-1.5 bg-danger hover:bg-alert-danger-fg-light transition-colors text-white rounded"
              // onClick={() => onDelete(record.id)}
            >
              <Trash2Icon size={18} strokeWidth={2.5} />
              {/* {t("delete")} */}
            </button>
            </Popconfirm>
          </div>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Header authenticate={authenticate} />
      <Row align={"center"} className="mt-8 ">
        <Card variant="overflow">
          <Card.Body>
            <Space
              split={true}
              size={"small"}
              direction="vertical"
              className="w-full"
            >
              <Table columns={columns} dataSource={dataSource}>
                <Column title="Tarih" dataIndex="date" key="date" />

                <Column title="Saat" dataIndex="time" key="time" />
                <Column
                  title="Görüşme Türü"
                  dataIndex="contacttype"
                  key="contacttype"
                />
                <Column
                  title="Görüşülen Kişi"
                  dataIndex="person"
                  key="person"
                />
                <Column title="Akıbet" dataIndex="result" key="result" />

                {/* <Column
  title="Rol"
  dataIndex="role"
  key="role"
  render={(tag) => (
    <>
      <Tag color="green" key={"role"}>
        {tag}
      </Tag>
    </>
  )}
/> */}
              </Table>
            </Space>
          </Card.Body>
        </Card>
      </Row>
    </>
  );
};

export default DailyContacts;
