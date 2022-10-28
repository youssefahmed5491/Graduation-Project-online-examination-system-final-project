import axios from "axios";
import { delay, isArray, isObject } from "lodash";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Select from "react-select";
import ModelPreview from "./ModelPreview.png";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { DatePickerComponent } from "@syncfusion/ej2-react-calendars";
import "../../reactdate.css";

import TimePicker from "rc-time-picker";
import "rc-time-picker/assets/index.css";
import moment from "moment";

const CreateExamPage = (professor) => {
    const { username, radio } = useParams();
    const [subject, setSubject] = useState();
    const [duration, setDuration] = useState();
    const [questionType, setQuestionType] = useState();
    const [mcqAmount, setMCQAmount] = useState();
    const [date, setDate] = useState();
    const [time, setTime] = useState();
    const [numberOfModels, setNumberOfModels] = useState();
    const [subjectError, setSubjectError] = useState("");
    const [durationError, setDurationError] = useState("");
    const [questionTypeError, setQuestionTypeError] = useState("");
    const [mcqAmountError, setMCQAmountError] = useState("");
    const [dateError, setDateError] = useState("");
    const [timeError, setTimeError] = useState("");
    const [numberOfModelsError, setNumberOfModelsError] = useState("");
    const [difficultyError, setDifficultyError] = useState("");
    const [chaptersError, setChaptersError] = useState("");
    const [getarray, setGetArray] = useState([]);
    const [showModels, setShowModels] = useState(false);
    const [easyNumberQuestions, setEasyNumberQuestions] = useState();
    const [mediumNumberQuestions, setMediumNumberQuestions] = useState();
    const [hardNumberQuestions, setHardNumberQuestions] = useState();
    const [subjectdetails, setSubjectDetails] = useState([null]);
    const [arrayChapters, setArrayChapters] = useState([]);
    const [modelid, setModelId] = useState([]);
    const [url, setUrl] = useState();
    const [status, setStatus] = useState();

    const [urlError, setUrlError] = useState();

    const [datevalue, setDatevalue] = useState();
    const [timevalue, setTimevalue] = useState();
    function delay(time) {
        return new Promise((resolve) => setTimeout(resolve, time));
    }
    const getexam = async () => {
        await axios.post("/api/exam", request1);
        console.log(numberOfModels, "ffffffffffffffffffffffffffff");
    };
    console.log(username, "asdgasdiasndgiasdh");
    console.log(radio, "dsdioghasudghasuidguiasg");

    let minDate = new Date();
    console.log(minDate);

    const handledate = (e) => {
        console.log(e.target.value.getFullYear());
        let m = e.target.value.getMonth() + 1;
        console.log(e.target.value.getDate());
        setDatevalue(
            e.target.value.getFullYear() +
                "-" +
                m +
                "-" +
                e.target.value.getDate()
        );
        console.log(datevalue);
    };
    const handletime = (e) => {
        console.log(e.format("hh:mm:ss a"));

        let int = parseInt(e.format("hh"), 10);
        if (
            (e.format("a") === "pm" && e.format("hh") != "12") ||
            (e.format("a") === "am" && e.format("hh") === "12")
        ) {
            int = int + 12;
        }
        setTimevalue(int + ":" + e.format("mm") + ":" + "00");
        console.log(timevalue);
    };

    console.log(professor.professor.id);
    useEffect(() => {
        axios
            .get(`/api/professors/${professor.professor.id}/subjects`)
            .then((response) => {
                setGetArray(response.data);
            });
    }, []);
    useEffect(() => {
        if (subject != null) {
            console.log(
                subjectdetails.set_of_criteria,
                "kkkkkkkkkkkkkkkkkkkkkkkkkkkkk"
            );
            setArrayChapters(Array(subjectdetails.set_of_criteria.length));
        }
    }, [subjectdetails]);

    let wantedarray = [];
    const addvalue = (getarray) => {
        wantedarray = [];
        for (let index = 0; index < getarray.length; index++) {
            wantedarray.push({
                value: getarray[index].title,
                label: getarray[index].title,
            });
        }
        return wantedarray;
    };
    const options = addvalue(getarray);

    const handleEasyNumberQuestions = (e) => {
        setEasyNumberQuestions(e.target.value);

        console.log(e.target.value);
    };
    const handleMediumNumberQuestions = (e) => {
        setMediumNumberQuestions(e.target.value);

        console.log(e.target.value);
    };
    const handleHardNumberQuestions = (e) => {
        setHardNumberQuestions(e.target.value);

        console.log(e.target.value);
    };
    const handleNumberOfModels = (e) => {
        console.log(e.target.value);
    };

    const handleChapter = (e, index) => {
        let temp = arrayChapters;
        temp[index] = e.target.value;
        setArrayChapters(temp);
        // console.log(isArray(arrayChapters));
    };

    //console.log(subjectdetails.id);
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(
            subject,
            duration,
            questionType,
            mcqAmount,
            datevalue + "dateeeeeeeeeeeeeee",
            timevalue + "Timeeeeeeeeeeeeeeeee",
            numberOfModels,
            arrayChapters
        );
        let sum = 0;
        for (let i = 0; i < arrayChapters.length; i++) {
            sum = sum + Number(arrayChapters[i]);
        }
        console.log(sum);
        if (
            subject &&
            duration &&
            (questionType === "written" || questionType === "mcq") &&
            mcqAmount &&
            datevalue &&
            timevalue &&
            url &&
            Number(easyNumberQuestions) +
                Number(mediumNumberQuestions) +
                Number(hardNumberQuestions) ===
                Number(mcqAmount) &&
            sum === Number(mcqAmount) &&
            numberOfModels &&
            (easyNumberQuestions ||
                mediumNumberQuestions ||
                hardNumberQuestions) &&
            arrayChapters.filter((ar) => ar != (undefined || "")).length > 0
        ) {
            console.log(numberOfModels, "777777777777777777777777777777");
            for (var i = 0; i < Number(numberOfModels); i++) {
                axios.post("/api/exam", request1).then((response) => {
                    console.log(i);
                    // if (i === Number(numberOfModels) - 1) {
                    if (response.data != true) {
                        alert(response.data);
                    }
                    if (response.data === true) {
                        setShowModels(true);
                    }
                    // }
                });
            }

            axios.patch(`/api/subjects/${subjectdetails.id}`, request2);

            axios
                .post(`/api/subjects/${subjectdetails.id}/exam`)
                .then((response) => {
                    setModelId(response.data);
                });

            /////////////////////////////////////////////
            // document.getElementById("nameForm").submit();
            ///////////////////////////////////

            // document.getElementById("nameForm").submit();
        } else {
            if (!url) {
                setUrlError("error");
            }
            if (!subject) {
                setSubjectError("error");
            }
            if (!duration) {
                setDurationError("error");
            }
            if (!questionType) {
                setQuestionTypeError("error");
            }
            if (!mcqAmount) {
                setMCQAmountError("error");
            }
            if (!datevalue) {
                setDateError("error");
            }
            if (!timevalue) {
                setTimeError("error");
            }
            if (!numberOfModels) {
                setNumberOfModelsError("error");
            }
            if (
                !easyNumberQuestions &&
                !mediumNumberQuestions &&
                !hardNumberQuestions
            ) {
                setDifficultyError("error");
            }
            if (
                arrayChapters.filter((ar) => ar != (undefined || "")).length ===
                0
            ) {
                setChaptersError("error");
            }
            if (
                Number(easyNumberQuestions) +
                    Number(mediumNumberQuestions) +
                    Number(hardNumberQuestions) !=
                Number(mcqAmount)
            ) {
                alert(
                    "Sum of Easy,Medium,Hard Questions Not Equal Number Of Questions Please Retry"
                );
            }
            if (sum != Number(mcqAmount)) {
                alert(
                    "Sum of Chapter Questions Not Equal Number Of Questions Please Retry"
                );
            }
        }
        /////////////////////////
        //////////////////////
    };
    ///////////////////////////// DATA WILL BE PASSED TO API
    const request1 = {
        subject: subject,

        examtype: questionType,
        mcqamount: mcqAmount,
        easynumberquestions: easyNumberQuestions,
        mediumnumberquestions: mediumNumberQuestions,
        hardnumberquestions: hardNumberQuestions,
        chaptersquestions: arrayChapters,
    };
    const request2 = {
        date: datevalue,
        time: timevalue,
        duration: duration,
        url: url,
    };
    ///////////////////////
    ////////////////////////
    //////////////////

    /* 6 deh ma3naha kam chapter 3andy */
    // console.log(arrayChapters);

    return (
        <>
            {!showModels && (
                <>
                    <div className="m-2">
                        <h1>Create Exam</h1>
                    </div>
                    <div className="me-5 ms-5 mt-5">
                        <form
                            onSubmit={handleSubmit}
                            id="nameForm"
                            action="/login"
                        >
                            {/*First Form-Slect */}
                            <div className="ms-5">
                                <div className="fs-5 fw-bold mb-2">
                                    Select Subject
                                </div>
                                <Select
                                    className={subjectError}
                                    options={options}
                                    placeholder={"eg:Math"}
                                    value={options.find(
                                        (obj) => obj.value === subject
                                    )}
                                    onChange={(e) => {
                                        axios.get(`api/examtemp`);
                                        setSubject(e.value),
                                            setSubjectError("");
                                        axios
                                            .post("/api/subjects", e)
                                            .then((response) => {
                                                setSubjectDetails(
                                                    response.data
                                                );
                                            });
                                    }}
                                />
                                {subjectError && (
                                    <div className="emptyfield">
                                        must enter feiled
                                    </div>
                                )}
                            </div>
                            {/*End First Form-Slect */}
                            <div className="ms-5 m-2">
                                <div className="fs-5 fw-bold mb-2">
                                    Enter Exam Duration
                                </div>
                                <div className="form-group mt-2">
                                    <input
                                        className={`form-control ${durationError}`}
                                        type="text"
                                        placeholder="eg: hh:mm:ss"
                                        aria-label="default input example"
                                        style={{ width: "101%" }}
                                        onChange={(e) => {
                                            setDuration(e.target.value),
                                                setDurationError(""),
                                                console.log(duration);
                                        }}
                                    />
                                    {durationError && (
                                        <div className="emptyfield">
                                            must enter feiled
                                        </div>
                                    )}
                                </div>
                            </div>
                            {/*End Form-Slect */}
                            {/*First Form-Slect */}
                            <div className="ms-5">
                                <div className="fs-5 fw-bold mb-2">
                                    Select Exam Type
                                </div>
                                <Select
                                    className={questionTypeError}
                                    options={[
                                        { value: "mcq", label: "MCQ" },
                                        { value: "written", label: "Written" },
                                    ]}
                                    value={options.find(
                                        (obj) => obj.value === questionType
                                    )}
                                    onChange={(e) => {
                                        setQuestionType(e.value),
                                            setQuestionTypeError(""),
                                            console.log(questionType);
                                    }}
                                    placeholder={"eg:MCQ"}
                                />
                                {questionTypeError && (
                                    <div className="emptyfield">
                                        must enter feiled
                                    </div>
                                )}
                            </div>
                            {/*End First Form-Slect */}

                            {/*End First Form-Slect */}
                            <div className="ms-5 m-2">
                                <div className="fs-5 fw-bold mb-2">
                                    Enter Number Of Questions
                                </div>
                                <div className="form-group mt-2">
                                    <input
                                        className={`form-control ${mcqAmountError}`}
                                        type="text"
                                        placeholder="eg: 20"
                                        aria-label="default input example"
                                        style={{ width: "101%" }}
                                        onChange={(e) => {
                                            setMCQAmount(e.target.value),
                                                setMCQAmountError("");
                                        }}
                                    />
                                    {mcqAmountError && (
                                        <div className="emptyfield">
                                            must enter feiled
                                        </div>
                                    )}
                                </div>
                            </div>
                            {/*End Form-Slect */}

                            <div className="ms-5">
                                <div className="fs-5 fw-bold mb-2">
                                    Enter Exam Start date and time
                                </div>
                                <div className="form-group mt-2 w-25 row">
                                    <div className="col">
                                        <DatePickerComponent
                                            id="datepicker"
                                            placeholder="Enter date"
                                            min={minDate}
                                            onChange={(e) => {
                                                handledate(e), setDateError("");
                                            }}
                                            format="yyyy-MM-dd"
                                        />
                                    </div>
                                    <div className="col">
                                        <TimePicker
                                            defaultValue={moment()}
                                            showSecond={false}
                                            onChange={(e) => {
                                                handletime(e), setTimeError("");
                                            }}
                                        ></TimePicker>
                                    </div>
                                    {(dateError || timeError) && (
                                        <div className="emptyfield">
                                            must enter empty feiled
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="ms-5">
                                <div className="fs-5 fw-bold mb-2">
                                    Enter amount of questions for each
                                    difficulty
                                </div>
                                <div className="form-group mt-2">
                                    <div className="float-start mt-1 me-3 fs-5">
                                        Easy
                                    </div>
                                    <input
                                        className="form-control float-start"
                                        type="text"
                                        placeholder="Enter Text Here"
                                        aria-label="default input example"
                                        style={{ width: "10%" }}
                                        onChange={(e) => {
                                            handleEasyNumberQuestions(e);
                                            setDifficultyError("");
                                        }}
                                    />
                                    <div className="float-start mt-1 mx-3 fs-5">
                                        Medium
                                    </div>
                                    <input
                                        className="form-control float-start mx-2"
                                        type="text"
                                        placeholder="Enter Text Here"
                                        aria-label="default input example"
                                        style={{ width: "10%" }}
                                        onChange={(e) => {
                                            handleMediumNumberQuestions(e);
                                            setDifficultyError("");
                                        }}
                                    />
                                    <div className="float-start mt-1 mx-3 fs-5">
                                        Hard
                                    </div>
                                    <input
                                        className="form-control "
                                        type="text"
                                        placeholder="Enter Text Here"
                                        aria-label="default input example"
                                        style={{ width: "10%" }}
                                        onChange={(e) => {
                                            handleHardNumberQuestions(e);
                                            setDifficultyError("");
                                        }}
                                    />
                                    {difficultyError && (
                                        <div className="emptyfield">
                                            must enter value in at least one
                                            difficult
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="ms-5">
                                {arrayChapters.length > 0 && (
                                    <>
                                        <div className="fs-5 fw-bold mb-2">
                                            Enter amount of questions for each
                                            chapter
                                        </div>
                                        <div className="row">
                                            {Array.from(
                                                Array(arrayChapters.length),
                                                (e, i) => {
                                                    console.log(
                                                        "===================================="
                                                    );
                                                    console.log(arrayChapters);
                                                    console.log(
                                                        "===================================="
                                                    );
                                                    return (
                                                        <div
                                                            key={i}
                                                            className="col-4"
                                                        >
                                                            <div className="d-inline me-5 fs-5 ">
                                                                Chapter
                                                                {
                                                                    subjectdetails
                                                                        .set_of_criteria[
                                                                        i
                                                                    ]
                                                                }
                                                            </div>
                                                            <input
                                                                className="form-control d-inline mx-2"
                                                                type="text"
                                                                placeholder="Enter Text Here"
                                                                aria-label="default input example"
                                                                style={{
                                                                    width: "30%",
                                                                }}
                                                                onChange={(
                                                                    e
                                                                ) => {
                                                                    handleChapter(
                                                                        e,
                                                                        i
                                                                    );
                                                                    setChaptersError(
                                                                        ""
                                                                    );
                                                                }}
                                                            />
                                                        </div>
                                                    );
                                                }
                                            )}
                                            {chaptersError && (
                                                <div className="emptyfield">
                                                    must enter value in at least
                                                    one chapter
                                                </div>
                                            )}
                                        </div>
                                    </>
                                )}
                            </div>
                            <div className="ms-5">
                                <div className="fs-5 fw-bold mb-2">
                                    Enter Number of different models
                                </div>
                                <input
                                    className={`form-control  ${numberOfModelsError}`}
                                    type="text"
                                    placeholder="Enter Text Here"
                                    aria-label="default input example"
                                    style={{ width: "95.5%" }}
                                    onChange={(e) => {
                                        setNumberOfModels(e.target.value),
                                            setNumberOfModelsError("");
                                    }}
                                />
                                {numberOfModelsError && (
                                    <div className="emptyfield">
                                        must enter feiled
                                    </div>
                                )}
                            </div>
                            <div className="ms-5">
                                <div className="fs-5 fw-bold mb-2">
                                    Enter Exam Session Video Call URL
                                </div>
                                <input
                                    className={`form-control  ${urlError}`}
                                    type="text"
                                    placeholder="Enter Text Here"
                                    aria-label="default input example"
                                    style={{ width: "95.5%" }}
                                    onChange={(e) => {
                                        setUrl(e.target.value), setUrlError("");
                                    }}
                                />
                                {urlError && (
                                    <div className="emptyfield">
                                        must enter feiled
                                    </div>
                                )}
                                <div>
                                    you can use any third party application or
                                    use our video call service by clicking
                                    <a
                                        target="_blank"
                                        href="http://localhost/b"
                                    >
                                        <span className="mx-3">HERE</span>
                                    </a>
                                    take the link and put it up ahead
                                </div>
                            </div>
                            <div
                                className="me-5 "
                                style={{
                                    display: "flex",
                                    justifyContent: "flex-end",
                                }}
                            >
                                <button
                                    type="submit"
                                    onClick={(e) => {
                                        console.log("subject");
                                    }}
                                    className="btn  px-5 pt-1 resizeLoginSubmitButton mt-3 mb-2"
                                    style={{
                                        borderRadius: "25px",
                                        fontSize: "25px",
                                        backgroundColor: "#3dbfb6",
                                        color: "white",
                                    }}
                                >
                                    Next
                                </button>
                            </div>
                        </form>
                    </div>
                </>
            )}
            {showModels && (
                <div className="row me-5 ms-5 mt-5">
                    {Array.from(Array(Number(numberOfModels)), (e, i) => {
                        return (
                            <div key={i} className="col-3">
                                <Link
                                    to={`/${username}/model${modelid[i]}`}
                                    // state="{jnj}" momken 2asta3melha 3ashan 2ab3at data ma3 el link
                                    //bas mesh 7atenfa3 ma3 target={"_blank"}
                                    style={{ all: "unset" }}
                                    target={"_blank"}
                                    href=""
                                >
                                    <button
                                        style={{
                                            width: "100%",
                                            all: "unset",
                                            marginBottom: "10px",
                                        }}
                                    >
                                        <h3 className="d-flex justify-content-center">
                                            Model{i + 1}
                                        </h3>
                                        <img
                                            src={ModelPreview}
                                            className={"model"}
                                            tabIndex="0"
                                            alt=""
                                        />
                                    </button>
                                </Link>
                            </div>
                        );
                    })}
                    <div
                        className="me-5 "
                        style={{
                            display: "flex",
                            justifyContent: "flex-end",
                            flexDirection: "column",
                            alignItems: "flex-end",
                        }}
                    >
                        <button
                            onClick={(e) => {
                                console.log(subjectdetails.id);
                                axios.get(
                                    `api/subjects/${subjectdetails.id}/examtemp`
                                );
                                window.location.reload();
                            }}
                            className="btn  px-5 pt-1 resizeLoginSubmitButton mt-3 mb-2"
                            style={{
                                borderRadius: "25px",
                                fontSize: "25px",
                                backgroundColor: "#3dbfb6",
                                color: "white",
                                width: "25%",
                            }}
                        >
                            Accept
                        </button>

                        <button
                            onClick={(e) => {
                                axios.get(`/api/examtemp`);
                                delay(500);
                                for (var i = 0; i < numberOfModels; i++) {
                                    console.log(numberOfModels);
                                    getexam();
                                }

                                axios
                                    .post(
                                        `/api/subjects/${subjectdetails.id}/exam`
                                    )
                                    .then((response) => {
                                        setModelId(response.data);
                                    });
                            }}
                            className="btn  px-5 pt-1 resizeLoginSubmitButton mt-3 mb-2"
                            style={{
                                borderRadius: "25px",
                                fontSize: "25px",
                                backgroundColor: "red",
                                color: "white",
                                width: "25%",
                            }}
                        >
                            Retry
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default CreateExamPage;
