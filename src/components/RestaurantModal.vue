<template>
    <div class="modal fade" id="restaurantModal" tabIndex="-1">
      <div class="modal-dialog modal-lg">
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
                      <select :class="`form-control select2_prov select2bs4 ${v$.formData.province.$errors.length ? 'is-invalid' : ''}`"   name="province" id="province" >
                          <option  disabled selected>Choose a Province</option>
                          <option v-for="(province, index) in provinces" :key="index" :value="province"> {{ province=='CABO_DELGADO' ? 'CABO DELGADO' : province }}</option>
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
                      <select  :class="`form-control select2_district select2bs4 ${v$.formData.district.$errors.length ? 'is-invalid' : ''}`"   name="district" id="district" >
                          <option disabled selected>Choose a District</option>
                          <option v-for="(district, index) in districts" :key="index" :value="district">
                            {{
                                district=='XAI_XAI' ? 'XAI XAI' :
                                district=='MAPUTO_CITY' ? 'MAPUTO CITY' :
                                district=='NACALA_A_VELHA' ? 'NACALA A VELHA' :
                                district=='CAHORA_BASSA' ? 'CAHORA BASSA' :
                                district=='ALTO_MOLOCUE' ? 'ALTO MOLOCUE': district
                            }}
                          </option>
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
                      <select :class="`form-control select2_neigh select2bs4 ${v$.formData.neighborhood.$errors.length ? 'is-invalid' : ''}`"   name="neighborhood" id="neighborhood" >
                          <option disabled selected>Choose a Neighborhood</option>
                           <option v-for="(neighborhood, index) in neighborhoods" :key="index" :value="neighborhood">
                            {{
                                neighborhood=='MATOLA_GARE' ? 'MATOLA GARE' :
                                neighborhood=='MATOLA_SANTOS' ? 'MATOLA SANTOS' :
                                neighborhood=='CIDADE_MATOLA' ? 'CIDADE MATOLA' :
                                neighborhood=='CINEMA_700' ? 'CINEMA 700' :
                                neighborhood=='MACHAVA_TREVO' ? 'MACHAVA TREVO' :
                                neighborhood=='NOVO_CEMITERIO' ? 'NOVO CEMITERIO' :
                                neighborhood=='SANTA_ISABELA' ? 'SANTA ISABELA' :
                                neighborhood=='NOVO_CEMITERIO' ? 'NOVO CEMITERIO' :
                                neighborhood=='COSTA_DO_SOL_TRIUNFO' ? 'COSTA DO SOL TRIUNFO' :
                                neighborhood=='BAIRRO_CENTRAL' ? 'BAIRRO CENTRAL' :
                                neighborhood=='ZONA_VERDE' ? 'ZONA VERDE' : neighborhood
                            }}
                           </option>
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
                      <input v-model="formData.openTime" type="number" :class="`form-control ${v$.formData.openTime.$errors.length ? 'is-invalid' : ''}`"   placeholder="open time"  name="openTime" id="openTime">
                    </div>
                  <div class="input-errors" v-for="error of v$.formData.openTime.$errors" :key="error.$uid">
                    <span class="inval">{{ error.$message }}</span>
                  </div>
                </div>
                <div class="form-group">
                    <label>Close Time</label>
                    <div class="input-group mb-3">
                      <div class="input-group-prepend">
                        <span class="input-group-text"><i class="fas fa-clock"></i></span>
                      </div>
                      <input v-model="formData.closeTime" type="number" :class="`form-control ${v$.formData.closeTime.$errors.length ? 'is-invalid' : ''}`"   placeholder="close time"  name="closeTime" id="closeTime">
                    </div>
                  <div class="input-errors" v-for="error of v$.formData.closeTime.$errors" :key="error.$uid">
                    <span class="inval">{{ error.$message }}</span>
                  </div>
                </div>
                <div class="form-group">
                  <label >Manager to Link</label>
                  <div class="input-group mb-3">
                      <div class="input-group-prepend">
                          <span class="input-group-text"><i class="fas fa-user"></i></span>
                      </div>
                      <select :class="`form-control select2_manager select2bs4 ${v$.formData.user_id.$errors.length ? 'is-invalid' : ''}`"   name="user_id" id="user_id" >
                          <option  disabled selected>Select a manager to link</option>
                          <option v-for="managerNotLinked in ManagersNotLinkedToRests" :key="managerNotLinked.id" :value="managerNotLinked.id"> {{ managerNotLinked.first_name +" "+ managerNotLinked.surname }}</option>
                      </select>
                  </div>
                  <div class="input-errors" v-for="error of v$.formData.user_id.$errors" :key="error.$uid">
                    <span class="inval">{{ error.$message }}</span>
                  </div>
                </div>
                <div class="form-group">
                  <label for="Name">Email</label>
                  <div class="input-group mb-3">
                      <div class="input-group-prepend">
                          <span class="input-group-text"><i class="fas fa-envelope"></i></span>
                      </div>
                      <input v-model="formData.email" type="text" :class="`form-control ${v$.formData.email.$errors.length ? 'is-invalid' : ''}`" placeholder="email" name="email" id="email">
                  </div>
                  <div class="input-errors" v-for="error of v$.formData.email.$errors" :key="error.$uid">
                    <span class="inval">{{ error.$message }}</span>
                  </div>
                </div>
                <div class="form-group">
                  <label for="Name">Phone</label>
                  <div class="input-group mb-3">
                      <div class="input-group-prepend">
                          <span class="input-group-text"><i class="fas fa-phone"></i></span>
                      </div>
                      <input v-model="formData.phone" type="text" :class="`form-control ${v$.formData.phone.$errors.length ? 'is-invalid' : ''}`" placeholder="phone" name="phone" id="phone">
                  </div>
                  <div class="input-errors" v-for="error of v$.formData.phone.$errors" :key="error.$uid">
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
import ManagerService from '@/services/ManagerService'
import useVuelidate from '@vuelidate/core'
import Province from '../models/enums/Province'
import District from '../models/enums/District'
import Neighborhood from '../models/enums/Neighborhood'
import { required, minLength, numeric, alphaNum, email, maxLength, helpers} from '@vuelidate/validators'
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
        openTime:this.openTime,
        closeTime:this.closeTime,
        imageTitle:"img.png",
        user_id: this.user_id,
        email: this.email,
        phone: this.phone
      }, 
      provinces: Province,
      districts: District,
      neighborhoods: Neighborhood,  
      ManagersNotLinkedToRests : [],
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
           required: helpers.withMessage('The restaurant province is required', required)
        },
        district: {
           required: helpers.withMessage('The restaurant district is required', required)
        },
        neighborhood: {
           required: helpers.withMessage('The restaurant neighborhood is required', required)
        },
        openTime: {
           required: helpers.withMessage('The open time is required', required),
           maxLength: maxLength(2),
           numeric
        },
        closeTime: {
           required: helpers.withMessage('The close time is required', required),
           maxLength: maxLength(2),
           numeric
        },
        email: {
           required: helpers.withMessage('The restaurant email is required', required),
           email           
        },
        phone: {
           required: helpers.withMessage('The restaurant phone number is required', required),
           maxLength: maxLength(13),
           alphaNum
        },
        user_id: {
           required: helpers.withMessage('The restaurant manager is required', required)
        },
      }
    };
  },
  mounted() {

      ManagerService.findManagersNotLinkedToRests().then((response)=>{
        this.ManagersNotLinkedToRests = response.data;
      });
    
      let self = this;
      $(".select2_neigh").change(function () {
        const val = $(this).find("option:selected").val();
        self.formData.neighborhood = val;
      });
      $(".select2_prov").change(function () {
        const val = $(this).find("option:selected").val();
        self.formData.province = val;
      });
      $(".select2_district").change(function () {
        const val = $(this).find("option:selected").val();
        self.formData.district = val;
      });
      $(".select2_manager").change(function () {
        const val = $(this).find("option:selected").val();
        self.formData.user_id = val;
      });


      //Initialize Select2 Elements
      $('.select2_neigh').select2({
        dropdownParent: $('#restaurantModal'),
      });

      //Initialize Select2 Elements
      $('.select2bs4').select2({
        theme: 'bootstrap4',
        dropdownParent: $('#restaurantModal')
      })

  },
  beforeDestroy() {},
  methods: {
    async saveRestaurant() {

      const result = await this.v$.$validate()
      if (!result) {
       return
      }
      //Form Validation passed

      this.loading = true;

      //verifying selected option by user in provinces to convert again to original value
      this.formData.province=='CABO DELGADO' ? 'CABO_DELGADO' : this.formData.province;
      
      //verifying selected option by user in neighborhood to convert again to original value
      this.formData.neighborhood=='MATOLA SANTOS' ? 'MATOLA_SANTOS' :
      this.formData.neighborhood=='CIDADE MATOLA' ? 'CIDADE_MATOLA' :
      this.formData.neighborhood=='CINEMA 700' ? 'CINEMA_700' :
      this.formData.neighborhood=='MATOLA GARE' ? 'MATOLA_GARE' :
      this.formData.neighborhood=='MACHAVA TREVO' ? 'MACHAVA_TREVO' :
      this.formData.neighborhood=='NOVO CEMITERIO' ? 'NOVO_CEMITERIO' :
      this.formData.neighborhood=='SANTA ISABELA' ? 'SANTA_ISABELA' :
      this.formData.neighborhood=='NOVO CEMITERIO' ? 'NOVO_CEMITERIO' :
      this.formData.neighborhood=='COSTA DO SOL TRIUNFO' ? 'COSTA_DO_SOL_TRIUNFO' :
      this.formData.neighborhood=='BAIRRO CENTRAL' ? 'BAIRRO_CENTRAL' :
      this.formData.neighborhood=='ZONA VERDE' ? 'ZONA_VERDE' :  this.formData.neighborhood;

      //verifying selected option by user in districts to convert again to original value
      this.formData.district=='XAI XAI' ? 'XAI_XAI' :
      this.formData.district=='ALTO MOLOCUE' ? 'ALTO_MOLOCUE' :
      this.formData.district=='CAHORA BASSA' ? 'CAHORA_BASSA' :
      this.formData.district=='MAPUTO CITY' ? 'MAPUTO_CITY' :
      this.formData.district=='NACALA A VELHA' ? 'NACALA_A_VELHA' :  this.formData.district;


      console.log(this.formData);

      RestaurantService.save(this.formData).then((response)=>{
        this.successMessage = "restaurant Saved Successfully!";
        console.log(response.data);
        console.log(this.successMessage);
        this.$emit('saved', response.data);
        $('#restaurantModal').modal('hide');
      }).catch((err)=>{

          if(err?.errorMessage === 409){
            this.errorMessage = 'Restaurant already exists';
          }else{
            this.errorMessage = 'Unexpected error ocurred';
            console.log(err);  
          }

      }).then(()=>this.loading=false);

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

.select2 {
width:100%!important;
}

</style>
