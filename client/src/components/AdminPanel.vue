<template>
  <div>
    <vs-button size="large" @click="addSession = !addSession">
      <i class="bx bx-plus"></i> Добавить сессию
    </vs-button>

    <vs-dialog
      class="add-session"
      overflow-hidden
      closable
      v-model="addSession"
    >
      <template #header>
        <h4 class="not-margin">
          Добавить сессию
        </h4>
      </template>
      <v-container class="px-2">
        <v-row no-gutters>
          <v-col cols="12">
            <v-text-field
              regular
              label="Название сессии"
              v-model="session.title"
            >
            </v-text-field>
          </v-col>
        </v-row>
        <v-row no-gutters>
          <v-col cols="12">
            <v-text-field
              regular
              label="Описание"
              v-model="session.description"
            >
            </v-text-field>
          </v-col>
        </v-row>
        <v-row no-gutters>
          <v-col cols="12">
            <v-text-field
              regular
              label="Время на ответ"
              persistent-hint
              hint="(в секундах)"
              v-model="session.timeToAnswer"
            >
            </v-text-field>
          </v-col>
        </v-row>
      </v-container>

      <template #footer>
        <div>
          <vs-button block @click="goToSession">
            Перейти к сессии
          </vs-button>
        </div>
      </template>
    </vs-dialog>
    <v-row>
      <v-col>
        <v-card>
          <v-card-title>Мои сессии</v-card-title>
          <v-card-text>
            <v-list-item
              @click="forwardToSession(session._id)"
              v-for="session in sessions"
              :key="session._id"
            >
              <v-list-item-content>
                <v-list-item-title> {{ session.title }}</v-list-item-title>
                <!-- <v-list-item-subtitle>
									{{ session.description }}</v-list-item-subtitle
								> -->
                <!-- <v-list-item-avatar>
									<v-btn>PRESS</v-btn>
								</v-list-item-avatar> -->
              </v-list-item-content>
            </v-list-item>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        addSession: false,
        session: {
          title: "",
          description: "",
          timeToAnswer: 40,
        },
        sessions: [],
      };
    },
    methods: {
      goToSession() {
        this.$store
          .dispatch("addSession", this.session)
          .then((data) => {
            let sessionID = data._id;
            this.addSession = false;
            this.$router.push({ name: "AdminSession", params: { sessionID } });
          })
          .catch((err) => {
            console.log(err);
          });
      },
      forwardToSession(id) {
        this.$router.push({ name: "AdminSession", params: { sessionID: id } });
      },
    },
    mounted() {
      this.$store
        .dispatch("getSessions")
        .then((data) => {
          this.sessions = data;
          console.log(data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  };
</script>

<style>
  .add-session .vs-dialog {
    width: 50vw;
    height: max-content;
  }
</style>
