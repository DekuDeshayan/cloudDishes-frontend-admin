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
            <input v-model="formData.username" type="text" :class="`form-control ${v$.formData.username.$errors.length ? 'is-invalid' : ''}`" placeholder="Your username" id="username" name="username">
            <div class="input-group-append">
              <div class="input-group-text">
                <span class="fas fa-user"></span>
              </div>
            </div>
          </div>
          <div class="input-errors" v-for="error of v$.formData.username.$errors" :key="error.$uid">
            <span class="inval">{{ error.$message }}</span>
          </div>
          <div class="input-group mb-3">
            <input v-model="formData.password" type="password" :class="`form-control ${v$.formData.password.$errors.length ? 'is-invalid' : ''}`" placeholder="Your password" id="password" name="password">
            <div class="input-group-append">
              <div class="input-group-text">
                <span class="fas fa-lock"></span>
              </div>
            </div>
          </div>
          <div class="input-errors" v-for="error of v$.formData.password.$errors" :key="error.$uid">
            <span class="inval">{{ error.$message }}</span>
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
import useVuelidate from '@vuelidate/core';
import {required, helpers} from '@vuelidate/validators';
import vuex from "vuex";
import UserService from "../../services/UserService";
import Role from '../../models/enums/Role';

export default {
  setup () {
    return { v$: useVuelidate() }
  },
  name: 'Login',
  components: {},
  props: {},
  data() {
    return {
       formData : {
        id:this.id,
        first_name:this.first_name,
        surname:this.surname,
        username:this.username,
        email:this.email, 
        gender:this.gender,
        password:this.password,
        role:this.role, 
        token:this.token
      },
      loading : false,
      submitted : false,
      errorMessage : '',
    };
  },
  computed : {
    ...vuex.mapGetters(['currentUser']),
    ...vuex.mapActions(['clearUser']),
  },
  mounted() {
    if(this.currentUser?.role === Role.CLIENT){
        //if client tries to enter admin page , is dumped out
        //check again(verify if currentUser.role and currentUser.username....)
        this.clearUser();
        this.$router.push('/login');
        this.errorMessage = "Invalid Login";
    }else if(this.currentUser?.username) {
      this.$router.push('/');
    }
  },
   created: function() {
    document.body.className += ' login';
  },
  validations() {
    return {
      formData: {
        username: { 
          required: helpers.withMessage('The username is required', required),
        },
        password: { 
         required: helpers.withMessage('The password is required', required),
        }
      }
    };
  },
  methods: {
    ...vuex.mapActions(['updateUser']),
    async handlelogin() {
      
      const result = await this.v$.$validate() // aqui estamos a validar, usei async await para  
      if (!result) {
       return
      }

      this.loading = true;
      console.log("pass");
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
.inval{
width: 100%;
margin-top: .25rem;
font-size: 80%;
color: #dc3545;
}
.input-errors{
  margin-top: -18px;
}
</style>
 