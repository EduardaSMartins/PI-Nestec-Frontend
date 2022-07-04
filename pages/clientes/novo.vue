<template>
  <!-- <div class="mt-2 w-full" style="max-height: 80vh">
      <ProdutosBody :produto="produto" />
    <div> -->
  <div class="mt-2 w-full" style="max-height: 80vh">
    <FormCadastro :cliente="cliente" methods="post" :link="`api/cadastro/adicionar`" />
  </div>
</template>

<script>
import FormCadastro from "../clientes/components/form-cadastro.vue";
import CadastroBody from "../../layouts/components/pageBody/clientesBody.vue";
export default {
  components: { FormCadastro, CadastroBody },
  beforeRouteLeave(to, from, next) {
    if (this.isEditing) {
      this.$confirm("Você perderá suas modificações. Quer continuar?", "Atenção", {
        confirmButtonText: "Sair",
        cancelButtonText: "Cancelar",
        type: "error",
      })
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
      cliente: {
        cpf: null,
        rg: null,
        rg_orgao: null,
        rg_uf: null,
        nome: null,
        sobrenome: null,
        email: null,
        data_nascimento: null,
        telefone: 1,
        quantidade_estoque: 0,
        valor_unitario: 0,
      },
    };
  },
  methods: {},
};
</script>
