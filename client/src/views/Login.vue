<template>
  <section class="login">
    <div class="left bg-image-holder">
      <img class="bg-image right-image" src="../../public/svg/blue.svg" />
    </div>
    <div class="center bg-image-holder">
      <img class="bg-image center-image" src="../../public/svg/black.svg" />
      <h2
        style="position: absolute; color: white; font-size: 30px; margin-top: 25%; margin-left: 7%;"
      >
        Добро
        <br />Пожаловать
      </h2>
    </div>
    <div class="right bg-image-holder">
      <img class="bg-image left-image" src="../../public/svg/orange.svg" />
    </div>
    <v-container>
      <v-layout
        style="width: 100%;position: absolute; z-index: 9999; height: 65%; background-color: white; bottom: 0; left: 0; border-radius: 30px 30px 0px 0px;"
        align-center
        justify-center
      >
        <v-form class="mx-3">
          <v-tabs style="width: 100%;" grow centered color="transparent" slider-color="orange">
            <v-tab ripple>Вход</v-tab>
            <v-tab ripple>Регистрация</v-tab>
            <v-tab-item>
              <v-form @submit="handleAuth">
                <v-text-field v-model="email" label="E-mail" required></v-text-field>
                <v-text-field v-model="password" type="password" label="Пароль" required></v-text-field>
                <v-layout justify-space-between align-center>
                  <span style="font-size:30px; font-weight: 600; align-item">Войти</span>
                  <v-btn fab type="submit" style="background-color: #353941; color: white;">
                    <v-icon>arrow_right</v-icon>
                  </v-btn>
                </v-layout>
              </v-form>
            </v-tab-item>
            <v-tab-item>
              <v-form @submit="handleReg">
                <v-text-field v-model="name" label="Имя" required></v-text-field>
                <v-text-field v-model="email" label="E-mail" required></v-text-field>
                <v-text-field v-model="password" type="password" label="Пароль" required></v-text-field>
                <v-layout justify-space-between align-center>
                  <span style="font-size:30px; font-weight: 600; align-item">Регистрация</span>
                  <v-btn fab type="submit" style="background-color: #353941; color: white;">
                    <v-icon>lock</v-icon>
                  </v-btn>
                </v-layout>
              </v-form>
            </v-tab-item>
          </v-tabs>
        </v-form>
      </v-layout>
    </v-container>
  </section>
</template>

<script>
export default {
  name: "Login",
  components: {},
  data() {
    return {
      name: "",
      email: "",
      password: ""
    };
  },
  created() {},
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
  }
};
</script>

<style scoped>
.login {
  width: 100%;
  background-color: #353942;
  height: 100%;
}

.bg-image-holder {
  top: 0;
  position: absolute;
  width: 100%;
  height: 300px;
  overflow: hidden;
}
.right {
  right: 0;
}
.left {
  left: 0;
}
.center {
  left: 0;
}

.bg-image {
  height: 100%;
  position: absolute;
}

.right-image {
  right: -20%;
}

.left-image {
  width: 100%;
  left: -20%;
}
</style>

