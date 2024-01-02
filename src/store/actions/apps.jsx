import store from "@/store";
import {
  _addCustomer,
  _addProduct,
  _addRecipe,
  _addRecipeMaterial,
  _editRecipeMaterial,
  _addRawMaterial,
  _editRawMaterial,
  _addRawMaterialLog,
  _editRawMaterialLog,
  _addOrder,
  _setCustomer,
  _setProduct,
  _setOrderStatus,
  _promiseAll,
  _delCustomer,
  _editCustomer,
  _setSearch,
  _editProduct,
  _editRecipe,
  _delProduct,
  _delRecipe,
  _addStock,
  _editStock,
  _delStock,
  _delOrder,
  _addSelectProduct,
  _delSelectProduct,
  _editSelectProduct,
  _clearSelectProducts,
  _setFilter,
  _setSelectProducts,
  _editOrder,
  _changeUserType,
  _addProduction,
  _editProduction,
  _delProduction,
  _setOrderNumber,
  _clearSelectSets,
  _delSelectSet,
  _addSelectSet,
  _setSelectSets,
  _addSet,
  _editSet,
  _delSet,
  _setSet,
  _editSelectSet,
  _setOrderStatusSet,
  _setSorter,
  _addExpenseItem,
  _editExpenses,
  _addRecipeMaterialLog,
  _editRecipeMaterialLog,
} from "../reducers/apps";

export const promiseAll = (access_token, usertype) =>
  store.dispatch(_promiseAll({ access_token, usertype }));

export const addStock = (stock) => store.dispatch(_addStock(stock));
export const editStock = (stock) => store.dispatch(_editStock(stock));
export const delSock = (stock_id) => store.dispatch(_delStock(stock_id));

export const addProduction = (production) =>
  store.dispatch(_addProduction(production));
export const editProduction = (production) =>
  store.dispatch(_editProduction(production));
export const delProduction = (production_id) =>
  store.dispatch(_delProduction(production_id));

export const addProduct = (product) => store.dispatch(_addProduct(product));
export const editProduct = (product) => store.dispatch(_editProduct(product));
export const delProduct = (product_id) =>
  store.dispatch(_delProduct(product_id));

export const addRecipe = (recipe) => store.dispatch(_addRecipe(recipe));
export const editRecipe = (recipe) => store.dispatch(_editRecipe(recipe));
export const delRecipe = (recipeId) => store.dispatch(_delRecipe(recipeId));

export const addRecipeMaterial = (recipeMaterial) =>
  store.dispatch(_addRecipeMaterial(recipeMaterial));

export const addRecipeMaterialLog = (recipeMaterialLog) =>
  store.dispatch(_addRecipeMaterialLog(recipeMaterialLog));

export const editRecipeMaterialLog = (recipeMaterialLog) =>
  store.dispatch(_editRecipeMaterialLog(recipeMaterialLog));

export const editRecipeMaterial = (recipeMaterial) =>
  store.dispatch(_editRecipeMaterial(recipeMaterial));

export const addRawMaterial = (rawMaterial) =>
  store.dispatch(_addRawMaterial(rawMaterial));
export const editRawMaterial = (rawMaterial) =>
  store.dispatch(_editRawMaterial(rawMaterial));

  export const addRawMaterialLog = (rawMaterialLog) =>
  store.dispatch(_addRawMaterialLog(rawMaterialLog));

export const editRawMaterialLog = (rawMaterialLog) =>
  store.dispatch(_editRawMaterialLog(rawMaterialLog));

export const addSet = (set) => store.dispatch(_addSet(set));
export const editSet = (set) => store.dispatch(_editSet(set));
export const delSet = (set_id) => store.dispatch(_delSet(set_id));

export const addCustomer = (customer) => store.dispatch(_addCustomer(customer));
export const editCustomer = (customer) =>
  store.dispatch(_editCustomer(customer));
export const delCustomer = (customerid) =>
  store.dispatch(_delCustomer(customerid));

export const addOrder = (order) => store.dispatch(_addOrder(order));
export const editOrder = (order) => store.dispatch(_editOrder(order));
export const delOrder = (order_id) => store.dispatch(_delOrder(order_id));
export const setOrderStatus = (
  order_id,
  index,
  productOrderStatus,
  orderStatus
) =>
  store.dispatch(
    _setOrderStatus({ order_id, index, productOrderStatus, orderStatus })
  );
export const setOrderStatusSet = (
  order_id,
  index,
  setOrderStatus,
  orderStatus
) =>
  store.dispatch(
    _setOrderStatusSet({ order_id, index, setOrderStatus, orderStatus })
  );

export const setCustomer = (customerID) =>
  store.dispatch(_setCustomer(customerID));
export const setProduct = (productID) => store.dispatch(_setProduct(productID));
export const setSet = (setID) => store.dispatch(_setSet(setID));

export const setSelectProducts = (products) =>
  store.dispatch(_setSelectProducts(products));
export const addSelectProduct = (
  attributes,
  quantity,
  productType,
  orderStatus
) =>
  store.dispatch(
    _addSelectProduct({ attributes, quantity, productType, orderStatus })
  );
export const editSelectProduct = (index, unitPrice) =>
  store.dispatch(_editSelectProduct({ index, unitPrice }));
export const delSelectProduct = (index) =>
  store.dispatch(_delSelectProduct(index));
export const clearSelectProducts = () => store.dispatch(_clearSelectProducts());

export const setSelectSets = (products) =>
  store.dispatch(_setSelectSets(products));
export const addSelectSet = (
  type,
  attributes,
  quantity,
  productType,
  orderStatus
) =>
  store.dispatch(
    _addSelectSet({ type, attributes, quantity, productType, orderStatus })
  );
export const editSelectSet = (index, unitPrice) =>
  store.dispatch(_editSelectSet({ index, unitPrice }));
export const delSelectSet = (index) => store.dispatch(_delSelectSet(index));
export const clearSelectSets = () => store.dispatch(_clearSelectSets());

export const setOrderNumber = (orderNumber) =>
  store.dispatch(_setOrderNumber(orderNumber));
export const setSearch = (text) => store.dispatch(_setSearch(text));
export const setFilter = (filter) => store.dispatch(_setFilter(filter));
export const setSorter = (sorter) => store.dispatch(_setSorter(sorter));

export const changeUserType = (userid, usertype) =>
  store.dispatch(_changeUserType({ userid, usertype }));

export const addExpenseItem = (item) => store.dispatch(_addExpenseItem(item));
export const editExpenses = (expenses) =>
  store.dispatch(_editExpenses(expenses));
