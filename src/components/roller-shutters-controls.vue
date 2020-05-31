<template>
  <div class="grid roller-shutters-grid">
    <div class="roller-shutters-container">
      <div class="roller-shutter roller-shutter-left"
        data-label="left"
        @click="update">
        <div class="roller-shutter-holes" :style="{ height: shutterHeight('left')}"></div>
      </div>
      <div class="roller-shutter roller-shutter-middle"
        data-label="middle"
        @click="update">
        <div class="roller-shutter-holes" :style="{ height: shutterHeight('middle')}"></div>
      </div>
      <div class="roller-shutter roller-shutter-right"
        data-label="right"
        @click="update">
        <div class="roller-shutter-holes" :style="{ height: shutterHeight('right')}"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  components: {
  },
  computed: {
    ...mapGetters([
      'shutterHeight'
    ])
  },
  methods: {
    update(event) {
      const label = event.target.getAttribute('data-label') ||
                    event.target.parentElement.getAttribute('data-label')
      const height = event.layerY

      this.$store.commit('updateRollerShutter', { label, height })
    }
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
    background-color: #e0e5e8;
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

  .roller-shutter-holes {
    background-image: linear-gradient(to bottom, #000, #000 90%, transparent 90%, transparent 100%), linear-gradient(90deg, #000, #000 60%, #e0e5e8 60%, #e0e5e8 100%);
    background-size: 100% 20px, 20px 3px;
    transform: scaleY(-1);
  }
</style>
