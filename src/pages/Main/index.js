import React from 'react';
import { FaGithub, FaPlus, FaSpinner } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import api from '../../services/api';

import { Container, Form, SubmitButton, List } from './styles';

export default class Main extends React.Component {
  state = {
    newRepo: '',
    repos: [],
    loading: false,
  };

  componentDidMount() {
    const repos = JSON.parse(localStorage.getItem('repos'));
    if (repos) {
      this.setState({ repos });
    }
  }

  componentDidUpdate(_, prevState) {
    const { repos } = this.state;
    if (prevState.repos !== repos) {
      localStorage.setItem('repos', JSON.stringify(repos));
    }
  }

  handleSubmit = async e => {
    e.preventDefault();

    this.setState({ loading: true });

    const { newRepo, repos } = this.state;
    const repo = await api.get(`repos/${newRepo}`);

    this.setState({
      repos: [...repos, { name: repo.data.full_name }],
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
    const { newRepo, repos, loading } = this.state;
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

        <List repo={repos.length > 0}>
          {repos.map(repo => (
            <li key={repo.name}>
              {repo.name}
              <Link to={`/repository/${encodeURIComponent(repo.name)}`}>
                Detalhes
              </Link>
            </li>
          ))}
        </List>
      </Container>
    );
  }
}
