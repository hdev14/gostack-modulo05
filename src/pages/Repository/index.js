import React from 'react';
import PropTypes from 'prop-types';
import { FaCircleNotch, FaChevronLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import api from '../../services/api';

import Container from '../../styles/components/Container';
import { Loading, Owner, IssueList } from './styles';

export default class Repository extends React.Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        repo: PropTypes.string,
      }),
    }).isRequired,
  };

  state = {
    repo: {},
    issues: [],
    loading: true,
  };

  async componentDidMount() {
    const { match } = this.props;
    const repoName = decodeURIComponent(match.params.repo);

    const [repo, issues] = await Promise.all([
      api.get(`/repos/${repoName}`),
      api.get(`/repos/${repoName}/issues`, {
        params: {
          state: 'open',
          per_page: 5,
        },
      }),
    ]);

    this.setState({
      repo: repo.data,
      issues: issues.data,
      loading: false,
    });
  }

  render() {
    const { repo, issues, loading } = this.state;

    if (loading) {
      return (
        <Loading>
          <FaCircleNotch />
          <h1>carregando</h1>
        </Loading>
      );
    }
    return (
      <Container>
        <Owner>
          <Link to="/">
            <FaChevronLeft /> Voltar
          </Link>
          <img src={repo.owner.avatar_url} alt={repo.owner.login} />
          <h1>{repo.name}</h1>
          <p>{repo.description}</p>
        </Owner>

        <IssueList>
          {issues.map(issue => (
            <li key={String(issue.id)}>
              <img src={issue.user.avatar_url} alt={issue.user.login} />
              <div>
                <strong>
                  <a href={issue.html_url} title={issue.title}>
                    {issue.title}
                  </a>
                  {issue.labels.map(label => (
                    <span key={String(label.id)}>{label.name}</span>
                  ))}
                </strong>
                <small>{issue.user.login}</small>
              </div>
            </li>
          ))}
        </IssueList>
      </Container>
    );
  }
}
