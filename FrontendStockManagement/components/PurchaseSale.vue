<template>
  <div class="content-wrapper">
    <div class="content-header row">
      <div class="content-header-left col-md-9 col-12 mb-2">
        <div class="row breadcrumbs-top">
          <div class="col-12">
            <h2
              v-if="id==null"
              class="content-header-title float-left mb-0"
            >Add {{ mode | capitalize }}</h2>
            <h2 v-else class="content-header-title float-left mb-0">Edit {{ mode | capitalize }}</h2>
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
                  <!-- <form action="#" class="steps-validation wizard-circle"> -->
                  <fieldset>
                    <div class="row">
                      <div class="col-md-4">
                        <div class="form-group">
                          <label v-if="mode=='purchase'">Supplier*</label>
                          <label v-else>Customer*</label>
                          <select2
                            :options="customerOrSupplierList"
                            v-model="selectedCustomerOrSupplier"
                            classes="form-control col-md-12"
                          ></select2>
                        </div>
                      </div>
                      <div class="col-md-3">
                        <div class="form-group">
                          <label v-if="mode=='purchase'">Purchase Date*</label>
                          <label v-else>Sale Date*</label>
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
                      </div>

                      <!-- <div v-if="mode=='purchase'" class="col-md-0"></div>
                      <div v-else class="col-md-2">
                        <div class="form-group">
                          <label>Sale Type*</label>
                          <select2
                            :options="saleTypeList"
                            readonly
                            v-model="selectedSaleType"
                            classes="form-control col-md-12"
                          ></select2>
                        </div>
                      </div>-->

                      <div v-if="$store.state.role!='operator'" class="col-md-3">
                        <div class="form-group">
                          <label>Branch*</label>
                          <select2
                            :options="branchList"
                            v-model="selectedBranch"
                            classes="form-control col-md-12"
                          ></select2>
                        </div>
                      </div>
                      <div v-else class="col-md-3">
                        <div class="form-group">
                          <label>Branch*</label>
                          <input type="text" class="form-control" disabled :value="defaultBranch" />
                        </div>
                      </div>
                    </div>

                    <div v-for="item in totalItems" :key="item-1" class="row">
                      <div class="col-md-4">
                        <div class="form-group">
                          <label>Item*</label>
                          <select2
                            :isPassingOptions="true"
                            v-model="insertItemObjects[item-1].fkItemId"
                            classes="form-control col-md-12 select2ItemList"
                          >
                            <option
                              v-for="item in itemList"
                              :key="item.id"
                              :disabled="item.isDisabled"
                              :value="item.id"
                            >{{item.text}}</option>
                          </select2>
                        </div>
                      </div>
                      <div class="col-md-1">
                        <div class="form-group">
                          <label>Quantity*</label>
                          <input
                            type="number"
                            min="1"
                            class="form-control"
                            v-model="insertItemObjects[item-1].quantity"
                          />
                        </div>
                      </div>
                      <div class="col-md-2">
                        <div class="form-group">
                          <label></label>
                          <button
                            v-if="totalItems!=1"
                            style="float:right; margin-top:0px;"
                            class="form-control btn btn-danger"
                            type="button"
                            @click="removeItem(item-1)"
                          >
                            <i class="feather icon-minus-square"></i>
                            Remove
                          </button>
                        </div>
                      </div>
                      <div class="col-md-5"></div>
                    </div>

                    <div class="row" style="margin-top:15px;">
                      <div class="form-group col-md-2">
                        <button
                          style="float:right;"
                          class="form-control btn btn-primary"
                          type="button"
                          @click="addItem"
                        >
                          <i class="feather icon-plus-square"></i>
                          Add Item
                        </button>
                      </div>
                      <div class="col-md-10"></div>
                    </div>
                  </fieldset>
                  <fieldset>
                    <div class="row">
                      <div class="col-md-8 col-2"></div>
                      <div class="col-md-4 col-10">
                        <div class="row form-group">
                          <div class="col-md-2"></div>
                          <div class="col-md-5 col-6" style="padding-right:0px;">
                            <button
                              style="float:right;"
                              class="btn btn-outline-primary"
                              type="button"
                              @click="goBack"
                            >Cancel</button>
                          </div>
                          <div class="col-md-5 col-6">
                            <button
                              style="float:right;"
                              class="btn btn-primary ml-md-1"
                              type="button"
                              v-if="id==null"
                              @click="submitDetails"
                            >Submit</button>
                            <button
                              style="float:right;"
                              class="btn btn-primary ml-md-1"
                              type="button"
                              v-else
                              @click="updateDetails"
                            >Update</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </fieldset>
                  <!-- </form> -->
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
import select2 from "../components/select2Component";

export default {
  components: {
    select2
  },
  props: {
    id: {
      type: String,
      required: false
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
  watch: {
    insertItemObjects(val) {
      for (let i = 0; i < this.itemList.length; i++) {
        this.itemList[i].isDisabled = false;
      }
      for (let i = 0; i < val.length; i++) {
        for (let j = 0; j < this.itemList.length; j++) {
          if (val[i].fkItemId == this.itemList[j].id) {
            this.itemList[j].isDisabled = true;
          }
        }
      }
    }
  },
  data() {
    return {
      itemList: [],
      originalItemList: [],
      branchList: [],
      customerOrSupplierList: [],
      saleTypeList: [],

      selectedCustomerOrSupplier: 0,
      selectedBranch: 0,
      selectedSaleType: "0040a784-6b5d-11ea-a8c8-ace2d3e54b8b",
      defaultBranch: "",
      totalItems: 1,
      itemsInserted: 0,
      selectedDate: new Date(),

      insertItemObjects: [
        {
          fkItemId: [],
          quantity: 1
        }
      ],
      ignore: true
    };
  },
  computed: {
    getTimeStamp: function() {
      const date = new Date();
      return (
        "" +
        date.getFullYear() +
        date.getMonth() +
        date.getDate() +
        date.getHours() +
        date.getMinutes() +
        date.getSeconds() +
        date.getMilliseconds()
      );
    }
  },
  methods: {
    inputDetected() {
      if (this.ignore) {
        this.ignore = false;
      } else {
        this.ignore = true;
      }
    },
    getDetails() {
      // console.log("Get details");
      axios
        .get("http://localhost:4000/" + this.mode + "/" + this.id)
        .then(response => {
          // console.log(response);
          this.selectedBranch = response.data[0].fkBranchId;
          if (response.status == 200) {
            if (this.mode == "sale") {
              axios
                .get("http://localhost:4000/saledetail_item/" + this.id)
                .then(response => {
                  // console.log(response);
                  if (response.status == 200) {
                    const itemObjects = [];
                    for (let index in response.data) {
                      itemObjects.push({
                        fkItemId: response.data[index].fkItemId,
                        quantity: response.data[index].saleQuantity
                      });
                    }
                    this.insertItemObjects = itemObjects;
                    this.totalItems = response.data.length;
                  }
                });
              this.selectedCustomerOrSupplier =
                response.data[0].fkCustomerEmailId;
              this.selectedSaleType = response.data[0].fkSaleTypeId;
              this.selectedDate = new Date(response.data[0].salesDate);
              this.selectedDate.setHours(this.selectedDate.getHours() + 6);
            } else {
              axios
                .get("http://localhost:4000/purchaseDetail_item/" + this.id)
                .then(response => {
                  if (response.status == 200) {
                    const itemObjects = [];
                    for (let index in response.data) {
                      itemObjects.push({
                        fkItemId: response.data[index].fkItemId,
                        quantity: response.data[index].purchaseQuantity
                      });
                    }
                    this.insertItemObjects = itemObjects;
                    this.totalItems = response.data.length;
                  }
                });
              this.selectedCustomerOrSupplier =
                response.data[0].fkSupplierEmailId;
              this.selectedDate = new Date(response.data[0].purchaseDate);
              this.selectedDate.setHours(this.selectedDate.getHours() + 6);
            }
          }
        });
    },
    submitDetails() {
      // const idTimeStamp = this.getTimeStamp;
      for (let i = 0; i < this.insertItemObjects.length; i++) {
        if (
          this.insertItemObjects[i].fkItemId == "" ||
          this.insertItemObjects[i].fkItemId == [] ||
          this.insertItemObjects[i].fkItemId == 0 ||
          this.insertItemObjects[i].fkItemId == null ||
          this.insertItemObjects[i].fkItemId == undefined
        ) {
          Swal.fire({
            type: "error",
            title: "No Item selected !",
            text: "It seems like you have not selected an item.",
            confirmButtonColor: "#4839eb",
            confirmButtonText: "Ok"
          });
          return;
        }
        if (this.insertItemObjects[i].quantity < 1) {
          Swal.fire({
            type: "error",
            title: "Invalid Quantity !",
            text:
              "It seems one of the item has quantity less than 1. Item cannot have quantity less than 1.",
            confirmButtonColor: "#4839eb",
            confirmButtonText: "Ok"
          });
          return;
        }
      }
      if (this.selectedCustomerOrSupplier == 0 || this.selectedBranch == 0) {
        Swal.fire({
          type: "error",
          title: "Invalid!",
          text: "It seems you forgot to select a field",
          confirmButtonColor: "#4839eb",
          confirmButtonText: "Ok"
        });
        return;
      }
      if (this.mode == "sale") {
        if (this.selectedSaleType == 0) {
          Swal.fire({
            type: "error",
            title: "Invalid!",
            text: "It seems you forgot to select Sale type",
            confirmButtonColor: "#4839eb",
            confirmButtonText: "Ok"
          });
          return;
        }
        axios
          .post("http://localhost:4000/Sale/", {
            // saleId: idTimeStamp,
            salesDate: this.selectedDate,
            isInvoiceGenerated: 0,
            fkSaleTypeId: this.selectedSaleType,
            fkCustomerEmailId: this.selectedCustomerOrSupplier,
            fkBranchId: this.selectedBranch
          })
          .then(response => {
            console.log(response.data);
            if (response.status == 200) {
              for (let index in this.insertItemObjects) {
                axios
                  .post("http://localhost:4000/saleDetail/", {
                    fkSaleId: response.data,
                    fkItemId: this.insertItemObjects[index].fkItemId,
                    saleQuantity: this.insertItemObjects[index].quantity,
                    creditRate: 0
                    // branchId: this.selectedBranch
                  })
                  .then(response => {
                    // console.log(response);
                    if (response.status == 200) {
                      this.itemsInserted++;
                      console.log(response);
                      if (this.itemsInserted == this.totalItems) {
                        Swal.fire({
                          type: "success",
                          title: "Success!",
                          text: "Sale recorded Successfully.",
                          confirmButtonColor: "#4839eb",
                          confirmButtonText: "Ok"
                        });
                        this.itemsInserted = 0;
                        this.$router.push("/sale/");
                      }
                    } else {
                      alert("Error in SaleDetails");
                    }
                  });
              }
              // this.$router.push("/customer");
            } else {
              alert("Error in sales !");
            }
          });
      } else {
        // mode is purchase
        axios
          .post("http://localhost:4000/Purchase/", {
            purchaseDate: this.selectedDate,
            fkSupplierEmailId: this.selectedCustomerOrSupplier,
            fkBranchId: this.selectedBranch
          })
          .then(response => {
            // console.log(response);
            if (response.status == 200) {
              for (let index in this.insertItemObjects) {
                axios
                  .post("http://localhost:4000/purchaseDetail/", {
                    fkPurchaseId: response.data,
                    fkItemId: this.insertItemObjects[index].fkItemId,
                    purchaseQuantity: this.insertItemObjects[index].quantity,
                    branchId: this.selectedBranch
                  })
                  .then(response => {
                    // console.log(response);
                    if (response.status == 200) {
                      this.itemsInserted++;
                      if (this.itemsInserted == this.totalItems) {
                        Swal.fire({
                          type: "success",
                          title: "Success !",
                          text: "Purchase recorded successfully !",
                          confirmButtonColor: "#4839eb",
                          confirmButtonText: "Ok"
                        });
                        this.itemsInserted = 0;
                        this.$router.push("/purchase/");
                      }
                    } else {
                      alert("Error in purchase details");
                    }
                  });
              }
            } else {
              alert("Error in purchase");
            }
          });
      }

      // alert("Customer: "+this.selectedCustomerOrSupplier +"\nSelected date : " + this.selectedDate + "\nSelected branch : " + this.selectedBranch + "\nSelected sale type : " + this.selectedSaleType);
    },
    updateDetails() {
      for (let i = 0; i < this.insertItemObjects.length; i++) {
        if (
          this.insertItemObjects[i].fkItemId == "" ||
          this.insertItemObjects[i].fkItemId == [] ||
          this.insertItemObjects[i].fkItemId == 0 ||
          this.insertItemObjects[i].fkItemId == null ||
          this.insertItemObjects[i].fkItemId == undefined
        ) {
          Swal.fire({
            type: "error",
            title: "No Item selected !",
            text: "It seems like you have not selected an item.",
            confirmButtonColor: "#4839eb",
            confirmButtonText: "Ok"
          });
          return;
        }
        if (this.insertItemObjects[i].quantity < 1) {
          Swal.fire({
            type: "error",
            title: "Invalid Quantity !",
            text:
              "It seems one of the item has quantity less than 1. Item cannot have quantity less than 1.",
            confirmButtonColor: "#4839eb",
            confirmButtonText: "Ok"
          });
          return;
        }
      }
      if (this.selectedCustomerOrSupplier == 0 || this.selectedBranch == 0) {
        Swal.fire({
          type: "error",
          title: "Invalid!",
          text: "It seems you forgot to select a field",
          confirmButtonColor: "#4839eb",
          confirmButtonText: "Ok"
        });
        return;
      }
      if (this.mode == "sale") {
        if (this.selectedSaleType == 0) {
          Swal.fire({
            type: "error",
            title: "Invalid!",
            text: "It seems you forgot to select Sale type",
            confirmButtonColor: "#4839eb",
            confirmButtonText: "Ok"
          });
          return;
        }
        axios
          .delete("http://localhost:4000/saleDetail/" + this.id)
          .then(response => {
            if (response.status == 200) {
              this.itemsInserted = 0;
              for (let index in this.insertItemObjects) {
                axios
                  .post("http://localhost:4000/saleDetail/", {
                    fkSaleId: this.id,
                    fkItemId: this.insertItemObjects[index].fkItemId,
                    saleQuantity: this.insertItemObjects[index].quantity,
                    creditRate: 0
                  })
                  .then(response => {
                    // console.log(response);
                    if (response.status == 200) {
                      this.itemsInserted++;
                      if (this.itemsInserted == this.totalItems) {
                        Swal.fire({
                          type: "success",
                          title: "Success!",
                          text: "Sale updated Successfully.",
                          confirmButtonColor: "#4839eb",
                          confirmButtonText: "Ok"
                        });
                        this.itemsInserted = 0;
                        this.$router.push("/sale/" + this.id);
                      }
                    } else {
                      alert("Error in SaleDetails");
                    }
                  });
              }
            } else {
              alert("Error in deleting saleDetails -> " + response.statusText);
            }
          });
        axios
          .put("http://localhost:4000/Sale/", {
            saleId: this.id,
            salesDate: this.selectedDate,
            isInvoiceGenerated: 0,
            fkSaleTypeId: this.selectedSaleType,
            fkCustomerEmailId: this.selectedCustomerOrSupplier,
            fkBranchId: this.selectedBranch
          })
          .then(response => {
            if (response.status == 200) {
              // alert("Sales updated");
            } else {
              alert("Error in updating sales");
            }
          });
      } else {
        axios
          .delete("http://localhost:4000/purchaseDetail/" + this.id)
          .then(response => {
            if (response.status == 200) {
              this.itemsInserted = 0;
              for (let index in this.insertItemObjects) {
                axios
                  .post("http://localhost:4000/purchaseDetail/", {
                    fkPurchaseId: this.id,
                    fkItemId: this.insertItemObjects[index].fkItemId,
                    purchaseQuantity: this.insertItemObjects[index].quantity,
                    branchId: this.selectedBranch
                  })
                  .then(response => {
                    // console.log(response);
                    if (response.status == 200) {
                      this.itemsInserted++;
                      if (this.itemsInserted == this.totalItems) {
                        Swal.fire({
                          type: "success",
                          title: "Success!",
                          text: "Purchase updated Successfully.",
                          confirmButtonColor: "#4839eb",
                          confirmButtonText: "Ok"
                        });
                        this.itemsInserted = 0;
                        this.$router.push("/purchase/" + this.id);
                      }
                    } else {
                      alert("Error in PurchaseDetails");
                    }
                  });
              }
            } else {
              alert(
                "Error in deleting purchasedetails -> " + response.statusText
              );
            }
          });
        axios
          .put("http://localhost:4000/Purchase/" + this.id, {
            purchaseId: this.id,
            purchaseDate: this.selectedDate,
            fkSupplierEmailId: this.selectedCustomerOrSupplier,
            fkBranchId: this.selectedBranch
          })
          .then(response => {
            if (response.status == 200) {
              // alert("Purchase updated");
            } else {
              alert("Error in updating Purchase");
            }
          });
      }
    },
    addItem() {
      this.totalItems++;
      this.insertItemObjects.push({
        fkItemId: 0,
        quantity: 1
      });
    },
    removeItem(itemIndex) {
      this.totalItems--;
      this.insertItemObjects.splice(itemIndex, 1);
    },
    goBack() {
      this.$router.back();
    }
  },
  mounted() {
    if (this.id != null)
      // udpate mode
      this.getDetails();
  },
  beforeUpdate(){
        if (this.$store.state.role == "operator") {
      axios
        .get(
          "http://localhost:4000/branch/" + this.$store.state.selectedBranchId
        )
        .then(response => {
          if (response) {
            this.defaultBranch = response.data[0].branchName;
            this.selectedBranch = this.$store.state.selectedBranchId;
          }
        });
    }
  },
  beforeMount() {
    if (this.$props.mode == "purchase") {
      axios.get("http://localhost:4000/supplier").then(response => {
        const options = [{ id: 0, text: "Select Supplier" }];
        for (let index in response.data) {
          options.push({
            id: response.data[index].supplierEmailId,
            text: response.data[index].supplierName
          });
        }
        this.customerOrSupplierList = options;
      });
    } else {
      axios.get("http://localhost:4000/customer").then(response => {
        const options = [{ id: 0, text: "Select Customer" }];
        for (let index in response.data) {
          options.push({
            id: response.data[index].customerEmailId,
            text: response.data[index].customerName
          });
        }
        this.customerOrSupplierList = options;
      });
      axios.get("http://localhost:4000/saleType").then(response => {
        const options = [{ id: 0, text: "Select Sale Type" }];
        for (let index in response.data) {
          options.push({
            id: response.data[index].saleTypeId,
            text: response.data[index].saleType
          });
        }
        this.saleTypeList = options;
      });
    }

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

    axios.get("http://localhost:4000/item").then(response => {
      const options = [{ id: 0, text: "Select Item" }];
      for (let index in response.data) {
        const itemGSM = response.data[index].gsm;
        const itemSize = response.data[index].size;
        let itemName = response.data[index].name;
        if (itemGSM != null) {
          itemName = itemName + "  (GSM-" + itemGSM + ")";
        }
        if (itemSize != null) {
          itemName = itemName + "  (Size-" + itemSize + ")";
        }
        options.push({
          id: response.data[index].itemId,
          text: itemName,
          isDisabled: false
        });
      }
      this.originalItemList = options;
      this.itemList = options;
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

<style scoped>
/* .datepicker{
    position: fixed;
    z-index: 2;
} */
</style>
