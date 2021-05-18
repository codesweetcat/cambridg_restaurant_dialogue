import React from 'react';

const ErrorDescription = ({errorDescription}: any) => {
  return(
          <div className="container searchContainer">
            <div className="search card card-body">
                <h5 style={{color:"#f10a21", textAlign:'center'}}> <span >{errorDescription}</span> </h5>
            </div>
          </div>
  )
}

export default ErrorDescription;
