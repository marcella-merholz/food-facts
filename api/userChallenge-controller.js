const UserChallengeService = require("../domain/userChallenge-service");
const userChallengeService = new UserChallengeService();

module.exports = class UserChallengeController {

    async checkSelected(reqBody) {
        const { challenges, duration } = reqBody;
        for (const challenge of challenges) {
            if (challenge.status === true) {
                const challengeId = challenge.id;
                await userChallengeService.setUserChallenge(challengeId, duration);
            }
        }
    }

    async getUserChallenges() {
        return await userChallengeService.getUserChallenges();
    }


}