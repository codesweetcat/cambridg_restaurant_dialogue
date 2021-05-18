import './DemoContainer.css';
import ActionBarChart from './ResponseAction/ActionBarChart'
import EvaluationBarChart from './ResponseAction/EvaluationBarChart'

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import PageSpeechContainer from '../PageSpeechContainer/PageSpeechContainer'
import SpeechInput from '../PageSpeechContainer/SpeechInput/SpeechInput';
function DemoContainer() {
  const labelTasks = ['None', 'Offer', 'Answer', 'Request'];
   const tasks = {
    'action_probs': [
              0.1,
              0.65,
              0.05,
              0.2
    ],
    agent_select: 1,
    eval_select: 1
}
//pass by props
const lightBarColorTask = '#007BFF'
const darkBarColorTask = '#002E5F'

const labelFeedback = ['None','AutoNegative','Confirm','ImplicitConfirm'];
const autoFeedbach =  {
  'action_probs': [
   0.28,
   0.05,
   0.07,
   0.6
  ],
  agent_select: 3,
  eval_select: 3
  }
  //#f57676  #e20e0e
  const lightBarColorAutoFeedback = '#ffdfdb'
  const darkBarColorAutoFeedback = '#e20e0e'
  const labelSOM = ['None','AcceptThanking','Confirm'];
  const som =  {
  'action_probs': [
   0.28,
   0.05,
   0.07,
   0.6
  ],
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
  const labelEvaluation = [['', ''], ["    SOM"], ["   Auto-feedback"], ["    Auto-feedback + SOM"],["   Task"], ["   Task + SOM"],
  ["    Task + Auto-feedback"], ["Task + Auto-feedback + SOM"]];

  const evaluationValues =  {
    'action_probs': [0.05, 0.1, 0.0, 0.0, 0.15, 0.0, 0.7, 0.0],
    agent_select: 6,
    }
    const lightBarColorEvaluation = '#ddc8ec'
    const darkBarColorEvaluation = '#594866'
  
  return (
    <div className="App">
        <Grid container spacing={1}>
          <Grid item xs={3}>
             <SpeechInput />
          </Grid>
       
          <Grid item xs={4}>

              <Grid
                container
                direction="column"
                justify="center"
                alignItems="center"
              >
                        <div class="wrapper" style={{borderLeftColor:lightBarColorTask, color:darkBarColorTask}}>
                              <strong className="header-text_1">Task</strong>
                          <div class="content">
                          <ActionBarChart labels={labelTasks} dataset={tasks} lightBarColor={lightBarColorTask} darkBarColor={darkBarColorTask}/>
                          </div>
                        </div>
                    
                        <div class="wrapper" style={{borderLeftColor:lightBarColorAutoFeedback, color:darkBarColorAutoFeedback}}>
                          <div className="header-sidebar">
                              <strong className="header-text center-text-l">Auto-</strong>
                              <strong className="header-text center-text-r">Feedback</strong>
                          </div>
                          <div class="content">
                          <ActionBarChart labels={labelFeedback} dataset={autoFeedbach} lightBarColor={lightBarColorAutoFeedback} darkBarColor={darkBarColorAutoFeedback}/>
                          </div>
                        </div>
                        <div class="wrapper" style={{borderLeftColor:lightBarColorSOM, color:darkBarColorSOM}}>
                          <strong className="header-text_1">SOM</strong>
                          <div class="content">
                            <ActionBarChart labels={labelSOM} dataset={som} lightBarColor={lightBarColorSOM} darkBarColor={darkBarColorSOM}/>
                        </div>
                      </div>

            </Grid>
        </Grid>
          <Grid item xs={5}>
        <div class="wrapper_r" style={{borderLeftColor:lightBarColorEvaluation, color:darkBarColorEvaluation}}>
            <strong className="header-text_1">Evaluation</strong>
          <div class="content">
              <EvaluationBarChart labels={labelEvaluation} dataset={evaluationValues} lightBarColor={lightBarColorEvaluation } darkBarColor={darkBarColorEvaluation }/>
          </div>
        </div>
        </Grid>
        </Grid>
    </div>
  );
}

export default DemoContainer;
