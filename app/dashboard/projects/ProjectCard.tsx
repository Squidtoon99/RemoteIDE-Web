import {Project} from "@types";
import Link from "next/link";

const ProjectCard = ({ project }: {project: Project;}) => {
    return (
        <Link href={`/d/courses/${project.assignment.course_id}/proxy-svc/${project.assignment_id}`}>
            <div className="flex flex-col bg-light rounded-md p-4">
                <div className="flex flex-row">
                    <div className="flex flex-col w-1/2">
                        <h1 className="text-2xl font-extrabold text-primary">{project.assignment.name}</h1>
                    </div>
                    <div className="flex flex-col w-1/2">
                        <h1 className="text-2xl font-extrabold">{project.assignment.description}</h1>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default ProjectCard;