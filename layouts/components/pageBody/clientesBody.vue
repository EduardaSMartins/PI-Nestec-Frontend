<template>
  <div class="m-auto 2xl:w-11/12 w-5/6">
    <div class="flex justify-between my-5">
      <h2 class="text-gray-800 text-xl w-2/12">Clientes</h2>
      <div class="flex">
        <div class="flex">
          <el-button type="primary" @click="dialogFormVisible = true" icon="el-icon-plus"
            >Novo</el-button
          >
          <!-- <el-button class="flex" @click="drawer = true"> </el-button> -->
        </div>
      </div>
    </div>
    <div class="border overflow-y-auto rounded-md" style="max-height: 70vh">
      <!-- Tabela -->
      <div class="border overflow-y-auto rounded-md" style="max-height: 70vh">
        <el-table :data="tableData" style="width: 100%" header-align="center">
          <el-table-column prop="razao_social" label="Razão Social"> </el-table-column>
          <el-table-column prop="nome_fantasia" label="Nome Fantasia"> </el-table-column>
          <el-table-column prop="telefone" label="Telefone"> </el-table-column>
          <el-table-column align="center" label="Operações" width="170">
            <template slot-scope="scope" class="flex">
              <el-button-group>
                <el-button
                  type="primary"
                  size="small"
                  @click="handleEdit(scope.$index, scope.row)"
                  icon="el-icon-edit"
                ></el-button>
              </el-button-group>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>

    <!-- Pagination -->
    <!-- <div class="block m-auto w-full">
      <el-pagination
        @size-change="sizeChange"
        @current-change="currentChange"
        :page-sizes="[12, 50, 100, 200]"
        :page-size="paginate.per_page"
        layout="total, sizes, prev, pager, next, jumper"
        :total="paginate.total"
        :current-page.sync="paginate.current_page"
      >
      </el-pagination>
    </div> -->

    <!-- FORM  -->
    <!-- <div>
      <el-dialog
        :title="this.titleModal"
        :visible.sync="dialogFormVisible"
        :close-on-click-modal="false"
      >
        <el-form
          title="Novo cadastro"
          style="margin: auto"
          :close-on-click-modal="false"
          :visible.sync="dialogFormVisible"
          width="80%"
        >
          <FormCadastro
            :cadastro="cadastro"
            methods="POST"
            link="api/produto/adicionar"
            :dialogFormVisible="dialogFormVisible"
            @statusDialogo="statusDialogo(event)"
          />
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button type="danger" @click="dialogFormVisible = false">Cancelar</el-button
          ><el-button type="primary" @click="onSubmit()">Enviar</el-button>
        </span>
      </el-dialog>
    </div> -->
    <div>
      <el-dialog
        title="Novo cadastrp"
        style="margin: auto"
        :close-on-click-modal="false"
        :visible.sync="dialogFormVisible"
        width="80%"
      >
        <FormCadastro
          :cadastro="cadastro"
          methods="POST"
          link="api/cadastro/adicionar"
          :dialogFormVisible="dialogFormVisible"
          @statusDialogo="statusDialogo(event)"
        />
      </el-dialog>
    </div>

    <!-- <el-drawer title="Filtrar" :visible.sync="drawer" size="20%">
      <hr />
      <div style="height: 90%" class="p-5">
        <el-input placeholder="Pesquisar" v-model="search" class="input-with-select mr-5">
          <el-button
            slot="append"
            icon="el-icon-search"
            size="small"
            style=""
          ></el-button>
        </el-input>
      </div> -->
    <div class="p-5 float-right">
      <el-button type="danger" @click="dialogFormVisible = false">Cancelar</el-button>
      <el-button type="primary">Enviar</el-button>
    </div>
    <!-- </el-drawer> -->
  </div>
</template>

<script>
import { mapState } from "vuex";
import FormCadastro from "~/pages/clientes/components/form-cadastro.vue";

export default {
  data() {
    return {
      cpfInput: false,
      loading: false,
      titleModal: "",
      method: "",
      search: "",
      methodAddress: "",
      imageUrl: "",
      currentPage: 1,
      pageSize: 10,
      lastItem: 9,
      firstItem: 0,
      titleModal: "",
      drawer: false,

      dialogFormVisible: false,
      dialogFormVisible: false,
      form: {
        nome: "",
        cpf: "",
        nascimento: "",
        telefone: "",
      },
      tableSecundaria: [],
      rules: {
        cpf: [
          {
            required: true,
            message: "Digite um cpf.",
            trigger: "blur",
          },
          {
            min: 14,
            max: 14,
            message: "Tamanho incorreto.",
            trigger: "blur",
          },
        ],
        nome: [
          {
            required: true,
            message: "Digite um nome.",
            trigger: "blur",
          },
        ],
      },
      tableData: [
        {
          cpf: "",
          nome: "",
          telefone: "",
          nascimento: "",
        },
      ],
    };
  },
  components: { FormCadastro },
  computed: {
    ...mapState({
      collapsed: (state) => state.isCollapsed,
    }),
  },
  mounted() {
    this.tableSecundaria = this.tableData.slice(0, 10);
    this.allData();
  },
  methods: {
    formatDate(row, column, cellValue) {
      let data = new Date(cellValue.replace(/-/g, "/").replace(/T.+/, ""));
      return data.toLocaleDateString("pt-BR");
    },
    async allData() {
      onload = function () {
        this.loading = false;
        console.log(this.loading);
      };
      this.loading = true;
      const { data, status } = await this.$axios.get("/api/cadastro").catch((error) => {
        return {
          data: [],
          status: error.response.status,
        };
      });
      if (status === 200) {
        this.tableData = data[0].data;
        //console.log(data[0].data);
      }
      this.loading = false;
    },
  },
  async onSubmit() {
    this.dialogFormVisible = false;

    let novocliente = {
      nome: this.form.nome,
      cpf: this.form.cpf,
      nascimento: this.form.nascimento,
      telefone: this.form.telefone,
    };

    const { data, status } = await this.$axios({
      method: this.method,
      url: this.methodAddress,
      data: novocliente,
    }).catch((error) => {
      return {
        data: [],
        status: error.response.status,
      };
    });
    if (status === 200) {
      this.messageSave();
      this.form = { nome: "", cpf: "", nascimento: "", telefone: "" };
    } else {
      this.messageErrorClient();
    }
  },

  onSearch() {},
  messageDelete() {
    this.$message({
      showClose: true,
      message: "Item deletado!",
      type: "success",
    });
  },
  messageErrorClient() {
    this.$message({
      showClose: true,
      message: "Algo deu errado, tente novamente.",
      type: "error",
    });
  },
  messageError() {
    this.$message({
      showClose: true,
      message: "Algo deu errado!",
      type: "error",
    });
  },
  messageSave() {
    this.$message({
      showClose: true,
      message: "Dados salvos!",
      type: "success",
    });
  },
};
</script>
<style>
.el-dialog {
  width: 30%;
}
.el-date-editor.el-input,
.el-date-editor.el-input__inner {
  width: 100%;
}
</style>
