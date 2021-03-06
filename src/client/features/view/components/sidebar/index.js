const React = require('react');
const h = require('react-hyperscript');
const classNames = require('classnames');

const IconButton = require('../../../../common/iconButton');

const HelpMenu = require('./menus/help');
const FileDownloadMenu = require('./menus/fileDownload');
const GraphInfoMenu = require('./menus/graphInfoMenu');
const historyMenu = require('./menus/historyMenu');

/* Props
- cy
- uri
- name
- datasource
- comments
*/

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      activeMenu: ''
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.activeMenu === '') {
      this.setState({
        open: false,
        activeMenu: nextProps.activeMenu
      });
    } else {
      this.setState({
        open: true,
        activeMenu: nextProps.activeMenu
      });
    }
  }

  render() {
    const props = this.props;
    const menus = {
      info: h(GraphInfoMenu, {
        uri: props.uri,
        name: props.name,
        datasource: props.datasource,
        comments: props.comments }),
      file_download: h(FileDownloadMenu, {
        cy: props.cy,
        uri: props.uri,
        name: props.name }),
      help: h(HelpMenu),
      history: h(historyMenu, {
        uri: props.uri,
        name: props.name,
        datasource: props.datasource,
        comments: props.comments,
        changeLayout: props.changeLayout,
        cy: props.cy,
        admin: props.admin
      }),
    };

    return (
      h('div', {
        className: classNames('sidebar-menu', { 'sidebar-menu-open': this.state.open }),
        ref: dom => this.sidebarContainer = dom
      }, [
          h('div', {
            className: classNames('sidebar-close-button-container', { 'sidebar-close-button-container-open': this.state.open })
          }, [
              h(IconButton, {
                icon: 'close',
                onClick: () => this.props.changeMenu(''),
                desc: 'Close the sidebar'
              })
            ]),
          h('div.sidebar-content', {
            ref: dom => this.sidebarDOM = dom
          }, [
              h('div.sidebar-resize', {
                ref: dom => this.sidebarResizerDOM = dom
              }),
              h('div.sidebar-text', [
                menus[this.state.activeMenu]
              ])
            ])
        ])
    );
  }
}

module.exports = Sidebar;
