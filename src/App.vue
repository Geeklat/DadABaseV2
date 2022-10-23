<template>
  <div data-app>
    <DadABase msg="Dad-A-Base"/>
  </div>  
</template>

<script>
import DadABase from './components/DadABase.vue';

export default {
  name: 'App',
  components: {
    DadABase
}
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;  
}
</style>
