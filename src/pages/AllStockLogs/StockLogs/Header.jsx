import Modal from "@/components/Modal";
import CreateStock from "@/modals/CreateStock";
import { useProducts } from "@/store/hooks/apps";
import { PlusIcon } from "lucide-react";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import dayjs from "dayjs";
import { DatePicker, Space } from "antd";
const { RangePicker } = DatePicker;
import locale from "antd/es/date-picker/locale/tr_TR";
import { getProductStockLogsFromDB } from "@/services/lastproductstocks";
import { addAllRangeProductStockLogs, addAllRangeRawMaterialStockLogs, addAllRangeRecipeMaterialStockLogs } from "@/store/actions/apps";
import { useUser } from "@/store/hooks/user";
import { getRawMaterialStockLogsFromDB } from "@/services/rawmaterialstocks";
import { getRecipeMaterialStockLogsFromDB } from "@/services/recipematerialstocks";
import Search from "@/components/Search";

const Header = ({ logs, page }) => {
  const { t } = useTranslation();
  const products = useProducts();
  const user= useUser();
  const [pageForm, setPageForm] = useState({});
  const [title, setTitle] = useState("");




  const onRangeChange = async (dates, dateStrings) => {
    if (dates && dates[0] && dates[1]) {
      const data = {
        startDate: dates[0].toISOString(),
        endDate: dates[1].toISOString(),
      };

      const getProductStockLogsResponse = await pageForm?.getLogs(
        user.tokens.access_token,
        data
      );

       console.log("getProductStockLogsResponse", getProductStockLogsResponse)
      if (getProductStockLogsResponse?.error) {
        console.log(getProductStockLogsResponse?.error);
        return setError(getProductStockLogsResponse.error);
      }

      pageForm?.addRangeLog(getProductStockLogsResponse);
    } else {
      console.log("Clear");
      const lastMonthDate = dayjs().subtract(30, "day").format("YYYY-MM-DD");
      const todayDate = dayjs().format("YYYY-MM-DD");

      const data = { startDate: lastMonthDate, endDate: todayDate };

      const getProductStockLogsResponse = await pageForm?.getLogs(
        user.tokens.access_token,
        data
      );
      if (getProductStockLogsResponse?.error) {
        console.log(getProductStockLogsResponse?.error);
        return setError(getProductStockLogsResponse.error);
      }

      pageForm?.addRangeLog(getProductStockLogsResponse);
    }
  };
  const rangePresets = [
    {
      label: "Son 7 Gün",
      value: [dayjs().add(-7, "d"), dayjs()],
    },
    {
      label: "Son 14 Gün",

      value: [dayjs().add(-14, "d"), dayjs()],
    },
    {
      label: "Son 1 ay",

      value: [dayjs().add(-30, "d"), dayjs()],
    },
    {
      label: "Son 3 ay",

      value: [dayjs().add(-90, "d"), dayjs()],
    },
  ];

  useEffect(() => {
    
    switch (page) {
      case "lastProductStocks":
        setPageForm({
          addRangeLog: addAllRangeProductStockLogs,
          getLogs :getProductStockLogsFromDB,
        });
        setTitle("Ürün Alımı Ekle")
        break;

      case "recipeMaterialStocks":
        setPageForm({
            addRangeLog: addAllRangeRecipeMaterialStockLogs,
            getLogs :getRecipeMaterialStockLogsFromDB,
          });
        setTitle("İşlenmiş Hammadde Alımı Ekle")

        break;
      case "rawMaterialStocks":
        setPageForm({
            addRangeLog: addAllRangeRawMaterialStockLogs,
            getLogs :getRawMaterialStockLogsFromDB,
          });
        setTitle("İşlenecek Hammadde Alımı Ekle")

        break;

      default:
        break;
    }

    // return ()=> onRangeChange([])
  }, [page]);


  return (
    <div className="flex-1 flex max-[576px]:flex-col items-center justify-between gap-y-4 mb-6">
      <Modal
        width="lg"
        className="bg-purple hover:bg-purple-hover text-white rounded-full py-2 px-4 flex justify-center items-center gap-2"
        text={
          <>
            <PlusIcon size={14} strokeWidth={2} /> {title}
          </>
        }
      >
        {({ close }) => <CreateStock closeModal={close} page={page} title= {title} />}
      </Modal>

      <div className="flex bg-slate-50 p-2 px-4 rounded-full items-center gap-x-4">
        {/* <CalendarRange /> */}
        Listele:
        <RangePicker
          locale={locale}
          presets={rangePresets}
          onChange={onRangeChange}
        />
      </div>
      <Search />

    </div>
  );
};

export default Header;
