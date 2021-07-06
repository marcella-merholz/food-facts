const UserChallengeRepository = require("../model/userChallenge-repository");
const userChallengeRepository = new UserChallengeRepository();

module.exports = class UserChallengeService {

    // challenge.html --------------------------------------------------------------------------- //
    async setUserChallenge(challengeId, duration) {
        await userChallengeRepository.setUserChallenge(challengeId, duration);
    }

    async getUserChallenges() {
        return await userChallengeRepository.getUserChallenges();
    }

    // userSettings.html --------------------------------------------------------------------------- //
    async getUserChallenges() {
        return await userChallengeRepository.getUserChallenges();
    }

    async updateSelectedUserChallenges(id, status) {
        await userChallengeRepository.updateSelectedUserChallenges(id, status);
    }

    async cancelChallenge(userId, status) {
        await userChallengeRepository.cancelChallenge(userId, status);
    }

    async getUserPoints() {
        return await userChallengeRepository.getUserPoints();
    }


}