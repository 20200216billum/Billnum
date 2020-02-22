<template lang="html">
  <section class="MainArea_box">
    <ul class="MainArea_main" v-if="MARK.length">
      <li :data_code="item.code" v-for="(item,index) in MARK" :key="index" class="MainArea_list"
        @click="handleClick(item.code)">

        <div class="MainArea_one">
          <!-- <img class="coinLogo" :src="item.icon"></img> -->
          <!-- <span class="name">{{$public.changeInterceptingAdd(item.name)}}</span> -->
          <span class="name">{{ item.pname }}</span>
        </div>
        <div class="MainArea_two">
          <span class="nums">{{Number(item.close).toFixed($public.SavePoint(item.code))}}</span>
        </div>
        <div class="MainArea_three">
          <span
            :class="{up: item.range > 0, down: item.range < 0, oh: item.range == 0}">
            {{item.range && item.range > 0? '+' + item.range : item.range}}%
          </span>
        </div>





        <!-- <div class="mid">
					<span class="name">{{$public.changeInterceptingAdd(item.name)+"/USDT"}}</span> 

					<span class="toCny">
            ≈{{typeof(item.cnyPrice) == 'number' ? $public.toLowFixed(item.cnyPrice,2,0)
            : (item.cnyPrice.indexOf(',') == -1 ? $public.toLowFixed(item.cnyPrice,2,0)
            : item.cnyPrice.split(',')[0] + $public.toLowFixed(item.cnyPrice.split(',')[1],2,0))
            }} CNY
          </span>
				</div>
				<div class="right">
					<span class="nums">{{ $public.toLowFixed(item.price,$public.SavePoint(item.code),0) }}</span>
					<span :class="{up: renderColor(item.changeRate) == 'up', down: renderColor(item.changeRate)== 'down', oh:renderColor(item.changeRate)== 'zero'}">
					{{item.changeRate&&item.changeRate.replace("%","") >0? '+'+ ""+ item.changeRate : item.changeRate}}
					</span>
				</div> -->

      </li>
    </ul>
    <ul class="MainArea_main" v-else>
      <li style="text-align: center; padding-top: 65px;">
        <img src="../../assets/image/timg.gif" width="80" />
        <p style="text-align: center; color: #999; font-size: 12px;">{{ $LangFn("加载中") }}</p>
      </li>
    </ul>
  </section>
</template>
<script>
  import { fail } from "assert";
  export default {
    props: ["Marketmain", "SS"],
    data() {
      return {};
    },
    methods: {
      renderColor(v) {
        if (v && Number(v.replace("%", "")) != 0) {
          return v.replace("%", "") >= 0 ? "up" : "down";
        } else {
          return "zero";
        }
      },
      onSubmit: function () { },
      handleClick: function (enevt) {
        var _this = this;
        _this.$emit("modifyfun", enevt);
      }
    },
    mounted(){
      // console.log("bbb", this.Marketmain)
      console.log("SS", this.ss)
    },
    computed: {
      MARK() {
        console.log("bbb", this.Marketmain)
        // if (this.SS == 2) {
        //   var max;
        //   let arr = this.Marketmain;
        //   // let arr = [4,2,1,5,67,22,-55]
        //   var max
        //   for (var i = 0; i < arr.length; i++) {
        //     for (var j = i; j < arr.length; j++) {
        //       if (parseFloat(arr[i].range) < parseFloat(arr[j].range)) {
        //         max = arr[j]
        //         arr[j] = arr[i]
        //         arr[i] = max
        //       }
        //     }
        //   }
        //   return arr;
        // }
        return this.Marketmain
      }
    },
  };
</script>