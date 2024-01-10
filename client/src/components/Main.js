import React, { useRef } from "react";
import { Link } from "react-router-dom";
import '../styles/Main.css'
import { useDispatch } from "react-redux";
import { setUserId } from "../redux/result_reducer";

export default function Main() {

    const inputRef = useRef(null)
    const dispatch = useDispatch()

    function startQuiz() {
        if (inputRef.current?.value) {
            dispatch(setUserId(inputRef.current?.value))
        }
    }

    return (
        <div className='container'>
            <h1 className='title text-light'>Trắc nghiệm SOICT</h1>

            <ol>
                <li>Bạn sẽ lần lượt trả lời các câu hỏi trắc nghiệm.</li>
                <li>Mỗi câu trả lời đúng sẽ nhận được 10 điểm.</li>
                <li>Mỗi câu hỏi có 4 đáp án. Trong đó chỉ có 1 đáp án đúng.</li>
                <li>Bạn có thể đổi đáp án các câu hỏi trước khi kết thúc bài kiểm tra.</li>
                <li>Kết quả sẽ được hiển thị sau khi kết thúc bài kiểm tra.</li>
            </ol>

            <form id="form">
                <input ref={inputRef} className="userid" type="text" placeholder='Username*' />
            </form>

            <div className='start'>
                <Link className='btn' to={'quiz'} onClick={startQuiz}>Start Quiz</Link>
            </div>

        </div>
    )
}