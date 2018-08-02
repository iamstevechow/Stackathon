import React, { Component } from 'react';
import { SignIn, CreateAccount } from './index';
import { Menu, Segment } from 'semantic-ui-react';

class Auth extends Component {
  constructor() {
    super();
    this.state = { activeItem: 'Sign In' };
  }
  handleItemClick = (event, { name }) => this.setState({ activeItem: name });
  render() {
    return (
      <React.Fragment>
        <Menu attached="top" tabular>
          <Menu.Item
            name="Sign In"
            active={this.state.activeItem === 'Sign In'}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            name="Create an Account"
            active={this.state.activeItem === 'Create an Account'}
            onClick={this.handleItemClick}
          />
        </Menu>
        <Segment attached="bottom">
          {this.state.activeItem === 'Sign In' ? <SignIn /> : <CreateAccount />}
        </Segment>
      </React.Fragment>
    );
  }
}

export default Auth;
