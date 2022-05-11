<template>
<!-- Main content -->
  <section class="content">
    <div class="error-page">
      <h2 class="headline text-danger">401</h2>

      <div class="error-content">
        <h3><i class="fas fa-exclamation-triangle text-danger"></i> Access to this resource is Denied!</h3>

        <p>
          You don't have permission to access this page
         Click here <router-link to="/"> to return to dashboard</router-link>
        </p>
      </div>
    </div>
    <!-- /.error-page -->

  </section>
  <!-- /.content -->
</template>

<script>
import vuex from "vuex";
import Role from '../../models/enums/Role';

export default {
  name: '401',
  components: {},
  computed: {
   ...vuex.mapGetters(['currentUser']),
   ...vuex.mapActions(['clearUser']),
   
  },
  props: {},
  data() {
    return {}
  },
  mounted() {
    if(this.currentUser?.role === Role.CLIENT){
        this.clearUser();
        this.$router.push('/login');
    }

  },
  beforeDestroy() {},
  methods: {
     
  }
}
</script>

<style lang="css" scoped></style>
