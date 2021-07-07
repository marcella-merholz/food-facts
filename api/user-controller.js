const UserService = require("../domain/user-service");
const userService = new UserService();

const { v4: uuidv4 } = require('uuid');

module.exports = class UserController {

    async getUsers() {
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
                message: 'Passwort stimmt nicht überein!'
            }
        }
    }

    async checkUserExists(email) {
        const user = await userService.getUserByEmail(email);
        if (user != null) {
            throw {
                name: 'checkUserExistsError',
                message: 'Diese Email-Adresse ist bereits registriert!'
            }
        }
    }

    // brauchen wir res?
    async login(reqBody, res) {
        const { email, password } = reqBody;
        const hashedPassword = userService.hashPassword(password);
        const userID = await this.verifyUser(email, hashedPassword);
        const sessionID = uuidv4();
        console.log(sessionID);
        await userService.startSession(sessionID, userID);
        return sessionID;
    }

    async verifyUser(email, hashedPassword) {
        const user = await userService.getUserByEmail(email);
        if (user != null && hashedPassword === user.Password) {
            console.log(user.Password);
            return user.ID;
        } else {
            throw {
                name: 'verifyUserError',
                message: 'Falsches Passwort!'
            }
        }
    }

    async getSessionUser(sessionId) {
        return await userService.getSessionUser(sessionId);
    }

}

