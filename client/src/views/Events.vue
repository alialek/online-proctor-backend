<template>
  <div>
    <section class="events">
      <div class="header">
        <v-layout justify-space-between>
          <div class="header__name">События</div>
          <router-link to="/test">
            <v-icon>mdi-crosshairs-question</v-icon>
          </router-link>
        </v-layout>
        <div class="header__sub">Актуальное</div>
        <v-flex xs12 style="z-index: 999; margin-top: 5px;">
          <router-link :to="'/event/'+actualEvent[0]._id">
            <v-card
              v-if="actualEvent[0]"
              ripple
              elevation="24"
              color="white darken-2"
              class="blue--text"
              style="border-radius: 5px;"
            >
              <v-layout>
                <v-flex xs5>
                  <v-img
                    :src="actualEvent[0].image"
                    style="border-radius: 5px;"
                    height="100%"
                    cover
                  ></v-img>
                </v-flex>
                <v-flex xs7>
                  <v-card-title>
                    <div>
                      <div class="headline">
                        <b>{{actualEvent[0].title}}</b>
                      </div>
                      <div class="date">{{actualEvent[0].dateStart}}</div>
                      <v-progress-circular indeterminate color="primary" v-if="loading"></v-progress-circular>
                    </div>
                  </v-card-title>
                </v-flex>
              </v-layout>
            </v-card>
          </router-link>
        </v-flex>
      </div>
      <v-container v-if="events" class="contents">
        <v-layout>
          <h2 class="content__subheader">Предстоящие игры</h2>
        </v-layout>
        <v-layout class="mt-2 mb-2" style="z-index: 1" v-for="event in events" :key="event.id">
          <v-flex xs12>
            <router-link :to="event.available ? '/event/'+event._id : ''">
              <v-card
                :disabled="!event.available"
                style="border-radius: 5px;"
                ripple
                color="white darken-2"
                class="blue--text"
              >
                <v-layout>
                  <v-flex xs5>
                    <v-img :src="event.image" height="100px" style="border-radius: 5px; " cover></v-img>
                  </v-flex>
                  <v-flex xs7>
                    <v-card-title>
                      <div>
                        <div class="headline">{{event.title}}</div>
                        <div class="date">{{event.dateStart}}</div>
                      </div>
                    </v-card-title>
                  </v-flex>
                </v-layout>
              </v-card>
            </router-link>
          </v-flex>
        </v-layout>
      </v-container>
    </section>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
export default {
  name: "Events",
  components: {},
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      events: "quest/events",
      actualEvent: "quest/actualEvent"
    }),
    ...mapState("quest", {
      loading: state => state.loading
    })
  },
  methods: {
    /*setEvents() {
      this.events = this.$store.state.quest.events.filter(
        quest => !quest.isActual
      );
    }
    async setActualEvents() {
      this.actualEvent = await this.$store.getters.quest.actualEvent;
    }*/
  },
  beforeCreate() {
    this.$store.dispatch("quest/getEvents");
  },
  updated() {
    //this.setActualEvents;
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
  background: linear-gradient(221deg, #8d00ff, #4260db);
  background-size: 100% 100%;

  -webkit-animation: loginsection 40s ease infinite;
  -moz-animation: loginsection 40s ease infinite;
  animation: loginsection 40s ease infinite;
  border-radius: 0 0 30px 30px;
  color: white;
  padding: 20px;
  position: fixed;
}

.headline {
  color: #8d00ff;
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

.contents {
  padding-top: 240px;
  padding-bottom: 40px;
  overflow: hidden;
}

.content__subheader {
  color: lightgray;
  text-transform: uppercase;
  font-size: 14px;
}
.date {
  color: #8d00ff;
}
</style>

