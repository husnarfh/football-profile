<template>
   <v-container class="container-layout pa-0" fluid>
      <v-row class="text-center header-bar pa-5" no-gutters align="center">
         <v-col sm="6" xs="12">
            <v-row no-gutters class="px-5 text-left" style="display: grid">
               <h1>Football Club</h1>
               <label>Football list around the world</label>
            </v-row>
         </v-col>
         <v-col sm="6" xs="12" class="image">
            <v-img :src="pic" contain height="400"></v-img>
         </v-col>
      </v-row>
      <v-row no-gutters transition="slide-x-reverse-transition">
         <Areas
            v-if="selectedComponent === 0"
            @move-component="moveComponent"
         />
         <FootballTeams
            v-if="selectedComponent === 1"
            :id="idArea"
            @back="selectedComponent = 0"
         />
      </v-row>
   </v-container>
</template>

<script>
import Areas from './Areas.vue'
import FootballTeams from './FootballTeams.vue'
import goal from '@/assets/undraw_goal.svg'

export default {
   name: 'FootballClub',
   components: {
      Areas,
      FootballTeams,
   },
   data: () => ({
      selectedComponent: 0,
      idArea: null,
      pic: goal,
   }),
   methods: {
      moveComponent(val) {
         this.selectedComponent = 1
         this.idArea = val
      },
   },
}
</script>
<style lang="scss" scoped>
.container-layout {
   font-family: sans-serif;
}
.header-bar {
   background-image: linear-gradient(to right, #f2eed0, #f7f5e6);
   height: 70vh;
}

@keyframes slideInFromRight {
   0% {
      transform: translateX(200%);
   }
   100% {
      transform: translateX(0);
   }
}

.image {
   animation: 2s ease-out 0s 1 slideInFromRight;
}

@media only screen and (max-width: 600px) {
   h1 {
      font-size: 2rem;
   }
   label {
      font-size: 1rem;
   }
}

@media only screen and (min-width: 600px) {
   h1 {
      font-size: 5rem;
   }
   label {
      font-size: 1.2rem;
   }
}
</style>
