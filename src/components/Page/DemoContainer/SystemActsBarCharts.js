import React, { useEffect } from 'react'
import './DemoContainer.css'
import ActionBarChart from './ResponseAction/ActionBarChart'
import EvaluationBarChart from './ResponseAction/EvaluationBarChart'
import { useTheme } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import { useSelector, useDispatch } from 'react-redux'

const SystemActsBarCharts = ({
  labelTasks,
  tasks,
  lightBarColorTask,
  darkBarColorTask,
  labelFeedback,
  autoFeedbach,
  lightBarColorAutoFeedback,
  darkBarColorAutoFeedback,
  labelSOM,
  som,
  lightBarColorSOM,
  darkBarColorSOM,
  labelEvaluation,
  evaluationValues,
  lightBarColorEvaluation,
  darkBarColorEvaluation,
}) => {
  return (
    <Grid container spacing={3}>
      <Grid item>
        <Grid container direction="column" justify="center" alignItems="center">
          <div
            class="wrapper"
            style={{
              borderLeftColor: lightBarColorTask,
              color: darkBarColorTask,
            }}
          >
            <strong className="header-text_1">Task</strong>
            <div class="content">
              <ActionBarChart
                labels={labelTasks}
                dataset={tasks}
                lightBarColor={lightBarColorTask}
                darkBarColor={darkBarColorTask}
              />
            </div>
          </div>

          <div
            class="wrapper"
            style={{
              borderLeftColor: lightBarColorAutoFeedback,
              color: darkBarColorAutoFeedback,
            }}
          >
            <div className="header-sidebar">
              <strong className="header-text center-text-l">Auto-</strong>
              <strong className="header-text center-text-r">Feedback</strong>
            </div>
            <div class="content">
              <ActionBarChart
                labels={labelFeedback}
                dataset={autoFeedbach}
                lightBarColor={lightBarColorAutoFeedback}
                darkBarColor={darkBarColorAutoFeedback}
              />
            </div>
          </div>
          <div
            class="wrapper"
            style={{
              borderLeftColor: lightBarColorSOM,
              color: darkBarColorSOM,
            }}
          >
            <strong className="header-text_1">SOM</strong>
            <div class="content">
              <ActionBarChart
                labels={labelSOM}
                dataset={som}
                lightBarColor={lightBarColorSOM}
                darkBarColor={darkBarColorSOM}
              />
            </div>
          </div>
        </Grid>
      </Grid>
      <Grid item>
        <div
          class="wrapper_r"
          style={{
            borderLeftColor: lightBarColorEvaluation,
            color: darkBarColorEvaluation,
          }}
        >
          <strong className="header-text_1">Evaluation</strong>
          <div class="content">
            <EvaluationBarChart
              labels={labelEvaluation}
              dataset={evaluationValues}
              lightBarColor={lightBarColorEvaluation}
              darkBarColor={darkBarColorEvaluation}
            />
          </div>
        </div>
      </Grid>
    </Grid>
  )
}

export default SystemActsBarCharts
