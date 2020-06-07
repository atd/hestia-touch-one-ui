<template>
  <svg
    version="1.0"
    xmlns="http://www.w3.org/2000/svg"
    class="icon"
    :width="size"
    :height="size"
    viewBox="0 0 692 802"
    style="enable-background:new 0 0 611.999 611.999;"
    stroke="currentColor"
    fill="currentColor">
      <path d="M17 67v47h656V20H17v47zM21.6 123.9c-.3.5 2.5 4.7 6.4 9.3l7 8.3V736H21v39h638v-39h-9V143.5l9-9c5-4.9 9-9.5 9-10.2 0-1.1-62.4-1.3-322.9-1.3-191.1 0-323.2.4-323.5.9zm607 35.8l.2 5.3H57v-11l285.7.2 285.7.3.2 5.2zm-.1 42.3v10.5l-285.7.3L57 213v-22l285.8.2 285.7.3V202zm0 48.5V262l-285.7.3-285.8.2v-24l285.8.2 285.7.3v11.5zm0 48.5v10.5l-285.7.3L57 310v-22l285.8.2 285.7.3V299zm0 49v11.5l-285.7.3L57 360v-24l285.8.2 285.7.3V348zm.3 48.2l-.3 10.3-285.7.3L57 407v-21h572.1l-.3 10.2zm-.3 48.8v11.5l-285.7.3L57 457v-24l285.8.2 285.7.3V445zm-.2 40.2c.3 1.3.5 6.1.4 10.8l-.2 8.5-285.7.2-285.8.1V483h570.8l.5 2.2zm.2 55.8v10.5l-285.7.3L57 552v-22l285.8.2 285.7.3V541zm.1 47.7l.1 10.3H57v-21l285.8.2 285.7.3.1 10.2zm-.1 48.5V649H57v-24l285.8.2 285.7.3v11.7zm-.2 47.3c-.1 4.9-.2 9.8-.2 10.7-.1 1.7-14.4 1.8-285.6 1.8H57v-22l285.7.2 285.7.3-.1 9zm.1 44.7l-.1 6.3-285.6.3L57 736v-13.5l285.7.2 285.7.3v6.2z"/>
    </svg>
</template>

<script>
export default {
  props: {
    size: {
      default: '60%',
      type: String,
    },
  },
};
</script>

<style scoped>
.icon {
  padding-top: 1vh;
  pointer-events: none;
  stroke-width: 1.2;
}

</style>
