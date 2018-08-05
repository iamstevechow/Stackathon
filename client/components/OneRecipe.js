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
              const uri = props.item.uri;
              const edamameIdIndex = uri.indexOf('recipe');
              const edamameId = uri.slice(edamameIdIndex + 7);
              props.addToRecipes({
                userId: props.user.id,
                edamameId: edamameId,
                label: props.item.label,
                image: props.item.image,
                url: props.item.url
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
    <Card style={{ height: '80vh' }} fluid>
      <Image src={props.item.image} />
      <h2>{props.item.label}</h2>
      {buttonState(props.button)}
      <a target="_blank" rel="noopener noreferrer" href={props.item.url}>
        <Button fluid type="submit">
          Cook Now!
        </Button>
      </a>
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
