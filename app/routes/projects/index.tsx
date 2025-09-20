import axios from "axios";
import type { Route } from "./+types/index";
import type { Project } from "~/Types/types";
import ProjectCard from "~/components/ProjectCard";

export async function loader({ request }: Route.LoaderArgs): Promise<{ projects: Project[] }> {
    try {
        const response = await axios.get(`http://localhost:8000/projects`);
        const data = response.data;

        if (!data) {
            throw new Error('Project not found');
        }

        return { projects: data };

    } catch (error) {
        console.error('Error loading project:', error);
        throw error;
    }
}


const ProjectsPage = ({ loaderData }: Route.ComponentProps) => {

    const { projects } = loaderData as { projects: Project[] };

    return (
        <>
            <h2 className="text-3xl text-white font-bold mb-8">
                Projects
            </h2>
            <div className="grid gap-6 sm:grid-cols-2">
                {projects.map((project) => (
                    <ProjectCard project={project} key={project.id} />
                ))}
            </div>
        </>
    );
}

export default ProjectsPage;