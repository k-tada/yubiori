import 'babel-polyfill';
import Koa from 'koa';
import ks from 'koa-static';
import { renderToString } from 'react-dom/server';
import path from 'path';
import { createElement } from 'react';
import App from '../client/components/App';

const app = new Koa();

app.use( ks( path.join( __dirname, '..', 'public' ) ) );

app.use( async ( ctx, next ) => {
  // server-side rendering
  const renderedContent = renderToString(createElement( App ) );
  ctx.body = `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8">
    <title>SSR Sample</title>
  </head>
  <body>
    <div id="app">${ renderedContent }</div>
    <script src="/assets/bundle.js"></script>
  </body>
  </html>
  `;
});

app.listen( 3030 );

