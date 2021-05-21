import React from 'react'
import './DemoContainer.css'
import ActionBarChart from './ResponseAction/ActionBarChart'
import EvaluationBarChart from './ResponseAction/EvaluationBarChart'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import AppBar from '@material-ui/core/AppBar'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import { useTheme } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import SpeechInput from '../PageSpeechContainer/SpeechInput/SpeechInput'
import { useSelector } from 'react-redux'
function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  }
}

function TabPanel(props) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  )
}

function DemoContainer() {
  const [value, setValue] = React.useState(0)
  const theme = useTheme()
  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const selectedVisualData = useSelector((state) => state.visualdata.visualData)
  console.log(
    'selectedVisualData',
    selectedVisualData,
    selectedVisualData[selectedVisualData.length - 1]?.Task.action_labels,
  )
  const visualDataLength = selectedVisualData.length

  const task = selectedVisualData[visualDataLength - 1]?.Task
  const feedback = selectedVisualData[visualDataLength - 1]?.['Auto-feedback']
  const som_data = selectedVisualData[visualDataLength - 1]?.['SOM']
  const evaluation_data =
    selectedVisualData[visualDataLength - 1]?.['Evaluation']

  //   const labelTasks = ['None', 'Offer', 'Answer', 'Request']
  const labelTasks = task?.action_labels

  const tasks = {
    action_probs: task?.action_probs,
    agent_select: task?.aagent_select,
    eval_select: task?.eval_select,
  }
  //pass by props
  const lightBarColorTask = '#007BFF'
  const darkBarColorTask = '#002E5F'

  const labelFeedback = feedback?.action_labels

  const autoFeedbach = {
    action_probs: feedback?.action_probs,
    agent_select: feedback?.agent_select,
    eval_select: feedback?.eval_select,
  }
  //#f57676  #e20e0e
  const lightBarColorAutoFeedback = '#ffdfdb'
  const darkBarColorAutoFeedback = '#e20e0e'

  const labelSOM = som_data?.action_labels
  const som = {
    action_probs: som_data?.action_probs,
    agent_select: som_data?.agent_select,
  }
  const lightBarColorSOM = '#bbffb9'
  const darkBarColorSOM = '#65c368'

  const labelEvaluation = [
    ['', ''],
    ['    SOM'],
    ['   Auto-feedback'],
    ['    Auto-feedback + SOM'],
    ['   Task'],
    ['   Task + SOM'],
    ['    Task + Auto-feedback'],
    ['Task + Auto-feedback + SOM'],
  ]

  const evaluationValues = {
    action_probs: evaluation_data?.action_probs,
    agent_select: evaluation_data?.agent_select,
  }
  const lightBarColorEvaluation = '#ddc8ec'
  const darkBarColorEvaluation = '#594866'

  return (
    <div className="App2">
      <Grid
        container
        justify="space-evenly"
        alignItems="flex-start"
        spacing={0}
      >
        <Grid item style={{ width: 400 }}>
          <SpeechInput />
        </Grid>

        <Grid item>
          <AppBar position="static" color="default" style={{ width: '942px' }}>
            <Tabs
              value={value}
              onChange={handleChange}
              indicatorColor="primary"
              textColor="primary"
              variant="fullWidth"
              aria-label="full width tabs example"
            >
              <Tab label="Evaluation" {...a11yProps(0)} />
              <Tab label="Active" {...a11yProps(1)} />
              <Tab label="Active" {...a11yProps(2)} />
            </Tabs>
          </AppBar>

          <TabPanel value={value} index={0} dir={theme.direction}>
            {!visualDataLength ? (
              <div>waiting for your visual data</div>
            ) : (
              <Grid container spacing={3}>
                <Grid item>
                  <Grid
                    container
                    direction="column"
                    justify="center"
                    alignItems="center"
                  >
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
                        <strong className="header-text center-text-l">
                          Auto-
                        </strong>
                        <strong className="header-text center-text-r">
                          Feedback
                        </strong>
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
            )}
          </TabPanel>
          <TabPanel value={value} index={1} dir={theme.direction}>
            Item Two
          </TabPanel>
          <TabPanel value={value} index={2} dir={theme.direction}>
            Item Three
          </TabPanel>
        </Grid>
      </Grid>
    </div>
  )
}

export default DemoContainer
