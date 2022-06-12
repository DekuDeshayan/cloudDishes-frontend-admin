<template>
    <div class="modal fade" id="mealModal" tabIndex="-1">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <form v-on:submit.prevent="saveMeal">
              <div class="modal-header">
                <h4 class="modal-title">Fill the Meal Details for {{this.$route.query.rname}}</h4>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <div class="form-group">
                  <label>Name</label>
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
                  <label >Description</label>
                  <div class="input-group mb-3">
                      <div class="input-group-prepend">
                          <span class="input-group-text"><i class="fas fa-utensils"></i></span>
                      </div>
                      <input v-model="formData.description" type="text" :class="`form-control ${v$.formData.description.$errors.length ? 'is-invalid' : ''}`" placeholder="description" name="description" id="description">
                  </div>
                  <div class="input-errors" v-for="error of v$.formData.description.$errors" :key="error.$uid">
                    <span class="inval">{{ error.$message }}</span>
                  </div>
                </div>
                <div class="form-group">
                  <label>Meal Category</label>
                  <div class="input-group mb-3">
                      <div class="input-group-prepend">
                          <span class="input-group-text"><i class="fas fa-utensils"></i></span>
                      </div>
                      <select :class="`form-control select2_category select2bs4 ${v$.formData.mealType.$errors.length ? 'is-invalid' : ''}`"   name="mealType" id="mealType" >
                          <option disabled selected>Choose a category</option>
                           <option v-for="(category, index) in categories" :key="index" :value="category.name">{{category.name}}</option>
                      </select>
                    </div>
                  <div class="input-errors" v-for="error of v$.formData.mealType.$errors" :key="error.$uid">
                    <span class="inval">{{ error.$message }}</span>
                  </div>
                </div>
                <div class="form-group">
                  <label >Price</label>
                  <div class="input-group mb-3">
                      <div class="input-group-prepend">
                          <span class="input-group-text"><i class="fa-utensils"></i></span>
                      </div>
                     <input v-model="formData.price" type="text" :class="`form-control ${v$.formData.price.$errors.length ? 'is-invalid' : ''}`" placeholder="price" name="price" id="price">
                  </div>
                  <div class="input-errors" v-for="error of v$.formData.price.$errors" :key="error.$uid">
                    <span class="inval">{{ error.$message }}</span>
                  </div>
                </div>
                <div class="form-group">
                    <label>Preparation Time</label>
                    <div class="input-group mb-3">
                      <div class="input-group-prepend">
                        <span class="input-group-text"><i class="fas fa-clock"></i></span>
                      </div>
                      <input v-model="formData.preparationTime" type="number" :class="`form-control ${v$.formData.preparationTime.$errors.length ? 'is-invalid' : ''}`"   placeholder="Preparation Time"  name="preparation_time" id="preparation_time">
                    </div>
                  <div class="input-errors" v-for="error of v$.formData.preparationTime.$errors" :key="error.$uid">
                    <span class="inval">{{ error.$message }}</span>
                  </div>
                </div>
                <div class="form-group">
                  <label>Meal Image</label>
                  <div class="input-group mb-3">
                      <div class="input-group-prepend">
                          <span class="input-group-text"><i class="fas fa-image"></i></span>
                      </div>
                      <input type="file" ref="mealImage" accept="image/*" id="mealImage" class="form-control"  @change="selectImage"/>
                  </div>
                </div>
              <div class="alert alert-danger" v-if="errorMessage">{{errorMessage}}</div>
              </div>
              <div class="modal-footer justify-content-between">
                <button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>
                <button type="submit" class="btn btn-primary" @click="submitted = true" :disabled="loading">Save Meal</button>
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
import MealService from '@/services/MealService';
import useVuelidate from '@vuelidate/core'
import MealType from '../models/enums/MealType';
import { required, numeric, helpers} from '@vuelidate/validators'


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
        description:this.description,
        imageName: this.imageName,
        imageUrl: this.imageUrl,
        mealType: this.meal_type,
        restaurant_id:this.$route.query.r,
        price:this.price,
        preparationTime:this.preparationTime,
      }, 
      mealImage: undefined,
      categories: MealType, 
    };
  },
  validations() {
    return {
      formData: {
        name: {
           required: helpers.withMessage('The meal name is required', required)
        },
        description: {
           required: helpers.withMessage('The description is required', required)
        },
        mealType: {
           required: helpers.withMessage('The meal category is required', required)
        },
        price: {
           required: helpers.withMessage('The price is required', required),
           numeric
        },
        preparationTime: {
           required: helpers.withMessage('preparation time  is required', required)
        }
      }
    };
  },
  mounted() {

      let self = this;
      $(".select2_category").change(function () {
        const val = $(this).find("option:selected").val();
        self.formData.mealType = val;
      });

      

      //Initialize Select2 bootstrap theme
      $('.select2bs4').select2({
        theme: 'bootstrap4',
        dropdownParent: $('#mealModal')
      });

  },
  beforeDestroy() {},
  methods: {

    selectImage() {
      this.mealImage = this.$refs.mealImage.files.item(0);
    },
    async saveMeal() {

      const result = await this.v$.$validate()
      if (!result) {
       return
      }
      //Form Validation passed

      console.log(this.formData.description);

      console.log(mealImage)

      this.loading = true;

      MealService.save(this.formData, this.mealImage).then((response)=>{
        this.successMessage = "Meal Saved Successfully!";
        console.log(response.data);
        alert(this.successMessage);
        this.$emit('saved', response.data);
        $('#mealModal').modal('hide');

      }).catch((err)=>{

        if(err.response.status === 417){
          this.errorMessage = 'File too Large for uploads, maximum allowed is 2MB, please choose another one';
          alert(this.errorMesssage);
        }else{
          this.errorMessage = 'Unexpected error ocurred';
          alert(this.errorMesssage+err);
        }

      }).then(()=>this.loading=false);

    },
    showMealModal(){
       $('#mealModal').modal('show');
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
