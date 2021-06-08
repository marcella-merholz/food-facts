const UserService = require("../domain/user-service");
const userService = new UserService();

module.exports = class UserController {
    async getUsers() {
        // coordinate interaction with domain here (f.e. call service methods)
        return await userService.getUsers();
    }

    async register(reqBody) {
        let username = reqBody.username;
        let email = reqBody.email;
        let password = reqBody.password;
        let userData = { username, email, password };
        userService.register(userData);
    }

}
