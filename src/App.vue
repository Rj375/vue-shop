<template>
  <div id="app">
    
    <router-view/>
  </div>
</template>
<script>
 
export default {
  name: 'App',
  
}
</script>
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
 
  margin: 2px;
  background: #3498eb;
  box-shadow: 7px 7px 7px #aaaaaa;
 
  a {
    
    font-size: 22px;
    color: black;
    transition: all 0.3s ease 0s;
    &.router-link-exact-active {
      color: #fff;
    }
  }
 
}
</style>
