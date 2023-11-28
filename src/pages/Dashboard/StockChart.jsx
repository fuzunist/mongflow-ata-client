import { useMemo, useState } from 'react'
import { dateToIsoFormatWithTimezoneOffset, turnIntoOneForObjectInArray, zipArray } from '@/utils/helpers'

import Card from '@/components/Card'
import Col from '@/components/Col'
import Select from '@/components/Select'
import { useWindowSize } from 'react-use'
import LineChart from '@/components/Charts/LineChart'

const StockChart = ({ title, stocks, t }) => {
    const [selected, setSelected] = useState(t('choose'))
    const { width } = useWindowSize()

    const options = useMemo(() => {
        const _options = [t('choose')]
        if (!stocks.length) return _options
        return _options.concat(
            turnIntoOneForObjectInArray(
                stocks.map((stock) => ({ key: stock.product_id, value: stock.product_name })),
                'key'
            )
        )
    }, [stocks])

    const [categories, datas] = useMemo(() => {
        const _categories = [],
            _datas = []
        if (selected === t('choose')) return [_categories.concat(['-']), _datas.concat([0])]
        const filteredStocks = stocks.filter((stock) => stock.product_id === selected)

        return [
            _categories.concat([...new Set(filteredStocks.map((stock) => dateToIsoFormatWithTimezoneOffset(new Date(stock.date))))]),
            _datas.concat(
                Object.entries(zipArray(filteredStocks, 'date')).map(([key, value]) => value.map((val) => val.stock).reduce((a, b) => a + b))
            )
        ]
    }, [selected, stocks])

    return (
        <Col variant={width > 600 ? '1/2' : 'full'}>
            <Card>
                <Card.Body>
                    <Select
                        className='absolute top-0 right-0 mt-4 mr-6 min-w-[10rem] text-sm'
                        value={selected}
                        onChange={setSelected}
                        options={options}
                    />
                    <h4 className='text-text-dark-light dark:text-text-dark-dark text-base mb-9'>{title}</h4>
                    <div>
                        <LineChart
                            name={t('stock')}
                            categories={categories.slice(-10)}
                            datas={datas.slice(-10)}
                            colors={['#188ae2', '#3cc469']}
                            theme='dark'
                        />
                    </div>
                </Card.Body>
            </Card>
        </Col>
    )
}

export default StockChart
