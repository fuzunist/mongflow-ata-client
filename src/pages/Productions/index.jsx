import Row from "@/components/Row";
import Header from "./Header";
import Products from "./Products";
import { useProductions } from "@/store/hooks/apps";
import { useState } from "react";
import Selected from "./Selected";

const Productions = () => {
  const productions = useProductions();
  const [selected, setSelected] = useState(null);

  return (
    <>
      {/* <Header /> */}
      <Row align="center">
        <h1>Bu bölüm hala geliştirme aşamasındadır.</h1>
        {/* <Products
                    productions={productions}
                    selected={selected}
                    setSelected={setSelected}
                />
                <Selected
                    selected={selected}
                    productions={productions}
                /> */}
      </Row>
    </>
  );
};

export default Productions;
