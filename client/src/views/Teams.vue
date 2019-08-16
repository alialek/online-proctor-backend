<template>
  <section class="events">
    <div class="header">
      <div class="header__name">Команда</div>
      <div class="search-box">
        <div class="search-box__title">Найти команду</div>
        <v-text-field solo label="Введите название" append-icon="search"></v-text-field>
      </div>
    </div>
    <v-container class="content">
      <v-layout>
        <div width="80%" style="margin-top: -20px">
          <h2 class="content__subheader">Ведутся ремонтные работы</h2>
          <img
            src="https://cdn.dribbble.com/users/758377/screenshots/6193921/ezgif.com-crop__2_.gif"
            width="100%"
          />
        </div>
      </v-layout>
    </v-container>
  </section>
</template>

<script>
export default {
  name: "Events",
  components: {},
  data() {
    return {};
  },
  created() {}
};
</script>

<style scoped>
.events {
  width: 100%;
  height: 100%;
}

.header {
  width: 100%;
  height: 200px;
  background-color: #ffab2d;
  border-radius: 0 0 30px 30px;
  color: white;
  padding: 20px;
  position: fixed;
}

.header__name {
  font-size: 30px;
  font-weight: 900;
}

.search-box__title {
  font-size: 20px;
  font-weight: 900;
  margin-top: 60px;

  margin-bottom: 10px;
}

.content {
  margin-top: 240px;
}

.content__subheader {
  color: lightgray;
  text-transform: uppercase;
  font-size: 14px;
}
</style>

