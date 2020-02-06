<template>
  <div id="app">
    <div v-if="isLogged">
      <b-navbar toggleable="lg" type="dark" variant="info">
        <b-navbar-brand href="/">FastStore</b-navbar-brand>
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>
            <b-nav-item to="addproduct">Add Product</b-nav-item>
            <b-nav-item to="addorder">Add Order</b-nav-item>
          </b-navbar-nav>
          <b-navbar-nav class="ml-auto">
            <b-nav-item-dropdown right>
              <template v-slot:button-content>
                <strong>{{ loggedUser.Full_name }}</strong>
              </template>
              <b-dropdown-item-button href="#">Profile</b-dropdown-item-button>
              <b-dropdown-item-button v-on:click="signOut"
                >Sign Out</b-dropdown-item-button
              ></b-nav-item-dropdown
            >
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
      <router-view class="col-12" />
    </div>
    <router-view v-if="!isLogged" />
  </div>
</template>

<script>
import httpService from "./services/httpService";
import cookieService from "./services/cookieService";
import * as Global from "./Global";

export default {
  name: "App",
  data: () => ({
    menuVisible: false,
    isLogged: false
  }),
  computed: {
    loggedUser: function() {
      return this.$store.getters.loggedUser;
    }
  },
  mounted: function() {
    let authToken = this.$cookies.get("authtoken");
    if (authToken !== null) {
      httpService.setJwt(cookieService.getCookie("authtoken"));

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
  },
  methods: {
    signOut: function() {
      this.$cookies.remove("authtoken");
      window.location.reload();
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  color: #2c3e50;
}
</style>
