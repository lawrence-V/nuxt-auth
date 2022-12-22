<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md9
        ><form @submit.prevent="submit">
          <v-card class="elevation-12">
            <v-toolbar dark color="primary">
              <v-toolbar-title>Login form</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <v-text-field
                v-model="email"
                prepend-icon="mdi-account"
                name="email"
                label="email"
                type="email"
                required
              ></v-text-field>
              <v-text-field
                v-model="password"
                id="password"
                prepend-icon="mdi-lock"
                name="password"
                label="Password"
                type="password"
                required
              ></v-text-field>
            </v-card-text>
            <v-card-actions class="pa-3">
              <v-spacer></v-spacer>
              <v-btn color="primary" class="mb-4" type="submit">Login</v-btn>
            </v-card-actions>
          </v-card>
        </form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    async submit() {
      const userData = {
        email: this.email,
        password: this.password,
      };

      const config = {
        credentials: "include",
      };

      await this.$axios
        .post("http://localhost:8200/api/login", userData, {
          withCredentials: true,
        })
        .then((response) => {
          this.$router.push("/");
        })
        .catch((error) => {
          this.error = error;
        });

      // await fetch("http://localhost:8200/api/login", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   credentials: "include",
      //   body: JSON.stringify({
      //     email: this.email,
      //     password: this.password,
      //   }),
      // });
      // await this.$router.push("/");
    },
  },
};
</script>

<style></style>
