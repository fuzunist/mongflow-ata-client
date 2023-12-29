import Row from '@/components/Row'
import Header from './Header'
import Products from './Products'
import { useStocks } from '@/store/hooks/apps'
import { useState } from 'react'
import Selected from './Selected'
import { useRecipeMaterialLogs, useRecipeMaterials } from '@/store/hooks/apps'


const Stocks = () => {
    const stocks = useStocks()
    const [selected, setSelected] = useState(null)
    const recipeMaterialStocks= useRecipeMaterials()
    const RecipeMaterialLogs= useRecipeMaterialLogs()

    return (
        <div className='flex flex-col w-full m-6 '>
            <Header stocks={recipeMaterialStocks} />
            <Row align='center'>
                <Products
                    stocks={recipeMaterialStocks}
                    selected={selected}
                    setSelected={setSelected}
                />
                <Selected
                    selected={selected}
                />
            </Row>
        </div>
    )
}

export default Stocks
