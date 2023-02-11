import Course from "./course";
import School from "./school";

type User = {
    id: number;
    name: string;
    email: string;
    image: string;
    is_teacher: boolean;
    courses: Course[];
    school: School;
    projects: {
        id: number;
        assignment_id: number;
    }[];
};

export default User;