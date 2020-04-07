<template>
  <div v-if="session.isActive">
    <v-row class=" mx-2 justify-space-between"
      ><div>
        <h1 class="display-1">{{ session.title }}</h1>
        <v-btn :disabled="disabled">завершить</v-btn>
      </div>
      <div>
        <h2 class="subtitle-2">
          {{ session.isActive ? "Активна" : "Неактивна" }}
        </h2>
        <h2 class="subtitle-2">
          Время ответа: {{ session.timeToAnswer + " c." }}
        </h2>
      </div></v-row
    >
    <v-row style="height: 100%;">
      <v-col
        cols="5"
        style="border-right: 0.5px solid grey; align-content: space-between !important"
      >
        <v-col>
          <div>
            <v-list-item
              @click="getQuestionAnswers(question._id)"
              v-for="question in session.questions"
              :key="question._id"
            >
              <v-list-item-content>
                <v-list-item-title> {{ session.title }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </div>
          <v-form @submit="sendQuestion">
            <v-row>
              <v-text-field
                v-model="newQuestion"
                outlined
                label="Введите новый вопрос"
              ></v-text-field>
              <v-btn
                :disabled="disabled"
                text
                color="primary"
                @click="sendQuestion"
                ><v-icon>mdi-send</v-icon></v-btn
              ></v-row
            >
          </v-form>
        </v-col>
      </v-col>
      <v-col cols="7">
        <v-card
          v-for="(answer, i) in activeQuestionAnswers"
          :key="i"
          class="ma-2"
        >
          {{ answer.answer }}
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
  export default {
    props: {
      sessionID: {
        required: true,
        type: String,
      },
    },
    computed: {
      session() {
        return this.$store.state.activeSession;
      },
    },
    data() {
      return {
        disabled: false,
        activeQuestion: "",
        newQuestion: "",
        activeQuestionAnswers: [],
      };
    },
    methods: {
      sendQuestion(e) {
        e.preventDefault();
        this.$store
          .dispatch("sendQuestion", {
            id: this.sessionID,
            question: this.newQuestion,
          })
          .then((res) => {
            if (res.status == 200) {
              this.disabled = true;
              setTimeout(() => {
                this.disabled = false;
              }, this.session.timeToAnswer * 1000 + 3);
            }
            this.$store.dispatch("getSession", this.sessionID);
          });
      },
      getQuestionAnswers(id) {
        this.activeQuestion = id;
        setInterval(() => {
          this.$store
            .dispatch("getQuestionAnswers", { id, testId: this.id })
            .then((res) => {
              this.activeQuestionAnswers = res.data;
            });
        });
      },
    },
    mounted() {
      this.$store.dispatch("getSession", this.sessionID);
    },
  };
</script>

<style></style>
