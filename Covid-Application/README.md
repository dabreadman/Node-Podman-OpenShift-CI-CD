## Covid Application

### Architectural Overview
We used <a href="https://nodejs.org/en/">Node.js</a> to develop this application as it is easy to scale and has extended support. 
<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Node.js_logo_2015.svg/1200px-Node.js_logo_2015.svg.png"/><br><br>
We also used <a href="https://expressjs.com/">Express</a> as a web framework as it is minimalist and unopinionated.
<img src="https://i.imgur.com/Gc37Bnx.png"/>
Alongside this, we used <a href="https://www.npmjs.com/package/express-handlebars">Express Handlebars</a> as a Handlebars view engine for Express as it is simple as easy to use.
<img src="https://miro.medium.com/max/1400/1*GZERaorN5x2x23N8x-rA3w.png"/>
We used <a href="https://www.npmjs.com/package/novelcovid">NovelCovid</a> as a wrapper for COVID-19 related data from the <a href="https://disease.sh/">Open Disease API</a> - this is because it has no request limits that exist on other options such as Rapid API.
To install:
```npm i -s novelcovid```

### How the application works cohesively
<img src="https://i.imgur.com/Yi9TLjw.png"/>