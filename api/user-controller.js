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
            throw{
                name: 'checkPasswordError',
                message: 'Passwort stimmt nicht überein.'
            }
        }
    }

    async checkUserExists(email) {
        const user = await userService.getUserByEmail(email);
        if (user != null) {
            throw {
                name: 'checkUserExistsError',
                message: 'Diese Email-Adresse ist bereits registriert.'
            }
        }
    }

    async login(reqBody) {
        const { email, password } = reqBody;
        const hashedPassword = userService.hashPassword(password);
        await this.verifyUser(email, hashedPassword);
    }

    async verifyUser(email, hashedPassword) {
        const user = await userService.getUserByEmail(email);
        if (user != null && hashedPassword === user.password) {
            console.log(user.password);
            // Session Handling Status auf eingelogged setzen
        } else {
            throw {
                name: 'verifyUserError',
                message: 'Falsches Passwort.'
            }
        }
    }

}

