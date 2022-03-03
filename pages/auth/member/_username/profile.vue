<template>
  <div class="profile">
    <UserProfile />
  </div>
</template>

<script>
export default {
  middleware: ['isauth', 'isthatyou'],
}
</script>

<style></style>
