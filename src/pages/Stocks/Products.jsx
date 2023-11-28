import Card from '@/components/Card'
import Col from '@/components/Col'
import { useProducts } from '@/store/hooks/apps'
import { dateToIsoFormatWithTimezoneOffset } from '@/utils/helpers'
import stocksToExcel from '@/utils/stocksToExcel'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

const Products = ({ stocks, selected, setSelected }) => {
    const products = useProducts()
    const [zeros, setZeros] = useState(new Array(products.length).fill(true))
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
                                <div className='text-text-dark-light dark:text-text-dark-dark font-medium flex-1 flex justify-center items-center gap-4'>
                                    <span>{t('todaysStock')}:</span>
                                    <span>
                                        {(() => {
                                            const filteredStocks = stocks.filter(
                                                (stock) =>
                                                    stock.product_id === product.product_id &&
                                                    dateToIsoFormatWithTimezoneOffset(new Date(stock.date)) === today
                                            )

                                            if (filteredStocks.length === 0) return '-'
                                            return filteredStocks.map((stock) => stock.stock).reduce((a, b) => a + b)
                                        })()}
                                    </span>
                                </div>
                                <div className='flex-1 flex justify-end items-center gap-4'>
                                    <label className='flex justify-center items-center gap-2 cursor-pointer'>
                                        <span className='text-text-dark-light dark:text-text-dark-dark text-sm font-semibold select-none'>
                                            {t('allStocks')}
                                        </span>
                                        <input
                                            type='checkbox'
                                            checked={zeros[index]}
                                            onChange={(e) =>
                                                setZeros((zeros) =>
                                                    zeros.map((zero, indx) => {
                                                        if (indx === index) zero = e.target.checked
                                                        return zero
                                                    })
                                                )
                                            }
                                            className='rounded outline-none cursor-pointer bg-purple border-none'
                                        />
                                    </label>
                                    <button
                                        className='bg-purple hover:bg-purple-hover text-white rounded-full py-2 px-4'
                                        onClick={(e) => {
                                            e.preventDefault()
                                            stocksToExcel(product, stocks, zeros[index])
                                        }}
                                    >
                                        {t('saveAsExcel')}
                                    </button>
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
