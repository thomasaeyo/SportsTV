import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';


// nba
Template.nba.onCreated(function nbaOnCreated() {

  this.variable = ReactiveVar("");

});

Template.nba.helpers({
	variable() {
    return Template.instance().variable.get();
  },
});

Template.nba.events({
  'click button'(event, instance) {
	var request = new Request("https://www.reddit.com/r/nbastreams/top/.json");
	fetch(request).then(function(response) {
  		return response.text();
	}).then(function(text) {

		var obj = JSON.parse(text);
		var commentURL = obj.data.children[0].data.url + "comments/.json"

		var commentRequest = new Request(commentURL);
		console.log(commentURL);

		fetch(commentRequest).then(function(response) {
	  		return response.text();
		}).then(function(text) {
			var firstPostComments = JSON.parse(text);
			var body = firstPostComments[1].data.children[2].data.body;
			instance.variable.set(body.substring(body.indexOf("(") +1, body.indexOf(")")));
		});
	});
  },
});

// Template.nba.events({
//   'click button'(event, instance) {
//     // increment the counter when button is clicked
//     instance.variable.set(instance.variable.get());
//   },
// });

// Template.hello.onCreated(function helloOnCreated() {
//   // counter starts at 0
//   this.counter = new ReactiveVar(0);
// });

// Template.hello.helpers({
//   counter() {
//     return Template.instance().counter.get();
//   },
// });

// Template.hello.events({
//   'click button'(event, instance) {
//     // increment the counter when button is clicked
//     instance.counter.set(instance.counter.get() + 1);
//   },
// });
