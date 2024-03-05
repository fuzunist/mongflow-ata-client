import Modal from "@/components/Modal";
import CreateStock from "@/modals/CreateStock";
import { PlusIcon } from "lucide-react";
import { useTranslation } from "react-i18next";

const Header = () => {
  const { t } = useTranslation();

  return (
    <div className="flex-1 flex max-[576px]:flex-col justify-between gap-y-4 mb-6">
      <Modal
        className="bg-purple hover:bg-purple-hover text-white rounded-full py-2 px-4 flex justify-center items-center gap-2"
        text={
          <>
            <PlusIcon size={14} strokeWidth={2} /> {t("addStock")}
          </>
        }
      >
        {({ close }) => <CreateStock closeModal={close} />}
      </Modal>
      {/* <div className='flex justify-center items-center gap-4'>
                <label className='flex justify-center items-center gap-2 cursor-pointer'>
                    <span className='text-text-dark-light dark:text-text-dark-dark text-sm font-semibold select-none'>{t('allStocks')}</span>
                    <input
                        type='checkbox'
                        checked={zeros}
                        onChange={(e) => setZeros(e.target.checked)}
                        className='rounded outline-none cursor-pointer bg-purple border-none'
                    />
                </label>
                <button
                    className='bg-purple hover:bg-purple-hover text-white rounded-full py-2 px-4'
                    onClick={() => stocksToExcel(products, stocks, zeros)}
                >
                    {t('saveAsExcel')}
                </button>
            </div> */}
    </div>
  );
};

export default Header;
