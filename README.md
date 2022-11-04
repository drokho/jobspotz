# jobspotz
Map-based job search tool using Meteor, google Jobs api, and google Maps api

React Google Maps API Style Guide:
https://react-google-maps-api-docs.netlify.app/#section-introduction

deploy script: meteor deploy jobspotz.meteorapp.com --free --mongo

start scraper: node server/scraper.js


To create server functions to call from the client: 

server code:
Meteor.methods({
    foo({arg1, arg2}) {
      check(arg1, String);
      check(arg2, Number);
  
      return arg1;
    },
  
    bar() {
      // Do other stuff...
      return 'baz';
    },

    boing(oing) {
        return oing;
    }


  });

client code:
    Meteor.call('foo', {
            arg1: 'Hi', 
            arg2: 100
        }, (err, res) => {
        if (err) {
          console.log(err);
        } else {
          console.log(res);
        }
    });

    Meteor.call('bar', (err, res) => {
        if (err) {
          console.log(err);
        } else {
          console.log(res);
        }
    });

    Meteor.call('boing', ('Oingo Boingo'), (err, res) => {
        if (err) {
          console.log(err);
        } else {
          console.log(res);
        }
    });

    in order to add a new file to be run by the server, you have to import it into main.js. 