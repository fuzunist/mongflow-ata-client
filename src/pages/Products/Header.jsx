import Modal from "@/components/Modal";
import Search from "@/components/Search";
import CreateProduct from "@/modals/CreateProduct";
import { PlusIcon } from "lucide-react";
import { useTranslation } from "react-i18next";
import Navigation from "./Navigation";
import { useNavigate } from "react-router-dom";

const Header = ({ authenticate, page, setPage, type }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const buttonName =
    page === "products"
      ? "addProduct"
      : page === "rawMaterialProducts"
      ? "addRawMaterial"
      : page === "recipeMaterialProducts" 
      ? "addMaterial" 
      : page === "secondProducts" 
      ? "addSecondProducts"
      : page === "consumableProductStocks" 
      ? "addFilters" : ""
  return (
    <>
      <div className="flex max-[576px]:flex-col justify-between gap-y-4 mb-6">
        {authenticate ? (
          <Modal
            className="bg-purple hover:bg-purple-hover text-white rounded-full py-2 px-4 flex justify-center items-center gap-2"
            text={
              <>
                <PlusIcon size={14} strokeWidth={2} /> {t(buttonName)}
              </>
            }
          >
            {({ close }) => <CreateProduct closeModal={close} type={type} title={buttonName} />}
          </Modal>
        ) : (
          <div className="block" />
        )}
        {/* {authenticate && (
                    <button
                        onClick={() => navigate('create-set')}
                        className='bg-purple hover:bg-purple-hover text-white rounded-full py-2 px-4 flex justify-center items-center gap-2'
                    >
                        <PlusIcon
                            size={14}
                            strokeWidth={2}
                        />{' '}
                        {t('addSet')}
                    </button>
                )} */}
        <Search />
      </div>
      <Navigation page={page} setPage={setPage} />
      <div className="flex justify-between items-center max-md:hidden select-none px-6 py-2 border-b-2 border-solid border-border-light dark:border-border-dark mb-6">
        <div className="w-1/5 px-2 text-text-dark-light dark:text-text-dark-dark">
          {t("productname")}
        </div>
        {/* <div className='w-1/5 px-2 text-text-dark-light dark:text-text-dark-dark'>{t('price')}</div> */}
        <div className="flex-1 px-2 text-text-dark-light dark:text-text-dark-dark">
          {t("attributes")}
        </div>
      </div>
    </>
  );
};

export default Header;
