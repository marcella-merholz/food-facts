const UserService = require("../domain/user-service");
const userService = new UserService();

module.exports = class UserController {

    async getUsers() {
        // coordinate interaction with domain here (f.e. call service methods)
        return await userService.getUsers();
    }

    async register(reqBody) {
        const { username, email, password, passwordConfirmation } = reqBody;
        this.checkPassword(password, passwordConfirmation);
        await this.checkUserExists(email);
        await userService.registerUser(username, email, password);
    }

    checkPassword(password, passwordConfirmation) {
        if (password !== passwordConfirmation) {
            throw {
                name: 'checkPassword Error',
                message: 'Passwort stimmt nicht überein.'
            }
        }
    }

    async checkUserExists(email) {
        let user = await userService.getUserByEmail(email)
        if (user != null && user.length > 0) {
            throw {
                name: 'checkUserExists Error',
                message: 'Diese Email-Adresse ist bereits registriert.'
            }
        }
    }

}

