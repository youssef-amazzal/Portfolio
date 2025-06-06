import { readFileSync } from 'fs'
import { join } from 'path'

export default defineEventHandler(async (event) => {
    try {
        // Read the projects.json file from the public directory
        const projectsPath = join(process.cwd(), 'public', 'data', 'projects.json')
        const projectsData = readFileSync(projectsPath, 'utf-8')
        const projects = JSON.parse(projectsData)
        
        return projects
    } catch (error) {
        throw createError({
            statusCode: 500,
            statusMessage: 'Failed to load projects data'
        })
    }
})
