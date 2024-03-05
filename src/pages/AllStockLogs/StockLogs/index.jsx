import Header from './Header'
import { useConsumableProductStockLogs, useLastProductStockLogs, useRawMaterialLogs, useRecipeMaterialLogs } from '@/store/hooks/apps'
import { useEffect, useState } from 'react'
import Items from './Items'

const StockLogs = ({page}) => {
    const [logs,setLogs]= useState([]) 
    const lastProductLogs=useLastProductStockLogs();
    const rawMaterialLogs=useRawMaterialLogs();
    const recipeMaterialLogs=useRecipeMaterialLogs();
    const consumableProductLogs= useConsumableProductStockLogs()

    useEffect(() => {
        if (page === "lastProductStocks") {
            setLogs([...lastProductLogs]);
        } else if (page === "rawMaterialStocks") {
            setLogs([...rawMaterialLogs]);
        } else if (page === "recipeMaterialStocks") {
            setLogs([...recipeMaterialLogs]);
        } else if (page === "consumableProductStocks") {
            setLogs([...consumableProductLogs]);
        }
    }, [page,lastProductLogs, rawMaterialLogs, recipeMaterialLogs, consumableProductLogs]);

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
