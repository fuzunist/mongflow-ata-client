import Row from '@/components/Row'
import Orders from './Orders'
import StockChart from './StockChart'
import { useTranslation } from 'react-i18next'
import { useProductions, useStocks } from '@/store/hooks/apps'
import ProductionChart from './ProductionChart'

const Dasboard = () => {
    const { t } = useTranslation()
    const stocks = useStocks()
    const productions = useProductions()
    return (
        <Row>
            <Orders />
            <StockChart
                title={t('stocks')}
                stocks={stocks}
                t={t}
            />
            <ProductionChart
                title={t('productions')}
                productions={productions}
                t={t}
            />
        </Row>
    )
}

export default Dasboard
