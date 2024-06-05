import { defineStore } from "pinia";
import axios from "axios";

export const useRatingStore = defineStore("ratingStore", {
  state: () => ({
    ratings: [],
    ratingsForBook: []
  }),

  actions: {
    async addNewRate(newRate) {
      try {
        const response = await axios.post(
          "http://localhost:3000/api/v1/ratings",
          newRate
        );
        this.ratings.push(response.data.rating);
      } catch (error) {
        console.error("Error addNewRating!", error);
        throw error.response.data;
      }
    },

    async fetchRatingsForBook(bookId) {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/v1/ratings/book/${bookId}`
        );

        this.ratingsForBook = response.data.ratings;
      } catch (error) {
        console.error("Error fetchRatingsForBook!", error);
        throw error.response.data;
      }
    },

    async editTheRate(ratingId, ratingData) {
      try {
        const response = await axios.put(
          `http://localhost:3000/api/v1/ratings/${ratingId}`,
          ratingData
        );
        const updatedRatingData = response.data.rating;

        const ratingIndex = this.ratings.findIndex((rating) => rating._id === ratingId);
        if (ratingIndex !== -1) {
          this.ratings.splice(ratingIndex, 1, updatedRatingData);
        }
      } catch (error) {
        throw error.response.data;
      }
    },
    async deleteTheRate(ratingId) {
      try {
        await axios.delete(`http://localhost:3000/api/v1/ratings/${ratingId}`);
        this.ratings = this.ratings.filter((rating) => rating._id !== ratingId);
      } catch (error) {
        throw error.response.data;
      }
    },
  },
});
