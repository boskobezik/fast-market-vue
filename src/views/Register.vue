<template>
  <div class="align-vertically">
    <b-container>
      <div class="center">
        <img src="../assets/logo.png" alt="ToDo logo" class="logo" />
      </div>
      <b-row class="row-centered">
        <b-col sm="12" lg="4" xl="4" md="6">
          <b-form @submit="formSubmit">
            <b-alert variant="danger" show v-if="registerFailed"
              >Podaci za prijavu nisu ispravni</b-alert
            >
            <b-form-group label="Ime i prezime" label-for="fullname">
              <b-form-input
                id="fullname"
                v-model="form.fullname"
                required
                title="Fullname must be at least 3 characters long"
                pattern=".{3,}"
                placeholder="Nomen Nescio"
              ></b-form-input>
            </b-form-group>
            <b-form-group label="Paypal email" label-for="ppemail">
              <b-form-input
                id="ppemail"
                v-model="form.email"
                required
                type="email"
                title="Email format is not valid"
                placeholder="nomen.nescion@email.com"
              ></b-form-input>
            </b-form-group>
            <b-form-group label="Korisničko ime" label-for="username">
              <b-form-input
                id="username"
                v-model="form.username"
                required
                title="Username must be at least 3 characters long"
                pattern=".{3,}"
                placeholder="korisnik"
              ></b-form-input>
            </b-form-group>
            <b-form-group label="Lozinka" label-for="password">
              <b-form-input
                id="password"
                v-model="form.password"
                required
                title="Password must be at least 6 characters long"
                pattern=".{6,}"
                type="password"
              ></b-form-input>
            </b-form-group>
            <b-form-group>
              <b-form-checkbox
                id="isSeller"
                v-model="form.isSeller"
                name="isSeller"
              >
                Prodavač
              </b-form-checkbox>
            </b-form-group>
            <b-form-group>
              <b-button type="submit" variant="primary">Registruj se</b-button>
            </b-form-group>
            <b-form-group>
              <b-button variant="info" :to="'/login'">Prijavi se</b-button>
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
  name: "Register",
  components: {},
  data() {
    return {
      registerFailed: null,
      form: {
        fullname: "",
        email: "",
        username: "",
        password: "",
        isSeller: false
      }
    };
  },
  methods: {
    formSubmit: function(e) {
      e.preventDefault();
      let user = {
        User_id: "",
        Full_name: this.form.fullname,
        Paypal_email: this.form.email,
        Username: this.form.username,
        Password: this.form.password,
        IsSeller: this.form.isSeller
      };

      axios
        .post(Global.apiurl + "users/register", user)
        .then(res => {
          if (res.status === 200) {
            this.$router.replace("/login");
          } else {
            this.registerFailed = true;
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>

<style scoped></style>
