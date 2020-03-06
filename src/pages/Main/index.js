import React from 'react';
import { FaGithub, FaPlus, FaSpinner } from 'react-icons/fa';

import api from '../../services/api';

import { Container, Form, SubmitButton } from './styles';

export default class Main extends React.Component {
  state = {
    newRepo: '',
    repos: [],
    loading: false,
  };

  handleSubmit = async e => {
    e.preventDefault();

    this.setState({ loading: true });

    const { newRepo, repos } = this.state;
    const repo = await api.get(`repos/${newRepo}`);

    this.setState({
      repos: [...repos, repo.data.full_name],
      newRepo: '',
      loading: false,
    });
  };

  handleInputChange = e => {
    this.setState({
      newRepo: e.target.value,
    });
  };

  render() {
    const { newRepo, loading } = this.state;
    return (
      <Container>
        <h1>
          <FaGithub />
          Repositórios
        </h1>

        <Form onSubmit={this.handleSubmit}>
          <input
            type="text"
            placeholder="Adicione um repositório"
            onChange={this.handleInputChange}
            value={newRepo}
          />
          <SubmitButton loading={loading}>
            {loading ? (
              <FaSpinner fill="#FFF" size={14} />
            ) : (
              <FaPlus fill="#FFF" size={14} />
            )}
          </SubmitButton>
        </Form>
      </Container>
    );
  }
}
