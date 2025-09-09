const savedBasket = localStorage.getItem("basket");

export const initialState = {
  basket: savedBasket ? JSON.parse(savedBasket) : [],
  user: null,
};

//selector
export const getBasketTotalPrice = (basket) =>
  basket?.reduce((amount, item) => item.price * item.quantity + amount, 0);

export const totalQuantity = (basket) =>
  basket?.reduce((quan, item) => item.quantity + quan, 0);

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_BASKET":
      const existingItem = state.basket.find(
        (item) => item.id === action.item.id
      );
      let newBasket;
      //console.log(existingItem);
      //console.log(action);
      if (existingItem) {
        // Update quantity of existing item
        //console.log(action.item.quantity);
        let quan = action.item.quantity + existingItem.quantity;
        newBasket = state.basket.map((item) =>
          item.id === action.item.id ? { ...item, quantity: quan } : item
        );
      } else {
        //  Add new item to basket
        newBasket = [
          ...state.basket,
          { ...action.item, quantity: action.item.quantity },
        ];
      }
      return {
        ...state,
        basket: newBasket,
      };
    case "REMOVE_FROM_BASKET":
      const index = state.basket.findIndex(
        (basketItem) => basketItem.id === action.id
      );
      let newBasket2 = [...state.basket];

      if (index >= 0) {
        newBasket2.splice(index, 1);
      } else {
        console.warn(
          `cant remove product (id: ${action.id}) as its not in basket!`
        );
      }
      return {
        ...state,
        basket: newBasket2,
      };
    case "SET_USER":
      return {
        ...state,
        user: action.user,
      };

    case "EMPTY_BASKET":
      localStorage.removeItem("basket"); // clear cart from storage
      return {
        ...state,
        basket: [],
      };
    case "UPDATE_QUANTITY":
      const matchingItem = state.basket.find(
        (item) => item.id === action.item.id
      );
      //console.log(action.item.quantity);
      let newBasket1;
      if (matchingItem) {
        let quan = action.item.quantity;
        newBasket1 = state.basket.map((item) =>
          item.id === action.item.id ? { ...item, quantity: quan } : item
        );
      }
      return {
        ...state,
        basket: newBasket1,
      };

    default:
      return state;
  }
};

export default reducer;
