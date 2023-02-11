import { Assignment, School } from ".";

type Course = {
    id: number;
    name: string;
    assignments: Assignment[];

    join_code: string;
    school: School;
    units: {
        id: number;
        name: string;
        description: string;
    }[],

    featured_teacher: {
        id: number;
        name: string;
        email: string;
        image: string;
    }
};

export default Course;