import ExcelJS from 'exceljs'
import { imageToBase64 } from './helpers'
import i18n from '@/i18n'

const invoiceToPDF_Eng = async (values, products, sets, user, customer, totalPrice, taxRate, orderNumber) => {
    const workbook = new ExcelJS.Workbook()
    const worksheet = workbook.addWorksheet('INVOICE')

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

    // hücrelerin birleştirilmesi
    worksheet.mergeCells('B2:C9')
    worksheet.mergeCells('E4:H5')
    worksheet.mergeCells('F6:G6')
    worksheet.mergeCells('F7:G7')
    worksheet.mergeCells('F8:G8')
    worksheet.mergeCells('J3:K6')
    worksheet.mergeCells('B10:C10')
    worksheet.mergeCells('F10:G10')
    worksheet.mergeCells('J10:K10')
    worksheet.mergeCells('B11:F11')
    worksheet.mergeCells('G11:K11')
    worksheet.mergeCells('C12:F12')
    worksheet.mergeCells('H12:K12')
    worksheet.mergeCells('B13:B14')
    worksheet.mergeCells('G13:G14')
    worksheet.mergeCells('C13:F13')
    worksheet.mergeCells('H13:K13')
    worksheet.mergeCells('C14:F14')
    worksheet.mergeCells('H14:K14')
    worksheet.mergeCells('C15:F15')
    worksheet.mergeCells('H15:K15')
    worksheet.mergeCells('C16:F16')
    worksheet.mergeCells('H16:K16')
    worksheet.mergeCells('C17:F17')
    worksheet.mergeCells('H17:K17')
    worksheet.mergeCells('C19:G19')
    worksheet.mergeCells('C20:G20')
    worksheet.mergeCells('C21:G21')
    worksheet.mergeCells('C22:G22')
    worksheet.mergeCells('C23:G23')
    worksheet.mergeCells('C24:G24')
    worksheet.mergeCells('C25:G25')
    worksheet.mergeCells('C26:G26')
    worksheet.mergeCells('C27:G27')
    worksheet.mergeCells('B30:K30')
    worksheet.mergeCells('B32:F32')
    worksheet.mergeCells('G32:K32')
    worksheet.mergeCells('C33:F33')
    worksheet.mergeCells('H33:K33')
    worksheet.mergeCells('C34:F34')
    worksheet.mergeCells('H34:K34')
    worksheet.mergeCells('C35:F35')
    worksheet.mergeCells('H35:K35')
    worksheet.mergeCells('C36:F36')
    worksheet.mergeCells('H36:K36')
    worksheet.mergeCells('B38:K38')
    worksheet.mergeCells('B39:F39')
    worksheet.mergeCells('G39:K39')
    worksheet.mergeCells('B40:F44')
    worksheet.mergeCells('G40:K44')

    // satır yüksekliklerinin ayarlanması
    worksheet.getRow(10).height = 21
    worksheet.getRow(28).height = 30
    for (let i = 1; i < 8; i++) worksheet.getRow(i).height = 16.5
    for (let i = 8; i < 45; i++) if ((i !== 10 && i < 20) || (i >= 29 && i < 45)) worksheet.getRow(i).height = 24.75
    for (let i = 20; i < 28; i++) worksheet.getRow(i).height = 99.75

    // hücrelerin renklendirilmesi
    const orangeCells = [
        'B11',
        'B12',
        'B13',
        'B14',
        'B15',
        'B16',
        'B17',
        'B19',
        'B30',
        'B32',
        'B33',
        'B34',
        'B35',
        'B36',
        'B38',
        'C19',
        'G11',
        'G12',
        'G13',
        'G14',
        'G15',
        'G16',
        'G17',
        'G32',
        'G33',
        'G34',
        'G35',
        'G36',
        'H19',
        'I19',
        'J19',
        'K19'
    ]
    orangeCells.forEach((cell) => {
        worksheet.getCell(cell).fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: {
                argb: 'edaf13'
            }
        }
    })
    const grayCells = ['B39', 'G39']
    grayCells.forEach((cell) => {
        worksheet.getCell(cell).fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: {
                argb: 'd8d8d8'
            }
        }
    })

    //hücre kenarlıkları
    const doubleBorderStyle = { style: 'double', color: { argb: '000000' } }
    const thinBorderStyle = { style: 'thin', color: { argb: '000000' } }
    const emptyBorderStyle = { style: 'none' }

    const doubleBorderCells = ['B11', 'G11', 'B30', 'B32', 'G32', 'B38', 'B39', 'G39', 'B40', 'G40']

    doubleBorderCells.forEach((cell) => {
        worksheet.getCell(cell).border = {
            top: doubleBorderStyle,
            bottom: doubleBorderStyle,
            left: doubleBorderStyle,
            right: doubleBorderStyle
        }
    })

    const borderCells = [
        {
            cell: 'B2',
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
                    style: doubleBorderStyle
                }
            ]
        },
        {
            cell: 'D2',
            borders: [
                {
                    key: 'top',
                    style: doubleBorderStyle
                }
            ]
        },
        {
            cell: 'E2',
            borders: [
                {
                    key: 'top',
                    style: doubleBorderStyle
                }
            ]
        },
        {
            cell: 'F2',
            borders: [
                {
                    key: 'top',
                    style: doubleBorderStyle
                }
            ]
        },
        {
            cell: 'G2',
            borders: [
                {
                    key: 'top',
                    style: doubleBorderStyle
                }
            ]
        },
        {
            cell: 'H2',
            borders: [
                {
                    key: 'top',
                    style: doubleBorderStyle
                }
            ]
        },
        {
            cell: 'I2',
            borders: [
                {
                    key: 'top',
                    style: doubleBorderStyle
                }
            ]
        },
        {
            cell: 'J2',
            borders: [
                {
                    key: 'top',
                    style: doubleBorderStyle
                }
            ]
        },
        {
            cell: 'K2',
            borders: [
                {
                    key: 'top',
                    style: doubleBorderStyle
                },
                {
                    key: 'right',
                    style: doubleBorderStyle
                }
            ]
        },
        {
            cell: 'J3',
            borders: [
                {
                    key: 'right',
                    style: doubleBorderStyle
                }
            ]
        },
        {
            cell: 'K7',
            borders: [
                {
                    key: 'right',
                    style: doubleBorderStyle
                }
            ]
        },
        {
            cell: 'K8',
            borders: [
                {
                    key: 'right',
                    style: doubleBorderStyle
                }
            ]
        },
        {
            cell: 'K9',
            borders: [
                {
                    key: 'right',
                    style: doubleBorderStyle
                },
                {
                    key: 'bottom',
                    style: doubleBorderStyle
                }
            ]
        },
        {
            cell: 'D9',
            borders: [
                {
                    key: 'bottom',
                    style: doubleBorderStyle
                }
            ]
        },
        {
            cell: 'E9',
            borders: [
                {
                    key: 'bottom',
                    style: doubleBorderStyle
                }
            ]
        },
        {
            cell: 'F9',
            borders: [
                {
                    key: 'bottom',
                    style: doubleBorderStyle
                }
            ]
        },
        {
            cell: 'G9',
            borders: [
                {
                    key: 'bottom',
                    style: doubleBorderStyle
                }
            ]
        },
        {
            cell: 'H9',
            borders: [
                {
                    key: 'bottom',
                    style: doubleBorderStyle
                }
            ]
        },
        {
            cell: 'I9',
            borders: [
                {
                    key: 'bottom',
                    style: doubleBorderStyle
                }
            ]
        },
        {
            cell: 'J9',
            borders: [
                {
                    key: 'bottom',
                    style: doubleBorderStyle
                }
            ]
        },
        {
            cell: 'B10',
            borders: [
                {
                    key: 'left',
                    style: doubleBorderStyle
                }
            ]
        },
        {
            cell: 'J10',
            borders: [
                {
                    key: 'right',
                    style: doubleBorderStyle
                }
            ]
        },
        {
            cell: 'B12',
            borders: [
                {
                    key: 'left',
                    style: doubleBorderStyle
                },
                {
                    key: 'right',
                    style: doubleBorderStyle
                },
                {
                    key: 'bottom',
                    style: thinBorderStyle
                }
            ]
        },
        {
            cell: 'B13',
            borders: [
                {
                    key: 'left',
                    style: doubleBorderStyle
                },
                {
                    key: 'right',
                    style: doubleBorderStyle
                },
                {
                    key: 'bottom',
                    style: thinBorderStyle
                }
            ]
        },
        {
            cell: 'B15',
            borders: [
                {
                    key: 'left',
                    style: doubleBorderStyle
                },
                {
                    key: 'right',
                    style: doubleBorderStyle
                },
                {
                    key: 'bottom',
                    style: thinBorderStyle
                }
            ]
        },
        {
            cell: 'B16',
            borders: [
                {
                    key: 'left',
                    style: doubleBorderStyle
                },
                {
                    key: 'right',
                    style: doubleBorderStyle
                },
                {
                    key: 'bottom',
                    style: thinBorderStyle
                }
            ]
        },
        {
            cell: 'B17',
            borders: [
                {
                    key: 'left',
                    style: doubleBorderStyle
                },
                {
                    key: 'right',
                    style: doubleBorderStyle
                },
                {
                    key: 'bottom',
                    style: doubleBorderStyle
                }
            ]
        },
        {
            cell: 'G12',
            borders: [
                {
                    key: 'left',
                    style: doubleBorderStyle
                },
                {
                    key: 'right',
                    style: doubleBorderStyle
                },
                {
                    key: 'bottom',
                    style: thinBorderStyle
                }
            ]
        },
        {
            cell: 'G13',
            borders: [
                {
                    key: 'left',
                    style: doubleBorderStyle
                },
                {
                    key: 'right',
                    style: doubleBorderStyle
                },
                {
                    key: 'bottom',
                    style: thinBorderStyle
                }
            ]
        },
        {
            cell: 'G15',
            borders: [
                {
                    key: 'left',
                    style: doubleBorderStyle
                },
                {
                    key: 'right',
                    style: doubleBorderStyle
                },
                {
                    key: 'bottom',
                    style: thinBorderStyle
                }
            ]
        },
        {
            cell: 'G16',
            borders: [
                {
                    key: 'left',
                    style: doubleBorderStyle
                },
                {
                    key: 'right',
                    style: doubleBorderStyle
                },
                {
                    key: 'bottom',
                    style: thinBorderStyle
                }
            ]
        },
        {
            cell: 'G17',
            borders: [
                {
                    key: 'left',
                    style: doubleBorderStyle
                },
                {
                    key: 'right',
                    style: doubleBorderStyle
                },
                {
                    key: 'bottom',
                    style: doubleBorderStyle
                }
            ]
        },
        {
            cell: 'C12',
            borders: [
                {
                    key: 'bottom',
                    style: thinBorderStyle
                }
            ]
        },
        {
            cell: 'C13',
            borders: [
                {
                    key: 'bottom',
                    style: thinBorderStyle
                }
            ]
        },
        {
            cell: 'C14',
            borders: [
                {
                    key: 'bottom',
                    style: thinBorderStyle
                }
            ]
        },
        {
            cell: 'C15',
            borders: [
                {
                    key: 'bottom',
                    style: thinBorderStyle
                }
            ]
        },
        {
            cell: 'C16',
            borders: [
                {
                    key: 'bottom',
                    style: thinBorderStyle
                }
            ]
        },
        {
            cell: 'C17',
            borders: [
                {
                    key: 'bottom',
                    style: doubleBorderStyle
                }
            ]
        },
        {
            cell: 'H12',
            borders: [
                {
                    key: 'bottom',
                    style: thinBorderStyle
                },
                {
                    key: 'right',
                    style: doubleBorderStyle
                }
            ]
        },
        {
            cell: 'H13',
            borders: [
                {
                    key: 'bottom',
                    style: thinBorderStyle
                },
                {
                    key: 'right',
                    style: doubleBorderStyle
                }
            ]
        },
        {
            cell: 'H14',
            borders: [
                {
                    key: 'bottom',
                    style: thinBorderStyle
                },
                {
                    key: 'right',
                    style: doubleBorderStyle
                }
            ]
        },
        {
            cell: 'H15',
            borders: [
                {
                    key: 'bottom',
                    style: thinBorderStyle
                },
                {
                    key: 'right',
                    style: doubleBorderStyle
                }
            ]
        },
        {
            cell: 'H16',
            borders: [
                {
                    key: 'bottom',
                    style: thinBorderStyle
                },
                {
                    key: 'right',
                    style: doubleBorderStyle
                }
            ]
        },
        {
            cell: 'H17',
            borders: [
                {
                    key: 'bottom',
                    style: doubleBorderStyle
                },
                {
                    key: 'right',
                    style: doubleBorderStyle
                }
            ]
        },
        {
            cell: 'B18',
            borders: [
                {
                    key: 'left',
                    style: doubleBorderStyle
                }
            ]
        },
        {
            cell: 'K18',
            borders: [
                {
                    key: 'right',
                    style: doubleBorderStyle
                }
            ]
        },
        {
            cell: 'B19',
            borders: [
                {
                    key: 'left',
                    style: doubleBorderStyle
                },
                {
                    key: 'top',
                    style: doubleBorderStyle
                },
                {
                    key: 'bottom',
                    style: doubleBorderStyle
                },
                {
                    key: 'right',
                    style: thinBorderStyle
                }
            ]
        },
        {
            cell: 'C19',
            borders: [
                {
                    key: 'top',
                    style: doubleBorderStyle
                },
                {
                    key: 'bottom',
                    style: doubleBorderStyle
                },
                {
                    key: 'right',
                    style: thinBorderStyle
                }
            ]
        },
        {
            cell: 'H19',
            borders: [
                {
                    key: 'top',
                    style: doubleBorderStyle
                },
                {
                    key: 'bottom',
                    style: doubleBorderStyle
                },
                {
                    key: 'right',
                    style: thinBorderStyle
                }
            ]
        },
        {
            cell: 'I19',
            borders: [
                {
                    key: 'top',
                    style: doubleBorderStyle
                },
                {
                    key: 'bottom',
                    style: doubleBorderStyle
                },
                {
                    key: 'right',
                    style: thinBorderStyle
                }
            ]
        },
        {
            cell: 'J19',
            borders: [
                {
                    key: 'top',
                    style: doubleBorderStyle
                },
                {
                    key: 'bottom',
                    style: doubleBorderStyle
                },
                {
                    key: 'right',
                    style: thinBorderStyle
                }
            ]
        },
        {
            cell: 'K19',
            borders: [
                {
                    key: 'top',
                    style: doubleBorderStyle
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
        },
        {
            cell: 'B20',
            borders: [
                {
                    key: 'bottom',
                    style: thinBorderStyle
                },
                {
                    key: 'right',
                    style: thinBorderStyle
                },
                {
                    key: 'left',
                    style: doubleBorderStyle
                }
            ]
        },
        {
            cell: 'B21',
            borders: [
                {
                    key: 'bottom',
                    style: thinBorderStyle
                },
                {
                    key: 'right',
                    style: thinBorderStyle
                },
                {
                    key: 'left',
                    style: doubleBorderStyle
                }
            ]
        },
        {
            cell: 'B22',
            borders: [
                {
                    key: 'bottom',
                    style: thinBorderStyle
                },
                {
                    key: 'right',
                    style: thinBorderStyle
                },
                {
                    key: 'left',
                    style: doubleBorderStyle
                }
            ]
        },
        {
            cell: 'B23',
            borders: [
                {
                    key: 'bottom',
                    style: thinBorderStyle
                },
                {
                    key: 'right',
                    style: thinBorderStyle
                },
                {
                    key: 'left',
                    style: doubleBorderStyle
                }
            ]
        },
        {
            cell: 'B24',
            borders: [
                {
                    key: 'bottom',
                    style: thinBorderStyle
                },
                {
                    key: 'right',
                    style: thinBorderStyle
                },
                {
                    key: 'left',
                    style: doubleBorderStyle
                }
            ]
        },
        {
            cell: 'B25',
            borders: [
                {
                    key: 'bottom',
                    style: thinBorderStyle
                },
                {
                    key: 'right',
                    style: thinBorderStyle
                },
                {
                    key: 'left',
                    style: doubleBorderStyle
                }
            ]
        },
        {
            cell: 'B26',
            borders: [
                {
                    key: 'bottom',
                    style: thinBorderStyle
                },
                {
                    key: 'right',
                    style: thinBorderStyle
                },
                {
                    key: 'left',
                    style: doubleBorderStyle
                }
            ]
        },
        {
            cell: 'B27',
            borders: [
                {
                    key: 'bottom',
                    style: doubleBorderStyle
                },
                {
                    key: 'right',
                    style: thinBorderStyle
                },
                {
                    key: 'left',
                    style: doubleBorderStyle
                }
            ]
        },
        {
            cell: 'C20',
            borders: [
                {
                    key: 'bottom',
                    style: thinBorderStyle
                },
                {
                    key: 'right',
                    style: thinBorderStyle
                }
            ]
        },
        {
            cell: 'C21',
            borders: [
                {
                    key: 'bottom',
                    style: thinBorderStyle
                },
                {
                    key: 'right',
                    style: thinBorderStyle
                }
            ]
        },
        {
            cell: 'C22',
            borders: [
                {
                    key: 'bottom',
                    style: thinBorderStyle
                },
                {
                    key: 'right',
                    style: thinBorderStyle
                }
            ]
        },
        {
            cell: 'C23',
            borders: [
                {
                    key: 'bottom',
                    style: thinBorderStyle
                },
                {
                    key: 'right',
                    style: thinBorderStyle
                }
            ]
        },
        {
            cell: 'C24',
            borders: [
                {
                    key: 'bottom',
                    style: thinBorderStyle
                },
                {
                    key: 'right',
                    style: thinBorderStyle
                }
            ]
        },
        {
            cell: 'C25',
            borders: [
                {
                    key: 'bottom',
                    style: thinBorderStyle
                },
                {
                    key: 'right',
                    style: thinBorderStyle
                }
            ]
        },
        {
            cell: 'C26',
            borders: [
                {
                    key: 'bottom',
                    style: thinBorderStyle
                },
                {
                    key: 'right',
                    style: thinBorderStyle
                }
            ]
        },
        {
            cell: 'C27',
            borders: [
                {
                    key: 'bottom',
                    style: doubleBorderStyle
                },
                {
                    key: 'right',
                    style: thinBorderStyle
                }
            ]
        },
        {
            cell: 'H20',
            borders: [
                {
                    key: 'bottom',
                    style: thinBorderStyle
                },
                {
                    key: 'right',
                    style: thinBorderStyle
                }
            ]
        },
        {
            cell: 'H21',
            borders: [
                {
                    key: 'bottom',
                    style: thinBorderStyle
                },
                {
                    key: 'right',
                    style: thinBorderStyle
                }
            ]
        },
        {
            cell: 'H22',
            borders: [
                {
                    key: 'bottom',
                    style: thinBorderStyle
                },
                {
                    key: 'right',
                    style: thinBorderStyle
                }
            ]
        },
        {
            cell: 'H23',
            borders: [
                {
                    key: 'bottom',
                    style: thinBorderStyle
                },
                {
                    key: 'right',
                    style: thinBorderStyle
                }
            ]
        },
        {
            cell: 'H24',
            borders: [
                {
                    key: 'bottom',
                    style: thinBorderStyle
                },
                {
                    key: 'right',
                    style: thinBorderStyle
                }
            ]
        },
        {
            cell: 'H25',
            borders: [
                {
                    key: 'bottom',
                    style: thinBorderStyle
                },
                {
                    key: 'right',
                    style: thinBorderStyle
                }
            ]
        },
        {
            cell: 'H26',
            borders: [
                {
                    key: 'bottom',
                    style: thinBorderStyle
                },
                {
                    key: 'right',
                    style: thinBorderStyle
                }
            ]
        },
        {
            cell: 'H27',
            borders: [
                {
                    key: 'bottom',
                    style: doubleBorderStyle
                },
                {
                    key: 'right',
                    style: thinBorderStyle
                }
            ]
        },
        {
            cell: 'I20',
            borders: [
                {
                    key: 'bottom',
                    style: thinBorderStyle
                },
                {
                    key: 'right',
                    style: thinBorderStyle
                }
            ]
        },
        {
            cell: 'I21',
            borders: [
                {
                    key: 'bottom',
                    style: thinBorderStyle
                },
                {
                    key: 'right',
                    style: thinBorderStyle
                }
            ]
        },
        {
            cell: 'I22',
            borders: [
                {
                    key: 'bottom',
                    style: thinBorderStyle
                },
                {
                    key: 'right',
                    style: thinBorderStyle
                }
            ]
        },
        {
            cell: 'I23',
            borders: [
                {
                    key: 'bottom',
                    style: thinBorderStyle
                },
                {
                    key: 'right',
                    style: thinBorderStyle
                }
            ]
        },
        {
            cell: 'I24',
            borders: [
                {
                    key: 'bottom',
                    style: thinBorderStyle
                },
                {
                    key: 'right',
                    style: thinBorderStyle
                }
            ]
        },
        {
            cell: 'I25',
            borders: [
                {
                    key: 'bottom',
                    style: thinBorderStyle
                },
                {
                    key: 'right',
                    style: thinBorderStyle
                }
            ]
        },
        {
            cell: 'I26',
            borders: [
                {
                    key: 'bottom',
                    style: thinBorderStyle
                },
                {
                    key: 'right',
                    style: thinBorderStyle
                }
            ]
        },
        {
            cell: 'I27',
            borders: [
                {
                    key: 'bottom',
                    style: doubleBorderStyle
                },
                {
                    key: 'right',
                    style: thinBorderStyle
                }
            ]
        },
        {
            cell: 'J20',
            borders: [
                {
                    key: 'bottom',
                    style: thinBorderStyle
                },
                {
                    key: 'right',
                    style: thinBorderStyle
                }
            ]
        },
        {
            cell: 'J21',
            borders: [
                {
                    key: 'bottom',
                    style: thinBorderStyle
                },
                {
                    key: 'right',
                    style: thinBorderStyle
                }
            ]
        },
        {
            cell: 'J22',
            borders: [
                {
                    key: 'bottom',
                    style: thinBorderStyle
                },
                {
                    key: 'right',
                    style: thinBorderStyle
                }
            ]
        },
        {
            cell: 'J23',
            borders: [
                {
                    key: 'bottom',
                    style: thinBorderStyle
                },
                {
                    key: 'right',
                    style: thinBorderStyle
                }
            ]
        },
        {
            cell: 'J24',
            borders: [
                {
                    key: 'bottom',
                    style: thinBorderStyle
                },
                {
                    key: 'right',
                    style: thinBorderStyle
                }
            ]
        },
        {
            cell: 'J25',
            borders: [
                {
                    key: 'bottom',
                    style: thinBorderStyle
                },
                {
                    key: 'right',
                    style: thinBorderStyle
                }
            ]
        },
        {
            cell: 'J26',
            borders: [
                {
                    key: 'bottom',
                    style: thinBorderStyle
                },
                {
                    key: 'right',
                    style: thinBorderStyle
                }
            ]
        },
        {
            cell: 'J27',
            borders: [
                {
                    key: 'bottom',
                    style: doubleBorderStyle
                },
                {
                    key: 'right',
                    style: thinBorderStyle
                }
            ]
        },
        {
            cell: 'K20',
            borders: [
                {
                    key: 'bottom',
                    style: thinBorderStyle
                },
                {
                    key: 'right',
                    style: doubleBorderStyle
                }
            ]
        },
        {
            cell: 'K21',
            borders: [
                {
                    key: 'bottom',
                    style: thinBorderStyle
                },
                {
                    key: 'right',
                    style: doubleBorderStyle
                }
            ]
        },
        {
            cell: 'K22',
            borders: [
                {
                    key: 'bottom',
                    style: thinBorderStyle
                },
                {
                    key: 'right',
                    style: doubleBorderStyle
                }
            ]
        },
        {
            cell: 'K23',
            borders: [
                {
                    key: 'bottom',
                    style: thinBorderStyle
                },
                {
                    key: 'right',
                    style: doubleBorderStyle
                }
            ]
        },
        {
            cell: 'K24',
            borders: [
                {
                    key: 'bottom',
                    style: thinBorderStyle
                },
                {
                    key: 'right',
                    style: doubleBorderStyle
                }
            ]
        },
        {
            cell: 'K25',
            borders: [
                {
                    key: 'bottom',
                    style: thinBorderStyle
                },
                {
                    key: 'right',
                    style: doubleBorderStyle
                }
            ]
        },
        {
            cell: 'K26',
            borders: [
                {
                    key: 'bottom',
                    style: thinBorderStyle
                },
                {
                    key: 'right',
                    style: doubleBorderStyle
                }
            ]
        },
        {
            cell: 'K27',
            borders: [
                {
                    key: 'bottom',
                    style: doubleBorderStyle
                },
                {
                    key: 'right',
                    style: doubleBorderStyle
                }
            ]
        },
        {
            cell: 'B28',
            borders: [
                {
                    key: 'left',
                    style: doubleBorderStyle
                }
            ]
        },
        {
            cell: 'B29',
            borders: [
                {
                    key: 'left',
                    style: doubleBorderStyle
                }
            ]
        },
        {
            cell: 'H28',
            borders: [
                {
                    key: 'left',
                    style: values.currencyCode !== 'TL' ? doubleBorderStyle : emptyBorderStyle
                },
                {
                    key: 'bottom',
                    style: values.currencyCode !== 'TL' ? doubleBorderStyle : emptyBorderStyle
                },
                {
                    key: 'right',
                    style: values.currencyCode !== 'TL' ? thinBorderStyle : emptyBorderStyle
                }
            ]
        },
        {
            cell: 'I28',
            borders: [
                {
                    key: 'bottom',
                    style: values.currencyCode !== 'TL' ? doubleBorderStyle : emptyBorderStyle
                }
            ]
        },
        {
            cell: 'J28',
            borders: [
                {
                    key: 'left',
                    style: doubleBorderStyle
                },
                {
                    key: 'bottom',
                    style: doubleBorderStyle
                },
                {
                    key: 'right',
                    style: thinBorderStyle
                }
            ]
        },
        {
            cell: 'K28',
            borders: [
                {
                    key: 'right',
                    style: doubleBorderStyle
                },
                {
                    key: 'bottom',
                    style: doubleBorderStyle
                }
            ]
        },
        {
            cell: 'K29',
            borders: [
                {
                    key: 'right',
                    style: doubleBorderStyle
                }
            ]
        },
        {
            cell: 'K31',
            borders: [
                {
                    key: 'right',
                    style: doubleBorderStyle
                }
            ]
        },
        {
            cell: 'B31',
            borders: [
                {
                    key: 'left',
                    style: doubleBorderStyle
                }
            ]
        },
        {
            cell: 'B33',
            borders: [
                {
                    key: 'left',
                    style: doubleBorderStyle
                },
                {
                    key: 'right',
                    style: thinBorderStyle
                },
                {
                    key: 'bottom',
                    style: thinBorderStyle
                }
            ]
        },
        {
            cell: 'B34',
            borders: [
                {
                    key: 'left',
                    style: doubleBorderStyle
                },
                {
                    key: 'right',
                    style: thinBorderStyle
                },
                {
                    key: 'bottom',
                    style: thinBorderStyle
                }
            ]
        },
        {
            cell: 'B35',
            borders: [
                {
                    key: 'left',
                    style: doubleBorderStyle
                },
                {
                    key: 'right',
                    style: thinBorderStyle
                },
                {
                    key: 'bottom',
                    style: thinBorderStyle
                }
            ]
        },
        {
            cell: 'B36',
            borders: [
                {
                    key: 'left',
                    style: doubleBorderStyle
                },
                {
                    key: 'right',
                    style: thinBorderStyle
                },
                {
                    key: 'bottom',
                    style: doubleBorderStyle
                }
            ]
        },
        {
            cell: 'G33',
            borders: [
                {
                    key: 'left',
                    style: doubleBorderStyle
                },
                {
                    key: 'right',
                    style: thinBorderStyle
                },
                {
                    key: 'bottom',
                    style: thinBorderStyle
                }
            ]
        },
        {
            cell: 'G34',
            borders: [
                {
                    key: 'left',
                    style: doubleBorderStyle
                },
                {
                    key: 'right',
                    style: thinBorderStyle
                },
                {
                    key: 'bottom',
                    style: thinBorderStyle
                }
            ]
        },
        {
            cell: 'G35',
            borders: [
                {
                    key: 'left',
                    style: doubleBorderStyle
                },
                {
                    key: 'right',
                    style: thinBorderStyle
                },
                {
                    key: 'bottom',
                    style: thinBorderStyle
                }
            ]
        },
        {
            cell: 'G36',
            borders: [
                {
                    key: 'left',
                    style: doubleBorderStyle
                },
                {
                    key: 'right',
                    style: thinBorderStyle
                },
                {
                    key: 'bottom',
                    style: doubleBorderStyle
                }
            ]
        },
        {
            cell: 'C33',
            borders: [
                {
                    key: 'bottom',
                    style: thinBorderStyle
                }
            ]
        },
        {
            cell: 'C34',
            borders: [
                {
                    key: 'bottom',
                    style: thinBorderStyle
                }
            ]
        },
        {
            cell: 'C35',
            borders: [
                {
                    key: 'bottom',
                    style: thinBorderStyle
                }
            ]
        },
        {
            cell: 'C36',
            borders: [
                {
                    key: 'bottom',
                    style: doubleBorderStyle
                }
            ]
        },
        {
            cell: 'H33',
            borders: [
                {
                    key: 'bottom',
                    style: thinBorderStyle
                },
                {
                    key: 'right',
                    style: doubleBorderStyle
                }
            ]
        },
        {
            cell: 'H34',
            borders: [
                {
                    key: 'bottom',
                    style: thinBorderStyle
                },
                {
                    key: 'right',
                    style: doubleBorderStyle
                }
            ]
        },
        {
            cell: 'H35',
            borders: [
                {
                    key: 'bottom',
                    style: thinBorderStyle
                },
                {
                    key: 'right',
                    style: doubleBorderStyle
                }
            ]
        },
        {
            cell: 'H36',
            borders: [
                {
                    key: 'bottom',
                    style: doubleBorderStyle
                },
                {
                    key: 'right',
                    style: doubleBorderStyle
                }
            ]
        },
        {
            cell: 'B37',
            borders: [
                {
                    key: 'left',
                    style: doubleBorderStyle
                }
            ]
        },
        {
            cell: 'K37',
            borders: [
                {
                    key: 'right',
                    style: doubleBorderStyle
                }
            ]
        }
    ]

    borderCells.forEach((cell) => {
        const borderStyle = {}
        cell.borders.forEach((border) => {
            borderStyle[border.key] = border.style
        })
        worksheet.getCell(cell.cell).border = borderStyle
    })

    // worksheet.addImage(
    //     workbook.addImage({
    //         base64: 'R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==',
    //         extension: 'png'
    //     }),
    //     'E4:H6'
    // )

    // hücrelerin hizalanması
    worksheet.getCell('E4').alignment = { vertical: 'middle', horizontal: 'center' }
    worksheet.getCell('F6').alignment = { vertical: 'middle', horizontal: 'center' }
    worksheet.getCell('F7').alignment = { vertical: 'middle', horizontal: 'center' }
    worksheet.getCell('F8').alignment = { vertical: 'middle', horizontal: 'center' }
    worksheet.getCell('J8').alignment = { vertical: 'middle', horizontal: 'center' }
    worksheet.getCell('K8').alignment = { vertical: 'middle', horizontal: 'center' }
    worksheet.getCell('J9').alignment = { vertical: 'middle', horizontal: 'center' }
    worksheet.getCell('K9').alignment = { vertical: 'middle', horizontal: 'center' }
    worksheet.getCell('B11').alignment = { vertical: 'middle', horizontal: 'center' }
    worksheet.getCell('G11').alignment = { vertical: 'middle', horizontal: 'center' }
    worksheet.getCell('C12').alignment = { vertical: 'middle', horizontal: 'center' }
    worksheet.getCell('C13').alignment = { vertical: 'middle', horizontal: 'center' }
    worksheet.getCell('C14').alignment = { vertical: 'middle', horizontal: 'center' }
    worksheet.getCell('C15').alignment = { vertical: 'middle', horizontal: 'center' }
    worksheet.getCell('C16').alignment = { vertical: 'middle', horizontal: 'center' }
    worksheet.getCell('C17').alignment = { vertical: 'middle', horizontal: 'center' }
    worksheet.getCell('H12').alignment = { vertical: 'middle', horizontal: 'center' }
    worksheet.getCell('H13').alignment = { vertical: 'middle', horizontal: 'center' }
    worksheet.getCell('H14').alignment = { vertical: 'middle', horizontal: 'center' }
    worksheet.getCell('H15').alignment = { vertical: 'middle', horizontal: 'center' }
    worksheet.getCell('H16').alignment = { vertical: 'middle', horizontal: 'center' }
    worksheet.getCell('H17').alignment = { vertical: 'middle', horizontal: 'center' }
    worksheet.getCell('B12').alignment = { vertical: 'middle', horizontal: 'left' }
    worksheet.getCell('B13').alignment = { vertical: 'middle', horizontal: 'left' }
    worksheet.getCell('B15').alignment = { vertical: 'middle', horizontal: 'left' }
    worksheet.getCell('B16').alignment = { vertical: 'middle', horizontal: 'left' }
    worksheet.getCell('B17').alignment = { vertical: 'middle', horizontal: 'left' }
    worksheet.getCell('G12').alignment = { vertical: 'middle', horizontal: 'left' }
    worksheet.getCell('G13').alignment = { vertical: 'middle', horizontal: 'left' }
    worksheet.getCell('G15').alignment = { vertical: 'middle', horizontal: 'left' }
    worksheet.getCell('G16').alignment = { vertical: 'middle', horizontal: 'left' }
    worksheet.getCell('G17').alignment = { vertical: 'middle', horizontal: 'left' }
    worksheet.getCell('B19').alignment = { vertical: 'middle', horizontal: 'center' }
    worksheet.getCell('C19').alignment = { vertical: 'middle', horizontal: 'center' }
    worksheet.getCell('H19').alignment = { vertical: 'middle', horizontal: 'center' }
    worksheet.getCell('I19').alignment = { vertical: 'middle', horizontal: 'center' }
    worksheet.getCell('J19').alignment = { vertical: 'middle', horizontal: 'center' }
    worksheet.getCell('K19').alignment = { vertical: 'middle', horizontal: 'center' }
    worksheet.getCell('B20').alignment = { vertical: 'middle', horizontal: 'center' }
    worksheet.getCell('B21').alignment = { vertical: 'middle', horizontal: 'center' }
    worksheet.getCell('B22').alignment = { vertical: 'middle', horizontal: 'center' }
    worksheet.getCell('B23').alignment = { vertical: 'middle', horizontal: 'center' }
    worksheet.getCell('B24').alignment = { vertical: 'middle', horizontal: 'center' }
    worksheet.getCell('B25').alignment = { vertical: 'middle', horizontal: 'center' }
    worksheet.getCell('B26').alignment = { vertical: 'middle', horizontal: 'center' }
    worksheet.getCell('B27').alignment = { vertical: 'middle', horizontal: 'center' }
    worksheet.getCell('C20').alignment = { vertical: 'middle', horizontal: 'center', wrapText: true }
    worksheet.getCell('C21').alignment = { vertical: 'middle', horizontal: 'center', wrapText: true }
    worksheet.getCell('C22').alignment = { vertical: 'middle', horizontal: 'center', wrapText: true }
    worksheet.getCell('C23').alignment = { vertical: 'middle', horizontal: 'center', wrapText: true }
    worksheet.getCell('C24').alignment = { vertical: 'middle', horizontal: 'center', wrapText: true }
    worksheet.getCell('C25').alignment = { vertical: 'middle', horizontal: 'center', wrapText: true }
    worksheet.getCell('C26').alignment = { vertical: 'middle', horizontal: 'center', wrapText: true }
    worksheet.getCell('C27').alignment = { vertical: 'middle', horizontal: 'center', wrapText: true }
    worksheet.getCell('H20').alignment = { vertical: 'middle', horizontal: 'center' }
    worksheet.getCell('H21').alignment = { vertical: 'middle', horizontal: 'center' }
    worksheet.getCell('H22').alignment = { vertical: 'middle', horizontal: 'center' }
    worksheet.getCell('H23').alignment = { vertical: 'middle', horizontal: 'center' }
    worksheet.getCell('H24').alignment = { vertical: 'middle', horizontal: 'center' }
    worksheet.getCell('H25').alignment = { vertical: 'middle', horizontal: 'center' }
    worksheet.getCell('H26').alignment = { vertical: 'middle', horizontal: 'center' }
    worksheet.getCell('H27').alignment = { vertical: 'middle', horizontal: 'center' }
    worksheet.getCell('I20').alignment = { vertical: 'middle', horizontal: 'center' }
    worksheet.getCell('I21').alignment = { vertical: 'middle', horizontal: 'center' }
    worksheet.getCell('I22').alignment = { vertical: 'middle', horizontal: 'center' }
    worksheet.getCell('I23').alignment = { vertical: 'middle', horizontal: 'center' }
    worksheet.getCell('I24').alignment = { vertical: 'middle', horizontal: 'center' }
    worksheet.getCell('I25').alignment = { vertical: 'middle', horizontal: 'center' }
    worksheet.getCell('I26').alignment = { vertical: 'middle', horizontal: 'center' }
    worksheet.getCell('I27').alignment = { vertical: 'middle', horizontal: 'center' }
    worksheet.getCell('J20').alignment = { vertical: 'middle', horizontal: 'center' }
    worksheet.getCell('J21').alignment = { vertical: 'middle', horizontal: 'center' }
    worksheet.getCell('J22').alignment = { vertical: 'middle', horizontal: 'center' }
    worksheet.getCell('J23').alignment = { vertical: 'middle', horizontal: 'center' }
    worksheet.getCell('J24').alignment = { vertical: 'middle', horizontal: 'center' }
    worksheet.getCell('J25').alignment = { vertical: 'middle', horizontal: 'center' }
    worksheet.getCell('J26').alignment = { vertical: 'middle', horizontal: 'center' }
    worksheet.getCell('J27').alignment = { vertical: 'middle', horizontal: 'center' }
    worksheet.getCell('K20').alignment = { vertical: 'middle', horizontal: 'center' }
    worksheet.getCell('K21').alignment = { vertical: 'middle', horizontal: 'center' }
    worksheet.getCell('K22').alignment = { vertical: 'middle', horizontal: 'center' }
    worksheet.getCell('K23').alignment = { vertical: 'middle', horizontal: 'center' }
    worksheet.getCell('K24').alignment = { vertical: 'middle', horizontal: 'center' }
    worksheet.getCell('K25').alignment = { vertical: 'middle', horizontal: 'center' }
    worksheet.getCell('K26').alignment = { vertical: 'middle', horizontal: 'center' }
    worksheet.getCell('K27').alignment = { vertical: 'middle', horizontal: 'center' }
    worksheet.getCell('H28').alignment = { vertical: 'middle', horizontal: 'center' }
    worksheet.getCell('I28').alignment = { vertical: 'middle', horizontal: 'center' }
    worksheet.getCell('J28').alignment = { vertical: 'middle', horizontal: 'center' }
    worksheet.getCell('K28').alignment = { vertical: 'middle', horizontal: 'center' }
    worksheet.getCell('B30').alignment = { vertical: 'middle', horizontal: 'center' }
    worksheet.getCell('B32').alignment = { vertical: 'middle', horizontal: 'center' }
    worksheet.getCell('G32').alignment = { vertical: 'middle', horizontal: 'center' }
    worksheet.getCell('B33').alignment = { vertical: 'middle', horizontal: 'left' }
    worksheet.getCell('B34').alignment = { vertical: 'middle', horizontal: 'left' }
    worksheet.getCell('B35').alignment = { vertical: 'middle', horizontal: 'left' }
    worksheet.getCell('B36').alignment = { vertical: 'middle', horizontal: 'left' }
    worksheet.getCell('C33').alignment = { vertical: 'middle', horizontal: 'center' }
    worksheet.getCell('C34').alignment = { vertical: 'middle', horizontal: 'center' }
    worksheet.getCell('C35').alignment = { vertical: 'middle', horizontal: 'center' }
    worksheet.getCell('C36').alignment = { vertical: 'middle', horizontal: 'center' }
    worksheet.getCell('G33').alignment = { vertical: 'middle', horizontal: 'left' }
    worksheet.getCell('G34').alignment = { vertical: 'middle', horizontal: 'left' }
    worksheet.getCell('G35').alignment = { vertical: 'middle', horizontal: 'left' }
    worksheet.getCell('G36').alignment = { vertical: 'middle', horizontal: 'left' }
    worksheet.getCell('H33').alignment = { vertical: 'middle', horizontal: 'center' }
    worksheet.getCell('H34').alignment = { vertical: 'middle', horizontal: 'center' }
    worksheet.getCell('H35').alignment = { vertical: 'middle', horizontal: 'center' }
    worksheet.getCell('H36').alignment = { vertical: 'middle', horizontal: 'center' }
    worksheet.getCell('B38').alignment = { vertical: 'middle', horizontal: 'center' }
    worksheet.getCell('B39').alignment = { vertical: 'middle', horizontal: 'center' }
    worksheet.getCell('G39').alignment = { vertical: 'middle', horizontal: 'center' }

    // fontların ayarlanması
    const size14 = ['F6', 'B11', 'G11', 'B30', 'B32', 'G32', 'B38']
    const size12 = [
        'J8',
        'J9',
        'K8',
        'K9',
        'B12',
        'B13',
        'B15',
        'B16',
        'B17',
        'C12',
        'C13',
        'C14',
        'C15',
        'C16',
        'C17',
        'G12',
        'G13',
        'G15',
        'G16',
        'G17',
        'H12',
        'H13',
        'H14',
        'H15',
        'H16',
        'H17',
        'B19',
        'C19',
        'H19',
        'I19',
        'J19',
        'K19',
        'H28',
        'I28',
        'K28',
        'J28',
        'B33',
        'B34',
        'B35',
        'B36',
        'C33',
        'C34',
        'C35',
        'C36',
        'G33',
        'G34',
        'G35',
        'G36',
        'H33',
        'H34',
        'H35',
        'H36',
        'B39',
        'G39'
    ]
    const size11 = [
        'B20',
        'B21',
        'B22',
        'B23',
        'B24',
        'B25',
        'B26',
        'B27',
        'C20',
        'C21',
        'C22',
        'C23',
        'C24',
        'C25',
        'C26',
        'C27',
        'H20',
        'H21',
        'H22',
        'H23',
        'H24',
        'H25',
        'H26',
        'H27',
        'I20',
        'I21',
        'I22',
        'I23',
        'I24',
        'I25',
        'I26',
        'I27',
        'J20',
        'J21',
        'J22',
        'J23',
        'J24',
        'J25',
        'J26',
        'J27',
        'K20',
        'K21',
        'K22',
        'K23',
        'K24',
        'K25',
        'K26',
        'K27'
    ]

    size14.forEach(
        (cell) =>
            (worksheet.getCell(cell).font = {
                name: 'Quattrocento Sans',
                size: 14,
                bold: false,
                italic: false,
                color: { argb: '000000' }
            })
    )
    size12.forEach(
        (cell) =>
            (worksheet.getCell(cell).font = {
                name: 'Quattrocento Sans',
                size: 12,
                bold: false,
                italic: false,
                color: { argb: '000000' }
            })
    )
    size11.forEach(
        (cell) =>
            (worksheet.getCell(cell).font = {
                name: 'Quattrocento Sans',
                size: 11,
                bold: false,
                italic: false,
                color: { argb: '000000' }
            })
    )

    worksheet.getCell('E4').font = {
        name: 'Quattrocento Sans',
        size: 20,
        bold: false,
        italic: false,
        color: { argb: '000000' }
    }

    worksheet.getCell('F7').font = {
        name: 'Calibri',
        size: 14,
        bold: true,
        italic: false,
        underline: true,
        color: { argb: '0563C1' }
    }

    worksheet.getCell('F8').font = {
        name: 'Calibri',
        size: 14,
        bold: true,
        italic: false,
        underline: true,
        color: { argb: '0563C1' }
    }

    // sabit yazıların yazılması
    worksheet.getCell('E4').value = 'PROFORMA INVOICE'
    worksheet.getCell('F7').value = { text: 'www.mgdemir.com', hyperlink: 'https://www.mgdemir.com' }
    worksheet.getCell('F8').value = { text: 'export@mgdemir.com', hyperlink: 'mailto:export@mgdemir.com' }
    worksheet.getCell('J8').value = 'INVOICE DATE :'
    worksheet.getCell('J9').value = 'PAGE NO :'
    worksheet.getCell('K9').value = '01'
    worksheet.getCell('B11').value = 'SELLER DETAILS'
    worksheet.getCell('G11').value = 'PURCHASER DETAILS'
    worksheet.getCell('B12').value = 'COMPANY'
    worksheet.getCell('B13').value = 'ADDRESS'
    worksheet.getCell('B15').value = 'CONTACT'
    worksheet.getCell('B16').value = 'GSM NO'
    worksheet.getCell('B17').value = 'E-MAIL'
    worksheet.getCell('G12').value = 'COMPANY'
    worksheet.getCell('G13').value = 'ADDRESS'
    worksheet.getCell('G15').value = 'CONTACT'
    worksheet.getCell('G16').value = 'GSM NO'
    worksheet.getCell('G17').value = 'E-MAIL'
    worksheet.getCell('B19').value = 'NO'
    worksheet.getCell('C19').value = 'PRODUCT DESCRIPTION'
    worksheet.getCell('H19').value = 'QUANTITY'
    worksheet.getCell('I19').value = 'UNIT'
    worksheet.getCell('J19').value = 'UNIT PRICE'
    worksheet.getCell('K19').value = 'TOTAL PRICE'
    worksheet.getCell('B20').value = '1'
    worksheet.getCell('B21').value = '2'
    worksheet.getCell('B22').value = '3'
    worksheet.getCell('B23').value = '4'
    worksheet.getCell('B24').value = '5'
    worksheet.getCell('B25').value = '6'
    worksheet.getCell('B26').value = '7'
    worksheet.getCell('B27').value = '8'
    worksheet.getCell('J28').value = 'TOTAL AMOUNT'
    worksheet.getCell('B32').value = 'TERMS AND CONDITIONS'
    worksheet.getCell('G32').value = 'BANK DETAILS'
    worksheet.getCell('B33').value = 'PAYMENT TERM'
    worksheet.getCell('B34').value = 'INCOTERM'
    worksheet.getCell('B35').value = 'VALIDITY'
    worksheet.getCell('B36').value = 'ORIGIN'
    worksheet.getCell('C33').value = ''
    worksheet.getCell('C34').value = 'FCA GEBZE'
    worksheet.getCell('C35').value = '7 DAYS'
    worksheet.getCell('C36').value = 'TURKIYE'
    worksheet.getCell('G33').value = 'BANKA NAME'
    worksheet.getCell('G34').value = 'HOLDER'
    worksheet.getCell('G35').value = 'IBAN ()'
    worksheet.getCell('G36').value = 'SWIFT'
    worksheet.getCell('H33').value = 'DENIZBANK'
    worksheet.getCell('H34').value = 'ATA FİBER'
    worksheet.getCell('H35').value = 'TR33 0013 4000 0602 7606 2000 01'
    worksheet.getCell('H36').value = 'DENITRISXXX'
    worksheet.getCell('B38').value = 'SIGNS & STAMPS'
    worksheet.getCell('B39').value = 'SELLER SIGN & STAMP'
    worksheet.getCell('G39').value = 'PURCHASER SIGN & STAMP'

    // görsellerin eklenmesi
    const INVOICE_LEFT = workbook.addImage({
        base64: await imageToBase64(`${window.location.origin}/invoice_left.png`),
        extension: 'png'
    })
    const INVOICE_RIGHT = workbook.addImage({
        base64: await imageToBase64(`${window.location.origin}/invoice_right.png`),
        extension: 'png'
    })
    const INVOICE_MEGAFENCE = workbook.addImage({
        base64: await imageToBase64(`${window.location.origin}/invoice_megafence.png`),
        extension: 'png'
    })
    const INVOICE_MEGAGRASS = workbook.addImage({
        base64: await imageToBase64(`${window.location.origin}/invoice_megagrass.png`),
        extension: 'png'
    })
    const INVOICE_HECTOFENCE = workbook.addImage({
        base64: await imageToBase64(`${window.location.origin}/invoice_hectofence.png`),
        extension: 'png'
    })

    worksheet.addImage(INVOICE_LEFT, {
        tl: { col: 1, row: 1 },
        br: { col: 3, row: 9 }
    })
    worksheet.addImage(INVOICE_RIGHT, {
        tl: { col: 9, row: 2 },
        br: { col: 11, row: 6 }
    })
    worksheet.addImage(INVOICE_MEGAFENCE, {
        tl: { col: 1, row: 9 },
        br: { col: 3, row: 10 }
    })
    worksheet.addImage(INVOICE_MEGAGRASS, {
        tl: { col: 5, row: 9 },
        br: { col: 7, row: 10 }
    })
    worksheet.addImage(INVOICE_HECTOFENCE, {
        tl: { col: 9, row: 9 },
        br: { col: 11, row: 10 }
    })

    // fatura doldurulur.
    worksheet.getCell('F6').value = orderNumber
    worksheet.getCell('K8').value = values.formattedDate
    worksheet.getCell('C12').value = 'ATA FİBER'
    worksheet.getCell('C13').value = ''
    worksheet.getCell('C14').value = ''
    worksheet.getCell('C15').value = user.fullname
    worksheet.getCell('C16').value = user.phone
    worksheet.getCell('C17').value = user.email
    worksheet.getCell('H12').value = customer.companyname

    let address = customer.address
    let splitIndex = address.lastIndexOf(' ', 30) // Find the last space within the first 30 characters

    let addressPart1 = address.substring(0, splitIndex) // First part of the address
    let addressPart2 = address.substring(splitIndex + 1) // Second part of the address

    worksheet.getCell('H13').value = addressPart1
    worksheet.getCell('H14').value = addressPart2
    worksheet.getCell('H15').value = customer.customername
    worksheet.getCell('H16').value = customer.phone
    worksheet.getCell('H17').value = customer.email

    const units = ['₺', '$', '€']
    const unit = values.currencyCode === 'TL' ? units[0] : values.currencyCode === 'USD' ? units[1] : units[2]

    products.forEach((product, index) => {
        if (index > 7) return
        worksheet.getCell(`C${20 + index}`).value = `${product.product_name}\r\n${Object.entries(product.attributes)
            .map(([key, value]) => `${key}: ${value}`)
            .join('\r\n')}`
        worksheet.getCell(`H${20 + index}`).value = product.quantity
        worksheet.getCell(`I${20 + index}`).value = i18n.t(product.productType)
        worksheet.getCell(`J${20 + index}`).value = `${unit}${product.unitPrice.toFixed(2)}`
        worksheet.getCell(`K${20 + index}`).value = `${unit}${product.totalPrice.toFixed(2)}`
    })

    sets.forEach((set, index) => {
        if (index + products.length > 7) return
        worksheet.getCell(`C${20 + index + products.length}`).value = `${set.set_name}\r\n${set.products
            .map(
                (product) =>
                    `${product.product_name} x${product.quantity} (${product.productType})\r\n${Object.entries(product.attributes)
                        .map(([key, value]) => `${key}: ${value}`)
                        .join(', ')}`
            )
            .join('\r\n')}`
        worksheet.getCell(`H${20 + index + products.length}`).value = set.quantity
        worksheet.getCell(`I${20 + index + products.length}`).value = i18n.t(set.productType)
        worksheet.getCell(`J${20 + index + products.length}`).value = `${unit}${set.unitPrice.toFixed(2)}`
        worksheet.getCell(`K${20 + index + products.length}`).value = `${unit}${set.totalPrice.toFixed(2)}`
    })

    worksheet.getCell('H28').value = values.currencyCode !== 'TL' ? i18n.t('exchange_rate') : ''
    worksheet.getCell('I28').value = values.currencyCode !== 'TL' ? `${units[0]}${values.exchange_rate.toFixed(4)}` : ''
    worksheet.getCell('K28').value = `${unit}${totalPrice.toFixed(2)}`
    worksheet.getCell('B30').value = `${unit}${(totalPrice * taxRate).toFixed(2)}`

    const data = await workbook.xlsx.writeBuffer()
    const blob = new Blob([data], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheet.sheet'
    })
    const url = window.URL.createObjectURL(blob)
    const anchor = document.createElement('a')
    anchor.href = url
    anchor.download = 'invoice.xlsx'
    anchor.click()
    window.URL.revokeObjectURL(url)
}

export default invoiceToPDF_Eng
