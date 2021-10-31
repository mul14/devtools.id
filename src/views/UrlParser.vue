<script setup lang="ts">
import { reactive, ref } from 'vue'
import md5 from 'crypto-js/md5'
import sha1 from 'crypto-js/sha1'

const input = ref('http://root:pswd@localhost:8000/search?q=devtools.id&sourceid=chrome&ie=UTF-8#top')
const output = reactive({
  hash: '',
  host: '',
  hostname: '',
  href: '',
  origin: '',
  password: '',
  pathname: '',
  port: '',
  protocol: '',
  search: '',
  username: '',
})

const queryString = reactive({})

const submit = () => {
  try {
    const result = new URL(input.value);

    output.hash = result.hash
    output.host = result.host;
    output.hostname = result.hostname;
    output.href = result.href;
    output.origin = result.origin;
    output.password = result.password;
    output.pathname = result.pathname;
    output.port = result.port;
    output.protocol = result.protocol;
    output.search = result.search;
    output.username = result.username;

    result.searchParams.forEach((value: string, key: string) => {
      queryString[key] = value;
    })

  } catch (e) {
    alert(e.message)
  }
}
</script>

<template>
  <div class>
    <h1 class="text-3xl">URL Parser</h1>
    <hr class="my-6" />
    <div class="flex flex-col gap-4">
      <div>
        <textarea
          v-model="input"
          class="w-full rounded-lg border border-gray-300 focus:outline-none p-2 font-mono"
          rows="3"
        ></textarea>
        <button
          @click="submit"
          class="rounded-lg px-4 py-2 text-white bg-gray-400 hover:bg-gray-500"
        >Parse</button>
      </div>
      <div class="flex gap-10">
        <div class="w-1/2 space-y-4">
          <div class="font-bold">URL object</div>
          <div v-for="([ key, value ], index) in Object.entries(output)" :key="index">
            <label>{{ key }}</label>
            <input type="text" :value="value" readonly class="w-full rounded-lg border border-gray-300 focus:outline-none p-2 font-mono bg-gray-100" />
          </div>
        </div>
        <div class="w-1/2">
          <div class="font-bold">Query String</div>
          <div v-for="(value, key) in queryString" :key="key" class="space-x-4 space-y-4">
            <input :value="key" readonly class="rounded-lg border border-gray-300 focus:outline-none p-2 font-mono bg-gray-100" />
            <input :value="value" readonly class="rounded-lg border border-gray-300 focus:outline-none p-2 font-mono bg-gray-100" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
