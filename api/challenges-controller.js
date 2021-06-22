const ChallengesService = require("../domain/challenges-service");
const challengesService = new ChallengesService();

module.exports = class ChallengesController {

    async getChallenges() {
        return await challengesService.getChallenges();
    }

}