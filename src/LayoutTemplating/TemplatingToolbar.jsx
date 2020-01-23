import React, { useState } from 'react';
import BlocksLayoutEditor from './BlocksLayoutEditor';
import { Button, Modal, Segment } from 'semantic-ui-react';
import { BodyClass } from '@plone/volto/helpers';
import { Icon as VoltoIcon, Field } from '@plone/volto/components';
import penIcon from '@plone/volto/icons/pen.svg';
import clearIcon from '@plone/volto/icons/clear.svg';
import { connect } from 'react-redux';
import { cloneAsType } from '../actions';
import { getBaseUrl } from '@plone/volto/helpers';

const description = `Saving this as a clonable template will create a new content
type with the provided name.`;

const CreateTemplateDialog = ({ onSave, onClose }) => {
  const [typeName, setTypeName] = useState(null);

  return (
    <Modal className="dialog-modal" open={true}>
      <BodyClass className="mosaic-page-modal-open" />
      <Modal.Content scrolling>
        <Field
          type="text"
          id="contenttype-title"
          title="Name of template"
          description={description}
          onChange={(id, value) => setTypeName(value)}
          value={typeName}
        />
      </Modal.Content>

      <Modal.Actions>
        <Button.Group floated="right">
          <Button basic circular primary onClick={() => onSave(typeName)}>
            <VoltoIcon name={penIcon} className="circled" />
          </Button>
          <Button basic circular secondary size="big" onClick={onClose}>
            <VoltoIcon name={clearIcon} className="circled" />
          </Button>
        </Button.Group>
      </Modal.Actions>
    </Modal>
  );
};

const Toolbar = ({ formData, onSave, cloneAsType, ...props }) => {
  const [showImportExport, setShowImportExport] = useState(false);
  const [showCreateTemplate, setShowCreateTemplate] = useState(false);

  console.log('props', props, showCreateTemplate);

  return (
    <Segment.Group>
      <Segment>
        <div className="import-export-blockdata">
          <Button size="mini" onClick={() => setShowImportExport(true)}>
            Import/Export layout and blocks
          </Button>

          {props.location && props.mode === 'editform' && (
            <Button size="mini" onClick={() => setShowCreateTemplate(true)}>
              Save as clonable template
            </Button>
          )}

          {showImportExport && (
            <BlocksLayoutEditor
              value={{
                blocks: formData?.blocks || {},
                blocks_layout: formData?.blocks_layout || {},
              }}
              onSave={formData => {
                onSave(formData);
                setShowImportExport(false);
              }}
              onClose={() => setShowImportExport(false)}
            />
          )}

          {showCreateTemplate && (
            <CreateTemplateDialog
              onSave={typeName => {
                cloneAsType(props.location, typeName);
              }}
              onClose={() => setShowCreateTemplate(false)}
            />
          )}
        </div>
      </Segment>
    </Segment.Group>
  );
};

export default connect(
  (state, props) => {
    return {
      location: getBaseUrl(state.router.location?.pathname || ''),
    };
  },
  { cloneAsType },
)(Toolbar, { forwardRef: true });
