<script setup lang="ts">
import { APP_CONFIG } from "~/environment";
import type { Creche } from "~/models/Creche";
import { loaders } from "~/stores/loaders";
import { user } from "~/stores/user";

const route = useRoute();
const creche = ref<Creche>();

const loadData = async () => {
  loaders.value.loading = true;
  const res: any = await $fetch(`${APP_CONFIG.API_URL}child-cares/${route.params.id}`, {
    method: "GET",
    headers: { "X-Auth": user.value?.username ? user.value?.username : "" },
    onResponseError: (error: any) => {
      loaders.value.loading = false;
      Swal.fire({
        ...toastConfig,
        title: error?.response?._data?.message ? error.response._data.message : "Une erreur est survenue, veuillez réessayer",
        icon: "error",
      });
    },
  });
  loaders.value.loading = false;
  creche.value = res;
};
loadData();
</script>

<template>
  <div class="max-w-[1300px] mx-auto">
    <form class="max-w-sm mt-32">
      <h3 class="text-xl mb-6"><span class="font-bold">Détails de la crèche :</span> {{ creche?.name }}</h3>
      <div class="mb-5">
        <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nom</label>
        <input
          readonly
          :value="creche?.name"
          type="text"
          id="name"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>

      <router-link to="/creches">
        <ButtonSecondary message="Retour" />
      </router-link>
    </form>
  </div>
</template>
