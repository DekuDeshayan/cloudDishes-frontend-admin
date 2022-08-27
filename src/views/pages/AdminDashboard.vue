<template>
    <!-- Content Header (Page header) -->
    <div class="content-header">
        <div class="container-fluid">
        <div class="row mb-2">
            <div class="col-sm-6">
            <h1 class="m-0">Dashboard</h1>
            </div><!-- /.col -->
            <div class="col-sm-6">
            <ol class="breadcrumb float-sm-right">
                <li class="breadcrumb-item"><a href="#">Home</a></li>
                <li class="breadcrumb-item active">Dashboard</li>
            </ol>
            </div><!-- /.col -->
        </div><!-- /.row -->
        </div><!-- /.container-fluid -->
    </div>
    <!-- /.content-header -->
    <!-- Main content -->
    <div class="content">
      <div class="container-fluid">
        <div class="row">
<div class="col-lg-3 col-6">
<!-- small box -->
<div class="small-box bg-info">
    <div class="inner">
    <h3>{{orderList.length}}</h3>

    <p>All orders</p>
    </div>
    <div class="icon">
    <i class="fas fa-truck"></i>
    </div>
    <router-link to="/orders" class="small-box-footer">More info <i class="fas fa-arrow-circle-right"></i></router-link>
</div>
</div>
<!-- ./col -->
<div class="col-lg-3 col-6">
<!-- small box -->
<div class="small-box bg-info">
    <div class="inner">
    <h3>{{reservationList.length}}</h3>

    <p>All Reservations</p>
    </div>
    <div class="icon">
    <i class="fas fa-utensils"></i>
    </div>
    <routerLink to="/reservations" class="small-box-footer">More info <i class="fas fa-arrow-circle-right"></i></routerLink>
</div>
</div>
<!-- ./col -->
<div class="col-lg-3 col-6">
<!-- small box -->
<div class="small-box bg-info">
    <div class="inner">
    <h3>{{customerList.length}}</h3>

    <p>Customers</p>
    </div>
    <div class="icon">
    <i class="ion ion-person-add"></i>
    </div>
    <router-link to="/Customer" class="small-box-footer">More info <i class="fas fa-arrow-circle-right"></i></router-link>
</div>
</div>
<!-- ./col -->
<div class="col-lg-3 col-6">
<!-- small box -->
<div class="small-box bg-info">
    <div class="inner">
    <h3>{{restaurantList.length}}</h3>

    <p>All Restaurants</p>
    </div>
    <div class="icon">
    <i class="nav-icon fas fa-hotel"></i>
    </div>
    <router-link to="/restaurants" class="small-box-footer">More info <i class="fas fa-arrow-circle-right"></i></router-link>
</div>
</div>
<!-- ./col -->
</div>


<div class="row">
    <div class="col-lg-6">
    <div class="card">
        <div class="card-header border-0">
        <div class="d-flex justify-content-between">
            <h3 class="card-title">CloudDishes website Visitors</h3>
            <!-- <a href="javascript:void(0);">View Report</a> -->
        </div>
        </div>
        <div class="card-body">
        <div class="d-flex">
            <p class="d-flex flex-column">
            <span class="text-bold text-lg">820</span>
            <span>Visitors Over Time</span>
            </p>
            <p class="ml-auto d-flex flex-column text-right">
            <span class="text-success">
                <i class="fas fa-arrow-up"></i> 12.5%
            </span>
            <span class="text-muted">Since last week</span>
            </p>
        </div>
        <!-- /.d-flex -->

        <div class="position-relative mb-4">
            <canvas id="visitors-chart" height="200"></canvas>
        </div>

        <div class="d-flex flex-row justify-content-end">
            <span class="mr-2">
            <i class="fas fa-square text-primary"></i> This Week
            </span>

            <span>
            <i class="fas fa-square text-gray"></i> Last Week
            </span>
        </div>
        </div>
    </div>
    <!-- /.card -->

    </div>

    <!-- /.col-md-6 -->
    <div class="col-lg-6">
    <div class="card">
        <div class="card-header border-0">
        <div class="d-flex justify-content-between">
            <h3 class="card-title">Sales</h3>
            <!-- <a href="javascript:void(0);">View Report</a> -->
        </div>
        </div>
        <div class="card-body">
        <div class="d-flex">
            <p class="d-flex flex-column">
            <span class="text-bold text-lg">$18,230.00</span>
            <span>Sales Over Time</span>
            </p>
            <p class="ml-auto d-flex flex-column text-right">
            <span class="text-success">
                <i class="fas fa-arrow-up"></i> 33.1%
            </span>
            <span class="text-muted">Since last month</span>
            </p>
        </div>
        <!-- /.d-flex -->

        <div class="position-relative mb-4">
            <canvas id="sales-chart" height="200"></canvas>
        </div>

        <div class="d-flex flex-row justify-content-end">
            <span class="mr-2">
            <i class="fas fa-square text-primary"></i> This year
            </span>

            <span>
            <i class="fas fa-square text-gray"></i> Last year
            </span>
        </div>
        </div>
    </div>
    <!-- /.card -->
    </div>

    <!-- /.col-md-6 -->
</div>
<!-- /.row -->
      </div>
    </div>
    <!-- /.content -->
</template>

<script>
import demojs from  '../../../public/plugins/adminlte/js/demo'
import dash from '../../../public/plugins/adminlte/js/pages/dashboard3.js';
import RestaurantService from "../../services/RestaurantService";
import CustomerService from '../../services/CustomerService';
import OrderService from '../../services/OrderService';
import ReservationService from '../../services/ReservationService';
export default {
  name: 'AdminDashboard',
  components: {},
  props: {},
  data() {
    return {
        restaurantList:[],
        customerList: [],
        orderList: [],
        reservationList: [],
    }
  },
  mounted() {
    RestaurantService.findall().then((response) => {
      this.restaurantList = response.data; 
    });

    OrderService.findall().then((response) => {
      this.orderList = response.data;      
    });

    ReservationService.findall().then((response) => {
      this.reservationList = response.data;      
    });

    CustomerService.findall().then((response) => {
      this.customerList = response.data;      
    });



    // demojs();
    // dash();
  },
  beforeDestroy() {},
  methods: {}
}
</script>

<style lang="css" scoped></style>
