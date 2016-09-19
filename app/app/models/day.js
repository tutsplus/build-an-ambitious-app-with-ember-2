import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo } from 'ember-data/relationships';

export default Model.extend({
  date: attr('string'), // YYYY-MM-DD
  value: attr('boolean', { defaultValue: false }),
  calendar: belongsTo('calendar')
});
