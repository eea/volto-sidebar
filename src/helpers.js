import { editForms } from '~/config';

export function getEditForm(props) {
  const impl =
    editForms.byLayout[props.content.layout] ||
    editForms.byType[props.content['@type']] ||
    editForms.default;

  return impl;
}
