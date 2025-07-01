<template>
    <div v-if="organizations && organizations.length" class="organizations-section"
        :class="{ 'meta-item': metaItemStyle }">
        <h4 v-if="title" :class="titleClass">{{ title }}</h4>
        <div class="org-grid">
            <div v-for="(org, index) in organizations" :key="org.name || index" class="org-card">
                <!-- Clickable card wrapper when website is available -->
                <a v-if="org.website" :href="org.website" target="_blank" rel="noopener noreferrer"
                    class="org-card-link">
                    <img v-if="org.logo" :src="org.logo" :alt="org.name" class="org-logo" @error="handleLogoError" />
                    <div class="org-info">
                        <h4 class="org-name">
                            {{ org.name }}
                            <ion-icon name="open-outline" class="external-icon"></ion-icon>
                        </h4>
                        <p v-if="org.role" class="org-role">{{ org.role }}</p>
                    </div>
                </a>

                <!-- Non-clickable card when no website -->
                <div v-else class="org-card-content">
                    <img v-if="org.logo" :src="org.logo" :alt="org.name" class="org-logo" @error="handleLogoError" />
                    <div class="org-info">
                        <h4 class="org-name">{{ org.name }}</h4>
                        <p v-if="org.role" class="org-role">{{ org.role }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    organizations: {
        type: Array,
        required: true
    },
    title: {
        type: String,
        default: ''
    },
    titleClass: {
        type: String,
        default: 'h4'
    },
    metaItemStyle: {
        type: Boolean,
        default: false
    }
});

const handleLogoError = (event) => {
    event.target.style.display = 'none';
};
</script>

<style scoped>
.organizations-section {
    margin-bottom: 20px;
    /* Removed max-width to allow side-by-side alignment */
}

/* Meta item styling for project pages */
.meta-item h4 {
    color: var(--primary-color);
    margin-bottom: 8px;
    font-size: var(--fs-7);
    text-transform: uppercase;
    letter-spacing: 1px;
}

.org-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 15px;
    margin-top: 12px;
}

.org-card {
    background: var(--eerie-black-2);
    border: 1px solid var(--jet);
    border-radius: 10px;
    flex: 1 1 250px;
    min-width: 250px;
    max-width: 400px;
    /* Prevent cards from becoming too wide */
    transition: var(--transition-1);
    overflow: hidden;
}

.org-card:hover {
    border-color: var(--primary-color);
    transform: translateY(-1px);
}

.org-card-link,
.org-card-content {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 15px;
    width: 100%;
    height: 100%;
    text-decoration: none;
    color: inherit;
}

.org-card-link {
    transition: var(--transition-1);
}

.org-card-link:hover {
    background: rgba(255, 255, 255, 0.02);
}

.org-logo-link {
    display: flex;
    align-items: center;
    transition: var(--transition-1);
}

.org-logo-link:hover {
    transform: scale(1.05);
}

.org-logo {
    width: 40px;
    height: 40px;
    object-fit: contain;
    border-radius: 6px;
    padding: 2px;
}

.org-info {
    flex: 1;
    min-width: 0;
    /* Prevents flex item from overflowing */
}

.org-name {
    color: var(--primary-color);
    font-size: var(--fs-5);
    font-weight: var(--fw-500);
    margin: 0 0 4px 0;
    display: flex;
    align-items: center;
    gap: 6px;
}

.org-role {
    color: var(--light-gray-70);
    font-size: var(--fs-7);
    margin: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.external-icon {
    font-size: 12px;
    opacity: 0.7;
    flex-shrink: 0;
}

/* Meta item specific styles */
.meta-item .org-name {
    color: var(--white-2);
    font-size: var(--fs-6);
}

.meta-item .org-role {
    color: var(--light-gray);
    font-size: var(--fs-6);
}

/* Responsive adjustments */
@media (max-width: 767px) {
    .org-card {
        flex: 1 1 100%;
        min-width: 200px;
    }
}

@media (min-width: 768px) {
    .org-grid {
        gap: 20px;
    }

    .org-card-link,
    .org-card-content {
        padding: 18px;
    }

    .org-logo {
        width: 45px;
        height: 45px;
    }
}
</style>
