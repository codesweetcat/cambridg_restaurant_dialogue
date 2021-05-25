import React, { useEffect } from 'react'
import './DemoContainer.css'
import ActionBarChart from './ResponseAction/ActionBarChart'
import EvaluationBarChart from './ResponseAction/EvaluationBarChart'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import AppBar from '@material-ui/core/AppBar'
import Button from '@material-ui/core/Button'

import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import { useTheme } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import SpeechInput from '../PageSpeechContainer/SpeechInput/SpeechInput'
import { useSelector, useDispatch } from 'react-redux'
import SystemActsBarCharts from './SystemActsBarCharts'
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
  const dispatch = useDispatch()

  const allArrayVisualData = useSelector((state) => state.visualdata.visualData)
  const filterVisualData = useSelector(
    (state) => state.visualdata.filterVisualData,
  )

  const currentIndexVisualData = useSelector((state) => state.visualdata.index)
  const totalIndexVisualData = useSelector(
    (state) => state.visualdata.total_index,
  )
  const forwardBtndisabled = currentIndexVisualData <= 0
  const backwardBtndisabled =
    totalIndexVisualData <= 0 || currentIndexVisualData == totalIndexVisualData

  const visualDataLength = allArrayVisualData.length

  console.log(
    'selectedVisualData',
    allArrayVisualData,
    currentIndexVisualData,
    allArrayVisualData[allArrayVisualData.length - 1]?.Task.action_labels,
    filterVisualData,
  )

  const task = filterVisualData?.Task
  const feedback = filterVisualData?.['Auto-feedback']
  const som_data = filterVisualData?.['SOM']
  const evaluation_data = filterVisualData?.['Evaluation']

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

  const labelEvaluation = evaluation_data?.action_labels

  const evaluationValues = {
    action_probs: evaluation_data?.action_probs,
    agent_select: evaluation_data?.agent_select,
  }
  const lightBarColorEvaluation = '#ddc8ec'
  const darkBarColorEvaluation = '#594866'

  const incrementIndex = () => {
    dispatch({
      type: 'INCREMENT_INDEX',
    }) //to redux
  }
  const decrementIndex = () => {
    dispatch({
      type: 'DECREMENT_INDEX',
    }) //to redux
  }
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
          <Button onClick={decrementIndex} disabled={forwardBtndisabled}>
            Forward
          </Button>
          <Button onClick={incrementIndex} disabled={backwardBtndisabled}>
            Backward
          </Button>
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
            <SystemActsBarCharts
              labelTasks={labelTasks}
              tasks={tasks}
              lightBarColorTask={lightBarColorTask}
              darkBarColorTask={darkBarColorTask}
              labelFeedback={labelFeedback}
              autoFeedbach={autoFeedbach}
              lightBarColorAutoFeedback={lightBarColorAutoFeedback}
              darkBarColorAutoFeedback={darkBarColorAutoFeedback}
              labelSOM={labelSOM}
              som={som}
              lightBarColorSOM={lightBarColorSOM}
              darkBarColorSOM={darkBarColorSOM}
              labelEvaluation={labelEvaluation}
              evaluationValues={evaluationValues}
              lightBarColorEvaluation={lightBarColorEvaluation}
              darkBarColorEvaluation={darkBarColorEvaluation}
            />
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
