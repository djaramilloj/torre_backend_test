import { HttpStatusCode, ServiceError } from "../errorHandling/customErrors";
import axios from "axios"
import { Person, Skill } from "./model";

export class People {

    /**
     * 
     * @param username 
     * @returns data returned from Torre external API
     */
    async getPersonByUsername(username: string): Promise<{data: any, status: any}> {
        if (!username) throw new ServiceError(HttpStatusCode.BAD_REQUEST, 'Cant retrieve a person without a username');
        const responseThirdParty = await axios.get(`https://torre.bio/api/bios/${username}`);
        return responseThirdParty;
    }

    /**
     * 
     * @param userOne 
     * @param userTwo 
     * @param skills skills related to the opportunity 
     * 
     * Compares two users to check who is better match for an opportunity
     */
    async compareUsersForOpportunityFit(userOne: Person, userTwo: Person, skills: Skill[]): Promise<Person> {
        if (!userOne.skills || !userTwo.skills || !skills) throw new ServiceError(HttpStatusCode.BAD_REQUEST, 'Cant compare users without skills of every user and the opportunity');
        const numberMatchesUserOne = this.getNumberOfMatches(userOne.skills, skills);
        const numberMatchesUserTwo = this.getNumberOfMatches(userTwo.skills, skills);
        return numberMatchesUserOne > numberMatchesUserTwo ? userOne : userTwo;
    }

    /**
     * 
     * @param skillsOne skills from a person
     * @param skillsTwo skills from opportunity
     */
    private getNumberOfMatches(skillsOne: Skill[], skillsTwo: Skill[]): Number {
        const filteredMatches = skillsOne.filter(skill => {
            const skillPresentInOpportunity = skillsTwo.some(skl => skl.name.toLowerCase() == skill.name.toLowerCase());
            return skillPresentInOpportunity ? true : false; 
        });
        return filteredMatches.length;
    }
}