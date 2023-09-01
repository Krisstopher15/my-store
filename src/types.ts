type State = {
  [key: string]: any;
};

export type Action<T extends State> = {
  type: T;
  payload?: T;
};

export type Reducer<T, A> = (state: T, action: Action<A>) => T;

export type Store<T, A> = {
  getState: () => T;
  dispatch: (action: Action<A>) => void;
  subscribe: (listener: () => void) => () => void;
};
