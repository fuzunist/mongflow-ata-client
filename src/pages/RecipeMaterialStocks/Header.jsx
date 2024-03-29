import Modal from "@/components/Modal";
// import CreateMaterialStock from "@/modals/CreateMaterialStock";
// import CreateMaterial from "@/modals/CreateMaterial";
import { useProducts } from "@/store/hooks/apps";
import materialStocksToExcel from "@/utils/materialStocksToExcel";

import { PlusIcon } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const Header = ({ stocks }) => {
  const { t } = useTranslation();
  const products = useProducts();
  const [zeros, setZeros] = useState(false);

  return (
    <div className="flex-1 flex max-[576px]:flex-col justify-between gap-y-4 mb-6">
      <div className="flex justify-center items-center gap-4">
      {/* <Modal
        className="bg-purple hover:bg-purple-hover text-white rounded-full py-2 px-4 flex justify-center items-center gap-2"
        text={
          <>
            <PlusIcon size={14} strokeWidth={2} /> {t("addMaterialStock")}
          </>
        }
      >
        {({ close }) => <CreateMaterialStock closeModal={close} />}
      </Modal> */}
      {/* <Modal
        className="bg-purple hover:bg-purple-hover text-white rounded-full py-2 px-4 flex justify-center items-center gap-2"
        text={
          <>
            <PlusIcon size={14} strokeWidth={2} /> {t("addMaterial")}
          </>
        }
      >
        {({ close }) => <CreateMaterial closeModal={close} />}
      </Modal> */}
      </div>
      <div className="flex justify-center items-center gap-4">
        <button
          className="bg-purple hover:bg-purple-hover text-white rounded-full py-2 px-4"
          onClick={() => materialStocksToExcel(products, stocks, zeros)}
          disabled={true}
        >
          {t("saveAsExcel")}
        </button>
      </div>
    </div>
  );
};

export default Header;
