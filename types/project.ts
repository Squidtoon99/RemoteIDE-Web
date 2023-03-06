import {Assignment} from "./index";

type Project = {
    id: number,
    fs_path: string,
    is_published: boolean,
    last_updated: Date,
    assignment_id: number,
    user_id: number
    blueprint: boolean;

    assignment: Assignment;
}

export default Project;