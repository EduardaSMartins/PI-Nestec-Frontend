<template>
    <div class="m-auto 2xl:w-11/12 w-5/6">
    <div class="flex justify-between my-5">
      <h2 class="text-gray-800 text-xl w-2/12">Produtos</h2>
      <div class="flex">
        <el-button type="primary" @click="handleNew" icon="el-icon-plus"
          >Novo</el-button
        >
        <el-button class="flex" @click="drawer = true">
          <i-filter theme="outline" size="20" fill="#4a4a4a" :strokeWidth="2" />
        </el-button>
      </div>
    </div>

    <!-- Table -->
    <div class="border overflow-y-auto rounded-md" style="max-height: 70vh">
      <el-table :data="tableData" style="width: 100%" header-align="center">
        <el-table-column prop="codigo" label="Código"> </el-table-column>
        <el-table-column prop="nomeProduto" label="Nome"> </el-table-column>
        <el-table-column prop="valorUnitario" label="Preço"> </el-table-column>
        <el-table-column prop="idTipo" label="Categoria"> </el-table-column
        ><el-table-column prop="descricao" label="Descrição"> </el-table-column>
        <el-table-column align="center" label="Operações" width="170"
          ><template slot-scope="scope" class="flex">
            <el-button-group>

              <el-button
                type="primary" size="small"
                @click="handleEdit(scope.$index, scope.row)"
                icon="el-icon-edit"
              ></el-button>
              <el-button
                type="danger" size="small"
                @click.native.prevent="onDelete(scope.$index, scope.row)"
                icon="el-icon-delete"
              ></el-button
            ></el-button-group>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- Form -->
    <div>
      <el-dialog
        title="Novo produto"
        style="margin: auto"
        :close-on-click-modal="false"
        :visible.sync="dialogFormVisible"
      >
        <el-form
          ref="form"
          :model="form"
          style="margin: auto"
          label-position="top"
        >
          <div class="flex flex-wrap justify-between p-8">
            <el-form-item label="Código" class="w-2/5" prop="codigo">
              <el-input
                v-model="form.codigo"
                v-mask="'####-##'"
                placeholder="Código"
                autocomplete="off"
                :disabled="codigoInput"
              ></el-input>
            </el-form-item>

            <el-form-item label="Preço" class="w-2/5" prop="valorUnitario">
              <el-input
                autocomplete="off"
                v-model="form.valorUnitario"
              ></el-input>
            </el-form-item>

            <el-form-item
              class="w-2/5"

              label="Nome"
              prop="nomeProduto"
            >
              <el-input
                v-model="form.nomeProduto"
                placeholder="Nome"
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-form-item label="Categoria" class="w-2/5" prop="idTipo">
              <el-select
                v-model="form.idTipo"
                filterable
                allow-create
                @change="validateTipo(form.idTipo)"
                placeholder="Select"
              >
                <el-option
                  v-for="item in selectCategoria"
                  :key="item.idTipo"
                  :label="item.nomeTipo"
                  :value="item.idTipo"
                >
                </el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="Descrição ">
              <el-input
                type="textarea"
                v-model="form.descricao"
                placeholder="Descrição"
                autocomplete="off"
              ></el-input>
            </el-form-item>
          </div>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button type="danger" @click="dialogFormVisible = false"
            >Cancelar</el-button
          >
          <el-button type="primary" @click="onSubmit">Enviar</el-button>
        </span>
      </el-dialog>
    </div>

    <!-- Pagination -->
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

    <!-- Drawer -->
    <el-drawer title="Filtrar" :visible.sync="drawer" size="20%">
      <hr />
      <div style="height: 90%" class="p-5">
        <el-input
          placeholder="Pesquisar"
          v-model="input"
          class="input-with-select mr-5"
        >
          <el-button
            slot="append"
            icon="el-icon-search"
            size="small"
            style=""
          ></el-button>
        </el-input>
        <div style="width: 100%" class="mt-10">
          <span class="text-sm">Preço</span>
          <br />

          <el-input
            placeholder="Min"
            style="width: 30%"
            v-model="minFilter"
          ></el-input>
          -
          <el-input
            placeholder="Máx"
            style="width: 30%"
            v-model="maxFilter"
          ></el-input>
        </div>
        <div class="mt-10 block">
          <el-collapse v-model="activeName" accordion> </el-collapse>
        </div>
      </div>
      <div class="p-5 float-right">
        <el-button type="error">Cancel</el-button>
        <el-button type="primary">Enviar</el-button>
      </div>
    </el-drawer>
  </div>
</template>


<script>
import { VMoney } from "v-money";
export default {
  directives: { money: VMoney },
  data() {
    return {
      codigoInput: false,
      checked: false,
      checkList: ["checked"],
      currentPage: 1,
      input: "",
      select: "",
      activeName: "1",
      pageSize: 10,
      lastItem: 9,
      firstItem: 0,
      maxFilter: "",
      minFilter: "",
      drawer: false,
      enderecoMetodo: "",
      tituloModal: "",
      metodo: "",
      dialogTableVisible: false,
      dialogFormVisible: false,

      selectCategoria: [],
      formEdit: [],

      form: {
        codigo: "",
        nomeProduto: "",
        valorUnitario: 0,
        idTipo: "",
        descricao: "",
      },
      tableData: [{}],
      tableSecundaria: [],
    };
  },
  layout: false,

  mounted() {
    this.tableSecundaria = this.tableData.slice(0, 10);
    this.allData();
    this.loadCategorias();
  },

  methods: {
    async allData() {
      const { data, status } = await this.$axios
        .get("api/produto/")
        .catch((error) => {
          return {
            data: [],
            status: error.response.status,
          };
        });
      if (status === 200) {
        this.tableData = data.data;
      }
    },
    async loadCategorias() {
      const { data, status } = await this.$axios
        .get("api/tipo/")
        .catch((error) => {
          return {
            data: [],
            status: error.response.status,
          };
        });
      if (status === 200) {
        this.selectCategoria = data[0].data;
      }
    },

    handleSizeChange(val) {
      this.pageSize = val;
      this.tableSecundaria = this.tableData.slice(
        this.firstItem,
        this.pageSize
      );
    },

    handleCurrentChange(val) {
      this.currentPage = val;
    },

    handleNew() {
      this.form = {
        nomeProduto: "",
        codigo: "",
        valorUnitario: "",
        idTipo: "",
        descricao: "",
      };
      this.metodo = "post";
      this.enderecoMetodo = "api/produto/add";
      this.tituloModal = "Novo Produto";
      this.dialogFormVisible = true;
      this.codigoInput = false;
    },

    async handleEdit(index, row) {
      this.dialogFormVisible = true;
      const { data, status } = await this.$axios
        .get(
          "api/produto?filter[idProduto]=" + this.tableData[index]["idProduto"]
        )
        .catch((error) => {
          return {
            data: [],
            status: error.response.status,
          };
        });
      if (status === 200) {
        this.form = data.data[0];
        this.codigoInput = true;
      }
      this.metodo = "put";
      this.enderecoMetodo =
        "api/produto/update/" + this.tableData[index]["idProduto"];
      this.tituloModal = "Editar Produto";
    },

    async onSubmit() {
      this.dialogFormVisible = false;

      let novoproduto = {
        nomeProduto: this.form.nomeProduto,
        codigo: this.form.codigo,
        valorUnitario: this.form.valorUnitario,
        idTipo: this.form.idTipo,
        descricao: this.form.descricao,
      };

      const { data, status } = await this.$axios({
        method: this.metodo,
        url: this.enderecoMetodo,
        data: novoproduto,
      }).catch((error) => {
        return {
          data: [],
          status: error.response.status,
        };
      });
      if (status === 200) {
        this.form = {
          nomeProduto: "",
          codigo: "",
          valorUnitario: "",
          idTipo: "",
          descricao: "",
        };
        this.messageSave();
      } else {
        this.messageError();
      }
    },

    onDelete(index, dados) {
      this.$confirm(
        "Esta ação deletará este produto e todos seus dados. Deseja continuar?",
        "Cuidado!",
        {
          confirmButtonText: "OK",
          cancelButtonText: "Cancelar",
          type: "warning",
        }
      )
        .then(() => {
          this.$message({
            type: "success",
            message: "Deletado com sucesso",
          });

          this.$axios
            .delete(`api/produto/delete/${dados.idProduto}`)
            .then((response) => {
              var index = this.tableData.indexOf(dados);
              this.tableData.splice(index, 1);
            })
            .catch((error) => {
              console.log("Algo deu errado!");
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "Cancelado",
          });
        });
    },

    async validateTipo() {
      if (typeof this.form.idTipo === "string") {
        let novoTipo = {
          nomeTipo: this.form.idTipo,
        };

        const { data, status } = await this.$axios({
          method: "post",
          url: "api/tipo/add",
          data: novoTipo,
        }).catch((error) => {
          return {
            data: [],
            status: error.response.status,
          };
        });
        if (status === 200) {
          this.selectCategoria.push(data)
          this.form.idTipo = data.idTipo;
          this.messageSave();

        } else {
          this.messageError();
        }
      }
    },

    nextPage() {
      this.firstItem = this.lastItem + 1;
      if (this.tableData.length < this.pageSize * this.currentPage) {
        this.lastItem = this.tableData.length;
      } else {
        this.lastItem += this.pageSize;
      }
      this.tableSecundaria = this.tableData.slice(
        this.firstItem,
        this.lastItem + 1
      );
    },
    prevPage() {
      this.lastItem = this.firstItem - 1;

      this.firstItem = this.firstItem - this.pageSize;
      this.tableSecundaria = this.tableData.slice(
        this.firstItem,
        this.lastItem + 1
      );
    },
    messageDelete() {
      this.$message({
        showClose: true,
        message: "Item deletado!",
        type: "success",
      });
    },
    messageError() {
      this.$message({
        showClose: true,
        message: "Algo deu errado, tente novamente!",
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
</style>
