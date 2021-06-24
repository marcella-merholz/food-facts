const UserChallengeRepository = require("../model/userChallenge-repository");
const userChallengeRepository = new UserChallengeRepository();

module.exports = class UserChallengeService {

    async setUserChallenge(challengeId, duration) {
        await userChallengeRepository.setUserChallenge(challengeId, duration);
    }

    async getUserChallenges() {
        return await userChallengeRepository.getUserChallenges();
    }

}