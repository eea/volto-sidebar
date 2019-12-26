import { Edit } from 'volto-sidebar/Edit';

const routes = [
  {
    path: '/edit',
    component: Edit,
  },
  {
    path: '*/**/edit',
    component: Edit,
  },
];

export default routes;
