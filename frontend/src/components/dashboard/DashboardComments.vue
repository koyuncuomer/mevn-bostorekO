<template>
    <div class="row">
        <div class="col">
            <table class="table">
                <thead>
                    <tr>
                        <th>Content</th>
                        <th>Book</th>
                        <th class="text-center">Edit</th>
                        <th class="text-center">Delete</th>
                    </tr>
                </thead>
                <TransitionGroup name="list" tag="tbody">
                    <tr v-for="comment in paginatedComments" :key="comment._id">
                        <td>{{ comment.content }} /// {{ comment._id }}</td>
                        <td>{{ comment.book.title }}</td>
                        <td class="text-center">
                            <font-awesome-icon :icon="['far', 'pen-to-square']" class="text-warning"
                                style="cursor: pointer" @click="openEditModal(comment)" />
                        </td>
                        <td class="text-center">
                            <font-awesome-icon :icon="['fas', 'trash']" class="text-danger" style="cursor: pointer"
                                @click="deleteComment(comment._id)" />
                        </td>
                    </tr>
                </TransitionGroup>
            </table>
        </div>
    </div>
    <div class="row">
        <PaginationWidget :currentPage="currentPage" :totalPages="totalPages" @page-changed="updatePage" />
    </div>

    <!-- Modal -->
    <div class="modal fade" ref="addEditModal" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="addModalLabel">{{ modalTitle }}</h5>
                    <button @click="modal.hide()" type="button" class="btn-close" aria-label="Close"></button>
                </div>
                <div class="modal-body mx-5">

                    <div class="col mb-3">
                        <label for="description" class="form-label">Comment
                            <span class="text-danger">*</span>
                        </label>
                        <textarea v-model="commentData.content" name="description" id="description" class="form-control"
                            cols="30" rows="4"></textarea>
                    </div>

                    <div class="text-end mb-4">
                        <button @click="modal.hide()" type="button" class="btn btn-outline-secondary">
                            Close
                        </button>
                        <button @click="saveComment()" type="button" class="btn btn-primary">Save</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { Modal } from 'bootstrap';
import { useCommentStore } from '@/stores/commentStore.js';
import { useAuthStore } from '@/stores/authStore.js';
import { mapState, mapActions } from 'pinia';
import { useToast } from "vue-toastification";
import PaginationWidget from "@/components/widgets/PaginationWidget.vue"
export default {
    name: 'DashboardComments',
    components: {
        PaginationWidget
    },
    data() {
        return {
            modal: null,
            modalTitle: "Edit Comment",
            commentData: {
                content: ''
            },
            editedCommentId: null,
            currentPage: 1,
            itemsPerPage: 2
        }
    },
    mounted() {
        this.modal = new Modal(this.$refs.addEditModal)
    },
    created() {
        this.fetchCommentsByUser(this.user._id)
    },
    computed: {
        ...mapState(useCommentStore, ['commentsByUser']),
        ...mapState(useAuthStore, ['user']),
        userComments() {
            return this.commentsByUser
                .slice()
                .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        },
        totalPages() {
            return Math.ceil(this.userComments.length / this.itemsPerPage)
        },
        paginatedComments() {
            const startIndex = (this.currentPage - 1) * this.itemsPerPage
            const endIndex = startIndex + this.itemsPerPage
            return this.userComments.slice(startIndex, endIndex)
        }
    },
    methods: {
        ...mapActions(useCommentStore, ['fetchCommentsByUser', 'deleteTheComment', 'editTheComment']),

        openEditModal(existingComment) {
            this.modalTitle = "Edit Comment"
            this.editedCommentId = existingComment._id
            this.commentData = {
                content: existingComment.content
            }
            this.modal.show();
        },

        async saveComment() {
            try {
                await this.editTheComment(this.editedCommentId, this.commentData)

                await this.fetchCommentsByUser(this.user._id)

                this.modal.hide()

                this.showToast('Comment edited successfully', {
                    type: 'success',
                    timeout: 1000,
                });
            } catch (error) {
                console.error(error)
            }
        },
        async deleteComment(commentId) {
            try {
                await this.deleteTheComment(commentId)

                await this.fetchCommentsByUser(this.user._id)

                this.showToast(`Comment deleted succesfully`, {
                    type: 'warning',
                    timeout: 1000,
                });
            } catch (error) {
                console.error(error)
            }
        },
        showToast(message, options) {
            const toast = useToast();
            toast(message, {
                position: 'top-right',
                closeButton: 'button',
                icon: true,
                rtl: false,
                ...options,
            });
        },
        updatePage(page) {
            this.currentPage = page
        }
    }
};
</script>

<style scoped>
.btn-outline-secondary {
    border-radius: 25px;
    height: 48px;
    margin-right: 20px;
    min-width: 120px;

}

.list-move,
/* apply transition to moving elements */
.list-enter-active,
.list-leave-active {
    transition: all 1s ease;
}

.list-enter-from,
.list-leave-to {
    opacity: 0;
    transform: translateX(200px);
}

/* ensure leaving items are taken out of layout flow so that moving
   animations can be calculated correctly. */
.list-leave-active {
    position: absolute;
}
</style>