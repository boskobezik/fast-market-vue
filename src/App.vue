<template>
  <div id="app">
    <div v-if="!isLogged">
      <b-navbar toggleable="lg" type="dark" variant="info">
        <b-navbar-brand href="#">FastStore</b-navbar-brand>
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>
            <b-nav-item to="addproduct">Add Product</b-nav-item>
            <b-nav-item to="addorder">Add Order</b-nav-item>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
      <router-view class="router-app" />
    </div>
    <router-view v-if="isLogged" />
  </div>
</template>

<script>
export default {
  name: "App",
  data: () => ({
    menuVisible: false,
    isLogged: false
  }),
  mounted: function() {
    let authToken = this.$cookies.get("authtoken");
    console.log(authToken);
    if (authToken !== null) {
      this.isLogged = true;
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
.router-app {
  padding: 25px 25%;
}

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  color: #2c3e50;
}
</style>
