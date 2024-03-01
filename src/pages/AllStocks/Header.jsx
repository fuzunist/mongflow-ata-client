import { useTranslation } from "react-i18next";
import Navigation from "./Navigation";

const Header = ({ page, setPage }) => {
  const { t } = useTranslation();

  return <Navigation page={page} setPage={setPage} />;
};

export default Header;
