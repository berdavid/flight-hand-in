<template>
  <div class="selectInputCont">
    <label :id="parameter + '_placeholder'" class="placeholder" :style="selectedOption || focused ? 'top: -24%; font-size: 13px; font-weight: bold;' : 'top: 0; font-size: 20px; font-weight: unset;'">{{ parameter }}</label>
    <input v-model="selectedOption" @input="oninput(selectedOption)" @focusout="openOpt(false)" @focus="openOpt(true)" class="selectInput">
    <div :id="parameter + '_selectOptsCont'" class="selectOptsCont">
      <div v-for="(option,i) in places" :key="i" class="selectOption" @click="selectOpt(option)">{{ option }}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['parameter', 'places'],
  data() {
    return {
      selectedOption: null,
      focused: false,
      options: ['Apple', 'Banana', 'Orange', 'Grapes'],
    };
  },
  watch: {
    selectedOption(newValue) {
      this.$emit('input-change', this.parameter + '/' +newValue);
    }
  },
  methods: {
    oninput(value) {
      if (value === null || value === '') {
        document.getElementById(this.parameter + '_placeholder').classList.remove('placeholderTransl');
      } else {
        document.getElementById(this.parameter + '_placeholder').classList.add('placeholderTransl');
      }
    },
    openOpt(bool) {
      if (bool) {
        this.focused = true;
        document.getElementById(this.parameter + '_selectOptsCont').style.display = 'block';
      } else {
        setTimeout(() => {
          document.getElementById(this.parameter + '_selectOptsCont').style.display = 'none';
          this.focused = false;
        }, 200);
      }
    },
    selectOpt(opt) {
      if (opt) {
        this.selectedOption = opt;
        document.getElementById(this.parameter + '_selectOptsCont').style.display = 'none';
        document.getElementById(this.parameter + '_placeholder').classList.add('placeholderTransl');
      } else {
        document.getElementById(this.parameter + '_selectOptsCont').style.display = 'none';
      }
    }
  }
};
</script>

<style lang="scss" scoped>
$size: 70px;
.selectInputCont {
  width: 90%;
  height: $size;
  position: relative;
}
.placeholder {
  position: absolute;
  left: 20px;
  color: $nonHighlighted;
  line-height: $size;
  z-index: 1;
  transition: 0.2s;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
@mixin plac {
  top: -24%;
  font-size: 13px;
  font-weight: bold;
}
.selectInputCont:focus-within .placeholder {
  @include plac;
}
.placeholderTransl {
  @include plac;
}
.selectInput {
  width: 100%;
  height: 100%;
  border: solid 2px $nonHighlighted;
  border-radius: 3px;
  z-index: 2;
  position: relative;
  background-color: rgba($color: #000, $alpha: 0);
  padding-left: 18px;
  font-size: 20px;
  color: black;
  padding-top: 20px;
}
.selectOptsCont {
  position: absolute;
  top: $size;
  left: 0;
  width: 100%;
  border-radius: 3px;
  z-index: 3;
  display: none;
  background-color: $light;
  box-shadow: 1px 0px 15px 0px rgba(0, 0, 0, 0.35);
  overflow: auto;
  max-height: 200px;
  transition-delay: 2s;
  transition: 2s;
}
.selectOption {
  width: 100%;
  height: 40px;
  line-height: 40px;
  padding-left: 20px;
  &:hover {
    background-color: $nonHighlighted;
    color: $light;
  }
}


</style>
