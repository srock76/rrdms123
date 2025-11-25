import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { AppState, Action, SiteConfig } from './types';
import { INITIAL_STATE } from './constants';

const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<Action>;
}>({
  state: INITIAL_STATE,
  dispatch: () => null,
});

const appReducer = (state: AppState, action: Action): AppState => {
  switch (action.type) {
    case 'UPDATE_CONFIG':
      return { ...state, config: { ...state.config, ...action.payload } };
    case 'ADD_LEAD':
      return { ...state, leads: [action.payload, ...state.leads] };
    case 'UPDATE_LEAD_STATUS':
      return {
        ...state,
        leads: state.leads.map((l) =>
          l.id === action.payload.id ? { ...l, status: action.payload.status } : l
        ),
      };
    case 'ADD_POST':
      return { ...state, posts: [action.payload, ...state.posts] };
    case 'UPDATE_POST':
      return {
        ...state,
        posts: state.posts.map((p) => (p.id === action.payload.id ? action.payload : p)),
      };
    case 'DELETE_POST':
      return { ...state, posts: state.posts.filter((p) => p.id !== action.payload) };
    case 'UPDATE_SERVICE':
      return {
        ...state,
        services: state.services.map((s) => (s.id === action.payload.id ? action.payload : s)),
      };
    default:
      return state;
  }
};

export const AppProvider = ({ children }: { children: ReactNode }) => {
  // Load from local storage if available
  const localData = localStorage.getItem('rrdms_state');
  const initialState = localData ? JSON.parse(localData) : INITIAL_STATE;

  const [state, dispatch] = useReducer(appReducer, initialState);

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('rrdms_state', JSON.stringify(state));
  }, [state]);

  // Apply CSS Variables for theming
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--primary', state.config.primaryColor);
    root.style.setProperty('--secondary', state.config.secondaryColor);
  }, [state.config.primaryColor, state.config.secondaryColor]);

  return <AppContext.Provider value={{ state, dispatch }}>{children}</AppContext.Provider>;
};

export const useApp = () => useContext(AppContext);
