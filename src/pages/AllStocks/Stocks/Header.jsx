import Modal from "@/components/Modal";
import CreateStock from "@/modals/CreateStock";
import { useProducts } from "@/store/hooks/apps";
import { PlusIcon } from "lucide-react";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import dayjs from "dayjs";

import Search from "@/components/Search";

const Header = () => {
  const { t } = useTranslation();
  

  return (
    <div className="flex-1 flex max-[576px]:flex-col items-center justify-between gap-y-4 mb-6">
      <Search />
    </div>
  );
};

export default Header;
