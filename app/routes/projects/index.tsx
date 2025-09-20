import axios from "axios";
import { useState } from "react";
import type { Route } from "./+types/index";
import type { Project } from "~/Types/types";
import ProjectCard from "~/components/ProjectCard";
import Pagination from "~/components/Pagination";

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

    const [selectedCategory, setSelectedCategory] = useState('All');
    const [currentPage, setCurrentPage] = useState(1);
    const projectsPerPage = 10;

    const { projects } = loaderData as { projects: Project[] };

    // get unique categories
    const categories = ['All', ...new Set(projects.map((project) => project.category))];

    // filter projects based on categories
    const filteredProjects = selectedCategory === 'All' ? projects : projects.filter((project) => project.category === selectedCategory);

    // calculate total pages
    const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);

    // get current pages projects
    const indexOfLast = currentPage * projectsPerPage;
    const indexOfFirst = indexOfLast - projectsPerPage;
    const currentProjects = filteredProjects.slice(indexOfFirst, indexOfLast);


    return (
        <>
            <h2 className="text-3xl text-white font-bold mb-8">
                Projects
            </h2>

            <div className="flex flex-wrap gap-2 mb-8">
                {categories.map((category) => (
                    <button key={category} onClick={() => {setSelectedCategory(category); setCurrentPage(1)}} 
                    className={`px-3 py-1 rounded text-sm cursor-pointer ${selectedCategory === category ? 'bg-blue-600 text-white': 'bg-gray-700 text-gra-200'}`}>
                        {category}
                    </button>
                ))}
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
                {currentProjects.map((project) => (
                    <ProjectCard project={project} key={project.id} />
                ))}
            </div>
            <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={setCurrentPage} />
        </>
    );
}

export default ProjectsPage;