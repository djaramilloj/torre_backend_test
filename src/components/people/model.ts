export interface Person {
    username: string;
    skills?: Skill[];
}

export interface Skill {
    name: string;
    proficiency: 'master' | 'expert' | 'proficient' | 'novice' | 'no-experience-interested';
}