<template>
  <div class="content-wrapper">
    <div class="content-header row">
      <div class="content-header-left col-md-12 col-12 mb-2">
        <div class="row breadcrumbs-top">
          <div class="col-12">
            <h2 class="content-header-title float-left mb-0">View {{mode|capitalize}}</h2>
            <button style="float:right" class="btn btn-primary" @click="gotoListView">
              <i class="feather icon-list"></i>
              List All {{ mode | capitalize }}s
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="content-body">
      <!-- Form wizard with step validation section start -->
      <section id="validation">
        <div class="row">
          <div class="col-12">
            <div class="card">
              <div class="card-content">
                <div class="card-body">
                  <fieldset>
                    <div class="col-md-12 col-12">
                      <div class="card">
                        <div class="card-header">
                          <div class="card-title mb-2">Detailed Information</div>
                          <div style="float:right;">
                            <button v-if="$store.state.role!='operator' && mode=='customer'"
                              @click="gotoPayment()"
                              class="btn btn-primary"
                            >
                              <i class="feather icon-dollar-sign"></i>Add Payment
                            </button>
                            <button disabled v-if="$store.state.role=='operator' && mode=='customer'"
                              @click="gotoPayment()"
                              class="btn btn-primary"
                            >
                              <i class="feather icon-dollar-sign"></i>Add Payment
                            </button>
                            <button v-if="$store.state.role!='operator' && mode=='customer'"
                              @click="gotoInvoice()"
                              class="btn btn-primary"
                            >
                              <i class="feather icon-file"></i> Generate Invoice
                            </button>
                            <button disabled v-if="$store.state.role=='operator' && mode=='customer'"
                              @click="gotoInvoice()"
                              class="btn btn-primary"
                            >
                              <i class="feather icon-file"></i> Generate Invoice
                            </button>
                            <button
                              v-if="mode=='customer'"
                              @click="gotoInvoiceList()"
                              class="btn btn-primary"
                            >
                              <i class="feather icon-file"></i> Issued Invoices
                            </button>
                          </div>
                        </div>
                        <div class="card-body">
                          <table cellspacing="10" cellpadding="10">
                            <tr>
                              <td class="font-weight-bold" v-if="mode=='customer'">Customer Name</td>
                              <td
                                class="font-weight-bold"
                                v-else-if="mode=='supplier'"
                              >Supplier Name</td>
                              <td class="font-weight-bold" v-else-if="mode=='branch'">Branch Name</td>
                              <td class="font-weight-bold" v-else-if="mode=='user'">User Name</td>
                              <td class="font-weight-bold" v-else>Item Name</td>
                              <td>{{ name }}</td>
                            </tr>
                            <tr v-if="mode!='item'">
                              <td class="font-weight-bold">Phone Number</td>
                              <td>{{ phoneNo }}</td>
                            </tr>
                            <tr v-if="mode=='customer' || mode=='supplier' || mode=='branch'">
                              <td class="font-weight-bold">GSTIN</td>
                              <td>{{ gstNo }}</td>
                            </tr>
                            <tr v-if="mode=='item'">
                              <td class="font-weight-bold">Price</td>
                              <td>{{ price }}</td>
                            </tr>
                            <tr v-if="mode!='item' && mode!='branch'">
                              <td class="font-weight-bold">Email</td>
                              <td>{{ email }}</td>
                            </tr>
                            <tr v-if="mode!='item'">
                              <td class="font-weight-bold">Address</td>
                              <td>{{ address }}</td>
                            </tr>
                            <tr v-if="mode=='item'">
                              <td class="font-weight-bold">GSM</td>
                              <td>{{ gsm }}</td>
                            </tr>
                            <tr v-if="mode=='item'">
                              <td class="font-weight-bold">Size</td>
                              <td>{{ size }}</td>
                            </tr>
                            <tr v-if="mode=='item'">
                              <td class="font-weight-bold">Reorder-Level</td>
                              <td>{{ reorderLevel }}</td>
                            </tr>
                          </table>
                        </div>
                      </div>
                    </div>
                  </fieldset>
                  <fieldset>
                    <div class="row">
                      <div class="col-md-9 col-4"></div>
                      <div class="col-md-3 col-8">
                        <button @click="gotoEdit()" style="float:right;" class="btn btn-primary">
                          <i class="feather icon-edit-2"></i>
                          Edit {{ mode | capitalize }}
                        </button>
                      </div>
                    </div>
                  </fieldset>
                  <!-- Step 3 -->
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <!-- Form wizard with step validation section end -->
    </div>
  </div>
</template>
<script>
import axios from "axios";

export default {
  props: {
    id: {
      type: String,
      required: true
    },
    mode: {
      type: String,
      required: true
    },
    value: {
      type: Number,
      required: false
    }
  },
  data() {
    return {
      name: "",
      email: "",
      address: "",
      phoneNo: "",
      gstNo: "",
      price: "",
      reorderLevel: ""
    };
  },
  methods: {
    gotoEdit: function() {
      this.$router.push("/" + this.mode + "/edit/" + this.id);
    },
    gotoListView() {
      this.$router.push("/" + this.mode);
    },
    gotoPayment() {
      this.$router.push("/payment/" + this.id);
    },
    gotoInvoice() {
      this.$router.push("/invoice/" + this.id);
    },
    gotoInvoiceList() {
      this.$router.push("/invoice/view/" + this.id);
    }
  },
  mounted() {
    axios
      .get("http://localhost:4000/" + this.$props.mode + "/" + this.$props.id)
      .then(Response => {
        if (this.$props.mode == "customer") {
          this.name = Response.data[0].customerName;
          this.email = Response.data[0].customerEmailId;
          this.address = Response.data[0].customerAddress;
          this.phoneNo = Response.data[0].customerPhoneNo;
          this.gstNo = Response.data[0].customerGstNo;
        } else if (this.mode == "supplier") {
          this.name = Response.data[0].supplierName;
          this.email = Response.data[0].supplierEmailId;
          this.address = Response.data[0].supplierAddress;
          this.phoneNo = Response.data[0].supplierPhoneNo;
          this.gstNo = Response.data[0].supplierGstNo;
        } else if (this.mode == "branch") {
          this.name = Response.data[0].branchName;
          this.address = Response.data[0].branchAddress;
          this.phoneNo = Response.data[0].branchPhoneNo;
          this.gstNo = Response.data[0].gstNumber;
        } else if (this.mode == "item") {
          this.name = Response.data[0].name;
          this.price = Response.data[0].minimumRate;
          this.reorderLevel = Response.data[0].reorderLevel;
          this.gsm = Response.data[0].gsm;
          this.size = Response.data[0].size;
        } else if (this.$props.mode == "user") {
          this.name = Response.data[0].userName;
          this.email = Response.data[0].userEmailId;
          this.address = Response.data[0].userAddress;
          this.phoneNo = Response.data[0].userPhoneNo;
        } else if (this.mode == "supplier") {
          console.log(
            "All Suppliers Details:- " +
              this.name +
              " " +
              this.mobNo +
              " " +
              this.email +
              " " +
              this.city +
              " " +
              this.address
          );
        } else {
        }
      });
  },
  filters: {
    capitalize: function(value) {
      if (!value) return "";
      value = value.toString();
      return value.charAt(0).toUpperCase() + value.slice(1);
    }
  }
};
</script>
