import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'td',
  classNameBindings: ['notCurrent', 'hasValue'],
  notCurrent: Ember.computed('day.currMonth', function () {
    return !this.get('day.currMonth');
  }),
  hasValue: Ember.computed('day.value', function () {
    return this.get('day.value');   
  }),
  click() {
    var date = this.get('day.date'); // YYYY-MM-DD

    if (this.get('day.currMonth') && moment().isSameOrAfter(date)) {
      var value = !this.get('day.value');
      this.set('day.value', value);
      this.get('markDay')(date, value);
    }
  }
});
