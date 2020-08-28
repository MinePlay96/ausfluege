<template>
  <div class="home">
    <dataTable />
  </div>
</template>

<script>
// @ is an alias to /src
import dataTable from "@/components/dataTable.vue";

export default {
  name: "Home",
  components: {
    dataTable
  }
};
</script>
