import React, { useContext, useState } from "react";
import { TimerContext } from "../Context/TimerContext";

export default function Timer({ timer }) {
    const { timerContext, setTimerContext } = useContext(TimerContext);
    const [secs, setSecs] = useState(timer.secs);
    const [intervalId, setInterValId] = useState(null);
    const [editButton, setEditButton] = useState(false);
    const [startButton, setStartButton] = useState(false);
    const [timerData, setTimerData] = useState({
        title: timer.title,
        project: timer.project,
        secs: timer.secs,
    });

    const { title, project } = timerData;
    const secstToTime = (secs) => {
        let hours = Math.floor(secs / (60 * 60));

        let divisor_for_minutes = secs % (60 * 60);
        let minutes = Math.floor(divisor_for_minutes / 60);

        let divisor_for_seconds = divisor_for_minutes % 60;
        let seconds = Math.ceil(divisor_for_seconds);

        let obj = {
            h: hours,
            m: minutes,
            s: seconds,
        };
        return obj;
    };
    const onChangeFormData = (e) => {
        setTimerData({ ...timerData, [e.target.name]: e.target.value });
    };
    const onClickEditButton = () => {
        setStartButton(false);
        setEditButton(true);
    };
    const onClickDoneButton = () => {
        setEditButton(false);
    };
    const onClickDeleteButton = () => {
        setTimerContext(timerContext.filter((t) => t.title !== timer.title));
    };
    const onClickStartButton = () => {
        setStartButton(true);
        let intervalId = setInterval(() => {
            setSecs((prev) => prev + 1);
        }, 1000);
        console.log(intervalId);
        setInterValId(intervalId);
    };
    const onClickStopButton = () => {
        setStartButton(false);
        console.log(intervalId);
        clearInterval(intervalId);
        setInterValId(null);
    };

    return (
        <div>
            {!editButton && (
                <div>
                    <p> <b> Title: </b>{title}</p>
                    <p> <b> Project: </b>{project}</p>
                    <p> <b> Hour: </b>{secstToTime(secs).h}</p>
                    <p> <b> Minutes: </b>{secstToTime(secs).m}</p>
                    <p> <b> Seconds: </b>{secstToTime(secs).s}</p>
                    {!startButton && (
                        <div>
                            <button onClick={onClickStartButton}>
                                <p>Start</p>
                            </button>
                            <button onClick={onClickEditButton}>
                                <p>Edit</p>
                            </button>
                            <button onClick={onClickDeleteButton}>
                                <p>Delete</p>
                            </button>
                        </div>
                    )}
                    {startButton && (
                        <button onClick={onClickStopButton}>
                            <p>Stop</p>
                        </button>
                    )}
                </div>
            )}
            {editButton && (
                <div>
                    <form>
                        <label> <b> Title: </b></label>
                        <textarea
                            name="title"
                            value={timerData.title}
                            onChange={onChangeFormData}
                        ></textarea> <br></br>
                        <label> <b> Project: </b></label>
                        <textarea
                            name="project"
                            value={timerData.project}
                            onChange={onChangeFormData}
                        ></textarea> <br></br>
                        <button onClick={onClickDoneButton}>
                            <p> Done</p>
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
}
