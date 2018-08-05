import React from 'react';
import { connect } from 'react-redux';
import { Card, Image, Button } from 'semantic-ui-react';
import Swipeable from 'react-swipeable';

class RecipeCard extends React.Component {
  constructor() {
    super();
    this.state = { delete: false };
    this.swiped = this.swiped.bind(this);
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
  render() {
    return (
      <Swipeable onSwiped={this.swiped}>
        {this.state.delete ? (
          <Card style={{ marginTop: '10px' }} fluid onClick={this.undo}>
            <Card.Content>
              <Card.Header>Undo</Card.Header>
            </Card.Content>
          </Card>
        ) : (
          <Card style={{ marginTop: '10px' }} fluid>
            <Image src={this.props.item.recipe.image} />
            <Card.Content>
              <Card.Header>{this.props.item.recipe.label}</Card.Header>
            </Card.Content>
            <Card.Content extra>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={this.props.item.recipe.url}
              >
                <Button fluid type="submit">
                  Cook Now!
                </Button>
              </a>
            </Card.Content>
          </Card>
        )}
      </Swipeable>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(RecipeCard);
