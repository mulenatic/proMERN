import React from 'react';
import { withRouter } from 'react-router-dom';
import URLSearchParams from 'url-search-params';

class IssueFilter extends React.Component {

  constructor({ location: { search } }) {
    super();
    const params = new URLSearchParams(search);
    this.state = {
      status: params.get('status') || '',
    };

    this.onChangeStatus = this.onChangeStatus.bind(this);
    this.applyFilter = this.applyFilter.bind(this);
  }

  onChangeStatus(e) {
    this.setState({ status: e.target.value });
  }

  applyFilter() {
    const { status } = this.state;
    const { history } = this.props;
    history.push({
      pathname: '/issues',
      search: status ? `?status=${status}` : '',
    });
  }

  render() {
    const { status } = this.state;
    return (
      <div>
        Status:
        {' '}
        <select value={status} onChange={this.onChangeStatus}>
          <option value="">(All)</option>
          <option value="New">New</option>
          <option value="Assigned">Assigned</option>
          <option value="Fixed">Fixed</option>
          <option value="Closed">Closed</option>
        </select>
        {' '}
        <button type="button" onClick={this.applyFilter}>Apply</button>
      </div>
    );
  }
}

export default withRouter(IssueFilter);
