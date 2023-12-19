import store from "@/store";

export const groupAttributesByName = (attributes) => {
  const groupedAttrs = {};
  for (let attr of attributes) {
    if (!groupedAttrs[attr.attribute_name]) {
      groupedAttrs[attr.attribute_name] = [...attr.values];
    }
  }
  return groupedAttrs;
};

let daily_domestic_order_counter = 10;
let daily_foreign_order_counter = 10;
let daily_c_order_counter = 10;
let currentDay = new Date().getDate();

export const generateRandomOrderNumber = () => {
  // Check if it's a new day and reset the counters if necessary
  const today = new Date();
  if (today.getDate() !== currentDay) {
    daily_domestic_order_counter = 10;
    daily_foreign_order_counter = 10;
    daily_c_order_counter = 10;
    currentDay = today.getDate();
  }

  const { usertype } = store.getState().user;

  const formattedDate = `${today.getFullYear()}${String(
    today.getMonth() + 1
  ).padStart(2, "0")}${String(today.getDate()).padStart(2, "0")}`;

  // Determine the suffix based on the user type
  let suffix;
  let counterValue;
  if (
    usertype === "domestic_market_manager" ||
    usertype === "domestic_market_marketing"
  ) {
    suffix = "B";
    counterValue = daily_domestic_order_counter++;
  } else if (
    usertype === "foreign_market_manager" ||
    usertype === "foreign_market_marketing"
  ) {
    suffix = "A";
    counterValue = daily_foreign_order_counter++;
  } else {
    // throw new Error(`Invalid user type: ${usertype}`)
    counterValue = daily_c_order_counter++;
    suffix = "C";
  }

  return `${formattedDate}-MG-${counterValue
    .toString()
    .padStart(3, "0")}-${suffix}`;
};

export const isObject = (item) => {
  return item && typeof item === "object" && !Array.isArray(item);
};

export const isArray = (item) => {
  return item && typeof item === "object" && Array.isArray(item);
};

export const isEmptyArray = (item) => {
  return (
    item && typeof item === "object" && Array.isArray(item) && !item.length
  );
};

export const mergeDeep = (target, source) => {
  if (isObject(target) && isObject(source)) {
    for (const key in source) {
      if (isObject(source[key])) {
        if (!target[key]) Object.assign(target, { [key]: {} });
        mergeDeep(target[key], source[key]);
      } else if (isArray(source[key])) {
        if (!target[key]) Object.assign(target, { [key]: [] });
        mergeDeep(target[key], source[key]);
      } else {
        Object.assign(target, { [key]: source[key] });
      }
    }
  }

  if (isArray(target) && isArray(source)) {
    source.forEach((key, index) => {
      if (isObject(key)) {
        if (!target[index]) target.push({});
        mergeDeep(target[index], source[index]);
      } else if (isArray(key)) {
        if (!target[index]) target.push([]);
        mergeDeep(target[index], source[index]);
      } else {
        target.push(key);
      }
    });
  }

  return target;
};

export const turnIntoOne = (arr) => {
  return [...new Set(arr)];
};

export const turnIntoOneForObjectInArray = (arr, key) => {
  const uniqueMap = new Map();
  arr.forEach((item) => {
    uniqueMap.set(item[key], item);
  });
  return Array.from(uniqueMap.values());
};

export const dateToIsoFormatWithTimezoneOffset = (date) => {
  date.setTime(date.getTime() - date.getTimezoneOffset() * 60000);
  return date.toISOString().split("T")[0];
};

export const imageToBase64 = (urlImg, cropped) => {
  return new Promise((resolve) => {
    var img = new Image();
    img.onload = () => {
      var canvas = document.createElement("canvas"),
        ctx = canvas.getContext("2d");

      canvas.height = cropped?.height ?? img.naturalHeight;
      canvas.width = cropped?.width ?? img.naturalWidth;
      cropped
        ? ctx.drawImage(
            img,
            cropped.x,
            cropped.y,
            cropped.width,
            cropped.height,
            0,
            0,
            canvas.width,
            canvas.height
          )
        : ctx.drawImage(img, 0, 0);

      var b64 = canvas.toDataURL("image/png");
      resolve(b64);
    };
    img.src = urlImg;
  });
};

export const zipArray = (arr, key) => {
  const zip = {};
  for (const item of arr) {
    const keyValue = dateToIsoFormatWithTimezoneOffset(new Date(item[key]));
    if (!zip[keyValue]) {
      zip[keyValue] = [];
    }
    zip[keyValue].push(item);
  }
  return zip;
};

export const filterOlderThan10Days = (obj, currentDate) => {
  for (const dateKey in obj) {
    const date = new Date(dateKey);
    date.setTime(date.getTime() - date.getTimezoneOffset() * 60000);
    const diffInMilliseconds = currentDate - date;
    const diffInDays = Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24));

    if (diffInDays > 10) {
      delete obj[dateKey];
    }
  }
};

export const formatDigits = (number) => {
  return number?.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

export const formatFloat = (number) => {
  return number?.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
