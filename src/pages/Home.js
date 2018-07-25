import React from 'react';
import { Container, Image, Header, Form, Input, Button } from 'semantic-ui-react';

import yodaImg from '../assets/yoda.png';
import './Home.css';

const searchInputStyle =  { width: '50%', marginRight: '1em' };

export default class Home extends React.Component {
  render() {
    return(
      <div className='home'>
        <Container textAlign='center'>
          <Image src={yodaImg} size='medium' className='image'/>
          <Header as='h1' style={{ fontSize: '5em' }} dividing>Yoda</Header>
          <p style={{ fontSize: '1.5em' }}>ClassApp's React Tutorial</p>
          <Form>
            <Input name='question' placeholder='Ask a Yoda about person Star Wars...' size='big' style={searchInputStyle}/>
            <Button type='submit' size='big'>Ask</Button>
          </Form>
        </Container>
      </div>
    );
  }
}
