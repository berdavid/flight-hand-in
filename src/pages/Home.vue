<template>
  <div class="homeCont">

    <div class="header">
      <div class="mainLogo"><div v-for=" in 3"></div></div>
      <div class="title">Mito Airline {{ originName }}</div>
    </div>

    <div class="origin inputFileds">
      <selectInput :parameter="'Origin'" :errorMessage="originError" :places="newOriginPlaces" @input-change="handleInputChange" />
    </div>
    <div class="destination inputFileds">
      <selectInput :parameter="'Destination'" :errorMessage="destinationError" :places="newDestinationPlaces" @input-change="handleInputChange" />
    </div>
    <div class="departure inputFileds">
      <dateInput :parameter="'Departure'" :errorMessage="departureError" :currentDate="currentDate" @input-change="handleInputChange" />
    </div>
    <div class="return inputFileds">
      <dateInput :parameter="'Return'" :currentDate="choosenDate" :valid="valid" @input-change="handleInputChange" />
    </div>
    <div class="submSec">
      <button class="searchButt" @click="buttClick()">Search</button>
    </div>

  </div>
  <div style="position: fixed; bottom: 0;">origin: '{{ origin }}', destination: '{{ destination }}', departure: '{{ departure }}', return:'{{ return_ }}';</div>
</template>

<script>
import { defineComponent } from 'vue'
import selectInput from 'components/selectInput.vue'
import dateInput from 'components/dateInput.vue'

export default defineComponent({
  name: 'HomePage',
  components: {
    selectInput,
    dateInput,
  },
  data() {
    return {
      origin: '',
      destination: '',
      departure: '',
      return_: '',
      originPlaces: [],
      newOriginPlaces: [],
      destinationPlaces: [],
      newDestinationPlaces: [],
      newPlaces: [],
      checkPlaces: ['',''],
      currentDate: new Date().toISOString().slice(0, 10),
      choosenDate: '',
      valid: true,
      originError: '',
      destinationError: '',
      departureError: '',
    };
  },
  methods: {
    handleInputChange(value) {
      const [parameter, newValue] = value.split('/');

      switch (parameter) {
        case 'Origin':
          this.origin = newValue;
          this.checkPlaces[0] = newValue;
          this.originError = '';
          break;
        case 'Destination':
          this.destination = newValue;
          this.checkPlaces[1] = newValue;
          this.destinationError = '';
          break;
        case 'Departure':
          this.departure = newValue;

          if (this.Departure !== '' && this.departure > this.currentDate) {
            this.valid = false;
            this.choosenDate = this.departure;
          } else {
            this.valid = true;
          }
          this.departureError = '';


          break;
        case 'Return':
          this.return_ = newValue;
          break;
      }
      //this.newPlaces = this.places.filter(place => place.name !== this.checkPlaces[0] && place.name !== this.checkPlaces[1]);

      //this.newPlaces = this.places.filter(place => place.origin !== this.checkPlaces[0] && place.destination !== this.checkPlaces[1]);

      this.newOriginPlaces = this.originPlaces.filter(place => place !== this.checkPlaces[1]);
      this.newDestinationPlaces = this.destinationPlaces.filter(place => place !== this.checkPlaces[0]);

    },
    async fetchData() {
      fetch('/mockData.json')
      .then(response => response.json())
      .then(data => this.doSmth(data))
      .catch(error => console.error('Error fetching data:', error));
    },
    doSmth(data) {
      this.originPlaces = Array.from(new Set((data.flights.map(place => place.origin))));
      this.newOriginPlaces = Array.from(new Set((data.flights.map(place => place.origin))));
      this.destinationPlaces = Array.from(new Set((data.flights.map(place => place.destination))));
      this.newDestinationPlaces = Array.from(new Set((data.flights.map(place => place.destination))));
    },
    buttClick() {
      if(this.origin === '') {
        this.originError = 'Please select origin';
      }
      if(this.destination === '') {
        this.destinationError = 'Please select destination';
      }
      if(this.departure === '') {
        this.departureError = 'Please select departure date';
      }
      if(this.origin != '' && this.destination != '' && this.departure != '') {
        this.$store.dispatch('module/saveSearchParams', { origin: this.origin, destination: this.destination, departure: this.departure, return: this.return_ });
        this.$router.push({ name: 'selectFlight'});
        //this.$router.push({ name: 'selectFlight', params: { origin: this.origin }});
      }

    }
  },
  computed: {
    originName() {
      return this.$store.state.module.origin;
    }
  },
  mounted() {
    this.fetchData();
  },
})
</script>

<style lang="scss" scoped>
.origin { grid-area: origin; }
.destination { grid-area: destination; }
.departure { grid-area: departure; }
.return { grid-area: return; }
.submSec {
  grid-area: submSec;
  display: flex;
  justify-content: center;
  align-items: center;
}
.inputFileds {
  display: flex;
  align-items: center;
  justify-content: center;
}
.searchButt {
  width: 300px;
  height: 70px;
  background-color: $secondary;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: 0.2s;
  color: $light;
  font-size: 20px;
  text-transform: uppercase;
  font-weight: 500;
  &:hover {
    background-color: $primary;
  }
}
</style>
