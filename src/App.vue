<template>
  <div id="app" class="page-container">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <link rel="stylesheet" href="//fonts.googleapis.com/icon?family=Material+Icons">
        <router-view />
  </div>
</template>

<style>
.md-app {
    max-height: 400px;
    border: 1px solid rgba(#000, .12);
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
