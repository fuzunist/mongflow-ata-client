import Row from "@/components/Row";
import Header from "./Header";
import Customer from "./Customer";
import { useCustomer, useCustomers, useSearch } from "@/store/hooks/apps";
import Modal from "@/components/Modal";
import CreateEditCustomer from "@/modals/CreateEditCustomer";
import { delCustomer, setCustomer } from "@/store/actions/apps";
import { useMemo, useState } from "react";
import { useUser } from "@/store/hooks/user";
import { Popconfirm, Space, Table, Tag, message } from "antd";
import {
  ClipboardEditIcon,
  Trash2Icon,
  ContactIcon,
  Headphones,
} from "lucide-react";
import { delCustomerFromDB } from "@/services/customer";
import Col from "@/components/Col";
import Card from "@/components/Card";
import CreateEditContact from "@/modals/CreateEditContact";

const { Column, ColumnGroup } = Table;

const Customers = () => {
  const customers = useCustomers();
  const selectedCustomer = useCustomer();
  const searchValue = useSearch();
  const user = useUser();
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);

  console.log("page xx", page);
  const pageCustomers = customers?.filter((customer) =>
    customer?.customer_type?.includes(page)
  );

  const authenticate = useMemo(
    () => ["admin", "stock_manager"].includes(user.usertype),
    [user]
  );

  const onDelete = async (customerid) => {
    setError("");
    const response = await delCustomerFromDB(
      user.tokens.access_token,
      customerid
    );
    if (response?.error) return setError(response.error);

    setTimeout(() => {
      closeModal();
      delCustomer(customerid);
      message.success("Müşteri başarılı bir şekilde silindi.");
    }, 1000);
  };

  const closeModal = () => setCustomer(null);

  const filteredCustomers = useMemo(() => {
    if (!searchValue) return pageCustomers;

    return pageCustomers.filter(
      (customer) =>
        customer.companyname
          .toLocaleLowerCase("TR")
          .includes(searchValue.toLocaleLowerCase("TR")) ||
        customer.email.toLocaleLowerCase("TR").includes(searchValue.toLocaleLowerCase("TR")) ||
        customer.phone.toLocaleLowerCase("TR").includes(searchValue.toLocaleLowerCase("TR")) ||
        customer.address.toLocaleLowerCase("TR").includes(searchValue.toLocaleLowerCase("TR"))
    );
  }, [searchValue, customers, pageCustomers]);

  const dataSource = filteredCustomers.map((customer, index) => ({
    key: index,
    id: customer.customerid,
    companyname: customer?.companyname,
    email: customer?.email,
    phone: customer?.phone,
    website: customer?.website,
    address: customer?.address,
    products: customer?.products,
    contacts: customer.contacts
      ?.map((jsonString) => JSON.parse(jsonString))
      ?.map((contact, index) => ({
        key: index,
        name: contact?.name,
        email: contact?.email,
        phone: contact?.phone,
        role: contact?.role,
      })),
  }));

  const columns = [
    {
      title: "Şirket İsmi",
      dataIndex: "companyname",
      key: "companyname",
      className: "text-sm",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      className: "text-sm",
    },
    {
      title: "Telefon",
      dataIndex: "phone",
      key: "phone",
      className: "text-sm",
    },
    {
      title: "Website",
      dataIndex: "website",
      key: "website",
      className: "text-sm break-words ",
    },
    {
      title: "Adres",
      dataIndex: "address",
      key: "address",
      className: "text-xs",
    },
    {
      title: "Ürün Grupları",
      dataIndex: "products",
      key: "products",
      render: (tags) => (
        <span>
          {tags?.map((tag) => {
            let color = tag.length > 5 ? "geekblue" : "green";

            return (
              <Tag color={color} key={tag} className="m-1">
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </span>
      ),
    },
    {
      title: "İşlemler",
      dataIndex: "action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <div className=" flex" onClick={() => setCustomer(record.id)}>
            <Modal
              text={
                <div className="bg-green-700 hover:bg-green-600 text-white rounded p-1.5">
                  <Headphones size={18} strokeWidth={2.5} />
                </div>
              }
            >
              {({ close }) => (
                <CreateEditContact
                  editing={false}
                  closeModal={close}
                  record={record}
                />
              )}
            </Modal>
          </div>
          <div className="flex" onClick={() => setCustomer(record.id)}>
            <Modal
              width="xl"
              className="rounded-full "
              text={
                <div className="bg-purple hover:bg-purple-hover rounded p-1.5 text-white">
                  <ClipboardEditIcon className="" size={18} strokeWidth={2.5} />
                </div>
              }
            >
              {({ close }) => (
                <CreateEditCustomer
                  editing={true}
                  closeModal={close}
                  selectedCustomer={selectedCustomer}
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
              onCancel={() => message.error("Müşteri silinmedi.")}
            >
              <button
                className="p-1.5 bg-danger hover:bg-alert-danger-fg-light transition-colors text-white rounded"
                // onClick={}
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
      <Header authenticate={authenticate} page={page} setPage={setPage} />
      <Row align={"center"} className="mt-8 ">
        <Card variant="overflow">
          <Card.Body>
            <Space split={true} direction="vertical" size={"middle"}>
              <div
                className={`flex flex-col flex-1 w-full border ${
                  searchValue ? " border-blue-300" : ""
                } `}
              >
                <Table
                  locale={{ emptyText: "Veri Bulunamadı" }}
                  pagination={{
                    showTotal: (total) => `Toplam Firma: ${total} adet `,
                    pageSizeOptions: [20, 50, 100, 200, 300],
                    defaultPageSize: 20,
                    hideOnSinglePage: true,
                  }}
                  dataSource={dataSource}
                  size={"small"}
                  scroll={{ x: 1000, y: 900 }}
                  columns={columns}
                  // pagination={false}
                  expandable={{
                    expandedRowRender: (record) => (
                      <div className="flex flex-col w-[60%] justify-start items-start py-2 ">
                        <Table
                          showHeader={false}
                          pagination={false}
                          dataSource={record.contacts}
                          locale={{ emptyText: "Veri Bulunamadı" }}
                        >
                          <Column title="İsim" dataIndex="name" key="name" />
                          <Column
                            title="Telefon"
                            dataIndex="phone"
                            key="phone"
                          />
                          <Column title="Email" dataIndex="email" key="email" />
                          <Column
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
                          />
                        </Table>
                      </div>
                    ),
                    rowExpandable: (record) => record.name !== "Not Expandable",
                    expandRowByClick: true,
                  }}
                ></Table>
              </div>
            </Space>
          </Card.Body>
        </Card>
      </Row>
    </>
  );
};

export default Customers;
