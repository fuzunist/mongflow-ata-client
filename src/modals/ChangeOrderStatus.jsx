import FormikForm from '@/components/FormikForm'
import OrderStatus from '@/constants/OrderStatus'
import { updateOrderStatusInDB, updateOrderStatusSetInDB } from '@/services/order'
import { editStock, setOrderStatus, setOrderStatusSet } from '@/store/actions/apps'
import { useProducts, useSets } from '@/store/hooks/apps'
import { calculateAverageType } from '@/utils/apps'
import { mergeDeep } from '@/utils/helpers'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

const ChangeOrderStatus = ({ closeModal, order, product, set, index, access_token }) => {
    const { t } = useTranslation()
    const [error, setError] = useState('')
    const products = useProducts()
    const sets = useSets()

    const initialValues = {
        orderStatus: {
            tag: 'orderStatus',
            options: OrderStatus,
            value: product?.orderStatus ? mergeDeep([], [...product.orderStatus]) : set?.orderStatus ? mergeDeep([], [...set.orderStatus]) : []
        }
    }

    const onValidate = (values) => {
        const errors = {}
        if (values.orderStatus.length === 0) errors.orderStatus = 'At least one order status must be entered'
        if (values.orderStatus.some((orderStatus) => !orderStatus.quantity)) errors.orderStatus = 'quantity value cannot be left as 0'
        return errors
    }


    const onSubmitProduct = async (values) => {
        setError('');
        const totalOrderStatusQuantity = values.orderStatus
            .map((orderStatus) => orderStatus.quantity)
            .reduce((a, b) => a + b, 0);
    
        if (totalOrderStatusQuantity !== product.quantity) {
            return setError(t('checkTheQuantityValues'));
        }
    
        const changedProducts = mergeDeep([], [...order.products]).map((prod, indx) => {
            if (indx === index) {
                prod.orderStatus = values.orderStatus;
            }
            return prod;
        });
    
        const orderStatusNumber = calculateAverageType({ products: changedProducts, sets: order.sets });
        const orderStatus = orderStatusNumber === 0 ? 'İş Alındı' : orderStatusNumber === 3 ? 'İş Tamamen Bitti' : 'Hazırlıklar Başladı';
    
        const currentStockDiff = product.orderStatus
            .filter((status) => status.type === 'Sevk Edildi')
            .map((status) => status.quantity)
            .reduce((a, b) => a + b, 0) ?? 0;
    
        const changedStockDiff = values.orderStatus
            .filter((status) => status.type === 'Sevk Edildi')
            .map((status) => status.quantity)
            .reduce((a, b) => a + b, 0) ?? 0;
    
        const stockDiff = changedStockDiff - currentStockDiff;
    
        const _product = products.find((prod) => prod.product_id === product.product_id);
        const attributes = Object.entries(product.attributes)
            .map(([attr, value]) => {
                const _attr = _product.attributes.find((a) => a.attribute_name === attr);
                const _value = _attr.values.find((v) => v.value === value);
                return `${_attr.attribute_id}-${_value.value_id}`;
            })
            .join(',');
    
        const response = await updateOrderStatusInDB(access_token, order.order_id, changedProducts, orderStatus, stockDiff, attributes);
        if (response?.error) return setError(response.error);
        
        setOrderStatus(order.order_id, index, values.orderStatus, orderStatus);
        editStock(response.stock);
        closeModal();
    };

    
    const onSubmitSet = async (values) => {
        setError('');

    // Calculate the total quantity of order statuses for the entire set
    const totalOrderStatusQuantity = values.orderStatus
        .map((orderStatus) => orderStatus.quantity)
        .reduce((a, b) => a + b, 0);

    if (totalOrderStatusQuantity !== set.quantity) {
        return setError(t('checkTheQuantityValues'));
    }

    // Calculate stock differences for each product in the set
    const stockDiffs = set.products.map(product => {
        // Current stock based on existing order statuses of the set, scaled by product's own quantity
        const currentStock = set.orderStatus
            .filter(status => status.type === 'Sevk Edildi')
            .map(status => status.quantity * product.quantity)
            ?.reduce((a, b) => a + b, 0) ?? 0;

        // New stock based on new order statuses, scaled by product's own quantity
        const newStock = values.orderStatus
            .filter(status => status.type === 'Sevk Edildi')
            .map(status => status.quantity * product.quantity)
            ?.reduce((a, b) => a + b, 0) ?? 0;

        return newStock - currentStock;
    });
    
        // Calculate attributes (assuming similar logic to onSubmitProduct)
        const attributes = set.products.map(product => {
            const productInStore = products.find(p => p.product_id === product.product_id);
            return Object.entries(product.attributes)
                .map(([attr, value]) => {
                    const attributeInStore = productInStore.attributes.find(a => a.attribute_name === attr);
                    const valueInStore = attributeInStore.values.find(v => v.value === value);
                    return `${attributeInStore.attribute_id}-${valueInStore.value_id}`;
                })
                .join(','); // join with comma for individual product
        });
    
        // Update the order sets with the new order statuses
        const changedSets = mergeDeep([], [...order.sets]).map((s, indx) => {
            if (indx === index) {
                s.orderStatus = values.orderStatus;
            }
            return s;
        });
    
        // Calculate the average order status type
        const orderStatusNumber = calculateAverageType({ products: order.products, sets: changedSets });
        const orderStatus = orderStatusNumber === 0 ? 'İş Alındı' : orderStatusNumber === 3 ? 'İş Tamamen Bitti' : 'Hazırlıklar Başladı';
    
        // Update the order status in the database
        const response = await updateOrderStatusSetInDB(access_token, order.order_id, changedSets, orderStatus, stockDiffs, attributes);
        if (response?.error) return setError(response.error);
    
        // Update the Redux state and close the modal
        setOrderStatusSet(order.order_id, index, values.orderStatus, orderStatus);
        closeModal();
    };
    

    return (
        <FormikForm
            initialValues={initialValues}
            onSubmit={!!set ? onSubmitSet : onSubmitProduct}
            validate={onValidate}
            error={error}
            title={t('updateOrderStatus')}
            text={t('update')}
        />
    )
}

export default ChangeOrderStatus
