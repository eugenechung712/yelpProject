'use strict';

const proxyPath = '/api';

module.exports = function(app) {
  const express = require('express');
  const curlRequest = require('curl-request');
  // For options, see:
  // https://github.com/nodejitsu/node-http-proxy
  /*
  let proxy = require('http-proxy').createProxyServer({});

  proxy.on('error', function(err, req) {
    console.error(err, req.url);
  });

  app.use(proxyPath, function(req, res, next){
    // include root path in proxied request
    req.url = proxyPath + '/' + req.url;
    proxy.web(req, res, { target: '' });
  });
  */
  app.use(express.json());
  app.use(proxyPath, function(req, res, next){
    // include root path in proxied request
    const curl = new (curlRequest)();
    req.body.variables = JSON.stringify(req.body.variables);

    curl
      .setHeaders ([
        'Authorization: Bearer KebdqiLNQIZnE4XXAnf5rNdLy6YVeS7ruPoFJMRF0CepwONBVekpfKGiKfsGWkanR05ZEFAv8HUZzFHu6TIFvaMSiV4ioLyd0X8kNjLSfWUSmwBx9zE6sdRU6p2XXXYx'
      ])
      .setBody(req.body)
      .post('https://api.yelp.com/v3/graphql')
      .then(({ statusCode, body, headers }) => {
        res.send(body);
        console.log(statusCode, body, headers);
      })
      ;
  });
};
