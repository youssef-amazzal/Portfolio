<template>
    <OrganizationsCard v-if="hasClients" :organizations="project.clients" :title="clientsLabel" title-class="h4"
        :meta-item-style="true" />
    <!-- Backward compatibility for old client format -->
    <OrganizationsCard v-else-if="project.client" :organizations="legacyClientArray" title="Client/Organization"
        title-class="h4" :meta-item-style="true" />
</template>

<script setup>
import { computed } from 'vue'
import OrganizationsCard from '~/components/OrganizationsCard.vue'

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

// Convert legacy client format to new array format for compatibility
const legacyClientArray = computed(() => {
    if (!props.project.client) return []
    return [{
        name: props.project.client,
        logo: props.project.clientLogo || null,
        website: props.project.clientWebsite || null,
        role: null
    }]
})
</script>

<style scoped>
/* All styles are now handled by OrganizationsCard component */
</style>
