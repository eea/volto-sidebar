import React from 'react';
import MosaicView from 'volto-mosaic/components/theme/View';
import DefaultView from '@plone/volto/components/theme/View/DefaultView';

export default ({ content, ...props }) => {
  return content?.cloned_blocks_layout?.mosaic_layout ? (
    <MosaicView
      content={{
        ...content,
        blocks: content.cloned_blocks,
        blocks_layout: content.cloned_blocks_layout,
      }}
      {...props}
    />
  ) : (
    <DefaultView
      content={{
        ...content,
        blocks: content.cloned_blocks,
        blocks_layout: content.cloned_blocks_layout,
      }}
      {...props}
    />
  );
};
