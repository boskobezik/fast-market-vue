/* eslint-disable */
<template>
  <div></div>
</template>

<script>
import axios from "axios";
import { validationMixin } from "vuelidate";
import { required, minLength, maxLength } from "vuelidate/lib/validators";

export default {
  name: "AddProduct",
  mixins: [validationMixin],
  data: () => ({
    form: {
      productName: null,
      productOwner: null,
      price: null,
      quantity: null,
      productImageUrl: "https://picsum.photos/200/300"
    },
    userSaved: false,
    sending: false,
    lastUser: null
  }),
  validations: {
    form: {
      productName: {
        required,
        minLength: minLength(3)
      },
      productOwner: {
        required,
        minLength: minLength(3)
      },
      price: {
        required,
        maxLength: maxLength(3)
      },
      quantity: {
        required
      },
      productImageUrl: {
        required
      }
    }
  },
  methods: {
    getValidationClass(fieldName) {
      const field = this.$v.form[fieldName];

      if (field) {
        return {
          "md-invalid": field.$invalid && field.$dirty
        };
      }
    },
    clearForm() {
      this.$v.$reset();
      this.form.productName = null;
      this.form.productOwner = null;
      this.form.price = null;
      this.form.quantity = null;
      this.form.productImageUrl = null;
    },
    addProduct() {
      this.sending = true;
      axios
        .get("https://jsonplaceholder.typicode.com/todos/1")
        .then(res => console.log(res))
        .catch(ex => console.error(ex));
    },
    validateForm() {
      this.$v.$touch();

      if (!this.$v.$invalid) {
        this.addProduct();
      }
    }
  }
};
</script>

<style scoped>
.md-progress-bar {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
}
</style>
