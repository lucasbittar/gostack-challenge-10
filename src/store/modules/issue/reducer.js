import produce from 'immer';

const INITIAL_STATE = {
  saving: false,
  success: false,
  issues: [],
  issuesTotal: 0,
};

export default function issue(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@issue/FETCH_ALL_SUCCESS': {
        draft.issues = action.payload.rows;
        draft.issuesTotal = action.payload.count;
        break;
      }
      case '@issue/CREATE_REQUEST': {
        draft.saving = true;
        break;
      }
      case '@issue/CREATE_SUCCESS': {
        draft.saving = false;
        draft.success = true;
        break;
      }
      default:
    }
  });
}
