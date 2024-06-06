<template>
    <div class="container">
        <SectionHeader :title="book.title" :text="book.author" />

        <div class="d-flex">
            <font-awesome-icon icon="arrow-left" size="xl" class="mb-2"
                style="cursor: pointer; color: var(--secondary-color)" @click="goToBackBooks" />
        </div>
        <div class="row">
            <div class="col-md-6">
                <div class="image-box">
                    <img class="img-fluid" :src="book.imageUrl" />
                </div>
            </div>
            <div class="col-md-6">
                <div class="d-flex flex-column h-100 justify-content-between">
                    <div class="mb-3">
                        <p>
                            {{ book.description }}
                        </p>
                    </div>
                    <div class="d-flex flex-column">
                        <div class="row border-bottom pb-2">
                            <div class="col-lg-6"><strong>Page</strong></div>
                            <div class="col-lg-6">{{ book.pageNumber }}</div>
                        </div>
                        <div class="row border-bottom pb-2">
                            <div class="col-lg-6"><strong>Rating</strong></div>
                            <div class="col-lg-6">{{ averageRating }} - ({{ ratingCount }} rates)</div>
                        </div>
                        <div class="row border-bottom pb-2">
                            <div class="col-lg-6"><strong>Upload Date</strong></div>
                            <div class="col-lg-6">{{ formatDate(book.updatedAt) }}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row mt-3">
            <div class="col-md-6">
                <div class="box">
                    <div v-if="isLoggedIn">
                        <h3 style="color: var(--primary-color)">Rate The Book</h3>
                        <form @submit.prevent="addEditRate()">
                            <!-- Rating Input -->
                            <div class="mb-3" v-if="isUserAlreadyRated">
                                <input type="number" id="rating" class="form-control w-50" min="1" max="10"
                                    placeholder="Rate (1-10)" required v-model="userRate.rate" />
                            </div>
                            <div class="mb-3" v-else>
                                <input type="number" id="rating" class="form-control w-50" min="1" max="10"
                                    placeholder="Rate (1-10)" required v-model="userRate.rate" />
                            </div>

                            <!-- Submit Button -->
                            <button type="submit" class="btn btn-primary">Rate</button>

                            <font-awesome-icon v-if="isUserAlreadyRated" :icon="['fas', 'trash']" class="text-danger"
                                style="cursor: pointer; margin-left: 10px;" @click="deleteRate()" />


                        </form>
                    </div>
                    <RouterLink v-else to="/login">
                        <p style="color: var(--secondary-color)">Log in for rating</p>
                    </RouterLink>
                </div>
            </div>
        </div>
        <hr v-if="isLoggedIn" />
        <div class="row mt-3">
            <div class="col-md-12">
                <div class="box">
                    <div v-if="isLoggedIn">
                        <h3 style="color: var(--primary-color)">Comment The Book</h3>
                        <form @submit.prevent="addComment()">
                            <!-- Comment Text Area -->
                            <div class="mb-3">
                                <textarea v-model="commentContent" id="comment" class="form-control" rows="4"
                                    placeholder="Enter your comment" required></textarea>
                            </div>

                            <!-- Submit Button -->
                            <button type="submit" class="btn btn-primary">Comment</button>
                        </form>
                    </div>
                    <RouterLink v-else to="/login">
                        <p style="color: var(--secondary-color)">Log in for comment</p>
                    </RouterLink>

                </div>
            </div>
        </div>
        <hr />
        <div class="row my-3">
            <div class="col-md-12">
                <div class="box">
                    <h3 style="color: var(--primary-color)">Comments</h3>
                    <div>
                        <div class="card mb-4" v-for="comment in commentsForBook" :key="comment._id">
                            <div class="card-body">
                                <p>{{ comment.content }}</p>

                                <div class="d-flex justify-content-between">
                                    <div class="d-flex flex-row align-items-center">
                                        <p class="small mb-0 ms-2">{{ comment.postedBy.username }}</p>
                                    </div>
                                    <div class="d-flex flex-row align-items-center" style="gap: 10px">

                                        <div class="d-flex flex-row align-items-center" style="gap: 10px" v-if="!user">
                                            <p class="small mb-0">Login for upvote!</p>
                                            <font-awesome-icon :icon="['fas', 'thumbs-up']"
                                                style="color: var(--secondary-color)" />
                                        </div>

                                        <div class="d-flex flex-row align-items-center"
                                            style="gap: 10px; cursor: pointer" v-else-if="
                                                !comment.upvotes.includes(user._id) &&
                                                comment.postedBy._id !== user._id
                                            " @click="upvote(comment._id)">
                                            <p class="small mb-0">Upvote?</p>
                                            <font-awesome-icon :icon="['far', 'thumbs-up']" />
                                        </div>

                                        <div class="d-flex flex-row align-items-center"
                                            style="gap: 10px; cursor: pointer" v-else-if="
                                                comment.upvotes.includes(user._id) &&
                                                comment.postedBy._id !== user._id
                                            " @click="downvote(comment._id)">
                                            <p class="small mb-0">Upvoted</p>
                                            <font-awesome-icon :icon="['fas', 'thumbs-up']"
                                                style="color: var(--secondary-color)" />
                                        </div>

                                        <div v-else class="d-flex flex-row align-items-center" style="gap: 10px">
                                            <p class="small mb-0">
                                                You can't upvote for your comment
                                            </p>
                                            <font-awesome-icon :icon="['fas', 'thumbs-up']"
                                                style="color: var(--secondary-color)" />
                                        </div>

                                        <p class="small text-muted mb-0">
                                            {{ comment.upvotes.length }}
                                        </p>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import SectionHeader from '@/components/SectionHeader.vue';
import { useBookStore } from '@/stores/bookStore.js';
import { useAuthStore } from '@/stores/authStore.js';
import { useCommentStore } from '@/stores/commentStore.js';
import { useRatingStore } from '@/stores/ratingStore.js';
import { useToast } from "vue-toastification";
import { ref, reactive, computed } from 'vue';
import { useRoute, useRouter } from "vue-router"

const book = ref(null)
const loading = ref(true)
const commentContent = ref("")
let userRate = reactive({
    _id: null,
    rate: null
})

const bookStore = useBookStore()
const authStore = useAuthStore()
const commentStore = useCommentStore()
const ratingStore = useRatingStore()
const route = useRoute()
const router = useRouter()

const goToBackBooks = () => {
    router.push({ name: 'books' });
}

const selectBook = () => {
    const bookId = route.params.id;
    book.value = bookStore.selectedBook(bookId);
    loading.value = false;
}

const addComment = async () => {
    try {
        const bookId = route.params.id
        const content = commentContent.value
        const userId = authStore.user._id

        await commentStore.addNewComment({
            bookId, content, userId
        })

        commentContent.value = ""

        await commentStore.fetchCommentsForBook(route.params.id)

        showToast('Comment added successfully', {
            type: 'success',
            timeout: 1000,
        });
    } catch (error) {
        console.log('bookdetailview addComment', error)
    }
}

const addEditRate = async () => {
    try {
        if (userRate._id) {
            const rate = userRate.rate
            await ratingStore.editTheRate(userRate._id, { rate })
        } else {
            const bookId = route.params.id
            const rate = userRate.rate
            const userId = authStore.user._id

            await ratingStore.addNewRate({
                bookId, rate, userId
            })
        }

        await ratingStore.fetchRatingsForBook(route.params.id)

        showToast('Rating successfully', {
            type: 'success',
            timeout: 1000,
        });
    } catch (error) {
        console.log('bookdetailview addEditRate', error)
    }
}

const deleteRate = async () => {
    try {
        await ratingStore.deleteTheRate(userRate._id)

        await ratingStore.fetchRatingsForBook(route.params.id)

        userRate = { _id: null, rate: null }

        showToast(`Rating deleted succesfully`, {
            type: 'warning',
            timeout: 1000,
        });
    } catch (error) {
        console.error(error)
    }
}

const upvote = async (commentId) => {
    try {
        await commentStore.upvoteComment(commentId)

        await commentStore.fetchCommentsForBook(route.params.id)
    } catch (error) {

    }
}

const downvote = async (commentId) => {
    try {
        await commentStore.downvoteComment(commentId)

        await commentStore.fetchCommentsForBook(route.params.id)
    } catch (error) {

    }
}

const showToast = (message, options) => {
    const toast = useToast();
    toast(message, {
        position: 'top-right',
        closeButton: 'button',
        icon: true,
        rtl: false,
        ...options,
    });
}

const formatDate = (date_) => {
    const date = new Date(date_);
    const formatter = new Intl.DateTimeFormat('tr-TR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });
    return formatter.format(date);
}

const averageRating = computed(() => {
    if (ratingStore.ratingsForBook.length > 0) {
        const totalRating = ratingStore.ratingsForBook.reduce((sum, rating) => sum + rating.rate, 0)

        return (totalRating / ratingStore.ratingsForBook.length).toFixed(1)
    }
    else return 0
})

const ratingCount = computed(() => {
    return ratingStore.ratingsForBook ? ratingStore.ratingsForBook.length : 0
})

const isUserAlreadyRated = computed(() => {
    if (!authStore.user)
        return false

    const userRatingObj = ratingStore.ratingsForBook.find((rating) => rating.ratedBy._id === authStore.user._id)

    if (userRatingObj) {
        userRate = { ...userRatingObj }
        return true
    } else {
        userRate = { _id: null, rate: null }
        return false
    }
})

const userRating = computed(() => {
    if (!authStore.user)
        return null

    const userRatingObj = ratingStore.ratingsForBook.find((rating) => rating.ratedBy._id === authStore.user._id)
    return userRatingObj ? userRatingObj.rate : null
})

const isLoggedIn = computed(() => authStore.isLoggedIn)
const commentsForBook = computed(() => commentStore.commentsForBook)
const user = computed(() => authStore.user)


selectBook();
commentStore.fetchCommentsForBook(route.params.id)
ratingStore.fetchRatingsForBook(route.params.id)

</script>

<style scoped>
.image-box {
    height: 300px;
    overflow: hidden;
}

.image-box img {
    width: 100% !important;
}

.btn-primary {
    height: 36px;
    min-width: 120px;
    border-radius: 16px;
}

.box {
    border: 1px solid #e2e3e5;
    border-radius: 10px;
    padding: 20px;
}
</style>