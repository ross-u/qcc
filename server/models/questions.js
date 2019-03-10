const db = require('../db');
const collectionName = 'questions';

// const collections = db.collections;
// const colName = 'questions';
// return collections[colName].replaceOne

const insertNewQuestion = (question) => {
  const collection = db.dbConnection.db().collection(collectionName);
  delete question._id;
  return collection.replaceOne(
    {'id': question.id},
    {...question},
    { upsert: true }  
  );
};

const retrieveAllQuestions = () => {
  const collection = db.dbConnection.db().collection(collectionName);
  return collection.find({}).toArray();
};

const deleteOneQuestion = async (id) => {
  const collection = db.dbConnection.db().collection(collectionName);
  let deletionResult = await collection.deleteOne({id});
  return deletionResult;
};

module.exports = {
  insertNewQuestion,
  retrieveAllQuestions,
  deleteOneQuestion
} 
