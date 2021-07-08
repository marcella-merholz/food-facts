const UserRepository = require("../model/user-repository");
const userRepository = new UserRepository();

module.exports = class SecurityService {

    async isUserValid(res, sessionId) {
        const userSession = await userRepository.getUserIdBySessionId(res, sessionId);
        if (userSession.length === 0) {
            res.status(403).json({ message: 'Access denied!' });
            return null;
          } else {
            return userSession[0].UserID;
          }
    }

}