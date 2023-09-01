import { createStore } from '../store/createStore';
import { Reducer, Store, Action } from '../types';

type ActionType = { type: 'INCREMENT' } | { type: 'DECREMENT' };

const initialState = 0;

function testReducer(state: typeof initialState, action: ActionType) {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1;
    case 'DECREMENT':
      return state - 1;
    default:
      return state;
  }
}

describe('createStore', () => {
  it('It should create a store with a initial state', () => {
    const initialState = 0;
    const store = createStore(testReducer, initialState);
    expect(store.getState()).toBe(initialState);
  });

  it('It should allow dispatch and update state', () => {
    const initialState = 0;

    const { getState, dispatch } = createStore(testReducer, initialState);

    dispatch({ type: 'INCREMENT' });
    expect(getState()).toBe(1);
  });

  it('It would allow subscribe and call listeners', () => {
    const initialState = 10;
    const { dispatch, subscribe } = createStore(testReducer, initialState);
    const listener = jest.fn();

    const unsubscribe = subscribe(listener);

    dispatch({ type: 'DECREMENT' });
    expect(listener).toHaveBeenCalledTimes(1);

    unsubscribe();
    dispatch({ type: 'DECREMENT' });
    expect(listener).toHaveBeenCalledTimes(1);
  });
});
