<template>
  <div></div>
</template>

<script>
import axios from "axios";
import * as Global from "../Global";
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
      let user = {
        User_id: "",
        Full_name: this.form.fullname,
        Paypal_email: this.form.email,
        Username: this.form.username,
        Password: this.form.password,
        IsSeller: this.form.isSeller
      };

      axios
        .post(Global.apiurl, user)
        .then(res => {
          if (res.status === 200) {
            user.User_id = res.data.User_id;
            this.$store.dispatch("addUser", user);
            this.$router.replace("/");
          }
        })
        .catch(error => {
          console.log(error);
        });
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
      if (this.form.username === "") return false;
      if (this.form.fullname === "") return false;
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
