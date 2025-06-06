<template>
    <section class="clients">
        <h3 class="h3 clients-title">Clients</h3>
        <ul class="clients-list has-scrollbar">
            <li class="clients-item" v-for="(client, index) in clients" :key="index">
                <a href="#">
                    <img :src="client.logo" :alt="client.name">
                </a>
            </li>
        </ul>
    </section>
</template>

<script setup>
const clients = [
    { name: "Client Logo 1", logo: "/assets/images/logo-1-color.png" },
    { name: "Client Logo 2", logo: "/assets/images/logo-2-color.png" },
    { name: "Client Logo 3", logo: "/assets/images/logo-3-color.png" },
    { name: "Client Logo 4", logo: "/assets/images/logo-4-color.png" },
    { name: "Client Logo 5", logo: "/assets/images/logo-5-color.png" },
    { name: "Client Logo 6", logo: "/assets/images/logo-6-color.png" }
];
</script>
