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
    return {
      bottomNav: 1
    };
  },
  computed: {
    color() {
      switch (this.bottomNav) {
        case 0:
          return "#353941";
        case 1:
          return "#4ab8e1";
        case 2:
          return "#ffab2d";
        default:
          return black;
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
