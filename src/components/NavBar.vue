<template>
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
          <b-dropdown-item-button v-on:click="profile"
            >Profile</b-dropdown-item-button
          >
          <b-dropdown-item-button v-on:click="signOut"
            >Sign Out</b-dropdown-item-button
          ></b-nav-item-dropdown
        >
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
export default {
  name: "NavBar",
  computed: {
    loggedUser: function() {
      return this.$store.getters.loggedUser;
    }
  },
  methods: {
    signOut: function() {
      this.$cookies.remove("authtoken");
      this.$cookies.remove("username");
      window.location.reload();
    },
    profile: function() {
      this.$router.replace("/profile");
    }
  }
};
</script>
