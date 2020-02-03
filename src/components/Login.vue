<template>
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
                  validation.email.isEmpty === true ||
                  validation.email.isEmail === false
              }"
            >
              <label>Email</label>
              <md-input v-model="form.email" @blur="emailBlur"></md-input>
              <span class="md-error" v-if="validation.email.isEmpty === true"
                >The email is required</span
              >
              <span class="md-error" v-if="validation.email.isEmail === false"
                >This is not valid email address</span
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
              <label>Password</label>
              <md-input
                @blur="passwordBlur"
                v-model="form.password"
                type="password"
              ></md-input>
              <span class="md-error" v-if="validation.password.isEmpty === true"
                >The password is required</span
              >
              <span
                class="md-error"
                v-if="validation.password.isValid === false"
                >The password is not valid</span
              >
            </md-field>
          </div>
        </div>
        <div class="md-layout md-gutter">
          <div
            class="md-layout-item md-medium-size-50 md-small-size-50 md-xsmall-size-50"
          >
            <md-checkbox class="md-primary" v-model="form.rememberMe"
              >Remember me</md-checkbox
            >
          </div>
          <div
            class="md-layout-item md-medium-size-50 md-small-size-50 md-xsmall-size-50 right"
          >
            <label class="forgotpassword">Forgot your password?</label>
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
              >Prijavi se</md-button
            >
            <md-button type="submit" class="md-raised signIn" to="/register"
              >Registruj se</md-button
            >
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  components: {},
  data() {
    return {
      form: {
        email: "",
        password: "",
        rememberMe: false
      },
      validation: {
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
      let user = Storage.getUserByEmail(this.form.email);
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
      Storage.persistCurrentUser(user);
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
