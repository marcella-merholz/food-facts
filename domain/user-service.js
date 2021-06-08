const UserRepository = require("../model/user-repository");
const userRepository = new UserRepository();

module.exports = class UserService {

    async getUsers() {
        // business logic here
        return await userRepository.getUsers();
    } 

    async register(userData) {
        let newEmail = userData.email;
        if (userRepository.getUserByEmail(newEmail) != null) {
            return res.status(403).json({
                message: 'diese Email-Adresse ist bereits registriert.'})
        }
        else ;
        

        // prüfen ob email schon existiert userRepository.getUserByEmail() (??? req,res if res>0 ...)
        // wenn nicht, password hashen 
        // userRepository.saveUser()
    }

    hashPassword() {

    }

}