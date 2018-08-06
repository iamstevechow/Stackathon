import React from 'react';
import { connect } from 'react-redux';
import { Card, Image, Dropdown, Grid, Button} from 'semantic-ui-react';
import {addToHistory} from '../store/history'

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

class HistoryCard extends React.Component {
  render() {
    const cookDate = new Date(this.props.item.cookingDate)
    return (
          <Card style={{ marginTop: '20px' }} fluid>
            <Card.Content>
              <Grid>
              <Grid.Column width={8}>
              <Image size='medium'src={this.props.item.recipe.image} />
              </Grid.Column>
              <Grid.Column width={7}>
              <Card.Header>
                {this.props.item.recipe.label}
              </Card.Header>
              <Card.Header>
                {monthOptions.filter(month=>month.value === cookDate.getMonth())[0].text} {cookDate.getDate()}, {cookDate.getFullYear()}
              </Card.Header>
              </Grid.Column>
              </Grid>
            </Card.Content>
            <Card.Content extra>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={this.props.item.recipe.url}
              >
                <Button onClick={()=>{this.props.addToHistory({
                  userId: this.props.user.id,
                  recipeId: this.props.item.recipe.id
                })}} fluid type="submit">
                  Cook Again!
                </Button>
              </a>
            </Card.Content>
          </Card>
        )
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  addToHistory: info => dispatch(addToHistory(info))
});

export default connect(mapStateToProps, mapDispatchToProps)(HistoryCard);
