import { useParams, useNavigate } from "react-router-dom"
import { useContext, useEffect, useState } from "react";
import { DiaryStateContext } from "../App"
import { getStringDate } from "../util/date";
import MyHeader from "../components/MyHeader";
import MyBtn from "../components/MyBtn";
import { emotionList } from "../util/emotion";

const Diary = () => {
  const [data, setData] = useState()

  const {id} = useParams();
  const navigate = useNavigate();

  const diaryList = useContext(DiaryStateContext)

  useEffect(() => {
    const titleEle = document.getElementsByTagName("title")[0] // 문서객체에서 타이틀이라는 태그네임을 갖는 모든 엘리먼트를 다 가져와라! 배열로 반환된다.
    titleEle.innerText = `My Emotion diary - ${id}번 일기`
  },[])

  useEffect(() => {
    if(diaryList.length >= 1) {
      const targetDiary = diaryList.find((it) => parseInt(it.id) === parseInt(id))
      if(targetDiary) {
        setData(targetDiary)
      }else {
         alert('없는 일기입니다.')
         navigate("/", { replace: true });
      }
    }
  },[id, diaryList])

  if(!data) {
    return <div className="DiaryPage">로딩중입니다!</div>
  } else {

    const curEmotionData = emotionList.find((it) => parseInt(it.emotion_id) === parseInt(data.emotion))
    console.log(curEmotionData)
    return (
      <div className="DiaryPage">
        <MyHeader headText={`${getStringDate(new Date(data.date))}의 기록`}
                  leftChild={<MyBtn text={'뒤로가기'} onClick={()=>navigate(-1)}/>}
                  rightChild={<MyBtn text={'수정하기'} onClick={()=>navigate(`/edit/${data.id}`)}/>}
        />
        <article>
          <section>
            <h3>오늘의 감정</h3>
            <div className={[
              "diary_img_wrapper", `diary_img_wrapper_${data.emotion}` 
            ].join(" ")}>
              <img src = {curEmotionData.emotion_img} alt="img" />
              <div className="emotion_descript">{curEmotionData.emotion_descript}</div>
            </div>
          </section>
          <section>
            <h3>오늘의 일기</h3>
            <div className="diary_content_wrapper">
              <p>{data.content}</p>
            </div>
          </section>
        </article>
      </div>
    )
  }
}

export default Diary