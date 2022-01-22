<template>
  <div>
    <v-quagga
      :onDetected="detected"
      :onProcessed="processed"
      :readerSize="readerSize"
      :readerTypes="readers"
    ></v-quagga>
  </div>
</template>

<script>
export default {
  data() {
    return {
      readers: ['i2of5_reader', '2of5_reader'],
      readerSize: {
        width: 400,
        height: 400,
      },
      detecteds: [],
    };
  },
  mounted() {},
  methods: {
    processed(data) {
        console.log(data);
    },
    detected(data) {
      console.log(data.codeResult);
    },
  },
};
</script>

<style>
</style>