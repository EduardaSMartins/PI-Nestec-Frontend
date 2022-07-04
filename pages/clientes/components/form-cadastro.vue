<template>
  <div class="w-full" style="max-height: 95vh">
    <template>
      <div class="mb-4 flex justify-between">
        <h1 v-if="methods === 'post'" class="text-0xl">Novo Cadastro</h1>
      </div>
      <el-form
        :model="cadastro"
        :rules="rules"
        ref="cadastro"
        label-width="110px"
        label-position="vertical-align"
        class="demo-ruleForm"
        :inline="true"
      >
        <el-row :gutter="10">
          <el-col :span="8">
            <el-form-item label="Nome" prop="nome">
              <el-input
                placeholder=""
                width:50
                v-model="cliente.nome"
                :disabled="false"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="Sobrenome" prop="sobrenome">
              <el-input
                placeholder=""
                width:50
                v-model="cliente.sobrenome"
                :disabled="false"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="CPF" prop="cpf">
              <el-input
                    v-model="cadastro.cpf"
                    v-mask="['###.###.###-##']"
                  ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="8">
            <el-form-item label="RG" prop="rg">
              <el-input
                    v-model="cadastro.cpf"
                    v-mask="['##.###.###-#']"
                  ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="E-mail" prop="email">
              <el-input v-model="cliente.email"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="Nascimento" class="w-2/5">
              <el-date-picker
                v-model="cliente.data_nascimento"
                type="date"
                format="dd/MM/yyyy"
                value-format="yyyy-MM-dd"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
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
    cadastro: {
      type: Object,
      default: {},
    },
    methods: {
      type: String,
      default: "post",
    },
    link: {
      type: String,
      default: "api/cadastro/adicionar",
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
        sobrenome: [{ required: true, message: "Digite um sobrenome.", trigger: "blur" }],
        cpf: [{ required: true, message: "Digite um CPF válido.", trigger: "blur" }],
        rg: [{ required: true, message: "Digite um RG válido.", trigger: "blur" }],
        email: [{ required: true, message: "Digite um email válido.", trigger: "blur" }],
        data_nascimento: [{ required: true, message: "Selecione uma data.", trigger: "blur" }],
      },
    };
  },
  methods: {
    async getMixin() {
      const { data, status } = await this.$axios
        .get("api/produto/mixin")
        .catch((error) => {
          return {
            data: [],
            status: error.response.status,
          };
        });
      this.loading = false;
      if (status === 200) {
        {
          {
            categorias;
          }
        }
        this.mixinCategoria = data.categorias;
      }
    },
    selectCategoria(id) {
      var index = _.find(this.mixinCategoria, function (func) {
        return produto.idCategoria === id;
      });
      this.produto.idCategoria = index.mixinCategoria;
    },
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
          } else {
            this.$message({
              message: "Algo deu problema.",
              type: "danger",
            });
          }
        }
      });
    },
    limpaFormulario() {},
  },
};
</script>
