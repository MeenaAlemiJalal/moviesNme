const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const routes = require('./controllers');
const  sequelize = require('./config/connection');

const hbs = exphbs.create({});

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Set Handlebars as the default template engine.
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.enable('view cache');



app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  name: 'session-id',
  secret:  process.env.SESSION_SECRET, 
  saveUninitialized: false,
  resave: false,
  store: new FileStore()
}));

// turn on routes
app.use(routes);

// turn on connection to db and server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
});