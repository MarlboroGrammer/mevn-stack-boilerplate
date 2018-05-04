<!-- eslint-disable -->
<template>
  <div>
  
<div>
<span class="label label-success">Pharmacy</span>
<span class="label label-warning">Wholesaler</span>
<span class="label label-danger">Doctor</span>
</div>

  <div ref="scheduler_here" class="dhx_cal_container" style='width:100%; height:600px;'>
    <div class="dhx_cal_navline">
      <div class="dhx_cal_prev_button">&nbsp;</div>
      <div class="dhx_cal_next_button">&nbsp;</div>
      <div class="dhx_cal_today_button"></div>
      <div class="dhx_cal_date"></div>
        
          <button @click="PDF" type="button" class="btn btn-danger btn-sm" style="margin-left:850px;margin-top:15px; "> 
          <span class="glyphicon glyphicon-download-alt"></span> Export to PDF
        </button>
         
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
/* eslint-disable */
import VisitService from '@/services/VisitService'

import 'dhtmlx-scheduler'
//import 'dhtmlx-scheduler/codebase/locale/locale_fr';
//import 'dhtmlx-scheduler/codebase/ext/dhtmlxscheduler_readonly.js';
import 'dhtmlx-scheduler/codebase/ext/dhtmlxscheduler_pdf.js';
import 'dhtmlx-scheduler/codebase/ext/dhtmlxscheduler_agenda_view.js';
import 'dhtmlx-scheduler/codebase/ext/dhtmlxscheduler_editors.js';
import '../assets/api.js';

export default {
  name: 'Calendar',
  data () {
    return {
      events: []
    }
  },
    mounted() {
      console.log(this.$store.getters.getUser._id)
    const response = VisitService.getVisits()
    .then(response => {
      this.events = response.data
      this.events = this.events.filter(e => e.delegate._id === this.$store.getters.getDelegate)
        scheduler.locale.labels.agenda_tab="Agenda";
         scheduler.config.buttons_left=["dhx_save_btn","dhx_cancel_btn","report_button"];
         scheduler.locale.labels["report_button"] = "Report";

         
        var status = [
         { key: "Done", label: 'Done' },
         { key: "Not done", label: 'Not done' }
        
        ];
        var type =[
        { key: "Pharmacist", label: 'Pharmacist' },
        { key: "Doctor", label: 'Doctor' },
        { key: "Wholesaler", label: 'Wholesaler' },
        ]
        scheduler.locale.labels.section_priority = 'Status'
        scheduler.locale.labels.section_type = 'Type'
        scheduler.locale.labels.section_Adresse= "Adresse"

       scheduler.config.lightbox.sections = [
      {
        name: "description",
        height: 70,
        map_to: "text",
        type: "textarea",
        focus: true
      },
        {name:"Adresse", height:43, map_to:"Adresse", type:"textarea"},
          { name:"priority", height:58, options:status, 
            map_to:"status", type:"radio", vertical:true},
           { name:"type", height:65, options:type, 
            map_to:"visitType", type:"radio", vertical:true},
      {
        name:"time", height:72, type:"time", map_to:"auto"
      }
      ];

//tick and time
    scheduler.attachEvent("onTemplatesReady", function(){
    scheduler.templates.event_header = function(start,end,ev)
    {
        if (ev.status == "Done"){
            return (" <i class='glyphicon glyphicon-ok' style='color:blue'> </i> "+
                scheduler.templates.event_date(start)+" - "+scheduler.templates.event_date(end))
        } else {
           return (" <i class='fa fa-hourglass-2' style='color:blue'></i> "+
                scheduler.templates.event_date(start)+" - "+scheduler.templates.event_date(end))
        }
    };
});

        
        scheduler.init(this.$refs.scheduler_here,new Date(),"week");
        
        scheduler.templates.xml_date = function(value){ return new Date(value); };

       
     //color section  
        for (var i=0;i<this.events.length;i++)
        {
        this.events[i].id=i;
        
        this.events[i].color="orange";
        if (this.events[i].visitType=="Doctor")
        {
          this.events[i].color="red";
        }
        if (this.events[i].visitType=="Pharmacist")
        {
          this.events[i].color="green";
          this.events[i].textColor="white";
          
        }
        }
        scheduler.parse(this.events, 'json');
     
        scheduler.attachEvent("onEventAdded", function(id,ev){
         
          if (ev.visitType=="Pharmacist")
          {
            ev.color="green";
           ev.textColor="white";
          }
          if (ev.visitType=="Doctor")
          {
            ev.color="red";
          
          }
          else
          ev.color="orange"
          const response = VisitService.insert(ev)
        
        });

        scheduler.attachEvent("onEventChanged", function(id,ev){
         const response =  VisitService.putVisits(ev);
         scheduler.updateEvent(id);
        });

        scheduler.attachEvent("onConfirmedBeforeEventDelete", function(id,e){
        const response = VisitService.deleteVisits(e)
        scheduler.deleteEvent(id);
         return true;
      });

        scheduler.attachEvent("onLightboxButton", function(button_id, node, e){
           console.log(button_id)
         if(button_id == "report_button"){
        alert("report")
    }
      });
    
//Notif section
          for (var i=0;i<this.events.length;i++){
        if (this.events[i].start_date.toISOString().slice(0, 10)== new Date().toISOString().slice(0, 10)){
         
          if (this.events[i].start_date.getHours()-new Date().getHours()<=2 && this.events[i].start_date.getHours()-new Date().getHours()>0){
              this.$notify({
            group: 'left',
            title: 'Pharmakeys Rappel',
            text:  this.events[i].text +" commence dans deux heures à peu près",
            duration: 8000,
            type: 'warning'
            });
          }

          //pharma Notif
          if (this.events[i].visitType=="Pharmacist"){
             this.$notify({
            group: 'foo',
            title: 'Pharmakeys Notification',
            text:  this.events[i].text +" :"+ 
           " " + this.events[i].start_date,
            duration: 8000,
            type: 'success'
            });
          }

          //Doctor Notif
            if (this.events[i].visitType=="Doctor")
          {
           this.$notify({
          group: 'foo',
          title: 'Pharmakeys Notification',
          text:  this.events[i].text +" : "+ 
         "" + this.events[i].start_date,
          duration: 8000,
          type: 'error'
          });
          }
        //Wholesaler Notif
          if (this.events[i].visitType=="Wholesaler")
          {
           this.$notify({
          group: 'foo',
          title: 'Pharmakeys Notification',
         text:  this.events[i].text +" :"+ 
         " " + this.events[i].start_date,
          duration: 8000,
         type: 'warn'
          });
          } 
       
          
        }
         
        }
   
    })
    .catch(e => {
      this.errors.push(e)     
    })

      
    },
    created : function()
    {

    },
  methods: {
    PDF : function()
    {
     scheduler.exportToPDF();
    }

  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
 
 

</style>
