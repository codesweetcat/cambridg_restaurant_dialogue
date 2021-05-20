import React from 'react'
import { Bar } from 'react-chartjs-2'
import reactDom from 'react-dom'
import './EvaluationBarChart.css'
/*
Evaluation: {
num_agents: 3,
action_probs: [
0.05, 0.1, 0.0, 0.0, 0.15, 0.0, 0.7, 0.0
],
},
  }
  */
const Evaluation = {
  action_probs: [-0.05, -0.1, 0.1, 0.1, -0.15, 0.1, -0.7, 0.1],
  agent_select: 6,
  eval_select: 1,
}
//pass by props
const lightBackground = '#007BFF'
const darkBackground = '#002E5F'
//need util
const backgroudColorBar = (task, lightBackground, darkBackground) => {
  if (!task) return
  const len = task['action_probs'].length
  const agent_select = task.agent_select
  const eval_select = task.eval_select
  let backgroudColorTask = []
  task['action_probs'].map((item, i) => {
    i === agent_select
      ? backgroudColorTask.push(darkBackground)
      : backgroudColorTask.push(lightBackground)
  })
  return backgroudColorTask
}
const backgroudColorTickLabel = (task, lightBackground, darkBackground) => {
  if (!task) return
  const len = task['action_probs'].length
  const agent_select = task.agent_select
  const eval_select = task.eval_select
  let backgroudColorTickLabel = []
  task['action_probs'].map((item, i) => {
    i === eval_select
      ? backgroudColorTickLabel.push(lightBackground)
      : backgroudColorTickLabel.push('white')
  })
  return backgroudColorTickLabel
}

const EvaluationBarChart = ({
  labels,
  dataset,
  lightBarColor,
  darkBarColor,
}) => {
  const barValues = dataset
    ? dataset.action_probs.map((item) => -Math.abs(item))
    : ''
  console.log('varValues', barValues)
  const data = {
    labels: labels,
    datasets: [
      {
        data: barValues,
        // yAxisID:'A',
        backgroundColor: backgroudColorBar(
          dataset,
          lightBarColor,
          darkBarColor,
        ),
        borderWidth: 1,
      },
    ],
  }

  const options = {
    indexAxis: 'y',
    responsive: true,
    maintainAspectRatio: false,
    layout: {
      padding: {
        left: 1,
      },
      margin: {
        // top:200
      },
    },
    scales: {
      yAxes: {
        // id:'A',
        position: 'right',
        display: true,
        ticks: {
          // showLabelBackdrop: true,
          // backdropColor:backgroudColorTickLabel(Evaluation,lightBackground,darkBackground),
          font: {
            family: 'Comic Sans MS',
            size: 13,
            // weight: 'bold',
            lineHeight: 1.1,
          },
          backdropPadding: {
            x: 0,
            // y: 4
          },
          // backdropPadding: 30,
          // padding:60,
          // textStrokeWidth:6,
          // textStrokeColor:'red',
          // color:'white'
        },
        gridLines: {
          drawOnChartArea: false,
        },
      },
    },
    // Elements options apply to all of the options unless overridden in a dataset
    // In this case, we are setting the border of each horizontal bar to be 2px wide
    elements: {
      bar: {
        borderWidth: 2,
        borderSkipped: 'end',
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
  }

  return (
    <div class="evaluation_chart-container">
      <Bar data={data} options={options} />
    </div>
  )
}

export default EvaluationBarChart
