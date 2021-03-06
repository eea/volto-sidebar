/**
 * Edit container.
 * @module components/manage/Edit/Edit
 *
 * Customization of default Edit form to allow pluggability of edit form
 * implementation and to refactor the sidebar behavior.
 */

import { Tab } from 'semantic-ui-react';
import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from '@plone/volto/helpers';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { defineMessages, injectIntl } from 'react-intl';
import { Button } from 'semantic-ui-react';
import { Portal } from 'react-portal';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import qs from 'query-string';

import { Icon, Toolbar } from '@plone/volto/components';
import { updateContent, getContent, getSchema } from '@plone/volto/actions';
import { getBaseUrl, hasBlocksData } from '@plone/volto/helpers';

import saveSVG from '@plone/volto/icons/save.svg';
import clearSVG from '@plone/volto/icons/clear.svg';

import { Sidebar } from '../Sidebar';
import { getEditForm } from 'volto-sidebar/helpers';
import Form from '@plone/volto/components/manage/Form/Form';

import '../style.css';
import Unauthorized from '@plone/volto/components/theme/Unauthorized/Unauthorized';

const messages = defineMessages({
  edit: {
    id: 'Edit {title}',
    defaultMessage: 'Edit {title}',
  },
  save: {
    id: 'Save',
    defaultMessage: 'Save',
  },
  cancel: {
    id: 'Cancel',
    defaultMessage: 'Cancel',
  },
  document: {
    id: 'Document',
    defaultMessage: 'Document',
  },
  block: {
    id: 'Block',
    defaultMessage: 'Block',
  },
});

/**
 * Edit class.
 * @class Edit
 * @extends Component
 */
class Edit extends Component {
  /**
   * Property types.
   * @property {Object} propTypes Property types.
   * @static
   */
  static propTypes = {
    updateContent: PropTypes.func.isRequired,
    getContent: PropTypes.func.isRequired,
    getSchema: PropTypes.func.isRequired,
    updateRequest: PropTypes.shape({
      loading: PropTypes.bool,
      loaded: PropTypes.bool,
    }).isRequired,
    schemaRequest: PropTypes.shape({
      loading: PropTypes.bool,
      loaded: PropTypes.bool,
    }).isRequired,
    getRequest: PropTypes.shape({
      loading: PropTypes.bool,
      loaded: PropTypes.bool,
    }).isRequired,
    pathname: PropTypes.string.isRequired,
    returnUrl: PropTypes.string,
    content: PropTypes.shape({
      '@type': PropTypes.string,
    }),
    schema: PropTypes.objectOf(PropTypes.any),
    objectActions: PropTypes.array,
  };

  /**
   * Default properties
   * @property {Object} defaultProps Default properties.
   * @static
   */
  static defaultProps = {
    schema: null,
    content: null,
    returnUrl: null,
  };

  /**
   * Constructor
   * @method constructor
   * @param {Object} props Component properties
   * @constructs EditComponent
   */
  constructor(props) {
    super(props);
    this.state = {
      visual: true,
      currentTab: 0,
    };
    this.onCancel = this.onCancel.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onTabChange = this.onTabChange.bind(this);
  }

  /**
   * Component did mount
   * @method componentDidMount
   * @returns {undefined}
   */
  componentDidMount() {
    this.props.getContent(getBaseUrl(this.props.pathname));
  }

  /**
   * Component will receive props
   * @method componentWillReceiveProps
   * @param {Object} nextProps Next properties
   * @returns {undefined}
   */
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (this.props.getRequest.loading && nextProps.getRequest.loaded) {
      this.props.getSchema(nextProps.content['@type']);
    }
    if (this.props.schemaRequest.loading && nextProps.schemaRequest.loaded) {
      if (!hasBlocksData(nextProps.schema.properties)) {
        this.setState({
          visual: false,
        });
      }
    }
    // Hack for make the Plone site editable by Volto Editor without checkings
    if (this.props.content && this.props.content['@type'] === 'Plone Site') {
      this.setState({
        visual: true,
      });
    }
    if (this.props.updateRequest.loading && nextProps.updateRequest.loaded) {
      this.props.history.push(
        this.props.returnUrl || getBaseUrl(this.props.pathname),
      );
    }
  }

  /**
   * Submit handler
   * @method onSubmit
   * @param {object} data Form data.
   * @returns {undefined}
   */
  onSubmit(data) {
    this.props.updateContent(getBaseUrl(this.props.pathname), data);
  }

  /**
   * Cancel handler
   * @method onCancel
   * @returns {undefined}
   */
  onCancel() {
    this.props.history.push(
      this.props.returnUrl || getBaseUrl(this.props.pathname),
    );
  }

  onTabChange(event, { activeIndex }) {
    this.setState({ currentTab: activeIndex });
  }

  form = React.createRef();

  /**
   * Render method.
   * @method render
   * @returns {string} Markup for the component.
   */
  render() {
    // This is an optimization so that we don't show a wrong form while we
    // haven't decided yet which form implementation to use
    const type = this.props?.content?.['@type'] || null;
    if (!type) return '';

    const FormImpl = getEditForm(this.props, 'edit') || Form;
    // <div id="sidebar-metadata">Metadata here</div>

    const editPermission = this.props.objectActions.find(({ id }) => id === 'edit');

    return (
      <div id="page-edit">
        {editPermission &&
          <Fragment>

            <Helmet
              title={
                this.props?.schema?.title
                  ? this.props.intl.formatMessage(messages.edit, {
                    title: this.props.schema.title,
                  })
                  : null
              }
            />
            {this.state.visual ? (
              <Tab
                menu={{
                  secondary: true,
                  pointing: true,
                  attached: true,
                  tabular: true,
                  className: 'formtabs',
                }}
                className="tabs-wrapper"
                renderActiveOnly={false}
                activeIndex={this.props.tab}
                onTabChange={this.onTabChange}
                panes={[
                  {
                    menuItem: 'Blocks',
                    pane: (
                      <Tab.Pane
                        key="visual"
                        className="tab-wrapper"
                        id="visual-form"
                      >
                        <FormImpl
                          ref={this.form}
                          inputRef={this.form}
                          schema={this.props.schema}
                          formData={this.props.content}
                          onSubmit={this.onSubmit}
                          hideActions
                          pathname={this.props.pathname}
                          visual={this.state.visual}
                          title={
                            this.props?.schema?.title
                              ? this.props.intl.formatMessage(messages.edit, {
                                title: this.props.schema.title,
                              })
                              : null
                          }
                          loading={this.props.updateRequest.loading}
                          mode="editform"
                        />
                      </Tab.Pane>
                    ),
                  },
                  {
                    menuItem: 'Metadata',
                    pane: (
                      <Tab.Pane
                        key="metadata"
                        className="tab-wrapper"
                        id="sidebar-metadata"
                      />
                    ),
                  },
                ]}
              />
            ) : (
                <FormImpl
                  ref={this.form}
                  inputRef={this.form}
                  schema={this.props.schema}
                  formData={this.props.content}
                  onSubmit={this.onSubmit}
                  hideActions
                  pathname={this.props.pathname}
                  visual={this.state.visual}
                  title={
                    this.props?.schema?.title
                      ? this.props.intl.formatMessage(messages.edit, {
                        title: this.props.schema.title,
                      })
                      : null
                  }
                  loading={this.props.updateRequest.loading}
                  mode="editform"
                />
              )}

            <Portal node={__CLIENT__ && document.getElementById('toolbar')}>
              <Toolbar
                pathname={this.props.pathname}
                hideDefaultViewButtons
                inner={
                  <>
                    <Button
                      id="toolbar-save"
                      className="save"
                      aria-label={this.props.intl.formatMessage(messages.save)}
                      onClick={() => this.form.current.onSubmit()}
                      disabled={this.props.updateRequest.loading}
                      loading={this.props.updateRequest.loading}
                    >
                      <Icon
                        name={saveSVG}
                        className="circled"
                        size="30px"
                        title={this.props.intl.formatMessage(messages.save)}
                      />
                    </Button>
                    <Button
                      className="cancel"
                      aria-label={this.props.intl.formatMessage(messages.cancel)}
                      onClick={() => this.onCancel()}
                    >
                      <Icon
                        name={clearSVG}
                        className="circled"
                        size="30px"
                        title={this.props.intl.formatMessage(messages.cancel)}
                      />
                    </Button>
                  </>
                }
              />
            </Portal>
            {this.state.visual && this.state.currentTab === 0 && (
              <Portal node={__CLIENT__ && document.getElementById('sidebar')}>
                <Sidebar />
              </Portal>
            )}
          </Fragment>
        }
        {!editPermission &&
          <Unauthorized />
        }
      </div>
    );
  }
}

export default compose(
  DragDropContext(HTML5Backend),
  injectIntl,
  connect(
    (state, props) => ({
      objectActions: state.actions.actions.object,
      content: state.content.data,
      schema: state.schema.schema,
      getRequest: state.content.get,
      schemaRequest: state.schema,
      updateRequest: state.content.update,
      pathname: props.location.pathname,
      returnUrl: qs.parse(props.location.search).return_url,
    }),
    {
      updateContent,
      getContent,
      getSchema,
    },
  ),
)(Edit);
