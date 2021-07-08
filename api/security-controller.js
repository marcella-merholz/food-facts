const SecurityService = require("../domain/security-service");
const securityService = new SecurityService();

module.exports = class SecurityController {

    async isUserValid(res, sessionId) {
        return await securityService.isUserValid(res, sessionId);
    }

}