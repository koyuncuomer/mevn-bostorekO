import { defineStore } from "pinia";
import axios from "axios";

export const useCommentStore = defineStore("commentStore", {
  state: () => ({
    comments: [],
    commentsForBook: [],
    commentsByUser: [],
  }),

  actions: {
    async fetchComments() {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/v1/comments"
        );

        this.comments = response.data;
      } catch (error) {
        console.error("Error fetchComments!", error);
      }
    },

    async addNewComment(newComment) {
      try {
        await axios.post("http://localhost:3000/api/v1/comments", newComment);
        await this.fetchComments();
      } catch (error) {
        console.error("Error addNewComment!", error);
        throw error.response.data;
      }
    },

    async fetchCommentsForBook(bookId) {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/v1/comments/book/${bookId}`
        );

        this.commentsForBook = response.data.comments;
      } catch (error) {
        console.error("Error fetchCommentsForBook!", error);
        throw error.response.data;
      }
    },

    async fetchCommentsByUser(userId) {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/v1/comments/user/${userId}`
        );

        this.commentsByUser = response.data.comments;
      } catch (error) {
        console.error("Error fetchCommentsByUser!", error);
        throw error.response.data;
      }
    },

    async editTheComment(commentId, commentData) {
      try {
        const response = await axios.put(
          `http://localhost:3000/api/v1/comments/${commentId}`,
          commentData
        );
        const updatedCommentData = response.data.comment;

        const commentIndex = this.comments.findIndex(
          (comment) => comment._id === commentId
        );
        if (commentIndex !== -1) {
          this.comments.splice(commentIndex, 1, updatedCommentData);
        }
      } catch (error) {
        throw error.response.data;
      }
    },
    async deleteTheComment(commentId) {
      try {
        await axios.delete(
          `http://localhost:3000/api/v1/comments/${commentId}`
        );
        this.comments = this.comments.filter(
          (comment) => comment._id !== commentId
        );
      } catch (error) {
        throw error.response.data;
      }
    },
  },
});
