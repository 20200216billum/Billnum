<template lang="html">
  <div class="asidebarWarp">
    <ul>
      <li v-for="(item,index) in sideNav" :key="index" @click="changeUrl(item.url)"
        :class="activeUrl==item.url?'on asideli':'asideli'">
        <img v-if="activeUrl==item.url" :src='"../../assets/img/"+(item.img)+"-hover"+".png"' alt="">
        <img v-else :src='"../../assets/img/"+(item.img)+".png"' alt="">
        <p>{{item.name}}</p>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {
      activeUrl: "/guessing",
      sideNav: [
        {
          name: this.$t("runFast.tabBar[0]"),
          img: "jingcai",
          url: "/guessing"
        },
        {
          name: "FAQ",
          img: "faq",
          url: "/faq"
        },
        {
          name: this.$t("runFast.tabBar[1]"),
          img: "paiming",
          url: "/ranking"
        },
        {
          name: this.$t("runFast.tabBar[2]"),
          img: "zhanji",
          url: "/standings"
        },
        {
          name: this.$t("runFast.tabBar[3]"),
          img: "zichan",
          url: "/asset"
        },
      ]
    }
  },
  methods: {
    changeUrl(url) {
      var _this = this;
      _this.activeUrl = url;
      sessionStorage.activeUrl = url;
      switch (url) {
        case "/guessing":
          break;
        case "/faq":
          break;
        case "/ranking":
          break;
        case "/standings":
          break;
        case "/asset":
          break;
      }
      _this.$public.go(url, 0, _this);
    }
  },
  mounted: function () {
    var _this = this;
    if (sessionStorage.activeUrl) {
      _this.activeUrl = sessionStorage.activeUrl;
    }
    if (_this.$route.path == "/guessing") {
      _this.activeUrl = "/guessing";
    }
    if (_this.$route.path == "/asset") {
      _this.activeUrl = "/asset";
    }
  }
};
</script>
<style scoped="scoped">
.asidebarWarp {
  width: 44px;
  height: 100%;
  text-align: center;
  font-size: 12px;
  color: #8CD8FE;
  background: #2b2b2b;
  position: absolute;
  top: 0;
  left: 0;
}
.asideli {
  height: 56px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}
.asideli img {
  margin-bottom: 4px;
}
.asideli.on {
  background: #171717;
}
</style>