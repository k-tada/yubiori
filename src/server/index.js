import 'babel-polyfill';
import Koa from 'koa';
import ks from 'koa-static';
import { renderToString } from 'react-dom/server';
import path from 'path';
import React, { createElement } from 'react';
import { match, RouterContext } from 'react-router';
import App from '../client/Main';
import clientRoutes from '../client/routes';

const app = new Koa();

app.use( ks( './public' ) );

app.use( async ( ctx, next ) => {
  // server-side rendering
  match({ routes: clientRoutes, location: ctx.request.url }, ( err, redirectLocation, renderProps ) => {
    if ( err ) {
      ctx.status = 500;
      ctx.body = err.message;
    } else if ( redirectLocation ) {
      ctx.redirect( redirectLocation.pathname + redirectLocation.search );
    } else if ( renderProps ) {
      ctx.body = `
        <div id="app">${ renderToString(<RouterContext { ...renderProps } />) }</div>
        <script src="/assets/bundle.js"></script>
      `;
    } else {
      ctx.status = 404;
      ctx.body = 'Not Found';
    }
  });
});

app.listen( 3030 );

