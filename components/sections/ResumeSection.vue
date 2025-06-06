<template>
    <article class="resume" data-page="resume">
        <header>
            <h2 class="h2 article-title">Resume</h2>
        </header>

        <section class="timeline">
            <div class="title-wrapper">
                <div class="icon-box">
                    <ion-icon name="book-outline"></ion-icon>
                </div>
                <h3 class="h3">Education</h3>
            </div>
            <ol class="timeline-list">
                <li class="timeline-item" v-for="edu in education" :key="edu.title">
                    <h4 class="h4 timeline-item-title">{{ edu.title }}</h4>
                    <div class="timeline-item__spacetime">
                        <span>{{ edu.period }}</span>
                        <span> | </span>
                        <p class="timeline-location">{{ edu.location }}</p>
                    </div>
                    <p class="timeline-text">{{ edu.degree }}</p>
                </li>
            </ol>
        </section>

        <section class="timeline">
            <div class="title-wrapper">
                <div class="icon-box">
                    <ion-icon name="book-outline"></ion-icon>
                </div>
                <h3 class="h3">Experience</h3>
            </div>
            <ol class="timeline-list">
                <li class="timeline-item" v-for="exp in experience" :key="exp.title">
                    <h4 class="h4 timeline-item-title">{{ exp.title }}</h4>
                    <div class="timeline-item__spacetime">
                        <span>{{ exp.period }}</span>
                        <span> | </span>
                        <p class="timeline-location">{{ exp.company }}, {{ exp.location }}</p>
                    </div>
                    <ul class="responsibilities-list">
                        <li v-for="responsibility in exp.responsibilities" :key="responsibility"
                            class="responsibility-item">
                            {{ responsibility }}``
                        </li>
                    </ul>
                </li>
            </ol>
        </section>
        <section class="skill">
            <h3 class="h3 skills-title">My skills</h3>
            <div class="skills-container">
                <!-- Mobile dropdown filter -->
                <div class="skills-filter-dropdown mobile-only">
                    <select v-model="activeCategory" @change="setActiveCategory(activeCategory)"
                        class="filter-dropdown">
                        <option v-for="category in skillCategories" :key="category.key" :value="category.key">
                            {{ category.label }}
                        </option>
                    </select>
                </div>

                <!-- Desktop two-column layout -->
                <div class="skills-layout desktop-only">
                    <!-- Left column - Filter tabs -->
                    <div class="skills-filter-column">
                        <div class="skills-filter-tabs">
                            <button v-for="category in skillCategories" :key="category.key"
                                :class="['filter-tab', { active: activeCategory === category.key }]"
                                @click="setActiveCategory(category.key)">
                                {{ category.label }}
                            </button>
                        </div>
                    </div>

                    <div class="skills-grid-column">
                        <div class="skills-grid">
                            <div v-for="skill in filteredSkills" :key="skill.name" class="skill-item">
                                <div class="skill-icon">
                                    <img v-if="skill.icon.endsWith('.png') || skill.icon.endsWith('.jpg') || skill.icon.endsWith('.webp')"
                                        :src="`/assets/icons/skills/${skill.icon}`" :alt="skill.name">
                                    <ion-icon v-else :name="skill.icon"></ion-icon>
                                </div>
                                <span class="skill-name">{{ skill.name }}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="skills-grid mobile-only">
                    <div v-for="skill in filteredSkills" :key="skill.name" class="skill-item">
                        <div class="skill-icon">
                            <img v-if="skill.icon.endsWith('.png') || skill.icon.endsWith('.jpg') || skill.icon.endsWith('.webp')"
                                :src="`/assets/icons/skills/${skill.icon}`" :alt="skill.name">
                            <ion-icon v-else :name="skill.icon"></ion-icon>
                        </div>
                        <span class="skill-name">{{ skill.name }}</span>
                    </div>
                </div>
            </div>
        </section>
    </article>
</template>

<script setup>
import { ref, computed } from 'vue'

const activeCategory = ref('all')

const education = [
    {
        title: 'École Normale Supérieure de l\'Enseignement Technique - ENSET Mohammedia',
        degree: 'Software Engineering and Distributed Computing Systems Engineering Cycle',
        period: '2023 — Present',
        location: 'Mohammedia, Morocco'
    },
    {
        title: 'École Supérieure de Technologie - EST Salé',
        degree: 'University Technology Diploma in Software Engineering',
        period: '2021 — 2023',
        location: 'Salé, Morocco'
    },
    {
        title: 'Cadi Ayyad High School',
        degree: 'BAC Science Physique',
        period: '2019 — 2020',
        location: 'Salé, Morocco'
    }
];

const experience = [
    {
        title: 'Mobile Developer | Internship',
        company: 'Gulf Industry',
        period: 'July 2024 — August 2024',
        location: 'Casablanca, Morocco',
        responsibilities: [
            'Redesigned existing mobile catalog application by migrating from Capacitor.js/Vue.js to Flutter, improving performance and UX.',
            'Centralized product data management by migrating local JSON files to a PostgreSQL database.',
            'Expanded cross-reference, metadata and pictures database by 500% through automated web scraping implementation.'
        ]
    },
    {
        title: 'Desktop Developer | Internship',
        company: 'Enhanced Technologies',
        period: 'April 2023 — June 2023',
        location: 'Rabat, Morocco',
        responsibilities: [
            'Contributed in the digital transformation initiative by automating paper-based document workflows.',
            'Collaborated with 4-member team to develop semi-automated monitoring system using JavaFX.',
            'Conducted staff training sessions for new system adoption.'
        ]
    }
];

const skills = [
    // Programming Languages
    { name: 'Java', category: 'Programming Languages', icon: 'logo-java' },
    { name: 'C++', category: 'Programming Languages', icon: 'code-slash-outline' },
    { name: 'JavaScript', category: 'Programming Languages', icon: 'logo-javascript' },
    { name: 'Dart', category: 'Programming Languages', icon: 'diamond-outline' },

    // Frameworks
    { name: 'Spring Boot', category: 'Frameworks', icon: 'leaf-outline' },
    { name: 'Flutter', category: 'Frameworks', icon: 'phone-portrait-outline' },
    { name: 'JavaFX', category: 'Frameworks', icon: 'desktop-outline' },
    { name: 'Vue.js', category: 'Frameworks', icon: 'logo-vue' },

    // Databases
    { name: 'PostgreSQL', category: 'Databases', icon: 'server-outline' },
    { name: 'MySQL', category: 'Databases', icon: 'database-outline' },

    // Tools
    { name: 'Git', category: 'Tools', icon: 'git-branch-outline' },
    { name: 'Docker', category: 'Tools', icon: 'cube-outline' },

    // Languages (Spoken)
    { name: 'Arabic', category: 'Languages', icon: 'language-outline' },
    { name: 'English', category: 'Languages', icon: 'language-outline' },
    { name: 'French', category: 'Languages', icon: 'language-outline' }
];

const skillCategories = [
    { key: 'all', label: 'All' },
    { key: 'Programming Languages', label: 'Programming' },
    { key: 'Frameworks', label: 'Frameworks' },
    { key: 'Databases', label: 'Databases' },
    { key: 'Tools', label: 'Tools' },
    { key: 'Languages', label: 'Languages' }
];

const filteredSkills = computed(() => {
    if (activeCategory.value === 'all') {
        return skills
    }
    return skills.filter(skill => skill.category === activeCategory.value)
});

const setActiveCategory = (category) => {
    activeCategory.value = category
}
</script>

<style scoped>
/* Resume section styles */
.article-title {
    margin-bottom: 30px;
}

/* Education and experience */
.timeline {
    margin-bottom: 30px;
}

.timeline .title-wrapper {
    display: flex;
    align-items: center;
    gap: 15px;
    margin-bottom: 25px;
}

.timeline-list {
    font-size: var(--fs-6);
    margin-left: 45px;
}

.timeline-item {
    position: relative;
}

.timeline-item:not(:last-child) {
    margin-bottom: 20px;
}

.timeline-item-title {
    font-size: var(--fs-6);
    line-height: 1.3;
    margin-bottom: 7px;
}

.timeline-list span {
    color: var(--secondary-color);
    font-weight: var(--fw-400);
    line-height: 1.6;
}

.timeline-item:not(:last-child)::before {
    content: "";
    position: absolute;
    top: -25px;
    left: -30px;
    width: 1px;
    height: calc(100% + 50px);
    background: var(--jet);
}

.timeline-item::after {
    content: "";
    position: absolute;
    top: 5px;
    left: -33px;
    height: 6px;
    width: 6px;
    background: var(--text-gradient-yellow);
    border-radius: 50%;
    box-shadow: 0 0 0 4px var(--jet);
}

.timeline-text {
    color: var(--light-gray);
    font-weight: var(--fw-300);
    line-height: 1.6;
    margin-bottom: 5px;
}

.timeline-item__spacetime {
    display: flex;
    gap: 10px;
}

.timeline-location {
    color: var(--secondary-color);
    font-size: var(--fs-7);
    font-weight: var(--fw-400);
    line-height: 1.4;
    margin: 0;
}

.responsibilities-list {
    margin-top: 10px;
    padding-left: 20px;
}

.responsibility-item {
    color: var(--light-gray);
    font-weight: var(--fw-300);
    line-height: 1.6;
    margin-bottom: 5px;
    list-style-type: disc;
}

/* Skills section */
.skills-title {
    margin-bottom: 30px;
    text-align: left;
}


.desktop-only {
    display: none !important;
}

.skills-layout {
    display: flex;
    gap: 30px;
    align-items: flex-start;
}

.skills-filter-column {
    flex-shrink: 0;
    width: 160px;
}

.skills-filter-tabs {
    display: flex;
    flex-direction: column;
    gap: 10px;
    align-items: stretch;
}

.skills-grid-column {
    flex: 1;
    min-width: 0;
}

.filter-tab {
    background: var(--eerie-black-2);
    color: var(--light-gray);
    border: 1px solid var(--jet);
    padding: 12px 20px;
    border-radius: 8px;
    font-size: var(--fs-8);
    font-weight: var(--fw-400);
    cursor: pointer;
    transition: all 0.3s ease;
    white-space: nowrap;
    width: 100%;
    text-align: left;
}

.filter-tab:hover {
    color: var(--white-2);
    border-color: var(--primary-color);
}

.filter-tab.active {
    background: var(--primary-color);
    color: var(--smoky-black);
    border-color: var(--primary-color);
    font-weight: var(--fw-500);
}

/* Show dropdown on mobile */
.mobile-only {
    display: block;
}

.filter-dropdown {
    width: 100%;
    max-width: 250px;
    margin: 0 auto 25px;
    padding: 10px 16px;
    background: var(--eerie-black-2);
    color: var(--light-gray);
    border: 1px solid var(--jet);
    border-radius: 10px;
    font-size: var(--fs-7);
    font-weight: var(--fw-400);
    cursor: pointer;
    outline: none;
    display: block;
}

.filter-dropdown:focus {
    border-color: var(--primary-color);
    box-shadow: 0 0 0 2px rgba(255, 183, 3, 0.2);
}

.skills-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
    gap: 8px;
}

.skill-item {
    background: var(--eerie-black-2);
    border: 1px solid var(--jet);
    border-radius: 8px;
    padding: 10px 12px;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 8px;
    transition: all 0.3s ease;
    text-align: left;
}

.skill-item:hover {
    border-color: var(--primary-color);
    transform: translateY(-1px);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

.skill-icon {
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--primary-color);
    flex-shrink: 0;
}

.skill-icon img {
    width: 18px;
    height: 18px;
    object-fit: contain;
}

.skill-icon ion-icon {
    font-size: 18px;
}

.skill-name {
    color: var(--white-2);
    font-size: var(--fs-8);
    font-weight: var(--fw-400);
    line-height: 1.2;
    margin: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

/* Media queries for responsive design */
@media (min-width: 580px) {
    .timeline-list {
        margin-left: 65px;
    }

    .timeline-item:not(:last-child)::before {
        left: -40px;
    }

    .timeline-item::after {
        height: 8px;
        width: 8px;
        left: -43px;
    }
}

/* Show tabs only on desktop screens (1024px+) */
@media (min-width: 1024px) {
    .desktop-only {
        display: flex !important;
    }

    .mobile-only {
        display: none !important;
    }

    .skills-grid {
        grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
        gap: 10px;
    }

    .skill-item {
        padding: 12px 14px;
    }

    .skill-icon {
        width: 22px;
        height: 22px;
    }

    .skill-icon img {
        width: 20px;
        height: 20px;
    }

    .skill-icon ion-icon {
        font-size: 20px;
    }

    .skill-name {
        font-size: var(--fs-7);
    }
}

@media (min-width: 768px) {
    .skills-container {
        padding: 0 40px;
    }

    .skills-grid {
        grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
        gap: 12px;
    }

    .skill-item {
        padding: 14px 16px;
    }

    .skill-icon {
        width: 24px;
        height: 24px;
    }

    .skill-icon img {
        width: 22px;
        height: 22px;
    }

    .skill-icon ion-icon {
        font-size: 22px;
    }

    .filter-tab {
        padding: 12px 24px;
        font-size: var(--fs-7);
    }
}

@media (min-width: 1024px) {
    .skills-grid {
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
        gap: 14px;
    }

    .skill-item {
        padding: 16px 18px;
    }

    .skill-icon {
        width: 26px;
        height: 26px;
    }

    .skill-icon img {
        width: 24px;
        height: 24px;
    }

    .skill-icon ion-icon {
        font-size: 24px;
    }
}

@media (min-width: 1250px) {
    .timeline-text {
        max-width: 700px;
    }

    .skills-container {
        padding: 0 60px;
    }

    .skills-grid {
        grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
        gap: 16px;
    }

    .skill-item {
        padding: 18px 20px;
    }

    .skill-icon {
        width: 28px;
        height: 28px;
    }

    .skill-icon img {
        width: 26px;
        height: 26px;
    }

    .skill-icon ion-icon {
        font-size: 26px;
    }

    .skill-name {
        font-size: var(--fs-6);
    }
}
</style>
