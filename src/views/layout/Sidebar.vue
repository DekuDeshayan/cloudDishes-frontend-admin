<template>
    <!-- Main Sidebar Container -->
  <aside class="main-sidebar sidebar-dark-primary elevation-4">
    <!-- Brand Logo -->
    <a href="" class="brand-link hide-on-print ">
      <img src="../../../public/plugins/adminlte/img/AdminLTELogo.png" alt="AdminLTE Logo" class="brand-image img-circle elevation-3" style="opacity: .8">
      <span class="brand-text font-weight-light">cloudDishes <small>V1.0</small></span>
    </a>

    <!-- Sidebar -->
    <div class="sidebar">
      <!-- Sidebar user panel (optional) -->
      <div class="user-panel mt-3 pb-3 mb-3 d-flex">
        <div class="image">
          <img src="../../../public/plugins/adminlte/img/user2-160x160.jpg" class="img-circle elevation-2" alt="User Image">
        </div>
        <div class="info">
          <a href="#" class="d-block"> {{currentUser.username}}</a>
        </div>
      </div>
       <!-- SidebarSearch Form -->
      <div class="form-inline">
        <div class="input-group" data-widget="sidebar-search">
          <input class="form-control form-control-sidebar" type="search" placeholder="Search for menu itens" aria-label="Search">
          <div class="input-group-append">
            <button class="btn btn-sidebar">
              <i class="fas fa-search fa-fw"></i>
            </button>
          </div>
        </div>
      </div>


      <!-- Sidebar Menu -->
      <nav class="mt-2">
        <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
          <!-- Add icons to the links using the .nav-icon class
               with font-awesome or any other icon font library -->
          <li class="nav-item menu-open">
            <router-link to="/" class="nav-link">
              <i class="nav-icon fas fa-home"></i>
              <p>
                Home
              </p>
            </router-link>
          </li>

          <!--Menu Administration  -->
          
            <li class="nav-item menu-open">
              <a href="#" class="nav-link">
                <i class="nav-icon fas fa-user"></i>
                <p>
                  Users
                  <i class="fas fa-angle-left right"></i>
                </p>
              </a>
              <ul class="nav nav-treeview">
              
              
                <li class="nav-item">
                  <router-link to="/customer" class="nav-link">
                    <i class="far fa-circle nav-icon"></i>
                    <p>
                      Customer
                    </p>
                  </router-link>
                </li>
            


                <li class="nav-item">
                  <router-link to="/receptionist" class="nav-link">
                    <i class="far fa-circle nav-icon"></i>
                    <p>
                      Receptionist
                    </p>
                  </router-link>
                </li>

                <li class="nav-item">
                  <router-link to="/manager" class="nav-link">
                    <i class="far fa-circle nav-icon"></i>
                    <p>
                      Manager
                    </p>
                  </router-link>
                </li>

               
              <!--                 
                <li class="nav-item">
                  <router-link to="/admin" class="nav-link">
                    <i class="far fa-circle nav-icon"></i>
                    <p>
                      Admin
                    </p>
                  </router-link>
                </li> 
              -->

              </ul>

            </li>



             <!--Menu Restaurant  -->
          
            <li class="nav-item menu-open">
              <a href="#" class="nav-link">
                <i class="nav-icon fas fa-hotel"></i>
                <p>
                  Restaurants
                  <i class="fas fa-angle-left right"></i>
                </p>
              </a>
              <ul class="nav nav-treeview">
              
              
                <li class="nav-item">
                  <router-link to="/restaurant" class="nav-link">
                    <i class="far fa-circle nav-icon"></i>
                    <p>
                      Manage
                    </p>
                  </router-link>
                </li>

              </ul>

            </li>

        </ul>
      </nav>
      <!-- /.sidebar-menu -->
    </div>
    <!-- /.sidebar -->
  </aside>
</template>
<script>
import vuex from 'vuex';
import Role from '../../models/enums/Role';

export default {
  computed: {
     ...vuex.mapGetters(['currentUser']),
     isAdmin() {
       return this.currentUser?.role === Role.ADMIN;  
     },
  },
  methods: {
    ...vuex.mapActions(['clearUser']),
    logOut() {
      //clear user fom vuex
      this.clearUser();
      this.$router.push('/login');
    },
  },
}
</script>

<style lang="css" scoped></style>
