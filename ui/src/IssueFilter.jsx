/* eslint "react/prefer-stateless-function": "off" */
import React from 'react';
import { Link } from 'react-router-dom';

export default class IssueFilter extends React.Component {
  render() {
    return (
      <div>
        <Link to="/issues">All issues</Link>
        {' | '}
        <Link to="/issues?status=New">New Issues</Link>
        {' | '}
        <Link to="/issues?status=Assigned">Assigned Issues</Link>
      </div>
    );
  }
}
