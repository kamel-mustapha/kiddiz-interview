<script setup lang="ts">
import { APP_CONFIG } from "~/environment";
import type { Creche } from "~/models/Creche";
import { toastConfig } from "~/utils";
import { user } from "~/stores/user";

const creches = ref<Creche[]>([{ id: 1, name: "creche-1", userId: 4 }]);
const showCreate = ref<boolean>(false);
const toCreateName = ref<string>();
const isLoading = ref<boolean>(true);

const loadData = async () => {
  isLoading.value = true;
  const res: any = await $fetch(`${APP_CONFIG.API_URL}child-cares`, {
    method: "GET",
    headers: { "X-Auth": user.value?.username ? user.value?.username : "" },
    onResponseError: (error: any) => {
      isLoading.value = false;
      Swal.fire({
        ...toastConfig,
        title: error?.response?._data?.message ? error.response._data.message : "Une erreur est survenue, veuillez réessayer",
        icon: "error",
      });
    },
  });
  isLoading.value = false;
  creches.value = res;
};

const onCreate = () => {
  showCreate.value = false;
  toCreateName.value = "";
  Swal.fire({
    ...toastConfig,
    title: "Crèche créee avec succès",
    icon: "success",
  });
};

const onDelete = (id: number) => {
  Swal.fire({
    title: "Etes vous sûr de vouloir supprimé cet élément?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    cancelButtonText: "Annuler",
    confirmButtonText: "Oui, continuer!",
  }).then(async (result: any) => {
    if (result.isConfirmed) {
      const res: any = await $fetch(`${APP_CONFIG.API_URL}child-cares/${id}`, {
        method: "DELETE",
        headers: { "X-Auth": user.value?.username ? user.value?.username : "" },
        onResponseError: (error: any) => {
          isLoading.value = false;
          Swal.fire({
            ...toastConfig,
            title: error?.response?._data?.message ? error.response._data.message : "Une erreur est survenue, veuillez réessayer",
            icon: "error",
          });
        },
      });
      Swal.fire({ ...toastConfig, title: "Elément supprimé avec succès", icon: "success" });
      loadData();
    }
  });
};
loadData();
</script>

<template>
  <div class="max-w-[1400px] mx-auto mt-24 px-4">
    <header>
      <div class="flex justify-between items-center">
        <h2 class="text-xl font-bold text-cyan-950">Liste des crèches</h2>
        <ButtonPrimary message="Ajouter une crèche" class="text-lg" @click="showCreate = true" />
      </div>
      <div class="flex items-center gap-2 py-3 border-b border-gray-300 mt-4">
        <div class="flex w-full items-center gap-2">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M15.7955 15.8111L21 21M18 10.5C18 14.6421 14.6421 18 10.5 18C6.35786 18 3 14.6421 3 10.5C3 6.35786 6.35786 3 10.5 3C14.6421 3 18 6.35786 18 10.5Z"
              stroke="#000000"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <input placeholder="Rechercher" class="w-full outline-none border-none focus:border-none focus:outline-none focus:ring-transparent" type="search" name="" id="" />
        </div>
        <svg class="cursor-pointer active:scale-90 duration-200" width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            opacity="0.5"
            d="M17 9.00195C19.175 9.01406 20.3529 9.11051 21.1213 9.8789C22 10.7576 22 12.1718 22 15.0002V16.0002C22 18.8286 22 20.2429 21.1213 21.1215C20.2426 22.0002 18.8284 22.0002 16 22.0002H8C5.17157 22.0002 3.75736 22.0002 2.87868 21.1215C2 20.2429 2 18.8286 2 16.0002L2 15.0002C2 12.1718 2 10.7576 2.87868 9.87889C3.64706 9.11051 4.82497 9.01406 7 9.00195"
            stroke="#1C274C"
            stroke-width="1.5"
            stroke-linecap="round"
          />
          <path d="M12 2L12 15M12 15L9 11.5M12 15L15 11.5" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </div>
    </header>

    <table v-show="!isLoading" class="mt-4 w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
      <thead v-if="creches.length > 0" class="text-xs text-gray-700 uppercase dark:bg-gray-700 dark:text-gray-400">
        <tr>
          <th scope="col" class="py-3">Nom</th>
          <th scope="col" class="py-3">Utilisateur</th>
          <th scope="col" class="py-3"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="creche in creches" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
          <th scope="row" class="py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{{ creche.name }}</th>
          <td class="py-4">{{ creche.userId }}</td>
          <td class="py-4 text-right">
            <button class="bg-primary rounded-md px-4 py-2 mr-2 hover:opacity-70">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.75 12C9.75 10.7574 10.7574 9.75 12 9.75C13.2426 9.75 14.25 10.7574 14.25 12C14.25 13.2426 13.2426 14.25 12 14.25C10.7574 14.25 9.75 13.2426 9.75 12Z" fill="#ffffff" />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M2 12C2 13.6394 2.42496 14.1915 3.27489 15.2957C4.97196 17.5004 7.81811 20 12 20C16.1819 20 19.028 17.5004 20.7251 15.2957C21.575 14.1915 22 13.6394 22 12C22 10.3606 21.575 9.80853 20.7251 8.70433C19.028 6.49956 16.1819 4 12 4C7.81811 4 4.97196 6.49956 3.27489 8.70433C2.42496 9.80853 2 10.3606 2 12ZM12 8.25C9.92893 8.25 8.25 9.92893 8.25 12C8.25 14.0711 9.92893 15.75 12 15.75C14.0711 15.75 15.75 14.0711 15.75 12C15.75 9.92893 14.0711 8.25 12 8.25Z"
                  fill="#ffffff"
                />
              </svg>
            </button>
            <button class="bg-blue-800 rounded-md px-4 py-2 mr-2 hover:opacity-70">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="m3.99 16.854-1.314 3.504a.75.75 0 0 0 .966.965l3.503-1.314a3 3 0 0 0 1.068-.687L18.36 9.175s-.354-1.061-1.414-2.122c-1.06-1.06-2.122-1.414-2.122-1.414L4.677 15.786a3 3 0 0 0-.687 1.068zm12.249-12.63 1.383-1.383c.248-.248.579-.406.925-.348.487.08 1.232.322 1.934 1.025.703.703.945 1.447 1.025 1.934.058.346-.1.677-.348.925L19.774 7.76s-.353-1.06-1.414-2.12c-1.06-1.062-2.121-1.415-2.121-1.415z"
                  fill="#ffffff"
                />
              </svg>
            </button>
            <button @click="onDelete(creche.id)" class="bg-red-700 rounded-md px-4 py-2 hover:opacity-70">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M18 6V16.2C18 17.8802 18 18.7202 17.673 19.362C17.3854 19.9265 16.9265 20.3854 16.362 20.673C15.7202 21 14.8802 21 13.2 21H10.8C9.11984 21 8.27976 21 7.63803 20.673C7.07354 20.3854 6.6146 19.9265 6.32698 19.362C6 18.7202 6 17.8802 6 16.2V6M4 6H20M16 6L15.7294 5.18807C15.4671 4.40125 15.3359 4.00784 15.0927 3.71698C14.8779 3.46013 14.6021 3.26132 14.2905 3.13878C13.9376 3 13.523 3 12.6936 3H11.3064C10.477 3 10.0624 3 9.70951 3.13878C9.39792 3.26132 9.12208 3.46013 8.90729 3.71698C8.66405 4.00784 8.53292 4.40125 8.27064 5.18807L8 6"
                  stroke="#ffffff"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </button>
          </td>
        </tr>

        <tr v-if="creches.length === 0">
          <th class="py-4 text-center">Aucune crèche trouvée</th>
        </tr>
      </tbody>
    </table>

    <div v-show="isLoading" role="status" class="w-full space-y-4 divide-y divide-gray-200 animate-pulse dark:divide-gray-700 md:p-6 dark:border-gray-700">
      <div class="flex items-center justify-between">
        <div>
          <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
          <div class="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
        </div>
        <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
      </div>
      <div class="flex items-center justify-between pt-4">
        <div>
          <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
          <div class="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
        </div>
        <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
      </div>
      <div class="flex items-center justify-between pt-4">
        <div>
          <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
          <div class="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
        </div>
        <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
      </div>
      <div class="flex items-center justify-between pt-4">
        <div>
          <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
          <div class="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
        </div>
        <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
      </div>
      <div class="flex items-center justify-between pt-4">
        <div>
          <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
          <div class="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
        </div>
        <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
      </div>
      <div class="flex items-center justify-between pt-4">
        <div>
          <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
          <div class="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
        </div>
        <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
      </div>
      <div class="flex items-center justify-between pt-4">
        <div>
          <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
          <div class="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
        </div>
        <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
      </div>
      <span class="sr-only">Loading...</span>
    </div>

    <div v-if="creches.length > 5" class="flex flex-col items-center mt-12">
      <div class="inline-flex xs:mt-0 mb-3">
        <!-- Buttons -->
        <button
          class="flex items-center justify-center px-3 h-8 text-sm font-medium text-white bg-primary rounded-s hover:opacity-70 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
        >
          <svg class="w-3.5 h-3.5 me-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 5H1m0 0 4 4M1 5l4-4" />
          </svg>
          Précedent
        </button>
        <button
          class="flex items-center justify-center px-3 h-8 text-sm font-medium text-white bg-primary border-0 border-s border-gray-100 rounded-e hover:opacity-70 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
        >
          Suivant
          <svg class="w-3.5 h-3.5 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
          </svg>
        </button>
      </div>
      <span class="text-sm text-gray-700 dark:text-gray-400">
        Affichage de <span class="font-semibold text-gray-900 dark:text-white">1</span> à <span class="font-semibold text-gray-900 dark:text-white">5</span> sur
        <span class="font-semibold text-gray-900 dark:text-white">100</span> entrées
      </span>
    </div>
  </div>

  <!-- create  dialog -->
  <div v-if="showCreate" class="dialog w-screen h-screen fixed left-0 top-0 bg-black bg-opacity-20">
    <form @submit.prevent="onCreate" class="absolute mx-auto max-w-sm bg-white top-1/2 -translate-y-1/2 left-0 right-0 rounded-md shadow-sm px-4 py-6">
      <h2 class="text-center font-bold text-lg mb-4">Créer une crèche</h2>
      <div class="mb-5">
        <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nom</label>
        <input v-model="toCreateName" type="text" id="name" class="input" placeholder="Nom de la crèche" required />
      </div>
      <div class="flex gap-2">
        <ButtonPrimary type="submit" message="Créer" class="w-full" />
        <ButtonSecondary
          type="button"
          message="Annuler"
          @click="
            showCreate = false;
            toCreateName = '';
          "
        />
      </div>
    </form>
  </div>
</template>
