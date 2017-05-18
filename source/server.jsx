import http from 'http';
import React from 'react';
//import firebase from 'firebase';
import { renderToString, renderToStaticMarkup } from 'react-dom/server';
//import { ServerRouter } from 'react-router';
import { StaticRouter } from 'react-router-dom';
import Pages from './pages/containers/Page';
import Layout from './pages/components/Layout';
/*firebase.initializeApp({
    apiKey: "AIzaSyCyrWlCYR0aevINBcCVOVi_oo1Khk1o5Dw",
    authDomain: "drarekam.firebaseapp.com",
    databaseURL: "https://drarekam.firebaseio.com",
    projectId: "drarekam",
    storageBucket: "drarekam.appspot.com",
    messagingSenderId: "166870839375"
  });*/
function requestHandler(request, response) {
  const context = {};
  let html = renderToString(
    <StaticRouter location={request.url} context={context}>
      <Pages />
    </StaticRouter>
  );

  response.setHeader('Content-Type', 'text/html');

  if (context.url) {
    response.writeHead(301, {
      Location: context.url,
    });
    response.end();
  }
  response.write(
  renderToStaticMarkup(
    <Layout title="Aplicación" content={html} />
  ),
);
  response.end();
}

const server = http.createServer(requestHandler);

server.listen(3000);
