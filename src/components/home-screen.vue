<template>
  <div id="home-screen">
    <power-settings-modal
      :mode="lastTappedMode"
      :on-option-select="powerModalCallback"
      v-if="showPowerModal"
      />
    <div class="top-container">
      <div v-if="showHeating"
        class="mode-btn heat"
        :class="{
          animated: modes.heat.running || modes.heat2.running,
          'color-heat': (selectedMode || lastTappedMode) === 'heat',
          'color-off': (selectedMode || lastTappedMode) !== 'heat'
        }"
        @click="openPowerModal('heat')">
        <!-- Switch out icon for 2nd-stage heating -->
        <icon-heat size="76%" v-if="!modes.heat2.running" />
        <icon-heat2 size="76%" v-if="modes.heat2.running" />
      </div>
      <div v-if="showCooling"
        class="mode-btn cool"
        :class="{
          animated: modes.cool.running,
          'color-cool': (selectedMode || lastTappedMode) === 'cool',
          'color-off': (selectedMode || lastTappedMode) !== 'cool'
        }"
        @click="openPowerModal('cool')">
        <icon-cool size="80%" />
      </div>
      <div v-if="showFan"
        class="mode-btn fan"
        :class="{
          animated: modes.fan.running,
          'color-fan': (selectedMode || lastTappedMode) === 'fan',
          'color-off': (selectedMode || lastTappedMode) !== 'fan'
        }"
        @click="openPowerModal('fan')">
        <icon-fan size="82%" />
      </div>
      <div v-if="showHumidity"
        class="mode-btn humidity"
        :class="{
          animated: modes.humidity.running,
          'color-humidity': (selectedMode || lastTappedMode) === 'humidity',
          'color-off': (selectedMode || lastTappedMode) !== 'humidity'
        }"
        @click="openPowerModal('humidity')">
        <icon-humidity size="82%" />
      </div>
      <div v-if="showHotWater"
        class="mode-btn hotwater"
        :class="{
          animated: modes.hotwater.running,
          'color-hotwater': (selectedMode || lastTappedMode) === 'hotwater',
          'color-off': (selectedMode || lastTappedMode) !== 'hotwater'
        }"
        @click="openPowerModal('hotwater')">
        <icon-hotwater size="70%" />
      </div>
      <div v-if="showRollerShutters"
        class="mode-btn roller-shutters"
        :class="{
          'color-roller-shutters': selectedMode === 'roller-shutters',
          'color-off': selectedMode !== 'roller-shutters'
        }"
        @click="select('roller-shutters')">
        <icon-roller-shutters size="70%" />
      </div>
      <clock />
      <div class="mode-btn info color-off" @click="toggleInfoScreen">
        <icon-info size="75%" />
      </div>
    </div>
    <div class="grid" v-if="showTemperatureControls">
      <!-- row -->
      <div class="anavi-row"
        :class="{
          'color-off': thermometerSwitch !== 'Anavi'
        }">
        <div class="anavi-temp unselectable">
          {{ anaviTemperature }}<span class="symbol">°</span>
        </div>
        <div class="anavi-humidity unselectable">
          {{ anaviHumidity }}<span class="symbol">%</span>
        </div>
        <div class="anavi-button thermometer-switch unselectable"
          @click="selectThermometer('Anavi')">
          Habitación
        </div>
      </div>

      <!-- row -->
      <div class="current-row"
        :class="{
          'color-off': thermometerSwitch !== 'My'
        }">
        <div class="current-temp unselectable">
          {{ currentTemperature }}<span class="symbol">°</span>
        </div>
        <div class="current-humidity unselectable">
          {{ currentHumidity }}<span class="symbol">%</span>
        </div>
        <div class="current-button thermometer-switch unselectable"
          @click="selectThermometer('My')">
          Salón
        </div>
      </div>

      <!-- row -->
      <div class="active-temp unselectable" v-html="targetTemperature">
      </div>
      <div v-if="showControls" class="value-controls unselectable">
        <div class="decrement" @click="decrement">-</div>
        <div class="increment" @click="increment">+</div>
      </div>

    </div>
    <roller-shutters-controls v-if="showRollerShuttersControls" />
    <div class="bottom-container" v-if="showTemperatureControls">
      <div class="power-setting-text">{{ powerSettingText }}</div>
      <div class="comfort-mode">
        <span v-if="comfortMode">Modo confort</span>
        <span v-else>Rango de confort: &plusmn;{{ hysteresis }}&deg;</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import powerSettingsModal from './power-settings-modal.vue'
import iconCool from './icon-cool.vue'
import iconHeat from './icon-heat.vue'
import iconHeat2 from './icon-heat2.vue'
import iconFan from './icon-fan.vue'
import iconHumidity from './icon-humidity.vue'
import iconHotwater from './icon-hotwater.vue'
import iconRollerShutters from './icon-roller-shutters.vue'
import clock from './clock.vue'
import iconInfo from './icon-info.vue'
import rollerShuttersControls from './roller-shutters-controls.vue'

export default {
  data() {
    return {
      // Called by the power settings modal when you tap on a mode
      powerModalCallback: () => {},
      // Give the power settings modal context of what options to show
      lastTappedMode: '',
      showPowerModal: false
    }
  },
  components: {
    iconCool,
    iconFan,
    iconHeat,
    iconHeat2,
    iconHumidity,
    iconHotwater,
    iconRollerShutters,
    clock,
    iconInfo,
    powerSettingsModal,
    rollerShuttersControls
  },
  computed: {
    // Some variables in $store.state we want to read
    // https://vuex.vuejs.org/guide/state.html#the-mapstate-helper
    ...mapState([
      'comfortMode',
      'currentTemperature',
      'currentHumidity',
      'icons',
      'hysteresis',
      'modes',
      'selectedMode',
      'showControls',
      'showCooling',
      'showFan',
      'showHeating',
      'showHotWater',
      'showHumidity',
      'anaviTemperature',
      'anaviHumidity',
      'thermometerSwitch',
      'showRollerShutters'
    ]),
    powerSettingText() {
      const modes = {
        cool: () => 'Cooling',
        heat: () => this.modes.heat2.running ? '2nd-stage heating' : 'Calefacción',
        hotwater: () => 'Hot water',
        humidity: () => 'Humidity control',
        fan: () => 'Fan'
      }
      if (this.selectedMode && modes[this.selectedMode]) {
        const modeState = this.modes[this.selectedMode]
        const modeText = modes[this.selectedMode]()
        if (modeState.boostEnabled) {
          return `${modeText} boost mode, ${modeState.boostTimeRemaining} min. remaining`
        }

        if ((modeText == 'Fan') && ((modeState.active) || (modeState.running))) {
          return `${modeText} on`
        } else {
          if (modeState.active) {
            return `${modeText} auto`
          }
        }

        return `${modeText} off`
      }
      return ''
    },
    targetTemperature() {
      return this.$store.getters.targetTemperature
    },
    showTemperatureControls() {
      return this.selectedMode !== 'roller-shutters'

    },
    showRollerShuttersControls() {
      return this.selectedMode === 'roller-shutters'
    }
  },
  methods: {
    select(mode) {
      if (this.selectedMode !== mode) {
        this.$store.commit('addReturnToTimeout', { mode: this.selectedMode })

        this.$store.commit('selectMode', mode)
      }
    },
    openPowerModal(mode) {
      // First tap, only select
      if (this.selectedMode !== mode) {
        this.$store.commit('selectMode', mode)
        return
      }

      // Second tap, open the modal
      this.lastTappedMode = mode
      this.powerModalCallback = powerOption => {
        this.$store.commit('selectPowerSetting', { mode, powerOption })
        this.lastTappedMode = ''
        this.showPowerModal = false
      }
      this.showPowerModal = true
    },
    decrement() {
      this.$store.commit('decrementTargetValue')
    },
    increment() {
      this.$store.commit('incrementTargetValue')
    },
    toggleInfoScreen() {
      this.$store.commit('toggleInfoScreen')
    },
    selectThermometer(thermometer) {
      this.$store.commit('selectThermometer', thermometer)
    }
  }
}
</script>

<!-- "scoped" attribute limits CSS to this component only -->
<style scoped>
@keyframes changecolor {
  from {
    color: black;
  }

  to {
  }
}

/* Apply to any mode that is running to give it a glowing effect */
.animated {
  animation: changecolor 2s steps(8) infinite alternate;
}

.active-temp {
  font-size: 27vh;
  left: 5%;
  line-height: 100%;
  bottom: 9%;
  width: 40vw;
  text-align: left;
}

.active-temp > .symbol {
  font-size: 18vh;
  vertical-align: text-top;
}

.bottom-container {
  bottom: 0;
  height: 8vh;
  left: 5%;
  position: absolute;
  text-align: left;
  width: 100%;
}

.bottom-container > .power-setting-text {
  display: inline;
  position: relative;
}

.bottom-container > .comfort-mode {
  display: inline;
  float: right;
  position: relative;
  right: 10%;
}

.current-row {
  position: absolute;
  top: 45%;
  width: 100%;
  left: 0;
}

.current-row > div {
  position: absolute;
}

.current-temp {
  font-size: 14vh;
  left: 5%;
  text-align: left;
  top: 45%;
  width: 30%;
}

.current-temp > .symbol {
  font-size: 12vh;
  vertical-align: text-top;
}

.anavi-row {
  position: absolute;
  top: 28%;
  width: 100%;
  left: 0;
}

.anavi-row > div {
  position: absolute;
}

.anavi-temp {
  font-size: 14vh;
  left: 5%;
  text-align: left;
  top: 28%;
  width: 30%;
}

.anavi-temp > .symbol {
  font-size: 12vh;
  vertical-align: text-top;
}

.current-humidity {
  top: 45%;
  font-size: 14vh;
  left: 18%;
  text-align: right;
  width: 30%;
}

.current-button {
  top: 28%;
  right: 5%;
}

.current-humidity > .symbol {
  font-size: 10vh;
}

.anavi-humidity {
  top: 28%;
  font-size: 14vh;
  left: 18%;
  text-align: right;
  width: 30%;
}

.anavi-humidity > .symbol {
  font-size: 10vh;
}

.anavi-button {
  top: 45%;
  right: 5%;
}

.thermometer-switch {
  border-style: solid;
  border-width: 2px;
  border-radius: 6px;
  text-align: center;
  font-size: 8vh;
  width: 40%;
  height: 12vh;
  line-height: 12vh;
  margin-top: 2vh;
}

.grid {
  height: 100%;
  width: 100%;
}

.grid > div {
  position: absolute;
}

.grid-home-icon {
  height: 6vw;
  width: 6vw;
  right: 0.5%;
  bottom: 51%;
}

.grid-humidity-icon {
  bottom: 20%;
  height: 5vw;
  right: 1vw;
  width: 5vw;
}

.mode-btn {
  cursor: pointer;
  display: inline-block;
  float: left;
  height: 100%;
  margin-top: 4vh;
  width: 26vh;
}

.mode-btn.cool {
  margin-top: 3vh;
}

.mode-btn.heat {
  margin-top: 4.4vh;
}

.mode-btn.humidity {
  margin-top: 2.8vh;
}

.mode-btn.hotwater {
  margin-top: 4.4vh;
}

.mode-btn.info {
  position: absolute;
  right: 3%;
}

.top-container {
  color: #e0e5e8;
  height: 25%;
  max-height: 25%;
  position: absolute;
  top: 0;
  width: 100%;
}

.value-controls {
  bottom: 7%;
  height: 13vh;
  width: 41vw;
  right: 5%;
}

.value-controls > div {
  border-style: solid;
  border-width: 2px;
  border-radius: 6px;
  bottom: 20%;
  cursor: pointer;
  height: 24vh;
  font-size: 20vh;
  display: inline-block;
  text-align: center;
  width: 46%;
}

.value-controls > .decrement {
  position: absolute;
  left: 0;
}

.value-controls > .increment {
  position: absolute;
  right: 0;
}
</style>
