import { Edit } from 'volto-sidebar/Edit';
import { Add } from 'volto-sidebar/Add';

const routes = [
  {
    path: '/add',
    component: Add,
  },
  {
    path: '/edit',
    component: Edit,
  },
  {
    path: '/**/add',
    component: Add,
  },
  {
    path: '*/**/edit',
    component: Edit,
  },
];

export default routes;
