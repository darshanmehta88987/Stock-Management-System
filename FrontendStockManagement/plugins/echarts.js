import Vue from 'vue'
import Echarts from 'vue-echarts'

import 'echarts/lib/chart/bar'
import 'echarts/lib/chart/line'
import 'echarts/lib/component/title'
import 'echarts/lib/chart/pie'
import "echarts/lib/component/tooltip"; // you need to import the tooltip component

Vue.component('chart', Echarts);