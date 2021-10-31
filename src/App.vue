<script setup lang="ts">

</script>

<template>
  <div class="flex">
    <div class="w-1/6 p-4 border-r relative">
      <h1 class="font-bold">DevTools.id</h1>
      <hr class="my-4" />
      <div class="space-y-4 sticky overflow-auto h-screen">
        <dl>
          <dt>Base64</dt>
          <dd>
            <router-link to="/base64-decode">Base64 Decode</router-link>
          </dd>
          <dd>
            <router-link to="/base64-encode">Base64 Encode</router-link>
          </dd>
        </dl>
        <dl>
          <dt>URL</dt>
          <dd>
            <router-link to="/url-decode">URL Decode</router-link>
          </dd>
          <dd>
            <router-link to="/url-encode">URL Encode</router-link>
          </dd>
        </dl>
      </div>
    </div>
    <div class="p-6 w-full">
      <router-view />
    </div>
  </div>
</template>
