<template dark>
  <section class="quest">
    <v-toolbar
      fixed
      style="background-size: cover; background-color: rgba(0,0,145,0.7); "
      :style="{backgroundImage: 'url('+event.image+')'}"
      dark
    >
      <a @click="$router.go(-1)">
        <v-toolbar-side-icon>
          <v-icon>arrow_back</v-icon>
        </v-toolbar-side-icon>
      </a>
      <v-toolbar-title class="white--text">{{event.title}}</v-toolbar-title>

      <v-spacer></v-spacer>
    </v-toolbar>
    <section class="content">
      <v-list>
        <v-list-tile v-for="item in items" :key="item.title" avatar>
          <v-list-tile-avatar>
            <img :src="item.avatar" />
          </v-list-tile-avatar>

          <v-list-tile-content>
            <v-list-tile-title v-html="item.title"></v-list-tile-title>
          </v-list-tile-content>

          <v-list-tile-action>
            <v-icon :color="item.active ? 'teal' : 'grey'">chat_bubble</v-icon>
          </v-list-tile-action>
        </v-list-tile>
      </v-list>
    </section>
  </section>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "Quest",
  components: {},
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      riddles: "quest/riddles"
    })
  },
  beforeCreate() {
    this.$store.dispatch("quest/getEventByIDAndRiddles", this.$route.params.id);
  }
};
</script>

<style scoped>
.quest {
  width: 100%;
  height: 100%;
}

.content {
  margin-top: 130px;
  overflow: scroll;
  margin-bottom: 60px;
}
.content__subheader {
  color: lightgray;
  text-transform: uppercase;
  font-size: 14px;
}
</style>

