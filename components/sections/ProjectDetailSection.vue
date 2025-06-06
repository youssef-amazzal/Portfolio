<template>
    <article class="project-detail" data-page="project-detail">
        <ProjectHeader :project="project" @back="goBack" />

        <section class="project-content">
            <!-- Layout for vertical images: side-by-side on desktop -->
            <div v-if="isVerticalLayout" class="project-content-vertical">
                <div class="project-hero-vertical">
                    <ProjectHero :project="project" />
                </div>
                <div class="project-info-vertical">
                    <ProjectDescription :project="project" />
                    <div class="project-meta-container">
                        <ProjectMeta :project="project" />
                        <ProjectTools v-if="project.tools && project.tools.length" :project="project" />
                        <ProjectClient v-if="project.client || (project.clients && project.clients.length)"
                            :project="project" />
                        <ProjectLink v-if="project.projectLink" :project="project" />
                    </div>
                </div>
            </div>

            <!-- Default layout for horizontal/square images -->
            <div v-else>
                <ProjectHero :project="project" />
                <div class="project-info-grid">
                    <div class="project-info-left">
                        <ProjectDescription :project="project" />
                    </div>
                    <div class="project-info-right">
                        <ProjectMeta :project="project" />
                        <ProjectTools v-if="project.tools && project.tools.length" :project="project" />
                        <ProjectClient v-if="project.client || (project.clients && project.clients.length)"
                            :project="project" />
                        <ProjectLink v-if="project.projectLink" :project="project" />
                    </div>
                </div>
            </div>

            <ProjectGallery :project="project" />
        </section>
    </article>
</template>

<script setup>
import { computed } from 'vue'
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

// Determine if we should use vertical layout based on aspect ratio
const isVerticalLayout = computed(() => {
    return props.project.aspectRatio === 'vertical'
})
</script>

<style scoped>
.project-detail {
    display: block;
}

.project-content {
    width: 100%;
    padding-bottom: 20px;
}

/* Default layout for horizontal/square images */
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

/* Vertical layout for vertical aspect ratio images */
.project-content-vertical {
    display: grid;
    gap: 30px;
    margin-bottom: 40px;
}

.project-hero-vertical {
    display: flex;
    justify-content: center;
}

.project-info-vertical {
    display: flex;
    flex-direction: column;
    gap: 30px;
}

.project-meta-container {
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

    /* Vertical layout: side-by-side on desktop */
    .project-content-vertical {
        grid-template-columns: 1fr 1.5fr;
        gap: 40px;
        align-items: start;
    }

    .project-hero-vertical {
        position: sticky;
        top: 20px;
    }
}

@media (min-width: 1024px) {
    .project-content-vertical {
        grid-template-columns: 1fr 2fr;
        gap: 50px;
    }
}
</style>
