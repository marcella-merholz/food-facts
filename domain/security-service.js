const UserRepository = require("../model/user-repository");
const userRepository = new UserRepository();

module.exports = class SecurityService {

    async isUserValid(res, sessionId) {
        const userSession = await userRepository.getUserIdBySessionId(sessionId);
        console.log ("isUserValid", sessionId, userSession)

        if (userSession.length === 0) {
            res.status(403).json({ message: 'Access denied!' });
            return {accessAllowed: false, userID: null};
          } else {
            return {accessAllowed: true, userID: userSession[0].UserID};
          }
    }

}