<template>
  <div
    class="h-screen m-auto float-right transition-all duration-500 pt-10 bg-gray-50"
    style="width: 96%"
  >
    <ProdutosBody />
  </div>

  <!-- <div
    v-else
    class="h-screen mx-auto float-right transition-all pt-10 bg-gray-50 xl:5/6 2xl:w-11/12"
    style="width: 90%"
  >
    <ProdutosBody />
  </div> -->
</template>

<script>
import { mapState, mapMutations } from "vuex";
import ProdutosBody from "../../layouts/components/pageBody/produtosBody.vue";
import FormProduto from "./components/form-produto.vue";

export default {
  components: { ProdutosBody },
  // computed: {
  //   ...mapState({
  //     collapsed: (state) => state.isCollapsed,
  //   }),
  // },
};
</script>
