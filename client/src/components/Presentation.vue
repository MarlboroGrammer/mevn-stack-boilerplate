<!-- eslint-disable -->
<template>
  <div>
    
    <hr>
    
    <paginate ref="paginator"
        name="presentations"
        :list="presentations"
        :per="10"
        >
      <span class="text-center" v-if="presentations.length === 0">
        <div class="alert alert-warning">No presentations found</div>
      </span>
      <table class="table table-sm" v-if="presentations.length > 0">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Title</th>
            <th scope="col">Number of Slides</th>
            <th scope="col">Product</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(presentation, index) in paginated('presentations')" :key="presentation._id">
            <th scope="row">{{index + 1}}</th>
            <td>{{ presentation.name }}</td>
            <td>{{ presentation.length}}</td>
           <td>{{ presentation.name}}</td> 
            <td><button class="btn btn-primary" @click="viewPresentation(presentation._id)">View</button></td>
          </tr>
        </tbody>
      </table>
    </paginate>
    <div class="text-center">
      <paginate-links for="presentations" :show-step-links="true" v-if="presentations.length > 0"></paginate-links>
    </div>
    <button @click="InsertPresentation()" class="btn btn-primary"> Ajouter une nouvelle presentation  </button>  
  </div>
</template>

<script>
/* eslint-disable */
import PresentationService from '@/services/PresentationService'
import Slider from '@/components/Slider'

export default {
  name: 'List',
  components: { 
    'Slider': Slider
  },
  data () {
    return {
      presentations: [],
      presentationsCopy: [],
      paginate: ['presentations']
    }
  },
  methods: {
    async getPresentations () {
      try {
        const response = await PresentationService.getPresentations()
        return response.data
      } catch (err) {
        return undefined
      }
    },
     InsertPresentation (){
       this.$router.push({name: 'PresentationAjout'})
    },
    viewPresentation (id) {
      console.log(id)
      this.$parent.presentationToApproveID = id
      this.$parent.currentComponent2 = Slider
      console.log(id)
    }
  },
 
  beforeMount: function () {
    this.getPresentations().then(data => {
      this.presentations.push.apply(this.presentations, data)
      this.presentationsCopy = data
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  .custom-search-input .search-query {
    padding-right: 3px;
    padding-right: 4px \9;
    padding-left: 3px;
    padding-left: 4px \9;
    margin-bottom: 0;
    -webkit-border-radius: 3px;
    -moz-border-radius: 3px;
    border-radius: 3px;
  }
  .custom-search-input button {
    border: 0;
    background: none;
    padding: 2px 5px;
    margin-top: 32px;
    position: relative;
    left: -28px;
    margin-bottom: 0;
    -webkit-border-radius: 3px;
    -moz-border-radius: 3px;
    border-radius: 3px;
    color:#D9230F;
  }
  .custom-search-input .search-query:focus + button {
    z-index: 3;
  }
  .custom-search-input .search-query button:focus{
    border-style: none;
  }
  .search-query{
    margin-top: 24px
  }
  ul.paginate-links{
    font-family: 'CamptonBold';
    font-size: 18px;
    display: inline-flex;
    list-style: none;
    cursor: pointer;
  }
  ul.paginate-links li{
    text-align: center;
    display: inline;
    margin: 10px;
    padding: 5px;
    padding-right: 8px;
    border: 1px solid rgb(54, 169, 206);
    border-radius: 15%;
  }
  ul.paginate-links li.active{
    background-color: rgb(54, 169, 206);
  }
  ul.paginate-links li.active a{
    color: white;
  }
  ul.paginate-links li.right-arrow, ul.paginate-links li.left-arrow{
    border: none;
  }
</style>
