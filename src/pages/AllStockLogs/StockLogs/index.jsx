import Header from './Header'
import { useLastProductStockLogs, useRawMaterialLogs, useRecipeMaterialLogs } from '@/store/hooks/apps'
import { useEffect, useState } from 'react'
import Items from './Items'

const StockLogs = ({page}) => {
    const [logs,setLogs]= useState([]) 
    const lastProductLogs=useLastProductStockLogs();
    const rawMaterialLogs=useRawMaterialLogs();
    const recipeMaterialLogs=useRecipeMaterialLogs();

    useEffect(() => {
        if (page === "lastProductStocks") {
            setLogs([...lastProductLogs]);
        } else if (page === "rawMaterialStocks") {
            setLogs([...rawMaterialLogs]);
        } else if (page === "recipeMaterialStocks") {
            setLogs([...recipeMaterialLogs]);
        }
    }, [page,lastProductLogs, rawMaterialLogs, recipeMaterialLogs]);

    return (
        <>
            <Header logs={logs} page={page} />
                <Items
                    logs={logs}
                    page={page}
                
                />
               
        </>
    )
}

export default StockLogs
