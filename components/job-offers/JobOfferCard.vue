<template>
    <li class="job-offer-item" @click="$emit('view-details', offer)">
        <div class="job-offer-content">
            <div class="job-offer-meta">
                <p class="job-offer-category">{{ offer.type }}</p>
                <span class="dot"></span>
                <time :datetime="offer.applicationDate">{{ formatDate(offer.applicationDate) }}</time>
            </div>

            <h3 class="job-offer-title">{{ offer.title }}</h3>

            <div class="company-info">
                <h4 class="company-name">{{ offer.company }}</h4>
                <p class="location">{{ offer.location }}</p>
            </div>

            <p class="job-offer-text">{{ offer.description }}</p>

            <div class="job-offer-actions">
                <button class="btn-view-details">
                    <span>View Details</span>
                    <ion-icon name="arrow-forward-outline"></ion-icon>
                </button>
            </div>
        </div>
    </li>
</template>

<script setup>
const props = defineProps({
    offer: {
        type: Object,
        required: true
    }
});

const emit = defineEmits(['view-details']);

const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
};
</script>

<style scoped>
.job-offer-item {
    position: relative;
    background: var(--eerie-black-2);
    border: 1px solid var(--jet);
    padding: 15px;
    border-radius: 14px;
    box-shadow: var(--shadow-2);
    cursor: pointer;
    z-index: 1;
    transition: var(--transition-1);
}

.job-offer-item:hover {
    background: var(--onyx);
    border-color: var(--primary-color);
    transform: translateY(-2px);
    box-shadow: var(--shadow-3);
}

.job-offer-content {
    color: var(--light-gray);
}

.job-offer-meta {
    display: flex;
    align-items: center;
    gap: 7px;
    margin-bottom: 10px;
}

.job-offer-category {
    color: var(--light-gray-70);
    font-size: var(--fs-8);
    font-weight: var(--fw-400);
    text-transform: uppercase;
    letter-spacing: 1px;
}

.dot {
    background: var(--light-gray-70);
    width: 3px;
    height: 3px;
    border-radius: 50%;
}

.job-offer-meta time {
    color: var(--light-gray-70);
    font-size: var(--fs-8);
    font-weight: var(--fw-400);
}

.job-offer-title {
    margin-bottom: 8px;
    font-size: var(--fs-5);
    font-weight: var(--fw-600);
    color: var(--white-2);
    line-height: 1.3;
}

.company-info {
    margin-bottom: 12px;
}

.company-name {
    font-size: var(--fs-6);
    font-weight: var(--fw-500);
    color: var(--primary-color);
    margin-bottom: 4px;
}

.location {
    font-size: var(--fs-7);
    color: var(--light-gray-70);
    display: flex;
    align-items: center;
    gap: 4px;
}

.location::before {
    content: "📍";
    font-size: 12px;
}

.job-offer-text {
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

.job-offer-actions {
    display: flex;
    justify-content: flex-end;
}

.btn-view-details {
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
}

.btn-view-details:hover {
    color: var(--white-2);
}

.btn-view-details ion-icon {
    font-size: 12px;
    transition: var(--transition-1);
}

.btn-view-details:hover ion-icon {
    transform: translateX(2px);
}

@media (min-width: 768px) {
    .job-offer-item {
        padding: 20px;
    }

    .job-offer-title {
        font-size: var(--fs-4);
    }

    .company-name {
        font-size: var(--fs-5);
    }

    .job-offer-text {
        font-size: var(--fs-6);
    }
}
</style>
