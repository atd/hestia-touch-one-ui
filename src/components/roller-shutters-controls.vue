<template>
  <div class="grid roller-shutters-grid">
    <div class="roller-shutters-container">
      <div class="roller-shutter-window roller-shutter-window-left"
        data-label="left"
        @click="update">
        <div class="roller-shutter" :style="{ height: shutterHeight('left')}"
          @click="update"></div>
      </div>
      <div class="roller-shutter-window roller-shutter-window-middle"
        data-label="middle"
        @click="update">
        <div class="roller-shutter" :style="{ height: shutterHeight('middle')}"
          @click="update"></div>
      </div>
      <div class="roller-shutter-window roller-shutter-window-right"
        data-label="right"
        @click="update">
        <div class="roller-shutter" :style="{ height: shutterHeight('right')}"
          @click="update"></div>
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
      // HestiaPi's kweb browser does not propagate click events,
      // (or at least, they don't reach Vue)
      // so we have to set the trigger in both divs
      event.stopPropagation()

      this.$store.commit('addReturnToTimeout')

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

  .roller-shutter-window {
    position: absolute;
    height: 210px;
    background-color: #e0e5e8;
  }

  .roller-shutter-window-left {
    width: 105px;
  }

  .roller-shutter-window-middle {
    width: 210px;
    left: 128px;
  }

  .roller-shutter-window-right {
    width: 105px;
    right: 3%;
  }

  .roller-shutter {
    background-image: linear-gradient(to bottom, #835833, #835833 90%, transparent 90%, transparent 100%), linear-gradient(90deg, #835833, #835833 60%, #e0e5e8 60%, #e0e5e8 100%);
    background-size: 100% 20px, 20px 3px;
    transform: scaleY(-1);
  }
</style>
