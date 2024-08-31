<script setup lang="ts">
const links = [
  {
    name: "Crèches",
    link: "/creches",
  },
  {
    name: "Enfants",
    link: "/kids",
  },
];
</script>

<template>
  <nav class="fixed w-full bg-white shadow-md">
    <div class="max-w-[1450px] mx-auto flex justify-between items-center px-4 py-6">
      <router-link to="/"><img src="https://kidizz.com/wp-content/uploads/2024/02/logo_kidizz.svg" alt="" /></router-link>
      <div class="bg-[#0D2436] text-white rounded-full px-6 py-3 gap-8 flex font-semibold">
        <router-link v-for="link in links" :to="link.link" class="hover:text-primary duration-200">{{ link.name }}</router-link>
      </div>
      <span>Welcome <span class="text-primary">Kamel</span></span>
    </div>
  </nav>
</template>
