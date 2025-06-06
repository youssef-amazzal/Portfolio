<template>
    <div class="separator"></div>
</template>

<style scoped>
.separator {
    width: 100%;
    height: 1px;
    background: var(--jet);
    margin: 16px 0;
}

@media (min-width: 580px) {
    .separator {
        margin: 16px 0;
    }
}

@media (min-width: 1250px) {
    .separator:last-of-type {
        margin: 15px 0;
        opacity: 0;
    }
}
</style>
