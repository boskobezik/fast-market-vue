<template>
  <div>
    <md-content class="md-scrollbar">
      <div class="md-layout md-gutter md-alignment-center login">
        <div
          class="md-layout-item md-xlarge-size-25 md-large-size-30 md-medium-size-33 md-small-size-50 md-xsmall-size-100"
        >
          <div class="md-layout md-gutter">
            <div class="md-layout-item center">
              <img src="../assets/logo.png" alt="ToDo logo" class="logo" />
            </div>
          </div>
          <form @submit="formSubmit">
            <div class="md-layout md-gutter">
              <div
                class="md-layout-item md-medium-size-100 md-small-size-100 md-xsmall-size-100"
              >
                <md-field
                  :class="{
                    'md-invalid':
                      validation.fullname.isEmpty === true ||
                      validation.fullname.isEmail === false
                  }"
                >
                  <label>Ime i prezime</label>
                  <md-input
                    v-model="form.fullname"
                    @blur="fullnameBlur"
                  ></md-input>
                  <span
                    class="md-error"
                    v-if="validation.fullname.isEmpty === true"
                    >Ime i prezime je obavezno</span
                  >
                </md-field>
              </div>
              <div
                class="md-layout-item md-medium-size-100 md-small-size-100 md-xsmall-size-100"
              >
                <md-field
                  :class="{
                    'md-invalid':
                      validation.email.isEmpty === true ||
                      validation.email.isEmail === false
                  }"
                >
                  <label>Paypal email</label>
                  <md-input v-model="form.email" @blur="emailBlur"></md-input>
                  <span
                    class="md-error"
                    v-if="validation.email.isEmpty === true"
                    >Email je obavezan</span
                  >
                  <span
                    class="md-error"
                    v-if="validation.email.isEmail === false"
                    >Email nije validan</span
                  >
                </md-field>
              </div>

              <div
                class="md-layout-item md-medium-size-100 md-small-size-100 md-xsmall-size-100"
              >
                <md-field
                  :class="{
                    'md-invalid':
                      validation.email.isEmpty === true ||
                      validation.email.isEmail === false
                  }"
                >
                  <label>Korisničko ime</label>
                  <md-input
                    v-model="form.username"
                    @blur="usernameBlur"
                  ></md-input>
                  <span
                    class="md-error"
                    v-if="validation.username.isEmpty === true"
                    >Korisničko ime je obavezno</span
                  >
                </md-field>
              </div>
            </div>
            <div class="md-layout md-gutter">
              <div
                class="md-layout-item md-medium-size-100 md-small-size-100 md-xsmall-size-100"
              >
                <md-field
                  :class="{
                    'md-invalid':
                      validation.password.isEmpty === true ||
                      validation.password.isValid === false
                  }"
                >
                  <label>Lozinka</label>
                  <md-input
                    @blur="passwordBlur"
                    v-model="form.password"
                    type="password"
                  ></md-input>
                  <span
                    class="md-error"
                    v-if="validation.password.isEmpty === true"
                    >Lozinka je obavezna</span
                  >
                  <span
                    class="md-error"
                    v-if="validation.password.isValid === false"
                    >Lozinka nije validna</span
                  >
                </md-field>
              </div>
            </div>
            <div class="md-layout md-gutter">
              <div
                class="md-layout-item md-medium-size-50 md-small-size-50 md-xsmall-size-50"
              >
                <md-checkbox class="md-primary" v-model="form.isSeller"
                  >Prodavač</md-checkbox
                >
              </div>
            </div>
            <div class="md-layout md-gutter">
              <div
                class="md-layout-item md-medium-size-100 md-small-size-100 md-xsmall-size-100"
              >
                <md-button
                  type="submit"
                  class="md-raised md-primary signIn"
                  :disabled="
                    !(
                      validation.email.isEmpty === false &&
                      validation.email.isEmail === true &&
                      validation.password.isEmpty === false
                    )
                  "
                  >Registruj se</md-button
                >
                <md-button type="submit" class="md-raised signIn" to="/login"
                  >Prijavi se</md-button
                >
              </div>
            </div>
          </form>
        </div>
      </div>
    </md-content>
  </div>
</template>

<script>
export default {
  name: "Register",
  components: {},
  data() {
    return {
      form: {
        fullname: "",
        email: "",
        username: "",
        password: "",
        isSeller: false
      },
      validation: {
        fullname: {
          isEmpty: null
        },
        username: {
          isEmpty: null
        },
        email: {
          isEmpty: null,
          isEmail: null
        },
        password: {
          isEmpty: null,
          isValid: null
        }
      }
    };
  },
  methods: {
    formSubmit: function(e) {
      e.preventDefault();
      if (!this.validateForm()) return;
      let user;
      if (user == null || user == undefined) {
        user = Storage.newUser(
          this.form.email,
          this.form.password,
          this.remeberMe
        );
        Storage.saveUser(user);
      } else {
        if (user.password !== this.form.password) {
          this.validation.password.isValid = false;
          return;
        }
      }
      this.$router.replace("/");
    },
    emailBlur: function() {
      if (this.form.email === "") {
        this.validation.email.isEmpty = true;
        return;
      } else this.validation.email.isEmpty = false;
      if (!this.validateEmail(this.form.email)) {
        this.validation.email.isEmail = false;
        return;
      } else this.validation.email.isEmail = true;
    },
    passwordBlur: function() {
      if (this.form.password === "") {
        this.validation.password.isEmpty = true;
      } else this.validation.password.isEmpty = false;
    },
    fullnameBlur: function() {
      if (this.form.fullname === "") {
        this.validation.fullname.isEmpty = true;
      } else this.validation.fullname.isEmpty = false;
    },
    usernameBlur: function() {
      if (this.form.username === "") {
        this.validation.username.isEmpty = true;
      } else this.validation.username.isEmpty = false;
    },
    validateEmail: function(email) {
      var re = /\S+@\S+\.\S+/;
      return re.test(String(email).toLowerCase());
    },
    validateForm: function() {
      if (this.form.email === "") return false;
      if (!this.validateEmail(this.form.email)) return false;
      if (this.form.password === "") return false;
      return true;
    }
  }
};
</script>

<style scoped>
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
