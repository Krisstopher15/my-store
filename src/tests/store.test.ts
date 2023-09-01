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
    const store: Store<number, string> = createStore(testReducer, initialState);
    expect(store.getState()).toBe(initialState);
  });
});
