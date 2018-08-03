import React from 'react';
import { connect } from 'react-redux';
import history from '../history';
import { addToFridge } from '../store/fridge';
import { fetchIngredients } from '../store/ingredients';
import { Checkbox, Dropdown, Button } from 'semantic-ui-react';
import Quagga from 'quagga';

class AddToFridgeBarcode extends React.Component {
  constructor() {
    super();
    this.state = { running: false };
    this.changeScanState = this.changeScanState.bind(this);
    this.startScanner = this.startScanner.bind(this);
    this.errorHandle = this.errorHandle.bind(this);
  }
  errorHandle(err) {
    if (err) {
      console.log(err);
      return;
    }

    console.log('Initialization finished. Ready to start');
    Quagga.start();
    this.setState({ running: true });
  }
  startScanner() {
    navigator.mediaDevices
      .getUserMedia({
        video: true
      })
      .then(function(stream) {
        var videoTracks = stream.getVideoTracks();
        console.log('Got stream with constraints');
        console.log('Using video device: ' + videoTracks[0].label);
        stream.onremovetrack = function() {
          console.log('Stream ended');
        };
        window.stream = stream; // make variable available to browser console
        document.querySelector('#scanner-container').srcObject = stream;
      })
      .catch(function(err) {
        console.log(err);
      });
    Quagga.init(
      {
        inputStream: {
          name: 'Live',
          type: 'LiveStream',
          target: document.querySelector('#scanner-container'),
          constraints: {
            width: 480,
            height: 320,
            facingMode: 'environment'
          }
        },
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
          ],
          debug: {
            showCanvas: true,
            showPatches: true,
            showFoundPatches: true,
            showSkeleton: true,
            showLabels: true,
            showPatchLabels: true,
            showRemainingPatchLabels: true,
            boxFromPatches: {
              showTransformed: true,
              showTransformedBox: true,
              showBB: true
            }
          }
        }
      },
      this.errorHandle
    );

    Quagga.onProcessed(function(result) {
      var drawingCtx = Quagga.canvas.ctx.overlay,
        drawingCanvas = Quagga.canvas.dom.overlay;

      if (result) {
        if (result.boxes) {
          drawingCtx.clearRect(
            0,
            0,
            parseInt(drawingCanvas.getAttribute('width')),
            parseInt(drawingCanvas.getAttribute('height'))
          );
          result.boxes
            .filter(function(box) {
              return box !== result.box;
            })
            .forEach(function(box) {
              Quagga.ImageDebug.drawPath(box, { x: 0, y: 1 }, drawingCtx, {
                color: 'green',
                lineWidth: 2
              });
            });
        }

        if (result.box) {
          Quagga.ImageDebug.drawPath(result.box, { x: 0, y: 1 }, drawingCtx, {
            color: '#00F',
            lineWidth: 2
          });
        }

        if (result.codeResult && result.codeResult.code) {
          Quagga.ImageDebug.drawPath(
            result.line,
            { x: 'x', y: 'y' },
            drawingCtx,
            { color: 'red', lineWidth: 3 }
          );
        }
      }
    });

    Quagga.onDetected(function(result) {
      console.log(
        'Barcode detected and processed : [' + result.codeResult.code + ']',
        result
      );
    });
  }

  changeScanState() {
    if (this.state.running) {
      this.setState({ running: false });
      Quagga.stop();
    } else {
      this.startScanner();
    }
  }

  render() {
    return (
      <React.Fragment>
        <div id="scanner-container" />
        <Button
          type="submit"
          onClick={this.changeScanState}
          value="Start/Stop the scanner"
        />
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
