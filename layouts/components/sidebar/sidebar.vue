<template>
  <div
    class="
      fixed
      bg-white
      transition-all
      duration-500
      h-screen
      divide-y divide-gray-200 divide-solid
      border-r
    "
    v-if="collapsed == true"
    style="width: 4%"
  >
    <div class="">
      <nuxt-link to="../">
        <div class="cursor-pointer h-16">
          <img
            src="../sidebar/icons/nestle.png"
            class="m-auto p-2 2xl:h-16 h-16"
            alt=""
          />
        </div>
      </nuxt-link>
    </div>
    <div class="transition-all">
      <el-menu class="">
        <el-menu-item index="1" class="pt-5 cursor-pointer hover:bg-gray-100">
          <div class="pt-3">
            <nuxt-link to="../produtos" class="text-center">
              <div class="flex">
                <i-box
                  theme="outline"
                  size="20"
                  :strokeWidth="2"
                  class="mr-3 2xl:pl-1 mt-2"
                  alt=""
                />
              </div>
            </nuxt-link>
          </div>
        </el-menu-item>
        <el-menu-item index="2" class="py-5 cursor-pointer hover:bg-gray-100">
          <div class="pt-3">
            <nuxt-link to="../clientes"
              ><div class="flex">
                <i-user
                  theme="outline"
                  size="20"
                  fill="#4a4a4a"
                  :strokeWidth="2"
                  class="mr-3 2xl:pl-1 mt-2"
                  alt=""
                />
              </div>
            </nuxt-link>
          </div>
        </el-menu-item>
        <el-menu-item index="3" class="py-5 cursor-pointer hover:bg-gray-100">
          <div class="pt-3">
            <nuxt-link to="../vendas"
              ><div class="flex">
                <i-shopping-bag
                  theme="outline"
                  size="20"
                  :strokeWidth="2"
                  class="mr-3 2xl:pl-1 pt-2"
                  alt=""
                />
              </div>
            </nuxt-link>
          </div>
        </el-menu-item>
        <!-- <el-menu-item index="" class="py-5 cursor-pointer hover:bg-gray-100 ">
          <div><nuxt-link to="../servicos/servicos"
            ><img
              src="../sidebar/icons/check-one.svg"
              class="m-auto h-5"
              alt=""
            />
          </nuxt-link></div>
        </el-menu-item> -->
      </el-menu>
    </div>
  </div>

  <!------------------------------------------------------------->

  <div
    class="bg-white transition-all duration-300 h-screen border-r"
    v-else
    style="width: 10%"
  >
    <div class="">
      <nuxt-link to="/">
        <div class="cursor-pointer h-16">
          <img
            src="../sidebar/icons/logo_exp.png"
            class="p-4 h-auto my-auto"
            alt="Logo"
          />
        </div>
      </nuxt-link>
    </div>
    <hr />
    <div class="transition-all ">
      <el-menu>
        <div class="">
          <nuxt-link to="../produtos">
            <el-menu-item index="1" class="flex flex-row items-center justify-items-start">
              <i-box theme="outline" :strokeWidth="2" size="20" alt="" />
              <span slot="title" class="text-sm 2xl:text-base pl-2">  Produtos</span>
            </el-menu-item></nuxt-link
          >
        </div>
        <div class="">
          <nuxt-link to="../clientes">
            <el-menu-item index="2" class="flex flex-row items-center justify-items-start">
              <i-user theme="outline" :strokeWidth="2" size="20" alt="" />
              <span slot="title" class="text-sm 2xl:text-base pl-2">Clientes</span>
            </el-menu-item>
          </nuxt-link>
        </div>

        <div class="">
          <nuxt-link to="../vendas">
            <el-menu-item index="3" class="flex flex-row items-center justify-items-start">
              <i-shopping-bag
                theme="outline"
                size="20"
                :strokeWidth="2"
                alt=""
              />
              <span slot="title" class="text-sm 2xl:text-base pl-2">Vendas</span>
            </el-menu-item></nuxt-link
          >
        </div>
        <!-- <div><nuxt-link to="../servicos/servicos">
          <el-menu-item index=""
            class="
              py-5
              cursor-pointer
              hover:bg-gray-100
              flex flex-nowrap
            "
          >
            <img src="../sidebar/icons/check-one.svg" size="20" class="h-5" alt="" />
            <p class="">Serviç2s</p>
          </el-menu-item>
        </nuxt-link></div> -->
      </el-menu>
    </div>
  </div>
</template>

<style>
.el-menu {
  border: none;
}
</style>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  computed: {
    ...mapState({
      collapsed: (state) => state.isCollapsed,
    }),
    ...mapMutations(["toggleCollapse"]),
  },
};
</script>
