import { useTranslation } from "react-i18next";
import Navigation from "./Navigation";
import { useEffect } from "react";
import { useUser } from "@/store/hooks/user";
import { getDayShiftsForOrderFromDB, getDayShiftsForProcessFromDB } from "@/services/shift";
import dayjs from "dayjs";
const Header = ({ page, setPage }) => {
  const { t } = useTranslation();
  const user= useUser();
  const controller = new AbortController();

  useEffect( ()=>{
    const date= new Date().toISOString()
     console.log("date, ", date)
    const getor= async ()=> getDayShiftsForOrderFromDB(user.tokens.access_token, controller.signal, date)
    const getpro= async ()=> getDayShiftsForProcessFromDB(user.tokens.access_token, controller.signal, date)
    if(page==="rawMaterialStocks"){
      try{
       getor().then((res)=> console.log("reponse ord ",res))
       getpro().then((res)=> console.log("reponse proc ",res))

      }catch(err){
         console.log("reponse error rawMaterialStocks",err)
      }
    }

    return ()=> controller.abort()
  },[page])

  return <Navigation page={page} setPage={setPage} />;
};

export default Header;
