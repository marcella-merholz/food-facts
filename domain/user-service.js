const UserRepository = require("../model/user-repository");
const userRepository = new UserRepository();

module.exports = class UserService {

    async getUsers() {
        // business logic here
        return await userRepository.getUsers();
    } 

    async register(userData, res) {
        let newEmail = userData.email;
        let user = await userRepository.getUserByEmail(newEmail)
        if (user != null && user.length > 0)  {
            return res.status(403).json({
                message: 'diese Email-Adresse ist bereits registriert.'})
        }
        else 
            userRepository.addUser(userData);
            return res.status(200).json({message: 'Sie haben sich erfolgreich registriert.'})
        

        // prüfen ob email schon existiert userRepository.getUserByEmail() (??? req,res if res>0 ...)
        // wenn nicht, password hashen 
        // userRepository.saveUser()
    }

    hashPassword() {


    }

}