<script>
export default {
  props: {
    err: {
      type: String,
      default: '',
    },
  },
}
</script>

<template>
  <v-alert type="error">{{ err }}</v-alert>
</template>

<style></style>
