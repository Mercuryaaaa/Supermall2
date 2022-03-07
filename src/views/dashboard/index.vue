<template>
  <div class="dashboard-container">
    <!-- <div class="dashboard-text">name: {{ name }}</div> -->
    <h1>Mercuryaaaa_</h1>
    <card />
    <sale />
    <observe />
  </div>
</template>

<script>
// import { mapGetters } from 'vuex'
import Card from './Card';
import Sale from './Sale';
import Observe from './Observe';
export default {
  name: 'Dashboard',
  // computed: {
  //   ...mapGetters([
  //     'name'
  //   ])
  // },
  methods: {},
  components: {
    Card,
    Sale,
    Observe
  }
}
</script>

<style lang="scss" scoped>
// .dashboard {
//   &-container {
//     margin: 5px;
//   }
//   &-text {
//     font-size: 30px;
//     line-height: 46px;
//   }
// }
</style>
