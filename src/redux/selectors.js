export const selectCart = (state) => state.cart;

export const selectSort = (state) => state.filter.sort;
export const selectorCategoryId = (state) => state.filter.categoryId;
export const selectorSortProperty = (state) => state.filter.sort.sortProperty;
export const selectSearchValue = (state) => state.filter.searchValue;
export const selectIsMounted = (state) => state.filter.isMounted;

export const selectPizzaItem = (state) => state.pizza.items;
export const selectPizzaStatus = (state) => state.pizza.status;
