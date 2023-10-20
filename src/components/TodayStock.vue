<template>
  <div >
    <div class="flex justify-between justify-center">
      <div class="font-bold text-3xl font-mono">上市指數</div>
    </div>
    <div class="flex items-end font-mono">
      <p class="mx-1 text-red-800 text-3xl font-bold">
        {{ defineProp.recentStock?.['指數'] }}
      </p>
      <p class="mx-2 text-xl font-bold text-red-600">
        {{ defineProp.recentStock?.['漲跌'] }}
      </p>
      <p class="mx-1 font-bold text-red-500">
        ( {{ defineProp.recentStock?.['漲跌幅'] }} )
      </p>
      <p class="ml-auto mr-3 font-bold">
        <span>成交量</span>
        <span class="text-teal-600 px-2">{{ defineProp.recentStock?.['成交金額'] }}</span>
        <span>億</span>
      </p>
    </div>
    <div class="text-sm mt-2 font-semibold">{{ new Date() }}</div>
    <div class="">
      <button class="rounded border-cyan-600 border-2 px-2 ml-1 mt-3 font-bold text-cyan-600" @click="toggledStockInfo = !toggledStockInfo">詳細資訊+</button>
    </div>
    <div style="overflow-x:auto" v-if="toggledStockInfo" class="border-2 rounded border-zinc-300 px-3 py-3 mt-3">
      <table class="table-auto">
        <thead>
          <tr class="py-1 text-gray-600">
            <th colspan="7" class="text-center border-b-2 border-b-teal-400">指數</th>
            <th></th>
          </tr>
          <tr class="text-center border-b-4  border-b-blue-400 py-1 text-gray-600">
            <th class="px-2">開盤</th>
            <th class="px-2">最高</th>
            <th class="px-2">最低</th>
            <th class="px-2">今收</th>
            <th class="px-2">昨收</th>
            <th class="px-2">漲跌</th>
            <th class="px-2">漲跌幅</th>
            <th class="px-2">漲跌統計</th>
          </tr>
        </thead>
        <tbody>
          <tr class="text-gray-500 font-bold text-sm text-center">
            <td>{{ defineProp.recentStock?.['開盤價'] }}</td>
            <td>{{ defineProp.recentStock?.['最高價'] }}</td>
            <td>{{ defineProp.recentStock?.['最低價'] }}</td>
            <td>{{ defineProp.recentStock?.['指數'] }}</td>
            <td>{{ defineProp.recentStock?.['昨收'] }}</td>
            <td>{{ defineProp.recentStock?.['漲跌'] }}</td>
            <td>{{ defineProp.recentStock?.['漲跌幅'] }}</td>
            <td></td>
          </tr>
        </tbody>
        <br>
        <thead>
          <tr class="text-gray-600">
            <th colspan="2"></th>
            <th colspan="5" class="text-center border-b-2 border-b-teal-400">成交</th>
          </tr>
          <tr class="text-center border-b-4  border-b-indigo-500 py-1 text-gray-600">
            <th class="px-2">融資餘額(億)</th>
            <th class="px-2">融劵餘額(億)</th>
            <th class="px-2">張數</th>
            <th class="px-2">金額(億)</th>
            <th class="px-2">筆數</th>
            <th class="px-2">均張</th>
            <th class="px-2">均價</th>
          </tr>
        </thead>
        <tbody>
          <tr class="text-gray-500  text-center text-sm font-bold">
            <td>{{ defineProp.recentStock?.['融資餘額'] }}</td>
            <td>{{ defineProp.recentStock?.['融劵餘額'] }}</td>
            <td>{{ defineProp.recentStock?.['成交張數'] }}</td>
            <td>{{ defineProp.recentStock?.['成交金額'] }}</td>
            <td>{{ defineProp.recentStock?.['成交筆數'] }}</td>
            <td>{{ defineProp.recentStock?.['成交均張'] }}</td>
            <td>{{ defineProp.recentStock?.['成交均價'] }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script setup lang="ts">
  import { ref } from 'vue';
  const toggledStockInfo = ref(false);
  const defineProp:any = defineProps({
    recentStock:Array
  });
</script>
<style>
  
</style>