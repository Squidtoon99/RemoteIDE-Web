import {getProjects} from "@dash/components";
import {Questrial} from "@next/font/google";
import ProjectCard from "@dash/projects/ProjectCard";
import {Project} from "@types";

const title = Questrial({
    weight: "400",
    style: "normal",
    subsets: ["latin"],
});

const Projects = async () => {
    const projects = await getProjects();
    return (
        <div className="flex flex-col">
            <div className="flex flex-row my-2">
                <div className="flex flex-col w-1/2">
                    <h1 className="text-3xl" style={title.style}>Projects</h1>
                </div>
                <div className="flex flex-col w-1/2">
                    <input type="text" placeholder="Search" className="bg-light rounded-md max-w-lg p-2 min-w-fit w-1/4"/>
                </div>
            </div>
            <div className="flex flex-col gap-3">
                {projects && projects.map((project: Project) => {
                    return <ProjectCard project={project} key={project.id} />;
                }
                )}
            </div>
        </div>
    );
}

export default Projects;