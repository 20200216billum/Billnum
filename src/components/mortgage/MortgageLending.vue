<style lang="less">
@import "./MortgageLending.less";
</style>
 
<template>
  <div class="mortgage_lending">
    <div class="ml_box">
      <h2 class="title">{{$t('mortgageLending.header[0]')}}</h2>

      <table class="ml_table" v-for="(item, index) in tableData" :key="index">
          <thead>
            <tr>
              <th>{{$t('mortgageLending.table[0]')}}</th>
              <th>{{$t('mortgageLending.table[1]')}}</th>
              <th>{{$t('mortgageLending.table[2]')}}</th>
              <th>{{$t('mortgageLending.table[3]')}}</th>
              <th>{{$t('mortgageLending.table[4]')}}</th>
            </tr>
          </thead>
         <tbody>
           <tr v-for="(child, childIndex) in item.in" :key="childIndex">
              <td :rowspan="item.in.length" v-if="childIndex == 0" class="rowspan">{{ item.out }}</td>
              <td>{{ child.code }}</td>
              <td>{{ child.borrow_rate }}%</td>
              <td>{{ child.notify_rate }}%</td>
              <td>{{ child.burst_rate }}%</td>
            </tr>
         </tbody>
      </table>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        tableData: []
      }
    },
    methods: {
      showList() {
        this.$http.post(this.$http.mortgageLending, {}).then(res => {
          if (res.data.status == '200') {
            this.tableData = res.data.data;
          } else {
            this.tableData = [];
            this.$public.msg(res.data.msg, 'error', this);
          }
        }).catch(err => {})
      }
    },
    mounted() {
      this.showList();
    }
  }
</script>