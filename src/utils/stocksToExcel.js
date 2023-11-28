import ExcelJS from 'exceljs'
import { isArray } from './helpers'

const organizeStocksByProduct = (stocks) => {
    const organizedData = {}

    stocks.forEach((stock) => {
        const productId = stock.product_id
        const attributes = stock.attributes
        const stockValue = stock.stock
        const date = new Date(stock.date).getTime()

        if (!organizedData[productId]) {
            organizedData[productId] = {}
        }

        if (!organizedData[productId][attributes]) {
            organizedData[productId][attributes] = {
                stock: 0,
                date: 0
            }
        }

        if (date > organizedData[productId][attributes].date) {
            organizedData[productId][attributes] = {
                stock: stockValue,
                date: date
            }
        }
    })

    return organizedData
}

const combineAttributes = (arrays) => {
    const helper = (arrays, index, currentCombination) => {
        if (index === arrays.length) {
            return [currentCombination]
        }

        const results = []
        const currentArray = arrays[index]
        for (let i = 0; i < currentArray.length; i++) {
            results.push(...helper(arrays, index + 1, [...currentCombination, currentArray[i]]))
        }

        return results
    }
    return helper(arrays, 0, [])
}

const stocksToExcel = async (products, stocks, zeros) => {
    const workbook = new ExcelJS.Workbook()
    const worksheet = workbook.addWorksheet('STOCKS')

    const organizedStocks = organizeStocksByProduct(stocks)

    const combinedProducts = []

    const _products = isArray(products) ? products : [products]

    _products.forEach((product) => {
        const productName = product.product_name
        const productId = product.product_id

        const attributesList = product.attributes.map((attribute) => {
            const attributeName = attribute.attribute_name
            return attribute.values.map((value) => [`${attributeName}: ${value.value}`, `${attribute.attribute_id}-${value.value_id}`])
        })

        const attributeCombinations = combineAttributes(attributesList)

        attributeCombinations.forEach((combination) => {
            const newCombination = combination.map((comb) => comb[0])
            const attributes = combination.map((comb) => comb[1]).join(',')
            const stock = organizedStocks?.[productId]?.[attributes]?.stock ?? 0
            if (!zeros) if (!stock) return
            combinedProducts.push([`${productName} - ${newCombination.join(', ')}`, stock])
        })
    })

    // sayfa yapısı
    worksheet.pageSetup.fitToPage = true
    worksheet.pageSetup.fitToHeight = 1
    worksheet.pageSetup.fitToWidth = 1
    worksheet.pageSetup.paperSize = 9
    worksheet.pageSetup.horizontalCentered = true
    worksheet.pageSetup.verticalCentered = true
    worksheet.pageSetup.margins = {
        left: 0,
        right: 0.5,
        top: 0.5,
        bottom: 0.5,
        header: 0,
        footer: 0
    }

    // sütun genişlikleri ayarlanması.
    worksheet.getColumn('A').width = 8.82
    worksheet.getColumn('B').width = 17.78
    worksheet.getColumn('C').width = 17.78
    worksheet.getColumn('D').width = 17.78
    worksheet.getColumn('E').width = 17.78
    worksheet.getColumn('F').width = 17.78
    worksheet.getColumn('G').width = 17.78
    worksheet.getColumn('H').width = 17.78
    worksheet.getColumn('I').width = 17.78
    worksheet.getColumn('J').width = 17.78
    worksheet.getColumn('K').width = 17.78

    const doubleBorderStyle = { style: 'double', color: { argb: '000000' } }
    const thinBorderStyle = { style: 'thin', color: { argb: '000000' } }

    combinedProducts.forEach((combinedProduct, index) => {
        worksheet.mergeCells(`B${index + 2}:J${index + 2}`) // hücrelerin birleştirilmesi
        worksheet.getRow(index + 2).height = 21 // hücre yüksekliği
        worksheet.getCell(`B${index + 2}`).alignment = { vertical: 'middle', horizontal: 'center' } // ürün hücresinin hizalanması
        worksheet.getCell(`K${index + 2}`).alignment = { vertical: 'middle', horizontal: 'center' } // stok hücresinin hüzalanması

        const borderCells = []

        if (index === 0) {
            const _borderCells = [
                {
                    cell: `B${index + 2}`,
                    borders: [
                        {
                            key: 'top',
                            style: doubleBorderStyle
                        },
                        {
                            key: 'left',
                            style: doubleBorderStyle
                        },
                        {
                            key: 'bottom',
                            style: thinBorderStyle
                        }
                    ]
                },
                {
                    cell: `C${index + 2}`,
                    borders: [
                        {
                            key: 'top',
                            style: doubleBorderStyle
                        },
                        {
                            key: 'left',
                            style: thinBorderStyle
                        },
                        {
                            key: 'bottom',
                            style: thinBorderStyle
                        }
                    ]
                },
                {
                    cell: `D${index + 2}`,
                    borders: [
                        {
                            key: 'top',
                            style: doubleBorderStyle
                        },
                        {
                            key: 'left',
                            style: thinBorderStyle
                        },
                        {
                            key: 'bottom',
                            style: thinBorderStyle
                        }
                    ]
                },
                {
                    cell: `E${index + 2}`,
                    borders: [
                        {
                            key: 'top',
                            style: doubleBorderStyle
                        },
                        {
                            key: 'left',
                            style: thinBorderStyle
                        },
                        {
                            key: 'bottom',
                            style: thinBorderStyle
                        }
                    ]
                },
                {
                    cell: `F${index + 2}`,
                    borders: [
                        {
                            key: 'top',
                            style: doubleBorderStyle
                        },
                        {
                            key: 'left',
                            style: thinBorderStyle
                        },
                        {
                            key: 'bottom',
                            style: thinBorderStyle
                        }
                    ]
                },
                {
                    cell: `G${index + 2}`,
                    borders: [
                        {
                            key: 'top',
                            style: doubleBorderStyle
                        },
                        {
                            key: 'left',
                            style: thinBorderStyle
                        },
                        {
                            key: 'bottom',
                            style: thinBorderStyle
                        }
                    ]
                },
                {
                    cell: `H${index + 2}`,
                    borders: [
                        {
                            key: 'top',
                            style: doubleBorderStyle
                        },
                        {
                            key: 'left',
                            style: thinBorderStyle
                        },
                        {
                            key: 'bottom',
                            style: thinBorderStyle
                        }
                    ]
                },
                {
                    cell: `I${index + 2}`,
                    borders: [
                        {
                            key: 'top',
                            style: doubleBorderStyle
                        },
                        {
                            key: 'left',
                            style: thinBorderStyle
                        },
                        {
                            key: 'bottom',
                            style: thinBorderStyle
                        }
                    ]
                },
                {
                    cell: `J${index + 2}`,
                    borders: [
                        {
                            key: 'top',
                            style: doubleBorderStyle
                        },
                        {
                            key: 'left',
                            style: thinBorderStyle
                        },
                        {
                            key: 'bottom',
                            style: thinBorderStyle
                        }
                    ]
                },
                {
                    cell: `K${index + 2}`,
                    borders: [
                        {
                            key: 'top',
                            style: doubleBorderStyle
                        },
                        {
                            key: 'left',
                            style: thinBorderStyle
                        },
                        {
                            key: 'bottom',
                            style: thinBorderStyle
                        },
                        {
                            key: 'right',
                            style: doubleBorderStyle
                        }
                    ]
                }
            ]
            borderCells.push(..._borderCells)
        } else if (index === combinedProducts.length - 1) {
            const _borderCells = [
                {
                    cell: `B${index + 2}`,
                    borders: [
                        {
                            key: 'left',
                            style: doubleBorderStyle
                        },
                        {
                            key: 'bottom',
                            style: doubleBorderStyle
                        }
                    ]
                },
                {
                    cell: `C${index + 2}`,
                    borders: [
                        {
                            key: 'left',
                            style: thinBorderStyle
                        },
                        {
                            key: 'bottom',
                            style: doubleBorderStyle
                        }
                    ]
                },
                {
                    cell: `D${index + 2}`,
                    borders: [
                        {
                            key: 'left',
                            style: thinBorderStyle
                        },
                        {
                            key: 'bottom',
                            style: doubleBorderStyle
                        }
                    ]
                },
                {
                    cell: `E${index + 2}`,
                    borders: [
                        {
                            key: 'left',
                            style: thinBorderStyle
                        },
                        {
                            key: 'bottom',
                            style: doubleBorderStyle
                        }
                    ]
                },
                {
                    cell: `F${index + 2}`,
                    borders: [
                        {
                            key: 'left',
                            style: thinBorderStyle
                        },
                        {
                            key: 'bottom',
                            style: doubleBorderStyle
                        }
                    ]
                },
                {
                    cell: `G${index + 2}`,
                    borders: [
                        {
                            key: 'left',
                            style: thinBorderStyle
                        },
                        {
                            key: 'bottom',
                            style: doubleBorderStyle
                        }
                    ]
                },
                {
                    cell: `H${index + 2}`,
                    borders: [
                        {
                            key: 'left',
                            style: thinBorderStyle
                        },
                        {
                            key: 'bottom',
                            style: doubleBorderStyle
                        }
                    ]
                },
                {
                    cell: `I${index + 2}`,
                    borders: [
                        {
                            key: 'left',
                            style: thinBorderStyle
                        },
                        {
                            key: 'bottom',
                            style: doubleBorderStyle
                        }
                    ]
                },
                {
                    cell: `J${index + 2}`,
                    borders: [
                        {
                            key: 'left',
                            style: thinBorderStyle
                        },
                        {
                            key: 'bottom',
                            style: doubleBorderStyle
                        }
                    ]
                },
                {
                    cell: `K${index + 2}`,
                    borders: [
                        {
                            key: 'left',
                            style: thinBorderStyle
                        },
                        {
                            key: 'bottom',
                            style: doubleBorderStyle
                        },
                        {
                            key: 'right',
                            style: doubleBorderStyle
                        }
                    ]
                }
            ]
            borderCells.push(..._borderCells)
        } else {
            const _borderCells = [
                {
                    cell: `B${index + 2}`,
                    borders: [
                        {
                            key: 'left',
                            style: doubleBorderStyle
                        },
                        {
                            key: 'bottom',
                            style: thinBorderStyle
                        }
                    ]
                },
                {
                    cell: `C${index + 2}`,
                    borders: [
                        {
                            key: 'left',
                            style: thinBorderStyle
                        },
                        {
                            key: 'bottom',
                            style: thinBorderStyle
                        }
                    ]
                },
                {
                    cell: `D${index + 2}`,
                    borders: [
                        {
                            key: 'left',
                            style: thinBorderStyle
                        },
                        {
                            key: 'bottom',
                            style: thinBorderStyle
                        }
                    ]
                },
                {
                    cell: `E${index + 2}`,
                    borders: [
                        {
                            key: 'left',
                            style: thinBorderStyle
                        },
                        {
                            key: 'bottom',
                            style: thinBorderStyle
                        }
                    ]
                },
                {
                    cell: `F${index + 2}`,
                    borders: [
                        {
                            key: 'left',
                            style: thinBorderStyle
                        },
                        {
                            key: 'bottom',
                            style: thinBorderStyle
                        }
                    ]
                },
                {
                    cell: `G${index + 2}`,
                    borders: [
                        {
                            key: 'left',
                            style: thinBorderStyle
                        },
                        {
                            key: 'bottom',
                            style: thinBorderStyle
                        }
                    ]
                },
                {
                    cell: `H${index + 2}`,
                    borders: [
                        {
                            key: 'left',
                            style: thinBorderStyle
                        },
                        {
                            key: 'bottom',
                            style: thinBorderStyle
                        }
                    ]
                },
                {
                    cell: `I${index + 2}`,
                    borders: [
                        {
                            key: 'left',
                            style: thinBorderStyle
                        },
                        {
                            key: 'bottom',
                            style: thinBorderStyle
                        }
                    ]
                },
                {
                    cell: `J${index + 2}`,
                    borders: [
                        {
                            key: 'left',
                            style: thinBorderStyle
                        },
                        {
                            key: 'bottom',
                            style: thinBorderStyle
                        }
                    ]
                },
                {
                    cell: `K${index + 2}`,
                    borders: [
                        {
                            key: 'left',
                            style: thinBorderStyle
                        },
                        {
                            key: 'bottom',
                            style: thinBorderStyle
                        },
                        {
                            key: 'right',
                            style: doubleBorderStyle
                        }
                    ]
                }
            ]
            borderCells.push(..._borderCells)
        }

        borderCells.forEach((cell) => {
            const borderStyle = {}
            cell.borders.forEach((border) => {
                borderStyle[border.key] = border.style
            })
            worksheet.getCell(cell.cell).border = borderStyle
        })

        worksheet.getCell(`B${index + 2}`).font = {
            name: 'Quattrocento Sans',
            size: 12,
            bold: false,
            italic: false,
            color: { argb: '000000' }
        }

        worksheet.getCell(`K${index + 2}`).font = {
            name: 'Quattrocento Sans',
            size: 14,
            bold: false,
            italic: false,
            color: { argb: '000000' }
        }

        worksheet.getCell(`B${index + 2}`).value = combinedProduct[0]
        worksheet.getCell(`K${index + 2}`).value = combinedProduct[1]
    })

    const data = await workbook.xlsx.writeBuffer()
    const blob = new Blob([data], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheet.sheet'
    })
    const url = window.URL.createObjectURL(blob)
    const anchor = document.createElement('a')
    anchor.href = url
    anchor.download = 'stocks.xlsx'
    anchor.click()
    window.URL.revokeObjectURL(url)
}

export default stocksToExcel
