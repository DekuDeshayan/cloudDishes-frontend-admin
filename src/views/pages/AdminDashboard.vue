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
              <li class="breadcrumb-item active">Dashboard v1</li>
            </ol>
          </div><!-- /.col -->
        </div><!-- /.row -->
      </div><!-- /.container-fluid -->
    </div>
    <!-- /.content-header -->
    <!-- Main content -->
    <div class="content">
      <div class="container-fluid">
        Hi i'm dashboard...
      </div>
    </div>
    <!-- /.content -->
</template>

<script>
import demojs from  '../../../public/plugins/adminlte/js/demo'
export default {
  name: 'AdminDashboard',
  components: {},
  props: {},
  data() {
    return {}
  },
  mounted() {
    demojs()
  },
  beforeDestroy() {},
  methods: {}
}
</script>

<style lang="css" scoped></style>
