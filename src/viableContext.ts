import React from 'react'

export const SettingContext = React.createContext({
  _endpointHubPHP: 'https://stg-woc7/hubproduction_new/hub.php',
  _historyRowNum: 4,
  // _vioceType:voiceTypes.Englist_m,
  _numOfHypothesis: 3,
  _maxOfUtterTurnsEnableTokenBtn: 5,
  _showASRoutputInputBox: false,
})
