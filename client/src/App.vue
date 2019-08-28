<template>
  <v-app class="application">
    <router-view></router-view>
    <Navbar v-if="isLogged && !riddle" />
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
    },
    riddle() {
      return this.$route.name == "Riddle" ? true : false;
    }
  }
};
</script>

<style>
a {
  text-decoration: none;
}
@media (min-width: 600px) {
  .application {
    width: 480px;
    height: 100%;
    margin-left: 50%;
    transform: translateX(-50%);
  }
}
</style>
