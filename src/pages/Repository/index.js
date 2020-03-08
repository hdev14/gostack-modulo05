import React from 'react';
import PropTypes from 'prop-types';
import { FaCircleNotch, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import api from '../../services/api';

import Container from '../../styles/components/Container';
import { Loading, Owner, IssueList, IssueFilter, Pagination } from './styles';

export default class Repository extends React.Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        repo: PropTypes.string,
        issues: PropTypes.array,
        loading: PropTypes.bool,
        issuePages: PropTypes.shape({
          current: PropTypes.number,
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
      current: 1,
      next: 1,
      last: 1,
    },
  };

  async componentDidMount() {
    const { match } = this.props;
    const repoName = decodeURIComponent(match.params.repo);

    const [repo, issues] = await Promise.all([
      api.get(`/repos/${repoName}`),
      api.get(`/repos/${repoName}/issues`, {
        params: {
          per_page: 5,
        },
      }),
    ]);

    const regexpPage = RegExp(/&page=(\d+).*$/);
    const [linkNextPage, linkLastPage] = issues.headers.link.split(',');
    const numberNextPage = linkNextPage.match(regexpPage)[1];
    const numberLastPage = linkLastPage.match(regexpPage)[1];

    this.setState({
      repo: repo.data,
      issues: issues.data,
      loading: false,
      issuePages: {
        current: Number(numberNextPage - 1),
        next: Number(numberNextPage),
        last: Number(numberLastPage),
      },
    });
  }

  handleSelectChange = async e => {
    const state = e.target.value;
    const { repo } = this.state;
    const url = `${repo.url}/issues`;
    const issues = await api.get(url, {
      params: {
        state,
        per_page: 5,
      },
    });

    this.setState({ issues: issues.data });
  };

  prev = async e => {
    const { issuePages, repo } = this.state;
    const url = `${repo.url}/issues`;
    const btnPrev = e.target;
    const btnNext = document.querySelectorAll('#pagination svg')[1];

    if (!(issuePages.current <= 1)) {
      btnNext.removeAttribute('disabled');

      const issues = await api.get(url, {
        params: {
          state: document.getElementById('filter').value,
          per_page: 5,
          page: issuePages.current - 1,
        },
      });

      this.setState({
        issues: issues.data,
        issuePages: {
          ...issuePages,
          current: issuePages.current - 1,
          next: issuePages.current,
        },
      });

      return;
    }

    btnPrev.setAttribute('disabled', '');
  };

  next = async e => {
    const { issuePages, repo } = this.state;
    const url = `${repo.url}/issues`;
    const btnNext = e.target;
    const btnPrev = document.querySelectorAll('#pagination svg')[0];

    if (!(issuePages.current === issuePages.last)) {
      btnPrev.removeAttribute('disabled');
      const issues = await api.get(url, {
        params: {
          state: document.getElementById('filter').value,
          per_page: 5,
          page: issuePages.next,
        },
      });

      this.setState({
        issues: issues.data,
        issuePages: {
          ...issuePages,
          current: issuePages.next,
          next: issuePages.next + 1,
        },
      });

      return;
    }

    btnNext.setAttribute('disabled', '');
  };

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

        <IssueFilter
          id="filter"
          onChange={this.handleSelectChange}
          defaultValue="all"
        >
          <option value="all">all</option>
          <option value="open">open</option>
          <option value="closed">closed</option>
        </IssueFilter>

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

        <Pagination id="pagination">
          <FaChevronLeft
            onClick={this.prev}
            disabled={issuePages.current === 1}
          />
          <FaChevronRight
            onClick={this.next}
            disabled={issuePages.next > issuePages.last}
          />
        </Pagination>
      </Container>
    );
  }
}
