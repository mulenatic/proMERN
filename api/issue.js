const { UserInputError } = require('apollo-server-express');
const { getDb, getNextSequence } = require('./db');

async function list(_, { status, effortMin, effortMax }) {
  const filter = {};
  if (status) filter.status = status;

  if (effortMin !== undefined || effortMax !== undefined) {
    filter.effort = {};
    if (effortMin !== undefined) filter.effort.$gte = effortMin;
    if (effortMax !== undefined) filter.effort.$lte = effortMax;
  }

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

async function update(_, { id, changes }) {
  const db = getDb();

  if (changes.title || changes.status || changes.owner) {
    const issue = await db.collection('issues').findOne({ id });
    Object.assign(issue, changes);
    validate(issue);
  }

  await db.collection('issues').updateOne({ id }, { $set: changes });
  const savedIssue = await db.collection('issues').findOne({ id });
  return savedIssue;
}

module.exports = {
  list,
  add,
  get,
  update,
};
