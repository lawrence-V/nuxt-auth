<template>
  <div>
    <p>{{ message }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      message: "",
    };
  },
  async mounted() {
    try {
      const response = await this.$axios.get("http://localhost:8200/api/user", {
        withCredentials: true,
      });
      console.log(response);
      this.message = "HI " + response.data.name;
      this.$nuxt.$emit("auth", true);
    } catch (error) {
      this.message = "You are not logged in";
      this.$nuxt.$emit("auth", false);
    }
  },
};
</script>

<style>
</style>