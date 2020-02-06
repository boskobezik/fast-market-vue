<template>
  <div id="app">
    <div v-if="isLogged">
      <NavBar />
      <router-view class="router-app" />
    </div>
    <router-view v-if="!isLogged" />
  </div>
</template>

<script>
import httpService from "./services/httpService";
import * as Global from "./Global";
import NavBar from "./components/NavBar";

export default {
  name: "App",
  data: () => ({
    menuVisible: false,
    isLogged: false
  }),
  components: {
    NavBar
  },
  mounted: function() {
    let authToken = this.$cookies.get("authtoken");
    if (authToken !== null) {
      httpService.setJwt(authToken);

      httpService
        .get(
          Global.apiurl +
            "api/users/getUserByUsername/" +
            this.$cookies.get("username")
        )
        .then(res => {
          this.$store.dispatch("addUser", res.data);
          this.isLogged = true;
        })
        .catch(() => {
          if (this.$router.currentRoute.path !== "/login")
            this.$router.replace("/login");
        });
    } else {
      this.isLogged == false;
      if (this.$router.currentRoute.path !== "/login")
        this.$router.replace("/login");
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  color: #2c3e50;
}

.row-centered {
  display: flex;
  justify-content: center;
  text-align: center;
}

.logo {
  margin-bottom: 4em;
  text-align: center;
}

.align-vertically {
  min-height: 100%; /* Fallback for browsers do NOT support vh unit */
  min-height: 100vh; /* These two lines are counted as one :-)       */

  display: flex;
  align-items: center;
}
</style>
