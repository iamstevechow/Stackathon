import React from 'react';
import { connect } from 'react-redux';
import history from '../history';
import { addToFridge } from '../store/fridge';
import { fetchIngredients } from '../store/ingredients';
import BarcodeScanner from './BarcodeScanner';
import BarcodeResult from './BarcodeResult';

class AddToFridgeBarcode extends React.Component {
  constructor() {
    super();
    this.state = {
      scanning: false,
      results: { codeResult: {} }
    };
    this.scan = this.scan.bind(this);
    this.onDetected = this.onDetected.bind(this);
  }
  scan() {
    this.setState({ scanning: !this.state.scanning });
  }
  onDetected(result) {
    this.setState({ results: result });
  }
  render() {
    return (
      <React.Fragment>
        <center style={{ marginBottom: '20px' }}>
          <h2>Add to Fridge</h2>
        </center>
        <button onClick={this.scan}>
          {this.state.scanning ? 'Stop Scanner' : 'Turn on Scanner'}
        </button>

        <BarcodeResult result={this.state.results} />

        {this.state.scanning ? (
          <BarcodeScanner onDetected={this.onDetected} />
        ) : null}
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

export default connect(mapStateToProps, mapDispatchToProps)(AddToFridgeBarcode);
