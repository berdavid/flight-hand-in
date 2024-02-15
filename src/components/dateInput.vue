<template>
  <div class="dateInputCont">
    <label :id="parameter + '_placeholderDate'" class="placeholderDate" >{{ parameter }}</label>
    <input type="date" id="date" v-model="selectedDate" :disabled="valid" @input="oninputDate(selectedDate, $event.target)" :min="currentDate" class="dateInput">
  </div>
</template>

<script>
export default {
  name: 'DateInput',
  props: ['parameter', 'currentDate', 'valid'],
  data() {
    return {
      selectedDate: null,
    };
  },
  watch: {
    selectedDate(newValue) {
      this.$emit('input-change', this.parameter + '/' +newValue);
    }
  },
  methods: {
    oninputDate(value, elem) {
      if (value === '') {
        document.getElementById(this.parameter + '_placeholderDate').classList.remove('placeholderTransl');
        elem.classList.remove('dateInputTransl');
      } else {
        document.getElementById(this.parameter + '_placeholderDate').classList.add('placeholderTransl');
        elem.classList.add('dateInputTransl');
      }
    },
  }
};
</script>

<style lang="scss" scoped>
$size: 70px;
.dateInputCont {
  width: 90%;
  height: $size;
  position: relative;
}
.placeholderDate {
  position: absolute;
  left: 20px;
  color: $nonHighlighted;
  line-height: $size;
  z-index: 1;
  transition: 0.2s;
  top: 0%;
  font-size: 20px;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
@mixin plac {
  top: -24%;
  font-size: 13px;
  font-weight: bold;
}
.dateInputCont:focus-within .placeholderDate {
  @include plac;
}
.placeholderTransl {
  @include plac;
}
.dateInput {
  width: 100%;
  height: 100%;
  border: solid 2px $nonHighlighted;
  border-radius: 3px;
  z-index: 2;
  position: relative;
  background-color: rgba($color: #000, $alpha: 0);
  padding-left: 18px;
  font-size: 20px;
  color: rgba(0, 0, 0, 0);
  padding-top: 20px;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
  &:focus {
    color: black;
    -webkit-user-select: unset;
    -ms-user-select: unset;
    user-select: unset;
  }

  &::-webkit-calendar-picker-indicator {
    transform: translateY(-10px);
  }
  //can i change the logo of the date picker to my own png?
  &::-webkit-calendar-picker-indicator {
    background: url('../assets/calendar.svg') no-repeat;
    background-size: cover;
    background-position: center;
    height: 30px;
    width: 30px;
    margin-right: 7px;
  }
}
.dateInputTransl {
    color: black;
}

</style>
