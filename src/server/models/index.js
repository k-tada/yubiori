import conf from 'config';
import mongoose from 'mongoose';
import { logger } from '../utils/logger';

mongoose.connect( conf.mongo.url );

mongoose.connection.on( 'connected', () => {
  logger.info( `[Mongoose] Connected to ${ conf.mongo.url }` );
});
mongoose.connection.on( 'error', err => {
  logger.error( `[Mongoose] Failed: ${ err }` );
});
mongoose.connection.on( 'disconnected', () => {
  logger.info( `[Mongoose] Disconnected from ${ conf.mongo.url }` );
});

process.on( 'SIGINT', () => {
  mongoose.connection.close( () => {
    logger.info( `[Mongoose] Disonnected from ${ conf.mongo.url } through app termination` );
    process.exit( 0 );
  });
});
