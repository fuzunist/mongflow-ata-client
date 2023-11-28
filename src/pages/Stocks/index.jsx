import Row from '@/components/Row'
import Header from './Header'
import Products from './Products'
import { useStocks } from '@/store/hooks/apps'
import { useState } from 'react'
import Selected from './Selected'

const Stocks = () => {
    const stocks = useStocks()
    const [selected, setSelected] = useState(null)

    return (
        <>
            <Header stocks={stocks} />
            <Row align='center'>
                <Products
                    stocks={stocks}
                    selected={selected}
                    setSelected={setSelected}
                />
                <Selected
                    selected={selected}
                    stocks={stocks}
                />
            </Row>
        </>
    )
}

export default Stocks
