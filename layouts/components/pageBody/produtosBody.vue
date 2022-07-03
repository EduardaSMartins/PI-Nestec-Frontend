<template>
  <div class="m-auto 2xl:w-11/12 w-5/6">
    <div class="flex justify-between my-5">
      <h2 class="text-gray-800 text-xl w-2/12">Produtos</h2>
      <div class="flex">
        <el-button type="primary" @click="dialogFormVisible = true" icon="el-icon-plus"
          >Novo</el-button
        >
        <!-- <el-button class="flex" @click="drawer = true">
          <i-filter theme="outline" size="20" fill="#4a4a4a" :strokeWidth="2" />
        </el-button> -->
      </div>
    </div>

    <!-- Table -->
    <div class="border overflow-y-auto rounded-md" style="max-height: 70vh">
      <el-table :data="tableData" style="width: 100%" header-align="center">
        <el-table-column prop="codigo_interno" label="Código"> </el-table-column>
        <el-table-column prop="nome" label="Nome"> </el-table-column>
        <el-table-column prop="valor_unitario" label="Preço"> </el-table-column>
        <el-table-column prop="descricao" label="Descrição"> </el-table-column>
        <el-table-column prop="cor" label="Cor"></el-table-column>
        <!-- <el-table-column align="center" width="90"
          ><template slot-scope="scope" class="flex">
            <el-button-group>
              <el-button type="edit" size="medium" icon="el-icon-edit"> </el-button>
            </el-button-group>
          </template>
        </el-table-column> -->
      </el-table>
    </div>

    <!-- Form -->
    <div>
      <el-dialog
        title="Novo produto"
        style="margin: auto"
        :close-on-click-modal="false"
        :visible.sync="dialogFormVisible"
        width="80%"
      >
        <FormProduto
          :produto="produto"
          methods="POST"
          link="api/produto/adicionar"
          :dialogFormVisible="dialogFormVisible"
          @statusDialogo="statusDialogo(event)"
        />
      </el-dialog>
    </div>

    <!-- Pagination -->
    <div class="block m-auto w-full">
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
    </div>

    <!-- Drawer -->
    <el-drawer title="Filtrar" :visible.sync="drawer" size="20%">
      <hr />
      <div style="height: 90%" class="p-5">
        <el-input placeholder="Pesquisar" v-model="input" class="input-with-select mr-5">
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

          <el-input placeholder="Min" style="width: 30%" v-model="minFilter"></el-input>
          -
          <el-input placeholder="Máx" style="width: 30%" v-model="maxFilter"></el-input>
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
import FormProduto from "~/pages/produtos/components/form-produto.vue";
export default {
  directives: { money: VMoney },
  components: { FormProduto },

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

      tableData: [],
      // tableSecundaria: [],
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
        valor_unitario: 0,
      },
      paginate: {
        current_page: 1,
        last_page: 0,
        first_page_url: null,
        last_page_url: null,
        prev_page_url: null,
        next_page_url: null,
        total: 0,
        first_page_url: null,
        per_page: 12,
      },
    };
  },
  layout: false,
  mounted() {
    // this.tableSecundaria = this.tableData.slice(0, 10);
    this.allData();
    // this.loadCategorias();
  },
  methods: {
    async allData() {
      const { data, status } = await this.$axios.get("api/produto/").catch((error) => {
        return {
          data: [],
          status: error.response.status,
        };
      });
      if (status === 200) {
        this.tableData = data.data;
        this.paginate.current_page = data.current_page;
        this.paginate.last_page = data.last_page;
        this.paginate.total = data.total;
        this.paginate.per_page = parseInt(data.per_page);
        this.paginate.first_page_url = data.first_page_url;
        this.paginate.last_page_url = data.last_page_url;
        this.paginate.prev_page_url = data.prev_page_url;
        this.paginate.next_page_url = data.next_page_url;
      }
    },

    handleSizeChange(val) {
      this.pageSize = val;
      // this.tableSecundaria = this.tableData.slice(this.firstItem, this.pageSize);
    },
    handleCurrentChange(val) {
      this.currentPage = val;
    },
    statusDialogo(event) {
      this.dialogFormVisible = event;
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
              // var index = this.tableData.indexOf(dados);
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

    nextPage() {
      this.firstItem = this.lastItem + 1;
      if (this.tableData.length < this.pageSize * this.currentPage) {
        this.lastItem = this.tableData.length;
      } else {
        this.lastItem += this.pageSize;
      }
      // this.tableSecundaria = this.tableData.slice(this.firstItem, this.lastItem + 1);
    },
    prevPage() {
      this.lastItem = this.firstItem - 1;
      this.firstItem = this.firstItem - this.pageSize;
      // this.tableSecundaria = this.tableData.slice(this.firstItem, this.lastItem + 1);
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
<style></style>
