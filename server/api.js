const express = require('express');
const Data = require('./data');

const calendar = Data('calendar', { hasMany: 'day' });
const day = Data('day');

var api = express.Router();

api.all('*', (req, res, next) => {
  if (req.headers.authorization !== 'Bearer stretch app token') {
    return res.status(401).send('unauthorized');
  }

  res.type('application/vnd.api+json');
  next();
});

api.route('/calendars')
  .get( (req, res) =>
    res.json({ data: calendar.all().map(calendar.res) }))
  .post( (req, res) =>
    res.json({ data: calendar.res(calendar.insert(req.body.data.attributes)) }));

api.route('/calendars/:id')
  .get( (req, res) =>
    res.json({ data: calendar.res(calendar.get(req.params.id)) }))
  .patch( (req, res) => {
    var data = req.body.data;
    res.json({ data: calendar.res(calendar.update(data.id, data.attributes)) });
  })
  .delete( (req, res) => {
    calendar.remove(req.params.id);
    res.json({
      data: {
        type: 'calendar',
        id: req.params.id
      }
    });
  });

api.route('/days')
  .post( (req, res) => {
    var data = req.body.data;
    var cal = calendar.get(data.relationships.calendar.data.id);
    var d = day.insert(data.attributes, cal);
    res.json({ data: day.res(d) });
  });

api.route('/days/:id')
  .get( (req, res) =>
    res.json({ data: day.res(day.get(req.params.id)) }))
  .patch( (req, res) => {
    var data = req.body.data;
    res.json({ data: day.res(day.update(data.id, data.attributes)) });
  });

module.exports = api;
