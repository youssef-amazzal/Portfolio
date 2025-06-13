<template>
    <div class="activity-card" @click="handleCardClick">
        <div class="activity-banner">
            <img :src="activity.thumbnail" :alt="activity.title" class="activity-thumbnail" @error="handleImageError" />
            <div class="activity-category">
                {{ formatCategory(activity.category) }}
            </div>
        </div>

        <div class="activity-content">
            <div class="activity-meta">
                <time :datetime="activity.date" class="activity-date">
                    {{ activity.date }}
                </time>
                <div class="activity-tags">
                    <span v-for="tag in activity.tags?.slice(0, 2)" :key="tag" class="tag">
                        {{ tag }}
                    </span>
                </div>
            </div>

            <h3 class="activity-title">{{ activity.title }}</h3>

            <div class="organizations" v-if="activity.organizations?.length">
                <div class="org-list">
                    <div v-for="org in activity.organizations.slice(0, 2)" :key="org.name" class="org-item">
                        <img v-if="org.logo" :src="org.logo" :alt="org.name" class="org-logo"
                            @error="handleOrgLogoError" />
                        <span class="org-name">{{ org.name }}</span>
                    </div>
                </div>
            </div>

            <p class="activity-description">{{ activity.shortDescription }}</p>

            <div class="activity-stats" v-if="activity.events?.length">
                <div class="stat" v-for="event in activity.events.slice(0, 2)" :key="event.name">
                    <span class="stat-value">{{ event.participants || event.duration }}</span>
                    <span class="stat-label">{{ event.type }}</span>
                </div>
            </div> <button class="btn-read-more">
                <span>Read More</span>
                <ion-icon name="arrow-forward-outline"></ion-icon>
            </button>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    activity: {
        type: Object,
        required: true
    }
});

const handleCardClick = async () => {
    console.log('Card clicked, navigating to:', `/social-activities/${props.activity.id}`);
    try {
        await navigateTo(`/social-activities/${props.activity.id}`, { replace: true });
    } catch (error) {
        console.error('Navigation error:', error);
        // Fallback to window.location if navigateTo fails
        window.location.href = `/social-activities/${props.activity.id}`;
    }
};

const formatCategory = (category) => {
    return category.split('-').map(word =>
        word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
};

const handleImageError = (event) => {
    // Fallback to a default image or hide the image
    event.target.src = '/assets/images/default-activity.svg';
    event.target.onerror = null; // Prevent infinite loop
};

const handleOrgLogoError = (event) => {
    event.target.style.display = 'none';
};
</script>

<style scoped>
.activity-card {
    position: relative;
    background: var(--eerie-black-2);
    border: 1px solid var(--jet);
    border-radius: 14px;
    overflow: hidden;
    cursor: pointer;
    transition: var(--transition-1);
    box-shadow: var(--shadow-2);
}

.activity-card:hover {
    background: var(--onyx);
    border-color: var(--orange-yellow-crayola);
    transform: translateY(-2px);
    box-shadow: var(--shadow-3);
}

.activity-banner {
    position: relative;
    height: 200px;
    overflow: hidden;
}

.activity-thumbnail {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: var(--transition-1);
}

.activity-card:hover .activity-thumbnail {
    transform: scale(1.05);
}

.activity-category {
    position: absolute;
    top: 12px;
    left: 12px;
    background: var(--primary-color);
    color: var(--eerie-black-1);
    padding: 4px 8px;
    border-radius: 6px;
    font-size: var(--fs-8);
    font-weight: var(--fw-600);
    text-transform: uppercase;
    letter-spacing: 0.5px;
}

.activity-content {
    padding: 20px;
    color: var(--light-gray);
}

.activity-meta {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 12px;
}

.activity-date {
    color: var(--light-gray-70);
    font-size: var(--fs-8);
    font-weight: var(--fw-400);
}

.activity-tags {
    display: flex;
    gap: 6px;
    flex-wrap: wrap;
}

.tag {
    background: var(--jet);
    color: var(--light-gray);
    padding: 2px 6px;
    border-radius: 4px;
    font-size: var(--fs-9);
    font-weight: var(--fw-400);
}

.activity-title {
    margin-bottom: 12px;
    font-size: var(--fs-5);
    font-weight: var(--fw-600);
    color: var(--white-2);
    line-height: 1.3;
}

.organizations {
    margin-bottom: 12px;
}

.org-list {
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
}

.org-item {
    display: flex;
    align-items: center;
    gap: 6px;
    background: var(--jet);
    padding: 4px 8px;
    border-radius: 6px;
}

.org-logo {
    width: 16px;
    height: 16px;
    object-fit: contain;
}

.org-name {
    font-size: var(--fs-8);
    color: var(--primary-color);
    font-weight: var(--fw-500);
}

.activity-description {
    color: var(--light-gray);
    font-size: var(--fs-7);
    font-weight: var(--fw-300);
    line-height: 1.6;
    margin-bottom: 15px;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

.activity-stats {
    display: flex;
    gap: 15px;
    margin-bottom: 15px;
    padding: 8px 0;
    border-top: 1px solid var(--jet);
}

.stat {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
}

.stat-value {
    font-size: var(--fs-6);
    font-weight: var(--fw-600);
    color: var(--primary-color);
    line-height: 1;
}

.stat-label {
    font-size: var(--fs-8);
    color: var(--light-gray-70);
    margin-top: 2px;
}

.btn-read-more {
    background: none;
    border: none;
    color: var(--primary-color);
    font-size: var(--fs-7);
    font-weight: var(--fw-500);
    display: flex;
    align-items: center;
    gap: 5px;
    cursor: pointer;
    transition: var(--transition-1);
    margin-left: auto;
}

.btn-read-more:hover {
    color: var(--white-2);
}

.btn-read-more ion-icon {
    font-size: 12px;
    transition: var(--transition-1);
}

.btn-read-more:hover ion-icon {
    transform: translateX(2px);
}

@media (min-width: 768px) {
    .activity-content {
        padding: 24px;
    }

    .activity-title {
        font-size: var(--fs-4);
    }

    .activity-description {
        font-size: var(--fs-6);
    }

    .activity-banner {
        height: 220px;
    }
}
</style>
