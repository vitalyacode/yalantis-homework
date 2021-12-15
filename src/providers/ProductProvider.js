import React, { createContext, useReducer, useContext } from 'react';

const StateContext = createContext();
const DispatchContext = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_PRODUCT': {
      const productToChange = state.products.find(
        (p) => p.id === action.payload.id
      );
      if (productToChange) {
        return {
          ...state,
          products: state.products.map((p) => (p.id === productToChange.id
            ? { ...productToChange, quantity: productToChange.quantity + 1 }
            : p)),
          quantity: state.quantity + 1,
        };
      }
      const productToAdd = { ...action.payload, quantity: 1 };
      return {
        ...state,
        products: state.products.concat(productToAdd),
        quantity: state.quantity + 1,
      };
    }
    default:
      return state;
  }
};

const defaultState = {
  products: [],
  quantity: 0,
};
const ProductProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, defaultState);
  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        {children}
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
};

export const useProductState = () => {
  const context = useContext(StateContext);
  if (!context) throw new Error('useProductState must be within ProductProvider');
  return context;
};

export const useProductDispatch = () => {
  const context = useContext(DispatchContext);
  if (!context) throw new Error('useProductDispatch must be within ProductProvider');
  return context;
};

export default ProductProvider;
