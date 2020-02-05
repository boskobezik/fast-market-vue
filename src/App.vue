<template>
  <div id="app">
    <div v-if="isLogged">
      <b-navbar toggleable="lg" type="dark" variant="info">
        <b-navbar-brand href="#">FastStore</b-navbar-brand>
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>
            <b-nav-item href="#">Link</b-nav-item>
            <b-nav-item href="#" disabled>Disabled</b-nav-item>
          </b-navbar-nav>

          <!-- Right aligned nav items -->
          <b-navbar-nav class="ml-auto">
            <b-nav-item-dropdown right>
              <!-- Using 'button-content' slot -->
              <template v-slot:button-content>
                <em>User</em>
              </template>
              <b-dropdown-item-button href="#">Profile</b-dropdown-item-button>
              <b-dropdown-item-button v-on:click="signOut"
                >Sign Out</b-dropdown-item-button
              >
            </b-nav-item-dropdown>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
      <router-view />
    </div>
    <router-view v-if="!isLogged" />
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
.md-app {
  border: 1px solid rgba(#000, 0.12);
}

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
}

.content {
  min-height: 100% !important;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
