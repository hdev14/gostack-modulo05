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
        issues: PropTypes.array,
        loading: PropTypes.bool,
        issuePages: PropTypes.shape({
          next: PropTypes.number,
          last: PropTypes.number,
        }),
      }),
    }).isRequired,
  };

  state = {
    repo: {},
    issues: [],
    loading: true,
    issuePages: {
      next: 1,
      last: 1,
    },
  };

  async componentDidMount() {
    const { match } = this.props;
    const repoName = decodeURIComponent(match.params.repo);

    const [repo, issues] = await Promise.all([
      api.get(`/repos/${repoName}`),
      api.get(`/repos/${repoName}/issues`),
    ]);

    const regexpPage = RegExp(/page=(\d+).*$/);
    const [linkNextPage, linkLastPage] = issues.headers.link.split(',');
    const numberNextPage = linkNextPage.match(regexpPage)[1];
    const numberLastPage = linkLastPage.match(regexpPage)[1];

    this.setState({
      repo: repo.data,
      issues: issues.data,
      loading: false,
      issuePages: {
        next: numberNextPage,
        last: numberLastPage,
      },
    });
  }

  render() {
    const { repo, issues, loading, issuePages } = this.state;

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
