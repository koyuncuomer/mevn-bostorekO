<template>
    <section>
        <div class="container">
            <SectionHeader title="Books"
                text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore, quod!" />
            <div v-if="isLoading">
                <LoadingWidget />
            </div>
            <div v-else>
                <BookList :books="paginatedBooks" />
                <PaginationWidget :currentPage="currentPage" :totalPages="totalPages" @page-changed="updatePage" />
            </div>
        </div>
    </section>
</template>

<script>
import SectionHeader from "@/components/SectionHeader.vue"
import BookList from "@/components/BookList.vue"
import PaginationWidget from "@/components/widgets/PaginationWidget.vue"
import LoadingWidget from "@/components/widgets/LoadingWidget.vue"

import { useBookStore } from "@/stores/bookStore.js"
import { mapState } from "pinia";

export default {
    name: "BooksView",
    components: {
        SectionHeader,
        BookList,
        PaginationWidget,
        LoadingWidget
    },
    data() {
        return {
            currentPage: 1,
            itemsPerPage: 8
        }
    },
    computed: {
        ...mapState(useBookStore, ['books', 'isLoading']),
        totalPages() {
            return Math.ceil(this.books.length / this.itemsPerPage)
        },
        paginatedBooks() {
            const startIndex = (this.currentPage - 1) * this.itemsPerPage
            const endIndex = startIndex + this.itemsPerPage
            return this.books.slice(startIndex, endIndex)
        }
    },

    methods: {
        updatePage(page) {
            this.currentPage = page
        }
    }
}
</script>
