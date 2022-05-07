<template>
  <div class="login-box">
    <!-- /.login-logo -->
    <div class="card card-outline card-success">
      <div class="card-header text-center">
        <a href="#" class="h1"><b>cloudDISHES</b><small>V1.0</small></a>
      </div>
      <div class="card-body">
         <div v-if="errorMessage" class="alert alert-danger text-center">
          {{errorMessage}}
        </div>
        <p class="login-box-msg">Login to the admin area</p>
        <form @submit.prevent="handlelogin" >
          <div class="input-group mb-3">
            <input v-model="formData.username" type="text" class="form-control" placeholder="Your username" id="username" name="username">
            <div class="input-group-append">
              <div class="input-group-text">
                <span class="fas fa-user"></span>
              </div>
            </div>
          </div>
          <div class="input-group mb-3">
            <input v-model="formData.password" type="password" class="form-control" placeholder="Your password" id="password" name="password">
            <div class="input-group-append">
              <div class="input-group-text">
                <span class="fas fa-lock"></span>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-8">
              <div class="icheck-primary">
                <input type="checkbox" id="remember">
                <label for="remember">
                  Remember-me
                </label>
              </div>
            </div>
            <!-- /.col -->
            <div class="col-4">
              <button @click="submitted=true" :disabled="loading" class="btn btn-success btn-block">Login</button>
            </div>
            <!-- /.col -->
          </div>
        </form>
        <!--<p class="mb-1">
          <a href="#" class="text-success">Esquecí a minha palavra passe</a>
        </p>-->
      </div>
      <!-- /.card-body -->
    </div>
    <!-- /.card -->
  </div>
  <!-- /.login-box -->
</template>
<script>
import User from "../../models/User";
import vuex from "vuex";
import UserService from "../../services/UserService";

export default {
  name: 'Login',
  components: {},
  props: {},
  data() {
    return {
      formData : new User(),
      loading : false,
      submitted : false,
      errorMessage : '',
    };
  },
  computed : {
    ...vuex.mapGetters(['currentUser']),
  },
  mounted() {
    if(this.currentUser?.username) {
      this.$router.push('/');
    }
  },
   created: function() {
    document.body.className += ' login';
  },
  methods: {
    ...vuex.mapActions(['updateUser']),
    handlelogin() {
      if(!this.formData.username || !this.formData.password){
        return;
      }

      this.loading = true;
      
      UserService.login(this.formData).then((response) => {
        //update user in vuex
        this.updateUser(response.data);
        this.$router.push('/');
      }).catch((err)=>{
        console.log(err);
        this.errorMessage = "Invalid Login";
      }).then(()=>this.loading=false);
    }
  }
}
</script>

<style lang="css" scoped>



</style>
 