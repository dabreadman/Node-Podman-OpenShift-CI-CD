const express = require('express');
const api = require('novelcovid');
const exhbs = require('express-handlebars');
const path = require('path');
const UNUSEDVAR = 'unused var'

// you can choose which URL to use, this will not change the behaviour of the API
api.settings({
  baseUrl: 'https://disease.sh',
});

const app = express();
const viewsPath = path.join(__dirname, '/views');
app.set('views', viewsPath);

app.set('view engine', 'hbs');

app.engine(
  'hbs',
  exhbs({
    extname: 'hbs',
    layoutsDir: 'src/views/layouts',
    defaultView: 'home',
  }),
);

app.get('/', (req, res) => {
  api
    .countries()
    .then((response) => {
      res.render('home', { info: response });
    })
    .catch((err) => alert(err));
});

app.listen(8080, () => {
  console.log('The app is listening on port 8080..');
});
