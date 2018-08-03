import React from 'react';
import { connect } from 'react-redux';
import { Card, Image } from 'semantic-ui-react';

const FridgeCard = props => {
  const simplifyDate = date => {
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();
    return new Date(year, month, day);
  };
  const expireCheck = date => {
    const today = simplifyDate(new Date());
    const expiration = simplifyDate(new Date(date));
    const days = (expiration - today) / 86400000;
    switch (true) {
      case days < 0:
        return <Card.Content extra>This has expired!</Card.Content>;
      case days === 0:
        return <Card.Content extra>This will expire today!</Card.Content>;
      case days === 1:
        return <Card.Content extra>This will expire tomorrow!</Card.Content>;
      case days < 7:
        return (
          <Card.Content extra>This will expire in {days} day(s)</Card.Content>
        );
      default:
        return (
          <Card.Content extra>
            This will expire in more than 7 days
          </Card.Content>
        );
    }
  };
  return (
    <Card fluid>
      <Image src={props.item.ingredient.image} />
      <Card.Content>
        <Card.Header>{props.item.ingredient.name}</Card.Header>
      </Card.Content>
      {expireCheck(props.item.expirationDate)}
    </Card>
  );
};

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(FridgeCard);
