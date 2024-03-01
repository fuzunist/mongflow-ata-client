import { useSelector } from "react-redux";

export const useLoading = () => useSelector((state) => state.apps.loading);

export const useUsers = () => useSelector((state) => state.apps.users);

export const useProducts = () => useSelector((state) => state.apps.products);

export const useRecipes = () => useSelector((state) => state.apps.recipes);
export const useProductionRecipes = () =>
  useSelector((state) => state.apps.productionRecipes);

export const useSpecialRecipes = () =>
  useSelector((state) => state.apps.specialRecipes);

export const useRecipeMaterials = () =>
  useSelector((state) => state.apps.recipeMaterials);

export const useRecipeMaterialLogs = () =>
  useSelector((state) => state.apps.recipeMaterialStockLogs);

export const useRawMaterialLogs = () =>
  useSelector((state) => state.apps.rawMaterialStockLogs);

export const useRawMaterials = () =>
  useSelector((state) => state.apps.rawMaterials);

export const useSets = () => useSelector((state) => state.apps.sets);
export const useCustomers = () => useSelector((state) => state.apps.customers);
export const useContacts = () => useSelector((state) => state.apps.contacts);

export const useOrders = () => useSelector((state) => state.apps.orders);
export const useStocks = () => useSelector((state) => state.apps.stocks);
export const useLastProductStocks = () => useSelector((state) => state.apps.lastProductStocks);
// export const useLastProductStockWarehouse = () => useSelector((state) => state.apps.lastProductStockWarehouse);
export const useLastProductStockLogs= () => useSelector((state) => state.apps.lastProductStockLogs);

export const useRawMaterialStocks = () => useSelector((state) => state.apps.rawMaterialStocks);
export const useRecipeMaterialStocks = () => useSelector((state) => state.apps.recipeMaterialStocks);

export const useProductions = () =>
  useSelector((state) => state.apps.productions);

export const useCustomer = () =>
  useSelector((state) => state.apps.selected.customer);
  export const useContact = () =>
  useSelector((state) => state.apps.selected.contact);
export const useProduct = () =>
  useSelector((state) => state.apps.selected.product);
export const useSet = () => useSelector((state) => state.apps.selected.set);
export const useSelectedProducts = () =>
  useSelector((state) => state.apps.selected.products);
export const useSelectedSets = () =>
  useSelector((state) => state.apps.selected.sets);

export const useOrderNumber = () =>
  useSelector((state) => state.apps.orderNumber);
export const useSearch = () => useSelector((state) => state.apps.search);
export const useFilter = () => useSelector((state) => state.apps.filter);
export const useSorter = () => useSelector((state) => state.apps.sorter);

export const useExchangeRates = () =>
  useSelector((state) => state.apps.exchangeRates);

export const useExpensesItems = () =>
  useSelector((state) => state.apps.expensesItems);
export const useExpensesClasses = () =>
  useSelector((state) => state.apps.expensesClasses);
export const useExpenses = () => useSelector((state) => state.apps.expenses);
