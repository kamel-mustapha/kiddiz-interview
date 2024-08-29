<script setup lang="ts">
const links = [
  {
    name: "Home",
    link: "/",
  },
  // {
  //   name: "Blog",
  //   link: "/blog",
  // },
];
</script>

<template>
  <nav class="bg-white border-gray-200 dark:bg-gray-900 fixed w-full">
    <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
      <Logo />
      <div class="flex gap-2 md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
        <router-link to="/login"><ButtonSecondary message="Login" /></router-link>
        <router-link to="/register"><ButtonPrimary message="Register" /></router-link>
      </div>
      <div class="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-cta">
        <ul
          class="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700"
        >
          <li v-for="link in links">
            <router-link :to="link.link" class="text-gray-600 hover:text-gray-400 duration-200" aria-current="page">
              {{ link.name }}
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  <div class="min-h-screen pt-16">
    <slot />
  </div>
  <footer class="bg-white rounded-lg shadow dark:bg-gray-900 m-4">
    <div class="w-full max-w-screen-xl mx-auto p-4 md:py-8">
      <div class="sm:flex sm:items-center sm:justify-between">
        <Logo />
        <ul class="mt-8 md:mt-0 flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
          <li v-for="link in links">
            <router-link :to="link.link" class="hover:underline me-4 md:me-6">{{ link.name }}</router-link>
          </li>
        </ul>
      </div>
      <hr class="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
      <span class="block text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2024 All Rights Reserved.</span>
    </div>
  </footer>
</template>
