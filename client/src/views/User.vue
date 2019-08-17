<template>
  <section class="events">
    <div class="header">
      <v-layout justify-space-between align-center>
        <div class="header__name">Профиль</div>
        <v-layout justify-end>
          <v-btn fab small flat>
            <v-icon color="white" text="edit">edit</v-icon>
          </v-btn>
          <v-btn @click="logout()" fab small flat>
            <v-icon color="white">exit_to_app</v-icon>
          </v-btn>
        </v-layout>
      </v-layout>
      <v-card ripple elevation="24" color="white darken-2" class style="border-radius: 5px;">
        <v-layout>
          <v-flex xs5>
            <v-img
              src="http://www.myiconfinder.com/uploads/iconsets/256-256-2ee3cdfef28432d77968ad64885c3d26-detective.png"
              style="border-radius: 5px;"
              height="150px"
              cover
            ></v-img>
          </v-flex>
          <v-flex xs7>
            <v-card-title>
              <div>
                <div class="headline" style="font-weight: 600">{{name}}</div>
                <div style="opacity: 0.8">{{email}}</div>
                <div style="opacity: 0.8">Детектив с: {{registeredSince}}</div>
              </div>
            </v-card-title>
          </v-flex>
        </v-layout>
      </v-card>
    </div>
    <v-container class="content">
      <v-layout>
        <h2 class="content__subheader">Прошедшие игры</h2>
      </v-layout>
    </v-container>
  </section>
</template>

<script>
export default {
  name: "Events",
  components: {},
  data() {
    return {
      name: "",
      email: "",
      registered: ""
    };
  },
  computed: {
    registeredSince() {
      let dates = this.registered.split("T")[0].split("-");
      let month = "";
      switch (dates[1]) {
        case "01":
          month = "января";
          break;
        case "02":
          month = "февраля";
          break;
        case "03":
          month = "марта";
          break;
        case "04":
          month = "апреля";
          break;
        case "05":
          month = "мая";
          break;
        case "06":
          month = "июня";
          break;
        case "07":
          month = "июля";
          break;
        case "08":
          month = "августа";
          break;
        case "09":
          month = "сентября";
          break;
        case "10":
          month = "октября";
          break;
        case "11":
          month = "ноября";
          break;
        case "12":
          month = "декабря";
          break;
        default:
          month = "";
      }

      return dates[2] + " " + month + " " + dates[0];
    }
  },
  methods: {
    getUserInfo() {
      let user = JSON.parse(localStorage.getItem("user"));
      let { date, name, email } = user.user;
      this.name = name;
      this.email = email;
      this.registered = date;
    },
    logout() {
      localStorage.removeItem("user");
      this.$router.push("/login");
    }
  },
  created() {
    this.getUserInfo();
  }
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

