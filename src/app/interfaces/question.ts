export interface Question{
    title:string;
    question:string;
    answer:number;
    answers:string[];
    answerDescription:string;
    topic?:string;
    id?:string;
}