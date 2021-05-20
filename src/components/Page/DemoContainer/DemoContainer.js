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
  const [value, setValue] = React.useState(2)
  const theme = useTheme()
  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const labelTasks = ['None', 'Offer', 'Answer', 'Request']
  const tasks = {
    action_probs: [0.1, 0.65, 0.05, 0.2],
    agent_select: 1,
    eval_select: 1,
  }
  //pass by props
  const lightBarColorTask = '#007BFF'
  const darkBarColorTask = '#002E5F'

  const labelFeedback = ['None', 'AutoNegative', 'Confirm', 'ImplicitConfirm']
  const autoFeedbach = {
    action_probs: [0.28, 0.05, 0.07, 0.6],
    agent_select: 3,
    eval_select: 3,
  }
  //#f57676  #e20e0e
  const lightBarColorAutoFeedback = '#ffdfdb'
  const darkBarColorAutoFeedback = '#e20e0e'
  const labelSOM = ['None', 'AcceptThanking', 'Confirm']
  const som = {
    action_probs: [0.28, 0.05, 0.07, 0.6],
    agent_select: 0,
  }
  const lightBarColorSOM = '#bbffb9'
  const darkBarColorSOM = '#65c368'

  /****
 *  "Evaluation": {
            "num_agents": 3,
            "action_probs": [ 0.05, 0.1, 0.0, 0.0, 0.15, 0.0, 0.7, 0.0 ],
            "agent_select": 6
        }
 */
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
    action_probs: [0.05, 0.1, 0.0, 0.0, 0.15, 0.0, 0.7, 0.0],
    agent_select: 6,
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
