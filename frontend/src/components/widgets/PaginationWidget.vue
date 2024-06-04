<template>
    <nav aria-label="Page navigation example">
        <ul class="pagination justify-content-end">
            <li class="page-item" :class="{ 'disabled': currentPage === 1 }">
                <a class="page-link" aria-label="Previous" @click="goToPage(currentPage - 1)">
                    <span aria-hidden="true">&laquo;</span>
                </a>
            </li>
            <li class="page-item" :class="{ 'active': currentPage === page }" v-for="page in totalPages" :key="page"><a
                    class="page-link" @click="goToPage(page)">{{ page }}</a></li>
            <li class="page-item" :class="{ 'disabled': currentPage === totalPages }">
                <a class="page-link" aria-label="Next" @click="goToPage(currentPage + 1)">
                    <span aria-hidden="true">&raquo;</span>
                </a>
            </li>
        </ul>
    </nav>
</template>


<script>
export default {
    name: "PaginationWidget",
    emits: ['page-changed'],
    props: {
        currentPage: {
            type: Number,
            required: true
        },
        totalPages: {
            type: Number,
            required: true
        }
    },
    methods: {
        goToPage(page) {
            this.$emit('page-changed', page)
        }
    }
}
</script>

<style scoped></style>