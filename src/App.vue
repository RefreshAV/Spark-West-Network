<template>
  <div>
    <app-navbar/>
    <router-view/>
    <app-footer/>
  </div>
</template>

<script>
import Navbar from "./components/Navbar.vue";
import Footer from "./components/Footer.vue";
import Home from "./components/Main/Home.vue";

export default {
  components: {
    "app-navbar": Navbar,
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
        { vmid: "description", name: "description", content: "Spark West Network is an umbrella marketing platform that draws together, assists, and coordinates the various organizations, events, and people that define our region’s unique entrepreneurial opportunities." }
      ]
    }
  }
};
</script>

<style>
body {
  padding-top: 56px;
}
</style>
