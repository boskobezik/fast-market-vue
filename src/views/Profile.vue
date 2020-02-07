<template>
  <div class="align-vertically">
    <b-container>
      <b-row class="row-centered">
        <b-col sm="12" lg="8" xl="6" md="10">
          <b-form @submit="formSubmit">
            <b-alert variant="danger" show v-if="editFailed">{{
              editFailedMessage
            }}</b-alert>
            <b-alert variant="success" show v-if="editFailed === false"
              >Podaci su uspješno izmijenjeni</b-alert
            >
            <b-form-group label="Ime i prezime" label-for="fullname">
              <b-form-input
                id="fullname"
                v-model="user.Full_name"
                required
                title="Fullname must be at least 3 characters long"
                pattern=".{3,}"
                placeholder="Nomen Nescio"
              ></b-form-input>
            </b-form-group>
            <b-form-group label="Paypal email" label-for="ppemail">
              <b-form-input
                id="ppemail"
                v-model="user.Paypal_email"
                required
                type="email"
                title="Email format is not valid"
                placeholder="nomen.nescion@email.com"
              ></b-form-input>
            </b-form-group>
            <b-form-group label="Korisničko ime" label-for="username">
              <b-form-input
                id="username"
                v-model="user.Username"
                required
                title="Username must be at least 3 characters long"
                pattern=".{2,}"
                placeholder="korisnik"
              ></b-form-input>
            </b-form-group>
            <b-form-group label="Lozinka" label-for="password">
              <b-form-input
                id="password"
                v-model="user.Password"
                required
                title="Password must be at least 6 characters long"
                pattern=".{6,}"
                type="password"
              ></b-form-input>
            </b-form-group>
            <b-form-group>
              <b-form-checkbox
                id="isSeller"
                v-model="user.IsSeller"
                name="isSeller"
              >
                Prodavač
              </b-form-checkbox>
            </b-form-group>
            <b-form-group>
              <b-button type="submit" variant="primary">Potvrdi</b-button>
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
  name: "Profile",
  computed: {
    user: function() {
      return this.$store.state.user;
    }
  },
  data() {
    return {
      editFailed: null,
      editFailedMessage: null
    };
  },
  methods: {
    formSubmit: function(e) {
      e.preventDefault();
      axios
        .put(Global.apiurl + "api/users/edit/" + this.user.User_id, this.user)
        .then(res => {
          if (res.status === 200) {
            this.user.Password = "";
            this.$store.dispatch("addUser", this.user);
            this.editFailed = false;
          } else {
            this.editFailed = true;
            this.editFailedMessage =
              "Došlo je do greške. Molimo pokušajte kasnije.";
          }
        })
        .catch(() => {
          this.editFailed = true;
          this.editFailedMessage =
            "Došlo je do greške. Molimo pokušajte kasnije.";
        });
    }
  }
};
</script>

<style scoped></style>
