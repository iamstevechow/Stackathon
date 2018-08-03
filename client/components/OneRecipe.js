import React from 'react';
import { connect } from 'react-redux';
import { Image, Card, Button } from 'semantic-ui-react';
import { addToRecipes } from '../store/recipes';

const OneRecipe = props => {
  const buttonState = button => {
    switch (button) {
      case 'active':
        return (
          <Button
            onClick={() => {
              props.changeButtonState('loading');
              props.addToRecipes({
                userId: props.user.id,
                recipeId: props.item.id
              });
              setTimeout(() => {
                props.changeButtonState('added');
              }, 500);
            }}
            type="submit"
          >
            Add to My Recipe Book
          </Button>
        );
      case 'loading':
        return <Button loading />;
      case 'added':
        return <Button>Saved!</Button>;
      case 'already saved':
        return <Button>Already Saved in Your Recipe Book</Button>;
      default:
        return null;
    }
  };
  return (
    <Card fluid>
      <Image src={props.item.image} />
      <h2>{props.item.label}</h2>
      {buttonState(props.button)}
    </Card>
  );
};

const mapStateToProps = state => ({
  user: state.user
});

const mapDispatchToProps = dispatch => ({
  addToRecipes: ids => dispatch(addToRecipes(ids))
});

export default connect(mapStateToProps, mapDispatchToProps)(OneRecipe);
