import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.css';
import paginationFactory from 'react-bootstrap-table2-paginator';   
import filterFactory from 'react-bootstrap-table2-filter';  
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";

const DataTable= ( {plotData} ) => 
{
  const columns = plotData.headers;
  const rowEvents = plotData.rowEvents;
  const { SearchBar } = Search;
  return ( 
            <div>
              <ToolkitProvider bootstrap4
                keyField={plotData.keyField}
                data={ plotData.body}
                columns={ columns }
                
               search
              >
              {
                props => (
                  <div> 
                    <SearchBar { ...props.searchProps }/> 
                    <BootstrapTable 
                      { ...props.baseProps }  condensed hover
                      pagination={ paginationFactory()} filter={ filterFactory()} 
                      tdStyle={{ whiteSpace: 'nowrap'}}
                      noDataIndication="No Data Available"
                      rowEvents={ rowEvents }
                      
                    />
                  </div>
                )
              }
          </ToolkitProvider>
        </div>
      )}  
export  default  DataTable;