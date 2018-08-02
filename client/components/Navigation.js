import React from 'react';
import { connect } from 'react-redux';
import { logout } from '../store';
import { Icon, Menu } from 'semantic-ui-react';

const Navigation = props => {
  const handleClick = props.handleClick;
  return props.isLoggedIn ? (
    <Menu>
      <Menu.Item onClick={props.handleMenuClick}>
        <Icon name="bars" />
      </Menu.Item>
      <div className="right menu">
        <Menu.Item onClick={handleClick}>Log Out</Menu.Item>
      </div>
    </Menu>
  ) : null;
};

const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  };
};

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout());
    }
  };
};

export default connect(mapState, mapDispatch)(Navigation);
