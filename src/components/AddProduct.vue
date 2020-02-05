<template>
  <div>
    <b-form @submit="onSubmit" @reset="onReset" v-if="show">
      <!-- PRODUCT_NAME -->
      <b-form-group
        id="product_name_group"
        label="Product name:"
        label-for="product_name"
      >
        <b-form-input
          id="product_name"
          v-model="form.product_name"
          required
          placeholder="Enter product name"
        ></b-form-input>
      </b-form-group>

      <!-- PRODUCT_OWNER -->
      <b-form-group
        id="product_owner_id_group"
        label="Product owner:"
        label-for="product_owner_id"
      >
        <b-form-input
          id="product_owner_id"
          v-model="form.product_owner_id"
          required
          placeholder="Enter owner ID"
        ></b-form-input>
      </b-form-group>

      <!-- PRODUCT_IMAGE_URL -->
      <b-form-group
        id="product_url_group"
        label="Product URL:"
        label-for="product_url"
      >
        <b-form-input
          id="product_url"
          v-model="form.product_url"
          required
          placeholder="Enter product URL"
        ></b-form-input>
        <b-img
          :src="form.product_url"
          fluid
          alt="Product image"
          class="pb-2 pt-2"
        ></b-img>
      </b-form-group>

      <b-button type="submit" variant="primary" style="margin-right:5px;"
        >Submit</b-button
      >
      <b-button type="reset" variant="danger">Reset</b-button>
    </b-form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      form: {
        product_id: null,
        product_name: "",
        product_owner_id: "",
        product_url: "https://picsum.photos/300/150",
        product_price: ""
      },
      show: true
    };
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault();
      axios
        .post("http://127.0.0.1:8081/products/add", {
          Product_id: this.form.product_id,
          Order_id: 0
        })
        .then(res => console.log(res))
        .catch(err => console.error(err));
    },
    onReset(evt) {
      evt.preventDefault();
      // Reset our form values
      this.form.product_name = "";
      this.form.product_owner = "";
      this.form.product_url = "";
      // Trick to reset/clear native browser form validation state
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    }
  }
};
</script>
