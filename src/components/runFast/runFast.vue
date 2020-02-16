<!--  -->
<template>
  <div class="runFast">
        <div class="slideBar">
            <div class="item"></div>
            <div class="item"></div>
            <div class="item"></div>
            <div class="item"></div>
        </div>

        <router-view></router-view>
  </div>
</template>

<script>
export default {
  data () {
    return {

    };
  },

  components: {},

  computed: {},


  methods: {}
}

</script>
<style lang="less">

    .runFast{
        padding: 60px 0; 
    }


</style>