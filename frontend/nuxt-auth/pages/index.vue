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
    const response = await fetch("http://localhost:8200/api/user", {
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });

    const content = await response.json();

    this.message = "HI" + content.name;
  },
};
</script>

<style>
</style>