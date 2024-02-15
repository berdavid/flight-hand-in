<template>
  <div class="componentContainer">
    <router-view />
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'


export default defineComponent({
  name: 'MainLayout',

})
</script>

<style lang="scss">
.componentContainer {
  background-image: url('../assets/europe.png');
  background-size: cover;
  background-position: center;
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
