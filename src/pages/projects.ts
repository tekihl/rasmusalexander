
import { client } from "../sanity/sanityClient"
import { allProjectsQuery } from "../sanity/queries/projects"

export async function loadProjects() {
  const projects = await client.fetch(allProjectsQuery)
  console.log(projects)
}


