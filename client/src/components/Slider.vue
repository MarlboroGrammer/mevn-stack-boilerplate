<!-- eslint-disable -->
<template>
<div class="row">
  <div class="text-right">
  <button class="btn btn-primary" @click="goBack">Back</button>
  </div>
  <div class="text-center"><h1>{{presentation.name}}</h1></div>
  <div class="col-md-3"></div>
  <div class="col-md-6">
  <swiper :options="swiperOption" ref="mySwiper" @someSwiperEvent="callback">
    <!-- slides -->
    <swiper-slide v-if="presentation.name === 'Maxilase'"><div class="text-center"><img src="..\..\..\server\src\uploads\Drill.jpg"><br><h4>{{presentation.text1}}</h4></div></swiper-slide>
    <swiper-slide v-if="presentation.name === 'Maxilase'"><div class="text-center"><img src="..\..\..\server\src\uploads\Maxilase.jpg"  ><br><h4>{{presentation.slide2}}{{presentation.text2}}</h4></div></swiper-slide>
     <swiper-slide v-if="presentation.name === 'Maxilase'"><div class="text-center"><img src="..\..\..\server\src\uploads\Drill.jpg"><br><h4>{{presentation.text3}}</h4></div></swiper-slide>
    <swiper-slide v-if="presentation.name === 'Maxilase'"><div class="text-center"><img src="..\..\..\server\src\uploads\Maxilase.jpg" ><br><h4>{{presentation.text4}}</h4></div></swiper-slide>

<swiper-slide v-if="presentation.name === 'test'"><div class="text-center"><img src="..\..\..\server\src\uploads\Fortimel.jpg"><br><h4>{{presentation.text1}}</h4></div></swiper-slide>
    <swiper-slide v-if="presentation.name === 'test'"><div class="text-center"><img src="..\..\..\server\src\uploads\Donormyl.jpg"  ><br><h4>{{presentation.slide2}}{{presentation.text2}}</h4></div></swiper-slide>
     <swiper-slide v-if="presentation.name === 'test'"><div class="text-center"><img src="..\..\..\server\src\uploads\Drill.jpg"><br><h4>{{presentation.text3}}</h4></div></swiper-slide>
    <swiper-slide v-if="presentation.name === 'test'"><div class="text-center"><img src="..\..\..\server\src\uploads\Maxilase.jpg" ><br><h4>{{presentation.text4}}</h4></div></swiper-slide>

<swiper-slide v-if="presentation.name === 'Test'"><div class="text-center"><img src="..\..\..\server\src\uploads\Fortimel.jpg"><br><h4>{{presentation.text1}}</h4></div></swiper-slide>
    <swiper-slide v-if="presentation.name === 'Test'"><div class="text-center"><img src="..\..\..\server\src\uploads\renutryl.jpg"  ><br><h4>{{presentation.slide2}}{{presentation.text2}}</h4></div></swiper-slide>
     <swiper-slide v-if="presentation.name === 'Test'"><div class="text-center"><img src="..\..\..\server\src\uploads\Drill.jpg"><br><h4>{{presentation.text3}}</h4></div></swiper-slide>
    <swiper-slide v-if="presentation.name === 'Test'"><div class="text-center"><img src="..\..\..\server\src\uploads\Maxilase.jpg" ><br><h4>{{presentation.text4}}</h4></div></swiper-slide>

    <swiper-slide v-if="presentation.name === 'Pommade'"><div class="text-center"><img src="..\..\..\server\src\uploads\Maxilase.jpg"><br><h4>{{presentation.text1}}</h4></div></swiper-slide>
    <swiper-slide v-if="presentation.name === 'Pommade'"><div class="text-center"><img src="..\..\..\server\src\uploads\Drill.jpg"  ><br><h4>{{presentation.slide2}}{{presentation.text2}}</h4></div></swiper-slide>
     <swiper-slide v-if="presentation.name === 'Pommade'"><div class="text-center"><img src="..\..\..\server\src\uploads\Fortimel.jpg"><br><h4>{{presentation.text3}}</h4></div></swiper-slide>
    <swiper-slide v-if="presentation.name === 'Pommade'"><div class="text-center"><img src="..\..\..\server\src\uploads\Pondimax.jpg" ><br><h4>{{presentation.text4}}</h4></div></swiper-slide>

<swiper-slide v-if="presentation.name === 'Presentation de Normix'"><div class="text-center"><img src="..\..\..\server\src\uploads\Maxilase.jpg"><br><h4>{{presentation.text1}}</h4></div></swiper-slide>
    <swiper-slide v-if="presentation.name === 'Presentation de Normix'"><div class="text-center"><img src="..\..\..\server\src\uploads\Drill.jpg"  ><br><h4>{{presentation.slide2}}{{presentation.text2}}</h4></div></swiper-slide>
     <swiper-slide v-if="presentation.name === 'Presentation de Normix'"><div class="text-center"><img src="..\..\..\server\src\uploads\Fortimel.jpg"><br><h4>{{presentation.text3}}</h4></div></swiper-slide>
    <swiper-slide v-if="presentation.name === 'Presentation de Normix'"><div class="text-center"><img src="..\..\..\server\src\uploads\Pondimax.jpg" ><br><h4>{{presentation.text4}}</h4></div></swiper-slide>

    <!-- Optional controls -->      
    <div class="swiper-pagination"  slot="pagination"></div>
    <div class="swiper-button-prev" slot="button-prev"></div>
    <div class="swiper-button-next" slot="button-next"></div>
    <div class="swiper-scrollbar"   slot="scrollbar"></div>
  </swiper>
  </div>
  <div class="col-md-3">
    
  </div>
</div>
</template>

<script>
/* eslint-disable */
import PresentationService from '@/services/PresentationService'
  export default {
    name: 'carrousel',
    data() {
      return {
        swiperOption: {
          // some swiper options/callbacks
          
          // ...
        },
        presentations: [],
        presentation: {}
      }
    },
    methods: {
    async getPresentation () {
      try {
        const response = await PresentationService.getPresentation(this.$parent.presentationToApproveID)
        console.log('fined')
        return response.data
      } catch (err) {
        console.log('undefined')
        return undefined
      }
    },
    goBack () {
      this.$parent.back()
    }
  },
    computed: {
      swiper() {
        return this.$refs.mySwiper.swiper
      }
    },
    mounted() {
      
      // current swiper instance
      // 然后你就可以使用当前上下文内的swiper对象去做你想做的事了
      console.log('this is current swiper instance object', this.swiper)
      console.log(this.presentation)
      this.swiper.slideTo(3, 1000, false)
      this.getPresentation().then(data => {
      this.presentation = data
      console.log(this.presentation)
    })
    
      
    }
  }
</script>