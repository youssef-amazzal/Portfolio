<template>
    <div class="meta-item" v-if="project.tools && project.tools.length">
        <h4 class="h4">Tools & Technologies</h4>
        <ul class="tools-list">
            <li v-for="tool in project.tools" :key="getToolName(tool)" class="tool-tag">
                <!-- Use img tag for .ico files or file paths -->
                <img v-if="isImageIcon(tool)" :src="getToolIcon(tool)" :alt="getToolName(tool)"
                    class="tool-icon tool-image" />
                <!-- Use ion-icon for ionicon names -->
                <ion-icon v-else-if="isIonIcon(tool)" :name="getToolIcon(tool)" class="tool-icon"></ion-icon>
                {{ getToolName(tool) }}
            </li>
        </ul>
    </div>
</template>

<script setup>
defineProps({
    project: {
        type: Object,
        required: true
    }
})

// Helper functions for tools
const getToolName = (tool) => {
    return typeof tool === 'string' ? tool : tool.name
}

const getToolIcon = (tool) => {
    return typeof tool === 'object' && tool.icon ? tool.icon : null
}

// Check if the icon is an image file (ico, png, jpg, svg, etc.)
const isImageIcon = (tool) => {
    const icon = getToolIcon(tool)
    if (!icon) return false

    // Check if it's a file path or has image extension
    return icon.includes('/') ||
        icon.endsWith('.ico') ||
        icon.endsWith('.png') ||
        icon.endsWith('.jpg') ||
        icon.endsWith('.jpeg') ||
        icon.endsWith('.svg') ||
        icon.endsWith('.webp')
}

// Check if the icon is an ionicon name
const isIonIcon = (tool) => {
    const icon = getToolIcon(tool)
    return icon && !isImageIcon(tool)
}
</script>

<style scoped>
.meta-item h4 {
    color: var(--primary-color);
    margin-bottom: 8px;
    font-size: var(--fs-7);
    text-transform: uppercase;
    letter-spacing: 1px;
}

.tools-list {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
}

.tool-tag {
    background: var(--jet);
    color: var(--light-gray);
    padding: 4px 12px;
    border-radius: 6px;
    font-size: var(--fs-7);
    font-weight: var(--fw-400);
    display: flex;
    align-items: center;
    gap: 6px;
}

.tool-icon {
    font-size: 14px;
    color: var(--primary-color);
}

.tool-image {
    width: 14px;
    height: 14px;
    object-fit: contain;
    filter: none;
}

/* Optional: Apply filter to make .ico files match the color scheme */
.tool-image.monochrome {
    filter: brightness(0) saturate(100%) invert(77%) sepia(18%) saturate(558%) hue-rotate(4deg) brightness(94%) contrast(86%);
}
</style>
