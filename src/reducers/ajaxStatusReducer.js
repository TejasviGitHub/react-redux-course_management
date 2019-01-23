import * as types from '../actions/actionTypes';
import initialState from './initialState';

function actionTypeEndsInSuccess(type) {
  return type.substring(type.length-8) == '_SUCCESS';
}

export default function ajaxStatusReducer(state=initialState.ajaxCallsInProgress, action) {
  //using if instead of switch
  if(action.type == types.BEGIN_AJAX_CALL) {
    return state + 1; //0(initial state)+1
  }

  //all our thunks ultimately display the success action when they complete. Well that means that I can use the success
  //signal as the action that is completed. This will help manually dispatching a separate end AJAX call action everytime
  //when call is completed.
  else if(action.type == types.AJAX_CALL_ERROR || actionTypeEndsInSuccess(action.type)) {
    return state-1;
  }


  return state;
}

