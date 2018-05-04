<template>
  <div>
    <div :is="mapReportComponent"></div>
    <button @click="cancelAddForMap()" v-if="isAdd === true" class="btn btn-warning">Cancel</button>
  </div>
</template>
<script>
import map from '@/components/map'
import FormReports from '@/components/delegateReports/Form'
export default {
  name: 'Delegate',
  components: {
    'Map': map
  },
  data () {
    return {
      isAdd: false,
      mapReportComponent: map,
      currentVisitId: '5ae88ea168c5bae702532662'
    }
  },
  methods: {
    logout () {
      console.log('Logout clicked')
      this.$store.dispatch('logout')
      this.$router.push({name: 'Login'})
    },
    loadAddForMap () {
      try {
        this.mapReportComponent = FormReports
        this.isAdd = true
      } catch (err) {
        console.log(err)
      }
    },
    cancelAddForMap () {
      this.mapReportComponent = map
      this.isAdd = false
    }
  },
  mounted: function () {
  },
  beforeCreate: function () {
    if (this.$store.getters.isLoggedIn === false || this.$store.getters.getUser.role !== 'Delegate') {
      this.$router.push({name: 'Login'})
    }
  }
}
</script>
<style></style>
