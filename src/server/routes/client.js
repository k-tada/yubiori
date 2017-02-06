import 'babel-polyfill';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';
import routes from '../../client/routes';

const clientRoute = async ( ctx, next ) => {
  // server-side rendering
  match({ routes, location: ctx.request.url }, ( err, redirectLocation, renderProps ) => {
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
};

export default clientRoute;

