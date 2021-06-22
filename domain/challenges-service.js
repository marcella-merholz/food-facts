const ChallengesRepository = require("../model/challenges-repository");
const challengesRepository = new ChallengesRepository();

module.exports = class ChallengesService {

    async getChallenges() {
        return await challengesRepository.getChallenges();
    }

}