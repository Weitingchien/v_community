<template>
  <div class="textarea">
    <UserTextArea />
  </div>
</template>

<script>
export default {
  middleware: ['isauth', 'isthatyou'],
}
</script>

<style></style>
