import { editForms } from '~/config';
// import { hasBlocksData } from '@plone/volto';
// getDefaultFromSchema(props, type) ||

function getByType(props, type) {
  let res;
  switch (type) {
    case 'edit':
      res = props.content['@type'];
      break;
    case 'add':
      res = props.type;
      break;
    default:
      res = props.content['@type'];
  }
  return editForms.byType[res];
}

function getByLayout(props, type) {
  return type === 'edit' ? editForms.byLayout[props.content.layout] : null;
}

export function getEditForm(props, type = 'edit') {
  const impl =
    getByLayout(props, type) || getByType(props, type) || editForms.default;

  return impl;
}
