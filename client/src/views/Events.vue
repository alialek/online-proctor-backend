<template>
  <section class="events">
    <div class="header">
      <div class="header__name">События</div>
      <div class="header__sub">Актуальное</div>
      <v-flex xs12 style="z-index: 999; margin-top: 5px;">
        <router-link :to="'/event/'+actualEvent[0]._id">
          <v-card
            v-if="actualEvent[0]"
            ripple
            color="white darken-2"
            class="blue--text"
            style="border-radius: 5px;"
          >
            <v-layout>
              <v-flex xs5>
                <v-img :src="actualEvent[0].image" style="border-radius: 5px;" height="100%" cover></v-img>
              </v-flex>
              <v-flex xs7>
                <v-card-title>
                  <div>
                    <div class="headline">{{actualEvent[0].title}}</div>
                    <div>{{actualEvent[0].dateStart}}</div>
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
      <v-layout class="mt-2 mb-2" v-for="event in events" :key="event.id">
        <v-flex xs12>
          <router-link :to="'/event/'+event._id">
            <v-card style="border-radius: 5px;" ripple color="white darken-2" class="blue--text">
              <v-layout>
                <v-flex xs5>
                  <v-img :src="event.image" height="100px" style="border-radius: 5px; " cover></v-img>
                </v-flex>
                <v-flex xs7>
                  <v-card-title>
                    <div>
                      <div class="headline">{{event.title}}</div>
                      <div>{{event.dateStart}}</div>
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
</template>

<script>
import { mapGetters } from "vuex";
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
  background-color: #4ab8e1;
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

.contents {
  padding-top: 240px;
  padding-bottom: 40px;
}

.content__subheader {
  color: lightgray;
  text-transform: uppercase;
  font-size: 14px;
}
</style>

