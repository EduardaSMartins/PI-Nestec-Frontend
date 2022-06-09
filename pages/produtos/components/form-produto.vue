<template>
  <div class="w-full" style="max-height: 95vh">
    <template>
      <div class="mb-4 flex justify-between">
        <h1 v-if="methods === 'post'" class="text-0xl">Novo Produto</h1>
      </div>
      <el-form
        :model="produto"
        :rules="rules"
        ref="produto"
        label-width="110px"
        label-position="vertical-align"
        class="demo-ruleForm"
      >
        <el-form-item label="Nome" prop="nome">
          <el-input
            placeholder=""
            width:100
            v-model="produto.nome"
            :disabled="false"
          ></el-input>
        </el-form-item>

        <!-- chamar mixin de categorias -->

        <el-form-item label="Descrição" prop="descricao">
          <el-input type="textarea" v-model="produto.descricao"></el-input>
        </el-form-item>

        <el-form-item label="Código Barras" prop="codigo_barras">
          <el-col :span="10">
            <el-input v-model="produto.codigo_barras"></el-input>
          </el-col>
        </el-form-item>

        <el-form-item label="Código Interno" prop="codigo_interno">
          <el-col :span="10">
            <el-input v-model="produto.codigo_interno"></el-input>
          </el-col>
        </el-form-item>

        <el-form-item label="Sabor" prop="sabor">
          <el-col :span="10">
            <el-input v-model="produto.sabor"></el-input>
          </el-col>
        </el-form-item>

        <el-form-item label="Cor" prop="cor">
          <el-col :span="10">
            <!-- <el-color-picker v-model="produto.cor"></el-color-picker> -->
            <el-input type="color" v-model="produto.cor"></el-input>

            <!-- <el-input v-model="produto.cor"></el-input> -->
          </el-col>
        </el-form-item>

        <el-form-item label="Qtde Mínima" prop="quantidade_minima">
          <!-- <el-col :span="11"> -->
          <el-input-number
            v-model="produto.quantidade_minima"
            :min="1"
            :max="1000"
          ></el-input-number>
          <!-- <el-input v-model="produto.quantidade_minima"></el-input> -->
          <!-- </el-col> -->
        </el-form-item>

        <el-form-item label="Qtde Caixa" prop="quantidade_caixa">
          <el-col :span="11">
            <el-input v-model="produto.quantidade_caixa"></el-input>
          </el-col>
        </el-form-item>

        <el-form-item label="Qtde Estoque" prop="quantidade_estoque">
          <el-col :span="11">
            <el-input v-model="produto.quantidade_estoque"></el-input>
          </el-col>
        </el-form-item>

        <el-form-item label="Valor Unitário" class="w-2/4">
          <el-input
            v-model="produto.valor_unitario"
            placeholder="R$"
            autocomplete="on"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="danger" @click="statusDialogo">Cancelar</el-button>
        <el-button type="primary" @click="submit">Enviar</el-button>
      </span>
    </template>
  </div>
</template>

<script>
export default {
  props: {
    produto: {
      type: Object,
      default: {},
    },
    methods: {
      type: String,
      default: "post",
    },
    link: {
      type: String,
      default: "api/produto/adicionar",
    },
    dialogFormVisible: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      rules: {
        nome: [{ required: true, message: "Digite um nome.", trigger: "blur" }],
        codigo_interno: [
          { required: true, message: "Digite o código interno", trigger: "blur" },
        ],
        codigo_barras: [
          { required: true, message: "Digite o código de barras", trigger: "blur" },
        ],
        quantidade_minima: [
          { required: true, message: "Digite a quantidade mínima", trigger: "blur" },
        ],
        quantidade_estoque: [
          { required: true, message: "Digite a quantidade em estoque", trigger: "blur" },
        ],
        valor_unitario: [
          { required: true, message: "Digite o valor unitário", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    statusDialogo() {
      this.$emit("statusDialogo", !this.dialogFormVisible);
    },
    submit() {
      this.$refs["produto"].validate(async (valid) => {
        if (valid) {
          const { data, status } = await this.$axios({
            method: this.methods,
            url: this.link,
            data: { produto: this.produto },
          }).catch((error) => {
            return {
              data: [],
              status: error.response.status,
            };
          });
          if (status === 200) {
            // this.dialogDepto = false;
            this.$message({
              message: "Dados salvos.",
              type: "success",
            });
            this.$route.go();
            // this.produto = {
            //   dep_nome: "",
            //   dep_sigla: "",
            // };
            // location.reload();
          } else {
            this.$message({
              message: "Algo deu problema.",
              type: "danger",
            });
          }
        }
      });
    },
  },
};
</script>
