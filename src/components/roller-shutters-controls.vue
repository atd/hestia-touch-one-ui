<template>
  <div class="grid roller-shutters-grid">
    <div class="roller-shutters-container">
      <div class="roller-shutter roller-shutter-left"></div>
      <div class="roller-shutter roller-shutter-middle"></div>
      <div class="roller-shutter roller-shutter-right"></div>
    </div>
  </div>
</template>

<script>

export default {
  components: {
  },
  computed: {
  },
  methods: {
  }
}
</script>

<style scoped>
  .roller-shutters-container {
    position: absolute;
    top: 29%;
    width: 100%;
    height: 100%;
  }

  .roller-shutter {
    position: absolute;
    height: 210px;
    background-color: #B17136;
  }

  .roller-shutter-left {
    width: 105px;
  }

  .roller-shutter-middle {
    width: 210px;
    left: 128px;
  }

  .roller-shutter-right {
    width: 105px;
    right: 3%;
  }
</style>
