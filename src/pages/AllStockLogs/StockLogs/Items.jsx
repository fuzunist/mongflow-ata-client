import Card from "@/components/Card";
import Row from "@/components/Row";
import {
  delLastProductLogFromDB,
  // getProductStockWarehouse,
  getProductStocks,
} from "@/services/lastproductstocks";
import {
  //addAllProductStockWarehouse,
  addAllProductStocks,
  delLastProductStockLog,
} from "@/store/actions/apps";
import { useSearch } from "@/store/hooks/apps";
import { useUser } from "@/store/hooks/user";
import { Space, Table, Tag} from "antd";
import Column from "antd/es/table/Column";
import dayjs from "dayjs";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Trash2Icon } from "lucide-react";

const Items = ({
  logs,
  page,
  // selected, setSelected
}) => {

  const { t } = useTranslation();
  const searchValue = useSearch();
  const user = useUser();

  const deleteLog = async (id) => {
    const response = await delLastProductLogFromDB(
      user.tokens.access_token,
      id
    );

    if (response?.error) {
      return console.log(response?.error);
    }

    delLastProductStockLog(id);
    // const productWareHouses = await getProductStockWarehouse(
    //   user.tokens.access_token
    // );

    const productStocks = await getProductStocks(user.tokens.access_token);

    addAllProductStocks(productStocks);
    // addAllProductStockWarehouse(productWareHouses);
  };

  //Buraya customer name ve attributes ler de gelmeli ama belki veritabaından get ile
  const filteredLogs = useMemo(() => {
    if (!searchValue) return logs;

    return logs.filter(
      (log) =>
        log.waybill.includes(searchValue) ||
        log.date.includes(searchValue) ||
        log.customer_city
          .toLocaleLowerCase("TR")
          .includes(searchValue.toLocaleLowerCase("TR")) ||
        log.customer_county
          .toLocaleLowerCase("TR")
          .includes(searchValue.toLocaleLowerCase("TR")) ||
        JSON.stringify(log.attributedetails)
          .toLocaleLowerCase("TR")
          .includes(searchValue.toLocaleLowerCase("TR")) ||
        log.companyname
          .toLocaleLowerCase("TR")
          .includes(searchValue.toLocaleLowerCase("TR")) ||
        log.product_name
          .toLocaleLowerCase("TR")
          .includes(searchValue.toLocaleLowerCase("TR"))
    );
  }, [page, logs, searchValue]);

  console.log("logs in items", logs);
  const dataSource = filteredLogs.map((log, index) => ({
    key: index,
    id: log.id,
    date: dayjs(log.date).format("DD-MM-YYYY"),
    companyname: log?.companyname,
    product: log?.product_name,
    attributedetails: log?.attributedetails,
    price: log?.price,
    currency: [log.currency_code, log.exchange_rate, log.price],
    exchange_rate: log.exchange_rate,
    quantity: log?.quantity,
    warehouse: log?.customer_city + "/" + log?.customer_county,
    customer_city: log?.customer_city,
    customer_county: log?.customer_county,
    waybill: log.waybill,
    otherDetails: [
      {
        key: 0,
        username: log?.username,
        payment_type: log.payment_type,
        payment_date: dayjs(log.payment_date).format("DD-MM-YYYY"),
        details: log.details,
      },
    ],
  }));

  const columns = [
    {
      title: "Tarih",
      dataIndex: "date",
      key: "date",
      className: "text-sm",
    },
    {
      title: "Ürün",
      dataIndex: "product",
      key: "product",
      className: "text-sm",
    },
    {
      title: "Ürün Detayı",
      dataIndex: "attributedetails",
      key: "attributedetails",
      className: "text-sm ",
      render: (_, record) => {
        return Object.entries(record?.attributedetails).map(
          ([key, value], index) => (
            <div key={index}>
              <span className="font-bold px-2">{key}:</span>
              <span>{value}</span>
            </div>
          )
        );
      },
    },
    {
      title: "Miktar",
      dataIndex: "quantity",
      key: "quantity",
      className: "text-sm",
      render: (tag) => <span>{tag} ton</span>,
    },
    {
      title: "Fiyat",
      dataIndex: "price",
      key: "price",
      className: "text-sm",
      render: (tag) => <span>{tag} ₺</span>,
    },
    {
      title: "Döviz",
      dataIndex: "currency",
      key: "currency",
      className: "text-sm",
      render: (tags) => (
        <span className="">
          <Tag color={tags[0] === "TL" ? "geekblue" : "green"} className="m-1">
            {tags[0] === "TL"
              ? tags[0].toUpperCase()
              : ` ${
                  tags[0].toUpperCase()
                } (${tags[1]} ₺)`}
          </Tag>
        </span>
      ),
    },
    {
      title: "Tedarikçi",
      dataIndex: "companyname",
      key: "companyname",
      className: " text-sm overflow-auto break-words w-56",
    },
    {
      title: "İl İlçe",
      dataIndex: "warehouse",
      key: "warehouse",
      className: "text-sm",
    },
    {
      title: "",
      dataIndex: "action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <div className="flex">
            {/* <Popconfirm
              placement="center"
              title={"Silmek istediğinizden emin misiniz?"}
              okText="Evet"
              cancelText="Hayır"
              onConfirm={() => deleteLog(record.id)}
              onCancel={() => message.error("Kayıt silinmedi.")}
              okButtonProps={{
                loading: confirmLoading,
              }}
            > */}
            <button
              onClick={() => deleteLog(record.id)}
              className="p-1.5 bg-danger hover:bg-alert-danger-fg-light transition-colors text-white rounded"
            >
              <Trash2Icon size={18} strokeWidth={2.5} />
              {/* {t("delete")} */}
            </button>
            {/* </Popconfirm> */}
          </div>
        </Space>
      ),
    },
  ];

  return (
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
               tableLayout="auto"
                locale={{ emptyText: "Veri Bulunamadı" }}
                pagination={{
                  showTotal: (total) => `Toplam Kayıt: ${total} adet `,
                  pageSizeOptions: [20, 50, 100, 200, 300],
                  defaultPageSize: 20,
                }}
                dataSource={dataSource}
                size={"small"}
                scroll={{ x: 900, y: 900 }}
                columns={columns}
                showHeader={dataSource.length ? true : false}
                expandable={{
                  expandedRowRender: (record) => {
                    console.log("record io", record);
                    return (
                      <div className="flex flex-col w-[100%] justify-center items-center py-2 bg-blue-50">
                        <Table
                          showHeader={false}
                          pagination={false}
                          dataSource={record?.otherDetails}
                          locale={{ emptyText: "Veri Bulunamadı" }}
                          className="bg-transparent	"
                          rowClassName={"bg-blue-50"}
                        >
                          <Column
                            title="Alımı Giren"
                            dataIndex="username"
                            key="username"
                            render={(tag) => (
                              <>
                                <Tag color="pink" key={"username"}>
                                  Alımı Giren: {tag}
                                </Tag>
                              </>
                            )}
                          />
                          <Column
                            title="Ödeme Türü"
                            dataIndex="payment_type"
                            key="payment_type"
                            render={(tag) => (
                              <>
                                <Tag color="purple" key={"payment_type"}>
                                  Ödeme Türü: {tag}
                                </Tag>
                              </>
                            )}
                          />
                          <Column
                            title="Ödeme Tarihi"
                            dataIndex="payment_date"
                            key="payment_date"
                            render={(tag) => (
                              <>
                                <Tag color="orange" key={"payment_date"}>
                                  Ödeme Tarihi: {tag}
                                </Tag>
                              </>
                            )}
                          />

                          <Column
                            title="Detaylar"
                            dataIndex="details"
                            key="details"
                            render={(tag) => (
                              <>
                                <Tag color="yellow" key={"details"}>
                                  Detay: {tag}
                                </Tag>
                              </>
                            )}
                          />
                        </Table>
                      </div>
                    );
                  },
                  //   rowExpandable: (record) => record.name !== "Not Expandable",
                  expandRowByClick: true,
                  expandedRowClassName: () => "bg-blue-50",
                }}
              ></Table>
            </div>
          </Space>
        </Card.Body>
      </Card>
    </Row>
  );
};

export default Items;
