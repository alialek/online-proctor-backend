<template dark>
  <section class="riddle">
    <v-toolbar fixed style="background-size: cover; background-color: rgba(0,0,0,1); " dark>
      <router-link to="/events">
        <v-toolbar-side-icon>
          <v-icon>arrow_back</v-icon>
        </v-toolbar-side-icon>
      </router-link>
      <v-toolbar-title class="white--text">{{riddle.title}}</v-toolbar-title>
    </v-toolbar>

    <section class="content">
      <v-card
        class="mx-auto task-card grey darken-3"
        style="margin-bottom: 120px"
        dark
        max-width="90%"
      >
        <v-card-title>
          <v-icon medium left>extension</v-icon>
          <span class="title font-weight-light">Задание #{{riddle.num}}</span>
        </v-card-title>

        <v-card-text
          style="line-height: 1.2em"
          v-html="riddle.text"
          class="title text-xs-left task-text"
        ></v-card-text>
        <v-card-text>{{lat}}</v-card-text>
      </v-card>
    </section>

    <v-form
      style="bottom:50px; position: absolute; width: 100%"
      v-if="!riddle.last"
      @submit.prevent="postAnswer"
      elevation-19
    >
      <v-layout align-center justify-space-between>
        <v-text-field
          v-model="answer"
          v-if="riddle.required"
          class="ml-2 mt-3"
          light
          solo
          placeholder="Ответ"
        ></v-text-field>
        <v-card-text
          v-if="!riddle.required"
          class="headline mb-3 align-right text-xs-right font-weight-bold"
        >Далее</v-card-text>
        <v-btn :loading="loading" class="ml-2 mb-3" fab dark color="green darken-1">
          <v-icon dark>arrow_right</v-icon>
        </v-btn>
      </v-layout>
    </v-form>
  </section>
</template>

<script>
import { mapGetters, mapState } from "vuex";
export default {
  name: "Riddle",
  components: {},
  data() {
    return {
      answer: "",
      isLoading: false,
      lat: "",
      lng: ""
    };
  },
  methods: {
    postAnswer() {
      this.isLoading = true;
      this.$store.dispatch("quest/postAnswer", {
        answer: this.answer,
        questID: this.$route.params.id,
        riddleID: this.$route.params.riddle_id
      });
      this.isLoading = false;
    }
  },
  computed: {
    ...mapGetters({
      riddle: "quest/riddle"
    }),
    ...mapState("quest", {
      loading: state => state.loading
    }),
    success() {
      return this.$store.state.quest.success;
    }
  },
  beforeCreate() {
    this.$store.dispatch("quest/getRiddle", this.$route.params);
  },
  created() {
    this.$watchLocation({ enableHighAccuracy: true }).then(coordinates => {
      this.lat = coordinates.lat;
      this.lng = coordinates.lng;
    });
  },
  watch: {
    $route() {
      this.$store.dispatch("quest/getRiddle", this.$route.params);
      this.answer = "";
    }
  }
};
</script>

<style scoped>
.riddle {
  width: 100%;
  height: 100%;
  background-color: #303030;
  overflow-y: hidden;
}

.task-card {
  max-height: 70%;
}

.task-text {
  max-height: 60vh;
  overflow-y: scroll;
  line-height: 1.2em !important;
}

.content {
  margin-top: 70px;
  overflow-y: hidden;
  margin-bottom: 60px;
}
.content__subheader {
  color: lightgray;
  text-transform: uppercase;
  font-size: 14px;
}
</style>

