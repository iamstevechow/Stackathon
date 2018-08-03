import React from 'react';
import { connect } from 'react-redux';
import { Image, Card } from 'semantic-ui-react';

const OneRecipe = props => {
  return (
    <Card fluid>
      <Image src={props.item.recipe.image} />
      <h2>{props.item.recipe.label}</h2>
      <h4>Extra Info</h4>
    </Card>
  );
};

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(OneRecipe);
