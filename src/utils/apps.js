import OrderStatus from '@/constants/OrderStatus'

// Bu fonksiyon, bir siparişin ortalama tipini hesaplar.
export const calculateAverageType = (order) => {
    // Bu yardımcı fonksiyon, bir ürünün ortalama tipini hesaplar.
    const _calculateAverageType = (product) => {
        // Toplam sipariş durumu sayısını alır.
        const totalTypeCount = product.orderStatus.length
        // Her sipariş durumunun tipinin indeksini toplar.
        const totalTypeIndex = product.orderStatus.reduce((total, status) => total + OrderStatus.indexOf(status.type), 0)

        // Toplam indeks sayısını toplam durum sayısına böler ve ortalama tipi döndürür.
        return totalTypeIndex / totalTypeCount
    }

    // Siparişin tüm ürünlerinin ve setlerinin ortalama tiplerini toplar ve bunları toplam ürün ve set sayısına böler.
    // Bu, siparişin ortalama tipini verir.
    return (
        (order.products.reduce((total, product) => total + _calculateAverageType(product), 0) +
            order.sets.reduce((total, set) => total + _calculateAverageType(set), 0)) /
        (order.products.length + order.sets.length)
    )
}