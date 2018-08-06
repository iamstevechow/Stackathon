import React from 'react';
import { connect } from 'react-redux';
import { Card, Button, Modal, Header, Icon} from 'semantic-ui-react';
import history from '../history';
import {setUpSpeech} from './AddToFridgeVoice'

let recognition

class UserHome extends React.Component {
  constructor() {
    super();
    this.state={
      modalOpen: false
    }
    this.turnOnSpeech = this.turnOnSpeech.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }
  componentDidMount() {
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
      const splitTranscript = transcript.toLowerCase().split(' ');
      const msg = new SpeechSynthesisUtterance();
      if (this.state.voice) {
        msg.voice = this.state.voice;
      }
      msg.voiceURI = 'native';
      msg.volume = 1; // 0 to 1
      msg.rate = 1; // 0.1 to 10
      msg.pitch = 1; //0 to 2
      msg.lang = 'en-US';
      if (transcript.indexOf('add') !== -1 || transcript.indexOf('adding') !== -1){
        msg.text ='How do you want to add your ingredient?'
        msg.onend = () => {
          history.push('/addtofridge');
        }
       } else if (transcript.indexOf('fridge') !== -1 || transcript.indexOf('refrigerator') !== -1) {
        msg.text ='Opening your fridge'
        msg.onend = () => {
          history.push('/fridge');
        };
      } else       if (transcript.indexOf('history') !== -1) {
        msg.text ='Here is your cooking history'
        msg.onend = () => {
          history.push('/history');
        };
      }
     else       if (transcript.indexOf('preferences') !== -1) {
      msg.text ='Opening your preferences'
      msg.onend = () => {
        history.push('/preferences');
      };
    }
  else       if (transcript.indexOf('saved') !== -1 || transcript.indexOf('my') !== -1) {
    msg.text ='These are your saved recipes'
    msg.onend = () => {
      history.push('/myrecipes');
    };
  }
 else       if (transcript.indexOf('recipe') !== -1 || transcript.indexOf('recipes') !== -1) {
  msg.text ='Here are some new recipes'
  msg.onend = () => {
    history.push('/newrecipes');
  };
} else {
  msg.text ='Unrecognized Input. Please try again'

  msg.onend = () => {
    console.log('Finished in ' + event.elapsedTime + ' seconds.');
  };
}
      speechSynthesis.speak(msg);
    };
    recognition.start();
  }
  handleOpen = () => this.setState({ modalOpen: true });

  handleClose = () => {
    recognition.stop()
    this.setState({ modalOpen: false })};
  render() {
  const { user } = this.props;
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
            <h3>What do you want to do?</h3>
          </Modal.Content>
          <Modal.Actions>
            <Button color="red" onClick={this.handleClose} inverted>
              <Icon name="x" /> Cancel
            </Button>
          </Modal.Actions>
        </Modal>
      <center style={{ marginBottom: '20px' }}>
        <h3
          style={{
            marginTop: '0',
            marginBottom: '10px'
          }}
        >
          Welcome back, {user.firstName}
        </h3>
      </center>
      <Card.Group style={{ height: '40vh' }}>
        <Card
          style={{ height: '10vh' }}
          onClick={() => {
            history.push('/fridge');
          }}
          fluid
          color="green"
          header="Check out my Fridge"
        />
        <Card
          style={{ height: '10vh' }}
          onClick={() => {
            history.push('/newrecipes');
          }}
          fluid
          color="green"
          header="Give me a Recipe"
        />
        <Card
          style={{ height: '10vh' }}
          onClick={() => {
            history.push('/myrecipes');
          }}
          fluid
          color="green"
          header="My Saved Recipes"
        />
      </Card.Group>
      <Card.Group style={{ height: '20vh' }} itemsPerRow={2}>
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
          color="green"
          header="Edit my Preferences"
        />
      </Card.Group>
      <Button onClick={this.turnOnSpeech}size='massive' color='green'style={{margin:'20px'}}floated='right'circular icon='microphone'></Button>
    </React.Fragment>
  );
};
}

const mapState = state => {
  return {
    user: state.user
  };
};

export default connect(mapState)(UserHome);