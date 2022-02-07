<template>
  <div>
    <UserProfile />
  </div>
</template>

<script>
export default {
  middleware: 'isAuthenticated',
}
</script>

<style></style>
