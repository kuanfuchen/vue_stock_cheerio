<template>
  <div class="container">
    <div class="">
      <button class="rounded border-cyan-600 border-2 px-2" @click="getStockInfo()">stock information</button>
    </div>
    <div class="recentStockIndexTable">
      <table class="table-auto border-2 rounded border-1">
        <thead>
          <tr class="py-1">
            <th class="px-2">日期</th>
            <th class="px-2">大盤</th>
          </tr>
        </thead>
        <tbody>
          <tr class="py-1" v-for="item of recentStockIndex" :key="item.date">
            <td class="px-2">{{ item.date }}</td>
            <td class="px-2">{{ item.stock_points }}</td>
          </tr>
        </tbody>
      </table>
      
    </div>
    <canvas id="linePlot" width="400" height="400">

</canvas>
  </div>
</template>
<script setup lang="ts">
  import { Subject, takeUntil } from 'rxjs';
  import { stockData, /* getStockData, responseStockDateAllInfo */} from "../utils/Fetch_Stock";
  import {ref, reactive } from 'vue';
  import Chart from 'chart.js/auto';
  const todayStockIndex: array = ref([]);
  const recentStockIndex: array = reactive([]);
  const comSubject$:array = new Subject([]);
  const getStockInfo = () => stockData.getStockData();
  
  const allDate:array = [];
  const allStockIndex:array = [];
  // const configData:object = {
  //   labels:allDate,
  //   datasets:[{
  //     // type: 'line',
  //     // axis: 'y',
  //     label: 'Dataset 3',
  //     // backgroundColor: "#0000",
  //     borderColor: "rgb(45, 212, 191)",
  //     fill: false,
  //     data:allStockIndex,
  //     tension:0.1
  //   }]
  // };
  // const config = {
  //   type:'line',
  //   data:configData,
  //   options:{
  //     responsive:true,
  //     scales: {
  //       y: {
  //         stacked: true
  //       }
  //     }
  //   }
  // };
  stockData.responseStockDateAllInfo$.pipe(takeUntil(comSubject$)).subscribe((stockInfo: object)=>{
    console.log(stockInfo, 'stockInfo')
    organizeStockPerDayData(stockInfo.data)
  });
  const organizeStockPerDayData:void = (stockInfo:array)=>{
    for(let i = 0 ; stockInfo.length > i ; i++){
      if(i === 0) todayStockIndex.value = stockInfo[i];
      if( i > 0 ){
          recentStockIndex.push(stockInfo[i]);
          allDate.push(stockInfo[i].date);
          allStockIndex.push(stockInfo[i].stock_points);
      }
    }
    console.log(recentStockIndex);
    drawStockPlot()
  }
  const drawStockPlot = ()=>{
    // console.log('123')
    const testTitle = [1,2,3,4,5,6,7];
    const data = {
      labels: testTitle,
      datasets: [{
        label: 'My First Dataset',
        data: [65, 59, 80, 81, 56, 55, 40],
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }]
    };
    const config:object = {
      type: 'line',
      data: data,
    };
    const stockLineID:any = document.getElementById('linePlot');
    // console.log(config, 'config')
    setTimeout(()=> new Chart(stockLineID, config))
    
  }
</script>
<style>
  .container{
    width:80vw;

  }
  .recentStockIndexTable{
    margin-top: 5px;
    height:300px;
    overflow-y:scroll
  }
</style>