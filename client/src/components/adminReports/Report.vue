<!-- eslint-disable -->
<template>
  <div>
  <div class="row">
  	<br>
  	<button class="btn btn-primary" @click="goBack">Back</button>
    <div class="col-xs-12">
      <div class="invoice-title">
        <h2>Report</h2>
        <h3 class="pull-right">
          <span class="badge progress-bar-warning" style="font-size: 20px;" v-if="report.status === 'Pending'">{{report.status}}</span>
          <span class="badge progress-bar-success" style="font-size: 20px;" v-if="report.status === 'Accepted'">{{report.status}}</span>
          <span class="badge progress-bar-danger" style="font-size: 20px;" v-if="report.status === 'Rejected'">{{report.status}}</span>
        </h3>
      </div>
      <hr>
      <div class="row">
        <div class="col-xs-6">
          <address>
            <strong>Delegate:</strong><br>
              {{report.delegate.surname}} {{report.delegate.name}}<br>
              <strong>CIN:</strong> {{report.delegate.CIN}}<br>
              <strong>Report type:</strong> {{report.type}}
          </address>
        </div>
      </div>
      <div class="row">
        <div class="col-xs-6">
          <address v-if="report.type === 'Pharmacy'">
            <strong>Pharmacy Name:</strong> {{report.pharmacy}}<br>
            <strong>Visit objectif:</strong> {{report.objectif}}<br>
            <strong>Potential:</strong> {{report.potential}}<br>
          </address>
          <address v-if="report.type === 'Doctor'">
            <strong>Doctor Name:</strong> {{report.doctor}}<br>
            <strong>Visit objectif:</strong> {{report.objectif}}<br>
            <strong>Potential:</strong> {{report.potential}}<br>
          </address>
          <address v-if="report.type === 'Wholesaler'">
            <strong>Wholesaler Name:</strong> {{report.wholesaler}}<br>
            <strong>Visit objectif:</strong> {{report.objectif}}<br>
            <strong>Potential:</strong> {{report.potential}}<br>
          </address>
          <address v-if="report.type === 'Hospital'">
            <strong>Hospital Name:</strong> {{report.hospital.name}}<br>
            <strong>Hospital Service:</strong> {{report.hospital.name}}<br>
            <strong>Doctor Name:</strong> {{report.hospital.doctorName}}<br>
            <strong>Speciality:</strong> {{report.hospital.doctorTitle}}<br><br>
            <strong>Visit objectif:</strong> {{report.objectif}}<br>
            <strong>Potential:</strong> {{report.potential}}<br>
          </address>
          <address v-if="report.type === 'Clinic'">
            <strong>Hospital Name:</strong> {{report.clinic.name}}<br>
            <strong>Hospital Service:</strong> {{report.clinic.name}}<br>
            <strong>Doctor Name:</strong> {{report.clinic.doctorName}}<br>
            <strong>Speciality:</strong> {{report.clinic.doctorTitle}}<br><br>
            <strong>Visit objectif:</strong> {{report.objectif}}<br>
            <strong>Potential:</strong> {{report.potential}}<br>
          </address>
        </div>
        <div class="col-xs-6 text-right">
          <address>
            <strong>Send Date:</strong><br>
            {{report.date | formatDate}}<br><br>
          </address>
        </div>
      </div>
      <div class="row" v-if="report.notes && report.notes !== ''">
      	<div class="panel">
          <div class="panel-heading">
            <h3 class="panel-title"><strong>Notes</strong></h3>
          </div>
          <div class="panel-body">
            <h2>{{report.notes}}</h2>
          </div>
        </div>
      </div>
    </div>
  </div>
    <div class="row" v-if="report.potentialProducts && report.potentialProducts.length > 0">
      <div class="col-md-12">
        <div class="panel panel-primary">
          <div class="panel-heading">
            <h3 class="panel-title"><strong>Potential Products</strong></h3>
          </div>
          <div class="panel-body">
            <div class="table-responsive">
              <table class="table table-condensed">
                <thead>
                  <tr>
                    <td><strong>Item</strong></td>
                    <td class="text-center"><strong>Quantity</strong></td>
                  </tr>
                </thead>
                 <tbody>
                   <tr v-for="potentialProduct in report.potentialProducts">
                     <td>{{ potentialProduct.productName }}</td>
                     <td class="text-center">{{ potentialProduct.note}}</td>
                   </tr>
                 </tbody>
                </table>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row" v-if="report.order && report.order.length > 0">
      <div class="col-md-12">
        <div class="panel panel-primary">
          <div class="panel-heading">
            <h3 class="panel-title"><strong>Order summary</strong></h3>
          </div>
          <div class="panel-body">
            <div class="table-responsive">
              <table class="table table-condensed" v-if="report.order.type === 'Regular'">
                <thead>
                  <tr>
                    <td><strong>Item</strong></td>
                    <td class="text-center"><strong>Quantity</strong></td>
                  </tr>
                </thead>
                 <tbody>
                   <tr v-for="product in report.order.products">
                     <td>{{ product.productName }}</td>
                     <td class="text-center">{{ product.quantity}}</td>
                   </tr>
                 </tbody>
                </table>
                <span class="badge progress-bar-primary" 
                       v-if="report.order.type !== 'Regular'"
                       style="font-size: 34px;">{{report.order.type}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row" v-if="report.samples && report.samples.length > 0">
      <div class="col-md-12">
        <div class="panel panel-primary">
          <div class="panel-heading">
            <h3 class="panel-title"><strong>Samples</strong></h3>
          </div>
          <div class="panel-body">
            <div class="table-responsive">
              <table class="table table-condensed">
                <thead>
                  <tr>
                    <td><strong>Item</strong></td>
                    <td class="text-center"><strong>Quantity</strong></td>
                  </tr>
                </thead>
                 <tbody>
                   <tr v-for="potentialProduct in report.samples">
                     <td>{{ potentialProduct.sampleName }}</td>
                     <td class="text-center">{{ potentialProduct.quantity}}</td>
                   </tr>
                 </tbody>
                </table>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row" v-if="report.status === 'Pending'">
      <div class="text-center">
        <h3>Is this report okay?</h3>
        <hr>
        <div class="container">
          <div class="row">
          	<div class="col-md-3"></div>
            <div class="col-md-3"><button class="btn btn-success btn-block btn-lg" @click="accept">Yes</button></div>
            <div class="col-md-3"><button class="btn btn-danger btn-block btn-lg" @click="reject">No</button></div>
          </div>
        </div>
        <br>
      </div>
    </div>

  </div>
</template>
<script>

</script>
<script>
/* eslint-disable no-return-assign */
import ReportsService from '@/services/ReportsService'

export default {
  name: 'Report',
  components: {
  },
  data () {
    return {
      reports: [],
      report: {}
    }
  },
  methods: {
    async getReport () {
      try {
        const response = await ReportsService.getReportById(this.$parent.reportToApproveID)
        return response.data
      } catch (err) {
        return undefined
      }
    },
    goBack () {
      this.$parent.back()
    },
    async accept () {
      try {
        const response = await ReportsService.finalize(this.report._id, 'approve')
        this.goBack()
      } catch (err) {
        this.$modal.show('dialog', {
          title: 'Error',
          text: 'Could not accept repoty, please try again later',
          buttons: [
            {
              title: 'Close'
            }
         ]
        })
      }
    },
    async reject () {
      console.log('About to reject report')
      try {
        const response = await ReportsService.finalize(this.report._id, 'reject')
        this.goBack()
      } catch (err) {
        this.$modal.show('dialog', {
          title: 'Error',
          text: 'Could not reject repoty, please try again later',
          buttons: [
            {
              title: 'Close'
            }
         ]
        })
      }
    }
  },
  mounted: function () {
    this.getReport().then(data => {
      this.report = data
      console.log(this.report)
    })
  }
}
</script>
