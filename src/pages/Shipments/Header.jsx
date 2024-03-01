import Navigation from "./Navigation";
import Sorter from "@/components/Sorter";
import Search from "@/components/Search";

const Header = ({ page, setPage }) => {
  return (
    <div className="flex flex-col gap-y-4">
      <div className="flex max-[576px]:flex-col justify-between gap-y-4 mb-6 min-[576px]:items-center">
        <Search />
        <Sorter />
      </div>
      <div className="mt-4">
        <Navigation page={page} setPage={setPage} />
      </div>
    </div>
  );
};

export default Header;
