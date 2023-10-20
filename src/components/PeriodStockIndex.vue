<template>
  <div>
    <table class="table-auto border-1">
      <thead>
        <tr class="py-1 text-gray-600">
          <th class="px-2">日期</th>
          <th class="px-2">大盤</th>
          <th class="px-2">漲跌指數</th>
          <th class="px-2">漲跌(%)</th>
          <th class="px-2">交易量</th>
          <th class="px-2" colspan="3">外資</th>
          <th class="px-2" colspan="3">投信</th>
          <th class="px-2" colspan="3">自營商</th>
          <th class="px-2" colspan="3">三大法人</th>
        </tr>
        <tr class="text-center border-b-4  border-b-indigo-500 py-1 text-gray-600">
          <th></th>
          <th></th>
          <th></th>
          <th></th>
          <th></th>
          <th>買進</th>
          <th>賣出</th>
          <th>總共</th>
          <th>買進</th>
          <th>賣出</th>
          <th>總共</th>
          <th>買進</th>
          <th>賣出</th>
          <th>總共</th>
          <th>買進</th>
          <th>賣出</th>
          <th>總共</th>
        </tr>
      </thead>
      <tbody>
        <tr class="text-gray-500 border-b-2 border-b-sky-300" v-for="item of recentStockIndex" :key="item.date">
          <td class="px-2 py-1">{{ item.date }}</td>
          <td class="px-2">{{ item.stock_points }}</td>
          <td class="px-2">{{ item.upsAndDown }}</td>
          <td class="px-2">{{ item.upsAndDownPercent }}</td>
          <td class="px-2">{{ item.tradingVol }}</td>
          <td class="px-2">{{ item.foreign_capital.buy }}</td>
          <td class="px-2">{{ item.foreign_capital.sell }}</td>
          <td class="px-2">{{ item.foreign_capital.total }}</td>
          <td class="px-2">{{ item.investment_banks.buy }}</td>
          <td class="px-2">{{ item.investment_banks.sell }}</td>
          <td class="px-2">{{ item.investment_banks.total }}</td>
          <td class="px-2">{{ item.dealer.buy }}</td>
          <td class="px-2">{{ item.dealer.sell }}</td>
          <td class="px-2">{{ item.dealer.total }}</td>
          <td class="px-2">{{ item.institutional_investor.buy }}</td>
          <td class="px-2">{{ item.institutional_investor.sell }}</td>
          <td class="px-2">{{ item.institutional_investor.total }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script setup>
	
</script>