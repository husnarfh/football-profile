<template>
<v-card>
    <v-container>
      <v-row no-gutters>
        <v-btn icon @click="$emit('back')">
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
        <h1>Squad</h1>
      </v-row>
      
      <h2>{{ profile.name }}</h2>
      <v-row no-gutters>
          <h3>Football Club Profile</h3> <br>
            <div class="profile">
                <label>Address</label>
                <label>: {{ profile.address}}</label>

                <label>Phone</label>
                <label>: {{ profile.phone}}</label>
                
                <label>Email</label>
                <label>: {{ profile.email}}</label>
                
                <label>Website</label>
                <label>: {{ profile.website }}</label>
                
                <label>Founded</label>
                <label>: {{ profile.founded }}</label>
                
                <label>Venue</label>
                <label>: {{ profile.venue }}</label>
                
                <label>Club Colors</label>
                <label>: {{ profile.clubColors }}</label>
            </div>
      </v-row>
      <v-row no-gutters>
          <h3>Players</h3>
          <v-expansion-panels accordion>
            <v-expansion-panel
                v-for="(player,idx) in profile.squad"
                :key="'player-'+idx"
            >
                <v-expansion-panel-header>{{ player.name }}</v-expansion-panel-header>
                <v-expansion-panel-content>
                    <div class="squad">
                        <label>Date of Birth</label>
                        <label>: {{ formattedDate(player.dateOfBirth) }}</label>

                        <label>Country of Birth</label>
                        <label>: {{ player.countryOfBirth }}</label>
                        
                        <label>Position</label>
                        <label>: {{ player.position ? player.position : '-' }}</label>

                        <label>Nationality</label>
                        <label>: {{ player.nationality }}</label>
                    </div>
                </v-expansion-panel-content>
            </v-expansion-panel>
            </v-expansion-panels>
          
      </v-row>
  </v-container>
</v-card>
  
</template>

<script>
import axios from 'axios';

export default {
    name: 'Squad',
    props: {
        id: {
            type: Number
        }
    },
    data: () => ({
        profile: null
    }),
    mounted() {
        this.getProfileTeams();
    },
    methods: {
        getProfileTeams() {
            axios.get(`http://api.football-data.org/v2/teams/${this.id}`)
            .then(response => {
                this.profile = response.data;
            })
        },
        formattedDate(val) {
            var options = { year: 'numeric', month: 'long', day: 'numeric' };
            var date = new Date(val);

            return date.toLocaleDateString("en-US", options);
        }
    }
}
</script>

<style>
.profile {
    display: grid;
    grid-template-columns: 10vw 10vw;
}

.squad {
    display: grid;
    grid-template-columns: 10vw 10vw;
}
</style>