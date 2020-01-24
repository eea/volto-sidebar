import React from 'react';
import MosaicView from 'volto-mosaic/components/theme/View';
import DefaultView from '@plone/volto/components/theme/View/DefaultView';

export default ({ content, ...props }) => {
  const useMosaic = content?.cloned_blocks_layout?.mosaic_layout ? true : false;
  console.log('useMosaic', useMosaic, content, props);
  return useMosaic ? (
    <div id="mosaic-view">
      <MosaicView {...props} />
    </div>
  ) : (
    <DefaultView content={content} {...props} />
  );
};

// content={{
//   ...content,
//   blocks: content.cloned_blocks,
//   blocks_layout: content.cloned_blocks_layout,
// }}
