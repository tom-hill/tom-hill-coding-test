import * as Type from '../constants';

const initialState = {
  loading: true,
  slowConnection: false,
  error: false,
  errorMessage: null,
};

export default function globalStateReducer(state = initialState, action) {
  switch (action.type) {
    case Type.APP_INITIALISED:
    case Type.NEW_LINEUPS_RECEIVED:
      return Object.assign({}, initialState, {
        loading: false,
      });

    case Type.SLOW_CONNECTION:
      return Object.assign({}, state, {
        loading: true,
        slowConnection: true,
      });

    case Type.APP_INITIALISATION_ERROR:
      return Object.assign({}, initialState, {
        loading: false,
        error: true,
        errorMessage: action.error,
      });

    default:
      return state;
  }
}
