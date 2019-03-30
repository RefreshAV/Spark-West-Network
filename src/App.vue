<template>
  <div id="app">
    <app-navbar/>
    <router-view id="content"/>
    <app-footer id="footer"/>
  </div>
</template>

<script>
import Navbar from "./components/Navbar.vue";
import NavbarSmall from "./components/NavbarSmall.vue";
import Footer from "./components/Footer.vue";
import Home from "./components/Main/Home.vue";

export default {
  components: {
    "app-navbar": Navbar,
    "app-navbar-small": NavbarSmall,
    "app-footer": Footer,
    "app-home": Home
  },
  metaInfo: {
    // if no subcomponents specify a metaInfo.title, this title will be used
    title: "Spark West Network",
    // all titles will be injected into this template
    titleTemplate: "%s | Spark West",

    metaInfo: {
      meta: [
        { charset: "utf-8" },
        {
          vmid: "description",
          name: "description",
          content:
            "Spark West Network is an umbrella marketing platform that draws together, assists, and coordinates the various organizations, events, and people that define our region’s unique entrepreneurial opportunities."
        }
      ]
    }
  }
};
</script>

<style scoped>
#app {
  min-height: 100%;
  position: relative;
}

#content {
  padding-bottom: 175px;
}

#footer {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 175px;
}
</style>
