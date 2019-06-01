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
	}).then(function(response_text) {
		// TODO(jjffryan): find the link to open
		var response_json = JSON.parse(response_text);
		// var commentURL = response_json.data.children[0].data.url + "comments/.json"
		// (example link)
		var link = "http://buffstream.live/tv/watch-hbo-live-streaming.php"
		var commentRequest = new Request(link);

		// TODO(acejang1994, thomasaeyo): open (redirect) the video
		fetch(commentRequest).then(function(response) {
	  		return response.text();
		}).then(function(text) {
			var firstPostComments = JSON.parse(text);
			console.log("firstPostComments: ", firstPostComments); 
			var body = firstPostComments[1].data.children[2].data.body;
			var variable = body.substring(body.indexOf("(") +1, body.indexOf(")"));
			console.log("variable: ", variable); 
			instance.variable.set(variable);
		}).catch(function(error) {
			console.log("Caught error");
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
