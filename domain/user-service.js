const UserRepository = require("../model/user-repository");
const userRepository = new UserRepository();
const bcrypt = require('bcryptjs');

module.exports = class UserService {

    async getUsers() {
        // business logic here
        return await userRepository.getUsers();
    }

    async registerUser(username, email, password) {
        const hashedPassword = this.hashPassword(password);
        userRepository.addUser(username, email, hashedPassword);
    }

    async getUserByEmail(email) {
        let user = await userRepository.getUserByEmail(email)
        return user;
    }

    async hashPassword(password) {
        let hashedPassword = await bcrypt.hash(password, 8);
        console.log(hashedPassword);
        return hashedPassword;
    }

}