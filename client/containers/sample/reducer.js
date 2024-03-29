import { createReducer } from 'common/dist/client/utils/reduxUtil';

import { SET_MODULE_STATE } from './action';

const reducer = createReducer(
  {},
  {
    [SET_MODULE_STATE]: (state, { payload }) => ({
      ...state,
      ...payload
    })
  }
);
export default reducer;
