import 'babel-polyfill';
import Router from 'koa-router';
import jwt from 'jsonwebtoken';
import Bcrypt from '../../utils/Bcrypt';
import '../../models';
import User from '../../models/user';

const route = new Router({
  prefix: '/auth',
});

route.post( '/signup', async ( ctx, next ) => {
  const { name, password } = ctx.request.body;

  if ( ! name || ! password ) {
    return ctx.throw( `Invalid parameter!`, 400 );
  }

  const current = await User.findOne({ name });
  if ( current && current.name.length > 0 ) {
    return ctx.throw( `User[ ${ current.name } ] is already exists!`, 400 );
  }

  const pass = await Bcrypt.create( password );
  const user = await User.create({ name, password: pass });

  ctx.body = {
    name: user.name,
    token: jwt.sign( { id: user.id, name: user.name }, process.env.SECRET_KEY_JWT ),
  };
});

route.post( '/login', async ( ctx, next ) => {
  const { name, password } = ctx.request.body;

  if ( ! name || ! password ) {
    return ctx.throw( `Invalid parameter!`, 400 );
  }

  const user = await User.findOne({ name });

  if ( ! user || ! user.name ) {
    return ctx.throw( `User not found!`, 401 );
  }

  if ( ! await Bcrypt.validate( password, user.password ) ) {
    return ctx.throw( `Uncorrect password!`, 401 );
  }

  ctx.body = {
    name: user.name,
    token: jwt.sign( { id: user.id, name: user.name }, process.env.SECRET_KEY_JWT ),
  };
});

route.get( '/login', async ( ctx, next ) => {
  const { headers } = ctx.request;
  if ( ! headers || ! headers.authorization ) {
    return ctx.throw( `Authorization failed!`, 401 );
  }

  const tokenHeader = headers.authorization.split(' ');
  let token = null;
  if ( ! ( /^Bearer$/i.test( tokenHeader[0] ) ) || ! tokenHeader[1] ) {
    return ctx.throw( `Authorization failed!`, 401 );
  }
  token = tokenHeader[1];

  const decoded = jwt.verify( token, process.env.SECRET_KEY_JWT );
  const user = await User.findById( decoded.id );

  if ( ! user || ! user.name ) {
    return ctx.throw( `User not found!`, 401 );
  }

  ctx.body = {
    name: user.name,
    token: jwt.sign( { id: user.id, name: user.name }, process.env.SECRET_KEY_JWT ),
  };
});

export default route;

