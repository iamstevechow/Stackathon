import React from 'react';
import { connect } from 'react-redux';
import history from '../history';
import { addToFridge } from '../store/fridge';
import { fetchIngredients } from '../store/ingredients';
import { Checkbox, Dropdown, Button } from 'semantic-ui-react';

class AddToFridgeForm extends React.Component {
  constructor() {
    super();
    const today = new Date();
    this.state = {
      ingredientId: null,
      quantity: 1,
      expirationDate: today.getDate(),
      expirationMonth: today.getMonth(),
      expirationYear: today.getFullYear(),
      useDefaultDate: true
    };
  }
  componentDidMount() {
    this.props.fetchIngredients();
  }
  render() {
    const monthOptions = [
      { value: 0, text: 'January' },
      { value: 1, text: 'February' },
      { value: 2, text: 'March' },
      { value: 3, text: 'April' },
      { value: 4, text: 'May' },
      { value: 5, text: 'June' },
      { value: 6, text: 'July' },
      { value: 7, text: 'August' },
      { value: 8, text: 'September' },
      { value: 9, text: 'October' },
      { value: 10, text: 'November' },
      { value: 11, text: 'December' }
    ];
    const daysCalculator = (month, year) => {
      if (!month) return 31;
      switch (true) {
        case [0, 2, 4, 6, 7, 9, 11].includes(month):
          return 31;
        case [3, 5, 8, 10].includes(month):
          return 30;
        case [year % 4 === 0]:
          return 29;
        default:
          return 28;
      }
    };
    const dayArray = [];
    for (
      let i = 1;
      i <=
      daysCalculator(this.state.expirationMonth, this.state.expirationYear);
      i++
    ) {
      dayArray.push({ value: i, text: i });
    }
    return (
      <React.Fragment>
        <center style={{ marginBottom: '20px' }}>
          <h2>Add to Fridge</h2>
        </center>
        <form
          onSubmit={event => {
            const simplifyDate = date => {
              const day = date.getDate();
              const month = date.getMonth();
              const year = date.getFullYear();
              return new Date(year, month, day);
            };
            event.preventDefault();
            const today = new Date();
            const expiration = new Date(
              this.state.expirationYear,
              this.state.expirationMonth,
              this.state.expirationDate
            );
            this.state.useDefaultDate
              ? this.props.addToFridge({
                  userId: this.props.user.id,
                  ingredientId: this.state.ingredientId,
                  quantity: this.state.quantity
                })
              : this.props.addToFridge({
                  userId: this.props.user.id,
                  ingredientId: this.state.ingredientId,
                  quantity: this.state.quantity,
                  expirationTime: (expiration - simplifyDate(today)) / 86400000
                });
            history.push('/fridge');
          }}
        >
          <Dropdown
            placeholder="Select Ingredient"
            name="foodName"
            fluid
            search
            selection
            onChange={(event, { value }) => {
              this.setState({ ingredientId: value });
            }}
            options={this.props.ingredients.map(elem => ({
              value: elem.id,
              text: elem.name
            }))}
          />
          <Dropdown
            name="quantity"
            placeholder="Select Quantity"
            fluid
            selection
            onChange={(event, { value }) => {
              this.setState({ quantity: value });
            }}
            options={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(elem => ({
              value: elem,
              text: elem
            }))}
          />
          <Checkbox
            onChange={(event, { checked }) => {
              const today = new Date();
              this.setState({
                useDefaultDate: checked,
                expirationDate: today.getDate(),
                expirationMonth: today.getMonth(),
                expirationYear: today.getFullYear()
              });
            }}
            checked={this.state.useDefaultDate}
            label="Use Default Expiration"
          />
                    <Dropdown
            name="month"
            fluid
            disabled={this.state.useDefaultDate}
            onChange={(event, { value }) => {
              this.setState({ expirationMonth: value });
            }}
            placeholder="Select Month"
            defaultValue={this.state.expirationMonth}
            scrolling
            options={monthOptions}
          />
          <Dropdown
            name="day"
            fluid
            disabled={this.state.useDefaultDate}
            onChange={(event, { value }) => {
              this.setState({ expirationDate: value });
            }}
            placeholder="Select Date"
            defaultValue={this.state.expirationDate}
            scrolling
            options={dayArray}
          />
          <Dropdown
            name="year"
            fluid
            disabled={this.state.useDefaultDate}
            onChange={(event, { value }) => {
              this.setState({ expirationYear: value });
            }}
            placeholder="Select Year"
            defaultValue={this.state.expirationYear}
            scrolling
            options={[2018, 2019].map(elem => ({
              value: elem,
              text: elem
            }))}
          />
          <Button fluid type="submit">Submit</Button>
        </form>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
  ingredients: state.ingredients
});

const mapDispatchToProps = dispatch => ({
  addToFridge: info => dispatch(addToFridge(info)),
  fetchIngredients: () => dispatch(fetchIngredients())
});

export default connect(mapStateToProps, mapDispatchToProps)(AddToFridgeForm);
