<template>
  <div id="app" class="page-container">
    <link rel="stylesheet" href="//fonts.googleapis.com/icon?family=Material+Icons" />
    <router-view v-if="!isLogged" />
    <md-app v-if="isLogged">
      <md-app-toolbar class="md-primary">
        <span class="md-title">My Title</span>
      </md-app-toolbar>

      <md-app-drawer md-permanent="full">
        <md-toolbar class="md-transparent" md-elevation="0">
          <h1>
            <strong>Brza trgovina</strong>
          </h1>
        </md-toolbar>

        <md-list>
          <md-list-item to="/addProduct">
            <md-icon>move_to_inbox</md-icon>
            <span class="md-list-item-text">Inbox</span>
          </md-list-item>

          <md-list-item>
            <md-icon>send</md-icon>
            <span class="md-list-item-text">Sent Mail</span>
          </md-list-item>

          <md-list-item>
            <md-icon>delete</md-icon>
            <span class="md-list-item-text">Trash</span>
          </md-list-item>

          <md-list-item>
            <md-icon>error</md-icon>
            <span class="md-list-item-text">Spam</span>
          </md-list-item>
        </md-list>
      </md-app-drawer>

      <md-app-content>
        <router-view />
      </md-app-content>
    </md-app>
  </div>
</template>

<script>
export default {
  name: "App",
  computed: {
    isLogged() {
      return this.$store.getters.isLogged;
    }
  },
  mounted: function() {
    if (!this.isLogged) this.$router.replace("/addProduct");
  }
};
</script>

<style>
.md-app {
  max-height: 400px;
  border: 1px solid rgba(#000, 0.12);
}

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
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
