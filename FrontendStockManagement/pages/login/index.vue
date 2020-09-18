<template>
  <div class="app-content content">
    <div class="content-overlay"></div>
    <div class="header-navbar-shadow"></div>
    <div class="content-wrapper">
      <div class="content-header row"></div>
      <div class="content-body">
        <section class="row flexbox-container">
          <div class="col-xl-8 col-11 d-flex justify-content-center">
            <div class="card bg-authentication rounded-0 mb-0">
              <div class="row m-0">
                <div class="col-lg-6 d-lg-block d-none text-center align-self-center px-1 py-0">
                  <img src="/app-assets/images/pages/register.jpg" alt="branding logo" />
                </div>
                <div class="col-lg-6 col-12 p-0">
                  <div class="card rounded-0 mb-0 px-2">
                    <div class="card-header pb-1">
                      <div class="card-title">
                        <h4 class="mb-0">Login</h4>
                      </div>
                    </div>
                    <p class="px-2">Welcome back, please login to your account.</p>
                    <div class="card-content">
                      <div class="card-body pt-1">
                        <form @submit.prevent="login()">
                          <fieldset
                            class="form-label-group form-group position-relative has-icon-left"
                          >
                            <input
                              type="text"
                              class="form-control"
                              v-model="email"
                              placeholder="Username"
                              required
                            />
                            <div class="form-control-position">
                              <i class="feather icon-user"></i>
                            </div>
                            <label for="user-name">Email</label>
                          </fieldset>

                          <fieldset class="form-label-group position-relative has-icon-left">
                            <input
                              type="password"
                              class="form-control"
                              v-model="password"
                              placeholder="Password"
                              required
                            />
                            <div class="form-control-position">
                              <i class="feather icon-lock"></i>
                            </div>
                            <label for="user-password">Password</label>
                          </fieldset>
                          <div class="form-group d-flex justify-content-between align-items-center">
                            <div class="text-left">
                              <fieldset class="checkbox">
                                <div class="vs-checkbox-con vs-checkbox-primary">
                                  <!-- <input type="checkbox" />
                                  <span class="vs-checkbox">
                                    <span class="vs-checkbox--check">
                                      <i class="vs-icon feather icon-check"></i>
                                    </span>
                                  </span>
                                  <span class>Remember me</span>-->
                                </div>
                              </fieldset>
                            </div>
                            <div class="text-right">
                              <a @click="forget()" class="card-link">Forgot Password?</a>
                            </div>
                          </div>

                          <input
                            type="submit"
                            class="btn btn-primary float-right btn-inline"
                            value="Login"
                          />
                        </form>
                      </div>
                    </div>
                    <div class="login-footer"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
  <!-- END: Content-->
</template>
<script>
import axios from "axios";
const crypto = require("crypto");
export default {
  //layout:"dashboard",
  middleware: "authentication2",
  data() {
    return {
      email: "",
      password: ""
    };
  },
  beforeMount() {
    this.addClass();
  },
  destroyed() {},
  methods: {
    addClass() {
      let d = document.body;
      d.classList.add("1-column");
      d.classList.add("bg-full-screen-image");
      d.classList.add("blank-page");
      d.classList.add("pace-done");
      d.classList.add("menu-expanded");
    },
    forget() {
      this.$router.push("/forgetPassword/");
    },
    login() {
      axios
        .post("http://localhost:4000/login/", {
          userEmailId: this.email,
          userPassword: this.password
        })
        .then(res => {
          if (res) {
            let cookieVal = {
              userEmail: res.data[0].userEmailId,
              userRole: res.data[0].fkRoleId == null ? "operator" : "admin"
            };
            let mykey = crypto.createCipher("aes-128-ecb", "123");
            let cookieValue = mykey.update(
              JSON.stringify(cookieVal),
              "utf8",
              "hex"
            );
            cookieValue += mykey.final("hex");
            this.$cookies.set("_sessionId", cookieValue, {
              path: "/",
              maxAge: 60 * 60 * 24 * 7
            });
          }
        })
        .then(res1 => {
          window.location = "/dashboard";
        })
        .catch(err => {
          alert("Invalid Login Username and/or Password");
        });
    }
  }
};
</script>
<style>
/* .content-body{
        background-image: url("/app-assets/images/pages/login-bg-13.jpg");
        background-repeat: no-repeat;
    } */
</style>
