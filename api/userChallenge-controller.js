const UserChallengeService = require("../domain/userChallenge-service");
const userChallengeService = new UserChallengeService();

module.exports = class UserChallengeController {

    // challenge.html --------------------------------------------------------------------------- //
    async checkSelected(userId, reqBody) {
        const { challenges, duration} = reqBody;
        const parUserId = userId;
        for (const challenge of challenges) {
            if (challenge.status === true) {
                const challengeId = challenge.id;
                await userChallengeService.setUserChallenge(challengeId, duration, parUserId);
            }
        }
    }

    // userSettings.html --------------------------------------------------------------------------- //
    async getUserChallenges(userId) {
        return await userChallengeService.getUserChallenges(userId);
    }

    async updateSelected(reqBody) {
        const { id, status } = reqBody;
        await userChallengeService.updateSelected(id, status);
    }

    async getUserPoints(userId) {
        return await userChallengeService.getUserPoints(userId);
    }

    async cancelChallenge(reqBody) {
        const { userId, status } = reqBody;
        await userChallengeService.cancelChallenge(userId, status);
    }

    /*
    async checkSelectedUserChallenges(reqBody) {
        const { userChallenges } = reqBody;
        for (const userChallenge of userChallenges) {
            if (userChallenge.status === true) {
                const userChallenges_ID = userChallenge.id;
                await userChallengeService.updateSelectedUserChallenges(userChallenges_ID);
            }
        }
    }
    */

}