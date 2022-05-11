<template>
  <!-- Content Header (Page header) -->
  <div class="content-header">
    <div class="container-fluid">
      <div class="row mb-2">
        <div class="col-sm-6">
          <h1 class="m-0">Manager Management</h1>
        </div><!-- /.col -->
        <div class="col-sm-6">
          <ol class="breadcrumb float-sm-right">
            <li class="breadcrumb-item"><a href="#">Home</a></li>
            <li class="breadcrumb-item active">Managers</li>
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
                <div class="col-6 text-right">
                  <button class="btn btn-primary" @click="callManagerModal">New Manager</button>
                  <button class="btn btn-danger" @click="downloadReport">
                    <i class="fas fa-file-pdf text-white fa-lg"></i> Export manager Report
                  </button>
                  </div>
              </div>
            </div>
            <!-- /.card-header -->
            <div class="card-body">
              <table id="managerList" class="table table-bordered table-hover">
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
                  <tr v-for="(managerList, index) in managerList" :key="index">
                    <th>{{managerList.id}}</th>
                    <th>{{managerList.first_name}}</th>
                    <th>{{managerList.surname}}</th>
                    <th>{{managerList.username}}</th>
                    <th>{{managerList.email}}</th>
                    <th>{{managerList.gender}}</th>
                    <th>
                      <div class="btn-group">
                      <button type="button" class="btn btn-primary">Edit</button>
                      <button type="button" class="btn btn-danger">
                        <i class="fa fa-trash" aria-hidden="true"></i>
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

  <manager-modal ref="managerModal" @saved="managerSaved"/>
</template>


<script>
import ManagerModal from '../../components/ManagerModal.vue';
import ManagerService from '../../services/ManagerService';
export default {
  name: 'Customer',
  components: {ManagerModal},
  props: {},
  data() {
    return {
      managerList : [],
    }
  },
  created() {
    ManagerService.findall().then((response) => {
      this.managerList = response.data;
      setTimeout(() => {
       $('#managerList').DataTable({
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
  methods: {
    downloadReport(){
      ManagerService.generateManagerListReport().then((response) =>{
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download"); //or any other extension
        document.body.appendChild(link);
        link.click();
        //jQuery('<form target="_blank" action="' + URL + '" method="get"></form>').appendTo('body').submit().remove();
      });
    },
    callManagerModal() {
      this.$refs['managerModal'].showManagerModal();
    },
    managerSaved(formData){
      this.managerList.push(formData);
    }
  },
}
</script>

<style lang="css" scoped></style>
