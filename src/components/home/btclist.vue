<style lang=less>
    @import './btclist.less';
  </style>

<template lang="html">
    <section class="btclist">
        <ul>
          <li v-for="(item,index) in list" :key="index">
            <div>
              <span class="name">BTC</span>
              <span class="col col_one">+0.003</span>
            </div>
            <div class="money">￥ 27065.12</div>
          </li>
        </ul>
    </section>
  </template>
  <script>
    export default {
      props:['list'],
      data() {
        return {
          
        }
      },
  
      methods: {

      },
  
    }
  </script>

  