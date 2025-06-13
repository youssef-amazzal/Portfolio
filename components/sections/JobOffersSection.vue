<template>
    <article class="job-offers" data-page="job-offers">
        <header>
            <h2 class="h2 article-title">Job Applications</h2>
        </header>
        <section class="job-offers-content">
            <ul class="job-offers-list" v-if="!loading">
                <JobOfferCard v-for="offer in jobOffers" :key="offer.id" :offer="offer" @view-details="openModal" />
            </ul>

            <div v-else class="loading-state">
                <p>Loading job offers...</p>
            </div>

            <div v-if="error" class="error-state">
                <p>Error loading job offers: {{ error }}</p>
            </div>
        </section>

        <!-- Job Offer Detail Modal -->
        <div class="modal-container" :class="{ 'active': isModalOpen }" @click="closeModal">
            <div class="job-offer-modal" @click.stop>
                <JobOfferModal v-if="selectedOffer" :offer="selectedOffer" @close="closeModal" />
            </div>
        </div>
    </article>
</template>

<script setup>
import { ref } from 'vue';
import { useJobOffers } from '~/composables/useJobOffers';
import JobOfferCard from '~/components/job-offers/JobOfferCard.vue';
import JobOfferModal from '~/components/job-offers/JobOfferModal.vue';

const { jobOffers, loading, error, fetchJobOffers } = useJobOffers();

const isModalOpen = ref(false);
const selectedOffer = ref(null);

const openModal = (offer) => {
    selectedOffer.value = offer;
    isModalOpen.value = true;
    document.body.style.overflow = 'hidden';
};

const closeModal = () => {
    isModalOpen.value = false;
    selectedOffer.value = null;
    document.body.style.overflow = 'auto';
};

// Load job offers on component mount
onMounted(() => {
    fetchJobOffers();
});
</script>

<style scoped>
.job-offers {
    margin-bottom: 15px;
}

.job-offers-content {
    margin-top: 40px;
}

/* Job Offers List */
.job-offers-list {
    display: grid;
    grid-template-columns: 1fr;
    gap: 20px;
    margin-bottom: 10px;
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

@media (min-width: 580px) {
    .job-offers-list {
        grid-template-columns: 1fr 1fr;
        gap: 25px 15px;
    }
}

@media (min-width: 768px) {
    .job-offers-list {
        grid-template-columns: repeat(3, 1fr);
        gap: 25px;
    }
}

@media (min-width: 1024px) {
    .job-offers-list {
        grid-template-columns: repeat(2, 1fr);
    }
}

@media (min-width: 1200px) {
    .job-offers-list {
        grid-template-columns: repeat(3, 1fr);
    }
}

/* Modal Styles */
.modal-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background: hsla(0, 0%, 0%, 0.5);
    backdrop-filter: blur(2px);
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: 0;
    visibility: hidden;
    pointer-events: none;
    z-index: 20;
    transition: var(--transition-1);
}

.modal-container.active {
    opacity: 1;
    visibility: visible;
    pointer-events: all;
}

.job-offer-modal {
    position: relative;
    background: var(--eerie-black-2);
    max-width: 90vw;
    max-height: 90vh;
    overflow-y: auto;
    border-radius: 14px;
    padding: 0;
    box-shadow: var(--shadow-5);
}

@media (min-width: 768px) {
    .job-offer-modal {
        max-width: 650px;
    }
}
</style>
