const UserRepository = require("../model/user-repository");
const userRepository = new UserRepository();
const bcrypt = require('bcryptjs');

module.exports = class UserService {

    async getUsers() {
        // business logic here
        return await userRepository.getUsers();
    }

    async register(userData, res) {
        let newEmail = userData.email;
        let user = await userRepository.getUserByEmail(newEmail)
        if (user != null && user.length > 0) {
            return res.status(403).json({
                message: 'diese Email-Adresse ist bereits registriert.'
            })
        } else {
            checkPassword(userData);
        }
    }

    checkPassword(userData) {
        if (userData.password !== userData.passwordConfirmation) {
            return res.render('user', {
                message: 'Passwort stimmt nicht überein.'
            });
        } else {
            hashPassword(userData);
        }
    }

    async hashPassword(userData) {
        let hashedPassword = await bcrypt.hash(userData.password, 8);
        console.log(hashedPassword);

        userRepository.addUser(userData);
        return res.status(200).json({ message: 'Sie haben sich erfolgreich registriert.' })
    }

}