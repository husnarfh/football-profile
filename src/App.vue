<template>
  <v-app>
    <v-main class="pa-0">
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