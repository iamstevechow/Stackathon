import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchHistory } from '../store/history';
import { HistoryCard } from './index';
import { Button } from 'semantic-ui-react';
import history from '../history';

class CookingHistory extends Component {
  componentDidMount() {
    this.props.fetchHistory(this.props.user.id);
  }
  render() {
    return (
      <React.Fragment>
        <center style={{ marginBottom: '20px' }}>
          <h2>My Cooking History</h2>
        </center>
        {this.props.history.length ? null : (
          <React.Fragment>
            <center style={{ marginBottom: '20px' }}>
              <h3>You have no cooking history!</h3>
            </center>
            <Button
              fluid
              type="submit"
              onClick={() => {
                history.push('/newrecipes');
              }}
            >
              Check out some new recipes!
            </Button>
          </React.Fragment>
        )}
        {this.props.history.map(item => (
          <HistoryCard
            key={item.id}
            item={item}
          />
        ))}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  let history = state.history || []
  let sortedHistory = history.sort((a,b)=>a.cookingDate>b.cookingDate
  )
  return {
    user: state.user,
    history: sortedHistory
  }
}

const mapDispatchToProps = dispatch => ({
  fetchHistory: id => dispatch(fetchHistory(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CookingHistory);
