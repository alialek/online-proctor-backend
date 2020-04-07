<template>
  <v-row
    class="justify-center align-center"
    style="
      height: 100vh;
      width: 100vw;
      overflow: hidden;
      background-color: #e8f5e9;
    "
  >
  <v-col xs=12 sm=12 md=8 lg=8>
    <v-card elevation=1 style="border-top: 4px solid #4caf50;"  v-if="newQuestion">
      <v-card-title>{{ question.question }}</v-card-title>
      <v-card-text>
        <v-form @submit="sendAnswer">
          <v-text-field style="width: 100%" v-model="answer" label="Введите ответ" outlined>
          </v-text-field>
          <v-btn type="submit" color="success" depressed
            >Ответить</v-btn
          ></v-form
        >
      </v-card-text>
    </v-card>
    <v-card v-else-if="stop">
      <v-card-title>Спасибо за участие! Тестирование завершено.</v-card-title>
    </v-card>
    <v-card :loading=startMessage v-else-if="startMessage">
      <v-card-title><h1 class="display-1">{{ tests.title }}</h1></v-card-title>
      <v-card-text><h1 class="title">{{ tests.description }}</h1><h1 class="title">Время ответа на один вопрос: {{ tests.timeToAnswer }}c.</h1></v-card-text>
     
    </v-card>
    <v-card v-else  :isLoading=true> 
      <v-card-title>Вопросов еще нет, но вы держитесь</v-card-title>
    </v-card>
    </v-col>
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
    data() {
      return {
        startMessage: false,
        newQuestion: false,
        stop: false,
        answer: "",
        question: {},
        tests: {},
      };
    },
    computed: {
      test() {
        return this.$store.state.userTest;
      },
    },
    methods: {
      sendAnswer() {
        this.$store
          .dispatch("sendAnswer", {
            id: this.id,
            questionId: this.question.id,
            answer: this.answer,
          })
          .then((res) => {
            if (res.status == 200) {
              this.newQuestion = false;
              this.answer = "";
              this.question = {};
            }
          });
      },
      startSocket() {
        var socket = new WebSocket("ws://localhost:5000/?id=" + this.id);
        socket.onopen = () => {
           this.$store.commit("setSuccess", "Соединение установлено");
        };

        socket.onclose =  (event) => {
          if (event.wasClean) {
            this.$store.commit("setSuccess", "Соединение закрыто");
          } else {
            this.$store.commit("setSuccess", "Соединение оборвалось");
          }
          console.log("Код: " + event.code + " причина: " + event.reason);
        };

        socket.onmessage = (event) => {
          let data = JSON.parse(event.data);
          if (data.type == "question") {
          
            this.newQuestion = true;
            this.startMessage = false;
            this.question = data;
          } else if (data.type == "stop") {
            this.stop = true;
          }
        };
        socket.onerror = (error) => {
          this.$store.commit("setSuccess", "Ошибка " + error.message);
        };
      },
    },
    mounted() {
      this.$store.dispatch("registerUserInTest", this.id).then((res) => {
        if (res.status == 200 || res.status == 302) {
          this.startSocket();
          this.startMessage = true;
          this.tests = res.data.test;
        }
      });
    },
  };
</script>

<style></style>
