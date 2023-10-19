<template>
  <div>
    <div class="flex justify-between">
      <div class="">今日指數</div>
      <div class="">
        <button class="rounded border-cyan-600 border-2 px-2 py-2 r-3" @click="toggledStockInfo = !toggledStockInfo">詳細資訊+</button>
      </div>
    </div>
    <div class="flex">
      <p class="mx-1 text-red" >
        {{ defineProp.todayStockIndex?.['指數'] }}
      </p>
      <p class="mx-1">
        {{ defineProp.todayStockIndex?.['漲跌'] }}
      </p>
      <p class="mx-1">
        ( {{ defineProp.todayStockIndex?.['漲跌幅'] }} )
      </p>
    </div>
    <div class="">{{ Date.now() }}</div>
    <div class="" v-if="toggledStockInfo">
      <table class="table-auto">
        <thead>
          <tr class="py-1 text-gray-600">
            <th colspan="7">指數</th>
            <th></th>
          </tr>
          <tr class="text-center border-b-4  border-b-indigo-500 py-1 text-gray-600">
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
          <tr class="text-gray-500 border-b-2 border-b-sky-300">
            <td>{{ defineProp.todayStockIndex?.['開盤價'] }}</td>
            <td>{{ defineProp.todayStockIndex?.['最高價'] }}</td>
            <td>{{ defineProp.todayStockIndex?.['最低價'] }}</td>
            <td>{{ defineProp.todayStockIndex?.['指數'] }}</td>
            <td>{{ defineProp.todayStockIndex?.['昨收'] }}</td>
            <td>{{ defineProp.todayStockIndex?.['漲跌'] }}</td>
            <td>{{ defineProp.todayStockIndex?.['漲跌幅'] }}</td>
            <td></td>
          </tr>
        </tbody>
        <thead>
          <tr class="py-1 text-gray-600">
            <th colspan="2"></th>
            <th colspan="5">成交</th>
          </tr>
          <tr class="text-center border-b-4  border-b-indigo-500 py-1 text-gray-600">
            <th class="px-2">融資餘額(億)</th>
            <th class="px-2">融劵餘額(億)</th>
            <th class="px-2">張數</th>
            <th class="px-2">金額</th>
            <th class="px-2">筆數</th>
            <th class="px-2">均張</th>
            <th class="px-2">均價</th>
          </tr>
        </thead>
        <tbody>
          <tr class="text-gray-500 border-b-2 border-b-sky-300">
            <td>{{ defineProp.todayStockIndex?.['融資餘額'] }}</td>
            <td>{{ defineProp.todayStockIndex?.['融劵餘額'] }}</td>
            <td>{{ defineProp.todayStockIndex?.['成交張數'] }}</td>
            <td>{{ defineProp.todayStockIndex?.['成交金額'] }}</td>
            <td>{{ defineProp.todayStockIndex?.['成交筆數'] }}</td>
            <td>{{ defineProp.todayStockIndex?.['成交均張'] }}</td>
            <td>{{ defineProp.todayStockIndex?.['成交均價'] }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script setup lang="ts">
  import { ref } from 'vue';
  const toggledStockInfo = ref(false);
  const defineProp:array = defineProps({
    recentStock:Array
  });
</script>
<style>
  
</style>