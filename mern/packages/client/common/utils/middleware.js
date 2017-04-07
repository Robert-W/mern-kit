/**
* @description styles for console logs in the client
*/
const styles = {
  action: 'font-weight:bold;font-size:1.1em;',
  state: 'color:blue;'
};

/**
* @name thunk
* Thunk middleware to support async actions
* @description Look at the action, if the actions is a function, give it the dispatcher,
* if it is not a function, pass the action to the next middleware.
* @return {Function}
*/
export const thunk = store => next => action => {
  return typeof action === 'function'
    ? action(store.dispatch)
    : next(action);
};

/**
* @name logger
* @description Log each action and the state after the action is invoked
* @return {Object} - result of the action
*/
export const logger = store => next => action => {
  const result = next(action);
  console.log(`%c ${action.type}: `, styles.action, action);
  console.log('%c next state', styles.state, store.getState());
  return result;
};
