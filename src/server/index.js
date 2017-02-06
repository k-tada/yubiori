import 'babel-polyfill';
import Koa from 'koa';
import ks from 'koa-static';
import apiRoutes from './routes/api';
import clientRoutes from './routes/client';
import bodyParser from 'koa-bodyparser';

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

app.use( clientRoutes );

app.listen( process.env.PORT || 3000 );

