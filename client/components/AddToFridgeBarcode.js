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
      results: []
    };
    this.scan = this.scan.bind(this);
    this.onDetected = this.onDetected.bind(this);
  }
  scan() {
    this.setState({ scanning: !this.state.scanning });
  }

  onDetected(result) {
    this.setState({ results: this.state.results.concat([result]) });
  }
  render() {
    return (
      <div>
        <button onClick={this.scan}>
          {this.state.scanning ? 'Stop Scanner' : 'Turn on Scanner'}
        </button>
        <ul className="results">
          {this.state.results.map(result => (
            <BarcodeResult key={result.codeResult.code} result={result} />
          ))}
        </ul>
        {this.state.scanning ? (
          <BarcodeScanner onDetected={this.onDetected} />
        ) : null}
      </div>
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
