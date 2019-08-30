<template dark>
  <section class="riddle">
    <v-toolbar fixed style="background-size: cover; background-color: rgba(0,0,0,1); " dark>
      <v-layout justify-space-between align-center align-content-center>
        <v-layout align-center>
          <router-link
            :to="riddle.backToNum == 0 || riddle.backToNum === undefined ? '/' : String(riddle.backToNum)"
          >
            <v-toolbar-side-icon>
              <v-icon>arrow_back</v-icon>
            </v-toolbar-side-icon>
          </router-link>
          <v-toolbar-title class="white--text">{{riddle.title}}</v-toolbar-title>
        </v-layout>
        <div>
          <router-link to="/">
            <v-toolbar-side-icon>
              <v-icon>mdi-home-variant</v-icon>
            </v-toolbar-side-icon>
          </router-link>
        </div>
      </v-layout>
    </v-toolbar>

    <section class="content">
     
      <div v-if="riddle.type == 'ar'">
        <v-dialog fullscreen v-model="dialog">
          <v-btn
            style="position:absolute; top: 0; left: 10px;"
            icon
            dark
            color="red"
            @click="dialog = false"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <iframe
            allow="camera"
            style=" border: 0; border-radius: 10; width: 100%; height: 100%"
            :src="riddle.location[0]"
            :name="name"
          ></iframe>
        </v-dialog>
        <v-card class="mx-auto task-card grey darken-3" dark>
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
      <v-card v-if="riddle.type == 'geo'" class="mx-auto task-card grey darken-3" dark>
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

        <v-icon text="mdi-geolocation">mdi-geolocation</v-icon>
        <v-card-text class="title mb-2" v-if="dist > 20">
          <div class="radar">
            <div class="pointer"></div>
            <div class="shadow"></div>
          </div>
          <br />
          <div align="center">До цели: {{dist}}м.</div>
        </v-card-text>
        <v-alert dense border="left" value="dist > 20" v-if="dist > 20" type="warning" class="mx-2">
          Информация станет доступна, как только Ваше расстояние станет меньше 20 метров
          <p v-if="dist == 999999">
            <br />Ой, кажется, вы забыли включить GPS, либо разрешить приложению доступ в настройках. Исправьте и возвращайтесь сюда!
          </p>
        </v-alert>
      </v-card>
      <v-card v-if="riddle.type == 'text'" class="mx-auto task-card grey darken-3" dark>
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
      style="bottom:0px; position: fixed; width: 100%; background-color: black"
      v-if="!riddle.last"
      @submit.prevent="postAnswer"
      class="px-3 pt-1"
    >
      <v-layout align-center justify-space-between align-content-center>
        <v-text-field
          v-model="answer"
          v-if="riddle.required"
          class="ml-2 pt-2"
          light
          dense
          solo
          flat
          placeholder="Ответ"
        ></v-text-field>
        <p
          v-if="!riddle.required"
          style="color:white; text-align: "
          class="headline text-xs-right font-weight-bold"
        >Далее</p>
        <v-btn
          @click="postAnswer(riddle.nextNum)"
          :loading="loading"
          :disabled="riddle.type == 'geo' && dist > 20"
          class="ml-2 mb-4"
          fab
          dark
          :color="success ? 'green darken-1' : 'red darken-1'"
        >
          <v-icon dark>arrow_right</v-icon>
        </v-btn>
      </v-layout>
    </v-form>
  </section>
</template>

<script>
import { mapState, mapGetters } from "vuex";
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
    this.$store.dispatch("quest/getEventByID", this.$route.params.id);
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
      loading: state => state.loading,
      riddle: state => state.riddle,
      success: state => state.success,
      event: state => state.event
    }),
    countDown() {
      return Date.now() > this.event.dateStartInUTC
        ? false
        : this.event.dateStart;
    },
    isAdmin() {
      let user = JSON.parse(localStorage.getItem("user"));
      return user.user.isAdmin;
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
        function error(msg) {},
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
  max-height: calc(100vh - 160px);
  min-height: calc(100vh - 160px);
  overflow-y: scroll;
}

.task-text {
  height: 100%;
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

.radar {
  width: 200px;
  height: 200px;
  position: relative;
  background-size: 200px 200px;
  border-radius: 360px;
  left: 50%;
  margin-left: -100px;
  background: url(https://netquest.ru/quest_res/radar.png) no-repeat 50% 50%;
  background-size: contain;
}

b {
  font-weight: 600 !important;
}

.radar:hover {
  background: none;
}

.radar .pointer {
  position: absolute;
  z-index: 1024;
  left: 10.5820106%;
  right: 10.5820106%;
  top: 10.5820106%;
  bottom: 50%;
  will-change: transform;
  -webkit-transform-origin: 50% 100%;
  transform-origin: 50% 100%;
  border-radius: 50% 50% 0 0 / 100% 100% 0 0;
  background-image: linear-gradient(
    135deg,
    rgba(5, 162, 185, 0.8) 0%,
    rgba(0, 0, 0, 0.02) 70%,
    rgba(0, 0, 0, 0) 100%
  );
  -webkit-clip-path: polygon(100% 0, 100% 10%, 50% 100%, 0 100%, 0 0);
  clip-path: polygon(100% 0, 100% 10%, 50% 100%, 0 100%, 0 0);
  -webkit-animation: rotate360 3s infinite linear;
  animation: rotate360 3s infinite linear;
}

.radar .pointer:after {
  content: "";
  position: absolute;
  width: 50%;
  bottom: -1px;
  border-top: 2px solid rgba(0, 231, 244, 0.8);
  box-shadow: 0 0 3px rgba(0, 231, 244, 0.6);
  border-radius: 9px;
}

.shadow {
  position: absolute;
  left: 11%;
  top: 11%;
  right: 11%;
  bottom: 11%;
  margin: auto;
  border-radius: 9999px;
  box-shadow: 0 0 66px 6px #a51414;
  -webkit-animation: shadow 1s infinite ease;
  animation: shadow 1s infinite ease;
}

@-webkit-keyframes rotate360 {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  to {
    -webkit-transform: rotate(-360deg);
    transform: rotate(-360deg);
  }
}

@keyframes rotate360 {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  to {
    -webkit-transform: rotate(-360deg);
    transform: rotate(-360deg);
  }
}
@-webkit-keyframes shadow {
  0% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}
@keyframes shadow {
  0% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}
</style>

