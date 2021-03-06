import React from 'react';
import { connect } from 'react-redux';
import history from '../history';
import { addToFridge } from '../store/fridge';
import { fetchIngredients } from '../store/ingredients';
import {
  Checkbox,
  Dropdown,
  Button,
  Modal,
  Header,
  Icon
} from 'semantic-ui-react';
import pluralize from 'pluralize';

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

let recognition

export const setUpSpeech = () => {
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();
  recognition.onstart = function() {
    console.log(
      'Voice recognition activated. Try speaking into the microphone.'
    );
  };

  recognition.onspeechend = function() {
    console.log(
      'You were quiet for a while so voice recognition turned itself off.'
    );
  };

  recognition.onerror = function(event) {
    if (event.error == 'no-speech') {
      console.log('No speech was detected. Try again.');
    }
  };
  return recognition;
};

class AddToFridgeVoice extends React.Component {
  constructor() {
    super();
    const today = new Date();
    this.state = {
      text: '',
      voice: null,
      ingredientId: null,
      quantity: 1,
      expirationDate: today.getDate(),
      expirationMonth: today.getMonth(),
      expirationYear: today.getFullYear(),
      useDefaultDate: true,
      dateRequest: '',
      modalOpen: false
    };
    this.turnOnSpeech = this.turnOnSpeech.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }
  componentDidMount() {
    this.props.fetchIngredients();
    window.speechSynthesis.onvoiceschanged = () => {
      let englishVoice = window.speechSynthesis
        .getVoices()
        .filter(function(voice) {
          return voice.name == 'Google UK English Female';
        })[0];
      this.setState({ voice: englishVoice });
    };
  }
  turnOnSpeech() {
    this.handleOpen();
    recognition = setUpSpeech();
    recognition.onresult = event => {
      this.handleClose();
      const current = event.resultIndex;
      let transcript = event.results[current][0].transcript;
      if (pluralize.isPlural(transcript)) {
        transcript = pluralize.singular(transcript);
      }
      this.setState({ text: transcript });
      const msg = new SpeechSynthesisUtterance();
      if (this.state.voice) {
        msg.voice = this.state.voice;
      }
      msg.voiceURI = 'native';
      msg.volume = 1; // 0 to 1
      msg.rate = 1; // 0.1 to 10
      msg.pitch = 1; //0 to 2
      msg.text =
        this.state.text !== 'Unrecognized. Please try again'
          ? `You said ${transcript}. When will it expire?`
          : 'Unrecognized. Please try again';
      msg.lang = 'en-US';

      msg.onend = () => {
        console.log('Finished in ' + event.elapsedTime + ' seconds.');
        if (this.state.text !== 'Unrecognized. Please try again') {
          this.turnOnDateSpeech();
          this.setState({
            dateRequest: 'When will it expire?'
          });
        } else {
          this.turnOnSpeech();
        }
      };

      speechSynthesis.speak(msg);
    };
    recognition.start();
  }
  turnOnDateSpeech() {
    this.handleOpen();
    const recognition = setUpSpeech();
    recognition.onresult = event => {
      this.handleClose();
      const current = event.resultIndex;
      const transcript = event.results[current][0].transcript;
      const splitTranscript = transcript.split(' ');
      let year = parseInt(splitTranscript[2], 10);
      let month = monthOptions.filter(option => {
        return option.text === splitTranscript[0];
      })[0];
      let date = parseInt(splitTranscript[1], 10);
      const msg = new SpeechSynthesisUtterance();
      if (this.state.voice) {
        msg.voice = this.state.voice;
      }
      msg.voiceURI = 'native';
      msg.volume = 1; // 0 to 1
      msg.rate = 1; // 0.1 to 10
      msg.pitch = 1; //0 to 2
      msg.text = `You said ${transcript}. Press submit to confirm`;
      msg.lang = 'en-US';

      let repeat = false;
      const today = new Date();
      if (month && date) {
        this.setState({
          useDefaultDate: false,
          expirationDate: date,
          expirationMonth: month.value,
          expirationYear: year || today.getFullYear()
        });
      } else {
        msg.text = 'Unrecognized Date. Please say Month, Date, Year';
        repeat = true;
      }

      msg.onend = e => {
        console.log('Finished in ' + event.elapsedTime + ' seconds.');
        if (repeat) {
          this.setState({
            dateRequest: 'Unrecognized Date. Please say Month, Date, Year  '
          });
          this.turnOnDateSpeech();
        }
      };
      speechSynthesis.speak(msg);
    };
    recognition.start();
  }
  handleOpen = () => this.setState({ modalOpen: true });

  handleClose = () => {
    recognition.stop()
    this.setState({ modalOpen: false })};
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
        <Modal
          open={this.state.modalOpen}
          onClose={this.handleClose}
          basic
          size="small"
        >
          <Header icon="microphone" />
          <Modal.Content>
            <h3>Currently listening...</h3>
          </Modal.Content>
          <Modal.Actions>
            <Button color="red" onClick={this.handleClose} inverted>
              <Icon name="x" /> Cancel
            </Button>
          </Modal.Actions>
        </Modal>
        <center style={{ marginBottom: '20px' }}>
          <h2>Add to Fridge</h2>
        </center>
        <center style={{ marginBottom: '20px' }}>
          <h3>What do you want to add?</h3>
        </center>
        <Button color='orange' fluid onClick={this.turnOnSpeech}>
          Click to Speak
        </Button>
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
                  ingredientName: this.state.text,
                  quantity: this.state.quantity
                })
              : this.props.addToFridge({
                  userId: this.props.user.id,
                  ingredientName: this.state.text,
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
          <Button positive fluid type="submit">
            Submit
          </Button>
        </form>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
  ingredients: state.ingredients || []
});

const mapDispatchToProps = dispatch => ({
  addToFridge: info => dispatch(addToFridge(info)),
  fetchIngredients: () => dispatch(fetchIngredients())
});

export default connect(mapStateToProps, mapDispatchToProps)(AddToFridgeVoice);
