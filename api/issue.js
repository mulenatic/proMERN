const { UserInputError } = require('apollo-server-express');
const { getDb, getNextSequence } = require('./db');

async function list(_, { status }) {
  const filter = {};
  if (status) filter.status = status;
  const issues = await getDb().collection('issues').find(filter).toArray();
  return issues;
}

async function get(_, { id }) {
  const db = getDb();
  const issue = db.collection('issues').findOne({ id });
  return issue;
}

function validate(issue) {
  const errors = [];
  if (issue.title.length < 3) {
    errors.push('Field "title" must be at least 3 characters long.');
  }
  if (issue.status === 'Assigned' && !issue.owner) {
    errors.push('Field "owner" is required when status is "Assigned"');
  }
  if (errors.length > 0) {
    throw new UserInputError('Invalid input(s)', { errors });
  }
}

async function add(_, { issue }) {
  validate(issue);

  const newIssue = Object.assign({}, issue);
  newIssue.created = new Date();
  newIssue.id = await getNextSequence('issues');
  if (issue.status === undefined) newIssue.status = 'New';

  const result = await getDb().collection('issues').insertOne(newIssue);
  const savedIssue = await getDb().collection('issues').findOne({ _id: result.insertedId });
  return savedIssue;
}

module.exports = { list, add, get };
