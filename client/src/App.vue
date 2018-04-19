<template>
  <div id="app">
    <router-view/>
    <notifications group="foo" position="bottom right" />
     <notifications group="left" position="bottom left" />
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
  @import 'assets/css/application.css';
  @import 'assets/codebase/dhtmlxscheduler.css';
</style>
