// createContext instantiates a new Context object. it creates container to hold 
// global state data and functionality and provides it throughout the app!
// useContext is a Hook allowing to use  state created from the createContext 
import React, { createContext, useContext } from 'react';
import { useProductReducer } from './reducers';


// instantiate the global state object:
// createContext() creates a new Context object
const StoreContext = createContext();
// Provider is component that wraps application in to make the state data 
// that's passed into it as a prop available to all other components.
const { Provider } = StoreContext;
// Consumer grabs and uses the data that the Provider holds


const StoreProvider = ({ value = [], ...props }) => {
    // instantiate initial global state with useProductReducer(). Because that 
    // wraps it around the useReducer() Hook, every time  useProductReducer() is ran 
    // receive state - most up-to-date version of global state object
    // and dispatch - method to update our state. it looks for an action object
    // passed in as its argument.
    const [state, dispatch] = useProductReducer({
        products: [],
        cart: [],
        cartOpen: false,
        categories: [],
        currentCategory: '',
    });
    // confirm it works
    console.log(state);
    // return StoreContext's <Provider> with state object and dispatch
    // the function provided as data for the value prop.
    return <Provider value={[state, dispatch]} {...props} />;
    // The value prop is good to have included, it opens up to pass in more
    // data for state if needed.
    // The other prop, ...props, is to handle any other props the user may need.
    // we'll need to use props.children, as this <StoreProvider> component will 
    // wrap all of our other components, making them children of it. If we 
    // didn't include {...props} in our returning <Provider> component, 
    // nothing on the page would be rendered!
};

// created custom React Hook
// When execute this function from within a component, receive [state, dispatch] 
// data StoreProvider provider manages. any component that has access to 
// StoreProvider component can use any data in global state container or update 
// it using the dispatch function.
const useStoreContext = () => {
    return useContext(StoreContext);
}

// export both our StoreProvider and useStoreContext() functionality.
export { StoreProvider, useStoreContext };