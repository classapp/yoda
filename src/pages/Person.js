import React from 'react';
import axios from 'axios';
import { Container, Header, Table, Button, Icon, Message, Dimmer, Loader, Image } from 'semantic-ui-react';

export default class Person extends React.Component {
  state = { person: {}, loading: true };

  componentWillMount() {
    const { id } = this.props.match.params;
    const url = `https://swapi.co/api/people/${id}`;
    axios.get(url)
      .then((res) => {
        this.setState({
          person: res.data,
          loading: false,
        });
      })
      .catch((err) => {
        console.error(err);
        this.setState({
          error : err.response,
          loading: false,
        });
      });
  }

  render() {
    const { person, loading, error } = this.state;

    const result = (
      <Table definition style={{ width: '60%', margin: '1em auto 3em auto' }}>
        <Table.Body>
          <Table.Row>
            <Table.Cell>Birth</Table.Cell>
          <Table.Cell>{person.birth_year}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Gender</Table.Cell>
            <Table.Cell>{person.gender}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Height</Table.Cell>
            <Table.Cell>{person.height} cm</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Mass</Table.Cell>
            <Table.Cell>{person.mass} kg</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Hair Color</Table.Cell>
            <Table.Cell>{person.hair_color}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Skin Color</Table.Cell>
            <Table.Cell>{person.skin_color}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Eye Color</Table.Cell>
            <Table.Cell>{person.eye_color}</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    );

    const errorMessage = (
      <Message negative>
        <Message.Header>{!!error ? `${error.status} - ${error.data.detail}` : ''}</Message.Header>
      <Image src='https://i.gifer.com/1dxr.gif' style={{ marginBottom: '3em' }}/>
      </Message>
    );

    return(
      <div>
        <Container textAlign='center'>
          <Header
            as='h1'
            content={ !!error ? 'Error' : person.name }
            style={{ fontSize: '4em', margin: '1em auto 0.5em auto' }}
            dividing
          />
        { !!error ? errorMessage : result }
          <Button size='large' onClick={(e) => {
            e.preventDefault();
            this.props.history.goBack();
          }}>
            <Icon name='arrow left'/> Back
          </Button>
        </Container>
        <Dimmer active={loading}>
          <Loader />
        </Dimmer>
      </div>
    );
  }
}
