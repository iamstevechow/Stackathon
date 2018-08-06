import React from 'react';
import { connect } from 'react-redux';
import { logout } from '../store';
import { Icon, Menu } from 'semantic-ui-react';

const Navigation = props => {
  const handleClick = props.handleClick;
  return props.isLoggedIn && props.hasFirstName ? (
    <Menu secondary>
      <Menu.Item onClick={props.handleMenuClick}>
        <Icon name="bars" />
      </Menu.Item>
      <h2 style={{ fontFamily: 'cursive' }}>
        <big>Sous</big>
      </h2>
      <div className="right menu">
        <Menu.Item onClick={handleClick}>Log Out</Menu.Item>
      </div>
    </Menu>
  ) : (
    <Menu secondary>
      <h2 style={{ fontFamily: 'cursive' }}>
        <big>Sous</big>
      </h2>
    </Menu>
  );
};

const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    hasFirstName: !!state.user.firstName
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
