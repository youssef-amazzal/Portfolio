<template>
    <nav class="navbar">
        <ul class="navbar-list">
            <li class="navbar-item" v-for="navItem in navItems" :key="navItem.name">
                <NuxtLink :to="navItem.path" class="navbar-link" :class="{ 'active': $route.path === navItem.path }">
                    {{ navItem.name }}
                </NuxtLink>
            </li>
        </ul>
    </nav>
</template>

<script setup>
const navItems = [
    { name: 'About', path: '/' },
    { name: 'Resume', path: '/resume' },
    { name: 'Portfolio', path: '/portfolio' },
    { name: 'Social Activities', path: '/social-activities' },
    { name: 'Job Offers', path: '/job-offers' },
    // { name: 'Blog', path: '/blog' },
    { name: 'Contact', path: '/contact' }
];
</script>

<style scoped>
/* Navbar styles */
.navbar {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    background: hsla(240, 1%, 17%, 0.75);
    backdrop-filter: blur(10px);
    border: 1px solid var(--jet);
    border-radius: 12px 12px 0 0;
    box-shadow: var(--shadow-2);
    z-index: 5;
}

.navbar-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    padding: 0 10px;
}

.navbar-link {
    color: var(--light-gray);
    font-size: var(--fs-8);
    padding: 20px 7px;
    transition: color var(--transition-1);
    cursor: pointer;
    text-decoration: none;
    display: block;
}

.navbar-link:hover,
.navbar-link:focus {
    color: var(--light-gray-70);
}

.navbar-link.active {
    color: var(--primary-color);
}

/* Media queries for responsive design */
@media (min-width: 580px) {
    .navbar {
        border-radius: 20px 20px 0 0;
    }

    .navbar-list {
        gap: 20px;
    }

    .navbar-link {
        --fs-8: 14px;
    }
}

@media (min-width: 768px) {
    .navbar-link {
        --fs-8: 15px;
    }
}

@media (min-width: 1024px) {
    .navbar {
        position: absolute;
        bottom: auto;
        top: 0;
        left: auto;
        right: 0;
        width: max-content;
        border-radius: 0 20px;
        padding: 0 20px;
        box-shadow: none;
    }

    .navbar-list {
        gap: 30px;
        padding: 0 20px;
    }

    .navbar-link {
        font-weight: var(--fw-500);
    }
}
</style>
