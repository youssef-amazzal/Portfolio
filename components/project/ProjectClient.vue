<template>
    <div class="meta-item" v-if="project.client">
        <h4 class="h4">Client/Organization</h4>
        <div class="client-info">
            <a v-if="project.clientWebsite && project.clientLogo" :href="project.clientWebsite" target="_blank"
                rel="noopener noreferrer" class="client-logo-link">
                <img :src="project.clientLogo" :alt="project.client" class="client-logo">
            </a>
            <img v-else-if="project.clientLogo" :src="project.clientLogo" :alt="project.client" class="client-logo">

            <div class="client-text">
                <a v-if="project.clientWebsite" :href="project.clientWebsite" target="_blank" rel="noopener noreferrer"
                    class="client-name-link">
                    {{ project.client }}
                    <ion-icon name="open-outline" class="external-icon"></ion-icon>
                </a>
                <p v-else>{{ project.client }}</p>
            </div>
        </div>
    </div>
</template>

<script setup>
defineProps({
    project: {
        type: Object,
        required: true
    }
})
</script>

<style scoped>
.meta-item h4 {
    color: var(--primary-color);
    margin-bottom: 8px;
    font-size: var(--fs-7);
    text-transform: uppercase;
    letter-spacing: 1px;
}

.client-info {
    display: flex;
    align-items: center;
    gap: 12px;
}

.client-logo {
    width: 40px;
    height: 40px;
    object-fit: contain;
    border-radius: 6px;
    padding: 4px;
}

.client-logo-link:hover .client-logo {
    transform: scale(1.05);
    transition: var(--transition-1);
}

.client-text {
    flex: 1;
}

.client-name-link {
    color: var(--white-2);
    text-decoration: none;
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: var(--fs-6);
    transition: var(--transition-1);
}

.client-name-link:hover {
    color: var(--white-2);
}

.external-icon {
    font-size: 12px;
    opacity: 0.7;
}

.meta-item p {
    color: var(--light-gray);
    font-size: var(--fs-6);
}
</style>
