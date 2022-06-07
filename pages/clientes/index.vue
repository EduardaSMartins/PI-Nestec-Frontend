<template>
  <div
    v-if="collapsed == true"
    class="
      h-screen
      mx-auto
      float-right
      transition-all
      duration-500
      pt-10
      bg-gray-50
    "
    style="width: 96%"
  >
    <ClientesBody />
  </div>

  <div
    v-else
    class="h-screen mx-auto float-right transition-all pt-10 bg-gray-50 xl:5/6 2xl:w-11/12"
    style="width: 90%"

  >
    <ClientesBody />
  </div>
</template>



<script>
import { mapState, mapMutations } from "vuex";
import ClientesBody from "../../layouts/components/pageBody/clientesBody.vue";

export default {
  components: { ClientesBody },
  computed: {
    ...mapState({
      collapsed: (state) => state.isCollapsed,
    }),
  },
};
</script>
