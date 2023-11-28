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
            console.log('check the quantity values in the onSubmitProduct function');
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
        console.log('check the quantity values in the onSubmitSet function');
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
        console.log("attributes array in the onSubmitSet function ", attributes);
        const response = await updateOrderStatusSetInDB(access_token, order.order_id, changedSets, orderStatus, stockDiffs, attributes);
        if (response?.error) return setError(response.error);
    
        // Update the Redux state and close the modal
        setOrderStatusSet(order.order_id, index, values.orderStatus, orderStatus);
        closeModal();
    };
    
    
    

   /* const onSubmitProduct = async (product, values, isSetUpdate = false) => {
        console.log('product in onSubmitProduct', product);
    setError('');

    const totalOrderStatusQuantity = values.orderStatus
        .map(orderStatus => orderStatus.quantity)
        .reduce((a, b) => a + b, 0);

    if (totalOrderStatusQuantity !== product.quantity) {
        console.log('check the quantity values in the onSubmitProduct function');
        return setError(t('checkTheQuantityValues'));
    }
    
        // Your existing logic for merging products and updating order status
        const changedProducts = mergeDeep([], [...order.products]).map((prod, indx) => {
            if (indx === index) {
                prod.orderStatus = values.orderStatus;
            }
            return prod;
        });
    
        const orderStatusNumber = calculateAverageType({ products: changedProducts, sets: order.sets });
        const orderStatus = orderStatusNumber === 0 ? 'İş Alındı' : orderStatusNumber === 3 ? 'İş Tamamen Bitti' : 'Hazırlıklar Başladı';
    
        // Your existing logic for calculating stock difference
        const currentStockDiff = product.orderStatus
            .filter((status) => status.type === 'Sevk Edildi')
            .map((status) => status.quantity)
            ?.reduce?.((a, b) => a + b, 0) ?? 0;
    
        const changedStockDiff = values.orderStatus
            .filter((status) => status.type === 'Sevk Edildi')
            .map((status) => status.quantity)
            ?.reduce?.((a, b) => a + b, 0) ?? 0;
    
        const stockDiff = changedStockDiff - currentStockDiff;
    
        // Your existing logic for finding product attributes
        const _product = products.find((prod) => prod.product_id === product.product_id);
        const attributes = Object.entries(product.attributes)
            .map(([attr, value]) => {
                const _attr = _product.attributes.find((a) => a.attribute_name === attr);
                const _value = _attr.values.find((v) => v.value === value);
                return `${_attr.attribute_id}-${_value.value_id}`;
            })
            .join(',');
    
        // Your existing logic for updating the order status in the database
        const response = await updateOrderStatusInDB(access_token, order.order_id, changedProducts, orderStatus, stockDiff, attributes);
        if (response?.error) return setError(response.error);
    
        // Your existing logic for setting order status and editing stock
        setOrderStatus(order.order_id, index, values.orderStatus, orderStatus);
        editStock(response.stock);
        closeModal();
    }
    


    const onSubmitSet = async (values) => {
        setError('');
        console.log('values.orderStatus in the onSubmitSet function', values.orderStatus);
    
        const totalOrderStatus = values.orderStatus
            .map(orderStatus => orderStatus.quantity)
            .reduce((a, b) => a + b, 0);
    
        if (totalOrderStatus !== set.quantity) {
            console.log('check the quantity values in the onSubmitSet function');
            return setError(t('checkTheQuantityValues'));
        }
    
        // Begin logic to update each product in the set
        let allProductsUpdated = true;
        let stockDiffTotal = 0;
        let response;
    
        const changedSets = mergeDeep([], [...order.sets]);
        changedSets.forEach(changedSet => {
            if (changedSet.set_id === set.set_id) {
                changedSet.orderStatus = values.orderStatus;
            }
        });
    
        for (const product of set.products) {
            // Update order status for each product in the set
            const productOrderStatuses = values.orderStatus.map(status => ({
                ...status,
                quantity: status.quantity * product.quantity
            }));
    
            const currentStockDiff = product.orderStatus
                .filter(status => status.type === 'Sevk Edildi')
                .map(status => status.quantity)
                .reduce((a, b) => a + b, 0) ?? 0;
    
            const changedStockDiff = productOrderStatuses
                .map(status => status.quantity)
                .reduce((a, b) => a + b, 0);
    
            const stockDiff = changedStockDiff - currentStockDiff;
            stockDiffTotal += stockDiff;
    
            // Use the updateOrderStatusInDB function directly here
            response = await updateOrderStatusInDB(access_token, order.order_id, changedSets, orderStatus, stockDiffTotal, attributes);
            if (response?.error) {
                setError(response.error);
                allProductsUpdated = false;
                break;
            }
        }
    
        if (allProductsUpdated) {
            // Handle success (update UI, etc.)
            const orderStatusNumber = calculateAverageType({ products: order.products, sets: changedSets });
            const orderStatus = orderStatusNumber === 0 ? 'İş Alındı' : orderStatusNumber === 3 ? 'İş Tamamen Bitti' : 'Hazırlıklar Başladı';
            setOrderStatusSet(order.order_id, index, values.orderStatus, orderStatus);
            editStock(stockDiffTotal);
            closeModal();
        } else {
            // Handle the case where not all products were updated successfully
            console.error('Not all products in the set could be updated:', response?.error);
        }
    };*/
    




   /* çalışan kod 
   const onSubmitProduct = async (product, values, isSetUpdate = false) => {
        console.log('product in onSubmitProduct', product);
        setError('');
    
        // Calculate the total quantity from order statuses
        const totalOrderStatusQuantity = values.orderStatus.map((orderStatus) => orderStatus.quantity).reduce((a, b) => a + b, 0);
    
        // Determine the expected quantity based on whether it's a set update or not
        const expectedQuantity = isSetUpdate ? totalOrderStatusQuantity : product.quantity;
    
        if (totalOrderStatusQuantity !== expectedQuantity) {
            console.log('check the quantity values in the onSubmitProduct function');
            return setError(t('checkTheQuantityValues'));
        }
    
        // Your existing logic for merging products and updating order status
        const changedProducts = mergeDeep([], [...order.products]).map((prod, indx) => {
            if (indx === index) {
                prod.orderStatus = values.orderStatus;
            }
            return prod;
        });
    
        const orderStatusNumber = calculateAverageType({ products: changedProducts, sets: order.sets });
        const orderStatus = orderStatusNumber === 0 ? 'İş Alındı' : orderStatusNumber === 3 ? 'İş Tamamen Bitti' : 'Hazırlıklar Başladı';
    
        // Your existing logic for calculating stock difference
        const currentStockDiff = product.orderStatus
            .filter((status) => status.type === 'Sevk Edildi')
            .map((status) => status.quantity)
            ?.reduce?.((a, b) => a + b, 0) ?? 0;
    
        const changedStockDiff = values.orderStatus
            .filter((status) => status.type === 'Sevk Edildi')
            .map((status) => status.quantity)
            ?.reduce?.((a, b) => a + b, 0) ?? 0;
    
        const stockDiff = changedStockDiff - currentStockDiff;
    
        // Your existing logic for finding product attributes
        const _product = products.find((prod) => prod.product_id === product.product_id);
        const attributes = Object.entries(product.attributes)
            .map(([attr, value]) => {
                const _attr = _product.attributes.find((a) => a.attribute_name === attr);
                const _value = _attr.values.find((v) => v.value === value);
                return `${_attr.attribute_id}-${_value.value_id}`;
            })
            .join(',');
    
        // Your existing logic for updating the order status in the database
        const response = await updateOrderStatusInDB(access_token, order.order_id, changedProducts, orderStatus, stockDiff, attributes);
        if (response?.error) return setError(response.error);
    
        // Your existing logic for setting order status and editing stock
        setOrderStatus(order.order_id, index, values.orderStatus, orderStatus);
        editStock(response.stock);
        closeModal();
    }
    


    const onSubmitSet = async (values) => {
        setError('')
        console.log('values.orderStatus in the onSubmitSet function', values.orderStatus)
        const totalOrderStatus = values.orderStatus.map((orderStatus) => orderStatus.quantity).reduce((a, b) => a + b, 0);
        if (totalOrderStatus !== set.quantity){
            console.log('check the quantity values in the onSubmitSet function')
            return setError(t('checkTheQuantityValues')
            )
        }

        const changedSets = mergeDeep([], [...order.sets]).map((set, indx) => {
            if (indx === index) {
                set.orderStatus = values.orderStatus
            }
            return set
        })
    
        const orderStatusNumber = calculateAverageType({ products: order.products, sets: changedSets })
        const orderStatus = orderStatusNumber === 0 ? 'İş Alındı' : orderStatusNumber === 3 ? 'İş Tamamen Bitti' : 'Hazırlıklar Başladı'
    
        console.log('set.orderStatus in the onSubmitSet function:', set.orderStatus);
        console.log('values.orderStatus in the onSubmitSet function:', values.orderStatus); 
        const currentStockDiff = set.orderStatus.filter((status) => status.type === 'Sevk Edildi').map((status) => status.quantity)?.reduce?.((a, b) => a + b, 0) ?? 0
        const changedStockDiff = values.orderStatus.filter((status) => status.type === 'Sevk Edildi').map((status) => status.quantity)?.reduce?.((a, b) => a + b, 0) ?? 0
        const stockDiff = changedStockDiff - currentStockDiff
    
        for (const product of set.products) {
            const productWithStatus = {
                ...product,
                orderStatus: product.orderStatus || [] // Ensure orderStatus is defined.
            };
            
            const productValues = {
                orderStatus: values.orderStatus.map(status => ({
                    ...status,
                    quantity: status.quantity * productWithStatus.quantity
                }))
            };
            
            console.log(`New orderStatus for product ${product.product_id}: in the onSubmitSet function`, productValues.orderStatus);
            // Pass true as the third argument since this is a set update
            await onSubmitProduct(productWithStatus, productValues, true);
        }
        
        
    
        setOrderStatusSet(order.order_id, index, values.orderStatus, orderStatus)
        closeModal()
    }*/
   

   /* const onSubmitSet = async (values) => {
        setError('')
        const totalOrderStatus = values.orderStatus.map((orderStatus) => orderStatus.quantity).reduce((a, b) => a + b, 0);
        if (totalOrderStatus !== set.quantity)
            return setError(t('checkTheQuantityValues'))
    
        
    
        const orderStatusNumber = calculateAverageType({ products: order.products, sets: changedSets })
        const orderStatus = orderStatusNumber === 0 ? 'İş Alındı' : orderStatusNumber === 3 ? 'İş Tamamen Bitti' : 'Hazırlıklar Başladı'
    
        for (const product of set.products) {

            const changedSets = mergeDeep([], [...order.sets]).map((set, indx) => {
                if (indx === index) {
                    set.orderStatus = values.orderStatus
                }
                return set
            })


            const currentStockDiff = set.orderStatus.filter((status) => status.type === 'Sevk Edildi').map((status) => status.quantity)?.reduce?.((a, b) => a + b, 0) ?? 0
            const changedStockDiff = values.orderStatus.filter((status) => status.type === 'Sevk Edildi').map((status) => status.quantity)?.reduce?.((a, b) => a + b, 0) ?? 0
            const stockDiff = changedStockDiff - currentStockDiff
    
            const _product = products.find((prod) => prod.product_id === product.product_id)
            const attributes = Object.entries(product.attributes)
                .map(([attr, value]) => {
                    const _attr = _product.attributes.find((_) => _.attribute_name === attr)
                    const _value = _attr.values.find((_) => _.value === value)
                    return `${_attr.attribute_id}-${_value.value_id}`
                })
                .join(',')
    
            const response = await updateOrderStatusInDB(access_token, order.order_id, changedSets, orderStatus, stockDiff, attributes)
            if (response?.error) return setError(response.error)
        }
    
        setOrderStatusSet(order.order_id, index, values.orderStatus, orderStatus)
        closeModal()
    }*/


     /* const onSubmitSet = async (values) => {
        console.log('Structure of a set:', set);
        setError('')
        //toplam order status değeri, set in sipariş adedine eşit mi değil mi o kontrol edildi
        if (values.orderStatus.map((orderStatus) => orderStatus.quantity).reduce((a, b) => a + b, 0) !== set.quantity)
            return setError(t('checkTheQuantityValues'))
      
        // mevcut set in index değeri gösterildi
        console.log(index)

        // yeni bir array oluşturuldu. bu array mevcut set ler kopyalanarak oluşturuldu.
        const changedSets = mergeDeep([], [...order.sets]).map((set, indx) => {
            console.log(indx, set)
            //set in order status u , yeni order status ler ile değiştirildi
            if (indx === index) {
                set.orderStatus = values.orderStatus
            }
            return set
        })

        // product ları ve updated sets leri kullanarak orderStatusNumber oluşturuldu.
        const orderStatusNumber = calculateAverageType({ products: order.products, sets: changedSets })
        // order status number kullanılarak order status oluşturuldu
        const orderStatus = orderStatusNumber === 0 ? 'İş Alındı' : orderStatusNumber === 3 ? 'İş Tamamen Bitti' : 'Hazırlıklar Başladı'

        const response = await updateOrderStatusSetInDB(access_token, order.order_id, changedSets, orderStatus)
        if (response?.error) return setError(response.error)
        setOrderStatusSet(order.order_id, index, values.orderStatus, orderStatus)
        closeModal()
    }*/

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
