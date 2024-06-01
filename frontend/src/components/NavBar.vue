<template>
    <nav class="navbar navbar-expand-md custom-nav">
        <div class="container">
            <RouterLink :to="{ name: 'home' }" class="navbar-brand">{{ brandName }}</RouterLink>
            <ul class="navbar-nav">
                <li class="nav-item">
                    <RouterLink :to="{ name: 'home' }" class="nav-link">Home</RouterLink>
                </li>
                <li class="nav-item">
                    <RouterLink :to="{ name: 'books' }" class="nav-link">Books</RouterLink>
                </li>
                <li class="nav-item" v-if="isLoggedIn">
                    <RouterLink :to="{ name: 'dashboard' }" class="nav-link">Dashboard</RouterLink>
                </li>
                <li class="nav-item" v-if="!isLoggedIn">
                    <RouterLink :to="{ name: 'login' }" class="nav-link">Login</RouterLink>
                </li>
                <li class="nav-item" v-if="!isLoggedIn">
                    <RouterLink :to="{ name: 'register' }" class="nav-link">Register</RouterLink>
                </li>
            </ul>
        </div>

    </nav>
</template>

<script>
import { useAuthStore } from '@/stores/authStore.js';
import { mapState } from 'pinia';
export default {
    name: "NavBar",
    data() {
        return {
            brandName: "BostorekO"
        }
    },
    computed: {
        ...mapState(useAuthStore, ['isLoggedIn']),
    }
}
</script>

<style scoped>
.custom-nav {
    background-color: var(--primary-color);
    padding: 15px 0;
}

.navbar-brand {
    padding: 0;
    margin: 0;
    color: #fff;
    font-size: 24px;
    font-weight: bold;
}

.nav-link {
    padding: 10px 15px !important;
    color: #fff;
    text-align: center;
}

.nav-link:hover {
    color: var(--secondary-color);
}

.active-link {
    color: var(--secondary-color);
}
</style>