<template>
    <span >

    <!-- BEGIN: Header-->
    <nav class="header-navbar navbar-expand-lg navbar navbar-with-menu floating-nav navbar-light navbar-shadow">
        <div class="navbar-wrapper">
            <div class="navbar-container content">
                <div class="navbar-collapse" id="navbar-mobile">
                    <div class="mr-auto float-left bookmark-wrapper d-flex align-items-center">
                        <ul class="nav navbar-nav">
                            <li class="nav-item mobile-menu d-xl-none mr-auto"><a class="nav-link nav-menu-main menu-toggle hidden-xs" @click="openNav()" ><div class="fonticon-wrap"><i class="fa fa-bars"></i></div></a></li>
                        </ul>
                    </div>
                    <ul class="nav navbar-nav "> 
                        <li class="d-flex align-items-center">
                            <h6 class="mx-0">Cash Tally = {{cashSale}} Rs.</h6>
                        </li>
                        <li class="dropdown dropdown-user nav-item"><a class="dropdown-toggle nav-link dropdown-user-link" data-toggle="dropdown">
                                <div class="user-nav d-sm-flex d-none"><span class="user-name text-bold-600">{{username}}</span></div><span><img class="round" src="/app-assets/images/portrait/small/avatar.jpg" alt="avatar" height="40" width="40"></span>
                            </a>
                            <div class="dropdown-menu dropdown-menu-right">
                                <a class="dropdown-item" data-toggle="modal" data-target="#exampleModalCenter"><i class="feather icon-mail"></i> Change Password</a>
                                <div class="dropdown-divider"></div><a class="dropdown-item" @click="logout()" ><i class="feather icon-power"></i> Logout</a>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </nav>
    <ul class="main-search-list-defaultlist d-none">
        <li class="d-flex align-items-center"><a class="pb-25" >
                <h6 class="text-primary mb-0">Files</h6>
            </a></li>
        <li class="auto-suggestion d-flex align-items-center cursor-pointer"><a class="d-flex align-items-center justify-content-between w-100" >
                <div class="d-flex">
                    <div class="mr-50"><img src="/app-assets/images/icons/xls.png" alt="png" height="32"></div>
                    <div class="search-data">
                        <p class="search-data-title mb-0">Two new item submitted</p><small class="text-muted">Marketing Manager</small>
                    </div>
                </div><small class="search-data-size mr-50 text-muted">&apos;17kb</small>
            </a></li>
        <li class="auto-suggestion d-flex align-items-center cursor-pointer"><a class="d-flex align-items-center justify-content-between w-100" >
                <div class="d-flex">
                    <div class="mr-50"><img src="/app-assets/images/icons/jpg.png" alt="png" height="32"></div>
                    <div class="search-data">
                        <p class="search-data-title mb-0">52 JPG file Generated</p><small class="text-muted">FontEnd Developer</small>
                    </div>
                </div><small class="search-data-size mr-50 text-muted">&apos;11kb</small>
            </a></li>
        <li class="auto-suggestion d-flex align-items-center cursor-pointer"><a class="d-flex align-items-center justify-content-between w-100" >
                <div class="d-flex">
                    <div class="mr-50"><img src="/app-assets/images/icons/pdf.png" alt="png" height="32"></div>
                    <div class="search-data">
                        <p class="search-data-title mb-0">25 PDF File Uploaded</p><small class="text-muted">Digital Marketing Manager</small>
                    </div>
                </div><small class="search-data-size mr-50 text-muted">&apos;150kb</small>
            </a></li>
        <li class="auto-suggestion d-flex align-items-center cursor-pointer"><a class="d-flex align-items-center justify-content-between w-100" >
                <div class="d-flex">
                    <div class="mr-50"><img src="/app-assets/images/icons/doc.png" alt="png" height="32"></div>
                    <div class="search-data">
                        <p class="search-data-title mb-0">Anna_Strong.doc</p><small class="text-muted">Web Designer</small>
                    </div>
                </div><small class="search-data-size mr-50 text-muted">&apos;256kb</small>
            </a></li>
        <li class="d-flex align-items-center"><a class="pb-25" >
                <h6 class="text-primary mb-0">Members</h6>
            </a></li>
        <li class="auto-suggestion d-flex align-items-center cursor-pointer"><a class="d-flex align-items-center justify-content-between py-50 w-100" >
                <div class="d-flex align-items-center">
                    <div class="avatar mr-50"><img src="/app-assets/images/portrait/small/avatar-s-8.jpg" alt="png" height="32"></div>
                    <div class="search-data">
                        <p class="search-data-title mb-0">John Doe</p><small class="text-muted">UI designer</small>
                    </div>
                </div>
            </a></li>
        <li class="auto-suggestion d-flex align-items-center cursor-pointer"><a class="d-flex align-items-center justify-content-between py-50 w-100" >
                <div class="d-flex align-items-center">
                    <div class="avatar mr-50"><img src="/app-assets/images/portrait/small/avatar-s-1.jpg" alt="png" height="32"></div>
                    <div class="search-data">
                        <p class="search-data-title mb-0">Michal Clark</p><small class="text-muted">FontEnd Developer</small>
                    </div>
                </div>
            </a></li>
        <li class="auto-suggestion d-flex align-items-center cursor-pointer"><a class="d-flex align-items-center justify-content-between py-50 w-100" >
                <div class="d-flex align-items-center">
                    <div class="avatar mr-50"><img src="/app-assets/images/portrait/small/avatar-s-14.jpg" alt="png" height="32"></div>
                    <div class="search-data">
                        <p class="search-data-title mb-0">Milena Gibson</p><small class="text-muted">Digital Marketing Manager</small>
                    </div>
                </div>
            </a></li>
        <li class="auto-suggestion d-flex align-items-center cursor-pointer"><a class="d-flex align-items-center justify-content-between py-50 w-100" >
                <div class="d-flex align-items-center">
                    <div class="avatar mr-50"><img src="/app-assets/images/portrait/small/avatar-s-6.jpg" alt="png" height="32"></div>
                    <div class="search-data">
                        <p class="search-data-title mb-0">Anna Strong</p><small class="text-muted">Web Designer</small>
                    </div>
                </div>
            </a></li>
    </ul>
    <ul class="main-search-list-defaultlist-other-list d-none">
        <li class="auto-suggestion d-flex align-items-center justify-content-between cursor-pointer"><a class="d-flex align-items-center justify-content-between w-100 py-50">
                <div class="d-flex justify-content-start"><span class="mr-75 feather icon-alert-circle"></span><span>No results found.</span></div>
            </a></li>
    </ul>
                                            <!-- Modal -->
                                        <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                                            <div class="modal-dialog modal-dialog-centered modal-dialog-centered modal-dialog-scrollable" role="document">
                                                <div class="modal-content">
                                                    <div class="modal-header">
                                                        <h5 class="modal-title" id="exampleModalCenterTitle">Vertically Centered</h5>
                                                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                            <span aria-hidden="true">&times;</span>
                                                        </button>
                                                    </div>
                                                    <div class="modal-body">
                                                        <div class="row">
                                                            <div class="col-md-12">
                                                                <div class="form-group">
                                                                    <label >Current Password*</label>                                                            
                                                                    <input type="text" required class="form-control " v-model="currPass">
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="row">
                                                            <div class="col-md-12">
                                                                <div class="form-group">
                                                                    <label >New Password*</label>                                                            
                                                                    <input type="password" required class="form-control " v-model="newPass">
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="row">
                                                            <div class="col-md-12">
                                                                <div class="form-group">
                                                                    <label >Confirm Password*</label>                                                            
                                                                    <input type="password" required class="form-control " v-model="conPass">
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div  class="row">
                                                            <div class="col-md-10 col-4"></div>
                                                            <div class="col-md-2 col-8" >
                                                                <div class="form-group">
                                                                    <button style="float:right;" class="btn btn-primary" type="button" @click="chngPass()">Change</button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="modal-footer">
                                                        <button type="button" id="modalClose" class="btn btn-outline-light waves-effect waves-light" data-dismiss="modal">Close</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                  
    <!-- END: Header-->


    <!-- BEGIN: Main Menu-->
    <div class="main-menu menu-fixed menu-light menu-accordion menu-shadow" data-scroll-to-active="true">
        <div class="navbar-header">
            <ul class="nav navbar-nav flex-row">
                <li class="nav-item mr-auto">
                    <a class="navbar-brand">
                        <img src="../static/vardhman-logo.jpg" width="100%">

                        <!-- <div class="brand-logo"></div>
                        <h4 class="brand-text mb-0">Vardmaan</h4> -->
                    </a>
                </li>
               <!-- <li class="nav-item nav-toggle"><a class="nav-link modern-nav-toggle pr-0" data-toggle="collapse"><i class="feather icon-x d-block d-xl-none font-medium-4 primary toggle-icon"></i><i class="toggle-icon feather icon-disc font-medium-4 d-none d-xl-block collapse-toggle-icon primary" data-ticon="icon-disc"></i></a></li> -->
            </ul>
        </div>
        <div class="shadow-bottom"></div>
        <div class="main-menu-content" style="margin-top:10px">
            <ul class="navigation navigation-main" id="main-menu-navigation" data-menu="menu-navigation">
                <li v-if="$store.state.role!='operator'" class="nav-item" style="margin-bottom:10px;">
                    <select2
                            :options="allBranch"
                            v-model="myBranch"
                            classes="form-control col-md-12"
                    ></select2>
                </li>
                <li class=" nav-item active">
                    <nuxt-link to="/dashboard" class="name-linking" data-i18n="Dashboard"><i class="feather icon-home"></i>Dashboard</nuxt-link>
                    <!-- <router-link class="text-uppercase name-linking" :to="'/Dashboard'">
                        <i class="feather icon-home"></i><span class="menu-title" data-i18n="Dashboard">Dashboard</span></a>
                    </router-link> -->
                <li class="navigation-header">
                    <span>Master Modules</span>
                </li>
                <li class=" nav-item">
                    <nuxt-link to="/customer" data-i18n="Customers"><i class="feather icon-users"></i>Customers</nuxt-link>
                </li>
                <li class=" nav-item">
                    <nuxt-link to="/supplier" data-i18n="Suppliers"><i class="feather icon-users"></i>Suppliers</nuxt-link>
                </li>
                <li class=" nav-item">
                    <nuxt-link to="/item" data-i18n="Items"><i class="feather icon-file"></i>Items</nuxt-link>
                </li>
                <li class=" nav-item">
                    <nuxt-link to="/user" data-i18n="User "><i class="feather icon-users"></i>User </nuxt-link>
                </li>
                <li class=" nav-item">
                    <nuxt-link to="/branch" data-i18n="Branch "><i class="feather icon-map"></i>Branch </nuxt-link>
                </li>
                <li class=" navigation-header">
                    <span>Transaction Modules</span>
                </li>
                <li class=" nav-item">
                    <nuxt-link to="/sale" data-i18n="Sale"><i class="feather icon-bar-chart-2"></i>Sale</nuxt-link>
                </li>
                <li class=" nav-item">
                    <nuxt-link to="/purchase" data-i18n="Purchase"><i class="feather icon-shopping-cart"></i>Purchase</nuxt-link>
                </li>
                <li class=" nav-item">
                    <nuxt-link to="/stock" data-i18n="Purchase"><i class="feather icon-shopping-cart"></i>Stock</nuxt-link>
                </li>
                <li class=" navigation-header" v-if="$store.state.role!='operator'">
                    <span>Report Modules</span>
                </li>
                <li class=" nav-item" v-if="$store.state.role!='operator'">
                    <nuxt-link to="/purchaseReport" data-i18n="Purchase Report"><i class="feather icon-file-text"></i>Purchase Report</nuxt-link>
                </li>
                <li class=" nav-item" v-if="$store.state.role!='operator'">
                    <nuxt-link to="/saleReport" data-i18n="Sales Report"><i class="feather icon-file-text"></i>Sale Report</nuxt-link>
                </li>
                <li class=" nav-item" v-if="$store.state.role!='operator'">
                    <nuxt-link to="/debtorReport" data-i18n="Debtor Report"><i class="feather icon-file-text"></i>Debtor Report</nuxt-link>
                </li>

                <!-- Commented by Maulik -->
                <!-- <li class=" nav-item">
                   <nuxt-link to="#" data-i18n="Generate Report"><i class="feather icon-file-text"></i><span class="menu-title">Generate Report</span></nuxt-link>
                    <ul class="menu-content">
                        <li><nuxt-link to="/purchaseReport" data-i18n="Purchase Report"><i class="feather icon-circle"></i><span class="menu-item" >Purchase Report</span></nuxt-link>
                        </li>
                        <li><nuxt-link to="/saleReport" data-i18n="Sales Report"><i class="feather icon-circle"></i><span class="menu-item" >Sale Report</span></nuxt-link></li>
                    </ul>
                </li> -->



                <!-- <li class=" nav-item"><a href="/purchase/"><i class="feather icon-shopping-cart"></i><span class="menu-title" data-i18n="User">Purchase</span></a>
                    <ul class="menu-content">
                        <li>
                            <a href="javascript:;">
                                <i class="feather icon-circle"></i>
                                <span class="menu-item" >View</span>
                            </a>
                        </li>
                        <li><a ><i class="feather icon-circle"></i><span class="menu-item" data-i18n="View">View</span></a>
                        </li>
                    </ul>
                </li>  -->
            </ul>
        </div>
    </div>
    <!-- END: Main Menu-->

    <!-- BEGIN: Content-->
    <div class="app-content content">
            <div class="content-overlay"></div>
        <div class="header-navbar-shadow"></div>
            <nuxt/>                        
    </div>
    <!-- END: Content-->
</span>
</template>
<script>
import '@/plugins/echarts'
const crypto = require('crypto')
import axios from 'axios' 
import select2 from '@/components/select2Component';

export default {
    middleware: "authentication",

    mounted(){

        this.addClasses();
        if(window.innerWidth < 767){
            let d=document.body;
            d.classList.remove("vertical-menu-modern");
            d.classList.add("vertical-verlay-menu");
        }
        else{
            let d=document.body;
            d.classList.add("vertical-menu-modern");
        }	
    },
    components:{
    select2
},
    data(){
        return{
            username:"",
            currPass:"",
            newPass:"",
            conPass:"",
            allBranch:[],
            myBranch:"500",
            cashSale:0
        }
    },
    created(){
        this.getUserName();
    },
    mounted(){
    },
    watch:{
        myBranch: function (val) {
            this.$store.commit('setBranchId', this.myBranch);
            // console.log("In dashboard= "+this.$store.state.selectedBranchId);
       }
    
    },
    methods:{
        // send(mode){
        //     console.log("gg");
        //     if(mode=="customer")
        //         this.$router.push('/Customers/View');
        //     else if(mode=="supplier")    
        //         this.$router.push('/Suppliers/View');
        //     else    
        //         this.$router.push('/Items/View');
        // },
        getUserName(){
                axios.get("http://localhost:4000/user/"+this.$store.state.user)
                  .then(res=>{
                        // console.log("Username= "+this.$store.state.user);
                        this.username=res.data[0].userName;
                        // this.$store.commit('setBranchId', res.data[0].fkBranchId);
                        this.getBranch(res.data[0].fkBranchId);
                        axios.get('http://localhost:4000/branch/'+res.data[0].fkBranchId)
                        .then(res1=>{
                            // console.log(res1.data);
                            this.cashSale=res1.data[0].cash;
                        });

                  })
        },
        getBranch(id){
                axios.get('http://localhost:4000/branch').then(res=>{
                    const options=[];
                    
                    for(let index in res.data){
                        if(res.data[index].branchId!=id){
                            // console.log(res.data[index].branchName);
                            // this.myBranch=res.data[index].branchName;
                            options.push({
                                "id": res.data[index].branchId,
                                "text": res.data[index].branchName
                            });
                        //     let a=document.getElementById("insertBranchName");
                        //     let s=document.createTextNode(this.myBranch);
                        //     a.appendChild(s);
                        }
                        else{
                            options.unshift({
                                "id": res.data[index].branchId,
                                "text": res.data[index].branchName
                            });
                        }
                    }
                    // console.log(options)
                    options.push({
                                "id": 100,
                                "text": "All"                        
                    });
                    return options;
                })
                .then(res4=>{
                this.allBranch=res4;
                this.myBranch=id;
                    // console.log(this.itemList);
            });
        },
        chngPass(){
            axios.get("http://localhost:4000/user/"+this.$store.state.user)
                  .then(res=>{
                        if(this.currPass==res.data[0].userPassword){
                            if(this.newPass==this.conPass){
                                if(this.newPass!=this.currPass){
                                    axios.put("http://localhost:4000/changepassword/",{
                                    userEmailId:this.$store.state.user,
                                    userPassword:this.newPass
                                    })
                                    .then(res1=>{
                                        // console.log(res1);
                                        this.currPass="";
                                        this.newPass="";
                                        this.conPass="";
                                        Swal.DismissReason.backdrop,
                                        Swal.fire({
                                                icon: 'success',
                                                title: 'Success!',
                                                text: 'Password Changed Successfully.',
                                                confirmButtonColor:'#4839eb',
                                                confirmButtonText: 'Ok'  
                                                })
                                                $("#modalClose").click();                             
                                    })
                                }
                                else{
                                    Swal.DismissReason.backdrop,
                                    Swal.fire({
                                            type: 'error',
                                            title: 'Oops...',
                                            text: 'Your New Password is Same as your Old Password',
                                            confirmButtonColor:'red',
                                            confirmButtonText: 'Ok'  
                                            })
                                }

                            }
                            else{
                                Swal.DismissReason.backdrop,
                                    Swal.fire({
                                            type: 'error',
                                            title: 'Oops...',
                                            text: 'New Password and Confirm Password should be same',
                                            confirmButtonColor:'red',
                                            confirmButtonText: 'Ok'  
                                            })
                            }
                        }
                        else{
                            Swal.DismissReason.backdrop,
                                    Swal.fire({
                                            type: 'error',
                                            title: 'Oops...',
                                            text: 'Current Password is not Correct',
                                            confirmButtonColor:'red',
                                            confirmButtonText: 'Ok'  
                                            })
                        }
                  });
        },
        logout(){
            try{
		  		this.$cookies.remove("_sessionId");
           		window.location='/login'
               }
               catch{
                   this.$cookies.remove("_sessionId");
           		window.location='/login'
                   
			   }
        },
        addClasses(){
            let d=document.body;
            d.classList.add("vertical-layout");
            d.classList.add("2-columns");
            d.classList.add("navbar-floating");
            d.classList.add("footer-static");
            d.setAttribute("data-open","click");
            d.setAttribute("data-menu","vertical-menu-modern");
            d.setAttribute("data-col","2-columns");
            // console.log(document.body);
            // vertical-layout 2-columns navbar-floating footer-static pace-done vertical-overlay-menu menu-open
            // overflow:auto overflow:hidden
        },
        openNav(){
            let d=document.body;
            d.classList.remove("menu-hide");            
            d.classList.add("menu-open");
            // console.log(window.innerWidth);
            // console.log(document.body);

        },
        closeNav(){
            let d=document.body;
            d.classList.remove("menu-open");
            d.classList.add("menu-hide");
        }
    }
}
</script>

<style scoped>
@media only screen and (max-width: 767px){
    .content{
        margin-left: 0;
     }
}   
a .menu-title::after{
 content: "\f105";
    font-family: 'FontAwesome';
    font-size: 1.1rem;
    display: inline-block;
    position: absolute;
    right: 25px;
    top: 10px;
    transform: rotate(0deg);
    transition: -webkit-transform 0.2s ease-in-out; }
</style>
