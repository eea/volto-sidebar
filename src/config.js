import addonRoutes from './routes.js';
import * as components from '@plone/volto/components';

export function applyConfig(config) {
  return {
    ...config,
    addonRoutes: [...(config.addonRoutes || []), ...addonRoutes],
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
