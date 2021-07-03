const UserChallengeService = require("../domain/userChallenge-service");
const userChallengeService = new UserChallengeService();

module.exports = class UserChallengeController {

    // challenge.html --------------------------------------------------------------------------- //
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

    
    // userSettings.html --------------------------------------------------------------------------- //
    async getUserChallenges() {
        return await userChallengeService.getUserChallenges();
    }

    async checkSelectedUserChallenges(reqBody) {
        const { userChallenges } = reqBody;
        for (const userChallenge of userChallenges) {
            if (userChallenge.status === true) {
                const userChallenges_ID = userChallenge.id;
                await userChallengeService.updateSelectedUserChallenges(userChallenges_ID);
            }
        }
    }

    async updateSelectedUserChallenges(reqBody) {
        const { id, status } = reqBody;
        await userChallengeService.updateSelectedUserChallenges(id, status);

    }

    async getUserPoints() {
        return await userChallengeService.getUserPoints();
    }


}