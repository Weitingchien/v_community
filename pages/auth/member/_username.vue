vue
<template>
  <div>
    <UserProfile />
  </div>
</template>

<script>
export default {
  middleware: ['isauth', 'isthatyou'],
}
</script>

<style></style>
