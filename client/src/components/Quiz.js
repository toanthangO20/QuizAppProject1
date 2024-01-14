import React, { useEffect, useState } from "react";
import Questions from "./Questions";

/**redux store import */
import { useSelector, useDispatch } from 'react-redux'
import { Navigate } from 'react-router-dom'

import { MoveNextQuestion, MovePrevQuestion } from "../hooks/FetchQuestion";
import { PushAnswer } from "../hooks/setResult";

export default function Quiz() {

    const [check, setChecked] = useState(undefined)

    const result = useSelector(state => state.result.result);
    const { queue, trace } = useSelector(state => state.questions);
    const dispatch = useDispatch()

    /**next button event handler */
    function onNext() {
        // console.log('On next click')

        if (trace < queue.length) {
            /**Update the trace value by one using MoveNextQuestion */
            dispatch(MoveNextQuestion())

            /** insert a new result in the array */
            if (result.length <= trace) {
                dispatch(PushAnswer(check))
            }
        }

        /** reset the value of the checked variable */
        setChecked(undefined)
    }

    /**Prev button event handler */
    function onPrev() {

        if (trace > 0) {
            /**Update the trace value by one using MovePrevQuestion */
            dispatch(MovePrevQuestion())
        }
    }

    function onChecked(check) {
        // console.log(check)
        setChecked(check)
    }

    /** finished exam after the last question */
    if (result.length && result.length >= queue.length) {
        return <Navigate to={'/result'} replace="true"></Navigate>
    }

    return (
        <div className='container'>
            <h1 className='title text-light'>Trắc nghiệm SOICT</h1>

            {/**display questions */}
            <Questions onChecked={onChecked} />

            <div className='grid'>
                {trace > 0 ? <button className='btn prev' onClick={onPrev}>Previous</button> : <div></div>}
                <button className='btn next' onClick={onNext}>Next</button>
            </div>


        </div>
    )
}