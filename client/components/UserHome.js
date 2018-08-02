import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Card } from 'semantic-ui-react';
import history from '../history';

export const UserHome = props => {
  const { email } = props;
  return (
    <React.Fragment>
      <center>
        <h3>Welcome, {email}</h3>
      </center>
      <Card.Group>
        <Card
          onClick={() => {
            history.push('/fridge');
          }}
          fluid
          color="red"
          header="Check out my Fridge"
        />
        <Card
          onClick={() => {
            history.push('/recipes');
          }}
          fluid
          color="orange"
          header="Give me a Recipe"
        />
        <Card
          onClick={() => {
            history.push('/myrecipes');
          }}
          fluid
          color="yellow"
          header="My Saved Recipes"
        />
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
    email: state.user.email
  };
};

export default connect(mapState)(UserHome);

UserHome.propTypes = {
  email: PropTypes.string
};
