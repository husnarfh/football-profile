<template>
  <v-container>
      
         <v-row no-gutters class="text-center">
        <h3>Areas</h3>
        </v-row>
        <v-row no-gutters align="center">
            <template v-for="(area,idx) in areas">
                <v-col cols="2" :key="'areas-'+idx">         
                    <v-card rounded="lg" class="pa-3 ma-3 justify-center card-areas" @click="onClickArea(area.id)">
                        <label>{{ area.name }} <br> ({{area.countryCode}})</label>
                    </v-card> 
                </v-col> 
            </template> 
        </v-row>
  </v-container>
</template>

<script>
import axios from 'axios';

export default {
    name: 'Areas',
    data: () => ({
      areas: [],
      isActive: false
    }),
    mounted() {
      this.getAreas();
    },
    methods: {
      getAreas() {
        axios.get('http://api.football-data.org/v2/areas/')
        .then(response => {
          const { areas } = response.data;
          this.areas = areas
        })
      },
      onClickArea(id) {
          this.$emit('move-component', id)
      }
    }
}
</script>

<style lang="scss" scoped>
.card-areas {
    height: auto;
    &:hover {
        transform: scale(1.1);
        cursor: pointer;
    }
}
</style>>