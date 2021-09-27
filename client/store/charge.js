import axios from "axios";

const CHARGE_COMPLETED = "CHARGE_COMPLETED"

const chargeCompleted = (bool) =>{
  return {
    type: CHARGE_COMPLETED,
    completed: bool,
  }
}

export const chargeCard = (form) => {
  return async (dispatch) => {
    try {
      console.log('IN CHARGE CARD THUNK', form)
      const {name, email, amount} = form
      const response = await axios.post("/charge", {name, email, amount});
      console.log(response)
      if(response.status === 200) {
        dispatch(chargeCompleted(true))
      } else {
        console.log('error with payment')
      }
    } catch (err) {
      console.log(err);
    }
  };
};

let initialState = {completed: false}

export default (state = initialState, action) => {
  switch (action.type) {
    case CHARGE_COMPLETED:
      return {...state, completed: action.completed};
    default:
      return state;
  }
};
