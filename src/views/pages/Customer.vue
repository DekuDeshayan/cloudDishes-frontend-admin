<template>
  <!-- Content Header (Page header) -->
  <div class="content-header">
    <div class="container-fluid">
      <div class="row mb-2">
        <div class="col-sm-6">
          <h1 class="m-0">Customer Management</h1>
        </div><!-- /.col -->
        <div class="col-sm-6">
          <ol class="breadcrumb float-sm-right">
            <li class="breadcrumb-item"><a href="#">Home</a></li>
            <li class="breadcrumb-item active">Customers</li>
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
        <div class="col-12">
         
          <div class="card">
            <div class="card-header">
              <div class="row">
                <div class="col-6">
                   <h3 class="card-title">Customer List</h3>
                </div>
                <!-- <div class="col-6 text-right"><button class="btn btn-primary">New Customer</button></div> -->
              </div>
            </div>
            <!-- /.card-header -->
            <div class="card-body">
              <table id="customerList" class="table table-bordered table-hover">
                <thead>
                <tr>
                  <th>#ID</th>
                  <th>First name</th>
                  <th>Last name</th>
                  <th>Username</th>
                  <th>Email</th>
                  <th>Gender</th>
                  <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                  <tr v-for="(customerList, index) in customerList" :key="index">
                    <th>{{customerList.id}}</th>
                    <th>{{customerList.first_name}}</th>
                    <th>{{customerList.surname}}</th>
                    <th>{{customerList.username}}</th>
                    <th>{{customerList.email}}</th>
                    <th>{{customerList.gender}}</th>
                    <th>
                      <div class="btn-group">
                        <button type="button" class="btn btn-primary" >
                          <i class="fas fa-truck "></i> 
                        </button>
                        <button type="button" class="btn btn-danger" >
                          <i class="fas fa-utensils"></i> 
                        </button>
                        <button type="button" class="btn btn-warning" >
                           <i class="fas fa-ban"></i>
                        </button>
                      </div> 
                    </th>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- /.content -->

</template>

<script>
import CustomerService from '../../services/CustomerService';
export default {
  name: 'Customer',
  components: {},
  props: {},
  data() {
    return {
      customerList : [],
    }
  },
  created() {
     CustomerService.findall().then((response) => {
      this.customerList = response.data;
      setTimeout(() => {
       $('#customerList').DataTable({
          "paging": true,
          "ordering": true,
          "responsive": true,
          "lengthChange": false,
          "autoWidth": false,
          "pageLength": 4,
        });
      });
      
    });
  },
  beforeDestroy() {},
  methods: {}
}
</script>

<style lang="css" scoped></style>
