import { CHANGE_SIDEBAR_STATE } from './constants';

import { CLONE_AS_TYPE } from './constants';

export function changeSidebarState(open) {
  return {
    type: CHANGE_SIDEBAR_STATE,
    open,
  };
}

export function cloneAsType(path, typeName) {
  return {
    type: CLONE_AS_TYPE,
    request: {
      op: 'post',
      path: `${path}/@clone-as-type`,
      data: {
        typeName,
      },
    },
  };
}
