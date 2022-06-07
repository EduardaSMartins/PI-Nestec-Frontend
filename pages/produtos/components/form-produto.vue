<template>
  <div class="rounded-sm mt-2 w-full" style="max-height: 80vh">
    <template>
      <div class="mb-5 flex justify-between">
        <h1 v-if="methods === 'post'" class="text-2xl">Novo Produto</h1>
        <nuxt-link to="/produtos" class="mr-2"
          ><el-button
            type="success"
            class="botaoHeader"
            plain
            icon="el-icon-arrow-left"
            >Listar</el-button
          ></nuxt-link
        >
      </div>
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="120px"
        class="demo-ruleForm"
      >
        <el-form-item label="Nome" prop="nome">
          <el-input v-model="produto.name"></el-input>
        </el-form-item>

        <el-form-item label="Descrição" prop="descricao">
          <el-input v-model="produto.descricao"></el-input>
        </el-form-item>

        <el-form-item label="Código de Barras" prop="codigo_barras">
          <el-col :span="11">
            <el-input v-model="produto.codigo_barras"></el-input>
          </el-col>
        </el-form-item>

        <el-form-item label="Código Interno" prop="codigo_interno">
          <el-col :span="11">
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
            <span class="demonstration">Selecione uma cor</span>
            <el-color-picker v-model="produto.cor"></el-color-picker>
          </div>
          <el-col :span="11">
            <!-- <el-input v-model="produto.cor"></el-input> -->
          </el-col>
        </el-form-item>

        <el-form-item label="Quantidade Mínima" prop="quantidade_minima">
          <el-col :span="11">
            <el-input v-model="produto.quantidade_minima"></el-input>
          </el-col>
        </el-form-item>

        <el-form-item label="Quantidade por Caixa" prop="quantidade_caixa">
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
            <el-currency-input
              v-model="produto.valor_unitario"
            ></el-currency-input>
          </el-col>
        </el-form-item>

        <el-form-item label="Instant delivery" prop="delivery">
          <el-switch v-model="ruleForm.delivery"></el-switch>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')"
            >Create</el-button
          >
          <el-button @click="resetForm('ruleForm')">Reset</el-button>
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