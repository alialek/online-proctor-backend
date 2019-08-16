<template>
  <section class="events">
    <div class="header">
      <div class="header__name">Профиль</div>
    </div>
    <v-container class="content">
      <v-layout>
        <h2 class="content__subheader">Статистика</h2>
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
  background-color: #353941;
  border-radius: 0 0 30px 30px;
  color: white;
  padding: 20px;
  position: fixed;
}

.header__name {
  font-size: 30px;
  font-weight: 900;
}

.header__sub {
  font-size: 20px;
  font-weight: 900;
  margin-top: 20px;
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

