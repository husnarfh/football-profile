<template>
   <v-card>
      <v-container fluid>
         <v-row no-gutters align="center">
            <v-btn icon @click="$emit('back')">
               <v-icon>mdi-arrow-left</v-icon>
            </v-btn>
            <h1>Squad</h1>
         </v-row>

         <v-row no-gutters class="pa-5">
            <v-col md="3" sm="12" class="mx-5">
               <v-card tile class="pa-3" flat>
                  <v-img
                     :src="profile.crestUrl ? profile.crestUrl : pic"
                     width="250"
                     height="150"
                     class="mx-auto"
                     contain
                  ></v-img>
                  <h2 class="text-center">{{ profile.name }}</h2>
               </v-card>
            </v-col>
            <v-col>
               <v-card
                  rounded="lg"
                  outlined
                  class="text-center"
                  width="200"
                  style="border: 2px solid #f0d078"
               >
                  <h3>Football Club Profile</h3>
               </v-card>

               <div class="profile py-3">
                  <label class="font-weight-medium">Address</label>
                  <label>: {{ profile.address }}</label>

                  <label class="font-weight-medium">Phone</label>
                  <label>: {{ profile.phone }}</label>

                  <label class="font-weight-medium">Email</label>
                  <label>: {{ profile.email }}</label>

                  <label class="font-weight-medium">Website</label>
                  <label>: {{ profile.website }}</label>

                  <label class="font-weight-medium">Founded</label>
                  <label>: {{ profile.founded }}</label>

                  <label class="font-weight-medium">Venue</label>
                  <label>: {{ profile.venue ? profile.venue : '-' }}</label>

                  <label class="font-weight-medium">Club Colors</label>
                  <label>: {{ profile.clubColors }}</label>
               </div>
            </v-col>
         </v-row>
         <v-card
            rounded="lg"
            outlined
            width="100"
            style="border: 2px solid #f0d078"
         >
            <h3 class="text-center">Players</h3>
         </v-card>
         <v-row no-gutters class="pa-5">
            <template v-for="(player, idx) in profile.squad">
               <v-col md="3" sm="12" :key="'player-' + idx">
                  <v-card
                     class="ma-3 pa-3"
                     max-width="344"
                     outlined
                     rounded="xl"
                  >
                     <h3 class="text-center text-uppercase">
                        {{ player.name }}
                     </h3>

                     <v-card-actions class="pa-0">
                        <v-btn class="text-none" text>Detail</v-btn>
                        <v-spacer></v-spacer>
                        <v-btn icon @click="showToggle(idx)">
                           <v-icon>{{
                              show ? 'mdi-chevron-up' : 'mdi-chevron-down'
                           }}</v-icon>
                        </v-btn>
                     </v-card-actions>

                     <v-expand-transition>
                        <div v-show="player.show">
                           <v-divider></v-divider>

                           <v-card-text>
                              <div class="squad">
                                 <label>Date of Birth</label>
                                 <label
                                    >:
                                    {{
                                       formattedDate(player.dateOfBirth)
                                    }}</label
                                 >

                                 <label>Country of Birth</label>
                                 <label>: {{ player.countryOfBirth }}</label>

                                 <label>Position</label>
                                 <label
                                    >:
                                    {{
                                       player.position ? player.position : '-'
                                    }}</label
                                 >

                                 <label>Nationality</label>
                                 <label>: {{ player.nationality }}</label>
                              </div>
                           </v-card-text>
                        </div>
                     </v-expand-transition>
                  </v-card>
               </v-col>
            </template>
         </v-row>
      </v-container>
   </v-card>
</template>

<script>
import axios from 'axios'
import notfound from '@/assets/not_found.svg'

export default {
   name: 'Squad',
   props: {
      id: {
         type: Number,
      },
   },
   data: () => ({
      profile: null,
      pic: notfound,
   }),
   mounted() {
      this.getProfileTeams()
   },
   methods: {
      getProfileTeams() {
         axios
            .get(`http://api.football-data.org/v2/teams/${this.id}`)
            .then((response) => {
               this.profile = {
                  ...response.data,
                  squad: response.data.squad.map((arr) => {
                     return {
                        ...arr,
                        show: false,
                     }
                  }),
               }
            })
      },
      formattedDate(val) {
         var options = { year: 'numeric', month: 'long', day: 'numeric' }
         var date = new Date(val)

         return date.toLocaleDateString('en-US', options)
      },
      showToggle(idx) {
         this.profile.squad[idx].show = !this.profile.squad[idx].show
      },
   },
}
</script>

<style>
@media only screen and (max-width: 600px) {
   .profile {
      display: grid;
      grid-template-columns: 40vw 50vw;
   }

   .squad {
      display: grid;
      grid-template-columns: 30vw 50vw;
   }
}

@media only screen and (min-width: 600px) {
   .profile {
      display: grid;
      grid-template-columns: 10vw 25vw;
   }

   .squad {
      display: grid;
      grid-template-columns: 9vw 10vw;
   }
}
</style>
