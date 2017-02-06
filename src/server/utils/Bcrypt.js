const bcrypt = require( 'bcryptjs' );

module.exports = {
  create: function( pass ) {
    return new Promise( ( resolve, reject ) => {
      bcrypt.genSalt( 10, ( err, salt ) => {
        bcrypt.hash( pass, salt, ( err, hash ) => {
          resolve( hash );
        });
      });
    });
  },
  validate: function( pass, hash ) {
    return new Promise( ( resolve, reject ) => {
      bcrypt.compare( pass, hash, ( err, res ) => {
        resolve( res );
      });
    });
  }
};


