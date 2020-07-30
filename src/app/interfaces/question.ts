export interface Question{
    title:string;
    description:string;
    answer:number;
    answers:string[];
    answerDescription:string;
    topic?:string;
    id?:string;
}