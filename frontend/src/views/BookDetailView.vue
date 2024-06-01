<template>
    <section>
        <div class="container" v-if="!loading">
            <SectionHeader :title="book.title" :text="book.author" />
            <font-awesome-icon icon="arrow-left" size="2xl" class="mb-2" style="cursor: pointer;"
                @click="goToBackBooks" />
            <div class="row mb-4">
                <div class="col-lg-6">
                    <img class="card-img-top" src="../../template/images/b_detail.jpg" />
                </div>
                <div class="col-lg-6 details-wrapper">
                    <p class="lead description">{{ book.description }}</p>
                    <div class="mb-4">
                        <div class="row border-bottom pb-2">
                            <div class="col-lg-6"><strong>Page</strong></div>
                            <div class="col-lg-6">{{ book.pageNumber }}</div>
                        </div>
                        <div class="row border-bottom pb-2">
                            <div class="col-lg-6"><strong>Category</strong></div>
                            <div class="col-lg-6">Fiction</div>
                        </div>
                        <div class="row border-bottom pb-2">
                            <div class="col-lg-6"><strong>Rating</strong></div>
                            <div class="col-lg-6">{{ book.rating }}</div>
                        </div>
                        <div class="row border-bottom pb-2">
                            <div class="col-lg-6"><strong>Upload Date</strong></div>
                            <div class="col-lg-6">{{ book.updatedAt }}</div>
                        </div>
                    </div>

                    <div class="comments-section">
                        <h3 class="diplay-6 mb-2">Comments</h3>
                        <div class="card mb-4">
                            <div class="card-body">
                                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repellat, suscipit.</p>
                                <div class="d-flex justify-content-between">
                                    <p class="fw-bold fst-italic">John Doe</p>
                                    <div class="d-flex align-items-center">
                                        <font-awesome-icon :icon="['far', 'thumbs-up']" />
                                        <p class="ps-2 mb-0"><strong>8</strong></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="card mb-4">
                            <div class="card-body">
                                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repellat, suscipit.</p>
                                <div class="d-flex justify-content-between">
                                    <p class="fw-bold fst-italic">John Doe</p>
                                    <div class="d-flex align-items-center">
                                        <font-awesome-icon :icon="['far', 'thumbs-up']" />
                                        <p class="ps-2 mb-0"><strong>8</strong></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="card mb-4">
                            <div class="card-body">
                                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repellat, suscipit.</p>
                                <div class="d-flex justify-content-between">
                                    <p class="fw-bold fst-italic">John Doe</p>
                                    <div class="d-flex align-items-center">
                                        <font-awesome-icon :icon="['far', 'thumbs-up']" />
                                        <p class="ps-2 mb-0"><strong>8</strong></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="card mb-4">
                            <div class="card-body">
                                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repellat, suscipit.</p>
                                <div class="d-flex justify-content-between">
                                    <p class="fw-bold fst-italic">John Doe</p>
                                    <div class="d-flex align-items-center">
                                        <font-awesome-icon :icon="['far', 'thumbs-up']" />
                                        <p class="ps-2 mb-0"><strong>8</strong></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="card mb-4">
                            <div class="card-body">
                                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repellat, suscipit.</p>
                                <div class="d-flex justify-content-between">
                                    <p class="fw-bold fst-italic">John Doe</p>
                                    <div class="d-flex align-items-center">
                                        <font-awesome-icon :icon="['far', 'thumbs-up']" />
                                        <p class="ps-2 mb-0"><strong>8</strong></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="container" v-else>
            <p>Loading!</p>
        </div>
    </section>
</template>

<script>
import SectionHeader from '@/components/SectionHeader.vue';

export default {
    name: "BookDetailView",
    components: {
        SectionHeader
    },
    data() {
        return {
            book: null,
            loading: true
        }
    },
    methods: {
        goToBackBooks() {
            this.$router.push({ name: "books" })
        },
        async fetchABook() {
            const bookId = this.$route.params.id

            try {
                const response = await fetch(`http://localhost:3000/api/v1/books/${bookId}`)
                const data = await response.json()
                this.book = data
                this.loading = false
            } catch (error) {

            }
        }
    },
    created() {
        this.fetchABook()
    }
}
</script>

<style scoped>
.details-wrapper {
    max-height: 740px;
    display: flex;
    flex-direction: column;
}

.comments-section {
    flex-grow: 1;
    overflow-y: auto;
}

.description {
    min-height: 150px;
    max-height: 250px;
    overflow-y: auto;
}
</style>