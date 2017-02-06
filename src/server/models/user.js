import mongoose, { Schema } from 'mongoose';
import moment from 'moment';

const userSchema = new Schema({
  name: { type: String, required: true, trim: true },
  password: { type: String, required: true, trim: true },
  created_at: { type: Date },
  updated_at: { type: Date }
});

userSchema.pre( 'save', function( next ) {
  const now = moment();
  this.updated_at = now;
  if ( !this.created_at ) {
    this.created_at = now;
  }
  next();
});

export default mongoose.model( 'User', userSchema );

