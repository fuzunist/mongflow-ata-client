import { useTranslation } from "react-i18next";
import Navigation from "./Navigation";
import { getRawMaterialsFromDB } from "@/services/rawmaterialstocks";
import { useEffect } from "react";
import { useUser } from "@/store/hooks/user";
const Header = ({ page, setPage }) => {
  const { t } = useTranslation();
  const user= useUser();
  const controller = new AbortController();

  // useEffect( ()=>{

  //   const getStocks= async ()=> getRawMaterialsFromDB(user.tokens.access_token, controller.signal)
  //   if(page==="rawMaterialStocks"){
  //     try{
  //      getStocks().then((res)=> console.log("reponse ",res))

  //     }catch(err){
  //        console.log("reponse error rawMaterialStocks",err)
  //     }
  //   }

  //   return ()=> controller.abort()
  // },[page])

  return <Navigation page={page} setPage={setPage} />;
};

export default Header;
