import {appReducer, InitialStateType, RequestStatusType, setErrorAC, setAppStatusAC} from "./app-reducer";
import {v1} from "uuid";

let startState :InitialStateType
beforeEach(() => {
    startState = {
        status: 'idle',
        error: null
    }
})
test('correct error message should be set', () => {
    const endState = appReducer(startState,setErrorAC("some error"))
    expect(endState.error).toBe("some error");
});
test('correct status should be set', () => {
    const endState = appReducer(startState,setAppStatusAC("loading"))
    expect(endState.status).toBe("loading");
});

