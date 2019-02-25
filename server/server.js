const express = require('express');
const busboy = require('connect-busboy');
const { PORT, URI} = require('./config');
const router = require('./router');
const models = require('./models/index');
const app = express();

global.__basedir = __dirname;

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Middleware
app.use(busboy());
app.use('/get-image', express.static(__basedir + '/images'));
app.use(express.json());
app.use(router);

(async () => {
  try {
    models.dbConnection = await models.MongoClient.connect(URI, { useNewUrlParser: true });
    app.listen(PORT, () => console.log(`Server is running on the port ${PORT}.`));
  } catch (err) {
    console.error('Error connecting to the db ', err)
  }
})();