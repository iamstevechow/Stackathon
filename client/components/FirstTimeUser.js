import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Input, Dropdown } from 'semantic-ui-react';
import { updateUser } from '../store/user';
import { fetchIngredients } from '../store/ingredients';

class FirstTimeUser extends Component {
  constructor() {
    super();
    this.state = {
      firstName: '',
      lastName: ''
    };
  }
  componentDidMount() {
    this.props.fetchIngredients();
  }
  render() {
    return (
      <React.Fragment>
        {this.props.user.firstName ? (
          <center style={{ marginBottom: '20px' }}>
            <h2>Edit your Preferences</h2>
          </center>
        ) : (
          <center style={{ marginBottom: '20px' }}>
            <h2>Welcome to Sous</h2>
          </center>
        )}
        <form
          onSubmit={event => {
            event.preventDefault();
            this.props.updateUser({
              firstName: this.state.firstName,
              lastName: this.state.lastName,
              id: this.props.user.id
            });
          }}
        >
          <Input
            onChange={(event, { value }) => {
              this.setState({ firstName: value });
            }}
            fluid
            placeholder="First Name"
          />
          <Input
            onChange={(event, { value }) => {
              this.setState({ lastName: value });
            }}
            fluid
            placeholder="Last Name"
          />
          <Dropdown
            allowAdditions
            search
            placeholder="Likes"
            fluid
            multiple
            selection
            options={this.props.ingredients.map(elem => ({
              value: elem.name,
              text: elem.name
            }))}
          />
          <Dropdown
            allowAdditions
            search
            placeholder="Dislikes"
            fluid
            multiple
            selection
            options={this.props.ingredients.map(elem => ({
              value: elem.name,
              text: elem.name
            }))}
          />
          <Dropdown
            allowAdditions
            search
            placeholder="Allergies"
            fluid
            multiple
            selection
            options={this.props.ingredients.map(elem => ({
              value: elem.name,
              text: elem.name
            }))}
          />
          <Button fluid color="green" type="submit">
            Continue
          </Button>
        </form>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user || {},
  ingredients: state.ingredients || []
});

const mapDispatchToProps = dispatch => ({
  updateUser: info => dispatch(updateUser(info)),
  fetchIngredients: () => dispatch(fetchIngredients())
});

export default connect(mapStateToProps, mapDispatchToProps)(FirstTimeUser);
