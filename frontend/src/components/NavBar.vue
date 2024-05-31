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
                <li class="nav-item">
                    <RouterLink :to="{ name: 'contact' }" class="nav-link">Contact Us</RouterLink>
                </li>
                <li class="nav-item">
                    <RouterLink :to="{ name: 'login' }" class="nav-link">Login</RouterLink>
                </li>
                <li class="nav-item">
                    <RouterLink :to="{ name: 'register' }" class="nav-link">Register</RouterLink>
                </li>
            </ul>
        </div>

    </nav>
</template>

<script>
export default {
    name: "NavBar",
    data() {
        return {
            brandName: "BostorekO"
        }
    }
}
</script>

<style scoped>
.custom-nav {
    background-color: #063547;
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
    color: #44b89d;
}

.active-link {
    color: #44b89d;
}
</style>