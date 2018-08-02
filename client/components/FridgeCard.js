import React from 'react';
import { connect } from 'react-redux';
import { Card, Image } from 'semantic-ui-react';

const FridgeCard = props => {
  return (
    <Card fluid>
      <Image src={props.item.ingredient.image} />
      <Card.Content>
        <Card.Header>{props.item.ingredient.name}</Card.Header>
      </Card.Content>
      <Card.Content extra>
        This will expire on {props.item.expirationDate}
      </Card.Content>
    </Card>
  );
};

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(FridgeCard);
