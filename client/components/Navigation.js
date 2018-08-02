import React from 'react';
import { connect } from 'react-redux';
import history from '../history';
import { logout } from '../store';
import { Button, Icon, Menu, Segment, Sidebar } from 'semantic-ui-react';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { visible: false };
  }
  handleButtonClick = () => this.setState({ visible: !this.state.visible });
  handleSidebarHide = () => this.setState({ visible: false });
  render() {
    const handleClick = this.props.handleClick;
    return (
      <div>
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
            <Menu.Item as="a">
              <Icon name="home" />
              Home
            </Menu.Item>
            <Menu.Item as="a">
              <Icon name="gamepad" />
              Games
            </Menu.Item>
            <Menu.Item as="a">
              <Icon name="camera" />
              Channels
            </Menu.Item>
          </Sidebar>

          <Sidebar.Pusher dimmed={this.state.visible}>
            <Segment basic>
              <Menu>
                <Button onClick={this.handleButtonClick}>
                  Toggle visibility
                </Button>
                <Menu.Item
                  onClick={() => {
                    history.push(`/userhome`);
                  }}
                >
                  My Home
                </Menu.Item>
                <div className="right menu">
                  <Menu.Item onClick={handleClick}>Log Out</Menu.Item>
                </div>
              </Menu>
            </Segment>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </div>
    );
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout());
    }
  };
};

export default connect(null, mapDispatch)(App);
