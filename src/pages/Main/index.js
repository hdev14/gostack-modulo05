import React from 'react';
import { FaGithub, FaPlus, FaSpinner } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import api from '../../services/api';

import Container from '../../styles/components/Container';
import { Form, SubmitButton, List, Alert } from './styles';

export default class Main extends React.Component {
  state = {
    newRepo: '',
    repos: [],
    loading: false,
    error: false,
    alert: false,
    messageAlert: 'asdasd',
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

    try {
      const { newRepo, repos } = this.state;

      if (repos.find(repo => repo.name == newRepo)) {
        throw new Error('Repositório duplicado');
      }

      const repo = await api.get(`repos/${newRepo}`);

      this.setState({
        repos: [...repos, { name: repo.data.full_name }],
        newRepo: '',
        loading: false,
        error: false,
        alert: false,
      });
    } catch (err) {
      if (err.message === 'Repositório duplicado') {
        this.setState({
          loading: false,
          alert: true,
          messageAlert: err.message,
        });
      } else {
        this.setState({
          loading: false,
          error: true,
        });
      }
    }
  };

  handleInputChange = e => {
    this.setState({
      newRepo: e.target.value,
    });
  };

  render() {
    const { newRepo, repos, loading, error, alert, messageAlert } = this.state;
    return (
      <Container>
        <h1>
          <FaGithub />
          Repositórios
        </h1>

        <Form onSubmit={this.handleSubmit} error={error}>
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

        {alert && <Alert id="alert">{messageAlert}</Alert>}

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
