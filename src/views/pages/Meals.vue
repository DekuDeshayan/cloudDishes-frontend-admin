<template>
  <!-- Content Header (Page header) -->
  <div class="content-header">
    <div class="container-fluid">
      <div class="row mb-2">
        <div class="col-sm-6">
          <h1 class="m-0">Managing Meals in: <small class="text-primary">{{this.$route.query.rname}}</small></h1>
        </div><!-- /.col -->
        <div class="col-sm-6">
          <ol class="breadcrumb float-sm-right">
            <li class="breadcrumb-item"><a href="#">Home</a></li>
            <li class="breadcrumb-item active">Restaurants / Meals</li>
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
                   <h3 class="card-title">Meal List</h3><br>
                   <h3 class="card-title">Restaurant name: <small class="text-primary">{{this.$route.query.rname}}</small></h3>
                </div>
                <div class="col-6 text-right"><button class="btn btn-primary" @click="callMealModal">New Meal</button></div>
              </div>
            </div>
            <!-- /.card-header -->
            <div class="card-body">
              <h3 class="text-center" v-if="mealList.length===0">No available data for this restaurant yet...</h3>
              <div class="tab-pane fade show active" v-for="(meals, index) in mealList" :key="index">
                  <div class="bg-white card  mb-4 order-list">
                    <div class="gold-members p-4">
                      <div class="media">
                        <img class="mr-4" :src="meals.imageUrl" alt="Generic placeholder image">
                        <div class="media-body">
                          <h6 class="mb-2">
                            <a href="#" class="text-black">{{meals.name}}</a>
                          </h6>
                          <p class="text-gray mb-1"><i class="fas fa-utensils"></i>&nbsp;&nbsp;{{meals.description}}</p>
                          <p class="text-gray mb-1"><i class="far fa-clock"></i>&nbsp;&nbsp;{{meals.preparationTime}} min</p>
                          <p class="text-gray mb-2">Price&nbsp;&nbsp;{{meals.price}} MZN </p>
                          <h6 class="mb-0 restaurant-detailed-ratings"><span class="generator-bg rounded text-white" style="background-color:#ff360b;"><i class="icofont-star"></i> 4.5</span> 50 Ratings  <i class="ml-3 icofont-speech-comments"></i> 1000 reviews</h6>
                          <hr>
                          <div class="float-right">
                            <a class="btn btn-sm btn-outline-danger" href="#"><i class="icofont-pencil"></i> Edit Details</a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- /.content --> 

  <meal-modal ref="mealModal" @saved="mealSaved"/>
</template>

<script>
import MealService from "../../services/MealService";
import MealModal from "../../components/MealModal.vue";
export default {
  name: 'Meals',
  components: {MealModal},
  props: {},
  data() { 
    return {
      mealList : [],
    }
  },
  created() {
    MealService.findAllByRestaurant(this.$route.query.r).then((response) => {
      this.mealList = response.data; 
      console.log(response.data)
    });
  },
  beforeDestroy() {},
  methods: {
    callMealModal() {
      this.$refs['mealModal'].showMealModal();
    },
    mealSaved(formData){
      this.mealList.push(formData);
    },      
  },
}
</script>

<style lang="css" scoped></style>

