import { Link } from "react-router-dom";
import Card from "@/components/Card";
import Col from "@/components/Col";
import { setCustomer } from "@/store/actions/apps";
import { Collapse } from "antd";
import {
  ClipboardEditIcon,
  Delete,
  DeleteIcon,
  Edit2Icon,
  LucideDelete,
  Trash2Icon,
} from "lucide-react";
import CreateEditCustomer from "@/modals/CreateEditCustomer";
import Modal from "@/components/Modal";
import { useUser } from "@/store/hooks/user";
import {
  addCustomerToDB,
  delCustomerFromDB,
  editCustomerToDB,
} from "@/services/customer";
import { addCustomer, delCustomer, editCustomer } from "@/store/actions/apps";
import { useState } from "react";
import { Space, Table, Tag } from 'antd';

const Customer = ({ customer, authenticate }) => {
const { Column, ColumnGroup } = Table;

  const user = useUser();
  const [error, setError] = useState("");
  const selectedContacts = customer?.contacts?.map(jsonString => JSON.parse(jsonString));

 

  const onDelete = async () => {
    setError("");
    const response = await delCustomerFromDB(
      user.tokens.access_token,
      customer.customerid
    );
    if (response?.error) return setError(response.error);
    delCustomer(customer.customerid);
    closeModal();
  };
  const dataSource= selectedContacts?.map((contact, index)=>({
    key: index,
    name: contact?.name,
    email: contact?.email,
    phone:contact?.phone,
    role:contact?.role
  }
      ))
       console.log("ds:", dataSource)
  return (
    <>
      <Col variant="full">
        {/* <Card> */}
        {/* <Card.Body
          className="w-full"

        //   onClick={onClickHandle}
        //   style={{ cursor: authenticate ? "pointer" : "default" }}
        > */}
        {/* <div className="flex w-full"> */}
        <Collapse
          className="w-full"
          items={[
            {
              key: customer?.customerid,
              label: (
                <div className="flex items-center justify-between max-[768px]:flex-col gap-y-2 select-none">
                  {/* company Name (left) */}
                  <div className="flex flex-col min-[768px]:px-2 text-lg text-text-dark-light dark:text-text-dark-dark font-medium w-1/6 max-[768px]:w-full overflow-hidden text-ellipsis whitespace-nowrap">
                    <h5>{customer?.companyname ?? "-"}</h5>
                    <p className="text-xs w-4/5 overflow-hidden whitespace-nowrap text-ellipsis font-light ">
                      {customer?.address ?? "-"}
                    </p>
                  </div>

                  {/* Email (next column) */}
                  <Link
                    onClick={(e) => e.stopPropagation()}
                    to={`mailto:${customer?.email}`}
                    className="min-[768px]:px-2 text-lg text-link-fg-light hover:text-link-hover-light transition-colors w-1/6 max-[768px]:w-full overflow-hidden text-ellipsis whitespace-nowrap"
                  >
                    {customer?.email ?? "-"}
                  </Link>

                  {/* Company Website (next column) */}
                  <span className="min-[768px]:px-2 text-lg w-1/6 max-[768px]:w-full overflow-hidden text-ellipsis whitespace-nowrap">
                    {customer?.website ?? "-"}
                  </span>

                  {/* Phone (next column) */}
                  <span className="min-[768px]:px-2 text-lg w-1/6 max-[768px]:w-full overflow-hidden text-ellipsis whitespace-nowrap">
                    {customer?.phone ?? "-"}
                  </span>

                  {/* Address (right) */}
                  <div className="min-[768px]:px-2 text-lg w-1/6 max-[768px]:w-full overflow-hidden text-ellipsis whitespace-nowrap">
                    {customer?.products?.map((item, key) => (
                      <p key={key} className="text-sm">
                        - {item}
                      </p>
                    )) ?? "-"}
                  </div>
                  <div className="flex min-[768px]:px-2 w-1/6 max-[768px]:w-full  justify-end items-center gap-x-2 ">
                    <div className="flex" onClick={() => console.log("edit clicked")}>
                      <Modal
                        width="40"
                        className="rounded-full "
                        text={
                          <div className="bg-purple hover:bg-purple-hover rounded p-1.5 text-white">
                            <ClipboardEditIcon
                              className=""
                              size={18}
                              strokeWidth={2.5}
                            />
                          </div>
                        }
                      >
                        {({ close }) => (
                          <CreateEditCustomer
                          editing={true}
                            closeModal={close}
                            selectedCustomer={customer}
                          />
                        )}
                      </Modal>
                    </div>
                    <div className="flex">
                    <button
                      className="p-1.5 bg-danger hover:bg-alert-danger-fg-light transition-colors text-white rounded"
                      onClick={onDelete}
                    >
                      <Trash2Icon size={18} strokeWidth={2.5} />
                      {/* {t("delete")} */}
                    </button>
                    </div>
                  </div>
                </div>
              ),

              children: <Table showHeader={false} pagination={false} dataSource={dataSource}>
                <Column title="İsim" dataIndex="name" key="name" />
             
              <Column title="Email" dataIndex="email" key="email" />
              <Column title="Telefon" dataIndex="phone" key="phone" />
              <Column
                title="Rol"
                dataIndex="role"
                key="role"
                render={(tag) => (
                  <>
                   
                      <Tag color="blue" key={"role"}>
                        {tag}
                      </Tag>
                
                  </>
                )}
              />
             
            </Table>
            },
          ]}
        ></Collapse>
        {/* </div> */}
        {/* </Card.Body> */}
        {/* </Card>  */}
      </Col>
    </>
  );
};

export default Customer;
