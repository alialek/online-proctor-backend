<template>
  <v-row
    class="justify-center align-center"
    style="
      height: 100vh;
      width: 100vw;
      overflow: hidden;
      background: linear-gradient(51.79deg, #655af3 -23.83%, #a59bff 92.58%);
    "
    ><v-col xs="6" md="6" lg="6">
      <v-card class="mr-4" v-if="newQuestion">
        <v-progress-linear
          :active="timer"
          v-model="value"
          stream
          color="primary"
          absolute
          bottom
        >
        </v-progress-linear>

        <p class="subtitle-2 mb-2">
          {{ question.question }}
        </p>
        <v-card-text>
          <v-form @submit.prevent="sendAnswer">
            <v-text-field v-model="answer" label="Введите ответ" outlined>
            </v-text-field>
            <v-btn type="submit" color="success" depressed
              >Ответить</v-btn
            ></v-form
          >
        </v-card-text>
      </v-card>
      <v-card class="mr-4" v-if="noQuestion">
        <v-card-title>Вопросов нет, но вы держитесь</v-card-title>
      </v-card >
      <v-card class="mr-4" v-if="stop">
        <v-card-title>Спасибо за участие! Тестирование завершено.</v-card-title>
      </v-card>
      <v-card class="mr-4" v-if="startMessage">
        <v-card-title class="subtitle-3">{{ tests.title }}</v-card-title>
        <v-card-text
          ><h1 class="subtitle-2 mb-3">{{ tests.description }}</h1>
          <v-alert type="info">
            Внимание! Время ответа на один вопрос: {{ tests.timeToAnswer }} c.
            Вопрос скоро появится. Ожидайте!
          </v-alert>
        </v-card-text>
      </v-card>
    </v-col>
    <v-dialog max-width="600" v-model="warnDialog">
      <v-card>
        <v-card-title color="error">Тест заверешен</v-card-title>
        <v-card-text>Спасибо за участие!</v-card-text>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
  export default {
    props: {
      id: {
        required: true,
        type: String,
      },
    },
    computed: {
      test() {
        return this.$store.state.userTest;
      },
    },
    methods: {
      reset() {
        this.startMessage = false;
        this.newQuestion = false;
        this.noQuestion = false;
        this.stop = false;
      },
      sendAnswer() {
        this.$store
          .dispatch("sendAnswer", {
            id: this.id,
            questionId: this.question.id,
            answer: this.answer,
          })
          .then((res) => {
            if (res.status == 200) {
              this.reset();
              this.noQuestion = true;
              this.answer = "";
              this.question = {};
            }
          });
      },
      startTimer() {
        clearInterval(this.interval);
        this.value = 100;
        let step = 100 / this.question.until;
        this.interval = setInterval(() => {
          this.value -= step;
        }, 1000);
        if (this.value == 0) {
          this.reset();
          this.noQuestion = true;
          this.answer = "";
          this.question = {};
        }
      },
      startSocket() {
        var socket = new WebSocket("wss://app.netquest.ru/?id=" + this.id);
        socket.onopen = () => {
          this.$store.commit("SET_SUCCESS", "Соединение установлено");
        };

        socket.onclose = (event) => {
          if (event.wasClean) {
            this.$store.commit("SET_SUCCESS", "Соединение закрыто");
          } else {
            this.$store.commit("SET_SUCCESS", "Соединение оборвалось");
          }
          console.log("Код: " + event.code + " причина: " + event.reason);
        };

        socket.onmessage = (event) => {
          let data = JSON.parse(event.data);
          console.log(event);
          console.log(data);
          this.reset();
          if (data.type == "question") {
            this.newQuestion = true;
            this.question = data;
            this.timer = true;
            this.startTimer();
            setTimeout(() => {
              this.disabled = false;
              clearInterval(this.interval);
              this.timer = false;
            }, this.question.until * 1000 + 5);
          } else if (data.type == "stop") {
            this.stop = true;
          }
        };
        socket.onerror = (error) => {
          this.$store.commit("SET_ERROR", "Ошибка " + error.message);
        };
      },
    },
    mounted() {
      this.$store.dispatch("registerUserInTest", this.id).then((res) => {
        if (res.status == 200 || res.status == 302) {
          if (!res.data.test.isActive) {
            this.warnDialog = true;
          } else {
            this.startSocket();
            this.reset();
            this.startMessage = true;
            this.tests = res.data.test;
          }
        }
      });
    },
    data() {
      return {
        warnDialog: false,
        timer: false,
        interval: 0,
        value: 0,
        startMessage: false,
        newQuestion: false,
        noQuestion: true,
        stop: false,
        answer: "",
        question: {},
        tests: {},
      };
    },
  };
</script>

<style>
  .v-card {
    box-shadow: 0 8px 16px 0px rgba(10, 14, 29, 0.04),
      0px 8px 64px 0px rgba(10, 14, 29, 0.08) !important;
  }
</style>
