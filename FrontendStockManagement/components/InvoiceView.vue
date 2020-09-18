<template>
  <div class="content-body">
    <section class="invoice-print mb-1">
      <div class="row">
        <!-- <div class="col-12 col-md-7 d-flex flex-column flex-md-row justify-content-end"> -->
        <!-- <button v-if="invoiceIssued" @click="printContent('invoice-data')" class="btn btn-primary btn-print mb-1 mb-md-0 ml-md-1"> <i class="feather icon-file-text"></i> Print</button> -->
        <!-- <button v-if="invoiceIssued" @click="savePDF" class="btn btn-outline-primary  ml-0 ml-md-1"> <i class="feather icon-download"></i> Download</button> -->
        <!-- </div> -->
      </div>
    </section>

    <!-- invoice page -->
    <div id="invoice-data" class="card invoice-page">
      <div id="invoice-template" class="card-body">
        <!-- Invoice Company Details -->
        <div id="invoice-company-details" class="row">
          <div class="col-sm-6 col-12 text-left pt-1">
            <div class="media pt-1">
              <img src="/vardhman-logo.jpg" width="100%" alt="company logo" />
            </div>
          </div>
          <div class="col-sm-6 col-12 text-right">
            <h1>Invoice</h1>
            <div class="invoice-details mt-2">
              <!-- <h6>INVOICE NO.</h6>
              <p>001/2019</p>-->
              <h6 class="mt-2">INVOICE DATE</h6>
              <p>{{ invoiceDate | filterDateFormat }}</p>
            </div>
          </div>
        </div>
        <!--/ Invoice Company Details -->

        <!-- Invoice Recipient Details -->
        <div id="invoice-customer-details" class="row pt-2">
          <div class="col-sm-6 col-12 text-left">
            <h5>Recipient</h5>
            <div class="recipient-info my-2">
              <p>{{ customer.customerName }}</p>
              <p>{{ customer.customerAddress }}</p>
            </div>
            <div class="recipient-contact pb-2">
              <p>
                <i class="feather icon-mail"></i>
                {{ customer.customerEmailId }}
              </p>
              <p>
                <i class="feather icon-phone"></i>
                {{ customer.customerPhoneNo }}
              </p>
            </div>
          </div>
          <div class="col-sm-6 col-12 text-right">
            <h5>Vardhmaan Xerox</h5>
            <div class="company-info my-2">
              <p>{{ branch.branchName }} Branch</p>
              <p>{{branch.branchAddress}}</p>
              <p
                v-if="branch.gstNumber!=null || branch.gstNumber!=undefined || branch.gstNumber!=''"
              >GST No. {{branch.gstNumber}}</p>
            </div>
            <div class="company-contact">
              <p>
                <i class="feather icon-phone"></i>
                {{branch.branchPhoneNo}}
              </p>
            </div>
          </div>
        </div>
        <!--/ Invoice Recipient Details -->

        <!-- Invoice Items Details -->
        <div id="invoice-items-details" class="pt-1 invoice-items-table">
          <div class="row">
            <div class="table-responsive col-12">
              <table class="table table-bordered">
                <thead>
                  <tr>
                    <th>Sr.No</th>
                    <th>Product Name</th>
                    <th>GSM</th>
                    <th>Size</th>
                    <th>Quantity</th>
                    <th>Rate</th>
                    <th>Amount</th>
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
                    <td>{{ rate[index]}}</td>
                    <td>
                      <span style="float:right;">{{ item.totalquantity * rate[index] | round }}</span>
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
                      <span style="float:right;">{{ grandTotal | round}}</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <!-- <div id="invoice-total-details" class="invoice-total-table">
                    <div class="row">
                        <div class="col-7 offset-5">
                            <div class="table-responsive">
                                <table class="table table-borderless">
                                    <tbody>
                                        <tr>
                                            <th>SUBTOTAL</th>
                                            <td>114000 USD</td>
                                        </tr>
                                        <tr>
                                            <th>DISCOUNT (5%)</th>
                                            <td>5700 USD</td>
                                        </tr>
                                        <tr>
                                            <th>TOTAL</th>
                                            <td>108300 USD</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
        </div>-->

        <!-- Invoice Footer -->
        <!-- <div id="invoice-footer" class="text-right pt-3">
                    <p>Transfer the amounts to the business amount below. Please include invoice number on your check.
                        <p class="bank-details mb-0">
                            <span class="mr-4">BANK: <strong>FTSBUS33</strong></span>
                            <span>IBAN: <strong>G882-1111-2222-3333</strong></span>
                        </p>
        </div>-->
        <!--/ Invoice Footer -->
      </div>
    </div>
    <!-- invoice page end -->

    <!-- invoice functionality start -->
    <section class="invoice-print mb-1">
      <div class="row">
        <!-- <div class="col-12 col-md-7 d-flex flex-column flex-md-row justify-content-end"> -->
        <button v-if="!invoiceIssued" class="btn btn-primary" @click="submitDetails()">
          <i class="feather icon-check"></i> Issue Invoice
        </button>
        <button
          v-if="!invoiceIssued"
          style="float:right;"
          class="btn btn-outline-primary ml-md-1"
          @click="gotoCustomer"
        >
          <i class="feather icon-x"></i> Cancel
        </button>
        <!-- </div> -->
      </div>
    </section>
    <!-- invoice functionality end -->
  </div>
</template>
<script>
import axios from "axios";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

function roughSizeOfObject(object) {
  var objectList = [];
  var stack = [object];
  var bytes = 0;

  while (stack.length) {
    var value = stack.pop();

    if (typeof value === "boolean") {
      bytes += 4;
    } else if (typeof value === "string") {
      bytes += value.length * 2;
    } else if (typeof value === "number") {
      bytes += 8;
    } else if (typeof value === "object" && objectList.indexOf(value) === -1) {
      objectList.push(value);

      for (var i in value) {
        stack.push(value[i]);
      }
    }
  }
  return bytes;
}

export default {
  props: {
    id: {
      type: String,
      required: false
    },
    customer: {
      type: Object,
      required: true
    },
    branch: {
      type: Object,
      required: true
    },
    items: {
      type: Array,
      required: true
    },
    rate: {
      type: Array,
      required: true
    },
    invoiceDate: {
      type: Date,
      required: true
    },
    grandTotal: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      flag: 0,
      invoiceIssued: false,
      invoiceName: "",
      dateTime: ""
    };
  },
  watch: {
    flag: function(value) {
      if (value == 5) {
        Swal.fire(
          "Invoice Issued !",
          "Invoice has been downloaded !",
          "success"
        );
        // window.scrollTo(0,0);     // move to top of page
        this.$router.back();
      }
    }
  },
  methods: {
    savePDF() {
      const vueInstance = this;

      html2canvas(document.querySelector("#invoice-data")).then(function(
        canvas
      ) {
        let divHeight = $("#invoice-data").height();
        let divWidth = $("#invoice-data").width();
        let ratio = divHeight / divWidth;

        let pdf = new jsPDF({
          unit: "px",
          format: "a4"
        });
        let width = pdf.internal.pageSize.getWidth();
        let height = pdf.internal.pageSize.getHeight();
        height = ratio * width;
        let imgData = canvas.toDataURL("PNG", 1.0);
        pdf.addImage(
          imgData,
          "PNG",
          width * 0.055,
          height * 0.055,
          width - width * 0.1,
          height - height * 0.1,
          undefined,
          "FAST"
        );

        var blob = pdf.output("blob");
        var form = document.createElement("FORM");
        var formData = new FormData(form);
        let fileName =
          vueInstance.customer.customerEmailId +
          "_" +
          vueInstance.dateTime +
          ".pdf";
        vueInstance.invoiceName = fileName;
        formData.append("filename", blob, fileName);
        // formData.append("filename", );
        pdf.save(fileName, { returnPromise: true }).then(success => {
          vueInstance.flag++;
        }); // downloading on client's machine
        axios
          .post("http://localhost:4000/invoiceupload/", formData, {
            headers: {
              "Content-Type": "multipart/form-data"
            }
          })
          .then(response => {
            // if successful
            // console.log(response);
            if (response.status == 200) {
              vueInstance.flag++;
              // alert("Invoice Uploaded");
            }
          })
          .catch(function(error) {
            // if error occurs
            console.log(error);
          });
      });
    },
    submitDetails() {
      Swal.fire({
        title: "Are you sure you want to issue this invoice ?",
        text: "You won't be able to revert this!",
        type: "question",
        showCancelButton: true,
        confirmButtonColor: "#4839eb",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes",
        cancelButtonText: "No"
      }).then(result => {
        this.dateTime = this.getTimestamp();
        if (result.value) {
          Swal.fire({
            // loading animation
            title: "Generating Invoice !",
            text: "Generated Invoice will be downloaded directly !",
            allowEscapeKey: false,
            allowOutsideClick: false,
            onOpen: () => {
              Swal.showLoading();
            }
          });
          this.savePDF();
          this.invoiceIssued = true;
          let lastTranstion;
          axios
            .get(
              "http://localhost:4000/toprecordbycustomerid/" +
                this.customer.customerEmailId
            )
            .then(response => {
              console.log(response);
              if (response.data.length != 0) lastTranstion = response.data[0];
              console.log(lastTranstion);
              let calculatedDue = this.grandTotal;
              if (lastTranstion != undefined && lastTranstion != null) {
                calculatedDue += lastTranstion.amountDue;
              }
              axios
                .post("http://localhost:4000/amountdue/", {
                  fkCustomerEmailId: this.customer.customerEmailId,
                  transactionDate: this.invoiceDate,
                  amountDue: calculatedDue,
                  amountPaid: 0,
                  description: "Invoice issued on Date " + this.invoiceDate
                })
                .then(response => {
                  if (response.status == 200) {
                    this.flag++;
                  }
                });
              axios
                .post("http://localhost:4000/invoice/", {
                  fkCustomerEmailId: this.customer.customerEmailId,
                  invoiceDate: new Date(),
                  invoiceName:
                    this.customer.customerEmailId + "_" + this.dateTime + ".pdf"
                })
                .then(repsonse => {
                  if (response.status == 200) {
                    this.flag++;
                  }
                });
              axios
                .put(
                  "http://localhost:4000/invoicegenerated/" +
                    this.customer.customerEmailId
                )
                .then(response => {
                  if (response.status == 200) {
                    this.flag++;
                  }
                });
            });
        } else {
          Swal.fire("Canceled !", "Issueing of invoice Canceled !", "error");
        }
      });
    },

    gotoCustomer() {
      this.$router.back();
    },
    getTimestamp: function() {
      const today = new Date();
      const date =
        today.getFullYear() +
        "-" +
        (today.getMonth() + 1) +
        "-" +
        today.getDate();
      const time =
        today.getHours() + "-" + today.getMinutes() + "-" + today.getSeconds();
      const dateTime = date + "_" + time;
      return dateTime;
    }
  },
  filters: {
    filterDateFormat(val) {
      let date = new Date(val);
      date.setHours(date.getHours() + 6);
      return (
        date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear()
      );
    },
    round: function(value) {
      return value.toFixed(2);
    }
  }
};
</script>

<style scoped>
canvas {
  display: hidden;
}
#invoice-data,
table,
th {
  font-size: 1.2vw;
  color: black;
}
</style>
