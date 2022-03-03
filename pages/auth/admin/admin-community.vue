<template>
  <div>
    <AdminPage />
  </div>
</template>

<script>
export default {
  middleware: ['isadmin'],
}
</script>

<style></style>
