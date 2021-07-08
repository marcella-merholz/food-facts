const UserRepository = require("../model/user-repository");
const userRepository = new UserRepository();
const UserChallengeRepository = require("../model/userChallenge-repository");
const userChallengeRepository = new UserChallengeRepository();

module.exports = class UserChallengeService {

    // challenge.html --------------------------------------------------------------------------- //
    async setUserChallenge(challengeId, duration, userId) {
        await userChallengeRepository.setUserChallenge(challengeId, duration, userId);
    }

    // userSettings.html --------------------------------------------------------------------------- //
    async getUserChallenges(userId) {
        return await userChallengeRepository.getUserChallenges(userId);
    }

    async updateSelected(id, status) {
        await userChallengeRepository.updateSelected(id, status);
    }

    async getUserPoints(userId) {
        return await userChallengeRepository.getUserPoints(userId);
    }

    async cancelChallenge(userId, status) {
        await userChallengeRepository.cancelChallenge(userId, status);
    }

}