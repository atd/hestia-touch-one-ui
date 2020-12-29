<!--
  Based on https://github.com/dangvanthanh/vue-clock
  Improvement suggestions by https://github.com/jaythomas
-->
<template>
  <div class="clock">
    <span v-text="hours"></span>:<span v-text="minutes"></span>
  </div>
</template>

<script>
export default {
  data() {
    return {
      timer: null,
      hours: 0,
      minutes: 0
    };
  },
  mounted() {
    this.updateTime()
  },
  beforeDestroy() {
    window.clearTimeout(this.timer)
  },
  methods: {
    updateTime() {
      const now = new Date()

      this.hours = now.getHours()

      let minutes = now.getMinutes()
      if (minutes < 10) {
        minutes = '0' + minutes
      }
      this.minutes = minutes

      const secondsLeft = 60 - now.getSeconds()
      this.timer = window.setTimeout(this.updateTime, secondsLeft * 1000)
    },
  },
}
</script>

<style scoped>
  .clock {
    position: absolute;
    right: 21%;
    top: 26%;
    font-size: 12vh;
  }

</style>
