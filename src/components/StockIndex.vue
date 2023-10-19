<template>
  <div class="container">
    <div class="grid grid-cols-2 gap-2">
      
      <div class="recentStockIndexTable">
        <TodayStock ></TodayStock>
      </div>
      <div class="card" >
        <div class="">
          <canvas id="stockLinePlot"></canvas>
        </div>
        <div class="" style="height:200px;">
          <canvas id="stockBarPlot"></canvas>
        </div>
      </div>
      <div class="recentStockIndexTable">
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
    </div>
  </div>
</template>
<script setup lang="ts">
  import { Subject, takeUntil } from 'rxjs';
  import { stockData, /* getStockData, responseStockDateAllInfo */} from "../utils/Fetch_Stock";
  import {ref, reactive, onMounted } from 'vue';
  import Chart from 'chart.js/auto';
  import TodayStock from './TodayStock.vue';
  const todayStockIndex: array = ref([]);
  const recentStockIndex: array = reactive([]);
  const comSubject$:array = new Subject([]);
  const getStockInfo = () => stockData.getStockData();
  const allDate:array = [];
  // const allStockIndex:object = {
  //   shindex:[],
  //   tradingVolumn:[]
  // };
  const allStockShindex:array = [];
  const all_TradingVolumn:array = [];
  const stockShindexConfigData:object = {
    labels:allDate,
    datasets:[{
      // type: 'line',
      // axis: 'y',
      label: '股市指數',
      // backgroundColor: "#0000",
      borderColor: "rgb(45, 212, 191)",
      fill: false,
      data:allStockShindex,
      tension:0.1
    },]
  };
  const tradingVolumnConfigData:object={
    labels:allDate,
    datasets:[{
      label: '交易量',
      // borderColor: "rgb(45, 212, 191)",
      backgroundColor: "#3b82f6",
      fill: false,
      data:all_TradingVolumn,
    },]
  };
  const configLine:object = {
    type:'line',
    data:stockShindexConfigData,
    options:{
      responsive:true,
      scales: {
        y: {
          stacked: true
        }
      }
    }
  };
  const configBar:object = {
    type:'bar',
    fill:false,
    data:tradingVolumnConfigData
  };
  stockData.responseStockDateAllInfo$.pipe(takeUntil(comSubject$)).subscribe((stockInfo: object)=>{
    console.log(stockInfo, 'stockInfo')
    organizeStockPerDayData(stockInfo.data)
  });
  const organizeStockPerDayData:void = (stockInfo:array)=>{
    for(let i = 0 ; stockInfo.length > i ; i++){
      if(i === 0) todayStockIndex.value = stockInfo[i];
      if( i > 0 ){
        let tradingVol;
        if(stockInfo[i].tradingVol){
          const removeDot:array = stockInfo[i].tradingVol.split(',');
          tradingVol = removeDot.join('');
        }
        recentStockIndex.push(stockInfo[i]);
        allDate.unshift(stockInfo[i].date);
        allStockShindex.unshift(stockInfo[i].stock_points);
        // all_TradingVolumn.unshift(stockInfo[i].tradingVol);
        all_TradingVolumn.unshift(tradingVol);
      }
    }
    console.log(todayStockIndex.value)
    console.log(recentStockIndex);
    drawStockPlot()
  }
  const drawStockPlot = () => {
    const stockLineID:any = document.getElementById('stockLinePlot');
    const stockBarID:any = document.getElementById('stockBarPlot');
    new Chart(stockLineID, configLine);
    new Chart(stockBarID, configBar)
  };
  onMounted(async() => {
    await getStockInfo();
  })
</script>
<style>
  .container{
    width:80vw;
  }
  .recentStockIndexTable{
    margin-top: 5px;
    height:400px;
    overflow-y:scroll;
  }
</style>