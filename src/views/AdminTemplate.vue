<template>
   <Header />
    <Sidebar />
    <!--Here we load the view in template(leave content-wrapper)-->
    <!-- Content Wrapper. Contains page content -->
    <div class="content-wrapper">
      <router-view />
    </div>
    <!-- /.content-wrapper -->
    <!-- Control Sidebar -->
    <aside class="control-sidebar control-sidebar-dark">
      <!-- Control sidebar content goes here -->
    </aside>
    <!-- /.control-sidebar -->
    <Footer  />
</template>

<script>
import Header from './layout/Header.vue';
import Sidebar from './layout/Sidebar.vue';
import Footer from './layout/Footer.vue';


export default {
  name: 'AdminTemplate',
  components:  { Header, Sidebar, Footer },
  props: {},
  data() {
    return {}
  },
  created() {
   
  },
  mounted() {
     //removing the login classname in body...
    document.body.classList.remove('login');
  },
  beforeDestroy() {},
  methods: {}
}
</script>

<style lang="css" scoped></style>


