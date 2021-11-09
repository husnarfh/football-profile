<template>
  <v-container class="container-layout">
    <v-row class="text-center">
      <v-col cols="12">
        <h2>Football Club</h2>
      </v-col>
      <Areas v-if="selectedComponent === 0" @move-component="moveComponent" />
      <FootballTeams v-if="selectedComponent === 1" :id="idArea" @back="selectedComponent = 0"/>
    </v-row>
  </v-container>
</template>

<script>
import Areas from './Areas.vue';
import FootballTeams from './FootballTeams.vue';

  export default {
    name: 'FootballClub',
    components: {
      Areas,
      FootballTeams
    },
    data: () => ({
      selectedComponent: 0,
      idArea: null
    }),
    methods: {
      moveComponent(val) {
        this.selectedComponent = 1;
        this.idArea = val;
      }
    }
    
  }
</script>
<style scoped>
.container-layout {
  font-family: sans-serif;
}
</style>