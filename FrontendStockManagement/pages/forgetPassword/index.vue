<template>
    <!-- BEGIN: Content-->
    <div class="app-content content">
        <div class="content-overlay"></div>
        <div class="header-navbar-shadow"></div>
        <div class="content-wrapper">
            <div class="content-header row">
            </div>
            <div class="content-body">
                <section class="row flexbox-container">
                    <div class="col-xl-7 col-md-9 col-10 d-flex justify-content-center px-0">
                        <div class="card bg-authentication rounded-0 mb-0">
                            <div class="row m-0">
                                <div class="col-lg-6 d-lg-block d-none text-center align-self-center">
                                    <img src="/app-assets/images/pages/forgot-password.png" alt="branding logo">
                                </div>
                                <div class="col-lg-6 col-12 p-0" v-if="changePass==false">
                                    <div class="card rounded-0 mb-0 px-2 py-1">
                                        <div class="card-header pb-1">
                                            <div class="card-title">
                                                <h4 class="mb-0">Recover your password</h4>
                                            </div>
                                        </div>
                                        <p class="px-2 mb-0" v-if="otpSent==false">Please enter your email address and we'll send you OTP on that email to reset your password.</p>
                                        <p class="px-2 mb-0" v-else>OTP Sent to your mentioned Email Address and please enter OTP to reset your password</p>                                        
                                        <div class="card-content">
                                            <div class="card-body">
                                                <form action="index.html">
                                                    <div class="form-label-group">
                                                        <input type="email" class="form-control" :disabled="otpSent" placeholder="Email" v-model="email">
                                                        <label for="inputEmail">Email</label>
                                                    </div>
                                                    <div class="form-label-group" v-if="otpSent">
                                                        <input type="text" class="form-control" placeholder="Enter OTP" v-model="otp">
                                                        <label for="inputEmail">OTP</label>
                                                    </div>
                                                </form>
                                                <div class="float-md-left d-block mb-1">
                                                    <a href="/login" class="btn btn-outline-primary btn-block px-75">Back to Login</a>
                                                </div>
                                                <div class="float-md-right d-block mb-1" v-if="otpSent==false">
                                                    <a href="#" class="btn btn-primary btn-block px-75" @click="sendOTP()" v-if="loading==false">Send</a>
                                                    <span v-else>
                                                        <button class="btn btn-primary mb-1" type="button" disabled>
                                                            <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                                            <span class="sr-only">Loading...</span>
                                                            Sending OTP
                                                        </button>
                                                    </span>
                                                </div>
                                                <div class="float-md-right d-block mb-1" v-else>
                                                    <a href="#" class="btn btn-primary btn-block px-75" @click="verifyOTP()">Submit</a>
                                                </div>
                                                
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-6 col-12 p-0" v-else>
                                    <div class="card rounded-0 mb-0 px-2 py-1">
                                        <div class="card-header pb-1">
                                            <div class="card-title">
                                                <h4 class="mb-0">Change your password</h4>
                                            </div>
                                        </div>
                                        <p class="px-2 mb-0">OTP is valid.Now Please enter your New Password to reset your Password.</p>
                                        <div class="card-content">
                                            <div class="card-body">
                                                <form action="index.html">
                                                    <div class="row">
                                                            <div class="col-md-12">
                                                                <div class="form-group">
                                                                    <label >New Password*</label>                                                            
                                                                    <input type="text" required class="form-control " v-model="newPass">
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="row">
                                                            <div class="col-md-12">
                                                                <div class="form-group">
                                                                    <label >Confirm Password*</label>                                                            
                                                                    <input type="text" required class="form-control " v-model="conPass">
                                                                </div>
                                                            </div>
                                                        </div>
                                                </form>
                                                <div class="float-md-right d-block mb-1" >
                                                    <a href="#" class="btn btn-primary btn-block px-75" @click="chngPass()">Change</a>
                                                </div>
                                                
                                            </div>
                                        </div>
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
import axios from 'axios';
const crypto= require('crypto');
export default {
    //layout:"dashboard",
    middleware: "authentication2",
    data(){
        return{
            loading:false,
            otpSent:false,
            email:"",
            otp:"",
            changePass:false,
            newPass:"",
            conPass:""
        }
    },
    beforeMount(){
        this.addClass();
    },        
    destroyed(){

    },
    methods:{
        
        addClass(){
                 let d=document.body;
                 d.classList.add("1-column");
                 d.classList.add("bg-full-screen-image");
                 d.classList.add("blank-page");
                 d.classList.add("pace-done");
                 d.classList.add("menu-expanded");
        },
        sendOTP(){
            axios.get("http://localhost:4000/User/"+this.email)
            .then(res=>{
                if(res.data[0]!=null){
                    this.loading=true;
                    // console.log(datetime);
                    // datetime.setMinutes(datetime.getMinutes() + 5)
                    let curr=new Date();
                    let exp=new Date(res.data[0].otpTime);
                    // console.log(curr);
                    // console.log(exp);
                    // console.log(res.data[0].otp);
                    if(res.data[0].otp==0 || curr>exp){
                        // console.log("Expired");
                        axios.get("http://localhost:4000/sendMail/"+this.email)
                        .then(res1=>{
                            if(res1){
                                this.otpSent=true;
                                this.loading=false;
                            }
                        });
                    }
                    else{
                        this.loading=false;
                        alert("OTP has Already been Sent to this Email");
                        this.otpSent=true;
                    }
                    
                }
                else{
                    alert("Please Enter Valid Email");
                    this.loading=false;
                }
            })
        },
        verifyOTP(){
            if(this.otp==""){
                alert("Enter Valid OTP");
            }
            else{
                axios.get("http://localhost:4000/User/"+this.email)
                .then(res=>{
                    if(res.data[0].otp==this.otp){
                        let curr=new Date();
                        let exp=new Date(res.data[0].otpTime)
                        if(curr>exp){
                            alert("OTP has Already Expired");
                            window.location.reload();
                        }
                        else{
                            this.changePass=true;
                        }
                    }
                    else{
                        alert("Please Enter Valied OTP");
                    }
                });    
            }
        },
        chngPass(){
                            if(this.newPass==this.conPass){
                                console.log(this.newPass+"  -  "+this.conPass+" - "+this.email)
                                axios.put("http://localhost:4000/changepassword/",{
                                    userEmailId:this.email,
                                    userPassword:this.newPass
                                })
                                .then(res1=>{
                                    console.log(res1);
                                    alert("Password Changed Successfuly");
                                    window.location="/login";                                    
                                })

                            }
                            else{
                                alert("New Password and Confirm Password should be same");
                            }
        }
    }
}
</script>
<style>
    /* .content-body{
        background-image: url("/app-assets/images/pages/login-bg-13.jpg");
        background-repeat: no-repeat;
    } */

</style>
