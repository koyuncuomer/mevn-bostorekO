import { defineStore } from "pinia";
import axios from "axios";

export const useUserStore = defineStore("userStore", {
  actions: {
    async updateUserDetails(updatedUserData) {
      this.isLoading = true;
      try {
        const response = await axios.put(
          "http://localhost:3000/api/v1/user/updateUser",
          updatedUserData
        );
        return response.data;
      } catch (error) {
        console.error("Error updateUserDetails!", error);
        throw error.response.data;
      }
    },
  },
});
