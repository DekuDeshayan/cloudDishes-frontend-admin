<template>
  <!-- Content Header (Page header) -->
  <div class="content-header">
    <div class="container-fluid">
      <div class="row mb-2">
        <div class="col-sm-6">
          <h1 class="m-0">Restaurant Management</h1>
        </div><!-- /.col -->
        <div class="col-sm-6">
          <ol class="breadcrumb float-sm-right">
            <li class="breadcrumb-item"><a href="#">Home</a></li>
            <li class="breadcrumb-item active">Restaurants</li>
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
                   <h3 class="card-title">Restaurant List</h3>
                </div>
                <div class="col-6 text-right"><button class="btn btn-primary" @click="callRestaurantModal">New Restaurant</button></div>
              </div>
            </div>
            <!-- /.card-header -->
            <div class="card-body">

              <div class="tab-pane fade show active" v-for="(restList, index) in restaurantList" :key="index">
                  <div class="bg-white card  mb-4 order-list">
                    <div class="gold-members p-4">
                      <div class="media">
                        <img class="mr-4" :src="restList.imageUrl" alt="Generic placeholder image">
                        <div class="media-body">
                          <h6 class="mb-2">
                            <a href="detail.html" class="text-black">{{restList.name}}</a>
                          </h6>
                          <p class="text-gray mb-1"><i class="fas fa-map-marker-alt"></i> {{restList.province.replace(/_/g, ' ')}}, {{restList.district.replace(/_/g, ' ')}}, {{restList.neighborhood.replace(/_/g, ' ')}}</p>
                          <p class="text-gray mb-1"><i class="far fa-clock"></i> {{restList.openTime}} AM - {{restList.closeTime}} PM </p>
                          <p class="text-gray mb-1"><i class="fas fa-phone"></i> {{restList.phone}} </p>
                          <p class="text-gray mb-3"><i class="fas fa-envelope"></i> {{restList.email}} </p>
                          <h6 class="mb-0 restaurant-detailed-ratings"><span class="generator-bg rounded text-white" style="background-color:#ff360b;"><i class="icofont-star"></i> 3.1</span> 23 Ratings  <i class="ml-3 icofont-speech-comments"></i> 91 reviews</h6>
                          <hr>
                          <div class="float-right">
                            <a class="btn btn-sm btn-outline-success" href="#"><i class="fas fa-utensils"></i> Reservations</a>
                            <a class="btn btn-sm btn-outline-success" href="#"><i class="fas fa-truck"></i> Orders</a>
                            <button class="btn btn-sm btn-outline-success" @click="MealListByRestaurant(restList.id, restList.name)"><i class="fas fa-cloud-meatball"></i> Meal List</button>
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

  <restaurant-modal ref="restaurantModal" @saved="restaurantSaved"/>
</template>

<script>
import RestaurantService from "../../services/RestaurantService";
import RestaurantModal from "../../components/RestaurantModal.vue";
export default {
  name: 'Restaurant',
  components: {RestaurantModal},
  props: {},
  data() {
    return {
      restaurantList : [],
    }
  },
  created() {
    RestaurantService.findall().then((response) => {
      this.restaurantList = response.data; 
    });
  },
  beforeDestroy() {},
  methods: {
    callRestaurantModal() {
      this.$refs['restaurantModal'].showRestaurantModal();
    },
    restaurantSaved(formData){
      this.restaurantList.push(formData);
    },
    MealListByRestaurant(restaurantId, restaurantName){
      this.$router.push({path: '/Meals', query : { r: restaurantId, rname:restaurantName}});
    },
  },
}
</script>

<style lang="css" scoped></style>

