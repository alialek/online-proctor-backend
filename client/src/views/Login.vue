<template>
  <section class="login">
    <v-container style="height: 100%" dark>
      <v-layout style="height: 100%" align-center align-content-center justify-center dark>
        <v-flex class="mx-3 col-xs-12 col-md-6">
          <h2
            style="font-size:40px;text-align:center;color: white; font-family: Montserrat !important"
          >
            NetQuest
            <small style="font-size: 15px; font-weight: 300">beta</small>
          </h2>
          <transition appear>
            <v-tabs
              style="width: 100%;"
              dark
              grow
              centered
              color="transparent"
              slider-color="orange"
            >
              <v-tab ripple>Вход</v-tab>
              <v-tab ripple>Я играю впервые</v-tab>
              <v-tab-item>
                <v-form dark @submit.prevent="handleAuth">
                  <v-text-field color="white" dark v-model="email" label="E-mail" required></v-text-field>
                  <v-text-field
                    color="white"
                    dark
                    v-model="password"
                    type="password"
                    label="Пароль"
                    required
                  ></v-text-field>
                  <v-layout justify-left align-center>
                    <span style="font-size:30px; font-weight: 600; color: white">Войти</span>
                    <v-btn
                      :loading="loading"
                      fab
                      type="submit"
                      style="background-color: white; color: black;"
                    >
                      <v-icon>send</v-icon>
                    </v-btn>
                  </v-layout>
                </v-form>
              </v-tab-item>
              <v-tab-item>
                <v-form dark @submit.prevent="handleReg">
                  <v-text-field color="white" dark v-model="name" label="Фамилия и Имя" required></v-text-field>

                  <v-text-field dark color="white" v-model="email" label="E-mail" required></v-text-field>
                  <v-text-field
                    dark
                    color="white"
                    :rules="[rules.required, rules.min]"
                    v-model="password"
                    type="password"
                    label="Пароль"
                    required
                  ></v-text-field>
                  <v-layout align-center>
                    <span style="font-size:30px; font-weight: 600; color: white">В игру</span>
                    <v-btn
                      fab
                      :loading="loading"
                      type="submit"
                      class="mx-2"
                      style="background-color: white; color: black;"
                    >
                      <v-icon :loading="loading">lock</v-icon>
                    </v-btn>
                  </v-layout>
                </v-form>
              </v-tab-item>
            </v-tabs>
          </transition>
        </v-flex>
      </v-layout>
    </v-container>
  </section>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Login",
  components: {},
  data() {
    return {
      name: "",
      email: "",
      password: "",
      date: "",
      menu: false,
      rules: {
        required: value => !!value || "Введите пароль",
        min: v => v.length >= 8 || "Минимальная длина - 8 символов"
      }
    };
  },
  computed: {
    ...mapState("authentication", {
      loading: state => state.loading
    })
  },
  methods: {
    handleAuth() {
      const { email, password } = this;
      const { dispatch } = this.$store;
      if (email && password) {
        dispatch("authentication/login", { email, password });
      }
    },
    handleReg() {
      const { name, email, password } = this;
      const { dispatch } = this.$store;
      if (email && password && name) {
        dispatch("authentication/register", { name, email, password });
      }
    }
  },
  beforeUpdate() {
    let user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      this.router.push("/");
    }
  }
};
</script>

<style scoped>
.login {
  width: 100%;
  background: linear-gradient(221deg, #8d00ff, #4260db);
  background-size: 400% 400%;

  -webkit-animation: loginsection 40s ease infinite;
  -moz-animation: loginsection 40s ease infinite;
  animation: loginsection 40s ease infinite;
  height: 100%;
}

.bg-image-holder {
  top: 0;
  position: absolute;
  width: 100%;
  height: 300px;
  overflow: hidden;
}
</style>

