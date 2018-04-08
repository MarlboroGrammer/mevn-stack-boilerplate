<template>
  <div>
    

     <div ref="scheduler_here" class="dhx_cal_container" style='width:100%; height:700px;'>
    <div class="dhx_cal_navline">
      <div class="dhx_cal_prev_button">&nbsp;</div>
      <div class="dhx_cal_next_button">&nbsp;</div>
      <div class="dhx_cal_today_button"></div>
      <div class="dhx_cal_date"></div>
      <div class="dhx_cal_tab" name="day_tab" style="right:204px;"></div>
      <div class="dhx_cal_tab" name="week_tab" style="right:140px;"></div>
      <div class="dhx_cal_tab" name="month_tab" style="right:76px;"></div>
       <div class="dhx_cal_tab" name="agenda_tab" style="right:280px;"></div>
    </div>
    <div class="dhx_cal_header"></div>
    <div class="dhx_cal_data"></div>
  </div>

  </div>
</template>

<script>
import VisitService from '@/services/VisitService'

import 'dhtmlx-scheduler'
import 'dhtmlx-scheduler/codebase/locale/locale_fr';
import 'dhtmlx-scheduler/codebase/ext/dhtmlxscheduler_readonly.js';
import 'dhtmlx-scheduler/codebase/ext/dhtmlxscheduler_pdf.js';
import 'dhtmlx-scheduler/codebase/ext/dhtmlxscheduler_agenda_view.js';



export default {
  name: 'Calendar',
  data () {
    return {
      events: []
    }
  },
    mounted() {

    const response = VisitService.getVisits()
    .then(response => {
      this.events = response.data
        scheduler.locale.labels.agenda_tab="Agenda";
        scheduler.init(this.$refs.scheduler_here,new Date(),"week");
        scheduler.templates.xml_date = function(value){ return new Date(value); };
       
        for (var i=0;i<this.events.length;i++)
        {
        this.events[i].id=i;
        
        this.events[i].color="orange";
        if (this.events[i].visitType=="Doctor")
        {
          this.events[i].color="pink";
        }
        }
        scheduler.parse(this.events, 'json');
        for (var j=0;j<this.events.length;j++)
        {
          if (this.events[j].visitType=="Pharmacist")
          {
            scheduler.getEvent(j).color = "green";
             scheduler.getEvent(j).textColor = "white";
            scheduler.updateEvent(j);
          }
        
        }
      
        
      
      
      
    })
    .catch(e => {
      this.errors.push(e)     
    })

      
    },
  methods: {

   

  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
 
 html, body{
            margin:0px;
            padding:0px;
            height:100%;
            overflow:hidden;
           
        }

</style>
