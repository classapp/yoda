import React from 'react';
import axios from 'axios';
import { Container, Header, Button, Icon, Message } from 'semantic-ui-react';

export default class Person extends React.Component {

  componentWillMount() {
    const { id } = this.props.match.params;
    const url = `https://swapi.co/api/people/${id}`;
    axios.get(url)
      .then((res) => {
        this.setState({
          person: res.data,
        });
      })
      .catch((err) => {
        console.error(err);
      });
  }

  render() {
    return(<p>Person</p>);
  }
}
