import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom"
import EmotionItem from "./EmotionItem";
import { DiaryDispatchContext } from '../App.js'
import { emotionList } from "../util/emotion";

import { getStringDate } from "../util/date";

import MyBtn from "./MyBtn"
import MyHeader from "./MyHeader"

const DiaryEditor = ({ isEdit, originData }) => {
    const contentRef = useRef(); 
    const {onCreate, onEdit, onRemove} = useContext(DiaryDispatchContext)

    const [date, setDate] = useState(getStringDate(new Date()));
    const [emotion, setEmotion] = useState(3);
    const [content, setContent] = useState("");

  
    const handleClickEmote = useCallback((emotion) => {
        setEmotion(emotion) 
    }, [])

    const handleSubmit = () => {
        if(content.length <1) {
            contentRef.current.focus();
            return;
        }

        if(window.confirm(isEdit ? "일기를 수정하시겠습니까?" : "새로운 일기를 작성하시겠습니까?")) {
          if(!isEdit) {
            onCreate(date, content, emotion);
          } else {
            onEdit(originData.id, date, content, emotion)
          }
        }

        navigate('/', {replace: true})    
    }

    const handleRemove = () => {
      if(window.confirm('정말 삭제하시겠습니까?')) {
        onRemove(originData.id)
        navigate('/', {replace:true})
      }
    }

    const navigate = useNavigate();

    useEffect(() => {
      if(isEdit) {
        setDate(getStringDate(new Date(parseInt(originData.date))));
        setEmotion(originData.emotion);
        setContent(originData.content);
      }
    },[isEdit, originData])

    return (
        <div className="DiaryEditor">
          <MyHeader headText={isEdit ? "일기 수정하기" : "새 일기 쓰기"} 
                    leftChild={<MyBtn text={"뒤로가기"} onClick={() => navigate(-1)} />} 
                    rightChild={ isEdit && (<MyBtn text={"삭제하기"} type={"negative"} onClick={handleRemove}/>)} 
          />
          <section>
            <h3>오늘의 날짜</h3>
            <div className="input_box">
                <input type="date" 
                    onChange={(e) => {setDate(e.target.value)}} 
                    value={date}
                    className="input_date"
                    />
            </div>
          </section>
          <section>
            <h3>오늘의 감정</h3>
            <div className="input_box emoiton_list_wrapper">
                {emotionList.map((it) => (
                    <EmotionItem key={it.emotion_id} 
                                     {...it}
                                 onClick={handleClickEmote}
                                 isSelected={it.emotion_id === emotion} />
                ))}
            </div>
          </section>
          <section>
            <h3>오늘의 일기</h3>
            <div className="input_box text_wrapper">
                <textarea 
                    placeholder="오늘은 어땠나요?"
                    ref={contentRef} 
                    value={content} 
                    onChange={(e) => setContent(e.target.value)}/>  
            </div>
        </section>
        <section>
            <div className="control_box">
                <MyBtn text={'취소하기'} onClick={() => navigate(-1)}/>
                <MyBtn text={'등록하기'} type={'positive'} onClick={handleSubmit}/>
            </div>
        </section>
    </div>
    )
}

export default DiaryEditor