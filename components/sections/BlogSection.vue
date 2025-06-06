<template>
    <article class="blog" data-page="blog">
        <header>
            <h2 class="h2 article-title">Blog</h2>
        </header>

        <section class="blog-posts">
            <ul class="blog-posts-list">
                <li class="blog-post-item" v-for="post in blogPosts" :key="post.title">
                    <a href="#">
                        <figure class="blog-banner-box">
                            <img :src="post.image" :alt="post.title" loading="lazy">
                        </figure>
                        <div class="blog-content">
                            <div class="blog-meta">
                                <p class="blog-category">{{ post.category }}</p>
                                <span class="dot"></span>
                                <time :datetime="post.date">{{ post.dateFormatted }}</time>
                            </div>
                            <h3 class="h3 blog-item-title">{{ post.title }}</h3>
                            <p class="blog-text">{{ post.excerpt }}</p>
                        </div>
                    </a>
                </li>
            </ul>
        </section>
    </article>
</template>

<script setup>
const blogPosts = [
    {
        title: 'Design conferences in 2022',
        category: 'Design',
        date: '2022-02-23',
        dateFormatted: 'Fab 23, 2022',
        excerpt: 'Veritatis et quasi architecto beatae vitae dicta sunt, explicabo.',
        image: '/assets/images/blog-1.jpg'
    },
    {
        title: 'Best fonts every designer',
        category: 'Design',
        date: '2022-02-23',
        dateFormatted: 'Fab 23, 2022',
        excerpt: 'Sed ut perspiciatis, nam libero tempore, cum soluta nobis est eligendi.',
        image: '/assets/images/blog-2.jpg'
    },
    {
        title: 'Design digest #80',
        category: 'Design',
        date: '2022-02-23',
        dateFormatted: 'Fab 23, 2022',
        excerpt: 'Excepteur sint occaecat cupidatat no proident, quis nostrum exercitationem ullam corporis suscipit.',
        image: '/assets/images/blog-3.jpg'
    },
    {
        title: 'UI interactions of the week',
        category: 'Design',
        date: '2022-02-23',
        dateFormatted: 'Fab 23, 2022',
        excerpt: 'Enim ad minim veniam, consectetur adipiscing elit, quis nostrud exercitation ullamco laboris nisi.',
        image: '/assets/images/blog-4.jpg'
    },
    {
        title: 'The forgotten art of spacing',
        category: 'Design',
        date: '2022-02-23',
        dateFormatted: 'Fab 23, 2022',
        excerpt: 'Maxime placeat, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        image: '/assets/images/blog-5.jpg'
    },
    {
        title: 'Design digest #79',
        category: 'Design',
        date: '2022-02-23',
        dateFormatted: 'Fab 23, 2022',
        excerpt: 'Optio cumque nihil impedit uo minus quod maxime placeat, velit esse cillum.',
        image: '/assets/images/blog-6.jpg'
    }
];
</script>

<style scoped>
/* Blog section styles */
.blog-posts {
    margin-bottom: 10px;
}

.blog-posts-list {
    display: grid;
    grid-template-columns: 1fr;
    gap: 20px;
}

.blog-post-item>a {
    position: relative;
    background: var(--border-gradient-onyx);
    height: 100%;
    box-shadow: var(--shadow-4);
    border-radius: 16px;
    z-index: 1;
}

.blog-post-item>a::before {
    content: "";
    position: absolute;
    inset: 1px;
    border-radius: inherit;
    background: var(--eerie-black-1);
    z-index: -1;
}

.blog-banner-box {
    width: 100%;
    height: 200px;
    border-radius: 12px;
    overflow: hidden;
}

.blog-banner-box img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: var(--transition-1);
}

.blog-post-item>a:hover .blog-banner-box img {
    transform: scale(1.1);
}

.blog-content {
    padding: 15px;
}

.blog-meta {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 7px;
    margin-bottom: 10px;
}

.blog-meta :is(.blog-category, time) {
    color: var(--light-gray-70);
    font-size: var(--fs-6);
    font-weight: var(--fw-300);
}

.blog-meta .dot {
    background: var(--light-gray-70);
    width: 4px;
    height: 4px;
    border-radius: 4px;
}

.blog-item-title {
    margin-bottom: 10px;
    line-height: 1.3;
    transition: var(--transition-1);
}

.blog-post-item>a:hover .blog-item-title {
    color: var(--primary-color);
}

.blog-text {
    color: var(--light-gray);
    font-size: var(--fs-6);
    font-weight: var(--fw-300);
    line-height: 1.6;
}

/* Media queries for responsive design */
@media (min-width: 450px) {
    .blog-banner-box {
        height: auto;
    }
}

@media (min-width: 580px) {
    .blog-banner-box {
        border-radius: 16px;
    }

    .blog-posts-list {
        gap: 30px;
    }

    .blog-content {
        padding: 25px;
    }
}

@media (min-width: 768px) {
    .blog-posts-list {
        grid-template-columns: 1fr 1fr;
    }
}

@media (min-width: 1024px) {
    .blog-banner-box {
        height: 230px;
    }
}
</style>
