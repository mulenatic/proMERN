const express = require('express');
const { UserInputError } = require('apollo-server-express');
const fs = require('fs');

require('dotenv').config();

const port = process.env.API_SERVER_PORT || 3000;


async function issueList() {
  const issues = await db.collection('issues').find({}).toArray();
  return issues;
}

function validateIssue(issue) {
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

async function issueAdd(_, { issue }) {
  validateIssue(issue);

  const newIssue = Object.assign({}, issue);
  newIssue.created = new Date();
  newIssue.id = await getNextSequence('issues');
  if (issue.status === undefined) newIssue.status = 'New';

  const result = await db.collection('issues').insertOne(newIssue);
  const savedIssue = await db.collection('issues').findOne({ _id: result.insertedId });
  return savedIssue;
}

const app = express();

(async function start() {
  try {
    await connectToDb();
    app.listen(port, () => {
      console.log(`Api Server started on port ${port}`);
    });
  } catch (err) {
    console.log('ERROR', err);
  }
}());
