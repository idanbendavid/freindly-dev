import type { Project } from "~/Types/types";
import type { Route } from "./+types/index";
import FeaturedProjects from "~/components/featuredProjects";
import axios from "axios";
import AboutPreview from "~/components/AboutPreview";
import type { PostsMeta } from "~/Types/postsMeta";



export function meta({ }: Route.MetaArgs) {
  return [
    { title: "The Friendly Dev | Welcome" },
    { name: "description", content: "custom wbesite development" },
  ];
}


export async function loader({ request }: Route.LoaderArgs): Promise<{ projects: Project[] }> {
  try {
    const response = await axios.get(`http://localhost:8000/projects`);
    const data = response.data;

    if (!data) {
      throw new Error('Project not found');
    }

    return { projects: data }
  }

  catch (error) {
    console.error('Error loading project:', error);
    throw error;
  }
}


const HomePage = ({ loaderData }: Route.ComponentProps) => {

  const { projects } = loaderData;

  return (
    <>
      <FeaturedProjects projects={projects} count={2} />
      <AboutPreview />
    </>
  );
}

export default HomePage
