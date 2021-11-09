<template>
  <v-app>
    <v-app-bar
      app
      dark
    >
        
    </v-app-bar>

    <v-main>
      <FootballClub/>
    </v-main>
  </v-app>
</template>

<script>
import FootballClub from './components/FootballClub';

export default {
  name: 'App',

  components: {
    FootballClub,
  },
  data: () => ({
    //
  }),
};
</script>