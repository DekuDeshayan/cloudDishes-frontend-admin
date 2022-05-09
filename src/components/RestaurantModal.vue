<template>
    <div class="modal fade" id="restaurantModal" tabIndex="-1">
      <div class="modal-dialog">
        <div class="modal-content">
            <form v-on:submit.prevent="saveRestaurant">
              <div class="modal-header">
                <h4 class="modal-title">Fill the Restaurant Details</h4>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <div class="form-group">
                  <label for="Name">Name</label>
                  <div class="input-group mb-3">
                      <div class="input-group-prepend">
                          <span class="input-group-text"><i class="fas fa-utensils"></i></span>
                      </div>
                      <input v-model="formData.name" type="text" :class="`form-control ${v$.formData.name.$errors.length ? 'is-invalid' : ''}`" placeholder="name" name="name" id="name">
                  </div>
                  <div class="input-errors" v-for="error of v$.formData.name.$errors" :key="error.$uid">
                    <span class="inval">{{ error.$message }}</span>
                  </div>
                </div>                
                <div class="form-group">
                  <label >Province</label>
                  <div class="input-group mb-3">
                      <div class="input-group-prepend">
                          <span class="input-group-text"><i class="fas fa-city"></i></span>
                      </div>
                      <select v-model="formData.province" :class="`form-control ${v$.formData.province.$errors.length ? 'is-invalid' : ''}`"   name="province" id="province" >
                          <option disabled selected>Choose a Province</option>
                          <option v-for="prov in provinces" :key="prov.toString()">{{ prov.valueOf() }}</option>
                      </select>
                  </div>
                  <div class="input-errors" v-for="error of v$.formData.province.$errors" :key="error.$uid">
                    <span class="inval">{{ error.$message }}</span>
                  </div>
                </div>
                <div class="form-group">
                  <label >District</label>
                  <div class="input-group mb-3">
                      <div class="input-group-prepend">
                          <span class="input-group-text"><i class="fas fa-city"></i></span>
                      </div>
                      <select v-model="formData.district" :class="`form-control ${v$.formData.district.$errors.length ? 'is-invalid' : ''}`"   name="district" id="district" >
                          <option disabled selected>Choose a District</option>
                          <option v-for="distr in districts" :key="distr.toString()">{{ distr.valueOf() }}</option>
                      </select>
                  </div>
                  <div class="input-errors" v-for="error of v$.formData.district.$errors" :key="error.$uid">
                    <span class="inval">{{ error.$message }}</span>
                  </div>
                </div>
                <div class="form-group">
                  <label >Neighborhood</label>
                  <div class="input-group mb-3">
                      <div class="input-group-prepend">
                          <span class="input-group-text"><i class="fas fa-city"></i></span>
                      </div>
                      <select v-model="formData.neighborhood" :class="`form-control ${v$.formData.neighborhood.$errors.length ? 'is-invalid' : ''}`"   name="neighborhood" id="neighborhood" >
                          <option disabled selected>Choose a Neighborhood</option>
                           <option v-for="neigh in neighborhoods" :key="neigh.toString()">{{ neigh.valueOf() }}</option>
                      </select>
                  </div>
                  <div class="input-errors" v-for="error of v$.formData.neighborhood.$errors" :key="error.$uid">
                    <span class="inval">{{ error.$message }}</span>
                  </div>
                </div>
                <div class="form-group">
                    <label>Open Time</label>
                    <div class="input-group mb-3">
                      <div class="input-group-prepend">
                        <span class="input-group-text"><i class="fas fa-clock"></i></span>
                      </div>
                      <input v-model="formData.open_time" type="number" :class="`form-control ${v$.formData.open_time.$errors.length ? 'is-invalid' : ''}`"   placeholder="open time"  name="open_time" id="open_time">
                    </div>
                  <div class="input-errors" v-for="error of v$.formData.open_time.$errors" :key="error.$uid">
                    <span class="inval">{{ error.$message }}</span>
                  </div>
                </div>
                <div class="form-group">
                    <label>Close Time</label>
                    <div class="input-group mb-3">
                      <div class="input-group-prepend">
                        <span class="input-group-text"><i class="fas fa-clock"></i></span>
                      </div>
                      <input v-model="formData.close_time" type="number" :class="`form-control ${v$.formData.close_time.$errors.length ? 'is-invalid' : ''}`"   placeholder="close time"  name="close_time" id="close_time">
                    </div>
                  <div class="input-errors" v-for="error of v$.formData.close_time.$errors" :key="error.$uid">
                    <span class="inval">{{ error.$message }}</span>
                  </div>
                </div>
               
              <div class="alert alert-danger" v-if="errorMessage">{{errorMessage}}</div>
              </div>
              <div class="modal-footer justify-content-between">
                <button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>
                <button type="submit" class="btn btn-primary" @click="submitted = true" :disabled="loading">Save Restaurant</button>
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
import RestaurantService from '@/services/RestaurantService'
import useVuelidate from '@vuelidate/core'
import Province from '../models/enums/Province'
import District from '../models/enums/District'
import Neighborhood from '../models/enums/Neighborhood'
import { required, minLength, numeric, alphaNum, maxLength, helpers} from '@vuelidate/validators'
const regexSpaces = helpers.regex(/^[a-zA-Z\s]*$/);
export default {
   setup () {
    return { v$: useVuelidate() }
  },
  name: 'restaurant-modal',
  components: {},
  props: {},
  data() {
    return {
       formData : {
        id:this.id,
        name:this.name,
        province:this.province,
        district:this.district,
        neighborhood:this.neighborhood, 
        open_time:this.open_time,
        close_time:this.close_time,
        image_title:this.image_title
      }, 
      provinces: Province,
      districts: District,
      neighborhoods: Neighborhood,     
    };
  },
  validations() {
    return {
      formData: {
        name: {
           required: helpers.withMessage('The restaurant name is required', required),
           minLength :helpers.withMessage('The password must contain at least 3 characters', minLength(3)),
           regexSpaces: helpers.withMessage('only letters and spaces allowed', regexSpaces)
        },
        province: {
           required: helpers.withMessage('The restaurant province is required', required),
           minLength : minLength(3),
           alphaNum
        },
        district: {
           required: helpers.withMessage('The restaurant district is required', required),
           minLength : minLength(3),
           regexSpaces: helpers.withMessage('only letters and spaces allowed', regexSpaces)
        },
        neighborhood: {
           required: helpers.withMessage('The restaurant neighborhood is required', required),
           minLength : minLength(3),
           alphaNum
        },
        open_time: {
           required: helpers.withMessage('The open time is required', required),
           maxLength: maxLength(2),
           numeric
        },
        close_time: {
           required: helpers.withMessage('The close time is required', required),
           maxLength: maxLength(2),
           numeric
        },
      }
    };
  },
  created() {},
  beforeDestroy() {},
  methods: {
    async saveRestaurant() {

      const result = await this.v$.$validate() // aqui estamos a validar, usei async await para  
      if (!result) {
       return
      }

      this.loading = true;
      console.log("pass");
      // RestaurantService.save(this.formData).then((response)=>{
      //   this.successMessage = "User saved successfully!";
      //   console.log(response.data);
      //   console.log(this.successMessage);
      //   this.$emit('saved', response.data);
      //   $('#restaurantModal').modal('hide');
      // }).catch((err)=>{

      //     if(err?.errorMessage === 409){
      //       this.errorMessage = 'Username already exists';
      //     }else{
      //       this.errorMessage = 'Unexpected error ocurred';
      //       console.log(err);  
      //     }

      // }).then(()=>this.loading=false);

    },
    showRestaurantModal(){
       $('#restaurantModal').modal('show');
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
