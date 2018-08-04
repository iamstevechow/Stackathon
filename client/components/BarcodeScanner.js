import React from 'react';
import Quagga from 'quagga';

export default class BarcodeScanner extends React.Component {
  componentDidMount() {
    Quagga.init(
      {
        inputStream: {
          type: 'LiveStream',
          constraints: {
            width: 640,
            height: 480,
            facingMode: 'environment'
          }
        },
        locator: {
          patchSize: 'medium',
          halfSample: true
        },
        numOfWorkers: 2,
        decoder: {
          readers: ['code_128_reader']
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
