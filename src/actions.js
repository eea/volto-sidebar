import { CHANGE_SIDEBAR_STATE } from './constants';

export function changeSidebarState(open) {
  return {
    type: CHANGE_SIDEBAR_STATE,
    open,
  };
}
