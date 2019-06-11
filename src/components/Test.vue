<template>
    <div>
        <h3>{{ cacheFirstTime }}</h3>
        <button @click="getCacheFirstTime">Cache First</button>
        -------------------------------
        <h3>{{ networkOnlyTime }}</h3>
        <button @click="getNetworkOnlyTime">Network Only</button>
    </div>
</template>

<script>
    import axios from 'axios';
  export default {
    name: '',
    data () {
      return {
        cacheFirstTime: '',
        networkOnlyTime: ''
      };
    },
    methods: {
      getCacheFirstTime () {
        axios.get('http://localhost:3000/cacheFirst').then(response => {
          this.cacheFirstTime = response.data;
        });
      },
      getNetworkOnlyTime () {
        axios.get('http://localhost:3000/networkOnly').then(response => {
          this.networkOnlyTime = response.data;
        });
      }
    }
  };
</script>

<style scoped>

</style>
