<template>
  <div class="loading-overlay" v-if="isLoading">
    <!-- <img src="https://yolandamatiwane.github.io/vueProjectImages/spinners/Animation%20-%201720183217052.gif" class="spinner" alt="Loading..."> -->
      <div class="spinner-container">
        <!-- Bootstrap spinner with white color -->
        <div class="spinner-border text-light" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
  </div>
</template>

<script>
export default {
  props: {
    isLoading: {
      type: Boolean,
      required: true
    }
  }
}
</script>

<style scoped>
  .loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}
  .spinner-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px; 
  width: 100px;
}

.spinner-border {
  width: 3rem;
  height: 3rem;
}

.text-light {
  color: #ffffff;
}
</style>
