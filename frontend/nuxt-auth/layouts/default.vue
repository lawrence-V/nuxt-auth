<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"> </v-app-bar-nav-icon>
      <v-toolbar-title>My Blog App</v-toolbar-title>
      <v-spacer></v-spacer>

      <div v-if="auth">
        <!-- <p>{{ loggedInUser.email }}</p> -->
        <v-btn text @click="logout">Logout</v-btn>
        <v-btn text to="#">Profile</v-btn>
      </div>
      <div v-else>
        <v-btn text to="/login">Login</v-btn>
        <v-btn text to="/register">Register</v-btn>
      </div>

      <v-btn
        icon
        :color="$vuetify.theme.dark ? 'yellow' : 'dark'"
        @click="$vuetify.theme.dark = !$vuetify.theme.dark"
      >
        <v-icon>mdi-brightness-4</v-icon></v-btn
      >

      <template v-slot:extension>
        <v-tabs align-with-title class="dark">
          <v-tab style="color: white" :to="{ name: 'index' }">Post Data</v-tab>
          <v-tab style="color: white" :to="{ name: 'inspire' }">Map</v-tab>
          <v-tab style="color: white" :to="{ name: 'newsfeed' }"
            >Newsfeed</v-tab
          >
          <v-tab :to="{ name: 'allpost' }" style="color: white">All Post</v-tab>
        </v-tabs>
      </template>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" app>
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>

    <v-footer :absolute="!fixed" app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      auth: false,

      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: "mdi-apps",
          title: "Welcome",
          to: "/",
        },
        {
          icon: "mdi-chart-bubble",
          title: "Inspire",
          to: "/inspire",
        },
        {
          icon: "mdi-chart-bubble",
          title: "Image",
          to: "/image",
        },
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: "Vuetify.js",
    };
  },

  mounted() {
    this.$nuxt.$on("auth", (auth) => {
      this.auth = auth;
    });
  },

  methods: {
    async logout() {
      console.log("1");
      // Send a request to the server to log the user out
      await this.$axios
        .post("http://localhost:8200/api/logout", {
          withCredentials: true,
        })
        .then((response) => {
          console.log("2");
          // Delete the JWT cookie
          // this.$nuxt.$cookies.set("jwt", "", {
          //   maxAge: 0,
          // });

          // Redirect the user to the login page
          this.$router.push("/login");
        })
        .catch((error) => {
          this.error = error;
        });
    },
  },
};
</script>
