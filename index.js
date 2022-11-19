const express = require('express');
const expressHandlebars = require('express-handlebars');

const fortunes = [
  'Conquer your fears or they will conquer you.',
  'Rivers need springs.',
  "Do not fear what you don't know.",
  'You will have a pleasant surprise.',
  'Whenever possible, keep it simple.',
];

const app = express();

app.engine('handlebars', expressHandlebars.engine({
  defaultLayout: 'main',
}));

app.set('view engine', 'handlebars');
app.use(express.static(`${__dirname}/public`));

const port = process.env.PORT || 3000;

app.get('/', (req, res) => res.render('home'));

app.get('/about', (req, res) => {
  const randomFortune = fortunes[Math.floor(Math.random() * fortunes.length)];
  res.render('about', { fortune: randomFortune });
});

// custom 404 page
app.use((req, res) => {
  res.status(404);
  res.render('404');
});

// custom 500 page
app.use((err, req, res, next) => {
  console.log(err.message);
  res.type('text/plain');
  res.status(500);
  res.render('500');
  next(err);
});

app.listen(port, () => console.log(
  `Express started on http://localhost:${port}; `
  + 'press Ctrl-C to terminate.',
));
