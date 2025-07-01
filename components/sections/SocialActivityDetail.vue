<template>
    <article class="activity-detail" data-page="activity-detail">
        <div v-if="loading" class="loading-state">
            <p>Loading activity details...</p>
        </div>

        <div v-else-if="error" class="error-state">
            <p>{{ error }}</p>
            <NuxtLink to="/social-activities" class="back-link">
                ← Back to Social Activities
            </NuxtLink>
        </div>

        <div v-else-if="activity" class="activity-content">
            <!-- Header Section -->
            <header class="activity-header">
                <div class="back-navigation">
                    <NuxtLink to="/social-activities" class="back-link">
                        <ion-icon name="arrow-back-outline"></ion-icon>
                        <span>Back to Social Activities</span>
                    </NuxtLink>
                </div>

                <div class="activity-hero">
                    <div class="hero-image">
                        <img :src="activity.thumbnail" :alt="activity.title" @error="handleImageError" />
                        <div class="category-badge">
                            {{ formatCategory(activity.category) }}
                        </div>
                    </div>

                    <div class="hero-content">
                        <h1 class="activity-title">{{ activity.title }}</h1>
                        <p class="activity-date">{{ activity.date }}</p>

                        <OrganizationsCard v-if="activity.organizations?.length" :organizations="activity.organizations"
                            title="Organizations" title-class="h3" />
                    </div>
                </div>
            </header>

            <!-- Main Content -->
            <div class="activity-main"> <!-- Description -->
                <section class="description-section">
                    <h2>About This Activity</h2>
                    <div class="full-description" v-html="activity.fullDescription"></div>
                </section>

                <!-- Events -->
                <section v-if="activity.events?.length" class="events-section">
                    <h2>Events Organized</h2>
                    <div class="events-grid">
                        <div v-for="event in activity.events" :key="event.name" class="event-card">
                            <h3>{{ event.name }}</h3>
                            <p class="event-type">{{ event.type }}</p>
                            <div class="event-stats">
                                <div v-if="event.participants" class="stat">
                                    <span class="stat-number">{{ event.participants }}</span>
                                    <span class="stat-label">Participants</span>
                                </div>
                                <div v-if="event.universities" class="stat">
                                    <span class="stat-number">{{ event.universities }}</span>
                                    <span class="stat-label">Universities</span>
                                </div>
                                <div v-if="event.duration" class="stat">
                                    <span class="stat-number">{{ event.duration }}</span>
                                    <span class="stat-label">Duration</span>
                                </div>
                                <div v-if="event.phases" class="stat">
                                    <span class="stat-number">{{ event.phases }}</span>
                                    <span class="stat-label">Phases</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <!-- Achievements -->
                <section v-if="activity.achievements?.length" class="achievements-section">
                    <h2>Key Achievements</h2>
                    <ul class="achievements-list">
                        <li v-for="achievement in activity.achievements" :key="achievement">
                            {{ achievement }}
                        </li>
                    </ul>
                </section>

                <!-- Skills -->
                <section v-if="activity.skills?.length" class="skills-section">
                    <h2>Skills Developed</h2>
                    <div class="skills-list">
                        <span v-for="skill in activity.skills" :key="skill" class="skill-tag">
                            {{ skill }}
                        </span>
                    </div>
                </section>

                <!-- Gallery -->
                <section v-if="activity.gallery?.length" class="gallery-section">
                    <h2>Photo Gallery</h2>
                    <div class="gallery-grid">
                        <div v-for="(image, index) in activity.gallery" :key="index" class="gallery-item"
                            @click="openGalleryModal(index)">
                            <img :src="image" :alt="`Gallery image ${index + 1}`" @error="handleGalleryImageError" />
                        </div>
                    </div>
                </section>
            </div>

            <!-- Gallery Modal -->
            <div v-if="isGalleryOpen" class="gallery-modal" @click="closeGalleryModal">
                <div class="modal-content" @click.stop>
                    <button class="modal-close" @click="closeGalleryModal">
                        <ion-icon name="close-outline"></ion-icon>
                    </button>
                    <img :src="activity.gallery[currentImageIndex]" :alt="`Gallery image ${currentImageIndex + 1}`" />
                    <div class="gallery-navigation">
                        <button @click="previousImage" :disabled="currentImageIndex === 0" class="nav-btn prev-btn">
                            <ion-icon name="chevron-back-outline"></ion-icon>
                        </button>
                        <span class="image-counter">
                            {{ currentImageIndex + 1 }} / {{ activity.gallery.length }}
                        </span>
                        <button @click="nextImage" :disabled="currentImageIndex === activity.gallery.length - 1"
                            class="nav-btn next-btn">
                            <ion-icon name="chevron-forward-outline"></ion-icon>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </article>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import OrganizationsCard from '~/components/OrganizationsCard.vue';

const route = useRoute();
const activity = ref(null);
const loading = ref(true);
const error = ref(null);
const isGalleryOpen = ref(false);
const currentImageIndex = ref(0);

const fetchActivity = async () => {
    try {
        loading.value = true;
        console.log('Route params:', route.params);
        console.log('Looking for activity ID:', route.params.id);

        const response = await fetch('/data/social-activities.json');
        if (!response.ok) {
            throw new Error(`Failed to fetch activities: ${response.status}`);
        }
        const activities = await response.json();
        console.log('Loaded activities:', activities);

        const foundActivity = activities.find(a => a.id === route.params.id);
        console.log('Found activity:', foundActivity);

        if (!foundActivity) {
            throw new Error('Activity not found');
        }

        activity.value = foundActivity;
    } catch (err) {
        error.value = err.message;
        console.error('Error loading activity:', err);
    } finally {
        loading.value = false;
    }
};

const formatCategory = (category) => {
    return category.split('-').map(word =>
        word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
};

const handleImageError = (event) => {
    event.target.src = '/assets/images/default-activity.svg';
    event.target.onerror = null;
};

const handleGalleryImageError = (event) => {
    event.target.parentElement.style.display = 'none';
};

const openGalleryModal = (index) => {
    currentImageIndex.value = index;
    isGalleryOpen.value = true;
    document.body.style.overflow = 'hidden';
};

const closeGalleryModal = () => {
    isGalleryOpen.value = false;
    document.body.style.overflow = 'auto';
};

const previousImage = () => {
    if (currentImageIndex.value > 0) {
        currentImageIndex.value--;
    }
};

const nextImage = () => {
    if (currentImageIndex.value < activity.value.gallery.length - 1) {
        currentImageIndex.value++;
    }
};

onMounted(() => {
    console.log('SocialActivityDetail component mounted');
    console.log('Current route:', route);
    fetchActivity();
});
</script>

<style scoped>
.activity-detail {
    margin-bottom: 15px;
}

.loading-state,
.error-state {
    text-align: center;
    padding: 40px 20px;
    color: var(--light-gray);
}

.error-state {
    color: hsl(0, 100%, 72%);
}

.back-navigation {
    margin-bottom: 20px;
}

.back-link {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    color: var(--primary-color);
    text-decoration: none;
    font-size: var(--fs-6);
    font-weight: var(--fw-500);
    transition: var(--transition-1);
}

.back-link:hover {
    color: var(--white-2);
}

.activity-hero {
    display: grid;
    gap: 30px;
    margin-bottom: 40px;
}

.hero-image {
    position: relative;
    border-radius: 14px;
    overflow: hidden;
    height: 300px;
}

.hero-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.category-badge {
    position: absolute;
    top: 15px;
    left: 15px;
    background: var(--primary-color);
    color: var(--eerie-black-1);
    padding: 6px 12px;
    border-radius: 8px;
    font-size: var(--fs-7);
    font-weight: var(--fw-600);
    text-transform: uppercase;
    letter-spacing: 0.5px;
}

.hero-content {
    color: var(--light-gray);
}

.activity-title {
    color: var(--white-2);
    font-size: var(--fs-2);
    font-weight: var(--fw-600);
    margin-bottom: 10px;
    line-height: 1.3;
}

.activity-date {
    color: var(--primary-color);
    font-size: var(--fs-5);
    font-weight: var(--fw-500);
    margin-bottom: 20px;
}

.activity-main section {
    margin-bottom: 40px;
}

.activity-main h2 {
    color: var(--white-2);
    font-size: var(--fs-3);
    font-weight: var(--fw-600);
    margin-bottom: 20px;
    padding-bottom: 10px;
    border-bottom: 2px solid var(--primary-color);
}

.full-description {
    color: var(--light-gray);
    font-size: var(--fs-6);
    line-height: 1.8;
}

.events-grid {
    display: grid;
    gap: 20px;
}

.event-card {
    background: var(--eerie-black-2);
    border: 1px solid var(--jet);
    padding: 20px;
    border-radius: 12px;
}

.event-card h3 {
    color: var(--white-2);
    font-size: var(--fs-4);
    margin-bottom: 8px;
}

.event-type {
    color: var(--primary-color);
    font-size: var(--fs-6);
    font-weight: var(--fw-500);
    margin-bottom: 15px;
}

.event-stats {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
    gap: 15px;
}

.stat {
    text-align: center;
}

.stat-number {
    display: block;
    color: var(--primary-color);
    font-size: var(--fs-4);
    font-weight: var(--fw-600);
    line-height: 1;
}

.stat-label {
    color: var(--light-gray-70);
    font-size: var(--fs-8);
    margin-top: 4px;
}

.achievements-list {
    list-style: none;
    padding: 0;
}

.achievements-list li {
    padding: 12px 0;
    padding-left: 25px;
    position: relative;
    font-size: var(--fs-6);
    line-height: 1.6;
    color: var(--light-gray);
    border-bottom: 1px solid var(--jet);
}

.achievements-list li:last-child {
    border-bottom: none;
}

.achievements-list li::before {
    content: "✓";
    position: absolute;
    left: 0;
    color: var(--primary-color);
    font-weight: bold;
    font-size: var(--fs-5);
}

.skills-list {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
}

.skill-tag {
    background: var(--eerie-black-2);
    border: 1px solid var(--jet);
    color: var(--light-gray);
    padding: 8px 16px;
    border-radius: 8px;
    font-size: var(--fs-7);
    font-weight: var(--fw-400);
    transition: var(--transition-1);
}

.skill-tag:hover {
    border-color: var(--primary-color);
    color: var(--primary-color);
}

.gallery-grid {
    column-count: 3;
    column-gap: 15px;
    column-fill: balance;
}

.gallery-item {
    position: relative;
    display: inline-block;
    width: 100%;
    margin-bottom: 15px;
    border-radius: 8px;
    overflow: hidden;
    cursor: pointer;
    transition: var(--transition-1);
    break-inside: avoid;
}

.gallery-item:hover {
    transform: scale(1.02);
}

.gallery-item img {
    width: 100%;
    height: auto;
    object-fit: cover;
    display: block;
}

/* Gallery Modal */
.gallery-modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background: rgba(0, 0, 0, 0.9);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
}

.modal-content {
    position: relative;
    max-width: 90vw;
    max-height: 90vh;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.modal-content img {
    max-width: 100%;
    max-height: 80vh;
    object-fit: contain;
    border-radius: 8px;
}

.modal-close {
    position: absolute;
    top: -40px;
    right: 0;
    background: none;
    border: none;
    color: var(--white-2);
    font-size: 24px;
    cursor: pointer;
    padding: 8px;
}

.gallery-navigation {
    display: flex;
    align-items: center;
    gap: 20px;
    margin-top: 20px;
    color: var(--white-2);
}

.nav-btn {
    background: var(--eerie-black-2);
    border: 1px solid var(--jet);
    color: var(--white-2);
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: var(--transition-1);
}

.nav-btn:hover:not(:disabled) {
    background: var(--primary-color);
    color: var(--eerie-black-1);
}

.nav-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
}

.image-counter {
    font-size: var(--fs-6);
    color: var(--light-gray);
}

/* Mobile devices */
@media (max-width: 767px) {
    .gallery-grid {
        column-count: 1;
        column-gap: 0;
    }

    .gallery-item {
        margin-bottom: 10px;
    }
}

@media (min-width: 768px) {
    .activity-hero {
        grid-template-columns: 1fr 1fr;
        align-items: start;
    }

    .hero-image {
        height: 400px;
    }

    .org-grid {
        grid-template-columns: 1fr;
    }

    .events-grid {
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    }

    .gallery-grid {
        column-count: 2;
        column-gap: 10px;
    }
}

@media (min-width: 1024px) {
    .gallery-grid {
        column-count: 4;
        column-gap: 20px;
    }
}
</style>
