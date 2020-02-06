<template>
  <div class="login">
    <div class="center">
      <img src="../assets/logo.png" alt="ToDo logo" class="logo" />
    </div>
    <b-container>
      <b-row class="row-centered">
        <b-col sm="12" lg="4" xl="4" md="6">
          <b-form @submit="formSubmit">
            <b-alert variant="danger" show v-if="loginFailedMessage">{{
              loginFailedMessage
            }}</b-alert>
            <b-form-group label="Korisničko ime" label-for="username">
              <b-form-input
                id="username"
                v-model="form.username"
                required
                placeholder="korisnik"
              ></b-form-input>
            </b-form-group>
            <b-form-group label="Lozinka" label-for="password">
              <b-form-input
                id="password"
                v-model="form.password"
                required
                type="password"
              ></b-form-input>
            </b-form-group>
            <b-form-group>
              <b-button type="submit" variant="primary">Prijavi se</b-button>
            </b-form-group>
            <b-form-group>
              <b-button variant="info" :to="'/register'">Registruj se</b-button>
            </b-form-group>
          </b-form>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import axios from "axios";
import * as Global from "../Global";

export default {
  name: "Login",
  components: {},
  data() {
    return {
      loginFailedMessage: null,
      form: {
        username: "",
        password: "",
        rememberMe: false
      },
      testData: []
    };
  },
  methods: {
    formSubmit: function(e) {
      e.preventDefault();

      this.loginFailedMessage = null;

      if (!this.validateForm()) return;
      let user = {
        User_id: "",
        Full_name: "",
        Paypal_email: "",
        Username: this.form.username,
        Password: this.form.password,
        IsSeller: false
      };
      axios
        .post(Global.apiurl + "authenticate", user)
        .then(res => {
          if (res.status === 200) {
            this.$cookies.set("authtoken", res.data.User_id);
            this.$store.dispatch("addUser", res.data);
            window.location = "/";
          }
        })
        .catch(error => {
          if (error.response.status === 401)
            this.loginFailedMessage = "Podaci za prijavu nisu ispravni";
          else
            this.loginFailedMessage =
              "Došlo je do greške. Molimo pokušajte kasnije";
        });
    },
    validateForm: function() {
      if (this.form.username === "") return false;
      if (this.form.password === "") return false;
      return true;
    }
  }
};
</script>

<style scoped>
.row-centered {
  display: flex;
  justify-content: center;
}
.login {
  padding: 0% 5%;
  width: 100%;
  position: absolute;
  top: 40%;
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
}
.logo {
  margin-bottom: 4em;
  text-align: center;
}
.center {
  text-align: center;
}
.right {
  text-align: right;
}
.md-checkbox {
  margin: 0 !important;
}
.signIn {
  width: 100%;
  margin: 0em !important;
  margin-top: 2em !important;
}
.input {
  border: 2px solid #e0e0e0 !important;
  border-radius: 5px;
  margin: 5px;
}
</style>
