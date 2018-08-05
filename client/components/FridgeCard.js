import React from 'react';
import { connect } from 'react-redux';
import { Card, Image, Dropdown, Grid} from 'semantic-ui-react';
import Swipeable from 'react-swipeable';

class FridgeCard extends React.Component {
  constructor() {
    super();
    this.state = { delete: false };
    this.swiped = this.swiped.bind(this);
    this.simplifyDate = this.simplifyDate.bind(this);
    this.expireCheck = this.expireCheck.bind(this);
    this.undo = this.undo.bind(this);
  }
  swiped(e, deltaX, deltaY, isFlick, velocity) {
    if (deltaX < -150) {
      this.setState({ delete: true });
      this.props.addToDelete(this.props.item.id);
    }
  }
  undo() {
    this.setState({ delete: false });
    this.props.removeFromDelete(this.props.item.id);
  }
  simplifyDate(date) {
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();
    return new Date(year, month, day);
  }
  expireCheck(date) {
    const today = this.simplifyDate(new Date());
    const expiration = this.simplifyDate(new Date(date));
    const days = (expiration - today) / 86400000;
    switch (true) {
      case days < 0:
        return (
          <Card.Content style={{ backgroundColor: 'orangered' }} extra>
            This has expired!
          </Card.Content>
        );
      case days === 0:
        return (
          <Card.Content style={{ backgroundColor: 'orange' }} extra>
            This will expire today!
          </Card.Content>
        );
      case days === 1:
        return (
          <Card.Content style={{ backgroundColor: 'yellow' }} extra>
            This will expire tomorrow!
          </Card.Content>
        );
      case days < 7:
        return (
          <Card.Content style={{ backgroundColor: 'lightgreen' }} extra>
            This will expire in {days} day(s)
          </Card.Content>
        );
      default:
        return (
          <Card.Content style={{ backgroundColor: 'lightgreen' }} extra>
            This will expire in more than 7 days
          </Card.Content>
        );
    }
  }
  render() {
    return (
      <Swipeable onSwiped={this.swiped}>
        {this.state.delete ? (
          <Card style={{ marginTop: '20px' }} fluid onClick={this.undo}>
            <Card.Content>
              <Card.Header>Undo</Card.Header>
            </Card.Content>
          </Card>
        ) : (
          <Card style={{ marginTop: '20px' }} fluid>
            <Card.Content>
              <Grid>
              <Grid.Column width={7}>
              <Image size='medium'src={this.props.item.ingredient.image} />
              </Grid.Column>
              <Grid.Column width={7}>
              <Card.Header>
                {capitalize(this.props.item.ingredient.name)}
              </Card.Header>
              </Grid.Column>
              </Grid>
            </Card.Content>
            {this.expireCheck(this.props.item.expirationDate)}
          </Card>
        )}
      </Swipeable>
    );
  }
}

const capitalize = (string) => {
  let firstLetter = string[0]
  return firstLetter.toUpperCase() + string.slice(1)
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(FridgeCard);
