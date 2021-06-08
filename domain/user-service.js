const UserRepository = require("../model/user-repository");
const userRepository = new UserRepository();

module.exports = class UserService {

    async getUsers() {
        // business logic here
        return await userRepository.getUsers();
    } 

    async register(reqBody) {
        // prüfen ob email schon existiert userRepository.getUserByEmail()
        // wenn nicht, password hashen 
        // userRepository.saveUser()
    }

    hashPassword() {

    }

}