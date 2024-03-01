import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getCustomersFromDB, getContactsFromDB } from "@/services/customer";
import { getOrdersFromDB } from "@/services/order";
import { getProductsFromDB } from "@/services/product";
import {
  getRecipesFromDB,
  getSpecialRecipesFromDB,
  getProductionRecipesFromDB,
} from "@/services/recipe";
import {
  getRecipeMaterialsFromDB,
  getRecipeMaterialStockLogsFromDB,
} from "@/services/recipematerialstocks";
import {
  getRawMaterialsFromDB,
  getRawMaterialStockLogsFromDB,
} from "@/services/rawmaterialstocks";
import { getStocksFromDB } from "@/services/stock";
import { getUsersFromDB } from "@/services/auth";
import { getTodayExchangeRates } from "@/services/other";
import { getProductionsFromDB } from "@/services/production";
import { getSetsFromDB } from "@/services/sets";
import {
  getExpensesItemsFromDB,
  getExpensesClassesFromDB,
  getExpensesFromDB,
} from "@/services/expenses";
import { v4 as uuidv4 } from "uuid";
import dayjs from "dayjs";
import {
  getProductStockLogsFromDB,
  getProductStocks,
} from "@/services/lastproductstocks";

const todayDate = dayjs().format("YYYY-MM-DD");
const threeDaysAgo = dayjs().subtract(3, "day").format("YYYY-MM-DD");
const lastMonthDate = dayjs().subtract(30, "day").format("YYYY-MM-DD");

export const _promiseAll = createAsyncThunk(
  "apps/promiseAll",
  async ({ access_token, usertype }, { rejectWithValue }) => {
    let [
      products,
      recipes,
      productionRecipes,
      specialRecipes,
      recipeMaterialStockLogs,
      recipeMaterialStocks,
      rawMaterialStockLogs,
      rawMaterialStocks,
      sets,
      customers,
      contacts,
      orders,
      stocks,
      lastProductStocks,
      lastProductStockLogs,
      productions,
      expensesItems,
      expensesClasses,
      expenses,
      exchangeRates,
      users,
    ] = await Promise.all([
      getProductsFromDB(access_token),
      getRecipesFromDB(access_token),
      getProductionRecipesFromDB(access_token),
      getSpecialRecipesFromDB(access_token),
      getRecipeMaterialStockLogsFromDB(access_token, {
        startDate: lastMonthDate,
        endDate: todayDate,
      }),
      getRecipeMaterialsFromDB(access_token),
      getRawMaterialStockLogsFromDB(access_token, {
        startDate: lastMonthDate,
        endDate: todayDate,
      }),
      getRawMaterialsFromDB(access_token),
      getSetsFromDB(access_token),
      getCustomersFromDB(access_token),
      getContactsFromDB(access_token, {
        startDate: threeDaysAgo,
        endDate: todayDate,
      }),
      getOrdersFromDB(access_token),
      getStocksFromDB(access_token),
      getProductStocks(access_token),
      getProductStockLogsFromDB(access_token, {
        startDate: lastMonthDate,
        endDate: todayDate,
      }),
      getProductionsFromDB(access_token),
      getExpensesItemsFromDB(access_token),
      getExpensesClassesFromDB(access_token),
      getExpensesFromDB(access_token),
      getTodayExchangeRates(),
      usertype === "admin" ? getUsersFromDB(access_token) : [],
    ]);

    if (products?.error)
      return rejectWithValue({
        type: "getProductsFromDB",
        error: products.error,
      });
    else if (users?.error)
      return rejectWithValue({
        type: "getUsersFromDB",
        error: users.error,
      });
    else if (recipeMaterialStocks?.error)
      return rejectWithValue({
        type: "getRecipeMaterialsFromDB",
        error: recipeMaterialStocks.error,
      });
    else if (recipes?.error)
      return rejectWithValue({
        type: "getRecipesFromDB",
        error: recipes.error,
      });
    else if (specialRecipes?.error)
      return rejectWithValue({
        type: "getSpecialRecipesFromDB",
        error: specialRecipes.error,
      });
    else if (sets?.error)
      return rejectWithValue({ type: "getSetsFromDB", error: sets.error });
    else if (customers?.error)
      return rejectWithValue({
        type: "getCustomersFromDB",
        error: customers.error,
      });
    else if (orders?.error)
      return rejectWithValue({ type: "getOrdersFromDB", error: orders.error });
    else if (stocks?.error)
      return rejectWithValue({ type: "getStocksFromDB", error: stocks.error });
    else if (lastProductStocks?.error)
      return rejectWithValue({
        type: "lastProductStocksFromDB",
        error: lastProductStocks.error,
      });
    else if (lastProductStockLogs?.error)
      return rejectWithValue({
        type: "getlastProductStockLogsFromDB",
        error: lastProductStockLogs.error,
      });
    else if (productions?.error)
      return rejectWithValue({
        type: "getProductionsFromDB",
        error: productions.error,
      });
    else if (users?.error)
      return rejectWithValue({ type: "getUsersFromDB", error: users.error });
    else if (exchangeRates?.error)
      return rejectWithValue({
        type: "getTodayExchangeRates",
        error: exchangeRates.error,
      });
    else if (rawMaterialStocks?.error)
      return rejectWithValue({
        type: "getRawMaterialStocks",
        error: rawMaterialStocks.error,
      });
    else if (recipeMaterialStockLogs?.error)
      return rejectWithValue({
        type: "getrecipeMaterialStockLogs",
        error: recipeMaterialStockLogs.error,
      });
    else if (expenses?.error)
      return rejectWithValue({
        type: "getExpenses",
        error: expenses.error,
      });
    else if (expensesItems?.error)
      return rejectWithValue({
        type: "getExpensesItems",
        error: expensesItems.error,
      });
    else if (expensesClasses?.error)
      return rejectWithValue({
        type: "getExpensesClassesFromDB",
        error: expensesClasses.error,
      });
    if (productionRecipes?.error)
      return rejectWithValue({
        type: "productionRecipesFromDB",
        error: productionRecipes.error,
      });
    if (contacts?.error)
      return rejectWithValue({
        type: "getContactsFromDB",
        error: contacts.error,
      });
    return {
      products,
      recipes,
      productionRecipes,
      specialRecipes,
      recipeMaterialStockLogs,
      recipeMaterialStocks,
      rawMaterialStockLogs,
      rawMaterialStocks,
      sets,
      customers,
      contacts,
      orders,
      stocks,
      lastProductStocks,
      lastProductStockLogs,
      productions,
      expensesItems,
      expensesClasses,
      expenses,
      exchangeRates: exchangeRates.children?.map?.((child) => ({
        currency_code: child.attributes.CurrencyCode,
        forex_buying: child.children[3].value,
        forex_selling: child.children[4].value,
        banknote_buying: child.children[5].value,
        banknote_selling: child.children[6].value,
      })),
      users,
    };
  }
);

const initialState = {
  loading: true,
  customers: [],
  contacts: [],
  products: [],
  recipes: [],
  productionRecipes: [],
  specialRecipes: [],
  recipeMaterialStocks: [],
  recipeMaterialStockLogs: [],
  rawMaterialStocks: [],
  rawMaterialStockLogs: [],
  sets: [],
  orders: [],
  stocks: [],
  lastProductStocks: [],
  lastProductStockLogs: [],
  productions: [],
  users: [],
  exchangeRates: [],
  expensesItems: [],
  expensesClasses: [],
  expenses: [],
  selected: {
    customer: null,
    product: null,
    products: [],
    set: null,
    sets: [],
  },
  orderNumber: "",
  search: "",
  filter: 0,
  sorter: "suggested",
};

const apps = createSlice({
  name: "apps",
  initialState,
  reducers: {
    _addStock: (state, action) => {
      state.stocks = [...state.stocks, action.payload].sort(
        (a, b) => new Date(a.date) - new Date(b.date)
      );
    },
    _addLastProductStock: (state, action) => {
      if (
        state.lastProductStocks.find((item) => item.id === action.payload.id)
      ) {
        state.lastProductStocks = state.lastProductStocks.map((stock) => {
          if (stock.id === action.payload.id) {
            stock = action.payload;
          }
          return stock;
        });
      } else {
        state.lastProductStocks = [...state.lastProductStocks, action.payload];
      }
    },
    _addLastProductStockLog: (state, action) => {
      if (
        state.lastProductStockLogs.find((item) => item.id === action.payload.id)
      ) {
        state.lastProductStockLogs = state.lastProductStockLogs.map((stock) => {
          if (stock.id === action.payload.id) {
            stock = action.payload;
          }
          return stock;
        });
      } else {
        state.lastProductStockLogs = [
          ...state.lastProductStockLogs,
          action.payload,
        ];
      }
    },

    _addAllRangeProductStockLogs: (state, action) => {
      state.lastProductStockLogs = [...action.payload];
    },
    _addAllProductStocks: (state, action) => {
      state.lastProductStocks = [...action.payload];
    },

    _delLastProductStockLog: (state, action) => {
      state.lastProductStockLogs = state.lastProductStockLogs.filter(
        (log) => log.id !== action.payload
      );
    },
    _addAllRangeRawMaterialStockLogs: (state, action) => {
      state.rawMaterialStockLogs = [...action.payload];
    },
    _addRawMaterialStockLog: (state, action) => {
      state.rawMaterialStockLogs = [
        ...state.rawMaterialStockLogs,
        action.payload,
      ];
    },
    _editrawMaterialStockLog: (state, action) => {
      state.rawMaterialStockLogs = state.rawMaterialStockLogs.map(
        (rawMaterialStockLog) => {
          if (rawMaterialStockLog.id === action.payload.id)
            rawMaterialStockLog = {
              ...rawMaterialStockLog,
              ...action.payload,
            };
          return rawMaterialStockLog;
        }
      );
    },
    _addRawMaterialStock: (state, action) => {
      if (
        state.rawMaterialStocks.find((item) => item.id === action.payload.id)
      ) {
        state.rawMaterialStocks = state.rawMaterialStocks.map((stock) => {
          if (stock.id === action.payload.id) {
            stock = action.payload;
            return stock;
          }
        });
      } else
        state.rawMaterialStocks = [...state.rawMaterialStocks, action.payload];
    },
    _addRecipeMaterialStock: (state, action) => {
      if (
        state.recipeMaterialStocks.find((item) => item.id === action.payload.id)
      ) {
        state.recipeMaterialStocks = state.recipeMaterialStocks.map((stock) => {
          if (stock.id === action.payload.id) {
            stock = action.payload;
            return stock;
          }
        });
      } else
        state.recipeMaterialStocks = [
          ...state.recipeMaterialStocks,
          action.payload,
        ];
    },
    _editRawMaterial: (state, action) => {
      state.rawMaterialStocks = state.rawMaterialStocks.map((rawMaterial) => {
        if (rawMaterial.id === action.payload.id)
          rawMaterial = {
            ...rawMaterial,
            ...action.payload,
          };
        return rawMaterial;
      });
    },
    _addAllRangeRecipeMaterialStockLogs: (state, action) => {
      state.recipeMaterialStockLogs = [...action.payload];
    },
    _addRecipeMaterialStockLog: (state, action) => {
      state.recipeMaterialStockLogs = [
        ...state.recipeMaterialStockLogs,
        action.payload,
      ];
    },
    _editRecipeMaterialStockLog: (state, action) => {
      state.recipeMaterialStockLogs = state.recipeMaterialStockLogs.map(
        (recipeMaterialStockLog) => {
          if (recipeMaterialStockLog.id === action.payload.id)
            recipeMaterialStockLog = {
              ...recipeMaterialStockLog,
              ...action.payload,
            };
          return recipeMaterialStockLog;
        }
      );
    },
    _addRecipeMaterial: (state, action) => {
      // state.recipeMaterials = [...state.recipeMaterials, action.payload];
    },

    _editRecipeMaterial: (state, action) => {
      state.recipeMaterialStocks = state.recipeMaterialStocks.map(
        (recipeMaterial) => {
          if (recipeMaterial.id === action.payload.id)
            recipeMaterial = {
              ...recipeMaterial,
              ...action.payload,
            };
          return recipeMaterial;
        }
      );
    },

    _editStock: (state, action) => {
      state.stocks = state.stocks.map((stock) => {
        if (stock.stock_id === action.payload.stock_id)
          stock = { ...stock, ...action.payload };
        return stock;
      });
    },
    _delStock: (state, action) => {
      state.stocks = state.stocks.filter(
        (stock) => stock.stock_id !== action.payload
      );
    },
    _addProduction: (state, action) => {
      state.productions = [...state.productions, action.payload].sort(
        (a, b) => new Date(a.date) - new Date(b.date)
      );
    },
    _editProduction: (state, action) => {
      state.productions = state.productions.map((production) => {
        if (production.production_id === action.payload.production_id)
          production = { ...production, ...action.payload };
        return production;
      });
    },
    _delProduction: (state, action) => {
      state.productions = state.productions.filter(
        (production) => production.production_id !== action.payload
      );
    },
    _addCustomer: (state, action) => {
      state.customers = [...state.customers, action.payload];
    },
    _editCustomer: (state, action) => {
      state.customers = state.customers.map((customer) => {
        if (customer.customerid === action.payload.customerid)
          customer = action.payload;
        return customer;
      });
    },
    _delCustomer: (state, action) => {
      state.customers = state.customers.filter(
        (customer) => customer.customerid !== action.payload
      );
    },

    _addRangeContacts: (state, action) => {
      state.contacts = [...action.payload];
    },

    _addContact: (state, action) => {
      state.contacts = [action.payload, ...state.contacts];
    },
    _editContact: (state, action) => {
      state.contacts = state.contacts.map((contact) => {
        if (contact.id === action.payload.id) contact = action.payload;
        return contact;
      });
    },
    _delContact: (state, action) => {
      state.contacts = state.contacts.filter(
        (contact) => contact.id !== action.payload
      );
    },
    _addProduct: (state, action) => {
      state.products = [...state.products, action.payload];
    },
    _editProduct: (state, action) => {
      state.products = state.products.map((product) => {
        if (product.product_id === action.payload.product_id)
          product = {
            ...product,
            ...action.payload,
          };
        return product;
      });
    },
    _delProduct: (state, action) => {
      state.products = state.products.filter(
        (product) => product.product_id !== action.payload
      );
    },
    _addRecipe: (state, action) => {
      state.recipes = [...state.recipes, action.payload];
    },
    _addProductionRecipe: (state, action) => {
      state.productionRecipes = [...state.productionRecipes, action.payload];
    },
    _editRecipe: (state, action) => {
      console.log("_editRecipe action.payload", action.payload);
      state.recipes = state.recipes.map((recipe) => {
        if (recipe.id === action.payload.id)
          recipe = {
            ...recipe,
            ...action.payload,
          };
        return recipe;
      });
    },
    _delRecipe: (state, action) => {
      state.recipes = state.recipes.filter(
        (recipe) => recipe.id !== action.payload
      );
    },
    _addSpecialRecipe: (state, action) => {
      state.specialRecipes = [...state.specialRecipes, action.payload];
    },
    _delSpecialRecipe: (state, action) => {
      state.specialRecipes = state.specialRecipes.filter(
        (specialRecipe) => specialRecipe.id !== action.payload
      );
    },

    _addSet: (state, action) => {
      state.sets = [...state.sets, action.payload];
    },
    _editSet: (state, action) => {
      state.sets = state.sets.map((set) => {
        if (set.set_id === action.payload.set_id)
          set = {
            ...set,
            ...action.payload,
          };
        return set;
      });
    },
    _delSet: (state, action) => {
      state.sets = state.sets.filter((set) => set.set_id !== action.payload);
    },
    _addOrder: (state, action) => {
      state.orders = [...state.orders, action.payload];
    },
    _editOrder: (state, action) => {
      state.orders = state.orders.map((order) => {
        if (order.order_id === action.payload.order_id) {
          console.log("editOrder: ", order, action.payload);
          order = {
            ...order,
            ...action.payload,
          };
          console.log("editOrder: ", order, action.payload);
        }
        return order;
      });
    },
    _delOrder: (state, action) => {
      state.orders = state.orders.filter(
        (order) => order.order_id !== parseInt(action.payload)
      );
    },
    _setOrderStatus: (state, action) => {
      const { order_id, index, productOrderStatus, orderStatus } =
        action.payload;
      state.orders = state.orders.map((order) => {
        if (order.order_id === order_id) {
          order.order_status = orderStatus;
          order.products = order.products.map((product, indx) => {
            if (indx === index) {
              product.orderStatus = productOrderStatus;
            }
            return product;
          });
        }
        return order;
      });
    },
    _setOrderStatusSet: (state, action) => {
      const { order_id, index, setOrderStatus, orderStatus } = action.payload;
      state.orders = state.orders.map((order) => {
        if (order.order_id === order_id) {
          order.order_status = orderStatus;
          order.sets = order.sets.map((set, indx) => {
            if (indx === index) {
              set.orderStatus = setOrderStatus;
            }
            return set;
          });
        }
        return order;
      });
    },
    _setCustomer: (state, action) => {
      if (action.payload === null) {
        state.selected.customer = null;
        return;
      }
      const customer = state.customers.find(
        (customer) => customer.customerid === action.payload
      );
      state.selected.customer = customer || null;
    },
    _setContact: (state, action) => {
      if (action.payload === null) {
        state.selected.contact = null;
        return;
      }
      const contact = state.contacts.find(
        (contact) => contact.id === action.payload
      );
      state.selected.contact = contact || null;
    },
    _setProduct: (state, action) => {
      if (action.payload === null) {
        state.selected.product = null;
        return;
      }
      const product = state.products.find(
        (product) => product.product_id === action.payload
      );
      state.selected.product = product || null;
    },
    _setSet: (state, action) => {
      if (action.payload === null) {
        state.selected.set = null;
        return;
      }
      const set = state.sets.find((set) => set.set_id === action.payload);
      state.selected.set = set || null;
    },
    _setSelectProducts: (state, action) => {
      state.selected.products = action.payload;
    },
    _addSelectProduct: (state, action) => {
      const uniqueId = uuidv4();
      state.selected.products.push({
        ...state.selected.product,
        attributes: action.payload.attributes,
        quantity: action.payload.quantity, // ton olarak alıp kg olarak kaydediyoruz
        weight: action.payload.weight,
        delivery_date: action.payload.delivery_date,
        productType: action.payload.productType,
        orderStatus: [
          {
            quantity: action.payload.quantity, // ton olarak alıp kg olarak kaydediyoruz
            type: action.payload.orderStatus,
          },
        ],
        unitPrice: 0,
        totalPrice: 0,
        unitCost: 0,
        totalCost: 0,
        recipe_id: uniqueId,
      });
    },
    _editSelectProduct: (state, action) => {
      state.selected.products = state.selected.products.map(
        (product, index) => {
          if (index === action.payload.index) {
            product.unitPrice = action.payload.unitPrice;
            product.totalPrice = product.quantity * action.payload.unitPrice;
          }
          return product;
        }
      );
    },
    _editSelectProductWeight: (state, action) => {
      state.selected.products = state.selected.products.map(
        (product, index) => {
          if (index === action.payload.index) {
            product.weight = action.payload.weight;
          }
          return product;
        }
      );
    },

    _editSelectProductDelivery: (state, action) => {
      state.selected.products = state.selected.products.map(
        (product, index) => {
          if (index === action.payload.index) {
            product.delivery_date = action.payload.date;
          }
          return product;
        }
      );
    },
    _editSelectProductDetails: (state, action) => {
      state.selected.products = state.selected.products.map(
        (product, index) => {
          if (index === action.payload.index) {
            product.delivery_date = action.payload.date;
          }
          return product;
        }
      );
    },
    _delSelectProduct: (state, action) => {
      if (state.selected.products.length === 0) return;
      state.selected.products = state.selected.products.filter(
        (_, index) => index !== action.payload
      );
    },
    _clearSelectProducts: (state) => {
      state.selected.products = [];
    },
    _setSelectSets: (state, action) => {
      state.selected.sets = action.payload;
    },
    _addSelectSet: (state, action) => {
      let _set = {};

      if (action.payload.type === "create") {
        _set = {
          ...state.selected.product,
          attributes: action.payload.attributes,
          quantity: action.payload.quantity,
          productType: action.payload.productType,
        };
      } else {
        _set = {
          ...state.selected.set,
          quantity: action.payload.quantity,
          productType: action.payload.productType,
          orderStatus: [
            {
              quantity: action.payload.quantity,
              type: action.payload.orderStatus,
            },
          ],
          unitPrice: 0,
          totalPrice: 0,
        };
      }

      state.selected.sets.push(_set);
    },
    _editSelectSet: (state, action) => {
      state.selected.sets = state.selected.sets.map((set, index) => {
        if (index === action.payload.index) {
          set.unitPrice = action.payload.unitPrice;
          set.totalPrice = set.quantity * action.payload.unitPrice;
        }
        return set;
      });
    },
    _delSelectSet: (state, action) => {
      if (state.selected.sets.length === 0) return;
      state.selected.sets = state.selected.sets.filter(
        (_, index) => index !== action.payload
      );
    },
    _clearSelectSets: (state) => {
      state.selected.sets = [];
    },
    _setOrderNumber: (state, action) => {
      state.orderNumber = action.payload;
    },
    _setSearch: (state, action) => {
      state.search = action.payload;
    },
    _setFilter: (state, action) => {
      state.filter = action.payload;
    },
    _setSorter: (state, action) => {
      state.sorter = action.payload;
    },
    _changeUserType: (state, action) => {
      state.users = state.users.map((user) => {
        if (user.userid === action.payload.userid)
          user.usertype = action.payload.usertype;
        return user;
      });
    },
    _addExpenseItem: (state, action) => {
      state.expensesItems = [...state.expensesItems, action.payload];
    },
    _editExpenses: (state, action) => {
      state.expenses = { ...state.expenses, ...action.payload };
    },
    _editExpenseItemFreq: (state, action) => {
      state.expensesItems = state.expensesItems.map((expensesItem) => {
        if (expensesItem.id === action.payload.id)
          expensesItem = {
            ...expensesItem,
            ...action.payload,
          };
        return expensesItem;
      });
    },
  },
  extraReducers: (builder) => {
    builder.addCase(_promiseAll.pending, (state) => {
      state.products = [];
      state.recipes = [];
      state.productionRecipes = [];
      state.specialRecipes = [];
      state.recipeMaterialStockLogs = [];
      state.recipeMaterialStocks = [];
      state.rawMaterialStocks = [];
      state.sets = [];
      state.orders = [];
      state.customers = [];
      state.contacts = [];
      state.stocks = [];
      state.lastProductStocks = [];
      state.lastProductStockLogs = [];
      state.productions = [];
      state.users = [];
      state.exchangeRates = [];
      state.loading = true;
      state.selected = {
        customer: null,
        product: null,
        products: [],
        set: null,
        sets: [],
      };
      state.orderNumber = "";
      state.search = "";
      state.filter = 0;
      state.sorter = "suggested";
      state.expensesClasses = [];
      state.expensesItems = [];
      state.expenses = [];
    });

    builder.addCase(_promiseAll.fulfilled, (state, action) => {
      state.products = action.payload.products;
      state.recipes = action.payload.recipes;
      state.productionRecipes = action.payload.productionRecipes;
      state.specialRecipes = action.payload.specialRecipes;
      state.recipeMaterialStockLogs = action.payload.recipeMaterialStockLogs;
      state.recipeMaterialStocks = action.payload.recipeMaterialStocks;
      state.rawMaterialStockLogs = action.payload.rawMaterialStockLogs;
      state.rawMaterialStocks = action.payload.rawMaterialStocks;
      state.sets = action.payload.sets;
      state.orders = action.payload.orders;
      state.customers = action.payload.customers;
      state.contacts = action.payload.contacts;
      state.stocks = action.payload.stocks;
      state.lastProductStocks = action.payload.lastProductStocks;
      state.lastProductStockLogs = action.payload.lastProductStockLogs;
      state.productions = action.payload.productions;
      state.users = action.payload.users;
      state.exchangeRates = action.payload.exchangeRates;
      state.loading = false;
      state.expensesClasses = action.payload.expensesClasses;
      state.expensesItems = action.payload.expensesItems;
      state.expenses = action.payload.expenses;
    });

    builder.addCase(_promiseAll.rejected, (state, action) => {
      console.log("redux_apps/promiseAll_rejected", action.payload);
    });
  },
});

export const {
  _addStock,
  _addLastProductStock,
  _addLastProductStockLog,
  _addLastProductStockWarehouse,
  _addAllProductStocks,
  _addAllProductStockWarehouse,
  _editLastProductStockWarehouse,
  _delLastProductStockLog,
  _addAllRangeProductStockLogs,
  _addAllRangeRawMaterialStockLogs,
  _addAllRangeRecipeMaterialStockLogs,
  _editStock,
  _delStock,
  _addProduction,
  _editProduction,
  _delProduction,
  _addCustomer,
  _editCustomer,
  _delCustomer,
  _addRangeContacts,
  _addContact,
  _editContact,
  _delContact,
  _addOrder,
  _editOrder,
  _delOrder,
  _setOrderStatus,
  _setOrderStatusSet,
  _addProduct,
  _editProduct,
  _delProduct,
  _addRecipe,
  _addProductionRecipe,
  _addSpecialRecipe,
  _editRecipeMaterial,
  _editRecipeMaterialStockLog,
  _addRecipeMaterial,
  _addRawMaterialStockLog,
  _editRawMaterial,
  _addRawMaterialStock,
  _addRecipeMaterialStock,
  _addRecipeMaterialStockLog,
  _editRawMaterialLog,
  _editRecipe,
  _delRecipe,
  _delSpecialRecipe,
  _addSet,
  _editSet,
  _delSet,
  _setCustomer,
  _setContact,
  _setProduct,
  _setSet,
  _setSelectProducts,
  _addSelectProduct,
  _editSelectProduct,
  _editSelectProductWeight,
  _editSelectProductDelivery,
  _delSelectProduct,
  _clearSelectProducts,
  _setSelectSets,
  _addSelectSet,
  _editSelectSet,
  _delSelectSet,
  _clearSelectSets,
  _setOrderNumber,
  _setSearch,
  _setFilter,
  _setSorter,
  _changeUserType,
  _addExpenseItem,
  _editExpenses,
  _editExpenseItemFreq,
} = apps.actions;
export default apps.reducer;
