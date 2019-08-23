<template dark>
  <section class="riddle">
    <v-toolbar fixed style="background-size: cover; background-color: rgba(0,0,0,1); " dark>
      <router-link :to="String(riddle.backToNum)">
        <v-toolbar-side-icon>
          <v-icon>arrow_back</v-icon>
        </v-toolbar-side-icon>
      </router-link>
      <v-toolbar-title class="white--text">{{riddle.title}}</v-toolbar-title>
    </v-toolbar>

    <section class="content">
      <div v-if="riddle.type == 'ar'">
        <v-row justify="center">
          <v-btn color="primary" dark @click.stop="dialog = true">Открыть камеру</v-btn>

          <v-dialog v-model="dialog">
            <iframe
              allow="camera"
              style="border: 0; border-radius: 10; width: 100%; height: 60vh"
              :src="riddle.html"
              :name="name"
            ></iframe>
          </v-dialog>
        </v-row>
      </div>
      <v-card
        v-if="riddle.type == 'geo'"
        class="mx-auto task-card grey darken-3"
        style="margin-bottom: 120px"
        dark
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
        <v-card-text>До цели: {{lat}}м.</v-card-text>
      </v-card>
      <v-card
        v-if="riddle.type == 'text'"
        class="mx-auto task-card grey darken-3"
        style="margin-bottom: 120px"
        dark
      >
        <v-card-title>
          <v-icon medium left>extension</v-icon>
          <span class="title font-weight-light">Задание #{{riddle.num}}</span>
        </v-card-title>

        <v-card-text
          style="line-height: 1.2em"
          v-html="riddle.text"
          class="regular text-xs-left task-text"
        ></v-card-text>
      </v-card>
    </section>

    <v-form
      style="bottom:40px; position: fixed; width: 100%; background-color: black;border-radius:30px 30px 0px 0px"
      v-if="!riddle.last"
      @submit.prevent="postAnswer"
      class="px-3 pt-1"
    >
      <v-layout align-center justify-space-between>
        <v-text-field
          v-model="answer"
          v-if="riddle.required"
          class="ml-2 mt-2"
          light
          solo
          placeholder="Ответ"
        ></v-text-field>
        <p
          v-if="!riddle.required"
          style="color:white; text-align: "
          class="headline mb-3 text-xs-right font-weight-bold"
        >Далее</p>
        <v-btn
          @click="postAnswer"
          :loading="loading"
          class="ml-2 mb-3"
          fab
          dark
          color="green darken-1"
        >
          <v-icon dark>arrow_right</v-icon>
        </v-btn>
      </v-layout>
    </v-form>
  </section>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import { getDistance } from "geolib";
export default {
  name: "Riddle",
  components: {},
  data() {
    return {
      answer: "",
      isLoading: false,
      lat: "",
      loaded: false,
      dialog: false,
      html: "https://net-quest.ru/ar/index.html",
      name: Date.now()
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
    },
    getDistance() {}
  },
  computed: {
    ...mapState("quest", {
      riddle: state => state.riddle
    }),
    ...mapState("quest", {
      loading: state => state.loading
    }),
    success() {
      return this.$store.state.quest.success;
    }
  },
  beforeCreate() {
    var constraints = {
      audio: false,
      video: { facingMode: { exact: "environment" } }
    };

    navigator.mediaDevices
      .getUserMedia(constraints)
      .then(function(mediaStream) {})
      .catch(function(err) {});

    this.$store.dispatch("quest/getRiddle", this.$route.params);
    this.$loadScript("https://aframe.io/releases/0.9.2/aframe.min.js")
      .then(() => {
        this.loaded = true;
      })
      .catch(() => {
        this.loaded = false;
      });

    this.$loadScript(
      "https://cdn.rawgit.com/jeromeetienne/AR.js/1.7.7/aframe/build/aframe-ar.js"
    )
      .then(() => {
        this.loaded = true;
      })
      .catch(err => {
        this.loaded = false;
      });
  },
  beforeDestroy() {
    this.riddle.text = "Загрузка";
  },
  mounted() {
    navigator.geolocation.watchPosition(position => {
      this.lat = getDistance(
        {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        },
        { latitude: 59.719325, longitude: 30.4085556 }
      );
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
  max-height: calc(100vh - 120px);
}

.task-text {
  max-height: 60vh;
  font-size: 1.2em;
  overflow-y: scroll;
  line-height: 1.6em !important;
}

.content {
  margin-top: 60px;
  overflow-y: hidden;
}
.content__subheader {
  color: lightgray;
  text-transform: uppercase;
  font-size: 14px;
}
.a-canvas {
  z-index: 999999;
  overflow: hidden;
}
</style>

