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
            <!-- <h2 v-if="mode=='customer'" class="content-header-title float-left mb-0">Customer Add</h2>
                            <h2 v-else-if="mode=='user'" class="content-header-title float-left mb-0">User Add</h2>
                            <h2 v-else-if="mode=='supplier'" class="content-header-title float-left mb-0">Supplier Add</h2>
                            <h2 v-else-if="mode=='item'" class="content-header-title float-left mb-0">Item Add</h2>
            <h2 v-else class="content-header-title float-left mb-0">Branch Add</h2>-->
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
                  <form class="steps-validation wizard-circle" @submit.prevent="details()">
                    <fieldset>
                      <div class="row form-group">
                        <div v-if="mode!='item'" class="col-md-6">
                          <div class="form-group">
                            <label v-if="mode=='customer'" for="firstName3">
                              Customer Name
                              <span class="mandatory">*</span>
                            </label>
                            <label v-else-if="mode=='user'" for="firstName3">
                              User Name
                              <span class="mandatory">*</span>
                            </label>
                            <label v-else-if="mode=='supplier'" for="firstName3">
                              Supplier Name
                              <span class="mandatory">*</span>
                            </label>

                            <label v-else for="firstName3">
                              Branch Name
                              <span class="mandatory">*</span>
                            </label>
                            <input
                              type="text"
                              class="form-control"
                              v-model="$v.name.$model"
                              @input="checkName()"
                              :class="{'is-invalid':$v.name.$error}"
                            />
                            <div class="error" v-if="nameValid==false">Branch Name Already Exist</div>
                            <div class="invalid-feedback">
                              <div class="error" v-if="!$v.name.required">Name is required</div>
                              <div class="error" v-if="!$v.name.alpha">Invalid Name</div>
                            </div>
                          </div>
                        </div>
                        <div v-else class="col-md-4">
                          <label for="firstName3">
                            Item Name
                            <span class="mandatory">*</span>
                          </label>
                          <input
                            type="text"
                            class="form-control"
                            v-model="$v.name.$model"
                            @input="checkName()"
                            :class="{'is-invalid':$v.name.$error}"
                          />
                          <div class="error" v-if="nameValid==false">Item Name Already Exist</div>
                          <div class="invalid-feedback">
                            <div class="error" v-if="!$v.name.required">Name is required</div>
                            <div class="error" v-if="!$v.name.alpha">Invalid Name</div>
                          </div>
                        </div>

                        <div v-if="mode!='item'" class="col-md-6">
                          <div class="form-group">
                            <label for="lastName3">
                              Mobile Number
                              <span class="mandatory">*</span>
                            </label>
                            <input
                              type="text"
                              class="form-control"
                              v-model.lazy="$v.mobNo.$model"
                              :class="{'is-invalid':$v.mobNo.$error}"
                            />

                            <div class="invalid-feedback">
                              <div class="error" v-if="!$v.mobNo.numeric">Only numeric allowed</div>
                              <div class="error" v-if="!$v.mobNo.maxLength">Invalid mobile number</div>
                              <div
                                class="error"
                                v-if="!$v.mobNo.minLength"
                              >Mobile number must have {{ $v.mobNo.$params.minLength.min}} digits</div>
                              <div class="error" v-if="!$v.mobNo.required">Mobile number is required</div>
                            </div>
                          </div>
                        </div>
                        <div v-else class="row col-md-6">
                          <div class="col-md-2">
                            <label>
                              Price
                              <span class="mandatory">*</span>
                            </label>
                            <input
                              type="number"
                              class="form-control"
                              v-model.lazy="$v.price.$model"
                              :class="{'is-invalid':$v.price.$error}"
                            />
                            <div class="invalid-feedback">
                              <div class="error" v-if="!$v.price.required">price is required</div>
                            </div>
                          </div>
                          <div class="col-md-2">
                            <div class="form-group">
                              <label>GSM</label>
                              <input type="number" class="form-control" v-model.lazy="gsm" />
                            </div>
                          </div>
                          <div class="col-md-4">
                            <div class="form-group">
                              <label>Size</label>
                              <input type="text" class="form-control" v-model.lazy="size" />
                            </div>
                          </div>
                          <div class="col-md-3">
                            <label>
                              Reorder Level
                              <span class="mandatory">*</span>
                            </label>
                            <input
                              type="number"
                              required
                              class="form-control"
                              v-model.lazy="reorder"
                            />
                          </div>
                        </div>
                      </div>

                      <div class="row" v-if="mode!='item' && mode!='branch'">
                        <div class="col-md-6">
                          <div class="form-group">
                            <label for>
                              Email
                              <span class="mandatory">*</span>
                            </label>
                            <input v-if="mode!='supplier'"
                              type="text"
                              class="form-control"
                              :disabled="id!=null"
                              v-model.lazy="$v.email.$model"
                              :class="{'is-invalid':$v.email.$error}"
                            />
                            <input v-else
                              type="text"
                              class="form-control"
                              :disabled="id!=null"
                              v-model="$v.email.$model"
                              @input="checkEmail()"
                              :class="{'is-invalid':$v.email.$error}"
                            />
                          <div class="error" v-if="emailValid==false">Supplier Email Already Exist</div>
                            <div class="invalid-feedback">
                              <div class="error" v-if="!$v.email.required">Email is required</div>
                              <div class="error" v-if="!$v.email.email">Invalid Email</div>
                            </div>
                          </div>
                        </div>
                        <div v-if="mode=='user'" class="col-md-6">
                          <div class="form-group">
                            <label>
                              Password
                              <span class="mandatory">*</span>
                            </label>
                            <input
                              type="password"
                              class="form-control"
                              v-model.lazy="$v.password.$model"
                              :class="{'is-invalid':$v.password.$error}"
                            />
                            <div class="invalid-feedback">
                              <div class="error" v-if="!$v.password.required">password is required</div>
                              <div
                                class="error"
                                v-if="!$v.password.minLength"
                              >Password must have atleast {{ $v.password.$params.minLength.min}} characters</div>
                            </div>
                          </div>
                        </div>
                        <div v-else class="col-md-6">
                          <div class="form-group">
                            <label>
                              GSTIN
                              <span class="mandatory">*</span>
                            </label>
                            <input
                              type="text"
                              class="form-control"
                              v-model.lazy="$v.gst.$model"
                              :class="{'is-invalid':$v.gst.$error}"
                            />
                            <div class="invalid-feedback">
                              <div class="error" v-if="!$v.gst.required">GSTIN is required</div>
                              <div class="error" v-if="!$v.gst.maxLength">Invalid GST Number</div>
                              <div class="error" v-if="!$v.gst.alphaNum">Only alphaNumeric allowed</div>
                              <div
                                class="error"
                                v-if="!$v.gst.minLength"
                              >GST number must have {{ $v.gst.$params.minLength.min}} characters</div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="row" v-if="mode=='user'">
                        <div class="col-md-6">
                          <div class="form-group">
                            <label>Address</label>
                            <textarea
                              name="shortDescription"
                              required
                              v-model.lazy="address"
                              rows="4"
                              class="form-control"
                            ></textarea>
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form-group">
                            <label>
                              Branch
                              <span class="mandatory">*</span>
                            </label>
                            <select
                              class="custom-select form-control"
                              required
                              v-model.lazy="branch"
                            >
                              <option
                                v-for="(a,index) in allBranch"
                                :key="index"
                                :value="a.branchId"
                              >{{a.branchName}}</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div class="row">
                        <div v-if="mode!='item' && mode!='user'" class="col-md-6">
                          <div class="form-group">
                            <label>Address</label>
                            <textarea
                              name="shortDescription"
                              v-model.lazy="address"
                              rows="4"
                              class="form-control"
                            ></textarea>
                          </div>
                        </div>
                        <div v-if="mode=='branch'" class="col-md-6">
                          <div class="form-group">
                            <label>
                              GSTIN
                              <span class="mandatory">*</span>
                            </label>
                            <input
                              type="text"
                              class="form-control"
                              v-model.lazy="$v.gst.$model"
                              :class="{'is-invalid':$v.gst.$error}"
                            />
                            <div class="invalid-feedback">
                              <div class="error" v-if="!$v.gst.required">GSTIN is required</div>
                              <div class="error" v-if="!$v.gst.maxLength">Invalid GST Number</div>
                              <div class="error" v-if="!$v.gst.alphaNum">Only alphaNumeric allowed</div>
                              <div
                                class="error"
                                v-if="!$v.gst.minLength"
                              >GST number must have {{ $v.gst.$params.minLength.min}} characters</div>
                            </div>
                          </div>
                        </div>
                        <div v-if="mode!='branch'" class="col-md-6"></div>
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
                                style="float:right"
                                class="btn btn-outline-primary"
                                type="button"
                                @click="goBack()"
                              >Cancel</button>
                            </div>
                            <div class="col-md-5 col-6">
                              <button
                                style="float:right;"
                                class="btn btn-primary ml-md-1"
                                type="button"
                                v-if="id==null"
                                @click="details()"
                              >Submit</button>
                              <button
                                style="float:right;"
                                class="btn btn-primary ml-md-1"
                                type="button"
                                v-else
                                @click="details()"
                              >Update</button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </fieldset>
                  </form>
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
import axios from 'axios'
import select2 from '../components/select2Component'
import vuelidate from '../plugins/vuelidate'
import {required,minLength,maxLength,alpha,numeric,email,alphaNum,decimal} from 'vuelidate/lib/validators'
import { helpers } from 'vuelidate/lib/validators'

export default {
  //middleware not working in component
  //  middleware ({ store, redirect }) {
  //     if (store.state.role!='operator') {
  //         return redirect('/Dashboard');
  //         console.log("Called");
  //     }
  // },
  components: {
    select2
  },

  filters: {
    capitalize: function(value) {
      if (!value) return "";
      value = value.toString();
      return value.charAt(0).toUpperCase() + value.slice(1);
    }
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
  data() {
    return {
      supplierList: [],
      selectedDefaultSupplier: "",
      name: "",
      mobNo: "",
      email: "",
      city: "",
      gst: "",
      address: "",
      price: "",
      gsm: 0,
      size: "",
      reorder: 0,
      branch: "",
      password: "",
      allBranch: [],
      role: "",
      allRole: [],
      isVisible: "",
      nameValid: true,
      emailValid: true
    };
  },
  validations: {
    name: {
      required,
      alpha: helpers.regex("alpha", /^[a-zA-Z\s.]*$/)
    },
    mobNo: {
      required,
      numeric,
      maxLength: maxLength(10),
      minLength: minLength(10)
    },
    email: {
      required,
      email
    },
    password: {
      required,
      minLength: minLength(5)
    },
    gst: {
      required,
      maxLength: maxLength(15),
      minLength: minLength(15),
      alphaNum
    },
    price: {
      required,
      decimal
    }
  },
  beforeCreate() {},
  mounted() {
    if (this.$store.state.role == "operator") {
      this.$router.push("/" + this.mode);
    }
    // console.log("Role= "+this.$store.state.role);
    if (this.mode == "item") {
      // console.log("Inside");
      const vueInstance = this;
      axios.get("http://localhost:4000/supplier").then(function(response) {
        const options = [{ id: 0, text: "Select Default Supplier" }];
        for (let index in response.data) {
          options.push({
            id: response.data[index].supplierEmailId,
            text: response.data[index].supplierName
          });
        }
        vueInstance.supplierList = options;
      });
    }
  },
  created() {
    if (this.mode == "user") {
      this.getUserDtl();
    }
    if (this.id != null) {
      this.getDetails();
    }
  },
  // watch:{
  //   name:function(val){
  //       console.log("Name= "+val);
  //   }
  // },
  methods: {
    getUserDtl() {
      axios.get("http://localhost:4000/branch/").then(res => {
        axios.get("http://localhost:4000/role/").then(res1 => {
          this.allBranch = res.data;
          this.allRole = res1.data;
        });
      });
    },
    details() {
      if (this.mode == "customer") {
        (this.password = "sample123"), (this.price = 100);
      } else if (this.mode == "supplier") {
        (this.password = "sample123"), (this.price = 100);
      } else if (this.mode == "user") {
        (this.price = 100), (this.gst = "GST123231231201");
      } else if (this.mode == "branch") {
        (this.password = "sample123"),
          (this.price = 100),
          (this.email = "sample@gmail.com");
      } else {
        (this.password = "sample123"),
          (this.mobNo = 9166711274),
          (this.email = "sample@gmail.com"),
          (this.gst = "GST123231231201");
      }
      this.$v.$touch();
      console.log("Inside my " + this.mode);

      if (this.$v.$invalid) {
        //invalid, becomes true when a validations return false
        //you have validation error.So do what u want to do here
        // Swal.DismissReason.backdrop,
        // Swal.fire({
        //     icon: 'error',
        //     title: 'Error!',
        //     text: 'There is something wrong',
        //     confirmButtonColor:'#4839eb',
        //     confirmButtonText: 'Ok'
        // })
        console.log("Inside invalid" + this.mode);
      } else {
        if (this.id == null) {
          if (this.mode == "customer") {
            axios
              .post("http://localhost:4000/" + this.mode + "/", {
                customerEmailId: this.email,
                customerName: this.name,
                customerAddress: this.address,
                customerPhoneNo: this.mobNo,
                customerGstNo: this.gst
              })
              .then(response => {
                if (response) {
                  Swal.DismissReason.backdrop,
                    Swal.fire({
                      icon: "success",
                      title: "Success!",
                      text: "Customer added Successfully.",
                      confirmButtonColor: "#4839eb",
                      confirmButtonText: "Ok"
                    });
                  this.$router.push("/customer");
                }
              });
          } else if (this.mode == "supplier") {
              if(this.emailValid == false){
                  return;
              }
            axios
              .post("http://localhost:4000/" + this.mode + "/", {
                supplierEmailId: this.email,
                supplierName: this.name,
                supplierAddress: this.address,
                supplierPhoneNo: this.mobNo,
                supplierGstNo: this.gst
              })
              .then(response => {
                if (response) {
                  Swal.DismissReason.backdrop,
                    Swal.fire({
                      icon: "success",
                      title: "Success!",
                      text: "Supplier added Successfully.",
                      confirmButtonColor: "#4839eb",
                      confirmButtonText: "Ok"
                    });
                  this.$router.push("/supplier");
                }
              });
          } else if (this.mode == "branch") {
              if(this.nameValid == false){
                        return;
                    }
            axios
              .post("http://localhost:4000/" + this.mode + "/", {
                branchName: this.name,
                branchAddress: this.address,
                branchPhoneNo: this.mobNo,
                gstNumber: this.gst
              })
              .then(response => {
                if (response) {
                  // console.log("Branch Added"+response.data);}
                  axios
                    .get("http://localhost:4000/item")
                    .then(res => {
                      let all = res.data;
                      return all;
                    })
                    .then(res2 => {
                      for (let i = 0; i < res2.length; i++) {
                        axios
                          .post("http://localhost:4000/stock", {
                            fkItemId: res2[i].itemId,
                            fkBranchId: response.data,
                            stockQuantity: 0
                          })
                          .then(res3 => {
                            // console.log("Done");
                          });
                      }
                    })
                    .then(res3 => {
                      Swal.DismissReason.backdrop,
                        Swal.fire({
                          icon: "success",
                          title: "Success!",
                          text: "Branch added Successfully.",
                          confirmButtonColor: "#4839eb",
                          confirmButtonText: "Ok"
                        });
                      this.$router.push("/branch");
                    });
                }
              });
          } else if (this.mode == "user") {
            axios
              .post("http://localhost:4000/" + this.mode + "/", {
                userEmailId: this.email,
                userName: this.name,
                userPassword: this.password,
                userAddress: this.address,
                userPhoneNo: this.mobNo,
                fkRoleId: null,
                fkBranchId: this.branch
              })
              .then(response => {
                if (response) {
                  Swal.DismissReason.backdrop,
                    Swal.fire({
                      icon: "success",
                      title: "Success!",
                      text: "User added Successfully.",
                      confirmButtonColor: "#4839eb",
                      confirmButtonText: "Ok"
                    });
                  this.$router.push("/user");
                }
              });
          } else {
            console.log("Inside Item");
            if(this.nameValid == false){
                        return;
                    }
            axios
              .post("http://localhost:4000/" + this.mode + "/", {
                name: this.name,
                gsm: this.gsm,
                size: this.size,
                minimumRate: this.price,
                reorderLevel: this.reorder,
                fkSupplierEmailId: this.selectedDefaultSupplier
              })
              .then(response => {
                if (response) {
                  // console.log(response.data);
                  axios
                    .get("http://localhost:4000/branch")
                    .then(res => {
                      let all = res.data;
                      return all;
                    })
                    .then(res2 => {
                      for (let i = 0; i < res2.length; i++) {
                        axios
                          .post("http://localhost:4000/stock", {
                            fkItemId: response.data,
                            fkBranchId: res2[i].branchId,
                            stockQuantity: 0
                          })
                          .then(res3 => {
                            // console.log("Done");
                          });
                      }
                    })
                    .then(res3 => {
                      Swal.DismissReason.backdrop,
                        Swal.fire({
                          icon: "success",
                          title: "Success!",
                          text:
                            "Item Succesfully Added + " +
                            this.selectedDefaultSupplier,
                          confirmButtonColor: "#4839eb",
                          confirmButtonText: "Ok"
                        });
                      // console.log(response);
                      this.$router.push("/item");
                    });
                }
              });
          }
        } else {
          if (this.mode == "customer") {
            axios
              .put("http://localhost:4000/" + this.mode + "/" + this.id, {
                customerEmailId: this.id,
                customerName: this.name,
                customerAddress: this.address,
                customerPhoneNo: this.mobNo,
                customerGstNo: this.gst
              })
              .then(response => {
                if (response) {
                  Swal.DismissReason.backdrop,
                    Swal.fire({
                      icon: "success",
                      title: "Success!",
                      text: "Customer Updated Successfully.",
                      confirmButtonColor: "#4839eb",
                      confirmButtonText: "Ok"
                    });
                  this.$router.push("/customer/" + this.id);
                }
              });
          } else if (this.mode == "supplier") {
            axios
              .put("http://localhost:4000/" + this.mode + "/" + this.id, {
                supplierId: this.id,
                supplierName: this.name,
                supplierAddress: this.address,
                supplierPhoneNo: this.mobNo,
                supplierGstNo: this.gst
              })
              .then(response => {
                if (response) {
                  Swal.DismissReason.backdrop,
                    Swal.fire({
                      icon: "success",
                      title: "Success!",
                      text: "Supplier Updated Successfully.",
                      confirmButtonColor: "#4839eb",
                      confirmButtonText: "Ok"
                    });
                  this.$router.push("/supplier/" + this.id);
                }
              });
          } else if (this.mode == "branch") {
            axios
              .put("http://localhost:4000/" + this.mode + "/" + this.id, {
                branchId: this.id,
                branchName: this.name,
                branchAddress: this.address,
                branchPhoneNo: this.mobNo,
                gstNumber: this.gst
              })
              .then(response => {
                if (response) {
                  Swal.DismissReason.backdrop,
                    Swal.fire({
                      icon: "success",
                      title: "Success!",
                      text: "Branch Updated Successfully.",
                      confirmButtonColor: "#4839eb",
                      confirmButtonText: "Ok"
                    });
                  // console.log(response);
                  this.$router.push("/branch/" + this.id);
                }
              });
          } else if (this.mode == "user") {
            axios
              .put("http://localhost:4000/" + this.mode + "/" + this.id, {
                userEmailId: this.email,
                userName: this.name,
                userPassword: this.password,
                userAddress: this.address,
                userPhoneNo: this.mobNo,
                fkRoleId: this.role,
                fkBranchId: this.branch
              })
              .then(response => {
                if (response) {
                  Swal.DismissReason.backdrop,
                    Swal.fire({
                      icon: "success",
                      title: "Success!",
                      text: "User Updated Successfully.",
                      confirmButtonColor: "#4839eb",
                      confirmButtonText: "Ok"
                    });
                  this.$router.push("/user");
                }
              });
          } else {
            axios
              .put("http://localhost:4000/" + this.mode + "/" + this.id, {
                itemId: this.id,
                name: this.name,
                gsm: this.gsm,
                size: this.size,
                minimumRate: this.price,
                reorderLevel: this.reorder,
                fkSupplierEmailId: this.selectedDefaultSupplier
              })
              .then(response => {
                if (response) {
                  Swal.DismissReason.backdrop,
                    Swal.fire({
                      icon: "success",
                      title: "Success!",
                      text: "Item Updated Successfully.",
                      confirmButtonColor: "#4839eb",
                      confirmButtonText: "Ok"
                    });
                  this.$router.push("/item/" + this.id);
                }
              });
          }
        }
      }
    },
    getDetails() {
      // console.log(this.mode);
      if (this.mode == "customer") {
        axios
          .get("http://localhost:4000/" + this.mode + "/" + this.id)
          .then(res => {
            let mydata = res.data[0];
            this.email = mydata.customerEmailId;
            this.name = mydata.customerName;
            this.address = mydata.customerAddress;
            this.mobNo = mydata.customerPhoneNo;
            this.gst = mydata.customerGstNo;
          });
      } else if (this.mode == "supplier") {
        axios
          .get("http://localhost:4000/" + this.mode + "/" + this.id)
          .then(res => {
            let mydata = res.data[0];
            this.email = mydata.supplierEmailId;
            this.name = mydata.supplierName;
            this.address = mydata.supplierAddress;
            this.mobNo = mydata.supplierPhoneNo;
            this.gst = mydata.supplierGstNo;
          });
      } else if (this.mode == "branch") {
        axios
          .get("http://localhost:4000/" + this.mode + "/" + this.id)
          .then(res => {
            let mydata = res.data[0];
            this.name = mydata.branchName;
            this.address = mydata.branchAddress;
            this.mobNo = mydata.branchPhoneNo;
            this.gst = mydata.gstNumber;
          });
      } else if (this.mode == "user") {
        axios
          .get("http://localhost:4000/" + this.mode + "/" + this.id)
          .then(res => {
            let mydata = res.data[0];
            this.email = mydata.userEmailId;
            this.name = mydata.userName;
            this.address = mydata.userAddress;
            this.mobNo = mydata.userPhoneNo;
            this.branch = mydata.fkBranchId;
            this.role = mydata.fkRoleId;
            this.password = mydata.userPassword;
          });
      } else {
        axios
          .get("http://localhost:4000/" + this.mode + "/" + this.id)
          .then(res => {
            let mydata = res.data[0];
            // console.log(res);
            this.name = mydata.name;
            this.gsm = mydata.gsm;
            this.size = mydata.size;
            this.price = mydata.minimumRate;
            this.reorder = mydata.reorderLevel;
            this.selectedDefaultSupplier = mydata.fkSupplierEmailId;
          });
      }
    },
    goBack() {
      this.$router.back();
    },
    checkEmail(){
        if (this.mode == "supplier"){
            axios
          .get("http://localhost:4000/" + this.mode + "/email/" + this.email)
          .then(res => {
              if (res.data.length > 0) {
              this.emailValid = false;
              console.log(this.emailValid);
            } else {
              this.emailValid = true;
              console.log(this.emailValid);

            }
          });
        
        }
    },  
    checkName() {
      if (this.mode == "item" || this.mode == "branch") {
        // console.log("Inside CheckNAme= "+val);
        // console.log("Inside CheckNAme= "+this.name);

        axios
          .get("http://localhost:4000/" + this.mode + "/name/" + this.name)
          .then(res => {
            if (res.data.length > 0) {
              this.nameValid = false;
            } else {
              this.nameValid = true;
            }
          });
      }
    }
  }
};
</script>
<style scoped>
.error {
  color: red;
  visibility: visible;
}

.mandatory {
  color: red;
  font-size: 15px;
}
</style>
