<template>
    <div class="meta-item" v-if="project.tools && project.tools.length">
        <h4 class="h4">Tools & Technologies</h4>
        <ul class="tools-list">
            <li v-for="tool in project.tools" :key="getToolName(tool)" class="tool-tag">
                <ion-icon v-if="getToolIcon(tool)" :name="getToolIcon(tool)" class="tool-icon"></ion-icon>
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
</style>
