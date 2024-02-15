<template>
  <div id="paymentBack" class="paymentBack">
    <div class="payment">
      <div class="top">Thanks for buying your tickets at Mito Airlines</div>
      <div class="left">
        <div v-if="cartItemOutbound.length != 0" class="menuItemContent">
          <div class="calDay">
            <div>{{ formatMonthA }}</div>
            <div>{{ formatDate(departureDate).split(' ')[1] }}</div>
          </div>
          <div class="oriDest">{{ originName }} - {{ destinationName }}</div>
          <div>{{ formatDate(departureDate)[0] }}{{ formatDate(departureDate)[1] }}{{ formatDate(departureDate)[2] }} {{ cartItemOutbound[0].timeStart }} - {{ cartItemOutbound[0].timeEnd }}</div>
        </div>
      </div>
      <div class="right">
        <div v-if="cartItemInbound.length != 0" class="menuItemContent">
          <div class="calDay">
            <div>{{ formatMonthB }}</div>
            <div>{{ formatDate(returnDate).split(' ')[1] }}</div>
          </div>
          <div class="oriDest">{{ destinationName }} - {{ originName }}</div>
          <div>{{ formatDate(returnDate)[0] }}{{ formatDate(returnDate)[1] }}{{ formatDate(returnDate)[2] }} {{ cartItemInbound[0].timeStart }} - {{ cartItemInbound[0].timeEnd }}</div>
        </div>
      </div>
      <p class="bottomLeft">Total: <b>${{ (parseFloat((cartItemOutbound.length != 0 ? cartItemOutbound[0].price : '0')) + parseFloat((cartItemInbound.length != 0 ? cartItemInbound[0].price : '0'))).toFixed(2) }}</b></p>
      <div class="bottomRight" @click="pay(false)">No, thanks (reset)</div>
    </div>
  </div>
  <div class="flightContainer">
    <div class="header">
      <div class="mainLogo"><div v-for=" in 3"></div></div>
      <div class="fromToA"><div>{{ originName }}</div> <div class="longlineA"><div></div></div><div> {{ destinationName }}</div></div>
    </div>

    <div class="flightHeader">Select Flight</div>
    <div class="flightMenu">
      <div class="menuItem">
        <div class="menuItemHeader">
          <div>Flights</div>
          <div>${{ (parseFloat((cartItemOutbound.length != 0 ? cartItemOutbound[0].price : '0')) + parseFloat((cartItemInbound.length != 0 ? cartItemInbound[0].price : '0'))).toFixed(2) }}</div>
        </div>
        <div v-if="cartItemOutbound.length != 0" class="menuItemContent">
          <div class="calDay">
            <div>{{ formatMonthA }}</div>
            <div>{{ formatDate(departureDate).split(' ')[1] }}</div>
          </div>
          <div class="oriDest">{{ originName }} - {{ destinationName }}</div>
          <div>{{ formatDate(departureDate)[0] }}{{ formatDate(departureDate)[1] }}{{ formatDate(departureDate)[2] }} {{ cartItemOutbound[0].timeStart }} - {{ cartItemOutbound[0].timeEnd }}</div>
        </div>
        <div v-if="cartItemInbound.length != 0" class="menuItemContent dotted">
          <div class="calDay">
            <div>{{ formatMonthB }}</div>
            <div>{{ formatDate(returnDate).split(' ')[1] }}</div>
          </div>
          <div class="oriDest">{{ destinationName }} - {{ originName }}</div>
          <div>{{ formatDate(returnDate)[0] }}{{ formatDate(returnDate)[1] }}{{ formatDate(returnDate)[2] }} {{ cartItemInbound[0].timeStart }} - {{ cartItemInbound[0].timeEnd }}</div>
          <div class="topArrow"></div>
        </div>
        <div class="menuItemBottom">
          <div>Total</div>
          <div>${{ (parseFloat((cartItemOutbound.length != 0 ? cartItemOutbound[0].price : '0')) + parseFloat((cartItemInbound.length != 0 ? cartItemInbound[0].price : '0'))).toFixed(2) }}</div>
        </div>
      </div>
        <button @click="pay(true)" class="payNow">Pay Now</button>
    </div>
    <div class="flightTable">
      <div class="flightOptionsCont">
        <div class="flightOptionsHader">
          <div class="bound">Outbound</div>
          <div class="fromTo"><div>{{ originName }}</div> <div class="longline"><div></div></div><div> {{ destinationName }}</div></div>

        </div>
        <div class="flightOptionsInfo"><button><q-icon class="ico" name="arrow_back_ios"></q-icon>Wed 7 October</button>{{ formatDate(departureDate) }}<button>Sat 10 october<q-icon class="ico" name="arrow_forward_ios"></q-icon></button></div>
        <template v-for="(date, i) in dates" :key="i">
          <div class="flightOptionsItem">{{ date.timeStart }} - {{ date.timeEnd }}</div>
          <div class="flightOptionsItem"><p class="p" @click="addToCart($event.target, originName, destinationName, date.timeStart, date.timeEnd, date.priceA)">${{ date.priceA }}</p><div v-if="i == 0">Basic</div></div>
          <div class="flightOptionsItem middle"><p class="p" @click="addToCart($event.target, originName, destinationName, date.timeStart, date.timeEnd, date.priceB)">${{ date.priceB }}</p><div v-if="i == 0">Standard</div></div>
          <div class="flightOptionsItem"><p class="p" @click="addToCart($event.target, originName, destinationName, date.timeStart, date.timeEnd, date.priceC)">${{ date.priceC }}</p><div v-if="i == 0">Plus</div></div>
        </template>
      </div>
      <div class="flightOptionsCont">
        <div class="flightOptionsHader">
          <div class="bound">Inbound</div>
          <div class="fromTo"><div>{{ destinationName }}</div> <div class="longline"><div></div></div><div> {{ originName }}</div></div>

        </div>
        <template v-if="datesB.length != 0">
          <div class="flightOptionsInfo"><button><q-icon class="ico" name="arrow_back_ios"></q-icon>Wed 7 October</button>{{ formatDate(returnDate) }}<button>Sat 10 october<q-icon class="ico" name="arrow_forward_ios"></q-icon></button></div>
          <template v-for="(date, i) in datesB" :key="i">
            <div class="flightOptionsItem">{{ date.timeStart }} - {{ date.timeEnd }}</div>
            <div class="flightOptionsItem"><p class="pb" @click="addToCartB($event.target, destinationName, originName, date.timeStart, date.timeEnd, date.priceA)">${{ date.priceA }}</p><div v-if="i == 0">Basic</div></div>
            <div class="flightOptionsItem middle"><p class="pb" @click="addToCartB($event.target, destinationName, originName, date.timeStart, date.timeEnd, date.priceB)">${{ date.priceB }}</p><div v-if="i == 0">Standard</div></div>
            <div class="flightOptionsItem"><p class="pb" @click="addToCartB($event.target, destinationName, originName, date.timeStart, date.timeEnd, date.priceC)">${{ date.priceC }}</p><div v-if="i == 0">Plus</div></div>
          </template>
        </template>
        <template v-else>
          <div class="chooseReturnCont">
            <div class="chooseReturn">
              <div class="returnInputFiled">
                <dateInput :parameter="'newReturn'" :currentDate="departureDate" :valid="false" @input-change="inputChange" />
              </div>
              <button @click="searchReturn()" class="searchReturn">Search</button>
            </div>
          </div>
          <div id="returnError" class="chooseReturnError"></div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import dateInput from 'components/dateInput.vue'

export default {
  name: "SelectFlight",
  components: {
    dateInput
  },
  data() {
    return {
      dates: [],
      datesB: [],
      allData: [],
      checkedA: false,
      checkedB: false,
      cartItemOutbound: [],
      cartItemInbound: [],
      months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      date: new Date(),
      formatMonthA: '',
      formatMonthB: '',
      newReturn: '',
      currentDate: new Date().toISOString().slice(0, 10),
    };
  },
  async mounted() {
    await this.fetchData();
  },
  created() {
    //this.$route.params.origin;
    // this.originName = this.$store.getters['module/originGetter'];
    // this.destinationName = this.$store.getters['module/destinationGetter'];
    // this.departureDate = this.$store.getters['module.departureGetter'];
    // this.returnDate = this.$store.getters['module.returnGetter'];
  },
  computed: {
    originName() {
      return this.$store.getters['module/originGetter'];
    },
    destinationName() {
      return this.$store.getters['module/destinationGetter'];
    },
    departureDate() {
      return this.$store.getters['module/departureDateGetter'];
    },
    returnDate() {
      return this.$store.getters['module/returnDateGetter'];
    },
  },
  methods: {

    async fetchData() {
      fetch('/mockData.json')
      .then(response => response.json())
      .then(data => this.useData(data))
      .catch(error => console.error('Error fetching data:', error));
    },
    useData(data) {
      this.allData = data.flights;
      this.setDataOutbound()
      if (this.returnDate != '') {
        this.setDataInbound()
      }
    },
    setDataOutbound() {
      for (let i = 0; i < this.allData.length; i++) {
        if (this.allData[i].origin == this.originName && this.allData[i].destination == this.destinationName && this.allData[i].departure == this.departureDate) {
          this.dates.push({
              timeStart: this.allData[i].timeStart,
              timeEnd: this.allData[i].timeFinish,
              priceA: this.allData[i].priceBasic,
              priceB: this.allData[i].priceStandard,
              priceC: this.allData[i].pricePlus
          });
        }
      }
    },
    setDataInbound() {
      for (let i = 0; i < this.allData.length; i++) {
        if (this.allData[i].origin == this.destinationName && this.allData[i].destination == this.originName && this.allData[i].departure == this.returnDate) {
          this.datesB.push({
              timeStart: this.allData[i].timeStart,
              timeEnd: this.allData[i].timeFinish,
              priceA: this.allData[i].priceBasic,
              priceB: this.allData[i].priceStandard,
              priceC: this.allData[i].pricePlus
          });
        }
      }
    },
    formatDate(dateString) {

      const dateParts = dateString.split('-');
      const year = parseInt(dateParts[0]);
      const month = parseInt(dateParts[1]) - 1;
      const day = parseInt(dateParts[2]);

      const date = new Date(year, month, day);
      const dayOfWeek = this.days[date.getDay()];
      const monthName = this.months[date.getMonth()];

      return `${dayOfWeek}, ${day} ${monthName} ${year}`;
    },
    addToCart(element, origin, destination, timeStart, timeEnd, price) {
      // this.$store.dispatch('module/saveFlightParams', { origin: origin, destination: destination, timeStart: timeStart, timeEnd: timeEnd, price: price });
      // this.$router.push({ name: 'cart'});
      const empty = [];
      if (this.checkedA != element) {
        for (let i = 0; i < document.getElementsByClassName('p').length; i++) {
          document.getElementsByClassName('p')[i].classList.remove('selected');
        }
        element.classList.add('selected');

        this.cartItemOutbound = empty;
        this.cartItemOutbound.push({
          origin: origin,
          destination: destination,
          timeStart: timeStart,
          timeEnd: timeEnd,
          price: price
        });

        const thatDate = this.departureDate
        const dateParts = thatDate.split('-');
        const year = parseInt(dateParts[0]);
        const month = parseInt(dateParts[1]) - 1;
        const day = parseInt(dateParts[2]);
        const date = new Date(year, month, day);
        this.formatMonthA = this.months[date.getMonth()][0] + this.months[date.getMonth()][1] + this.months[date.getMonth()][2];

        this.checkedA = element;
      } else {
        element.classList.remove('selected');
        this.cartItemOutbound = empty;
        this.checkedA = false;
      }

    },
    addToCartB(element, origin, destination, timeStart, timeEnd, price) {
      const empty = [];
      if (this.checkedB != element) {
        for (let i = 0; i < document.getElementsByClassName('p').length; i++) {
          document.getElementsByClassName('pb')[i].classList.remove('selected');
        }
        element.classList.add('selected');

        this.cartItemInbound = empty;
        this.cartItemInbound.push({
          origin: origin,
          destination: destination,
          timeStart: timeStart,
          timeEnd: timeEnd,
          price: price
        });

        const thatDate = this.returnDate
        const dateParts = thatDate.split('-');
        const year = parseInt(dateParts[0]);
        const month = parseInt(dateParts[1]) - 1;
        const day = parseInt(dateParts[2]);
        const date = new Date(year, month, day);
        this.formatMonthB = this.months[date.getMonth()][0] + this.months[date.getMonth()][1] + this.months[date.getMonth()][2];

        this.checkedB = element;
      } else {
        element.classList.remove('selected');
        this.cartItemInbound = empty;
        this.checkedB = false;
      }

    },
    searchReturn() {

      this.$store.dispatch('module/saveReturnParams', {return: this.newReturn });

      var agree = false;
      for (let i = 0; i < this.allData.length; i++) {
        if (this.allData[i].origin == this.destinationName && this.allData[i].destination == this.originName && this.allData[i].departure == this.returnDate) {
          agree = true;
        }
      }


      if (this.returnDate != '' && this.returnDate > this.currentDate && agree) {
        this.setDataInbound()
      } else {
        document.getElementById('returnError').innerHTML = 'No flights available';
      }
    },
    inputChange(value) {
      console.log(value);
      const [parameter, newValue] = value.split('/');
      this.newReturn = newValue;
    },
    pay(go) {
      if (go) {
        document.getElementById('paymentBack').style.display = 'flex';
      } else {
        document.getElementById('paymentBack').style.display = 'none';
      }
    },
  }
}
</script>

<style lang="scss" scoped>

.fromToA {
  font-size: 19px;
  font-weight: bold;
  padding: 10px;
  line-height: 50px;
  color: $light;
  margin-left: 100px;
  div {
    float: left;
  }
}.flightHeader {
  grid-area: header;
  height: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  color: $primary;
  font-size: 40px;
  font-weight: 300;
  text-transform: uppercase;
}
.flightMenu {
  grid-area: menu;
  padding: 0 20px;
}
.menuItem {
  width: 200px;
}
.menuItemHeader {
  height: 40px;
  background-color: $light;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  padding: 10px;
  border-top: solid 1px $nonHighlighted;
  text-transform: uppercase;
  font-weight: bold;
  div {
    &:first-child {
      text-align: left;
    }
    &:last-child {
      text-align: right;
    }
  }
}
.menuItemContent {
  height: 70px;
  background-color: $light;
  width: 100%;
  display: grid;
  padding: 10px;
  grid-template-areas:
    'day origindestination'
    'day time';
  .calDay {
    grid-area: day;
    font-size: 18px;
    font-weight: bold;
    border: solid 3px $nonHighlighted;
    border-radius: 4px;
    width: 40px;
    height: 47px;
    margin-right: 5px;
    text-transform: uppercase;
    div {
      text-align: center;
      &:nth-child(1) {
        background-color: $nonHighlightedLight;
        font-size: 13px;
      }
      &:nth-child(2) {
        font-size: 15px;
      }
    }
  }
  .oriDest {
    grid-area: origindestination;
    font-size: 13px;
    font-weight: bold;
    line-height: 15px;
  }
  div {
    &:nth-child(3) {
      grid-area: time;
      font-size: 12px;
      font-weight: bold;
      color: grey;
    }
  }

}
.menuItemBottom {
  height: 50px;
  background-color: $primary;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  color: $light;
  line-height: 20px;
  padding: 15px;
  text-transform: uppercase;
  div {
    &:first-child {
      text-align: left;
      font-weight: bold;
    }
    &:last-child {
      text-align: right;
      font-weight: bold;
    }
  }
}
.payNow {
  width: 200px;
  height: 50px;
  background-color: $brand;
  text-transform: uppercase;
  color: $light;
  font-size: 17px;
  font-weight: bold;
  border: none;
  border-radius: 3px;
  margin-top: 20px;
  cursor: pointer;
}
.flightTable {
  grid-area: tabs;
  padding: 0 20px;
}
.flightOptionsCont {
  width: 100%;
  background-color: $light;
  display: grid;
  grid-template-areas:
    'header header header header'
    'info info info info'
    'auto auto auto auto'
    'error error error error';
  box-shadow: 1px 0px 15px 0px rgba(0, 0, 0, 0.35);
  border-radius: 3px;
  background-color: $light;
  margin-bottom: 50px;
}
.flightOptionsHader {
  grid-area: header;
  height: 50px;
  width: 100%;
  background-color: $nonHighlightedLight;
}
.bound {
  font-size: 16px;
  padding: 10px;
  line-height: 30px;
  float: left;
  color: grey;
  text-transform: uppercase;
  margin-right: 25px;
}
.fromTo {
  font-size: 19px;
  font-weight: bold;
  padding: 10px;
  line-height: 30px;
  color: $primary;
  div {
    float: left;
  }
}
.flightOptionsInfo {
  grid-area: info;
  height: 60px;
  width: 100%;
  background-color: $light;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  text-align: center;
  line-height: 60px;
    font-size: 14px;
  button {
    height: 40px;
    background-color: $light;
    border: none;
    border-radius: 3px;
    cursor: pointer;
    transition: 0.2s;
    color: $grey;
    font-size: 12px;
    text-transform: uppercase;
    font-weight: 500;
    margin: 0 10px;
    line-height: 40px;
    &:hover {
      background-color: $nonHighlightedLight;
    }
    align-self: center;
    &:first-child {
      justify-self: start;
    }
    &:last-child {
      justify-self: end;
    }
    .ico {
      font-size: 20px;
      margin: 0 5px;
      color: $brand;
    }
  }
}
.flightOptionsItem {
  height: 80px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  border-top: solid 1px $nonHighlighted;
  div {
    position: absolute;
    top: 3px;
    left: 50%;
    transform: translateX(-50%);
    font-size: 10px;
    font-weight: bold;
    text-transform: uppercase;
  }
  p {
    font-size: 17px;
    font-weight: bold;
    color: black;
    border: solid 2px $brand;
    width: 80%;
    height: 35px;
    margin: 0;
    text-align: center;
    line-height: 35px;
    cursor: pointer;
    &:hover {
      background-color: $brand;
      color: $light;
    }
  }
}
.middle {
  background-color: $nonHighlightedLight;
}
.longline {
  width: 26px;
  height: 1px;
  background-color: $primary;
  position: relative;
  margin: 15px 20px 0px 20px;

  div {
    width: 5px;
    height: 5px;
    border-bottom: solid 1px $primary;
    border-right: solid 1px $primary;
    transform: rotate(-45deg);
    position: absolute;
    top: -2px;
    right: 1px;
  }
}
.longlineA {
  width: 26px;
  height: 1px;
  background-color: $light;
  position: relative;
  margin: 25px 20px 0px 20px;

  div {
    width: 5px;
    height: 5px;
    border-bottom: solid 2px $light;
    border-right: solid 2px $light;
    transform: rotate(-45deg);
    position: absolute;
    top: -2px;
    right: 1px;
  }
}
.selected {
  background-color: $brand;
  color: $light !important;
}
.dotted {
  border-top: dashed 1px $nonHighlighted;
  position: relative;
}
.topArrow {
  position: absolute;
  top: -5px;
  left: 50%;
  transform: translateX(-50%) rotate(-45deg);
  width: 10px;
  height: 10px;
  border-left: 1px solid $nonHighlighted;
  border-bottom: 1px solid $nonHighlighted;
}
.chooseReturnCont {
  grid-area: info;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
}
.chooseReturn {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  transform: scale(0.7);
}
.returnInputFiled {
  max-width: 300px;
  width: 90%;
}
.searchReturn {
  width: 200px;
  height: 70px;
  background-color: $secondary;
  text-transform: uppercase;
  color: $light;
  font-size: 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  float: left;
}
.chooseReturnError {
  grid-area: error;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  font-weight: 500;
  color: $negative;
  text-align: center;
  line-height: 40px;
}
.paymentBack {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba($color: #000, $alpha: 0.7);
  z-index: 10;
  display: flex;
  justify-content: center;
  align-items: center;
  display: none;
}
.payment {
  width: 500px;
  height: 200px;
  background-color: $light;
  border-radius: 5px;
  z-index: 101;
  overflow: hidden;
  display: grid;
  grid-template-areas:
    'header header'
    'left right'
    'bottomLeft bottomRight';
  .top {
    grid-area: header;
    height: 50px;
    width: 100%;
    background-color: $nonHighlightedLight;
    text-align: center;
    line-height: 50px;
    color: $secondary;
    font-size: 17px;
    font-weight: 400;
    text-transform: uppercase;
  }
  .left {
    grid-area: left;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 20px;
    font-weight: bold;
    padding: 0 40px;
  }
  .right {
    grid-area: right;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 20px;
    font-weight: bold;
    padding: 0 40px;
  }
  .bottomLeft {
    grid-area: bottomLeft;
    width: 100%;
    text-align: left;
    line-height: 50px;
    padding: 0 40px;
    text-transform: uppercase;
    font-weight: bold;
    font-size: 17px;
    b {
      color: $primary;
    }
  }
  .bottomRight {
    grid-area: bottomRight;
    text-align: right;
    line-height: 50px;
    cursor: pointer;
    transition: 0.2s;
    color: $brand;
    padding: 0 40px;
    text-transform: uppercase;
    font-weight: bold;
    text-decoration: underline;
    &:hover {
      color: $brandB;
      text-decoration: underline;
    }
  }
}

</style>
