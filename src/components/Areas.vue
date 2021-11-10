<template>
   <v-container>
      <v-row no-gutters class="text-center" justify="center">
         <h2>Areas</h2>
      </v-row>
      <v-row no-gutters justify="center" v-if="areas.length === 0">
         <v-progress-circular
            :size="70"
            :width="7"
            color="brown"
            indeterminate
         ></v-progress-circular>
      </v-row>
      <v-row no-gutters align="center" v-else>
         <template v-for="(area, idx) in areas">
            <v-col md="2" sm="6" :key="'areas-' + idx">
               <v-card
                  rounded="lg"
                  class="pa-3 ma-3 text-center card-areas"
                  @click="onClickArea(area.id)"
               >
                  <label
                     >{{ area.name }} <br />
                     ({{ area.countryCode }})</label
                  >
               </v-card>
            </v-col>
         </template>
      </v-row>
   </v-container>
</template>

<script>
import axios from 'axios'

export default {
   name: 'Areas',
   data: () => ({
      areas: [],
      isActive: false,
   }),
   mounted() {
      this.getAreas()
   },
   methods: {
      getAreas() {
         axios
            .get('http://api.football-data.org/v2/areas/')
            .then((response) => {
               const { areas } = response.data
               this.areas = areas
            })
      },
      onClickArea(id) {
         this.$emit('move-component', id)
      },
   },
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
</style>
>
