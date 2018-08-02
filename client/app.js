import React from 'react';
import history from './history';
import { Icon, Menu, Segment, Sidebar } from 'semantic-ui-react';
import { Navigation } from './components';
import Routes from './routes';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { visible: false };
    this.handleMenuClick = this.handleMenuClick.bind(this);
  }
  handleMenuClick = () => this.setState({ visible: !this.state.visible });
  handleSidebarHide = () => this.setState({ visible: false });
  render() {
    return (
      <Sidebar.Pushable as={Segment}>
        <Sidebar
          as={Menu}
          animation="overlay"
          icon="labeled"
          inverted
          onHide={this.handleSidebarHide}
          vertical
          visible={this.state.visible}
          width="thin"
        >
          <Menu.Item
            onClick={() => {
              history.push('/');
              this.setState({ visible: false });
            }}
          >
            <Icon name="home" />
            Home
          </Menu.Item>
          <Menu.Item
            onClick={() => {
              history.push('/fridge');
              this.setState({ visible: false });
            }}
          >
            <Icon name="box" />
            My Fridge
          </Menu.Item>
          <Menu.Item
            onClick={() => {
              history.push('/myrecipes');
              this.setState({ visible: false });
            }}
          >
            <Icon name="book" />
            My Recipes
          </Menu.Item>
          <Menu.Item
            onClick={() => {
              history.push('/cookinghistory');
              this.setState({ visible: false });
            }}
          >
            <Icon name="archive" />
            My Cooking History
          </Menu.Item>
          <Menu.Item
            onClick={() => {
              history.push('/preferences');
              this.setState({ visible: false });
            }}
          >
            <Icon name="edit" />
            My Preferences
          </Menu.Item>
        </Sidebar>

        <Sidebar.Pusher dimmed={this.state.visible}>
          <Segment basic>
            <Navigation handleMenuClick={this.handleMenuClick} />
            <Routes />
          </Segment>
        </Sidebar.Pusher>
      </Sidebar.Pushable>
    );
  }
}

export default App;
