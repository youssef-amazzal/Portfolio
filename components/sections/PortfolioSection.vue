<template>
    <!-- Portfolio Grid View -->
    <article v-if="!selectedProject" class="portfolio" data-page="portfolio">
        <header>
            <h2 class="h2 article-title">Portfolio</h2>
        </header>

        <!-- Loading State -->
        <section v-if="isLoading" class="projects">
            <div class="loading-state">
                <p>Loading portfolio projects...</p>
            </div>
        </section>

        <!-- Error State -->
        <section v-else-if="error" class="projects">
            <div class="error-state">
                <p>Error loading projects: {{ error }}</p>
                <button @click="refreshProjects" class="retry-btn">Retry</button>
            </div>
        </section>

        <!-- Projects Section -->
        <section v-else class="projects">
            <ul class="filter-list">
                <li class="filter-item" v-for="category in categories" :key="category">
                    <button :class="{ 'active': isActiveFilter(category) }" @click="setFilter(category)"
                        data-filter-btn>
                        {{ getDisplayName(category) }}
                    </button>
                </li>
            </ul>

            <div class="filter-select-box">
                <button class="filter-select" :class="{ 'active': isSelectOpen }" @click="toggleSelect" data-select>
                    <div class="select-value" data-selecct-value>{{ selectedFilterText }}</div>
                    <div class="select-icon">
                        <ion-icon name="chevron-down"></ion-icon>
                    </div>
                </button>

                <ul class="select-list" :class="{ 'active': isSelectOpen }">
                    <li class="select-item" v-for="category in categories" :key="category">
                        <button @click="selectFromDropdown(category)" data-select-item>{{ getDisplayName(category)
                            }}</button>
                    </li>
                </ul>
            </div>
            <ul class="project-list">
                <li class="project-item" :class="{
                    'active': shouldShowProject(project)
                }" v-for="project in projects" :key="project.id" data-filter-item :data-category="project.category">
                    <a href="#" @click.prevent="openProject(project)">
                        <figure class="project-img">
                            <div class="project-overlay">
                                <div class="project-info">
                                    <h3 class="project-title">{{ project.title }}</h3>
                                    <p class="project-category">{{ getDisplayName(project.category) }}</p>
                                </div>
                                <!-- <div class="project-item-icon-box">
                                    <ion-icon name="eye-outline"></ion-icon>
                                </div> -->
                            </div>
                            <img :src="project.image" :alt="project.title" loading="lazy">
                        </figure>
                    </a>
                </li>
            </ul>
        </section>
    </article>

    <!-- Project Detail View -->
    <ProjectDetailSection v-else :project="selectedProject" @back="closeProject" />
</template>

<script setup>
import { computed, ref, onMounted } from 'vue';
import { usePortfolioFilter } from '~/composables/usePortfolioFilter';
import { usePortfolioData } from '~/composables/usePortfolioData';
import ProjectDetailSection from './ProjectDetailSection.vue';

// State for project detail view
const selectedProject = ref(null);

// Load portfolio data dynamically
const {
    projects,
    isLoading,
    error,
    refreshProjects,
    fetchProjects
} = usePortfolioData();

// Initialize portfolio filter composable with dynamic data
const {
    selectedFilter,
    filteredItems,
    isSelectOpen,
    categories,
    setFilter,
    toggleSelect,
    closeSelect,
    isActiveFilter
} = usePortfolioFilter(projects);

// Initialize data on component mount
onMounted(() => {
    // Data will be auto-fetched by the composable
    // This is just for any additional initialization if needed
});

// Create display-friendly filter names
const filterDisplayNames = {
    'all': 'All',
    'development': 'Development',
    'design': 'Design'
};

// Computed property for dropdown display text
const selectedFilterText = computed(() => {
    return filterDisplayNames[selectedFilter.value] || 'Select category';
});

// Helper function to get display name for category
const getDisplayName = (category) => {
    return filterDisplayNames[category] || category;
};

// Function to handle dropdown selection
const selectFromDropdown = (category) => {
    setFilter(category);
    closeSelect();
};

// Function to check if project should be shown (for CSS classes)
const shouldShowProject = (project) => {
    return selectedFilter.value === 'all' || project.category === selectedFilter.value;
};

// Project navigation functions
const openProject = (project) => {
    selectedProject.value = project;
};

const closeProject = () => {
    selectedProject.value = null;
};
</script>

<style scoped>
/* Portfolio section styles */
.portfolio {
    height: 100%;
    display: flex;
    flex-direction: column;
    overflow: hidden;
}

.portfolio header {
    flex-shrink: 0;
    padding-bottom: 20px;
}

.projects {
    flex: 1;
    overflow-y: auto;
    overflow-x: hidden;
}

.article-title {
    margin-bottom: 30px;
}

/* Filter list */
.filter-list {
    display: none;
}

.filter-select-box {
    position: relative;
    margin-bottom: 25px;
}

.filter-select {
    background: var(--eerie-black-2);
    color: var(--light-gray);
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 12px 16px;
    border: 1px solid var(--jet);
    border-radius: 14px;
    font-size: var(--fs-6);
    font-weight: var(--fw-300);
}

.filter-select.active .select-icon {
    transform: rotate(0.5turn);
}

.select-list {
    background: var(--eerie-black-2);
    position: absolute;
    top: calc(100% + 6px);
    width: 100%;
    padding: 6px;
    border: 1px solid var(--jet);
    border-radius: 14px;
    z-index: 2;
    opacity: 0;
    visibility: hidden;
    pointer-events: none;
    transition: 0.15s ease-in-out;
}

.filter-select.active+.select-list,
.select-list.active {
    opacity: 1;
    visibility: visible;
    pointer-events: all;
}

.select-item button {
    background: var(--eerie-black-2);
    color: var(--light-gray);
    font-size: var(--fs-6);
    font-weight: var(--fw-300);
    text-transform: capitalize;
    width: 100%;
    padding: 8px 10px;
    border-radius: 8px;
}

.select-item button:hover {
    --eerie-black-2: hsl(240, 2%, 20%);
}

/* Project list - True Pinterest-style masonry layout */
.project-list {
    column-count: 1;
    column-gap: 5px;
    margin-bottom: 10px;
}

.project-item {
    display: none;
    break-inside: avoid;
    overflow: hidden;
    border-radius: 4px;
    transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    margin-bottom: 5px;
    width: 100%;
}

.project-item:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.project-item.active {
    display: block;
    animation: fadeInUp 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
}

/* Staggered animation delay for smoother appearance */
.project-item.active:nth-child(1) {
    animation-delay: 0.1s;
}

.project-item.active:nth-child(2) {
    animation-delay: 0.2s;
}

.project-item.active:nth-child(3) {
    animation-delay: 0.3s;
}

.project-item.active:nth-child(4) {
    animation-delay: 0.4s;
}

.project-item.active:nth-child(5) {
    animation-delay: 0.5s;
}

.project-item.active:nth-child(6) {
    animation-delay: 0.6s;
}

.project-item.active:nth-child(7) {
    animation-delay: 0.7s;
}

.project-item.active:nth-child(8) {
    animation-delay: 0.8s;
}

.project-item.active:nth-child(9) {
    animation-delay: 0.9s;
}

.project-item.active:nth-child(n+10) {
    animation-delay: 1s;
}

/* Different heights for true masonry effect - affects entire cards */
.project-item.height-short .project-img {
    height: 180px;
}

.project-item.height-medium .project-img {
    height: 240px;
}

.project-item.height-tall .project-img {
    height: 320px;
}

/* Additional content height variations for more natural masonry */
.project-item.height-short {
    min-height: auto;
}

.project-item.height-medium {
    min-height: auto;
}

.project-item.height-tall {
    min-height: auto;
}

@keyframes fadeInUp {
    0% {
        opacity: 0;
        transform: translateY(30px) scale(0.9);
    }

    100% {
        opacity: 1;
        transform: translateY(0) scale(1);
    }
}

@keyframes fadeOut {
    0% {
        opacity: 1;
        transform: translateY(0) scale(1);
    }

    100% {
        opacity: 0;
        transform: translateY(-20px) scale(0.9);
    }
}

.project-item>a {
    width: 100%;
    display: block;
}

.project-img {
    position: relative;
    width: 100%;
    overflow: hidden;
    border-radius: 4px;
}

/* Project overlay for hover effects */
.project-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(180deg, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.8) 100%);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 20px;
    opacity: 0;
    z-index: 2;
    transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.project-item:hover .project-overlay {
    opacity: 1;
}

/* Project info positioned at bottom */
.project-info {
    align-self: flex-end;
    width: 100%;
}

.project-info .project-title {
    color: var(--white-2);
    font-size: var(--fs-4);
    font-weight: var(--fw-500);
    text-transform: capitalize;
    text-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);
}

.project-info .project-category {
    color: var(--primary-color);
    font-size: var(--fs-6);
    font-weight: var(--fw-400);
    margin: 0;
    text-transform: uppercase;
    letter-spacing: 1px;
    text-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);
}

.project-item-icon-box {
    --scale: 0.8;
    background: rgba(255, 255, 255, 0.2);
    color: var(--white-2);
    align-self: flex-start;
    font-size: 20px;
    padding: 12px;
    border-radius: 50%;
    opacity: 0;
    transform: scale(var(--scale));
    transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    backdrop-filter: blur(10px);
    border: 2px solid rgba(255, 255, 255, 0.3);
}

.project-item:hover .project-item-icon-box {
    --scale: 1;
    opacity: 1;
    background: var(--primary-color);
    color: var(--eerie-black-1);
    border-color: var(--primary-color);
}

.project-item-icon-box ion-icon {
    --ionicon-stroke-width: 50px;
}

.project-img img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.project-item:hover .project-img img {
    transform: scale(1.05);
    filter: brightness(0.8) contrast(1.1);
}

/* Loading and Error States */
.loading-state,
.error-state {
    text-align: center;
    padding: 40px 20px;
    color: var(--light-gray);
}

.loading-state p {
    font-size: var(--fs-5);
    margin-bottom: 20px;
}

.error-state p {
    font-size: var(--fs-5);
    color: #dc3545;
    margin-bottom: 20px;
}

.retry-btn {
    background: var(--primary-color);
    color: var(--eerie-black-1);
    border: none;
    padding: 12px 24px;
    border-radius: 8px;
    font-size: var(--fs-6);
    font-weight: var(--fw-500);
    cursor: pointer;
    transition: all 0.3s ease;
}

.retry-btn:hover {
    background: var(--primary-color-alpha);
    transform: translateY(-2px);
}

/* Media queries for responsive masonry design */
@media (min-width: 450px) {
    .project-list {
        column-count: 2;
        column-gap: 5px;
    }

    /* Adjust heights for mobile 2-column */
    .project-item.height-short .project-img {
        height: 160px;
    }

    .project-item.height-medium .project-img {
        height: 220px;
    }

    .project-item.height-tall .project-img {
        height: 280px;
    }
}

@media (min-width: 580px) {
    .project-img {
        border-radius: 4px;
    }

    .project-list {
        column-gap: 5px;
    }
}

@media (min-width: 768px) {
    .article-title {
        padding-bottom: 20px;
    }

    .filter-select-box {
        display: none;
    }

    .filter-list {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        gap: 25px;
        padding-left: 5px;
        margin-bottom: 30px;
    }

    .filter-item button {
        color: var(--light-gray);
        font-size: var(--fs-5);
        transition: var(--transition-1);
    }

    .filter-item button:hover {
        color: var(--light-gray-70);
    }

    .filter-item button.active {
        color: var(--primary-color);
    }

    .project-list {
        column-count: 2;
        column-gap: 5px;
    }

    /* Tablet heights */
    .project-item.height-short .project-img {
        height: 200px;
    }

    .project-item.height-medium .project-img {
        height: 280px;
    }

    .project-item.height-tall .project-img {
        height: 360px;
    }
}

@media (min-width: 1024px) {
    .project-list {
        column-count: 3;
        column-gap: 5px;
    }

    /* Desktop heights for 3-column layout */
    .project-item.height-short .project-img {
        height: 180px;
    }

    .project-item.height-medium .project-img {
        height: 260px;
    }

    .project-item.height-tall .project-img {
        height: 340px;
    }
}

@media (min-width: 1200px) {
    .project-list {
        column-count: 4;
        column-gap: 5px;
    }

    /* Large desktop heights for 4-column layout */
    .project-item.height-short .project-img {
        height: 160px;
    }

    .project-item.height-medium .project-img {
        height: 220px;
    }

    .project-item.height-tall .project-img {
        height: 300px;
    }
}
</style>
