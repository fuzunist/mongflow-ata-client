import { useMemo, useState } from 'react'
import { dateToIsoFormatWithTimezoneOffset, turnIntoOneForObjectInArray } from '@/utils/helpers'

import Card from '@/components/Card'
import BarChart from '@/components/Charts/BarChart'
import Col from '@/components/Col'
import Select from '@/components/Select'
import { useWindowSize } from 'react-use'

const ProductionChart = ({ title, productions, t }) => {
    const [selected, setSelected] = useState(t('choose'))
    const { width } = useWindowSize()

    const options = useMemo(() => {
        const _options = [t('choose')]
        if (!productions.length) return _options
        return _options.concat(
            turnIntoOneForObjectInArray(
                productions.map((production) => ({ key: production.product_id, value: production.product_name })),
                'key'
            )
        )
    }, [productions])

    const [categories, datas] = useMemo(() => {
        const _categories = [],
            _datas = []
        if (selected === t('choose')) return [_categories.concat(['-']), _datas.concat([0])]
        const filteredProductions = productions.filter((production) => production.product_id === selected)

        return [
            _categories.concat(filteredProductions.map((production) => dateToIsoFormatWithTimezoneOffset(new Date(production.date)))),
            _datas.concat(filteredProductions.map((production) => production.production))
        ]
    }, [selected, productions])


     console.log("datas of barchart productions::", datas)
     console.log("categories of barchart productions::", categories)

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
                        <BarChart
                            name={t('production')}
                            categories={categories.slice(-10)}
                            datas={datas.slice(-10)}
                            colors={['#188ae2']}
                            theme='dark'
                        />
                    </div>
                </Card.Body>
            </Card>
        </Col>
    )
}

export default ProductionChart
