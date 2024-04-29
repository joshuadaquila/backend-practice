const passport = require("passport");
const { Strategy } = require("passport-local");
const db = require("../database/index");

console.log("Currently in local strategy");

passport.use(
  new Strategy(
    {
      usernameField: 'username',
    }, 
    async (username, password, done) => {
      
      const userFind = await db.findOne({username});
      if(userFind){
        console.log("Im looking for the user.")
        if(userFind.password === password){
          console.log("Authenticated succesfully");
          const user = { id: userFind._id, username: userFind.username }; // Mocking a user object
          console.log("user", user);
          done(null, user);
        }else{
          console.log("Authentication Failed!");
          done(null, false);
        }
      }else{
        done(null, false);
      }
    } 
  )
);

passport.serializeUser(function(user, cb) {
  process.nextTick(function() {
    return cb(null, {
      id: user.id,
      username: user.username,
    });
  });
});

passport.deserializeUser(function(user, cb) {
  process.nextTick(function() {
    return cb(null, user);
  });
});
