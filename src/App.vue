<template>
<div class="wrapper">
    <router-view/>
</div>

</template>

<script>
import vuex from "vuex";
export default {
  name: 'App',
  components:  {},
  props: {},
  data() {
    return {
      property: 'value',
    }
  },
  mounted() {},
  beforeDestroy() {},
  computed: {
    ...vuex.mapGetters(['currentUser']),
  },
  methods: {}
}
</script>


<style lang="css" scoped></style>