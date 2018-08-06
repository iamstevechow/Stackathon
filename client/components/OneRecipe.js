import React from 'react';
import { connect } from 'react-redux';
import { Image, Card, Button } from 'semantic-ui-react';
import { addToRecipes } from '../store/recipes';
import {addToHistory} from '../store/history'

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
            color='orange'
            type="submit"
          >
            Add to My Recipe Book
          </Button>
        );
      case 'loading':
        return <Button color='orange'loading />;
      case 'added':
        return <Button color='orange'>Saved!</Button>;
      case 'already saved':
        return <Button disabled >Already Saved in Your Recipe Book</Button>;
      default:
        return null;
    }
  };
  return (
    <Card style={{ height: '80vh' }} fluid>
      <Image src={props.item.image} />
      <h2>{props.item.label}</h2>
      {buttonState(props.button)}
      <a
        style={{ marginTop: '10px' }}
        target="_blank"
        rel="noopener noreferrer"
        href={props.item.url}
      >
                <Button color='green'onClick={()=>{
                                const uri = props.item.uri;
                                const edamameIdIndex = uri.indexOf('recipe');
                                const edamameId = uri.slice(edamameIdIndex + 7);
                                props.addToHistory({
                userId: props.user.id,
                edamameId: edamameId,
                label: props.item.label,
                image: props.item.image,
                url: props.item.url
                })}} fluid type="submit">
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
  addToRecipes: ids => dispatch(addToRecipes(ids)),
  addToHistory: info => dispatch(addToHistory(info))
});

export default connect(mapStateToProps, mapDispatchToProps)(OneRecipe);
