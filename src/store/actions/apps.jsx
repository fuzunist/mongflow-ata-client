import store from "@/store";
import {
  _addCustomer,
  _addRangeContacts,
  _addContact,
  _addProduct,
  _addRecipe,
  _addProductionRecipe,
  _addSpecialRecipe,
  _addRecipeMaterial,
  _editRecipeMaterial,
  _editRawMaterial,
  _editRawMaterialLog,
  _addOrder,
  _setCustomer,
  _setContact,
  _setProduct,
  _setOrderStatus,
  _promiseAll,
  _delCustomer,
  _delContact,
  _editCustomer,
  _editContact,
  _setSearch,
  _editProduct,
  _editRecipe,
  _delProduct,
  _delRecipe,
  _delSpecialRecipe,
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
  _editExpenseItemFreq,
  _editSelectProductWeight,
  _editSelectProductDelivery,
  _addLastProductStockLog,
  _addLastProductStock,
  _addRawMaterialStockLog,
  _addRawMaterialStock,
  _addRecipeMaterialStock,
  _addRecipeMaterialStockLog,
  _editRecipeMaterialStockLog,
  // _addLastProductStockWarehouse,
  // _editLastProductStockWarehouse,
  _addAllRangeProductStockLogs,
  _addAllRangeRawMaterialStockLogs,
  _addAllRangeRecipeMaterialStockLogs,
  _delLastProductStockLog,
  // _addAllProductStockWarehouse,
  _addAllProductStocks
} from "../reducers/apps";

export const promiseAll = (access_token, usertype) =>
  store.dispatch(_promiseAll({ access_token, usertype }));

export const addStock = (stock) => store.dispatch(_addStock(stock));

export const addLastProductStock = (stock) =>
  store.dispatch(_addLastProductStock(stock));

  export const addLastProductStockLog = (log) =>
  store.dispatch(_addLastProductStockLog(log));
 
  export const addAllRangeProductStockLogs = (log) =>
  store.dispatch(_addAllRangeProductStockLogs(log));
  

  export const addAllProductStocks = (stock) =>
  store.dispatch(_addAllProductStocks(stock));
  
  // export const addAllProductStockWarehouse = (stock) =>
  // store.dispatch(_addAllProductStockWarehouse(stock));
  
  export const addAllRangeRawMaterialStockLogs = (log) =>
  store.dispatch(_addAllRangeRawMaterialStockLogs(log));

  export const addAllRangeRecipeMaterialStockLogs = (log) =>
  store.dispatch(_addAllRangeRecipeMaterialStockLogs(log));

  // export const addLastProductStockWarehouse = (stock) =>
  // store.dispatch(_addLastProductStockWarehouse(stock));

  // export const editLastProductStockWarehouse = (stock) =>
  // store.dispatch(_editLastProductStockWarehouse(stock));

  export const delLastProductStockLog = (stock) =>
  store.dispatch(_delLastProductStockLog(stock));

export const addRawMaterialStock = (rawStock) =>
  store.dispatch(_addRawMaterialStock(rawStock));

export const addRawMaterialStockLog = (rawStockLog) =>
  store.dispatch(_addRawMaterialStockLog(rawStockLog));

  export const addRecipeMaterialStock = (recipeStock) =>
  store.dispatch(_addRecipeMaterialStock(recipeStock));


export const editRawMaterial = (rawMaterial) =>
  store.dispatch(_editRawMaterial(rawMaterial));

export const editRawMaterialLog = (rawMaterialLog) =>
  store.dispatch(_editRawMaterialLog(rawMaterialLog));

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
export const addProductionRecipe = (prodrecipe) =>
  store.dispatch(_addProductionRecipe(prodrecipe));

export const editRecipe = (recipe) => store.dispatch(_editRecipe(recipe));
export const delRecipe = (recipeId) => store.dispatch(_delRecipe(recipeId));
export const addSpecialRecipe = (recipe) =>
  store.dispatch(_addSpecialRecipe(recipe));
export const delSpecialRecipe = (recipeId) =>
  store.dispatch(_delSpecialRecipe(recipeId));

export const addRecipeMaterial = (recipeMaterial) =>
  store.dispatch(_addRecipeMaterial(recipeMaterial));

export const addRecipeMaterialStockLog = (recipeMaterialLog) =>
  store.dispatch(_addRecipeMaterialStockLog(recipeMaterialLog));

export const editRecipeMaterialStockLog = (recipeMaterialLog) =>
  store.dispatch(_editRecipeMaterialStockLog(recipeMaterialLog));

export const editRecipeMaterial = (recipeMaterial) =>
  store.dispatch(_editRecipeMaterial(recipeMaterial));

export const addSet = (set) => store.dispatch(_addSet(set));
export const editSet = (set) => store.dispatch(_editSet(set));
export const delSet = (set_id) => store.dispatch(_delSet(set_id));

export const addCustomer = (customer) => store.dispatch(_addCustomer(customer));
export const editCustomer = (customer) =>
  store.dispatch(_editCustomer(customer));
export const delCustomer = (customerid) =>
  store.dispatch(_delCustomer(customerid));

export const addContact = (contact) => store.dispatch(_addContact(contact));
export const addRangeContacts = (contacts) =>
  store.dispatch(_addRangeContacts(contacts));

export const editContact = (contact) => store.dispatch(_editContact(contact));
export const delContact = (id) => store.dispatch(_delContact(id));

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
export const setContact = (id) => store.dispatch(_setContact(id));
export const setProduct = (productID) => store.dispatch(_setProduct(productID));
export const setSet = (setID) => store.dispatch(_setSet(setID));

export const setSelectProducts = (products) =>
  store.dispatch(_setSelectProducts(products));
export const addSelectProduct = (
  attributes,
  quantity,
  productType,
  orderStatus,
  weight,
  delivery_date
) =>
  store.dispatch(
    _addSelectProduct({ attributes, quantity, productType, orderStatus, weight, delivery_date })
  );
export const editSelectProduct = (index, unitPrice) =>
  store.dispatch(_editSelectProduct({ index, unitPrice }));

export const editSelectProductWeight = (index, weight) =>
  store.dispatch(_editSelectProductWeight({ index, weight }));

export const editSelectProductDelivery = (index, date) =>
  store.dispatch(_editSelectProductDelivery({ index, date }));

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

export const editExpenseItemFreq = (expenseFreq) =>
  store.dispatch(_editExpenseItemFreq(expenseFreq));
