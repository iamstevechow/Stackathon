import React from 'react';
import { Card } from 'semantic-ui-react';
import history from '../history';

export const AddToFridge = () => {
  return (
    <React.Fragment>
      <center style={{ marginBottom: '20px' }}>
        <h2>Add to Fridge</h2>
      </center>
      <Card.Group>
        <Card
          style={{ height: '10vh' }}
          onClick={() => {
            history.push('/fridgebarcode');
          }}
          fluid
          color="red"
          header="Barcode"
        />
        <Card
          style={{ height: '10vh' }}
          onClick={() => {
            history.push('/fridgevoice');
          }}
          fluid
          color="orange"
          header="Voice"
        />
        <Card
          style={{ height: '10vh' }}
          onClick={() => {
            history.push('/fridgeimage');
          }}
          fluid
          color="yellow"
          header="Image Recognition"
        />
        <Card
          style={{ height: '10vh' }}
          onClick={() => {
            history.push('/fridgeform');
          }}
          fluid
          color="green"
          header="Manual Entry"
        />
      </Card.Group>
    </React.Fragment>
  );
};

export default AddToFridge;
