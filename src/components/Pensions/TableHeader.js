const TableHeader = (props) => {
    return(
            <>
            <thead className="thead">
            <tr>
            {props.headerValues.map((eachTH,index) =>{
              return eachTH.showField?
                  <th key={index}>
                  <label htmlFor={eachTH.label}><span>{eachTH.label}
                    {eachTH.isMandatory===true?
                    <span className="mandatory">* </span>:''}
                    </span>
                  </label>
                  </th>:'' 
              })
            }
          </tr>
            </thead>
          </>
        )
    }
    export default TableHeader;
    
    