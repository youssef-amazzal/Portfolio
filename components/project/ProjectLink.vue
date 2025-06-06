<template>
    <div class="meta-item" v-if="project.projectLink">
        <h4 class="h4">Project Link</h4>
        <a :href="project.projectLink" target="_blank" rel="noopener noreferrer" class="project-link">
            <ion-icon name="link-outline" class="link-icon"></ion-icon>
            View Project
            <ion-icon name="open-outline" class="external-icon"></ion-icon>
        </a>
    </div>
</template>

<script setup>
defineProps({
    project: {
        type: Object,
        required: true
    }
})
</script>

<style scoped>
.meta-item h4 {
    color: var(--primary-color);
    margin-bottom: 8px;
    font-size: var(--fs-7);
    text-transform: uppercase;
    letter-spacing: 1px;
}

.project-link {
    color: var(--primary-color);
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 8px 16px;
    border: 1px solid var(--primary-color);
    border-radius: 8px;
    font-size: var(--fs-6);
    font-weight: var(--fw-500);
    transition: var(--transition-1);
}

.project-link:hover {
    background: var(--primary-color);
    color: var(--eerie-black-1);
}

.link-icon {
    font-size: 16px;
}

.external-icon {
    font-size: 12px;
    opacity: 0.7;
}
</style>
