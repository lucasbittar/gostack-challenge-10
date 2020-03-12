import produce from 'immer';

const INITIAL_STATE = {
  saving: false,
  orders: [],
  ordersTotal: 0,
};

export default function order(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@order/FETCH_ALL_SUCCESS': {
        draft.orders = action.payload.rows;
        draft.ordersTotal = action.payload.count;
        break;
      }
      /*
      case '@order/FETCH_SUCCESS': {
        draft.product = action.payload.product;
        draft.deliveryman = action.payload.deliveryman_id;
        draft.recipient = action.payload.recipient_id;
        break;
      }
      case '@order/UPDATE_REQUEST': {
        draft.saving = true;
        break;
      }
      case '@order/UPDATE_SUCCESS': {
        draft.saving = false;
        break;
      }
      */
      default:
    }
  });
}
