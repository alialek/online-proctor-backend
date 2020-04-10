<template>
  <v-row
    class="justify-center align-center"
    style="height: 100vh; width: 100vw; overflow: hidden; background-color: #E8F5E9;"
  >
    <v-card v-if="newQuestion">
      <v-card-title>{{ question.question }}</v-card-title>
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
    <v-card v-if="noQuestion">
      <v-card-title>Вопросов еще нет, но вы держитесь</v-card-title>
    </v-card>
    <v-card v-if="stop">
      <v-card-title>Спасибо за участие! Тестирование завершено.</v-card-title>
    </v-card>
    <v-card v-if="startMessage">
      <v-card-title>{{ tests.title }}</v-card-title>
      <v-card-text>{{ tests.description }}</v-card-text>
      <v-card-actions
        >Время ответа на один вопрос: {{ tests.timeToAnswer }}c.</v-card-actions
      >
    </v-card>
  </v-row>
</template>

<script>
  export default {
    props: {
      id: {
        required: true,
        type: String
      }
    },
    computed: {
      test() {
        return this.$store.state.userTest;
      }
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
            answer: this.answer
          })
          .then(res => {
            if (res.status == 200) {
             this.reset()
             this.noQuestion = true
              this.answer = "";
              this.question = {};
            }
          });
      },
      startSocket() {
        var socket = new WebSocket("wss://app.netquest.ru/?id=" + this.id);
        socket.onopen = () => {
          this.$store.commit("setSuccess", "Соединение установлено");
        };

        socket.onclose = event => {
          if (event.wasClean) {
            this.$store.commit("setSuccess", "Соединение закрыто");
          } else {
            this.$store.commit("setSuccess", "Соединение оборвалось");
          }
          console.log("Код: " + event.code + " причина: " + event.reason);
        };

        socket.onmessage = event => {
          let data = JSON.parse(event.data);
          console.log(event);
          console.log(data);
          this.reset()
          if (data.type == "question") {
            this.newQuestion = true;
            this.question = data;
          } else if (data.type == "stop") {
            this.stop = true;
          }
        };
        socket.onerror = error => {
          this.$store.commit("setSuccess", "Ошибка " + error.message);
        };
      }
    },
    mounted() {
      this.$store.dispatch("registerUserInTest", this.id).then(res => {
        if (res.status == 200 || res.status == 302) {
          this.startSocket();
          this.reset()
          this.startMessage = true;
          this.tests = res.data.test;
        }
      });
    },
    data() {
      return {
        startMessage: false,
        newQuestion: false,
        noQuestion: true,
        stop: false,
        answer: "",
        question: {},
        tests: {}
      };
    }
  };
</script>

<style></style>
