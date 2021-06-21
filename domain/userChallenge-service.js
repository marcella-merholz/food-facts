const UserChallengeRepository = require("../model/userChallenge-repository");
const userChallengeRepository = new UserChallengeRepository();

module.exports = class UserChallengeService {

    async setUserChallenge(challengeId) {
        console.log(challengeId);
        await userChallengeRepository.setUserChallenge(challengeId);
    }

    async getUserChallenges() {
        return await userChallengeRepository.getUserChallenges();
    }

}