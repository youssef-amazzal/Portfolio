<template>
    <main>
        <Sidebar />

        <div class="main-content">
            <Navbar />
            <slot />
        </div>
    </main>
</template>

<script setup>
import Sidebar from '~/components/Sidebar.vue';
import Navbar from '~/components/Navbar.vue';

// Import Ionicons on the client side
onMounted(() => {
    if (process.client) {
        // Load Ionicons scripts
        const ioniconsModule = document.createElement('script');
        ioniconsModule.setAttribute('type', 'module');
        ioniconsModule.setAttribute('src', 'https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js');

        const ioniconsNoModule = document.createElement('script');
        ioniconsNoModule.setAttribute('nomodule', '');
        ioniconsNoModule.setAttribute('src', 'https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js');

        document.head.appendChild(ioniconsModule);
        document.head.appendChild(ioniconsNoModule);
    }
});
</script>
