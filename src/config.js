import addonRoutes from './routes.js';
import * as addonReducers from './reducers';
import Form from './Form';

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
      default: Form,
    },
  };
}
