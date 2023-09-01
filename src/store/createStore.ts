import { Action, Reducer, Store } from '../types';

export function createStore<T, A>(
  reducer: Reducer<T, A>,
  initialState: T
): Store<T, A> {
  let state = initialState;
  const listeners: (() => void)[] = [];

  function getState() {
    return state;
  }

  function dispatch(action: Action<A>) {
    state = reducer(state, action);
    listeners.forEach((listener) => listener());
  }

  function subscribe(listener: () => void) {
    listeners.push(listener);

    return () => {
      const index = listeners.indexOf(listener);
      if (index !== -1) {
        listeners.splice(index, 1);
      }
    };
  }

  return { getState, dispatch, subscribe };
}
