import React from 'react';
import { connect } from 'react-redux';
import history from '../history';
import { addToFridge } from '../store/fridge';
import { addImage } from '../store/image';
import { fetchIngredients } from '../store/ingredients';
import { Checkbox, Dropdown, Button } from 'semantic-ui-react';
import Camera from 'react-camera';
import ImageCompressor from 'image-compressor.js';

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

const style = {
  preview: {
    position: 'relative'
  },
  captureContainer: {
    display: 'flex',
    position: 'absolute',
    justifyContent: 'center',
    zIndex: 1,
    bottom: 0,
    width: '100%'
  },
  captureButton: {
    backgroundColor: '#fff',
    borderRadius: '50%',
    height: 56,
    width: 56,
    color: '#000',
    margin: 20
  },
  captureImage: {
    width: '100%'
  }
};

class AddToFridgeImage extends React.Component {
  constructor() {
    super();
    const today = new Date();
    this.state = {
      ingredientId: null,
      quantity: 1,
      expirationDate: today.getDate(),
      expirationMonth: today.getMonth(),
      expirationYear: today.getFullYear(),
      useDefaultDate: true,
      imgSrc: ''
    };
    this.takePicture = this.takePicture.bind(this);
  }
  componentDidMount() {
    this.props.fetchIngredients();
  }
  async takePicture() {
    const blob = await this.camera.capture();
    const compression = new ImageCompressor(blob, {
      quality: 0.1,
      success: async result => {
        const imgSrc = await URL.createObjectURL(result);
        await this.props.addImage(imgSrc);
      },
      error(e) {
        console.log(e.message);
      }
    });
    const imgSrc = await URL.createObjectURL(blob);
    this.img.src = imgSrc;
    this.setState({ imgSrc: imgSrc });
    this.img.onload = () => {
      URL.revokeObjectURL(this.src);
    };
  }
  render() {
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
        <Camera
          style={style.preview}
          ref={cam => {
            this.camera = cam;
          }}
        >
          <div style={style.captureContainer} onClick={this.takePicture}>
            <div style={style.captureButton} />
          </div>
        </Camera>
        <img
          id="blobImg"
          style={style.captureImage}
          ref={img => {
            this.img = img;
          }}
        />
        {this.state.text ? (
          <h4>
            {this.state.text !== 'Unrecognized. Please try again'
              ? `You said ${this.state.text}`
              : 'Unrecognized. Please try again'}
          </h4>
        ) : null}
        {this.state.dateRequest ? <h4>{this.state.dateRequest}</h4> : null}
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
            value={this.state.expirationMonth}
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
            value={this.state.expirationDate}
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
          <Button fluid type="submit">
            Submit
          </Button>
        </form>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
  ingredients: state.ingredients || [],
  image: state.image
});

const mapDispatchToProps = dispatch => ({
  addToFridge: info => dispatch(addToFridge(info)),
  addImage: img => dispatch(addImage(img)),
  fetchIngredients: () => dispatch(fetchIngredients())
});

export default connect(mapStateToProps, mapDispatchToProps)(AddToFridgeImage);
