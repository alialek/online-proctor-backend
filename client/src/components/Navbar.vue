<template>
  <v-bottom-nav :active.sync="bottomNav" :color="color" :value="true" fixed dark shift>
    <router-link to="/profile">
      <v-btn dark>
        <span>Профиль</span>
        <v-icon>person</v-icon>
      </v-btn>
    </router-link>
    <router-link to="/">
      <v-btn dark>
        <span>Квесты</span>
        <v-icon>location_on</v-icon>
      </v-btn>
    </router-link>
    <router-link to="/teams">
      <v-btn dark>
        <span>Команда</span>
        <v-icon>people</v-icon>
      </v-btn>
    </router-link>
  </v-bottom-nav>
</template>

<script>
export default {
  name: "Navbar",
  props: {
    msg: String
  },
  data() {
    return {};
  },
  computed: {
    color() {
      switch (this.$route.name) {
        case "profile":
          return "#353941";
        case "events":
          return "#8d00ff";
        case "teams":
          return "#ffab2d";
        case "Riddle":
          return "black";
        default:
          return "#8d00ff";
      }
    },
    bottomNav() {
      switch (this.$route.name) {
        case "profile":
          return 0;
        case "events":
          return 1;
        case "teams":
          return 2;
        case "Riddle":
          return 1;
        default:
          return 1;
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
