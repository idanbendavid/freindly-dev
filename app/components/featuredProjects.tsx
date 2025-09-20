import type { FeaturedProjecstProps } from "~/Types/featuredprojects";
import ProjectCard from "./ProjectCard";

const FeaturedProjects = ({ projects, count = 4 }: FeaturedProjecstProps) => {

    const featured = projects.filter((p) => p.featured).slice(0,count);

    return (
        <section>
            <h2 className="text-2xl font-bold mb-6">
                Featured Projects
            </h2>

            <div className="grid gap-6 sm:grid-col-2">
                {featured.map((project)=>(
                    <ProjectCard key={project.id} project={project}/>
                ))}
            </div>
        </section>
    );
}

export default FeaturedProjects;