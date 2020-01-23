import { CLONE_AS_TYPE } from '../constants';

const initialState = {
  error: null,
  items: {},
  loaded: false,
  loading: false,
};

/**
 * Mosaic Settings reducer.
 * @function mosaic_settings
 * @param {Object} state Current state.
 * @param {Object} action Action to be handled.
 * @returns {Object} New state.
 */
export default function mosaic_settings(state = initialState, action = {}) {
  switch (action.type) {
    case `${CLONE_AS_TYPE}_PENDING`:
      return {
        ...state,
        error: null,
        loaded: false,
        loading: true,
      };
    case `${CLONE_AS_TYPE}_SUCCESS`:
      return {
        ...state,
        error: null,
        items: action.result,
        loaded: true,
        loading: false,
      };
    case `${CLONE_AS_TYPE}_FAIL`:
      return {
        ...state,
        error: action.error,
        items: {},
        loaded: false,
        loading: false,
      };
    default:
      return state;
  }
}
