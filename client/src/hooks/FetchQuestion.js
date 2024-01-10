import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { getServerData } from "../helper/helper"

/** redux action */
import * as Action from '../redux/question_reducer'


/** fetch question hook to fetch api data and set value to store */
export const useFetchQuestion = () => {
    const dispatch = useDispatch();
    const [getData, setGetData] = useState({ isLoading: false, apiData: [], serverError: null })

    useEffect(() => {
        setGetData(prev => ({ ...prev, isLoading: true }));

        /** async function fetch backend data */
        (async () => {
            try {

                const [{ questions, answers }] = await getServerData(`${process.env.REACT_APP_SERVER_HOSTNAME}/api/questions`, (data) => data)
                // console.log({ questions, answers })
                if (questions.length > 0) {
                    setGetData(prev => ({ ...prev, isLoading: false }));
                    setGetData(prev => ({ ...prev, apiData: { questions, answers } }));

                    /** dispatch an action */
                    dispatch(Action.startExamAction({ question: questions, answers }))
                } else {
                    throw new Error("No Question Available");
                }
            } catch (error) {
                setGetData(prev => ({ ...prev, isLoading: false }));
                setGetData(prev => ({ ...prev, serverError: error.message }));
            }
        })();
    }, [dispatch]);

    return [getData, setGetData];
}

/** Move Action Dispatch Function */
export const MoveNextQuestion = () => async (dispatch) => {
    try {
        dispatch(Action.moveNextAction()) /** increase trace by 1 */
    } catch (error) {
        console.log(error)
    }
}

/** Previous Action Dispatch Function */
export const MovePrevQuestion = () => async (dispatch) => {
    try {
        dispatch(Action.movePrevAction()) /** decrease trace by 1 */
    } catch (error) {
        console.log(error)
    }
}