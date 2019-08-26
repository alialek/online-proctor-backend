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
        <v-dialog v-model="dialog">
          <iframe
            allow="camera"
            style=" border: 0; border-radius: 10; width: 100%; height: 60vh"
            :src="riddle.location[0]"
            :name="name"
          ></iframe>
        </v-dialog>
        <v-card class="mx-auto task-card grey darken-3" style="margin-bottom: 120px" dark>
          <v-card-title>
            <v-icon medium left>mdi-cube-scan</v-icon>
            <span class="title font-weight-light">Дополненная реальность</span>
          </v-card-title>
          <v-card-text>
            <p class="regular">Не забудьте разрешить приложению доступ к камере</p>
            <v-layout justify-center>
              <v-btn color="primary" large dark @click.stop="startAR">
                Открыть камеру
                <v-icon right>mdi-augmented-reality</v-icon>
              </v-btn>
            </v-layout>
          </v-card-text>
          <v-card-text v-if="arHidden">{{riddle.text}}</v-card-text>
        </v-card>
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
          v-if="dist <= 20"
          v-html="riddle.text"
          class="title text-xs-left task-text"
        ></v-card-text>

        <v-alert dense border="left" value="dist > 20" v-if="dist > 20" type="warning" class="mx-2">
          Информация станет доступна, как только Ваше расстояние станет меньше 5 метров
          <p v-if="dist == 999999">
            <br />Ой, кажется, вы забыли включить GPS, либо разрешить приложению доступ в настройках. Исправьте и возвращайтесь сюда!
          </p>
        </v-alert>

        <v-icon text="mdi-geolocation">mdi-geolocation</v-icon>
        <v-card-text class="title mb-2" v-if="dist > 20">До цели: {{dist}}м.</v-card-text>
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
        <div class="card">Текст</div>

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
          @click="postAnswer(riddle.nextNum)"
          :loading="loading"
          :disabled="riddle.type == 'geo' && dist > 20"
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
import { mapState } from "vuex";
import { getDistance } from "geolib";
export default {
  name: "Riddle",
  components: {},
  data() {
    return {
      answer: "",
      isLoading: false,
      dist: 999999,
      loaded: false,
      dialog: false,
      arHidden: false,
      name: Date.now()
    };
  },
  beforeCreate() {
    this.$store.dispatch("quest/getRiddle", this.$route.params);
  },
  methods: {
    startAR() {
      this.dialog = true;
      this.arHidden = true;
      var constraints = {
        audio: false,
        video: { facingMode: { exact: "environment" } }
      };

      navigator.mediaDevices
        .getUserMedia(constraints)
        .then(function(mediaStream) {})
        .catch(function(err) {});
    },
    postAnswer(nextNum) {
      this.isLoading = true;
      this.$store.dispatch("quest/postAnswer", {
        answer: this.answer,
        questID: this.$route.params.id,
        riddleID: this.$route.params.riddle_id,
        nextNum
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
    },
    isAdmin() {
      console.log(localStorage.getItem("user"));
      return localStorage.getItem("user");
    }
  },
  beforeUpdate() {
    if (this.riddle.type == "ar") {
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
    }
    if (this.riddle.type == "geo") {
      let options = {
        enableHighAccuracy: true,
        timeout: 2000,
        maximumAge: 0
      };
      navigator.geolocation.watchPosition(
        position => {
          this.dist = getDistance(
            {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude
            },
            {
              latitude: this.riddle.location[0],
              longitude: this.riddle.location[1]
            }
          );
        },
        function error(msg) {
          alert("Please enable your GPS position feature.");
        },
        options
      );
    }
  },
  beforeDestroy() {
    this.riddle.text = "Загрузка";
  },
  mounted() {},
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

