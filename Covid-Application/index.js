const express = require('express')
const api = require('novelcovid');
const exhbs = require('express-handlebars')
 
// you can choose which URL to use, this will not change the behaviour of the API
api.settings({
    baseUrl: 'https://disease.sh'
})

const app = express()

app.set('view engine', 'hbs')

app.engine( 'hbs', exhbs( {
    extname: 'hbs',
    defaultView: 'home',
    layoutsDir: __dirname + '/views/layouts'
}));

app.get('/', (req, res) => {
    api.countries().then((response) => {
        res.render('home',{info:response})
    }) 
})

app.listen(8080, ()=> {
    console.log('The app is listening on port 8080..')
})