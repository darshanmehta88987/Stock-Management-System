<template>
  <fieldset>
    <div class="col-md-12 col-12">
      <div class="card" style="margin-top: 100px; margin-left:17px; margin-right: 17px">
        <div class="card-header mt-12 pt-12">
          <div class="card-title">Payment History</div>
        </div>
        <div
          class="card-header font-weight-bold"
          v-for="customer in customerObj"
          :key="customer.customerEmailId"
        >
          Debtor Name : {{customer.customerName}}
          <br />
          Debtor Phone Number : {{customer.customerPhoneNo}}
          <br />
        </div>
        <div v-if="lastTransaction!==undefined" class="col-md-12 col-12">
          <div class="card">
            <div class="card-body">
              <div class="row">
                <div class="col-md-12">
                  <div>
                    &#x20B9; Outstanding Amount on Date : &#x20B9;&nbsp;
                    <span
                      v-if="lastTransaction.amountDue>=0"
                    >{{ lastTransaction.amountDue | round }}/-</span>
                    <span
                      v-else
                    >{{ Math.abs(lastTransaction.amountDue | round) }}/- (Paid in Advance)</span>
                  </div>
                  <div>
                    <i class="feather icon-calendar"></i>
                    Last Payment Date : {{ lastTransaction.transactionDate | filterDateFormat }}
                  </div>
                  <!-- <div>
                                <span class="mandatory">*</span>Note: Advance payment is quoted as negative amount
                  </div>-->
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="card-body">
          <table
            v-if="transactions.length!=0"
            class="table-secondary"
            cellspacing="10"
            cellpadding="10"
          >
            <tr>
              <td class="font-weight-bold">Sr.No</td>
              <td class="font-weight-bold">Transaction Date</td>
              <td class="font-weight-bold">
                Amount Paid
                <br />(On Transaction Date)
              </td>
              <td class="font-weight-bold">
                Amount Due
                <br />(On Transaction Date)
              </td>
              <td class="font-weight-bold">Description</td>
            </tr>
            <tr v-for="(item,index) in transactions" :key="index+1">
              <td>{{index+1}}</td>
              <td>{{ item.transactionDate | filterDateFormat }}</td>
              <td>&#x20B9;&nbsp;{{ item.amountPaid | round }}/-</td>
              <td>&#x20B9;&nbsp;{{ item.amountDue | round }}/-</td>
              <td>{{ item.description }}</td>
            </tr>
          </table>
          <div v-else>No Records Found !!!</div>
        </div>
      </div>
    </div>
  </fieldset>
</template>

<script>
import axios from "axios";
export default {
  layout: "dashboard",
  created() {
    axios
      .get("http://localhost:4000/amountdue/" + this.customerId)
      .then(response => {
        this.transactions = response.data;
      });
    axios
      .get("http://localhost:4000/customer/" + this.customerId)
      .then(response => {
        this.customerObj = response.data;
      });
    axios
      .get("http://localhost:4000/toprecordbycustomerid/" + this.customerId)
      .then(response => {
        this.lastTransaction = response.data[0];
      });
  },
  data() {
    return {
      customerId: this.$route.params.customerId,
      transactions: [],
      customerObj: [],
      lastTransaction: []
    };
  },
  filters: {
    capitalize: function(value) {
      if (!value) return "";
      value = value.toString();
      return value.charAt(0).toUpperCase() + value.slice(1);
    },
    filterDateFormat(val) {
      let date = new Date(val);
      //   date.setHours(date.getHours() + 6);
      return (
        date.getDate() +
        "-" +
        (date.getMonth() + 1) +
        "-" +
        date.getFullYear() +
        " " +
        date.getHours() +
        ":" +
        date.getMinutes()
      );
    },
    round: function(value) {
      let num = new Number(value);
      return num.toFixed(2);
    }
  }
};
</script>
