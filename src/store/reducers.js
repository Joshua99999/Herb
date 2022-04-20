import { combineReducers } from '@reduxjs/toolkit';
import accountReducer from './accountReducer';

import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import payrollReducer from './payrollReducer';
import SpinnerReducer from '../components/EmployeeUpdation/SpinnerReduser';
import WorkflowReducer from './WorkflowReducer';
import ContingentCreationReducer from '../components/Pensions/WorkflowInitialValues';

const reducers = combineReducers({
    account: persistReducer(
        {
            key: 'account',
            storage,
            keyPrefix: 'datta-'
        },
        accountReducer
    ),
    payroll: payrollReducer,
    spinner: SpinnerReducer,
    DeleteData:WorkflowReducer,
    WorkflowInitialvalues:ContingentCreationReducer
});

export default reducers;
