import Card from '@/components/Card'
import Col from '@/components/Col'
import Modal from '@/components/Modal'
import CreateStock from '@/modals/CreateStock'
import { useProducts } from '@/store/hooks/apps'
import { dateToIsoFormatWithTimezoneOffset, filterOlderThan10Days, zipArray } from '@/utils/helpers'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

const Selected = ({ selected, stocks }) => {
    const products = useProducts()
    const { t } = useTranslation()

    const filteredStocks = useMemo(() => {
        if (!stocks || !stocks.length) return []
        const filtered = stocks.filter((stock) => stock.product_id === selected)
        const zipped = zipArray(filtered, 'date')
        filterOlderThan10Days(zipped, new Date())
        return zipped
    }, [stocks, selected])

    const attributes = useMemo(() => {
        const _attributes = {}
        products.forEach((product) => {
            product.attributes.forEach((attr) => {
                _attributes[attr.attribute_id] = attr.attribute_name
            })
        })
        return _attributes
    }, [products])

    const values = useMemo(() => {
        const _values = {}
        products.forEach((product) => {
            product.attributes.forEach((attr) => {
                attr.values.forEach((val) => {
                    _values[val.value_id] = val.value
                })
            })
        })
        return _values
    }, [products])

    if (!selected) return null

    return (
        <Col variant='full'>
            <Card>
                <Card.Body>
                    <div className='flex flex-col justify-start items-center'>
                        <h2 className='text-2xl font-semibold text-text-dark-light dark:text-text-dark-dark mb-6'>
                            {products.find((product) => product.product_id === selected).product_name}
                        </h2>

                        <div className='flex flex-col w-full gap-4 min-h-[225px] max-h-[225px] overflow-y-auto scroller'>
                            {Object.entries(filteredStocks).map(([key, stocks], index) => (
                                <div
                                    className='flex flex-col gap-2 bg-border-light dark:bg-border-dark rounded-md p-4 select-none'
                                    key={index}
                                >
                                    <div className='flex justify-between items-center'>
                                        <span>{key}</span>
                                        <span>
                                            {t('total_stock')}:{' '}
                                            {(() => {
                                                const _filteredStocks = stocks.filter(
                                                    (stock) => dateToIsoFormatWithTimezoneOffset(new Date(stock.date)) === key
                                                )

                                                if (_filteredStocks.length === 0) return '-'
                                                return _filteredStocks.map((stock) => stock.stock).reduce((a, b) => a + b)
                                            })()}
                                        </span>
                                    </div>
                                    <hr className='border-body-fg-dark dark:border-body-fg-light w-full' />
                                    <div className='flex flex-col max-h-[160px] gap-2 overflow-y-auto scroller'>
                                        {stocks.map((stock, _indx) => (
                                            <Modal
                                                key={_indx}
                                                text={
                                                    <>
                                                        <span className='flex-1 overflow-x-auto scroller whitespace-nowrap text-left'>
                                                            {stock.attributes
                                                                .split(',')
                                                                .map(
                                                                    (attr) =>
                                                                        `${attributes[parseInt(attr.split('-')[0])]}: ${
                                                                            values[parseInt(attr.split('-')[1])]
                                                                        }`
                                                                )
                                                                .join(', ')}
                                                        </span>
                                                        <span>
                                                            {t('stock')}: {stock.stock}
                                                        </span>
                                                    </>
                                                }
                                                className='flex justify-between items-center p-2 rounded border border-body-fg-dark dark:border-body-fg-light select-none cursor-pointer'
                                            >
                                                {({ close }) => (
                                                    <CreateStock
                                                        closeModal={close}
                                                        editing={true}
                                                        selected={stock}
                                                    />
                                                )}
                                            </Modal>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </Card.Body>
            </Card>
        </Col>
    )
}

export default Selected
