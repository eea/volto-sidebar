import addonRoutes from './routes.js';
import * as addonReducers from './reducers';
import Form from './Form';
import ClonedBlocksView from './ClonedBlocksView';

export function applyConfig(config) {
  return {
    ...config,
    views: {
      ...config.views,
      layoutViews: {
        ...config.views.layoutViews,
        cloned_blocks_view: ClonedBlocksView,
      },
    },
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
