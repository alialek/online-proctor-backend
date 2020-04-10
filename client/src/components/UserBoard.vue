<template>
  <div class="dashboard wrapper">
    <v-row>
      <v-col xs="12" md="6" lg="6">
        <v-card max-width="400">
          <v-card-title>
            Введите id сессии
          </v-card-title>
          <v-card-text>
            <v-form @submit="startNewSession">
              <v-text-field v-model="id" label="Идентификатор" outlined>
              </v-text-field>
              <v-btn type="submit" color="success" depressed>
                Войти</v-btn
              ></v-form
            >
          </v-card-text>
        </v-card></v-col
      >
    </v-row>
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

        window.location.href = "/session/?id=" + this.id;
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
