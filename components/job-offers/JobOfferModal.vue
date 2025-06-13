<template>
    <div class="job-offer-modal-content">
        <button class="modal-close-btn" @click="$emit('close')">
            <ion-icon name="close-outline"></ion-icon>
        </button>
        <div class="modal-header">
            <h2 class="modal-title">{{ offer.title }}</h2>
            <div class="company-info">
                <h3 class="company-name">{{ offer.company }}</h3>
                <p class="location">{{ offer.location }}</p>
            </div>
            <div class="meta-info">
                <span class="type">{{ offer.type }}</span>
                <span class="dot"></span>
                <time :datetime="offer.applicationDate">Applied: {{ formatDate(offer.applicationDate) }}</time>
            </div>
        </div>

        <div class="modal-body">
            <section class="description-section">
                <h4>Job Description</h4>
                <p>{{ offer.description }}</p>
            </section>

            <section class="requirements-section" v-if="offer.requirements && offer.requirements.length">
                <h4>Requirements</h4>
                <ul class="requirements-list">
                    <li v-for="requirement in offer.requirements" :key="requirement">
                        {{ requirement }}
                    </li>
                </ul>
            </section>

            <section class="skills-section" v-if="offer.skills && offer.skills.length">
                <h4>Relevant Skills</h4>
                <div class="skills-list">
                    <span v-for="skill in offer.skills" :key="skill" class="skill-tag">
                        {{ skill }}
                    </span>
                </div>
            </section>

            <section class="documents-section" v-if="offer.documents">
                <h4>Application Documents</h4>
                <div class="documents-grid">
                    <a v-if="offer.documents.resume" :href="offer.documents.resume" class="document-link" download
                        target="_blank">
                        <div class="document-icon">
                            <ion-icon name="document-text-outline"></ion-icon>
                        </div>
                        <span>Resume</span>
                        <ion-icon name="download-outline" class="download-icon"></ion-icon>
                    </a>

                    <a v-if="offer.documents.coverLetter" :href="offer.documents.coverLetter" class="document-link"
                        download target="_blank">
                        <div class="document-icon">
                            <ion-icon name="document-outline"></ion-icon>
                        </div>
                        <span>Cover Letter</span>
                        <ion-icon name="download-outline" class="download-icon"></ion-icon>
                    </a>
                </div>
            </section>

            <section class="links-section">
                <h4>External Links</h4>
                <div class="links-grid">
                    <a v-if="offer.linkedinPost" :href="offer.linkedinPost" class="external-link" target="_blank"
                        rel="noopener noreferrer">
                        <div class="link-icon">
                            <ion-icon name="logo-linkedin"></ion-icon>
                        </div>
                        <span>LinkedIn Post</span>
                        <ion-icon name="open-outline" class="open-icon"></ion-icon>
                    </a>

                    <a v-if="offer.companyWebsite" :href="offer.companyWebsite" class="external-link" target="_blank"
                        rel="noopener noreferrer">
                        <div class="link-icon">
                            <ion-icon name="globe-outline"></ion-icon>
                        </div>
                        <span>Company Website</span>
                        <ion-icon name="open-outline" class="open-icon"></ion-icon>
                    </a>
                </div>
            </section>

            <section class="notes-section" v-if="offer.notes">
                <h4>Notes</h4>
                <p class="notes-text">{{ offer.notes }}</p>
            </section>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    offer: {
        type: Object,
        required: true
    }
});

const emit = defineEmits(['close']);

const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
};
</script>

<style scoped>
.job-offer-modal-content {
    position: relative;
    background: var(--eerie-black-2);
    border-radius: 14px;
    padding: 30px;
    max-height: 90vh;
    overflow-y: auto;
    min-width: 300px;
}

.modal-close-btn {
    position: absolute;
    top: 15px;
    right: 15px;
    background: var(--eerie-black-2);
    border: 1px solid var(--jet);
    color: var(--white-2);
    width: 32px;
    height: 32px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: var(--transition-1);
    z-index: 10;
}

.modal-close-btn:hover {
    background: var(--jet);
    color: var(--primary-color);
}

.modal-close-btn ion-icon {
    font-size: 18px;
}

.modal-header {
    margin-bottom: 30px;
    padding-right: 40px;
}

.modal-title {
    color: var(--white-2);
    font-size: var(--fs-3);
    font-weight: var(--fw-600);
    margin-bottom: 10px;
    line-height: 1.3;
}

.company-info {
    margin-bottom: 15px;
}

.company-name {
    color: var(--primary-color);
    font-size: var(--fs-4);
    font-weight: var(--fw-500);
    margin-bottom: 5px;
}

.location {
    color: var(--light-gray-70);
    font-size: var(--fs-6);
    display: flex;
    align-items: center;
    gap: 4px;
}

.location::before {
    content: "📍";
    font-size: 14px;
}

.meta-info {
    display: flex;
    align-items: center;
    gap: 8px;
    color: var(--light-gray-70);
    font-size: var(--fs-7);
}

.type {
    text-transform: uppercase;
    letter-spacing: 1px;
    font-weight: var(--fw-500);
}

.dot {
    background: var(--light-gray-70);
    width: 3px;
    height: 3px;
    border-radius: 50%;
}

.modal-body {
    color: var(--light-gray);
}

.modal-body section {
    margin-bottom: 25px;
}

.modal-body h4 {
    color: var(--white-2);
    font-size: var(--fs-5);
    font-weight: var(--fw-600);
    margin-bottom: 12px;
    padding-bottom: 8px;
    border-bottom: 1px solid var(--jet);
}

.modal-body p {
    line-height: 1.6;
    font-size: var(--fs-6);
}

.requirements-list {
    list-style: none;
    padding: 0;
}

.requirements-list li {
    padding: 8px 0;
    padding-left: 20px;
    position: relative;
    font-size: var(--fs-6);
    line-height: 1.5;
}

.requirements-list li::before {
    content: "✓";
    position: absolute;
    left: 0;
    color: var(--primary-color);
    font-weight: bold;
}

.skills-list {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
}

.skill-tag {
    background: var(--eerie-black-2);
    color: var(--light-gray);
    padding: 6px 12px;
    border-radius: 6px;
    font-size: var(--fs-7);
    font-weight: var(--fw-400);
    border: 1px solid var(--jet);
}

.documents-grid,
.links-grid {
    display: grid;
    gap: 12px;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
}

.document-link,
.external-link {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px;
    background: var(--eerie-black-2);
    border: 1px solid var(--jet);
    border-radius: 8px;
    color: var(--light-gray);
    text-decoration: none;
    transition: var(--transition-1);
}

.document-link:hover,
.external-link:hover {
    background: var(--onyx);
    border-color: var(--primary-color);
    color: var(--primary-color);
    transform: translateY(-1px);
}

.document-icon,
.link-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    background: var(--jet);
    border-radius: 6px;
    color: var(--primary-color);
}

.document-icon ion-icon,
.link-icon ion-icon {
    font-size: 16px;
}

.download-icon,
.open-icon {
    margin-left: auto;
    font-size: 14px;
    opacity: 0.7;
}

.notes-text {
    background: var(--eerie-black-2);
    padding: 15px;
    border-radius: 8px;
    border: 1px solid var(--jet);
    font-style: italic;
    line-height: 1.6;
}

@media (min-width: 768px) {
    .job-offer-modal-content {
        padding: 40px;
        min-width: 500px;
    }

    .modal-title {
        font-size: var(--fs-2);
    }

    .company-name {
        font-size: var(--fs-3);
    }
}

/* Scrollbar Styling */
.job-offer-modal-content::-webkit-scrollbar {
    width: 5px;
}

.job-offer-modal-content::-webkit-scrollbar-track {
    background: var(--onyx);
}

.job-offer-modal-content::-webkit-scrollbar-thumb {
    background: var(--primary-color);
    border-radius: 5px;
}

.job-offer-modal-content::-webkit-scrollbar-thumb:hover {
    background: var(--white-2);
}
</style>
