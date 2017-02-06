import 'babel-polyfill';
import Router from 'koa-router';
import axios from 'axios';
import qs from 'querystring';
import auth from './apis/auth';

const route = new Router();

route.use( '/api', auth.routes(), auth.allowedMethods() );

export default route;


