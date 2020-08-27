import Users from '../models/Users';
const { Strategy, ExtractJwt } = require("passport-jwt");
import SECRET from '../constant/secret';


const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: SECRET,
}

module.exports = passport => {
    passport.use(
        new Strategy(opts, async (payload, done) => {
            console.log(payload)
            await Users.findById(payload.user_id)
                .then(user => {
                    if (user) {
                        console.log(user)
                        return done(null, user);
                    }
                    return done(null, false);
                })
                .catch(err => {
                    return done(null, false);
            });
      })
    );
};


