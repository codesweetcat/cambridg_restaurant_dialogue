import React from 'react';
import { Bar } from 'react-chartjs-2';
import reactDom from 'react-dom';
import './ActionBarChart.css'

//need util
const backgroudColorBar = (dataset,lightBackground,darkBackground) => {
  if(!dataset)return;
  const agent_select = dataset.agent_select;
  const eval_select = dataset.eval_select;
  let backgroudColorTask=[]
  dataset['action_probs'].map((item,i)=>{
    i === agent_select ? backgroudColorTask.push(darkBackground) : 
                           backgroudColorTask.push(lightBackground)
  })
  return backgroudColorTask;
}
const backgroudColorTickLabel = (dataset,lightBackground,darkBackground) => {
  if(!dataset)return;
  const eval_select = dataset.eval_select;
  let backgroudColorTickLabel=[]
  dataset['action_probs'].map((item,i)=>{
    i === eval_select ? backgroudColorTickLabel.push(darkBackground) : 
                           backgroudColorTickLabel.push('white')
  })
  return backgroudColorTickLabel;
}

const backgroudColorFontColor = (dataset) => {
  if(!dataset)return;
  const eval_select = dataset.eval_select;
  let backgroudColorFontColor=[]
  dataset['action_probs'].map((item,i)=>{
    i === eval_select ? backgroudColorFontColor.push('white') : 
                           backgroudColorFontColor.push('black')
  })
  return backgroudColorFontColor;
}




const ActionBarChart = ({labels,dataset,lightBarColor,darkBarColor}) => {
  const barValues = dataset? dataset.action_probs.map(item=> -Math.abs(item)):''
  console.log('varValues',barValues)
  const options = {
    indexAxis: 'y',
    responsive: true,
    maintainAspectRatio: true,
    layout: {
      padding: {
          left: 5
      },
      margin:{
        top:200
      }
  },
    scales:{
      xAxes:{
        display:false,
        ticks:{
          beginAtZero:true
        }
      },
      yAxes:{
        // id:'A',
        position:'right',
        display:true,
        ticks: {
          showLabelBackdrop: true,
          backdropColor:backgroudColorTickLabel(dataset,lightBarColor,darkBarColor),
          font: {
            family: 'Comic Sans MS',
            size: 18,
            weight: 'bold',
            lineHeight: 1,
          },
          backdropPadding: 3,
          padding:3,
          // textStrokeWidth:6,
          // textStrokeColor:'black',
          color:backgroudColorFontColor(dataset)
        }, 
      gridLines: {
        drawOnChartArea: false
      }
      }
    },
    // Elements options apply to all of the options unless overridden in a dataset
    // In this case, we are setting the border of each horizontal bar to be 2px wide
    elements: {
      bar: {
        borderWidth: 1,
      },
    },
    plugins: {
      legend: false,
      title: {
        display: false,
        text: 'Response Action Selection',
        font: {
          family: 'Comic Sans MS',
          size: 40,
          weight: 'bold',
          lineHeight: 1.2,
        },
      },
    },
  };
  const data = {
    labels:labels,
    datasets: [
      {
        data: barValues,
        // yAxisID:'A',
        backgroundColor: backgroudColorBar(dataset,lightBarColor,darkBarColor),
        borderWidth: 1,
        barThickness:30
      },
    ],
  };
 return <div class="chart-container">
    <Bar data={data} options={options} />
  </div>
};

export default ActionBarChart;