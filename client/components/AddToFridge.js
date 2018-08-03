import React from 'react';
import { Card } from 'semantic-ui-react';
import history from '../history';

export const AddToFridge = () => {
  return (
    <React.Fragment>
      <center>
        <h3>Add to Fridge</h3>
      </center>
      <Card.Group>
        <Card
          onClick={() => {
            history.push('/fridgebarcode');
          }}
          fluid
          color="red"
          header="Add Using Barcode"
        />
        <Card
          onClick={() => {
            history.push('/fridgeform');
          }}
          fluid
          color="orange"
          header="Manual Entry"
        />
      </Card.Group>
    </React.Fragment>
  );
};

export default AddToFridge;
