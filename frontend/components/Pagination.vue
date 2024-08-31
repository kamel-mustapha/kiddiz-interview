<template>
  <div class="flex flex-col items-center mt-12">
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
</template>
