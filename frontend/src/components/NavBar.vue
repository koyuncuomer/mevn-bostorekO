<template>
    <nav class="navbar navbar-expand-md custom-nav">
        <div class="container">
            <a href="#" class="navbar-brand">{{ brandName }}</a>
            <ul class="navbar-nav">
                <li class="nav-item">
                    <a href="#" class="nav-link">Home</a>
                </li>
                <li class="nav-item">
                    <a href="#" class="nav-link">Books</a>
                </li>
                <li class="nav-item">
                    <a href="#" class="nav-link">Contact Us</a>
                </li>
                <li class="nav-item">
                    <a href="#" class="nav-link">Login</a>
                </li>
                <li class="nav-item">
                    <a href="#" class="nav-link">Register</a>
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
    padding: 10px 25px;
    color: #fff;
    text-align: center;
}
</style>