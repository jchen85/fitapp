import { INCREMENT_COUNTER, DECREMENT_COUNTER, UPDATE_USER_INFO } from '../constants/ActionTypes';

export function increment() {
  return {
    type: INCREMENT_COUNTER
  };
}

export function decrement() {
  return {
    type: DECREMENT_COUNTER
  };
}

export function incrementIfOdd() {
  return (dispatch, getState) => {
    const { counter } = getState();

    if (counter % 2 === 0) {
      return;
    }

    dispatch(increment());
  };
}

export function fetchUserInfo() {
  return (dispatch) => {
    const request = new Request('/users/profile', {
      method: 'get'
    });

    return fetch(request, { credentials: 'include' })
    // credentials must be included because the /users/profile endpoint
    // requires you to be logged in and cookied
      .then(response => response.json())
      .then((json) => {
        dispatch({
          type: UPDATE_USER_INFO,
          userInfo: json
        });
      });
  };
};
