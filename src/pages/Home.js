import React from 'react';
import { Container, Image, Header, Form, Input, Button, Segment, Pagination, Dimmer, Loader, Message } from 'semantic-ui-react';
import axios from 'axios';
import _ from 'lodash';
import { Link } from 'react-router-dom';

import yodaImg from '../assets/yoda.png';
import './Home.css';

const searchInputStyle =  { width: '50%', marginRight: '1em' };

const PAGE_QUANTITY = 10;

export default class Home extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      questionInput: '',
      questionSearch: '',
      results: null,
      pages: 0,
      activePage: 0,
      loading: false,
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { questionInput } = this.state;
    const url = `https://swapi.co/api/people/?search=${questionInput}`;

    this.setState({ loading: true });

    axios.get(url)
      .then((res) => {
        let pages = Math.ceil(res.data.count / PAGE_QUANTITY);
        this.setState({
          activePage: 1,
          pages: pages,
          results: res.data.results,
          questionSearch: questionInput,
          loading: false,
        });
      })
      .catch((err) => {
        console.error(err);
      });
  }

  handlePaginationChange = (e, { activePage }) => {
    const { questionSearch } = this.state;
    const url = `https://swapi.co/api/people/?search=${questionSearch}&page=${activePage}`;

    this.setState({ loading: true });

    axios.get(url)
      .then((res) => {
        this.setState({
          activePage,
          results: res.data.results,
          loading: false,
        });
      })
      .catch((err) => {
        console.error(err);
      });
  }

  handleInputChange = (e, {name}) => {
    this.setState({ [name]: e.target.value });
  }
  render() {
    const { questionInput, pages, activePage, results, loading } = this.state;

    const pagination = (<Pagination
      activePage={activePage}
      onPageChange={this.handlePaginationChange}
      totalPages={pages}
    />);

    const resultItems = !!results && results.map((r) => {
      let id = _.nth(r.url.split("/"),-2);
    });

    const resultsSection = (
      <Segment stacked style={{ marginBottom: '2em' }}>
        <Message
          negative
          hidden={pages !== 0}
          header='Results found no!'
        />
        <Container textAlign='left'>
          {resultItems}
        </Container>
        { pages !== 0 ? pagination : '' }
        <Dimmer active={loading}>
          <Loader />
        </Dimmer>
      </Segment>
    );

    return(
      <div className='home'>
        <Container textAlign='center'>
          <Image
            src={yodaImg}
            size='medium'
            className='image'
          />
          <Header
            as='h1'
            style={{ fontSize: '5em' }}
            dividing
          >
            Yoda
          </Header>

          <p style={{ fontSize: '1.5em' }}>ClassApp's React Tutorial</p>

          <Form>
            <Input
              name='questionInput'
              value={questionInput}
              placeholder='Ask a Yoda about person Star Wars...'
              size='big'
              style={searchInputStyle}
              onChange={this.handleInputChange}
            />
            <Button type='submit' size='big' onClick={this.handleSubmit}>Ask</Button>
            { results !== null || loading === true ? resultsSection : '' }
          </Form>
        </Container>
      </div>
    );
  }
}
