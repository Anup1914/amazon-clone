import React, { createContext, useContext, useReducer, useEffect } from "react";

//Prepare the datalayer
export const StateContext = createContext();

//Wrap our app and provide the data layer
export const StateProvider = ({ reducer, initialState, children }) => {
  /*
  const init = (initialState) => {
    const savedBasket = localStorage.getItem("basket");

    return {
      ...initialState,
      basket: savedBasket ? JSON.parse(savedBasket) : initialState.basket,
    };
  };
 */
  const [state, dispatch] = useReducer(reducer, initialState);

  // Save to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem("basket", JSON.stringify(state.basket));
  }, [state.basket]);

  return (
    <StateContext.Provider value={[state, dispatch]}>
      {children}
    </StateContext.Provider>
  );
};

//pool information from the data layer
export const useStateValue = () => useContext(StateContext);
