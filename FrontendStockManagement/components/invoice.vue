<template>
  <div>
    <div v-if="viewInvoice!=true" class="content-wrapper">
      <div class="content-header row">
        <div class="content-header-left col-md-12 col-12 mb-2">
          <div class="row breadcrumbs-top">
            <div class="col-12">
              <h2 class="content-header-title float-left mb-0">Generate Invoice</h2>
              <button style="float:right;" class="btn btn-primary" @click="gotoCustomer">
                <i class="feather icon-list"></i> Back To Customer View
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
                  <div class="card-header">
                    <div class="col-md-3">
                      <span class="font-weight-bold">Customer Name :</span>
                      <span>{{customer.customerName}}</span>
                    </div>
                    <div class="col-md-3">
                      <span class="font-weight-bold">Customer Phone No. :</span>
                      <span>{{customer.customerPhoneNo}}</span>
                    </div>
                    <div class="col-md-3">
                      <label>Invoice Date*</label>
                      <client-only>
                        <date-picker
                          :use-utc="true"
                          input-class="form-control col-md-12"
                          class="datepicker"
                          format="d-MM-yyyy"
                          v-model="selectedDate"
                        ></date-picker>
                      </client-only>
                    </div>
                    <div class="col-md-3">
                      <label>Branch*</label>
                      <select2
                        :options="branchList"
                        v-model="selectedBranch"
                        classes="form-control col-md-12"
                      ></select2>
                    </div>
                  </div>
                  <div v-if="items.length!=0" class="card-body">
                    <!-- <form action="#" class="steps-validation wizard-circle"> -->
                    <fieldset>
                      <div class="col-md-12 col-12">
                        <div class="card">
                          <div class="card-header">
                            <div class="card-title mb-2">Set Credit Rate for Items</div>
                          </div>
                          <div class="card-body">
                            <table
                              class="table-secondary table-bordered"
                              cellspacing="10"
                              cellpadding="10"
                            >
                              <thead>
                                <tr>
                                  <th>Sr.No</th>
                                  <th>Item Name</th>
                                  <th>GSM</th>
                                  <th>Size</th>
                                  <th>Total Quantity Sold</th>
                                  <th>Credit Rate</th>
                                  <th>Total Amount</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr v-for="(item,index) in items" :key="index+1">
                                  <td>{{index+1}}</td>
                                  <td>{{ item.name }}</td>
                                  <td v-if="item.gsm==null">-</td>
                                  <td v-else>{{ item.gsm }}</td>
                                  <td v-if="item.size==null">-</td>
                                  <td v-else>{{ item.size }}</td>
                                  <td>{{ item.totalquantity }}</td>
                                  <td>
                                    <input
                                      class="form-control col-md-5"
                                      type="number"
                                      min="0"
                                      step="0.1"
                                      v-model="creditRate[index]"
                                    />
                                  </td>
                                  <td>
                                    <span
                                      style="float:right;"
                                    >{{ amount[index] = item.totalquantity * creditRate[index] | round }}</span>
                                  </td>
                                </tr>

                                <tr>
                                  <td></td>
                                  <td></td>
                                  <td></td>
                                  <td></td>
                                  <td></td>
                                  <td class="font-weight-bold">
                                    <span style="float:right;">Grand Total :</span>
                                  </td>
                                  <td class="font-weight-bold">
                                    <span style="float:right;">{{grandTotal() | round}}</span>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                            <button
                              style="float:right;"
                              class="btn btn-primary"
                              type="button"
                              @click="previewInvoice()"
                            >Preview Invoice</button>
                          </div>
                        </div>
                      </div>
                      <div>
                        <span class="mandatory">*</span>Note: Advance payment is quoted as negative amount
                      </div>
                    </fieldset>
                    <!-- </form> -->
                  </div>
                  <div v-else class="card-body">No sales records found !!!</div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <!-- Form wizard with step validation section end -->
      </div>
    </div>

    <div v-if="viewInvoice" class="content-wrapper">
      <div class="content-header row">
        <div class="content-header-left col-md-9 col-12 mb-2">
          <div class="row breadcrumbs-top">
            <div class="col-12">
              <h2 class="content-header-title float-left mb-0">Invoice</h2>
            </div>
          </div>
        </div>
      </div>

      <invoiceView
        v-if="viewInvoice"
        :customer="customer"
        :invoiceDate="selectedDate"
        :rate="creditRate"
        :items="items"
        :grandTotal="grandTotal()"
        :branch="branchObj"
      ></invoiceView>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import invoiceView from "../components/InvoiceView";
import select2 from "../components/select2Component";

export default {
  components: {
    invoiceView,
    select2
  },
  props: {
    id: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      viewInvoice: false,
      selectedDate: new Date(),
      customer: [],
      creditRate: [],
      items: [],
      amount: [],
      branchList: [],
      selectedBranch: null,
      branchObj: null
    };
  },
  methods: {
    grandTotal() {
      let total = [];
      Object.entries(this.amount).forEach(([key, val]) => {
        total.push(val);
      });
      return total.reduce(function(total, num) {
        return total + num;
      }, 0);
    },
    previewInvoice() {
      if (
        this.selectedBranch == null ||
        this.selectedBranch == "" ||
        this.selectedBranch == undefined
      ) {
        Swal.fire({
          type: "error",
          title: "Branch Not Selected!",
          text: "It seems you haven't selected the branch.",
          confirmButtonColor: "#4839eb",
          confirmButtonText: "Ok"
        });
        return;
      }
      for (let i = 0; i < this.creditRate.length; i++) {
        if (this.creditRate[i] <= 0) {
          Swal.fire({
            type: "error",
            title: "Invalid CreditRate!",
            text:
              "It seems an item(s) creditRate is invalid. CreditRate cannot be 0 or less than 0.",
            confirmButtonColor: "#4839eb",
            confirmButtonText: "Ok"
          });
          return;
        }
      }
      axios
        .get("http://localhost:4000/branch/" + this.selectedBranch)
        .then(response => {
          if (response.status == 200) {
            this.branchObj = response.data[0];
            this.viewInvoice = true;
            window.scrollTo(0, 0); // move to top of page
          }
        });
    },
    gotoCustomer() {
      this.$router.push("/customer/" + this.id);
    }
  },
  mounted() {
    axios.get("http://localhost:4000/customer/" + this.id).then(response => {
      this.customer = response.data[0];
    });
    axios
      .get("http://localhost:4000/salejoinbycustomerid/" + this.id)
      .then(response => {
        this.items = response.data;
        this.creditRate = new Array(response.data.length).fill(0);
      });
    axios.get("http://localhost:4000/branch").then(response => {
      const options = [{ id: 0, text: "Select Branch" }];
      for (let index in response.data) {
        options.push({
          id: response.data[index].branchId,
          text: response.data[index].branchName
        });
      }
      this.branchList = options;
    });
  },
  filters: {
    capitalize: function(value) {
      if (!value) return "";
      value = value.toString();
      return value.charAt(0).toUpperCase() + value.slice(1);
    },
    round: function(value) {
      return value.toFixed(2);
    }
  }
};
</script>
<style scoped>
.mandatory {
  color: red;
  font-size: 15px;
}
</style>


