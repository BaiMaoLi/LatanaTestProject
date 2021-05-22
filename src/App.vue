<template>
  <List/>
</template>
<script>
import List from './components/List.vue'
export default {
  name: 'App',
  components: {
    List
  }
}
</script>

<style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    padding-top:20px;
    background: #0a0a0a9e;
  }
  .loading{
    background: #11111194;
  }
  .loading-text{
    position: fixed;
    left: 50%;
    top:50%;
    transform: translate(-50%,-50%);
    font-size: 20px;
    color:#fff;
  }



</style>
