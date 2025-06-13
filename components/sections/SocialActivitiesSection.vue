<template>
    <article class="social-activities" data-page="social-activities">
        <header>
            <h2 class="h2 article-title">Social Activities</h2>
        </header>

        <section class="activities-content">
            <div v-if="loading" class="loading-state">
                <p>Loading social activities...</p>
            </div>

            <div v-else-if="error" class="error-state">
                <p>Error loading activities: {{ error }}</p>
            </div>
            <div v-else class="activities-grid">
                <SocialActivityCard v-for="activity in activities" :key="activity.id" :activity="activity" />
            </div>
        </section>
    </article>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import SocialActivityCard from '~/components/social-activities/SocialActivityCard.vue';

const activities = ref([]);
const loading = ref(true);
const error = ref(null);

const fetchActivities = async () => {
    try {
        loading.value = true;
        const response = await fetch('/data/social-activities.json');
        if (!response.ok) {
            throw new Error(`Failed to fetch activities: ${response.status}`);
        }
        activities.value = await response.json();
        console.log('Loaded activities:', activities.value);
    } catch (err) {
        error.value = err.message;
        console.error('Error loading social activities:', err);
    } finally {
        loading.value = false;
    }
};

onMounted(() => {
    fetchActivities();
});
</script>

<style scoped>
.social-activities {
    margin-bottom: 15px;
}

.activities-content {
    margin-top: 40px;
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

.activities-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 20px;
    margin-bottom: 10px;
}

@media (min-width: 580px) {
    .activities-grid {
        grid-template-columns: 1fr 1fr;
        gap: 25px 15px;
    }
}

@media (min-width: 768px) {
    .activities-grid {
        grid-template-columns: repeat(2, 1fr);
        gap: 30px 25px;
    }
}

@media (min-width: 1024px) {
    .activities-grid {
        grid-template-columns: repeat(2, 1fr);
    }
}

@media (min-width: 1200px) {
    .activities-grid {
        grid-template-columns: repeat(3, 1fr);
    }
}
</style>
