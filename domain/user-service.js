const UserRepository = require("../model/user-repository");
const userRepository = new UserRepository();
const crypto = require('crypto');

module.exports = class UserService {

    async getUsers() {
        return await userRepository.getUsers();
    }

    async registerUser(username, email, password) {
        const hashedPassword = this.hashPassword(password);
        await userRepository.addUser(username, email, hashedPassword);
    }

    async getUserByEmail(email) {
        const user = await userRepository.getUserByEmail(email)
        return user;
    }

    hashPassword(password) {
        const sha = crypto.createHash('sha1');
        sha.update(password);
        const hashedPassword = sha.digest("hex");
        return hashedPassword;
    }

    async startSession(sessionID, userID) {
        await userRepository.startSession(sessionID, userID);
    }

}