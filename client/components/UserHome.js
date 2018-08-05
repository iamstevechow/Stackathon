import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Card } from 'semantic-ui-react';
import history from '../history';

export const UserHome = props => {
  const { user } = props;
  return (
    <React.Fragment>
      <center style={{ marginBottom: '20px' }}>
        <h3
          style={{
            marginTop: '0',
            marginBottom: '10px'
          }}
        >
          Welcome back, {user.firstName}
        </h3>
      </center>
      <Card.Group style={{ height: '40vh' }}>
        <Card
          style={{ height: '10vh' }}
          onClick={() => {
            history.push('/fridge');
          }}
          fluid
          color="red"
          header="Check out my Fridge"
        />
        <Card
          style={{ height: '10vh' }}
          onClick={() => {
            history.push('/newrecipes');
          }}
          fluid
          color="orange"
          header="Give me a Recipe"
        />
        <Card
          style={{ height: '10vh' }}
          onClick={() => {
            history.push('/myrecipes');
          }}
          fluid
          color="yellow"
          header="My Saved Recipes"
        />
      </Card.Group>
      <Card.Group style={{ height: '20vh' }} itemsPerRow={2}>
        <Card
          onClick={() => {
            history.push('/cookinghistory');
          }}
          fluid
          color="green"
          header="Cooking History"
        />
        <Card
          onClick={() => {
            history.push('/preferences');
          }}
          fluid
          color="blue"
          header="Edit my Preferences"
        />
      </Card.Group>
    </React.Fragment>
  );
};

const mapState = state => {
  return {
    user: state.user
  };
};

export default connect(mapState)(UserHome);

UserHome.propTypes = {
  email: PropTypes.string
};
