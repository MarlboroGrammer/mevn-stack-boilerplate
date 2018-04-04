
<template>
  <div class="container">
    <h1>Visit Form</h1>
    <div class="form-group">
    <label> Description </label>
      <input type="Description" name="description" placeholder="Write here" class="form-control" v-model="text" required>
      
    </div>

    <div class="form-group">
    <label> Statuts </label>
      <input type="status" name="status" placeholder="status" class="form-control" v-model="status">
    </div>

     <div class="form-group">
     <label> Start Date </label>
      <input type="datetime-local" name="start_date"  class="form-control" v-model="start_date" required>
    </div>

     <div class="form-group">
     <label> End Date </label>
      <input type="datetime-local" name="end_date"  class="form-control" v-model="end_date" required>
    </div>
    <div class="form-group">
      <button @click="insert" class="btn btn-success">Valider</button>
    </div>
  </div>
</template>

<script>
import VisitService from '@/services/VisitService'

export default {
  name: 'Visit',
  data () {
    return {
      text: '',
      status: '',
      start_date: null,
      end_date: null,
      visits: []
    }
  },
  methods: {
    async insert () {
      console.log(this.start_date)
      if (this.start_date< this.end_date)
      {
   const response = await VisitService.insert({
        text: this.text,
        status: this.status,
        start_date: this.start_date,
        end_date: this.end_date
      })
      this.$notify({
       group: 'foo',
       title: 'Insert event',
      text: 'Insert done',
      duration: 5000,
      type: 'success '
        });
       this.$router.push({name: 'VisitsAdmin'})
      }
      else

      {
        this.$notify({
       group: 'foo',
       title: 'Error Date',
       text: 'Date invalide',
       duration: 5000,
       type: 'error'
        });
       
      }
   
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
