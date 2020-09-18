<template>
  <div class="content-wrapper">
    <div class="content-header row">
      <div class="content-header-left col-md-9 col-12 mb-2">
        <div class="row breadcrumbs-top">
          <div class="col-12">
            <h2 class="content-header-title float-left mb-0">Statistics</h2>
          </div>
        </div>
      </div>
    </div>

    <div class="content-body">
      <!-- Dashboard Ecommerce Starts -->
      <section id="dashboard-ecommerce">
        <!-- <div class="row">
                    <div class="col-lg-4 col-sm-6 col-12">
                        <div class="card">
                            <div class="card-header d-flex flex-column align-items-start pb-0">
                                <div class="avatar bg-rgba-success p-50 m-0">
                                    <div class="avatar-content">
                                        <i class="feather icon-credit-card text-success font-medium-5"></i>
                                    </div>
                                </div>
                                <h2 class="text-bold-700 mt-1">97.5k</h2>
                                <p class="mb-0">Revenue Generated</p>
                            </div>
                            <div class="card-content">
                                <div id="line-area-chart-2"></div>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-4 col-sm-6 col-12">
                        <div class="card">
                            <div class="card-header d-flex flex-column align-items-start pb-0">
                                <div class="avatar bg-rgba-danger p-50 m-0">
                                    <div class="avatar-content">
                                        <i class="feather icon-shopping-cart text-danger font-medium-5"></i>
                                    </div>
                                </div>
                                <h2 class="text-bold-700 mt-1">36%</h2>
                                <p class="mb-0">Quarterly Sales</p>
                            </div>
                            <div class="card-content">
                                <div id="line-area-chart-3"></div>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-4 col-sm-6 col-12">
                        <div class="card">
                            <div class="card-header d-flex flex-column align-items-start pb-0">
                                <div class="avatar bg-rgba-warning p-50 m-0">
                                    <div class="avatar-content">
                                        <i class="feather icon-package text-warning font-medium-5"></i>
                                    </div>
                                </div>
                                <h2 class="text-bold-700 mt-1">97.5K</h2>
                                <p class="mb-0">Orders Received</p>
                            </div>
                            <div class="card-content">
                                <div id="line-area-chart-4"></div>
                            </div>
                        </div>
                    </div>
        </div>-->
        <div class="row">
          <div class="col-lg-4 col-sm-4 col-4">
            <div class="card">
              <div id="chartContainer chart-wrapper" style="height: 370px; width: 100%;">
                <client-only>
                  <chart :options="salesPieChartOptions"></chart>
                </client-only>
              </div>
            </div>
          </div>
          <!-- </div>
          <div class="row">-->
          <div class="col-lg-8 col-sm-8 col-8">
            <div class="card">
              <div id="chartContainer chart-wrapper" style="height: 370px; width: 100%;">
                <client-only>
                  <chart :options="salesBarChartOptions"></chart>
                </client-only>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import "@/plugins/echarts";

export default {
  layout: "dashboard",
  computed: {
    getBranch() {
      return this.$store.state.selectedBranchId;
    }
  },
  watch: {
    getBranch: function(val) {
      // let a=val;
      this.getDetails();
    }
  },
  created() {
    this.getDetails();
  },
  methods: {
    getMonthAndYear() {
      let i = 12;
      const dt = new Date();
      dt.setFullYear(dt.getFullYear() - 1);
      dt.setMonth(dt.getMonth() + 1);
      const arrayOfObj = [];
      while (i != 0) {
        let month;
        if (dt.getMonth() + 1 < 10) {
          month = "0" + (dt.getMonth() + 1);
        } else {
          month = dt.getMonth() + 1;
        }
        const obj = {
          name: month + "-" + dt.getFullYear(),
          value: 0
        };
        arrayOfObj.push(obj);
        dt.setMonth(dt.getMonth() + 1);
        i = i - 1;
      }
      return arrayOfObj;
    },
    getDetails() {
      if (this.$store.state.selectedBranchId == 100) {
        const vueInstance = this;
        axios.get("http://localhost:4000/item").then(response => {
          const items = response.data;
          const salesLegendData = [];
          const salesSeriesData = [];
          for (let index in items) {
            axios
              .get(
                "http://localhost:4000/salereportbymonth/" + items[index].itemId
              )
              .then(response => {
                if (response.data.length > 0) {
                  salesLegendData.push(response.data[0].name);
                  salesSeriesData.push({
                    name: response.data[0].name,
                    value: response.data[0].quantity
                  });
                }
              });
          }
          vueInstance.salesPieChartOptions.legend.data = salesLegendData;
          vueInstance.salesPieChartOptions.series[0].data = salesSeriesData;
        });
        axios.get("http://localhost:4000/chartreport").then(response => {
          const salesLegendData = [];
          const salesSeriesData = this.getMonthAndYear();
          salesSeriesData.forEach(item => {
            salesLegendData.push(item.name);
          });
          if (response.data.length > 0) {
            const colors = ["blue", "red", "green"];
            for (let index in response.data) {
              const object = salesSeriesData.find(obj => {
                return (
                  obj.name ==
                  response.data[index].month + "-20" + response.data[index].year
                );
              });
              if (object != undefined) {
                object.value = response.data[index].totalSale;
                object.itemStyle = { color: colors[index % 3] };
              }
            }
            vueInstance.salesBarChartOptions.xAxis.data = salesLegendData;
            vueInstance.salesBarChartOptions.series[0].data = salesSeriesData;
          }
        });
      } else {
        const vueInstance = this;
        if (this.$store.state.selectedBranchId == "") {
          axios
            .get("http://localhost:4000/user/" + this.$store.state.user)
            .then(myres => {
              axios.get("http://localhost:4000/item").then(response => {
                const items = response.data;
                const salesLegendData = [];
                const salesSeriesData = [];
                for (let index in items) {
                  axios
                    .get(
                      "http://localhost:4000/salereportbymonth/" +
                        items[index].itemId +
                        "/" +
                        myres.data[0].fkBranchId
                    )
                    .then(response => {
                      if (response.data.length > 0) {
                        salesLegendData.push(response.data[0].name);
                        salesSeriesData.push({
                          name: response.data[0].name,
                          value: response.data[0].quantity
                        });
                      }
                    });
                }
                vueInstance.salesPieChartOptions.legend.data = salesLegendData;
                vueInstance.salesPieChartOptions.series[0].data = salesSeriesData;
              });
            });
        } else {
          axios.get("http://localhost:4000/item").then(response => {
            const items = response.data;
            const salesLegendData = [];
            const salesSeriesData = [];
            for (let index in items) {
              axios
                .get(
                  "http://localhost:4000/salereportbymonth/" +
                    items[index].itemId +
                    "/" +
                    this.$store.state.selectedBranchId
                )
                .then(response => {
                  if (response.data.length > 0) {
                    salesLegendData.push(response.data[0].name);
                    salesSeriesData.push({
                      name: response.data[0].name,
                      value: response.data[0].quantity
                    });
                  }
                });
            }
            vueInstance.salesPieChartOptions.legend.data = salesLegendData;
            vueInstance.salesPieChartOptions.series[0].data = salesSeriesData;
          });
        }
        axios
          .get(
            "http://localhost:4000/chartreport/" +
              this.$store.state.selectedBranchId
          )
          .then(response => {
            const salesLegendData = [];
            const salesSeriesData = this.getMonthAndYear();
            salesSeriesData.forEach(item => {
              salesLegendData.push(item.name);
            });
            if (response.data.length > 0) {
              const colors = ["blue", "red", "green"];
              for (let index in response.data) {
                const object = salesSeriesData.find(obj => {
                  return (
                    obj.name ==
                    response.data[index].month +
                      "-20" +
                      response.data[index].year
                  );
                });
                if (object != undefined) {
                  object.value = response.data[index].totalSale;
                  object.itemStyle = { color: colors[index % 3] };
                }
              }
              vueInstance.salesBarChartOptions.xAxis.data = salesLegendData;
              vueInstance.salesBarChartOptions.series[0].data = salesSeriesData;
            }
          });
      }
    }
  },
  data: () => ({
    salesBarChartOptions: {
      polar: {
        center: ["50%", "54%"]
      },
      tooltip: {
        trigger: "item",
        formatter: "{a} in {b} : {c}"
        // axisPointer: {
        //     type: 'cross'
        // }
      },
      angleAxis: {
        type: "value",
        startAngle: 0
      },
      radiusAxis: {
        min: 0
      },
      xAxis: {
        data: []
      },
      yAxis: {
        type: "value"
      },
      series: [
        {
          name: "Sales",
          type: "bar",
          data: null
        }
      ],
      title: {
        text: "Sales",
        x: "center",
        textStyle: {
          fontSize: 24
        }
      },
      color: ["#127ac2"]
    },
    salesPieChartOptions: {
      //pie chart
      title: {
        text: "Item's share in overall sales",
        // subtext: 'Fictitious',
        x: "center",
        textStyle: {
          fontSize: 24
        }
      },
      tooltip: {
        trigger: "item",
        // formatter: "{a} <br/>{b} : {c} ({d}%)"
        formatter: "{b} : {d}%"
      },
      legend: {
        orient: "vertical",
        left: "left",
        data: null
      },
      series: [
        {
          name: "Item and its share in sales",
          type: "pie",
          radius: "55%",
          center: ["50%", "60%"],
          data: null,
          itemStyle: {
            emphasis: {
              shadowBlur: 0,
              shadowOffsetX: 0,
              shadowColor: "rgba(0, 0, 0, 0)"
            }
          }
        }
      ]
    }
  })
};
</script>

<style scoped>
.chart-wrapper {
  width: 100%;
  height: 700px;
  z-index: 11;
}

.echarts {
  width: 100%;
  height: 100%;
}
</style>