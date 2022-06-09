<template>
  <div class="rounded-sm mt-4 w-full" style="max-height: 90vh">
    <template>
      <div class="mb-4 flex justify-between">
        <h1 v-if="methods === 'post'" class="text-0xl">Novo Produto</h1>
        <nuxt-link to="/produtos" class="mr-2"></nuxt-link>
      </div>
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="Nome" prop="nome">
          <el-input
            placeholder=""
            width:50
            v-model="produto.name"
            :disabled="false"
          ></el-input>
        </el-form-item>

        <!-- chamar mixin de categorias -->

        <el-form-item label="Descrição" prop="descricao">
          <el-input
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 4 }"
            v-model="produto.descricao"
          ></el-input>
        </el-form-item>

        <el-form-item label="Código Barras" prop="codigo_barras">
          <el-col :span="20">
            <el-input v-model="produto.codigo_barras"></el-input>
          </el-col>
        </el-form-item>

        <el-form-item label="Código Interno" prop="codigo_interno">
          <el-col :span="20">
            <el-input v-model="produto.codigo_interno"></el-input>
          </el-col>
        </el-form-item>

        <el-form-item label="Sabor" prop="sabor">
          <el-col :span="11">
            <el-input v-model="produto.sabor"></el-input>
          </el-col>
        </el-form-item>

        <el-form-item label="Cor" prop="cor">
          <div class="block">
            <span class="demonstration"></span>
            <el-color-picker v-model="produto.cor"></el-color-picker>
          </div>
          <el-col :span="11">
            <!-- <el-input v-model="produto.cor"></el-input> -->
          </el-col>
        </el-form-item>

        <el-form-item label="Quantidade Mínima" prop="quantidade_minima">
          <!-- <el-col :span="11"> -->
          <el-input-number
            v-model="produto.quantidade_minima"
            @change="handleChange"
            :min="1"
            :max="1000"
          ></el-input-number>
          <!-- <el-input v-model="produto.quantidade_minima"></el-input> -->
          <!-- </el-col> -->
        </el-form-item>

        <el-form-item label="Quantidade Caixa" prop="quantidade_caixa">
          <el-col :span="11">
            <el-input v-model="produto.quantidade_caixa"></el-input>
          </el-col>
        </el-form-item>

        <el-form-item label="Quantidade Estoque" prop="quantidade_estoque">
          <el-col :span="11">
            <el-input v-model="produto.sabor"></el-input>
          </el-col>
        </el-form-item>

        <el-form-item label="Valor Unitário" prop="valor_unitario">
          <el-col :span="11">
            <el-currency-input v-model="produto.valor_unitario"></el-currency-input>
          </el-col>
        </el-form-item>
      </el-form>
    </template>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isEditing: true,
      produto: {
        nome: null,
        descricao: null,
        codigo_barras: null,
        codigo_interno: null,
        sabor: null,
        cor: "#000000",
        tamanho: null,
        quantidade_minima: 1,
        quantidade_caixa: 1,
        quantidade_estoque: 0,
        valor_unitario: 0,
      },
    };
  },
  methods: {},
};
</script>
