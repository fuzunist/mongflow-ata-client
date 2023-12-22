import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getCustomersFromDB } from "@/services/customer";
import { getOrdersFromDB } from "@/services/order";
import { getProductsFromDB } from "@/services/product";
import { getRecipesFromDB } from "@/services/recipe";
import { getRecipeMaterialsFromDB } from "@/services/recipematerial";
import { getStocksFromDB } from "@/services/stock";
import { getUsersFromDB } from "@/services/auth";
import { getTodayExchangeRates } from "@/services/other";
import { getProductionsFromDB } from "@/services/production";
import { getSetsFromDB } from "@/services/sets";
import {
  getExpensesItemsFromDB,
  getExpensesClassesFromDB,
  getMonthlyExpensesFromDB,
} from "@/services/expenses";
import { v4 as uuidv4 } from "uuid";

export const _promiseAll = createAsyncThunk(
  "apps/promiseAll",
  async ({ access_token, usertype }, { rejectWithValue }) => {
    let [
      products,
      recipes,
      recipeMaterials,
      sets,
      customers,
      orders,
      stocks,
      productions,
      users,
      exchangeRates,
      expensesItems,
      expensesClasses,
      monthlyExpenses,
    ] = await Promise.all([
      getProductsFromDB(access_token),
      getRecipesFromDB(access_token),
      getRecipeMaterialsFromDB(access_token),
      getSetsFromDB(access_token),
      getCustomersFromDB(access_token),
      getOrdersFromDB(access_token),
      getStocksFromDB(access_token),
      getProductionsFromDB(access_token),
      usertype === "admin" ? getUsersFromDB(access_token) : [],
      getTodayExchangeRates(),
      getExpensesItemsFromDB(access_token),
      getExpensesClassesFromDB(access_token),
      getMonthlyExpensesFromDB(access_token),
    ]);

    if (products?.error)
      return rejectWithValue({
        type: "getProductsFromDB",
        error: products.error,
      });
    else if (recipeMaterials?.error)
      return rejectWithValue({
        type: "getProductsFromDB",
        error: products.error,
      });
    else if (recipes?.error)
      return rejectWithValue({
        type: "getProductsFromDB",
        error: products.error,
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

    return {
      products,
      recipes,
      recipeMaterials,
      sets,
      customers,
      orders,
      stocks,
      productions,
      users,
      exchangeRates: exchangeRates.children?.map?.((child) => ({
        currency_code: child.attributes.CurrencyCode,
        forex_buying: child.children[3].value,
        forex_selling: child.children[4].value,
        banknote_buying: child.children[5].value,
        banknote_selling: child.children[6].value,
      })),
      expensesItems,
      expensesClasses,
      monthlyExpenses,
    };
  }
);

const initialState = {
  loading: true,
  customers: [],
  products: [],
  recipes: [],
  recipeMaterials: [],
  sets: [],
  orders: [],
  stocks: [],
  productions: [],
  users: [],
  exchangeRates: [],
  expensesItems: [],
  expensesClasses: [],
  monthlyExpenses: [],
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
    _addRecipeMaterials: (state, action) => {
      console.log("recipematerial from addrecipemat: ", action.payload);
      state.recipeMaterials = [state.recipeMaterials[0], ...action.payload]
    },
    _editRecipe: (state, action) => {
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
      state.expensesItems = [state.expensesItems, ...action.payload];
    },
    _editExpenses: (state, action) => {
      state.monthlyExpenses = {...state.monthlyExpenses[0],...action.payload};
    },
  },
  extraReducers: (builder) => {
    builder.addCase(_promiseAll.pending, (state) => {
      state.products = [];
      state.recipes = [];
      state.recipeMaterials = [];
      state.sets = [];
      state.orders = [];
      state.customers = [];
      state.stocks = [];
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
      state.monthlyExpenses = [];
    });

    builder.addCase(_promiseAll.fulfilled, (state, action) => {
      state.products = action.payload.products;
      state.recipes = action.payload.recipes;
      state.recipeMaterials = action.payload.recipeMaterials;
      state.sets = action.payload.sets;
      state.orders = action.payload.orders;
      state.customers = action.payload.customers;
      state.stocks = action.payload.stocks;
      state.productions = action.payload.productions;
      state.users = action.payload.users;
      state.exchangeRates = action.payload.exchangeRates;
      state.loading = false;
      state.expensesClasses = action.payload.expensesClasses;
      state.expensesItems = action.payload.expensesItems;
      state.monthlyExpenses = action.payload.monthlyExpenses;
    });

    builder.addCase(_promiseAll.rejected, (state, action) => {
      console.log("redux_apps/promiseAll_rejected", action.payload);
    });
  },
});

export const {
  _addStock,
  _editStock,
  _delStock,
  _addProduction,
  _editProduction,
  _delProduction,
  _addCustomer,
  _editCustomer,
  _delCustomer,
  _addOrder,
  _editOrder,
  _delOrder,
  _setOrderStatus,
  _setOrderStatusSet,
  _addProduct,
  _editProduct,
  _delProduct,
  _addRecipe,
  _addRecipeMaterials,
  _editRecipe,
  _delRecipe,
  _addSet,
  _editSet,
  _delSet,
  _setCustomer,
  _setProduct,
  _setSet,
  _setSelectProducts,
  _addSelectProduct,
  _editSelectProduct,
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
  _editExpenses
} = apps.actions;
export default apps.reducer;
