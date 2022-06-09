<template>
    <!-- <div class="mt-2 w-full" style="max-height: 80vh">
      <ProdutosBody :produto="produto" />
    <div> -->
    <div class="mt-2 w-full" style="max-height: 80vh">
      <FormProduto :produto="produto" 
      
      methods="POST"
      :link="`api/produto/adicionar`"
      />  
  </div>
</template>

<script>
import FormProduto from "../components/form-produto.vue";
import ProdutosBody from "../../../layouts/components/pageBody/produtosBody.vue";
export default {
  components: { ProdutosBody, FormProduto },
  beforeRouteLeave(to, from, next) {
    if (this.isEditing) {
      this.$confirm(
        "Você perderá suas modificações. Quer continuar?",
        "Atenção",
        {
          confirmButtonText: "Sair",
          cancelButtonText: "Cancelar",
          type: "error",
        }
      )
        .then(() => {
          // this.resetMixinProjeto()
          next();
        })
        .catch(() => {});
    } else {
      next();
    }
  },
  data() {
    return {
      // isEditing: true,
      produto: {
        nome: null,
        descricao: null,
        codigo_barras: null,
        codigo_interno: null,
        sabor: null,
        cor: null,
        tamanho: null,
        quantidade_minima: 1,
        quantidade_caixa: 1,
        quantidade_estoque: 0,
        valor_unitario: 0
      },
    }
  },
  methods: {},
};
</script>