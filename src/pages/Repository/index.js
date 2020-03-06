import React from 'react';
import PropTypes from 'prop-types';

import api from '../../services/api';

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
    return <h1>Repositório</h1>;
  }
}
