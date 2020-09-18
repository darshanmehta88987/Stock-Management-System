<template>
  <span>
    <!-- <button v-if="selectedItems.length > 0" class="btn btn-danger"><i class="feather icon-trash-2"></i> Delete </button> -->

    <div class="table-responsive" v-if="showTable==true" id="mytable">
      <!-- <div id="DataTables_Table_4_wrapper" class="dataTables_wrapper dt-bootstrap4">
            <div class="dt-buttons btn-group">      
                <button class="btn btn-secondary buttons-copy buttons-html5" ><span>Copy</span></button> 
                <button class="btn btn-secondary buttons-pdf buttons-html5" ><span>PDF</span></button>
                <button class="btn btn-secondary" ><span>JSON</span></button> 
                <button class="btn btn-secondary buttons-print" >    <span>Print</span></button>
             </div>
             <div id="DataTables_Table_4_filter" class="dataTables_filter">
                <label>Search:<input type="search" class="form-control form-control-sm" placeholder="" aria-controls="DataTables_Table_4">
                </label>
      </div>-->
      <table
        class="table table-striped dataex-html5-selectors dataTable"
        id="DataTables_Table_4"
        role="grid"
        aria-describedby="DataTables_Table_4_info"
      >
        <thead>
          <tr v-if="mode=='user'">
            <th>Sr.No</th>
            <th>Name</th>
            <th>Phone No.</th>
            <th>Email</th>
            <th v-if="$store.state.selectedBranchId==100">Branch</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
          <tr v-else-if="mode=='stock'">
            <th>Sr.No</th>
            <th>Item Name</th>
            <th>Stock</th>
            <th v-if="$store.state.selectedBranchId==100">Branch</th>
          </tr>
          <tr v-else-if="mode=='customer' || mode=='supplier'">
            <!-- <th></th> -->
            <th>Sr.No</th>
            <th>Name</th>
            <th>Mobile No.</th>
            <th>Email</th>
            <th>GSTIN</th>
            <th>Actions</th>
          </tr>
          <tr v-else-if="mode=='branch'">
            <!-- <th></th> -->
            <th>Sr.No</th>
            <th>Name</th>
            <th>Mobile No.</th>
            <th>Actions</th>
          </tr>
          <tr v-else>
            <!-- <th></th> -->
            <th>Sr.No</th>
            <th>Name</th>
            <th>Price</th>
            <th>Description(GSM - Size)</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody v-if="mode=='customer'">
          <tr v-for="(object,index) in fetchedObjects" :key="index">
            <!-- <td><input type="checkbox" v-model="selectedItems" :value="object.customerEmailId"></td> -->
            <td>{{ index + 1 }}</td>
            <td>{{ object.customerName }}</td>
            <td>{{ object.customerPhoneNo }}</td>
            <td>{{ object.customerEmailId }}</td>
            <td>{{ object.customerGstNo }}</td>
            <td>
              <!-- view button -->
              <button
                title="View this Customer"
                @click="viewCustomer(object.customerEmailId)"
                class="btn btn-primary"
              >
                <i class="feather icon-list"></i>
              </button>
              <!-- edit button - yellow color -->
              <button
                v-if="$store.state.role!='operator'"
                title="Edit this Customer"
                class="btn btn-warning"
                @click="update(object.customerEmailId)"
              >
                <i class="feather icon-edit"></i>
              </button>
              <!-- delete button - red color -->
              <button
                v-if="$store.state.role!='operator'"
                title="Delete this Customer"
                class="btn btn-danger"
                @click="deleteRec(object.customerEmailId)"
              >
                <i class="feather icon-trash-2"></i>
              </button>
            </td>
          </tr>
        </tbody>
        <tbody v-else-if="mode=='stock'">
          <tr v-for="(object,index) in fetchedObjects" :key="index">
            <td>{{ index + 1 }}</td>
            <td>{{ object.name }}</td>
            <td>{{ object.stockQuantity}}</td>
            <td v-if="$store.state.selectedBranchId==100">{{ object.branchName }}</td>
          </tr>
        </tbody>
        <tbody v-else-if="mode=='user'">
          <tr v-for="(object,index) in fetchedObjects" :key="index">
            <!-- <td> <input type="checkbox" v-model="selectedItems" :value="object.userEmailId">  {{ index + 1 }}</td> -->
            <td>{{ index + 1 }}</td>
            <td>{{ object.userName }}</td>
            <td>{{ object.userPhoneNo }}</td>
            <td>{{ object.userEmailId }}</td>
            <td v-if="$store.state.selectedBranchId==100">{{ object.branchName }}</td>
            <td v-if="object.fkRoleId==null">Operator</td>
            <td v-else>Admin</td>
            <td>
              <!-- view button -->
              <button
                title="View this User"
                @click="viewUser(object.userEmailId)"
                class="btn btn-primary"
              >
                <i class="feather icon-list"></i>
              </button>
              <!-- edit button - yellow color -->
              <button
                v-if="$store.state.role!='operator'"
                title="Edit this User"
                class="btn btn-warning"
                @click="update(object.userEmailId)"
              >
                <i class="feather icon-edit"></i>
              </button>
              <!-- delete button - red color -->
              <button
                v-if="$store.state.role!='operator' && $store.state.user!=object.userEmailId"
                title="Delete this User"
                class="btn btn-danger"
                @click="deleteRec(object.userEmailId)"
              >
                <i class="feather icon-trash-2"></i>
              </button>
            </td>
          </tr>
        </tbody>

        <tbody v-else-if="mode=='supplier'">
          <tr v-for="(object,index) in fetchedObjects" :key="index">
            <!-- <td><input type="checkbox" v-model="selectedItems" :value="object.supplierEmailId"></td> -->
            <td>{{ index + 1 }}</td>
            <td>{{ object.supplierName }}</td>
            <td>{{ object.supplierPhoneNo }}</td>
            <td>{{ object.supplierEmailId }}</td>
            <td>{{ object.supplierGstNo }}</td>
            <td>
              <!-- view button -->
              <button
                title="View this Supplier"
                @click="viewSupplier( object.supplierEmailId )"
                class="btn btn-primary"
              >
                <i class="feather icon-list"></i>
              </button>
              <!-- edit button - yellow color -->
              <button
                v-if="$store.state.role!='operator'"
                title="Edit this Supplier"
                class="btn btn-warning"
                @click="update(object.supplierEmailId)"
              >
                <i class="feather icon-edit"></i>
              </button>
              <!-- delete button - red color -->
              <button
                v-if="$store.state.role!='operator'"
                title="Delete this Supplier"
                class="btn btn-danger"
                @click="deleteRec(object.supplierEmailId)"
              >
                <i class="feather icon-trash-2"></i>
              </button>
            </td>
          </tr>
        </tbody>
        <tbody v-else-if="mode=='branch'">
          <tr v-for="(object,index) in fetchedObjects" :key="index">
            <!-- <td><input type="checkbox" v-model="selectedItems" :value="object.branchId"></td> -->
            <td>{{ index + 1 }}</td>
            <td>{{ object.branchName }}</td>
            <td>{{ object.branchPhoneNo }}</td>
            <td>
              <!-- view button -->
              <button
                title="View this Branch"
                @click="viewBranch( object.branchId )"
                class="btn btn-primary"
              >
                <i class="feather icon-list"></i>
              </button>
              <!-- edit button - yellow color -->
              <button
                v-if="$store.state.role!='operator'"
                title="Edit this Branch"
                class="btn btn-warning"
                @click="update(object.branchId)"
              >
                <i class="feather icon-edit"></i>
              </button>
              <!-- delete button - red color -->
              <button
                v-if="$store.state.role!='operator'"
                title="Delete this Branch"
                class="btn btn-danger"
                @click="deleteRec(object.branchId)"
              >
                <i class="feather icon-trash-2"></i>
              </button>
            </td>
          </tr>
        </tbody>
        <tbody v-else>
          <tr v-for="(object,index) in fetchedObjects" :key="index">
            <!-- <td><input type="checkbox" v-model="selectedItems" :value="object.itemId"></td> -->
            <td>{{ index + 1 }}</td>
            <td>{{ object.name }}</td>
            <td>{{ object.minimumRate }}</td>
            <td>{{ object.gsm }} - {{object.size}}</td>
            <td>
              <!-- view button -->
              <button
                title="View this Item"
                @click="viewItem(object.itemId)"
                class="btn btn-primary"
              >
                <i class="feather icon-list"></i>
              </button>
              <!-- edit button - yellow color -->
              <button
                v-if="$store.state.role!='operator'"
                title="Edit this Item"
                class="btn btn-warning"
                @click="update(object.itemId)"
              >
                <i class="feather icon-edit"></i>
              </button>
              <!-- delete button - red color -->
              <button
                v-if="$store.state.role!='operator'"
                title="Delete this Item"
                class="btn btn-danger"
                @click="deleteRec(object.itemId)"
              >
                <i class="feather icon-trash-2"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </span>
</template>
<script>
import axios from "axios";
const crypto = require("crypto");

export default {
  props: {
    mode: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      selectedItems: [],
      fetchedObjects: null,
      id: "",
      showTable: false,
      myBranch: this.$store.state.selectedBranchId
    };
  },
  created() {
    this.getDetails();
  },
  mounted() {
    // this.$nextTick(() => {
    // });
  },
  computed: {
    getBranch() {
      return this.$store.state.selectedBranchId;
    }
  },
  watch: {
    getBranch: function(val) {
      this.myBranch = val;
      if (this.mode == "user") {
        if ($.fn.DataTable.isDataTable(".dataex-html5-selectors")) {
          $(".dataex-html5-selectors")
            .DataTable()
            .destroy();
        }
      }
      // console.log("csiList= "+this.myBranch);
      this.getDetails();
    }
  },
  //     myBranch:function (val) {
  //         console.log(val)
  //         this.getDetails(val);
  //       }
  // },
  // watch:{
  //     selectedBranchId:{
  //         handler(){
  //             this.getDetails(val);
  //             console.log(val);
  //         }
  //     }
  // },
  methods: {
    viewCustomer: function(email) {
      this.$router.push("/customer/" + email);
    },
    viewUser: function(email) {
      this.$router.push("/user/" + email);
    },
    viewSupplier: function(email) {
      this.$router.push("/supplier/" + email);
    },
    viewItem: function(itemId) {
      this.$router.push("/item/" + itemId);
    },
    viewBranch: function(branchId) {
      this.$router.push("/branch/" + branchId);
    },
    update(id) {
      this.$router.push("/" + this.mode + "/edit/" + id);
    },
    deleteRec(id) {
      if (this.mode == "branch") {
        Swal.fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!"
        }).then(result => {
          if (result.value) {
            axios
              .delete("http://localhost:4000/" + this.mode + "/" + id)
              .then(res => {
                if (res.data.affectedRows) {
                  Swal.DismissReason.backdrop,
                    Swal.fire({
                      type: "success",
                      title: "Success!",
                      text: "Record Deleted Successfully.",
                      confirmButtonColor: "#4839eb",
                      confirmButtonText: "Ok"
                    });
                  this.getDetails();
                } else {
                  Swal.DismissReason.backdrop,
                    Swal.fire({
                      type: "error",
                      title: "Oops...",
                      text: "Cannot Delete Record!",
                      confirmButtonColor: "red",
                      confirmButtonText: "Ok"
                    });
                }
              });
          }
        });
      } else {
        Swal.fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!"
        }).then(result => {
          if (result.value) {
            axios
              .delete("http://localhost:4000/" + this.mode + "/" + id)
              .then(res => {
                if (res.data.affectedRows) {
                  Swal.DismissReason.backdrop,
                    Swal.fire({
                      type: "success",
                      title: "Success!",
                      text: "Record Deleted Successfully.",
                      confirmButtonColor: "#4839eb",
                      confirmButtonText: "Ok"
                    });
                  this.getDetails();
                } else {
                  Swal.DismissReason.backdrop,
                    Swal.fire({
                      type: "error",
                      title: "Oops...",
                      text: "Cannot Delete Record!",
                      confirmButtonColor: "red",
                      confirmButtonText: "Ok"
                    });
                }
              });
          }
        });
      }
    },

    async getDetails() {
      if (this.mode == "user") {
        if (this.$store.state.selectedBranchId == 100) {
          await axios
            .get("http://localhost:4000/" + this.mode)
            .then(response => {
              this.fetchedObjects = response.data;
            })
            .then(res1 => {
              this.showTable = true;
            });
        } else {
          //store by default sets this.$store.state.selectedBranchId to null at start when we start the proj or refresh it
          //hence when user will log in then this store will set it to "" at first hence directly getting branch name
          //from user table
          if (this.$store.state.selectedBranchId == "") {
            await axios
              .get("http://localhost:4000/user/" + this.$store.state.user)
              .then(res => {
                axios
                  .get(
                    "http://localhost:4000/userbybranchid/" +
                      res.data[0].fkBranchId
                  )
                  .then(res2 => {
                    this.fetchedObjects = res2.data;
                    // console.log(this.fetchedObjects);
                  })
                  .then(res3 => {
                    this.showTable = true;
                  });
              });
          }

          //now after login whenever the user will change the branch from select2,then this else condition will
          //get executed
          else {
            await axios
              .get(
                "http://localhost:4000/userbybranchid/" +
                  this.$store.state.selectedBranchId
              )
              .then(response => {
                this.fetchedObjects = response.data;
              })
              .then(res1 => {
                this.showTable = true;
              });
          }
        }
      } else if (this.mode == "stock") {
        if (this.$store.state.selectedBranchId == 100) {
          await axios
            .get("http://localhost:4000/" + this.mode)
            .then(response => {
              this.fetchedObjects = response.data;
            })
            .then(res1 => {
              this.showTable = true;
            });
        } else {
          if (this.$store.state.selectedBranchId == "") {
            await axios
              .get("http://localhost:4000/user/" + this.$store.state.user)
              .then(res => {
                axios
                  .get(
                    "http://localhost:4000/stockbybranchid/" +
                      res.data[0].fkBranchId
                  )
                  .then(res2 => {
                    this.fetchedObjects = res2.data;
                    // console.log(this.fetchedObjects);
                  })
                  .then(res3 => {
                    this.showTable = true;
                  });
              });
          } else {
            await axios
              .get(
                "http://localhost:4000/stockbybranchid/" +
                  this.$store.state.selectedBranchId
              )
              .then(response => {
                this.fetchedObjects = response.data;
              })
              .then(res1 => {
                this.showTable = true;
              });
          }
        }
      } else {
        await axios
          .get("http://localhost:4000/" + this.mode)
          .then(response => {
            console.log(response);
            this.fetchedObjects = response.data;
          })
          .then(res1 => {
            this.showTable = true;
            this.loadTable();
          });
      }
    },
    loadTable() {
      if ($.fn.DataTable.isDataTable(".dataex-html5-selectors")) {
        $(".dataex-html5-selectors")
          .DataTable()
          .destroy();
      }

      // $('.dataex-html5-selectors tbody').empty();
      $(".dataex-html5-selectors").DataTable({
        dom: "Bfrtip",
        buttons: [
          {
            extend: "copyHtml5",
            exportOptions: {
              columns: [0, ":visible"]
            }
          },
          {
            extend: "pdfHtml5",
            exportOptions: {
              columns: ":visible"
            }
          },
          {
            text: "JSON",
            action: function(e, dt, button, config) {
              var data = dt.buttons.exportData();

              $.fn.dataTable.fileSave(
                new Blob([JSON.stringify(data)]),
                "Export.json"
              );
            }
          },
          {
            extend: "print",
            exportOptions: {
              columns: ":visible"
            }
          }
        ]
      });
    }
  }
};
</script>
<style scoped>
button {
  padding: 10px 12px;
}
</style>