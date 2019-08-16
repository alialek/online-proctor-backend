<template>
  <v-app>
    <router-view></router-view>
    <Navbar v-if="isLogged" />
  </v-app>
</template>

<script>
import Navbar from "./components/Navbar";
export default {
  name: "App",
  components: { Navbar },
  data() {
    return {};
  },

  computed: {
    isLogged() {
      return this.$store.state.authentication.status.loggedIn;
    },
    isLoading() {
      return this.$store.state.quest.isLoading;
    }
  }
};
</script>

<style>
a {
  text-decoration: none;
}
</style>
