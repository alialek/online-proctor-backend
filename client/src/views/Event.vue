<template>
  <section class="event">
    <v-toolbar
      fixed
      scroll-off-screen
      style="background-size: cover; background-color: rgba(0,0,145,0.7); "
      :style="{backgroundImage: 'url('+event.image+')'}"
      dark
      extended
    >
      <template v-slot:extension>
        <router-link to="/events">
          <v-toolbar-side-icon>
            <v-icon>arrow_back</v-icon>
          </v-toolbar-side-icon>
        </router-link>
        <v-toolbar-title style="margin-left: -8px;" class="white--text">{{event.title}}</v-toolbar-title>
        <v-spacer></v-spacer>

        <v-btn @click="getLink" fab dark color="pink" style="margin-top: 60px;">
          <v-icon dark>mdi-play-circle</v-icon>
        </v-btn>
      </template>

      <v-spacer></v-spacer>
    </v-toolbar>
    <v-flex v-if="event" xs12 class="content">
      <v-layout>
        <v-flex column class="d-flex flex-column justify-center align-center align-content-center">
          <v-icon large dark color="#8d00ff">group</v-icon>

          <h5>{{event.tags.typeTeam}}</h5>
        </v-flex>
        <v-flex class="d-flex flex-column justify-center align-center align-content-center">
          <v-icon large dark color="#8d00ff">book</v-icon>

          <h5>{{event.tags.typeGenre}}</h5>
        </v-flex>
      </v-layout>
      <v-layout class="mt-2">
        <v-flex xs6 class="d-flex flex-column justify-center align-center align-content-center">
          <v-icon large dark color="#8d00ff">access_time</v-icon>

          <h5>{{event.tags.typeTime}}</h5>
        </v-flex>
        <v-flex xs6 class="d-flex flex-column justify-center align-center align-content-center">
          <v-icon large dark color="#8d00ff">pin_drop</v-icon>

          <h5>{{event.tags.location}}</h5>
        </v-flex>
      </v-layout>
      <v-layout class="mt-3 mb-3">
        <h2 class="content__subheader ml-1">Описание</h2>
      </v-layout>
      <v-card flat>
        <v-card-text class="px-0 pl-2 pr-2">{{event.description}}</v-card-text>
      </v-card>
      <v-layout class="mt-3 mb-3">
        <h2 class="content__subheader ml-1">Правила</h2>
      </v-layout>
      <v-card flat>
        <v-card-text class="pl-2 pr-2">{{event.rules}}</v-card-text>
      </v-card>
    </v-flex>
    <v-dialog v-model="dialog" max-width="290">
      <v-card class="d-flex fluid justify-content-center">
        <div v-if="!loading">
          <v-card-title class="headline">Подтвердите участие</v-card-title>

          <v-card-text>Стоимость участия: {{event.price}}</v-card-text>
          <v-card-text>Для подтверждения регистрации в игре нажмите ОК</v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn color="grey" flat dark text @click="dialog = false">Отмена</v-btn>

            <v-btn color="green darken-2" dark text @click="gameRegister">ОК</v-btn>
          </v-card-actions>
        </div>
      </v-card>
    </v-dialog>
  </section>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "Event",
  components: {},
  data() {
    return {
      link: "",
      dialog: false,
      loading: false
    };
  },
  methods: {
    getLink() {
      this.dialog = true;
      this.loading = true;

      let quests = this.userQuests.filter(
        quest => quest.id == this.$route.params.id
      );
      if (quests.length !== 0) {
        let riddleNum = quests[0].riddles[quests[0].riddles.length - 1].id;
        this.$router.push(
          "/quest/" + this.$route.params.id + "/riddle/" + riddleNum
        );
      } else {
        this.loading = false;
      }
    },

    gameRegister() {
      this.$store.dispatch("users/gameRegister", this.$route.params.id);

      this.dialog = false;
      this.$router.push("/quest/" + this.$route.params.id + "/riddle/" + 0);
    }
  },
  computed: {
    ...mapGetters({
      event: "quest/event",
      userQuests: "users/quests"
    })
  },
  beforeCreate() {
    this.$store.dispatch("quest/getEventByID", this.$route.params.id);
    this.$store.dispatch("users/getUserQuestsByID");
  }
};
</script>

<style scoped>
.event {
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

