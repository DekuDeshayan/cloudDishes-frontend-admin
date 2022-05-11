<template>
  <!-- Content Header (Page header) -->
  <div class="content-header">
    <div class="container-fluid">
      <div class="row mb-2">
        <div class="col-sm-6">
          <h1 class="m-0">Receptionists Management</h1>
        </div><!-- /.col -->
        <div class="col-sm-6">
          <ol class="breadcrumb float-sm-right">
            <li class="breadcrumb-item"><a href="#">Home</a></li>
            <li class="breadcrumb-item active">Receptionists</li>
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
                   <h3 class="card-title">Receptionist List</h3>
                </div>
                <div class="col-6 text-right"><button class="btn btn-primary" @click="callReceptionistModal">New Receptionist</button></div>
                 <button class="btn btn-danger" @click="downloadReport">
                    <i class="fas fa-file-pdf text-white fa-lg"></i> Export receptionist Report
                </button>
             </div>
            </div>
            <!-- /.card-header -->
            <div class="card-body">
              <table id="receptList" class="table table-bordered table-hover">
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
                  <tr v-for="(receptlist, index) in receptionistList" :key="index">
                    <th>{{receptlist.id}}</th>
                    <th>{{receptlist.first_name}}</th>
                    <th>{{receptlist.surname}}</th>
                    <th>{{receptlist.username}}</th>
                    <th>{{receptlist.email}}</th>
                    <th>{{receptlist.gender}}</th>
                    <th>
                      <div class="btn-group">
                      <button type="button" class="btn btn-primary mr-1">Edit</button>
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

  <receptionist-modal ref="receptionistModal" @saved="receptionistSaved"/>
</template>

<script>
import ReceptionistService from "../../services/ReceptionistService";
import ReceptionistModal from "../../components/ReceptionistModal.vue";
export default {
  name: 'Receptionist',
  components: {ReceptionistModal},
  props: {},
  data() {
    return {
      receptionistList : [],
    }
  },
  created() {
    ReceptionistService.findall().then((response) => {
      this.receptionistList = response.data;
      setTimeout(() => {
       $('#receptList').DataTable({
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
      ReceptionistService.generateReceptionistListReport().then((response) =>{
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download"); //or any other extension
        document.body.appendChild(link);
        link.click();
        //jQuery('<form target="_blank" action="' + URL + '" method="get"></form>').appendTo('body').submit().remove();
      });
    },
    callReceptionistModal() {
      this.$refs['receptionistModal'].showReceptionistModal();
    },
    receptionistSaved(formData){
      this.receptionistList.push(formData);
    }
  },
}
</script>

<style lang="css" scoped></style>

