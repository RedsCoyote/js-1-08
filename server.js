var auto = [
    { Id: 1, Name: 'Audi A4', Year: 2008, Price: 380000 },
    { Id: 2, Name: 'Audi A6', Year: 2008, Price: 420000 },
    { Id: 3, Name: 'Audi A8', Year: 2008, Price: 500000 }    
];

var express = require('express');
var bodyParser = require('body-parser')

var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

app.get('/', function(req, res) {
    res.render('pages/index', {
        title: 'Добро пожаловать на AutoScout',
        description: 'Сейчас в продаже ' + auto.length + ' автомобилей',
        auto: auto
    });
});

app.get('/auto', function(req, res) {
    res.render('pages/auto', {auto: null});
});

app.post('/auto', function(req, res) {
    if (req.body.id && indexById(req.body.id) >= 0) {
      const autoObj = auto[indexById(req.body.id)];
      autoObj.Name = req.body.name;
      autoObj.Year = parseInt(req.body.year);
      autoObj.Price = parseInt(req.body.price);
    } else {
      var newId = 0;
      auto.forEach(function (a) {
        if (a.Id > newId)
          newId = a.Id;
      });

      auto.push({
        Id: ++newId,
        Name: req.body.name,
        Year: req.body.year,
        Price: req.body.price
      });
    }

    res.redirect('/');
});

/** Модификация данных машины */
app.get('/edit/:id', function(req, res) {
  const index = indexById(req.params.id);
  if (index >= 0) {
    const auto2edit = auto[index];
    res.render('pages/auto', {auto: auto2edit});
  }
});

/** Удаление машины */
app.get('/delete/:id', function(req, res) {
  const index = indexById(req.params.id);
  if (index >= 0) {
      auto.splice(index, 1);
  }
  res.redirect('/');
});

/** Поиск индекса в массиве машин по Id машины */
function indexById(id) {
  let autoId = parseInt(id);
  return auto.map(function (a) {
    return a.Id === autoId;
  }).indexOf(true);
}

app.listen(8080);
console.log('8080 is the magic port');