import 'babel-polyfill';
import path from 'path';
import Koa from 'koa';
import ks from 'koa-static';
import send from 'koa-send';
import bodyParser from 'koa-bodyparser';
import apiRoutes from './routes/api';

const app = new Koa();

app.use( async ( ctx, next ) => {
  try {
    return await next();
  } catch( err ) {
    ctx.status = parseInt( err.status, 10 ) || ctx.status || 500;
    ctx.body = { message: err.message || 'Unknown Error' };
  }
});

app.use( ks( './public' ) );

app.use( bodyParser({
  onerror: ( err, ctx ) => {
    ctx.throw( `body parse error`, 422 );
  }
}));

app.use( apiRoutes.routes() );

// UI
app.use( async ( ctx, next ) => {
  await send( ctx, path.join( __dirname, '../../public/index.html' ) );
});

app.listen( process.env.PORT || 3000 );

