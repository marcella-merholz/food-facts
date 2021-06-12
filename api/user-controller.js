const UserService = require("../domain/user-service");
const userService = new UserService();

module.exports = class UserController {
    
    async getUsers() {
        // coordinate interaction with domain here (f.e. call service methods)
        return await userService.getUsers();
    }

    async register(reqBody, res) {
        let username = reqBody.username;
        let email = reqBody.email;
        let password = reqBody.password;
        let passwordConfirmation = reqBody.passwordConfirmation;
        let userData = { username, email, password, passwordConfirmation };
        await userService.register(userData, res);
    }

}

