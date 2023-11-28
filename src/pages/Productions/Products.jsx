import Card from '@/components/Card'
import Col from '@/components/Col'
import { useProducts } from '@/store/hooks/apps'
import { dateToIsoFormatWithTimezoneOffset } from '@/utils/helpers'
import { useTranslation } from 'react-i18next'

const Products = ({ productions, selected, setSelected }) => {
    const products = useProducts()
    const today = dateToIsoFormatWithTimezoneOffset(new Date())
    const { t } = useTranslation()

    return (
        <Col variant='full'>
            <Card>
                <Card.Body>
                    <div className='flex flex-col gap-4 max-h-[300px] h-[300px] overflow-y-auto scroller'>
                        {products.map((product, index) => (
                            <div
                                key={index}
                                className='flex justify-between items-center bg-border-light dark:bg-border-dark rounded-md p-4 select-none cursor-pointer'
                                onClick={() => setSelected(selected !== product.product_id ? product.product_id : null)}
                            >
                                <h5 className='text-text-dark-light dark:text-text-dark-dark font-medium flex-1'>{product.product_name}</h5>
                                <div className='text-text-dark-light dark:text-text-dark-dark font-medium flex-1 flex justify-start items-center gap-4'>
                                    <span>{t('todaysProduction')}:</span>
                                    <span>
                                        {(() => {
                                            const filteredProductions = productions.filter(
                                                (production) =>
                                                    production.product_id === product.product_id &&
                                                    dateToIsoFormatWithTimezoneOffset(new Date(production.date)) === today
                                            )

                                            if (filteredProductions.length === 0) return '-'
                                            return filteredProductions.map((production) => production.production).reduce((a, b) => a + b)
                                        })()}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </Card.Body>
            </Card>
        </Col>
    )
}

export default Products
