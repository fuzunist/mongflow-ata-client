import Card from "@/components/Card";
import Row from "@/components/Row";
import { useSearch } from "@/store/hooks/apps";
import { Space, Table, Tag, App } from "antd";
import { useEffect, useState } from "react";
import EditableCell from "./EditableCell";
import { EditableRow } from "./EditableCell";

const Products = ({ products }) => {
  const searchValue = useSearch();
  const [dataSource, setDataSource] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  // const [messageApi, contextHolder] = message.useMessage();
  const { message } = App.useApp();

  //  console.log("products", products)
  useEffect(() => {
    console.log("error", error);
    error &&
      message.open({
        type: "error",
        content: error,
      });
  }, [error]);

  useEffect(() => {
    setDataSource(
      products.map((product, index) => ({
        key: JSON.stringify({
          id: product?.order_number,
          attr: product?.attributes,
          customer_id: product.customer_id,
        }),
        id: product?.order_number,
        product: product?.product_name,
        attributedetails: product?.attributes,
        price: product?.totalPrice,
        quantity: product?.quantity,
        pending_quantity: product.shipment,
        customer: product?.customer?.companyname,
        delivery_date: product.delivery_date,
        order_number: product.order_number,
        ship_quantity: product.shipment,
      }))
    );
  }, [products, searchValue]);

  //    console.log("dataSource", dataSource)

  const handleSave = (row) => {
    setError("");
    const newData = [...dataSource];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    // console.log("row of  save", row);
    // console.log("data source in save", dataSource);
    if (row.ship_quantity === "0") {
      newData.splice(index, 1, {
        ...item,
        ship_quantity: item.pending_quantity,
      });
    //    console.log("newData", newData)
      setDataSource(newData);

      return setError(" Sevk Miktarı 0 ya da boş olamaz");
    }
    if (row.ship_quantity > row.pending_quantity) {
      return setError("Girilen Miktar Sevk Edilecek Miktardan Büyük Olamaz");
    }

    console.log("item", item);
    console.log("row", row);
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    setDataSource(newData);
  };
  const columns = [
    {
      title: "Teslimat Tarihi",
      dataIndex: "delivery_date",
      key: "delivery_date",
      className: "text-sm",
    },
    {
      title: "Sipariş Numarası",
      dataIndex: "order_number",
      key: "order_number",
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
      render: (tag, record) => (
        <span>
          {record.pending_quantity}/ {record.quantity} ton
        </span>
      ),
    },

    {
      title: "Birim Fiyat",
      dataIndex: "price",
      key: "price",
      className: "text-sm",
      render: (tag) => <span>{tag} ₺</span>,
    },
    {
      title: "Müşteri",
      dataIndex: "customer",
      key: "customer",
      className: "text-sm",
    },
    {
      title: "Sevk Miktarı",
      dataIndex: "ship_quantity",
      key: "ship_quantity",
      className: "text-sm",
      onCell: (record) => ({
        record,
        editable: true,
        dataIndex: "ship_quantity",
        title: "Sevk Miktarı",
        errormessage: "Sevk Miktarı Girilmelidir!",
        isDisabled: !selectedRowKeys.find((item)=> item===record.key),
        handleSave,
        
      })
    },
  ];

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
   console.log("selectedRowKeys", selectedRowKeys)

  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    selections: [
      {
        key: "all",
        text: "Hepsini Seç",
        onSelect: (changeableRowKeys) => {
          setSelectedRowKeys(changeableRowKeys);
        },
      },
      {
        key: "remove",
        text: "Seçimi Kaldır",
        onSelect: (changeableRowKeys) => {
          setSelectedRowKeys([]);
        },
      },
      {
        key: "ship",
        text: "Sevk Et",
        onSelect: () => {
            setLoading(true)
          //burada async selectedRowKeys ile 
          //orders ta product içine sevk status, 
         // shipment veritabanına post: kaç satışa bağlı array order_number , state güncelleme
         // bu da onay aşamasında ; ortak stok ve alım stoğundan düşme ama öncelikle onaylanmadan önce depo alımstok
         //bilgilerinin sipariş onay aşamasında alınması gerekiyor. ve product içinde yazılması lazım

        },
      },
    ],
  };

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
                // tableLayout="auto"
                rowSelection={rowSelection}
                locale={{ emptyText: "Veri Bulunamadı" }}
                pagination={{
                  showTotal: (total) => `Toplam Kayıt: ${total} adet `,
                  pageSizeOptions: [20, 50, 100, 200, 300],
                  defaultPageSize: 20,
                }}
                dataSource={dataSource}
                size={"small"}
                scroll={{ x: 900, y: 600 }}
                columns={columns}
                showHeader={dataSource.length ? true : false}
                className="flex justify-center"
                loading={loading}
                components={{
                  body: {
                    cell: EditableCell,
                    row: EditableRow,
                  },
                }}
              ></Table>
            </div>
          </Space>
        </Card.Body>
      </Card>
    </Row>
  );
};

export default Products;
