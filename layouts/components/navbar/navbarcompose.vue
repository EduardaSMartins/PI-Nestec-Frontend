<template>
  <div>
    <div class="float-left cursor-pointer" @click="toggleCollapse">
      <div class="pt-6 pl-5"><i-hamburger-button
        theme="outline"
        size="20"
        fill="#4a4a4a"
        :strokeWidth="2"
        
        alt=""
      /></div>
      
    </div>

    <div class="mr-5 flex flex-nowrap align-middle justify-end">
      <p class="my-auto mr-4">Usuário</p>
      <Avatar class="p-3" />
    </div>
  </div>
</template>

<script>
import Avatar from "./avatar.vue";
import { mapState, mapMutations } from "vuex";

export default {
  components: { Avatar },
  computed: {
    ...mapState({
      collapsed: (state) => state.isCollapsed,
    }),
  },
  methods: {
    ...mapMutations(["toggleCollapse"]),
  },
};
</script>
