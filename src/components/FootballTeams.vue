<template>
   <v-container>
      <v-row no-gutters>
         <v-btn icon @click="$emit('back')">
            <v-icon>mdi-arrow-left</v-icon>
         </v-btn>
      </v-row>

      <v-row no-gutters justify="center" v-if="loading">
         <v-progress-circular
            :size="70"
            :width="7"
            color="brown"
            indeterminate
         ></v-progress-circular>
      </v-row>
      <v-row no-gutters v-else-if="teams.length > 0">
         <template v-for="(team, idx) in teams">
            <v-col md="4" sm="12" :key="'team-' + idx">
               <v-card
                  rounded="xl"
                  class="ma-3 pa-3 card-team"
                  outlined
                  @click="teamDetail(team.id)"
               >
                  <v-img
                     :src="team.crestUrl ? team.crestUrl : pic"
                     width="250"
                     height="150"
                     class="mx-auto"
                     lazy-src="true"
                     contain
                  ></v-img>
                  <h3 class="py-3">{{ team.name }}</h3>
                  <v-row no-gutters style="display: grid" class="text-left">
                     <label>Phone : {{ team.phone }}</label>
                     <label>Email : {{ team.email }}</label>
                     <label
                        >Website :
                        <a :href="team.website">{{ team.website }}</a></label
                     >
                  </v-row>
               </v-card>
            </v-col>
         </template>
      </v-row>
      <v-row no-gutters v-else justify="center">
         <v-img :src="pic" max-width="550"></v-img>
      </v-row>

      <v-dialog v-model="dialog" fullscreen>
         <Squad v-if="dialog" :id="idTeam" @back="dialog = false" />
      </v-dialog>
   </v-container>
</template>

<script>
import axios from 'axios'
import notFound from '@/assets/not_found.svg'
import Squad from './Squad.vue'

export default {
   name: 'FootballTeams',
   props: {
      id: {
         type: Number,
      },
   },
   components: {
      Squad,
   },
   data: () => ({
      teams: [],
      pic: notFound,
      idTeam: null,
      dialog: false,
      loading: false,
   }),
   mounted() {
      this.getTeamsByArea()
   },
   methods: {
      getTeamsByArea() {
         this.loading = true
         axios
            .get(`http://api.football-data.org/v2/teams?areas=${this.id}`)
            .then((response) => {
               const { teams } = response.data
               this.teams = teams
               this.loading = false
            })
      },
      teamDetail(val) {
         this.idTeam = val
         this.dialog = true
      },
   },
}
</script>

<style lang="scss" scoped>
.card-team {
   &:hover {
      box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2),
         0 6px 20px 0 rgba(0, 0, 0, 0.19);
      cursor: pointer;
   }
}
</style>
