import React from 'react';
import { connect } from 'react-redux';
import { Card, Image } from 'semantic-ui-react';

const OneRecipe = props => {
  return (
    <Card style={{ height: '100vh' }} fluid>
      <Image src={props.item.recipe.image} />
      <Card.Content>
        <Card.Header>{props.item.recipe.name}</Card.Header>
      </Card.Content>
      <Card.Content extra>Extra Info</Card.Content>
    </Card>
  );
};

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(OneRecipe);
