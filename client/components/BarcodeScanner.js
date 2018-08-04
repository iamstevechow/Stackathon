import React from 'react';
import Quagga from 'quagga';

export default class BarcodeScanner extends React.Component {
  componentDidMount() {
    console.log('initialized');
    Quagga.init(
      {
        inputStream: {
          type: 'LiveStream',
          constraints: {
            facingMode: 'environment'
          }
        },
        locator: {
          patchSize: 'medium',
          halfSample: true
        },
        numOfWorkers: 2,
        decoder: {
          readers: [
            'code_128_reader',
            'ean_reader',
            'ean_8_reader',
            'code_39_reader',
            'code_39_vin_reader',
            'codabar_reader',
            'upc_reader',
            'upc_e_reader',
            'i2of5_reader'
          ]
        },
        locate: true
      },
      function(err) {
        if (err) {
          return console.log(err);
        }
        Quagga.start();
      }
    );
    Quagga.onDetected(result => {
      this.props.onDetected(result);
    });
  }
  componentWillUnmount() {
    Quagga.offDetected(result => {
      this.props.onDetected(result);
    });
  }
  render() {
    return <div id="interactive" className="viewport" />;
  }
}
