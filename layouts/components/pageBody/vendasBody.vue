<template>
  <div class="m-auto 2xl:w-11/12 w-5/6">
    <div class="flex justify-between my-5">
      <h2 class="text-gray-800 text-xl w-2/12">Vendas</h2>

      <el-button type="primary" @click="drawer = true" icon="el-icon-plus"
        >Novo</el-button
      >
    </div>

    <div class="border overflow-y-auto rounded-md">
      <el-table
        lazy
        empty-text="Sem dados"
        :data="tableData"
        style="width: 100%"
        header-align="center"
        ><el-table-column type="expand">
          <template slot-scope="props">
            <ul>
              <li
                v-for="item in props.row.vendas"
                :key="item[0].idVenda"
                class="p-0"
              >
                <el-collapse>
                  <el-collapse-item :title="item[0].cpf" class="pl-14">
                    <ul>
                      <li
                        v-for="products in item"
                        :key="products.nomeProduto"
                        class="p-0"
                      >
                        <p border class="p-0">{{ products.nomeProduto }} x{{ products.quantidade }} R${{ products.precoFinal }}</p>
                      </li>
                    </ul>
                  </el-collapse-item>
                </el-collapse>
              </li>
            </ul>
          </template>
        </el-table-column>

        <el-table-column prop="data" :formatter="formatDate" label="Data">
        </el-table-column>
        <el-table-column prop="idVenda" label="Venda"> </el-table-column>

        <el-table-column prop="cpf" label="Cliente"> </el-table-column>
        <el-table-column prop="nomeProduto" label="Produtos"> </el-table-column>

        <el-table-column
          prop="precoFinal"
          width="150px"
          label="Valor total"
        ></el-table-column>
      </el-table>
    </div>

    <div>
      <el-drawer title="Nova venda" :visible.sync="drawer" size="500px">
        <div style="height: 80vh p-5">
          <el-form
            :model="form"
            class="pr-5 p-5 justify-end"
            label-position="top"
          >
            <el-form-item prop="cliente" style="width: 90%" label="Cliente">
              <el-select filterable v-model="form.cliente" placeholder="Select">
                <el-option
                  v-for="item in listaClientes"
                  :key="item.cpf"
                  :label="item.nome"
                  :value="item.cpf"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <div class="flex items-center">
              <el-form-item prop="produto" label="Produto" style="width: 35%">
                <el-select
                  filterable
                  v-model="form.produto"
                  placeholder="Select"
                >
                  <el-option
                    v-for="item in listaProdutos"
                    :key="item.idProduto"
                    :label="item.nomeProduto"
                    :value="item"
                  >
                  </el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="Quantidade" class="pl-3 mr-3">
                <el-input-number
                  v-model="form.quantidade"
                  controls-position="right"
                  :min="1"
                  :max="10"
                  autocomplete="off"
                ></el-input-number>
              </el-form-item>
              <div class="mt-8">
                <el-button
                  type="primary"
                  size="small"
                  icon="el-icon-plus"
                  circle
                  @click="addProduto()"
                ></el-button>
              </div></div
          ></el-form>
          <el-table
            empty-text="Nenhum produto cadastrado"
            class="p-5"
            :data="produtos"
            style="width: 100%"
            header-align="center"
          >
            <el-table-column prop="nomeProduto" label="Produtos">
            </el-table-column>
            <el-table-column prop="quantidade" label="Quantidade">
            </el-table-column
            ><el-table-column prop="valorQuantidade" label="Valor total">
            </el-table-column>
          </el-table>
        </div>

        <div class="p-5 float-right">
          <el-button @click="drawer = false">Cancel</el-button>
          <el-button type="primary" @click="onSubmit()">Confirm</el-button>
        </div>
      </el-drawer>
    </div>
  </div>
</template>


<script>
import { mapState, mapMutations } from "vuex";

export default {
  data() {
    return {
      drawer: false,
      drawerEdit: false,
      listaProdutos: [],
      listaClientes: [],

      form: {
        produto: null,
        cliente: null,
        quantidade: 0,
      },
      produtos: [],
      tableData: [],
    };
  },
  computed: {
    ...mapState({
      collapsed: (state) => state.isCollapsed,
    }),
  },
  mounted() {
    this.allData();
    this.clientesList();
    this.produtosList();
  },
  methods: {
    formatDate(row, column, cellValue) {
      let data = new Date(cellValue);
      return data.toLocaleDateString("pt-BR");
    },
    async allData() {
      const { data, status } = await this.$axios
        .get("/api/pessoa/compras/")
        .catch((error) => {
          return {
            data: [],
            status: error.response.status,
          };
        });
      if (status === 200) {
        this.tableData = data.vendas;
        console.log(this.tableData);
      }
    },
    async clientesList() {
      const { data, status } = await this.$axios
        .get("/api/pessoa/")
        .catch((error) => {
          return {
            data: [],
            status: error.response.status,
          };
        });
      if (status === 200) {
        console.log(data[0].data);
        this.listaClientes = data[0].data;
      }
    },

    async produtosList() {
      const { data, status } = await this.$axios
        .get("/api/produto/")
        .catch((error) => {
          return {
            data: [],
            status: error.response.status,
          };
        });
      if (status === 200) {
        console.log(data.data);
        this.listaProdutos = data.data;
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

    async onSubmit() {
      this.dialogFormVisible = false;

      let novavenda = {
        cliente: this.form.cliente,
        venda: this.produtos,
      };
      console.log(novavenda);
      const { data, status } = await this.$axios({
        method: "post",
        url: "api/pessoa/addCompra/" + novavenda.cliente,
        data: novavenda,
      }).catch((error) => {
        return {
          data: [],
          status: error.response.status,
        };
      });
      if (status === 200) {
        this.form = {
          cliente: null,
          produto: null,
          quantidade: 0,
        };
        this.messageSave();
        this.drawer = false;
      }
    },

    addProduto() {
      let produtoqtd = {
        nomeProduto: this.form.produto.nomeProduto,
        idProduto: this.form.produto.idProduto,
        quantidade: this.form.quantidade,
        precoFinal: this.form.produto.valorUnitario,
        valorQuantidade: this.form.produto.valorUnitario * this.form.quantidade,
      };
      // console.log(produtoqtd);
      this.produtos.push(produtoqtd);
    },

    onDelete(index, rows) {
      this.$confirm("Deseja mesmo apagar esse campo?")
        .then((_) => {
          rows.splice(index, 1);
          this.messageDelete();
        })
        .catch((_) => {});
    },
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
        message: "Preencha todos os campos.",
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
.el-collapse-item__header {
  color: rgb(75, 75, 75);
  font-weight: 400;
}
.el-table__cell .el-table__expanded-cell {
  padding: 0px;
}
</style>
