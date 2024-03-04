import Card from "@/components/Card";
import Row from "@/components/Row";
import { useSearch } from "@/store/hooks/apps";
import { Space, Table, Tag } from "antd";
import Column from "antd/es/table/Column";
import dayjs from "dayjs";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";

const Items = ({
  stocks,
  page,
  // selected, setSelected
}) => {
  const { t } = useTranslation();
  const searchValue = useSearch();

  //Buraya customer name ve attributes ler de gelmeli ama belki veritabaından get ile
  const filteredStocks = useMemo(() => {
    if (!searchValue) return stocks;

    return stocks.filter(
      (stock) =>
         ( stock?.hasAttributes ? JSON.stringify(stock.attributedetails) : stock.product_name)
          .toLocaleLowerCase()
          .includes(searchValue.toLocaleLowerCase()) ||
        stock.product_name
          .toLocaleLowerCase()
          .includes(searchValue.toLocaleLowerCase())
    );
  }, [page, stocks, searchValue]);


   console.log("filteredStocks",filteredStocks)
  const dataSource = filteredStocks.map((stock, index) => ({
    key: index,
    id: stock?.id,
    product: stock?.product_name,
    attributedetails: stock?.hasAttributes ? stock?.attributedetails : null,
    price: stock?.price,
    quantity: stock?.quantity,

   
  }));

  const columns = [
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
        return record?.attributedetails ? Object.entries(record?.attributedetails).map(
          ([key, value], index) => (
            <div key={index}>
              <span className="font-bold px-2">{key}:</span>
              <span>{value}</span>
            </div>
          )
        ) : null
      },
    },
    {
      title: "Miktar",
      dataIndex: "quantity",
      key: "quantity",
      className: "text-sm",
      render: (tag)=>
      (
        <span>
          {tag} ton
        </span>
      )
    },

    {
      title: "Birim Fiyat",
      dataIndex: "price",
      key: "price",
      className: "text-sm",
      render: (tag)=>
      (
        <span>
          {tag} ₺
        </span>
      )
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
                className="flex justify-center"
              ></Table>
            </div>
          </Space>
        </Card.Body>
      </Card>
    </Row>
  );
};

export default Items;
