export function orderFetchAllRequest(data) {
  return {
    type: '@order/FETCH_ALL_REQUEST',
    payload: {...data},
  };
}

export function orderFetchAllSuccess(data) {
  return {
    type: '@order/FETCH_ALL_SUCCESS',
    payload: {...data},
  };
}

export function orderFetchAllFailure() {
  return {
    type: '@order/FETCH_ALL_FAILURE',
  };
}

export function orderFetchRequest(id) {
  return {
    type: '@order/FETCH_REQUEST',
    payload: {id},
  };
}

export function orderFetchSuccess(data) {
  return {
    type: '@order/FETCH_SUCCESS',
    payload: {...data},
  };
}

export function orderFetchFailure() {
  return {
    type: '@order/FETCH_FAILURE',
  };
}

export function orderUpdateRequest(id, data) {
  return {
    type: '@order/UPDATE_REQUEST',
    payload: {id, ...data},
  };
}

export function orderUpdateSuccess(id, data) {
  return {
    type: '@order/UPDATE_SUCCESS',
    payload: {id, ...data},
  };
}

export function orderUpdateFailure() {
  return {
    type: '@order/UPDATE_FAILURE',
  };
}
