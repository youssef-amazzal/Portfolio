// Tool to DevIcon mapping - Only includes tools used in projects and resume
const toolIconMap = {
  // Programming Languages
  'Java': 'devicon:java',
  'C++': 'devicon:cplusplus', 
  'JavaScript': 'devicon:javascript',
  'Dart': 'devicon:dart',

  // Frameworks & Libraries
  'Spring Boot': 'devicon:spring',
  'Spring': 'devicon:spring',
  'Flutter': 'devicon:flutter',
  'JavaFX': 'devicon:java', // JavaFX uses Java icon
  'Vue.js': 'devicon:vuejs',
  'Vue': 'devicon:vuejs',
  'Electron': 'devicon:electron',
  'Tailwind CSS': 'devicon:tailwindcss',

  // Databases
  'MySQL': 'devicon:mysql',
  'PostgreSQL': 'devicon:postgresql',
  'SQLite': 'devicon:sqlite',
  'Sqlite': 'devicon:sqlite',
  'Supabase': 'devicon:supabase',

  // Tools & Environments
  'Git': 'devicon:git',
  'Docker': 'devicon:docker',
  'Node.js': 'devicon:nodejs',

  // Design Tools
  'Adobe Photoshop': 'devicon:photoshop',
  'Adobe Illustrator': 'devicon:illustrator',

  // Special cases with variations
  'Java/JavaFX': 'devicon:java'
}

export const useToolIcons = () => {
  const getToolName = (tool) => {
    return typeof tool === 'string' ? tool : (tool?.name || '')
  }

  const getDevIconName = (tool) => {
    const toolName = getToolName(tool)
    if (typeof toolName !== 'string' || !toolName) {
      return null
    }
    
    // Normalize the tool name by trimming
    const normalizedName = toolName.trim()
    
    // Direct match
    if (toolIconMap[normalizedName]) {
      return toolIconMap[normalizedName]
    }
    
    // Case-insensitive match
    const lowerCaseName = normalizedName.toLowerCase()
    for (const [key, value] of Object.entries(toolIconMap)) {
      if (key.toLowerCase() === lowerCaseName) {
        return value
      }
    }
    
    // Return null if no match found
    return null
  }

  const hasDevIcon = (tool) => {
    return getDevIconName(tool) !== null
  }

  const getStaticIconPath = (tool) => {
    const toolName = getToolName(tool)
    if (typeof tool === 'object' && tool?.icon) {
      return tool.icon
    }
    return null
  }

  const hasStaticIcon = (tool) => {
    return getStaticIconPath(tool) !== null
  }

  const getIconType = (tool) => {
    if (hasDevIcon(tool)) return 'devicon'
    if (hasStaticIcon(tool)) return 'static'
    return 'none'
  }

  return {
    getToolName,
    getDevIconName,
    hasDevIcon,
    getStaticIconPath,
    hasStaticIcon,
    getIconType,
    toolIconMap
  }
}
