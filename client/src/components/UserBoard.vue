<template>
  <div class="dashboard wrapper">
    <v-card
      max-width="400"
      style="margin:50% 0% 0% 50%; transform: translate(-50%, -50%)"
    >
      <v-card-title>
        Введите id сессии
      </v-card-title>
      <v-card-text>
        <v-form @submit="startNewSession">
          <v-text-field v-model="id" label="Идентификатор" outlined>
          </v-text-field>
          <v-btn type="submit" color="success" depressed> Войти</v-btn></v-form
        >
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        id: "",
      };
    },
    
    methods: {
      startNewSession(e) {
        e.preventDefault();
        this.$store.dispatch("registerUserInTest", this.id).then(res => {
          if(res.status == 200) {
            window.location.href = "/session/?id=" + this.id;
            this.$store.commit('setSuccess', 'Вы успешно зарегистрировались в сессии')
          } else if(res.status == 302) {
             window.location.href = "/session/?id" + this.id;
            this.$store.commit('setSuccess', 'Успешный вход в сессию')
          }
          
        });
        
      },
    },
    mounted() {
      if (this.$route.query.id) this.id = this.$route.query.id;
    },
  };
</script>

<style scoped>
  .dashboard.wrapper {
    height: 100vh;
    overflow: hidden;
  }
  .card {
  }
</style>
