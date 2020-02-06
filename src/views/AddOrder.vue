<template>
  <div>
    <b-form @submit="onSubmit" @reset="onReset">
      <!-- Product selection with button to add to list -->
      <!-- https://bootstrap-vue.js.org/docs/components/form-input#datalist-support -->
      <!-- Quantity -->
      <!-- User id will be taken from currently logged in user -->
      <!-- Order id is generated in the DB -->

      <!-- Product Selection -->
      <b-form-group
        id="product_name_group"
        label="Product name:"
        label-for="product_name"
      >
        <b-form-input
          list="product_selection_id"
          v-on:change="productSelected"
        ></b-form-input>
        <datalist id="product_selection_id">
          <option
            v-for="product in form.productNames"
            v-bind:key="product + Math.floor(Math.random() * 100 + 1)"
            >{{ product }}</option
          >
        </datalist>
      </b-form-group>
      <h3>{{ form.selectedProduct }}</h3>

      <!-- QUANTITY -->
      <b-form-group
        id="product_quantity_group"
        label="Product quantity:"
        label-for="product_quantity"
      >
        <b-form-input
          id="product_quantity"
          v-model="form.product_quantity"
          required
          placeholder="Enter product name"
        ></b-form-input>
      </b-form-group>

      <!-- SUBMIT FORM -->
      <b-button type="submit" variant="primary" style="margin-right:5px;"
        >Submit</b-button
      >
      <b-button type="reset" variant="danger">Reset</b-button>
    </b-form>
  </div>
</template>

<script>
import axios from "axios";

axios.defaults.headers.common["Authorization"] =
  "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ6byIsImV4cCI6MTU4MDk5MjY1NCwiaWF0IjoxNTgwOTc0NjU0fQ.PQMGj_Aa9NdDxpEX40td-J3FvlYK2v0HLjJ1BEsdSYK6i30pMUhZWMvfMyppG6_ktSSxHijMsSkvJ88yCM-p4Q";
axios.defaults.headers.common["Content-Type"] = "application/json";

export default {
  mounted() {
    // GET SOME PRODUCTS FROM DATABASE
    axios
      .get("http://192.168.1.35:8080/products")
      .then(res => {
        this.form.products = res.data;
        this.form.productNames = this.form.products.map(p => p.Product_name);
        console.log(this.form.productNames);
      })
      .catch(err => console.log(err));
  },
  data() {
    return {
      form: {
        order_id: null,
        user_id: null,
        selectedProduct: null,
        product_quantity: 0,
        products: [],
        productNames: []
      }
    };
  },
  methods: {
    productSelected(arg) {
      this.form.selectedProduct = this.form.products.find(
        p => p.Product_name === arg
      );
    },
    onSubmit(evt) {
      evt.preventDefault();
      const payload = {
        Order: {
          Order_id: this.form.order_id,
          User_id: this.form.user_id
        },
        ProductViewModel: [
          {
            Product: {
              Product_id: this.form.selectedProduct.Product_id,
              Product_name: this.form.selectedProduct.Product_name,
              Picture_url: this.form.selectedProduct.Picture_url,
              Price: this.form.selectedProduct.Price,
              User_Owner_id: this.form.selectedProduct.User_Owner_id
            },
            Quantity: this.form.product_quantity
          }
        ]
      };

      console.warn(payload);
      axios
        .post("http://192.168.1.35:8080/api/orders/add", payload)
        .then(res => console.log(res))
        .catch(err => console.log(err, "Response: ", err.response));
    },
    onReset(evt) {
      evt.preventDefault();
      // Reset our form values
      // Trick to reset/clear native browser form validation state
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    }
  }
};
</script>

<style></style>
