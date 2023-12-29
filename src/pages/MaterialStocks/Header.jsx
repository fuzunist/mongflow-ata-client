import Modal from "@/components/Modal";
import Search from "@/components/Search";
import CreateProduct from "@/modals/CreateProduct";
import { PlusIcon } from "lucide-react";
import { useTranslation } from "react-i18next";
import Navigation from "./Navigation";
import { useNavigate } from "react-router-dom";

const Header = ({ page, setPage }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return <Navigation page={page} setPage={setPage} />;
};

export default Header;
