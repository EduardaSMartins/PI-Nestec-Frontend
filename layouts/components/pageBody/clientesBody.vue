<template>
  <div class="m-auto 2xl:w-11/12 w-5/6">
    <div class="flex justify-between my-5">
      <h2 class="text-gray-800 text-xl w-2/12">Clientes</h2>
      <div class="flex">
        <el-button
          icon="el-icon-plus"
          @click="handleNew()"
          type="primary"
          class="bg-blue-400 text-sm"
          >Novo
        </el-button>
        <el-button class="flex" @click="drawer = true">
          <i-filter theme="outline" size="20" fill="#4a4a4a" :strokeWidth="2" />
        </el-button>
      </div>
    </div>
    <div class="border overflow-y-auto rounded-md" style="max-height: 70vh">
      <!-- Tabela -->
      <Loading :load="loading" class="" />
      <el-table :data="tableData" style="width: 100%" header-align="center">
        <el-table-column prop="nome" label="Nome"> </el-table-column>
        <el-table-column prop="cpf" label="CPF"> </el-table-column>
        <el-table-column prop="nascimento" label="Nascimento" :formatter="formatDate">
        </el-table-column>
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
              <el-button
                size="small"
                type="danger"
                @click.native.prevent="onDelete(scope.$index, scope.row)"
                icon="el-icon-delete"
              ></el-button
            ></el-button-group>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- FORM  -->
    <div>
      <el-dialog
        :title="this.titleModal"
        :visible.sync="dialogFormVisible"
        :close-on-click-modal="false"
      >
        <el-form
          ref="form"
          :model="form"
          :rules="rules"
          style="margin: auto"
          label-position="top"
          class="p-5 w-"
        >
          <div class="flex flex-wrap justify-between">
            <el-form-item prop="nome" label="Nome " class="w-2/5">
              <el-input
                v-model="form.nome"
                placeholder="Nome"
                autocomplete="off"
              ></el-input>
            </el-form-item>

            <el-form-item prop="cpf" label="CPF" class="w-2/5">
              <el-input
                v-model="form.cpf"
                v-mask="'###.###.###-##'"
                autocomplete="off"
                :disabled="cpfInput"
              ></el-input>
            </el-form-item>
            <el-form-item label="Nascimento" class="w-2/5">
              <el-date-picker
                v-model="form.nascimento"
                type="date"
                format="dd/MM/yyyy"
                value-format="yyyy-MM-dd"
              >
                ></el-date-picker
              >
            </el-form-item>

            <el-form-item label="Telefone" class="w-2/5">
              <el-input
                v-model="form.telefone"
                v-mask="'(##)#########'"
                placeholder="Telefone"
                autocomplete="off"
              ></el-input>
            </el-form-item>
          </div>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button type="danger" @click="dialogFormVisible = false">Cancelar</el-button
          ><el-button type="primary" @click="onSubmit()">Enviar</el-button>
        </span>
      </el-dialog>
    </div>

    <div class="block m-auto w-full">
      <el-pagination
        class="m-auto"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        @next-click="nextPage"
        @prev-click="prevPage"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="handleCurrentChange.val"
        layout="total, sizes, prev, pager, next"
        :total="tableSecundaria.length"
      >
      </el-pagination>
    </div>

    <el-drawer title="Filtrar" :visible.sync="drawer" size="20%">
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
      </div>
      <div class="p-5 float-right">
        <el-button type="danger" @click="dialogFormVisible = false">Cancelar</el-button>
        <el-button type="primary">Enviar</el-button>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Loading from "../loading.vue";

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
  components: {
    Loading,
    filteredClients() {
      return this.tableData.filter();
    },
  },
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
      let data = new Date(cellValue.replace(/-/g, "\/").replace(/T.+/, ""));
      return data.toLocaleDateString("pt-BR");
    },
    async allData() {
      onload = function () {
        this.loading = false;
        console.log(this.loading);
      };
      this.loading = true;
      const { data, status } = await this.$axios.get("/api/pessoa").catch((error) => {
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
    handleSizeChange(val) {
      this.pageSize = val;
      this.tableSecundaria = this.tableData.slice(this.firstItem, this.pageSize);
    },
    handleCurrentChange(val) {
      this.currentPage = val;
    },
    nextPage() {
      this.firstItem = this.lastItem + 1;
      if (this.tableData.length < this.pageSize * this.currentPage) {
        this.lastItem = this.tableData.length;
      } else {
        this.lastItem += this.pageSize;
      }
      this.tableSecundaria = this.tableData.slice(this.firstItem, this.lastItem + 1);
    },
    prevPage() {
      this.lastItem = this.firstItem - 1;

      this.firstItem = this.firstItem - this.pageSize;
      this.tableSecundaria = this.tableData.slice(this.firstItem, this.lastItem + 1);
    },
    async handleEdit(index, row) {
      this.dialogFormVisible = true;
      const { data, status } = await this.$axios
        .get("/api/pessoa?filter[cpf]=" + this.tableData[index]["cpf"])
        .catch((error) => {
          return {
            data: [],
            status: error.response.status,
          };
        });
      if (status === 200) {
        this.form = data[0].data[0];
      }
      this.method = "put";
      this.methodAddress = "/api/pessoa/update/" + this.tableData[index].cpf;
      this.titleModal = "Editar Cliente";
      this.cpfInput = true;
    },
    handleNew() {
      this.form = { nome: "", cpf: "", nascimento: "", telefone: "" };
      this.cpfInput = false;
      this.method = "post";
      this.methodAddress = "/api/pessoa/add";
      this.titleModal = "Novo Cliente";
      this.dialogFormVisible = true;
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
    // onDelete(index, dados) {
    //   this.$confirm(
    //     "Esta ação deletará esta pessoa e todos seus dados. Deseja continuar?",
    //     "Cuidado!",
    //     {
    //       confirmButtonText: "OK",
    //       cancelButtonText: "Cancelar",
    //       type: "warning",
    //     }
    //   )
    //     .then(() => {
    //       this.messageDelete();

    //       this.$axios
    //         .delete(`/api/pessoa/delete/${dados.cpf}`)
    //         .then((response) => {
    //           var index = this.tableData.indexOf(dados);
    //           this.tableData.splice(index, 1);
    //         })
    //         .catch((error) => {
    //           messageError();
    //         });
    //     })
    //     .catch(() => {});
    // },
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
