<template>
    <article class="project-detail" data-page="project-detail">
        <ProjectHeader :project="project" @back="goBack" />

        <section class="project-content">
            <ProjectHero :project="project" />
            <div class="project-info-grid">
                <div class="project-info-left">
                    <ProjectDescription :project="project" />
                </div>                <div class="project-info-right">
                    <ProjectMeta :project="project" />
                    <ProjectTools v-if="project.tools && project.tools.length" :project="project" />
                    <ProjectClient v-if="project.client || (project.clients && project.clients.length)" :project="project" />
                    <ProjectLink v-if="project.projectLink" :project="project" />
                </div>
            </div>

            <ProjectGallery :project="project" />
        </section>
    </article>
</template>

<script setup>
import ProjectHeader from '~/components/project/ProjectHeader.vue'
import ProjectHero from '~/components/project/ProjectHero.vue'
import ProjectDescription from '~/components/project/ProjectDescription.vue'
import ProjectMeta from '~/components/project/ProjectMeta.vue'
import ProjectTools from '~/components/project/ProjectTools.vue'
import ProjectClient from '~/components/project/ProjectClient.vue'
import ProjectLink from '~/components/project/ProjectLink.vue'
import ProjectGallery from '~/components/project/ProjectGallery.vue'

const props = defineProps({
    project: {
        type: Object,
        required: true
    }
})

const emit = defineEmits(['back'])

const goBack = () => {
    emit('back')
}
</script>

<style scoped>
.project-detail {
    display: block;
}

.project-content {
    width: 100%;
    padding-bottom: 20px;
}

.project-info-grid {
    display: grid;
    gap: 30px;
    margin-bottom: 40px;
}

.project-info-left {
    display: flex;
    flex-direction: column;
    gap: 30px;
}

.project-info-right {
    display: flex;
    flex-direction: column;
    gap: 20px;
}

/* Responsive Design */
@media (min-width: 768px) {
    .project-info-grid {
        grid-template-columns: 2fr 1fr;
        gap: 40px;
    }
}
</style>
