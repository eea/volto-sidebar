import addonRoutes from './routes.js';
import * as components from '@plone/volto/components';
import * as addonReducers from './reducers';

export function applyConfig(config) {
  return {
    ...config,
    addonRoutes: [...(config.addonRoutes || []), ...addonRoutes],
    addonReducers: {
      ...config.addonReducers,
      ...addonReducers,
    },
    editForms: {
      ...config.editForms,
      byLayout: {
        ...config.editForms?.byLayout,
      },
      byType: {
        ...config.editForms?.byType,
      },
      default: components.Form,
    },
  };
}
