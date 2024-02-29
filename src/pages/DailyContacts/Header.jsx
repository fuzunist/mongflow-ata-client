import Modal from "@/components/Modal";
import Search from "@/components/Search";
import CreateEditContact from "@/modals/CreateEditContact";
import CreateEditCustomer from "@/modals/CreateEditCustomer";
import { PlusIcon, CalendarRange } from "lucide-react";
import { useTranslation } from "react-i18next";
import dayjs from "dayjs";
import { DatePicker, Space } from "antd";
const { RangePicker } = DatePicker;
import locale from "antd/es/date-picker/locale/tr_TR";
import { getContactsFromDB } from "@/services/customer";
import { useUser } from "@/store/hooks/user";
import { addRangeContacts } from "@/store/actions/apps";
import { useState } from "react";

const Header = ({ authenticate }) => {
  const user = useUser();
  const { t } = useTranslation();
  const [error, setError] = useState("");
  const onRangeChange = async (dates, dateStrings) => {
    if (dates && dates[0] && dates[1]) {
      console.log("From: ", dates[0], ", to: ", dates[1]);
      console.log("From: ", dateStrings[0], ", to: ", dateStrings[1]);
      const data = {
        startDate: dates[0].toISOString(),
        endDate: dates[1].toISOString(),
      };

      const getContactsResponse = await getContactsFromDB(
        user.tokens.access_token,
        data
      );
      if (getContactsResponse?.error) {
        console.log(getContactsResponse?.error);
        return setError(getContactsResponse.error);
      }

      addRangeContacts(getContactsResponse);
    } else {
      console.log("Clear");
      const todayDate = dayjs().format("YYYY-MM-DD");
      const threeDaysAgo = dayjs().subtract(3, "day").format("YYYY-MM-DD");
      const data = { startDate: threeDaysAgo, endDate: todayDate };

      const getContactsResponse = await getContactsFromDB(
        user.tokens.access_token,
        data
      );
      if (getContactsResponse?.error) {
        console.log(getContactsResponse?.error);
        return setError(getContactsResponse.error);
      }

      addRangeContacts(getContactsResponse);
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

  return (
    <>
      <div className="flex max-[576px]:flex-col items-center justify-between gap-y-4 mb-6">
        {authenticate ? (
          <Modal
            className="bg-purple hover:bg-purple-hover text-white rounded-full py-2 px-4 flex justify-center items-center gap-2"
            text={
              <>
                <PlusIcon size={14} strokeWidth={2} /> İletişim Ekle
              </>
            }
          >
            {({ close }) => (
              <CreateEditContact editing={false} closeModal={close} />
            )}
          </Modal>
        ) : (
          <div className="block" />
        )}

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
    </>
  );
};

export default Header;
