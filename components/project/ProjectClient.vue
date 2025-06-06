<template>
    <div class="meta-item" v-if="hasClients">
        <h4 class="h4">{{ clientsLabel }}</h4>
        <div class="clients-container">
            <div v-for="(client, index) in project.clients" :key="index" class="client-info">
                <a v-if="client.website && client.logo" :href="client.website" target="_blank" rel="noopener noreferrer"
                    class="client-logo-link">
                    <img :src="client.logo" :alt="client.name" class="client-logo">
                </a>
                <img v-else-if="client.logo" :src="client.logo" :alt="client.name" class="client-logo">

                <div class="client-text">
                    <a v-if="client.website" :href="client.website" target="_blank" rel="noopener noreferrer"
                        class="client-name-link">
                        {{ client.name }}
                        <ion-icon name="open-outline" class="external-icon"></ion-icon>
                    </a>
                    <p v-else>{{ client.name }}</p>
                </div>
            </div>
        </div>
    </div>
    <!-- Backward compatibility for old client format -->
    <div class="meta-item" v-else-if="project.client">
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
import { computed } from 'vue'

const props = defineProps({
    project: {
        type: Object,
        required: true
    }
})

// Check if project has the new clients array format
const hasClients = computed(() => {
    return props.project.clients && Array.isArray(props.project.clients) && props.project.clients.length > 0
})

// Dynamic label based on number of clients
const clientsLabel = computed(() => {
    if (!hasClients.value) return 'Client/Organization'
    return props.project.clients.length === 1 ? 'Client/Organization' : 'Clients/Organizations'
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

.clients-container {
    display: flex;
    flex-direction: column;
    gap: 12px;
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

/* Responsive design for multiple clients */
@media (min-width: 768px) {
    .clients-container {
        gap: 16px;
    }

    .client-logo {
        width: 45px;
        height: 45px;
    }
}
</style>
