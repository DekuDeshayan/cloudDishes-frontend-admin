<template>
    <div class="modal fade" id="receptionistModal" tabIndex="-1">
      <div class="modal-dialog">
        <div class="modal-content">
            <form v-on:submit.prevent="saveReceptionist">
              <div class="modal-header">
                <h4 class="modal-title">Fill the Receptionist Details</h4>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <div class="form-group">
                  <label for="firstName">First Name</label>
                  <div class="input-group mb-3">
                      <div class="input-group-prepend">
                          <span class="input-group-text"><i class="fas fa-user"></i></span>
                      </div>
                      <input v-model="formData.first_name" type="text" :class="`form-control ${v$.formData.first_name.$errors.length ? 'is-invalid' : ''}`" placeholder="first name" name="firstname" id="firstname">
                  </div>
                  <div class="input-errors" v-for="error of v$.formData.first_name.$errors" :key="error.$uid">
                    <span class="inval">{{ error.$message }}</span>
                  </div>
                </div>
                <div class="form-group">
                  <label for="surname">Surname</label>
                  <div class="input-group mb-3">
                      <div class="input-group-prepend">
                          <span class="input-group-text"><i class="fas fa-user"></i></span>
                      </div>
                      <input v-model="formData.surname" type="text" :class="`form-control ${v$.formData.surname.$errors.length ? 'is-invalid' : ''}`"  placeholder="Surname" name="surname" id="surname">
                  </div>
                  <div class="input-errors" v-for="error of v$.formData.surname.$errors" :key="error.$uid">
                    <span class="inval">{{ error.$message }}</span>
                  </div>
                </div>
                <div class="form-group">
                  <label for="username">Username</label>
                  <div class="input-group mb-3">
                      <div class="input-group-prepend">
                          <span class="input-group-text"><i class="fas fa-user"></i></span>
                      </div>
                      <input v-model="formData.username" type="text" :class="`form-control ${v$.formData.username.$errors.length ? 'is-invalid' : ''}`"  placeholder="Username" name="username" id="username">
                  </div>
                  <div class="input-errors" v-for="error of v$.formData.username.$errors" :key="error.$uid">
                    <span class="inval">{{ error.$message }}</span>
                  </div>
                </div>
                <div class="form-group">
                  <label for="email">Email</label>
                  <div class="input-group mb-3">
                      <div class="input-group-prepend">
                          <span class="input-group-text"><i class="fas fa-envelope"></i></span>
                      </div>
                      <input v-model="formData.email" type="email" :class="`form-control ${v$.formData.email.$errors.length ? 'is-invalid' : ''}`"  placeholder="Email" name="email" id="email">
                  </div>
                  <div class="input-errors" v-for="error of v$.formData.email.$errors" :key="error.$uid">
                    <span class="inval">{{ error.$message }}</span>
                  </div>
                </div>
                <div class="form-group">
                  <label >Gender</label>
                  <div class="input-group mb-3">
                      <div class="input-group-prepend">
                          <span class="input-group-text"><i class="fa fa-venus-mars"></i></span>
                      </div>
                      <select v-model="formData.gender" :class="`form-control ${v$.formData.gender.$errors.length ? 'is-invalid' : ''}`"   name="gender" id="gender" >
                          <option disabled selected>Choose a gender</option>
                          <option value="M">Male</option>
                          <option value="F">Female</option> 
                      </select>
                  </div>
                  <div class="input-errors" v-for="error of v$.formData.gender.$errors" :key="error.$uid">
                    <span class="inval">{{ error.$message }}</span>
                  </div>
                </div>
                <div class="form-group">
                    <label>Password</label>
                    <div class="input-group mb-3">
                      <div class="input-group-prepend">
                        <span class="input-group-text"><i class="fas fa-lock"></i></span>
                      </div>
                      <input v-model="formData.password" type="password" :class="`form-control ${v$.formData.password.$errors.length ? 'is-invalid' : ''}`"   placeholder="Password"  name="password" id="password">
                    </div>
                  <div class="input-errors" v-for="error of v$.formData.password.$errors" :key="error.$uid">
                    <span class="inval">{{ error.$message }}</span>
                  </div>
                </div>
                <div class="form-group">
                    <label>Confirm the password</label>
                    <div class="input-group mb-3">
                      <div class="input-group-prepend">
                        <span class="input-group-text"><i class="fas fa-lock"></i></span>
                      </div>
                      <input v-model="passwdconfirm" type="text" :class="`form-control ${v$.formData.password.$errors.length ? 'is-invalid' : ''}`"   placeholder="Confirm the password"  name="passwdconfirm" id="passwdconfirm">
                    </div>
                    <div class="input-errors" v-for="error of v$.passwdconfirm.$errors" :key="error.$uid">
                      <div class="inval">{{ error.$message }}</div>
                    </div>
                </div>
              <div class="alert alert-danger" v-if="errorMessage">{{errorMessage}}</div>
              </div>
              <div class="modal-footer justify-content-between">
                <button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>
                <button type="submit" class="btn btn-primary" @click="submitted = true" :disabled="loading">Save Receptionist</button>
              </div>
            </form>
        </div>
        <!-- /.modal-content -->
      </div>
      <!-- /.modal-dialog -->
    </div>
    <!-- /.modal -->
</template>

<script>
import ReceptionistService from '@/services/ReceptionistService';
import useVuelidate from '@vuelidate/core'
import { required, email, sameAs, minLength, alpha, alphaNum, helpers} from '@vuelidate/validators'

export default {
  setup () {
    return { v$: useVuelidate() }
  },
  name: 'receptionist-modal',
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
      passwdconfirm:'',
      loading: false,
      errorMessage : '',
      successMessage : '',
      submitted : false,
    };
  },
  validations() {
    
    return {
      formData: {
        first_name: {
           required: helpers.withMessage('The first name is required', required),
           minLength: helpers.withMessage('The first name must contain at least 3 characters', minLength(3)),
           alpha
        },
        surname: { 
          required: helpers.withMessage('The surname is required', required),
         minLength: helpers.withMessage('The surname must contain at least 3 characters', minLength(3)),
          alpha
        },
        username: { 
          required: helpers.withMessage('The username is required', required),
          minLength: helpers.withMessage('The username must contain at least 3 characters', minLength(3)),
          alphaNum
         },
        email: {
          required: helpers.withMessage('The email is required', email),
          email
        },
        gender: { 
          required: helpers.withMessage('The gender is required', required)
        },
        password: { 
        required: helpers.withMessage('The password is required', required),
        minLength: helpers.withMessage('The password must contain at least 8 characters', minLength(8)),
        alphaNum
        },
      },
        passwdconfirm: {
          sameAs: sameAs(this.formData.password),
        }
    };
  },
  mounted() {},
  beforeDestroy() {},
  methods: {
    async saveReceptionist() {

      const result = await this.v$.$validate()
      if (!result) {
       return
      }

      this.loading = true;
      
      ReceptionistService.save(this.formData).then((response)=>{
        this.successMessage = "User saved successfully!";
        console.log(response.data);
        console.log(this.successMessage);
        this.$emit('saved', response.data);
        $('#receptionistModal').modal('hide');
      }).catch((err)=>{

          if(err?.errorMessage === 409){
            this.errorMessage = 'Username already exists';
          }else{
            this.errorMessage = 'Unexpected error ocurred';
            console.log(err);  
          }

      }).then(()=>this.loading=false);

    },
    showReceptionistModal(){
       $('#receptionistModal').modal('show');
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
