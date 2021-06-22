const UserChallengeService = require("../domain/userChallenge-service");
const userChallengeService = new UserChallengeService();

module.exports = class UserChallengeController {

    async checkSelected(reqBody) {
        const { challenge1, challenge2, duration } = reqBody;
        const challenges = [challenge1, challenge2];
        for (const challenge of challenges) {
            console.log(challenge.status);
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