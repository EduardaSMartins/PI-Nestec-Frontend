<template>
  <div
    class="h-screen m-auto float-right transition-all duration-500 pt-10 bg-gray-50"
    style="width: 96%"
  >
    <ProdutosBody />
  </div>
</template>

<script>
import ProdutosBody from "../layouts/components/pageBody/produtosBody.vue";
export default {
  components: { ProdutosBody },
};
</script>
