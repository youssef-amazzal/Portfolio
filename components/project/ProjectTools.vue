<template>
    <div class="meta-item" v-if="project.tools && project.tools.length">
        <h4 class="h4">Tools & Technologies</h4>
        <ul class="tools-list">
            <li v-for="tool in project.tools" :key="getToolName(tool)" class="tool-tag">
                <!-- Use DevIcon if available -->
                <Icon v-if="getDevIconName(tool)" :name="getDevIconName(tool)" class="tool-icon devicon" />
                <!-- Fallback to static image for tools without DevIcons -->
                <img v-else-if="getStaticIconPath(tool)" :src="getStaticIconPath(tool)" :alt="getToolName(tool)"
                    class="tool-icon tool-image" />
                {{ getToolName(tool) }}
            </li>
        </ul>
    </div>
</template>

<script setup>
import { useToolIcons } from '~/composables/useToolIcons'

defineProps({
    project: {
        type: Object,
        required: true
    }
})

const { getToolName, getDevIconName, getStaticIconPath } = useToolIcons()
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
    flex-shrink: 0;
}

.tool-icon.devicon {
    width: 14px;
    height: 14px;
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
