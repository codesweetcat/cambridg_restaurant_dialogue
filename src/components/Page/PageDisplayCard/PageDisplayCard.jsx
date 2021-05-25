import React, { useRef, useContext } from 'react'
import useScrollBottom from '../../../customerHooker/useScrollBottom'
import { SettingContext } from '../../../viableContext'
import { useSelector, useDispatch } from 'react-redux'

const PageDisplayCard = ({ responseStorage }: any) => {
  // const uiContent_ref = useRef<HTMLDivElement>(null)
  const uiContent_ref = useRef()

  useScrollBottom(uiContent_ref, responseStorage)
  const { _historyRowNum } = useContext(SettingContext)
  const showResponseInLimit =
    responseStorage && responseStorage.length > _historyRowNum
      ? responseStorage.slice(-_historyRowNum)
      : responseStorage

  const currentIndexVisualData = useSelector((state) => state.visualdata.index)
  console.log('currentIndexVisualData', responseStorage, currentIndexVisualData)

  const addBackGroundColor = (i) => {
    return i == currentIndexVisualData ? { backgroundColor: '#e9ecef' } : null
  }
  return (
    <div className="container ">
      <div className=" card card-body">
        <div
          className="scrollable"
          id="restaurantcontent"
          style={{ height: 200, overflowY: 'auto' }}
          ref={uiContent_ref}
        >
          <ul style={{ listStyleType: 'none' }}>
            <li>
              <h5>
                System: &nbsp;
                <span style={{ color: '#dc7474' }}>
                  Welcome to the Cambridge restaurant information system. How
                  may I help you?
                </span>
              </h5>
            </li>
            {showResponseInLimit &&
              showResponseInLimit.map((item: any, i: number) => (
                <li key={i} style={addBackGroundColor(i)}>
                  <h5 data-testid="printed-user">
                    User:&nbsp;&nbsp; &nbsp;
                    <span style={{ color: '#74dcce' }}> {item.input}</span>
                  </h5>
                  <h5 data-testid="printed-sys">
                    System:&nbsp;
                    <span style={{ color: '#dc7474' }}>
                      {item.data.system_utt}
                    </span>
                  </h5>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default PageDisplayCard
