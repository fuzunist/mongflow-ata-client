import ExcelJS from "exceljs";
import i18n from "@/i18n";

const ordersToExcel = async (orders) => {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("ORDERS");

  console.log("orders", orders);

  // sayfa yapısı
  worksheet.pageSetup.fitToPage = true;
  worksheet.pageSetup.fitToHeight = 1;
  worksheet.pageSetup.fitToWidth = 1;
  worksheet.pageSetup.paperSize = 9;
  worksheet.pageSetup.horizontalCentered = true;
  worksheet.pageSetup.verticalCentered = false;
  worksheet.pageSetup.margins = {
    left: 0,
    right: 0.5,
    top: 0.5,
    bottom: 0.5,
    header: 0,
    footer: 0,
  };

  // sütun genişlikleri ayarlanması.
  worksheet.getColumn("A").width = 8.82;
  worksheet.getColumn("B").width = 8.89;
  worksheet.getColumn("C").width = 26.67;
  worksheet.getColumn("D").width = 26.67;
  worksheet.getColumn("E").width = 8.89;
  worksheet.getColumn("F").width = 17.78;
  worksheet.getColumn("G").width = 17.78;
  worksheet.getColumn("H").width = 17.78;
  worksheet.getColumn("I").width = 17.78;
  worksheet.getColumn("J").width = 17.78;
  worksheet.getColumn("K").width = 17.78;

  const doubleBorderStyle = { style: "double", color: { argb: "000000" } };
  const thinBorderStyle = { style: "thin", color: { argb: "000000" } };

  worksheet.mergeCells("B2:B4");
  worksheet.mergeCells("C2:D4");
  worksheet.mergeCells("E2:I4");
  worksheet.mergeCells("J2:J4");
  worksheet.mergeCells("K2:K4");
  worksheet.getRow(2).height = 21; // hücre yüksekliği
  worksheet.getRow(3).height = 21; // hücre yüksekliği
  worksheet.getRow(4).height = 21; // hücre yüksekliği
  worksheet.getCell("B2").alignment = {
    vertical: "middle",
    horizontal: "center",
  }; // ürün hücresinin hizalanması
  worksheet.getCell("C2").alignment = {
    vertical: "middle",
    horizontal: "center",
    wrapText: true,
  }; // ürün hücresinin hizalanması
  worksheet.getCell("E2").alignment = {
    vertical: "middle",
    horizontal: "center",
    wrapText: true,
  }; // ürün hücresinin hizalanması
  worksheet.getCell("J2").alignment = {
    vertical: "middle",
    horizontal: "center",
    wrapText: true,
  }; // ürün hücresinin hizalanması
  worksheet.getCell("K2").alignment = {
    vertical: "middle",
    horizontal: "center",
  }; // ürün hücresinin hizalanması

  worksheet.getCell("B2").value = "No";
  worksheet.getCell("C2").value = `${i18n.t("order_number")}\r\n${i18n.t(
    "company_name"
  )}\r\n${i18n.t("order_status")}`;
  worksheet.getCell("E2").value = `${i18n.t("products")}\r\n(${i18n.t(
    "product"
  )}\r\n${i18n.t("attributes")}\r\n${i18n.t("unit")} / ${i18n.t(
    "unitPrice"
  )} / ${i18n.t("totalPrice")} / ${i18n.t("orderStatus")})`;
  worksheet.getCell("J2").value = `${i18n.t("taxed_total")}\r\n(${i18n.t(
    "exchange_rate"
  )})`;
  worksheet.getCell("K2").value = i18n.t("approver");

  worksheet.getCell("B2").border = {
    top: doubleBorderStyle,
    left: doubleBorderStyle,
    bottom: doubleBorderStyle,
  };
  worksheet.getCell("C2").border = {
    top: doubleBorderStyle,
    left: thinBorderStyle,
    bottom: doubleBorderStyle,
  };
  worksheet.getCell("E2").border = {
    top: doubleBorderStyle,
    left: thinBorderStyle,
    bottom: doubleBorderStyle,
  };
  worksheet.getCell("J2").border = {
    top: doubleBorderStyle,
    left: thinBorderStyle,
    bottom: doubleBorderStyle,
  };
  worksheet.getCell("K2").border = {
    top: doubleBorderStyle,
    left: thinBorderStyle,
    right: doubleBorderStyle,
    bottom: doubleBorderStyle,
  };

  worksheet.getCell("B2").font = {
    name: "Calibri",
    size: 12,
    bold: true,
    italic: false,
    color: { argb: "000000" },
  };

  worksheet.getCell("C2").font = {
    name: "Calibri",
    size: 12,
    bold: true,
    italic: false,
    color: { argb: "000000" },
  };

  worksheet.getCell("E2").font = {
    name: "Calibri",
    size: 12,
    bold: true,
    italic: false,
    color: { argb: "000000" },
  };

  worksheet.getCell("J2").font = {
    name: "Calibri",
    size: 12,
    bold: true,
    italic: false,
    color: { argb: "000000" },
  };

  worksheet.getCell("K2").font = {
    name: "Calibri",
    size: 12,
    bold: true,
    italic: false,
    color: { argb: "000000" },
  };

  let last = 0;
  const units = ["₺", "$", "€"];

  orders.forEach((order, index) => {
    const productsLen = order.products.length;
    worksheet.mergeCells(
      `B${index * last * 3 + 5}:B${index * last * 3 + 5 + productsLen * 3 - 1}`
    ); // hücrelerin birleştirilmesi
    worksheet.mergeCells(
      `C${index * last * 3 + 5}:D${index * last * 3 + 5 + productsLen * 3 - 1}`
    ); // hücrelerin birleştirilmesi

    order.products.forEach((product, indx) => {
      worksheet.mergeCells(
        `E${index * last * 3 + 5 + indx * 3}:I${
          index * last * 3 + 5 + indx * 3 + 2
        }`
      ); // hücrelerin birleştirilmesi
      worksheet.getRow(index * last * 3 + 5 + indx * 3).height = 21; // hücre yüksekliği
      worksheet.getRow(index * last * 3 + 5 + indx * 3 + 1).height = 21; // hücre yüksekliği
      worksheet.getRow(index * last * 3 + 5 + indx * 3 + 2).height = 21; // hücre yüksekliği
      worksheet.getCell(`E${index * last * 3 + 5 + indx * 3}`).alignment = {
        vertical: "middle",
        horizontal: "center",
        wrapText: true,
      }; // ürün hücresinin hizalanması

      worksheet.getCell(`E${index * last * 3 + 5 + indx * 3}`).border = {
        left: thinBorderStyle,
        bottom:
          index === orders.length - 1 && indx === productsLen - 1
            ? doubleBorderStyle
            : thinBorderStyle,
      };

      const unit =
        product.currency_code === "TL"
          ? units[0]
          : product.currency_code === "USD"
          ? units[1]
          : units[2];
      worksheet.getCell(`E${index * last * 3 + 5 + indx * 3}`).value = `${
        product.product_name
      } \r\n ${Object.entries(product?.attributes)
        .map(([key, value]) => `${key}: ${value}`)
        .join(", ")} \r\n ${product.quantity} ${i18n.t(
        product.productType
      )} / ${unit}${product.unitPrice} / ${unit}${
        product.totalPrice
      } / ${product.orderStatus
        .map(
          (status) =>
            `${status?.quantity} ${i18n.t(product.productType)}, ${i18n.t(
              status.type
            )}`
        )
        .join(" ")}`;
    });

    worksheet.mergeCells(
      `J${index * last * 3 + 5}:J${index * last * 3 + 5 + productsLen * 3 - 1}`
    ); // hücrelerin birleştirilmesi
    worksheet.mergeCells(
      `K${index * last * 3 + 5}:K${index * last * 3 + 5 + productsLen * 3 - 1}`
    ); // hücrelerin birleştirilmesi

    worksheet.getCell(`B${index * last * 3 + 5}`).alignment = {
      vertical: "middle",
      horizontal: "center",
    }; // ürün hücresinin hizalanması
    worksheet.getCell(`C${index * last * 3 + 5}`).alignment = {
      vertical: "middle",
      horizontal: "center",
      wrapText: true,
    }; // ürün hücresinin hizalanması
    worksheet.getCell(`J${index * last * 3 + 5}`).alignment = {
      vertical: "middle",
      horizontal: "center",
      wrapText: true,
    }; // stok hücresinin hüzalanması
    worksheet.getCell(`K${index * last * 3 + 5}`).alignment = {
      vertical: "middle",
      horizontal: "center",
    }; // stok hücresinin hüzalanması

    const borderCells = [];

    if (index === orders.length - 1) {
      const _borderCells = [
        {
          cell: `B${index * last * 3 + 5}`,
          borders: [
            {
              key: "left",
              style: doubleBorderStyle,
            },
            {
              key: "bottom",
              style: doubleBorderStyle,
            },
          ],
        },
        {
          cell: `C${index * last * 3 + 5}`,
          borders: [
            {
              key: "left",
              style: thinBorderStyle,
            },
            {
              key: "bottom",
              style: doubleBorderStyle,
            },
          ],
        },
        {
          cell: `J${index * last * 3 + 5}`,
          borders: [
            {
              key: "left",
              style: thinBorderStyle,
            },
            {
              key: "bottom",
              style: doubleBorderStyle,
            },
          ],
        },
        {
          cell: `K${index * last * 3 + 5}`,
          borders: [
            {
              key: "left",
              style: thinBorderStyle,
            },
            {
              key: "bottom",
              style: doubleBorderStyle,
            },
            {
              key: "right",
              style: doubleBorderStyle,
            },
          ],
        },
      ];
      borderCells.push(..._borderCells);
    } else {
      const _borderCells = [
        {
          cell: `B${index * last * 3 + 5}`,
          borders: [
            {
              key: "left",
              style: doubleBorderStyle,
            },
            {
              key: "bottom",
              style: thinBorderStyle,
            },
          ],
        },
        {
          cell: `C${index * last * 3 + 5}`,
          borders: [
            {
              key: "left",
              style: thinBorderStyle,
            },
            {
              key: "bottom",
              style: thinBorderStyle,
            },
          ],
        },
        {
          cell: `J${index * last * 3 + 5}`,
          borders: [
            {
              key: "left",
              style: thinBorderStyle,
            },
            {
              key: "bottom",
              style: thinBorderStyle,
            },
          ],
        },
        {
          cell: `K${index * last * 3 + 5}`,
          borders: [
            {
              key: "left",
              style: thinBorderStyle,
            },
            {
              key: "bottom",
              style: thinBorderStyle,
            },
            {
              key: "right",
              style: doubleBorderStyle,
            },
          ],
        },
      ];
      borderCells.push(..._borderCells);
    }

    borderCells.forEach((cell) => {
      const borderStyle = {};
      cell.borders.forEach((border) => {
        borderStyle[border.key] = border.style;
      });
      worksheet.getCell(cell.cell).border = borderStyle;
    });

    worksheet.getCell(`B${index * last * 3 + 5}`).font = {
      name: "Calibri",
      size: 12,
      bold: false,
      italic: false,
      color: { argb: "000000" },
    };

    worksheet.getCell(`C${index * last * 3 + 5}`).font = {
      name: "Calibri",
      size: 12,
      bold: false,
      italic: false,
      color: { argb: "000000" },
    };

    worksheet.getCell(`E${index * last * 3 + 5}`).font = {
      name: "Calibri",
      size: 11,
      bold: false,
      italic: false,
      color: { argb: "000000" },
    };

    worksheet.getCell(`J${index * last * 3 + 5}`).font = {
      name: "Calibri",
      size: 12,
      bold: false,
      italic: false,
      color: { argb: "000000" },
    };

    worksheet.getCell(`K${index * last * 3 + 5}`).font = {
      name: "Calibri",
      size: 12,
      bold: false,
      italic: false,
      color: { argb: "000000" },
    };

    const unit =
      order.currency_code === "TL"
        ? units[0]
        : order.currency_code === "USD"
        ? units[1]
        : units[2];

    worksheet.getCell(`B${index * last * 3 + 5}`).value = index + 1;
    worksheet.getCell(`C${index * last * 3 + 5}`).value = `${
      order.order_number
    }\r\n${order.customer.companyname}\r\n${i18n.t(order.order_status)}`;
    worksheet.getCell(`J${index * last * 3 + 5}`).value =
      order.currency_code !== "TL"
        ? `${unit}${order.total_with_tax}\r\n(${units[0]}${order.exchange_rate})`
        : `${unit}${order.total_with_tax}`;
    worksheet.getCell(`K${index * last * 3 + 5}`).value = order.approver ?? "-";

    last = productsLen;
  });

  const data = await workbook.xlsx.writeBuffer();
  const blob = new Blob([data], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheet.sheet",
  });
  const url = window.URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = "orders.xlsx";
  anchor.click();
  window.URL.revokeObjectURL(url);
};

export default ordersToExcel;
