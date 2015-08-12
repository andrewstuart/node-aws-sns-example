var aws = require('aws-sdk');
var q = require('q');
var _ = require('lodash');

var sns = new aws.SNS({
  region: 'us-west-1'
});

q.ninvoke(sns, 'listTopics').then(function(t) {
  'use strict';

  var msgsSent = _.map(t.Topics, function(topic) {
    return q.ninvoke(sns, 'publish', {
      Message: 'Hey There, this is a message.',
      Subject: 'Test Node SNS Message',
      TopicArn: topic.TopicArn
    });
  });

  return q.all(msgsSent);
})
.then(function() {
  console.log('done');
})
.catch(function(e){
  console.log(e);
});
