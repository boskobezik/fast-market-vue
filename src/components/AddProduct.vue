/* eslint-disable */
<template>
  <div>
    <form novalidate class="md-layout" @submit.prevent="validateForm">
      <md-card class="md-layout-item md-size-50 md-small-size-100">
        <md-card-header>
          <div class="md-title">Add Product</div>
        </md-card-header>

        <md-card-content>
          <div class="md-layout md-gutter">
            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('productName')">
                <label for="product-name">Product name</label>
                <md-input
                  name="product-name"
                  id="product-name"
                  autocomplete="given-name"
                  v-model="form.productName"
                  :disabled="sending"
                />
                <span class="md-error" v-if="!$v.form.productName.required"
                  >The first name is required</span
                >
                <span
                  class="md-error"
                  v-else-if="!$v.form.productName.minlength"
                  >Invalid first name</span
                >
              </md-field>
            </div>

            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('productOwner')">
                <label for="product-owner">Product Owner</label>
                <md-input
                  name="product-owner"
                  id="product-owner"
                  autocomplete="family-name"
                  v-model="form.productOwner"
                  :disabled="sending"
                />
                <span class="md-error" v-if="!$v.form.productOwner.required"
                  >The last name is required</span
                >
                <span
                  class="md-error"
                  v-else-if="!$v.form.productOwner.minlength"
                  >Invalid last name</span
                >
              </md-field>
            </div>
          </div>

          <div class="md-layout md-gutter">
            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('quantity')">
                <label for="quantity">Quantity</label>
                <md-input
                  type="number"
                  id="quantity"
                  name="quantity"
                  autocomplete="quantity"
                  v-model="form.quantity"
                  :disabled="sending"
                />
                <span class="md-error" v-if="!$v.form.quantity.required"
                  >The quantity is required</span
                >
                <span class="md-error" v-else-if="!$v.form.quantity.maxlength"
                  >Invalid quantity</span
                >
              </md-field>
            </div>
            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('price')">
                <label for="price">Price</label>
                <md-input
                  type="number"
                  id="price"
                  name="price"
                  autocomplete="price"
                  v-model="form.price"
                  :disabled="sending"
                />
                <span class="md-error" v-if="!$v.form.price.required"
                  >The price is required</span
                >
                <span class="md-error" v-else-if="!$v.form.price.maxlength"
                  >Invalid price</span
                >
              </md-field>
            </div>
          </div>

          <!-- PRODUCT IMAGE -->
          <md-card class="md-layout-item md-size-25 md-small-size-50">
            <md-card-media>
              <img
                :src="form.productImageUrl"
                alt="product image"
                style="height: 200px; width: 200px;"
              />
            </md-card-media>
          </md-card>
          <md-field :class="getValidationClass('productImageUrl')">
            <label>Initial Value</label>
            <md-input
              v-model="form.productImageUrl"
              :disabled="sending"
            ></md-input>
            <span class="md-error" v-if="!$v.form.productImageUrl.required"
              >The image is required</span
            >
          </md-field>
        </md-card-content>

        <md-progress-bar md-mode="indeterminate" v-if="sending" />

        <md-card-actions>
          <md-button type="submit" class="md-primary" :disabled="sending"
            >Add Product</md-button
          >
        </md-card-actions>
      </md-card>

      <md-snackbar :md-active.sync="userSaved"
        >The user {{ lastUser }} was saved with success!</md-snackbar
      >
    </form>
  </div>
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
