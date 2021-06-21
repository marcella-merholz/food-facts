const UserChallengeService = require("../domain/userChallenge-service");
const userChallengeService = new UserChallengeService();

module.exports = class UserChallengeController {

    async getSelected(reqBody) {
        const { challenge1, challenge2 } = reqBody;
        const challenges = [challenge1, challenge2];
        await this.checkSelected(challenges);
    }

    async checkSelected(challenges) {
        for (const challenge of challenges) {
            console.log(challenge.status);
            if (challenge.status === true) {
                const challengeId = challenge.id;
                await userChallengeService.setUserChallenge(challengeId);
            }
        }
    }

    async getUserChallenges() {
        return await userChallengeService.getUserChallenges();
    }


}