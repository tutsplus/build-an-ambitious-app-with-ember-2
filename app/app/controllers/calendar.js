import Ember from 'ember';

export default Ember.Controller.extend({
  monthName: moment().format('MMMM YYYY')
});
