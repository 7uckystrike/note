import { useNavigate, useParams } from "react-router-dom"
import { useContext, useEffect, useState } from "react";
import { DiaryStateContext } from "../App"
import DiaryEditor from "../components/DiaryEditor";

const Edit = () => {
  const {id} = useParams();
  const navigate = useNavigate();
  const [originData, setOriginData] = useState()

  const diaryList = useContext(DiaryStateContext)

  useEffect(() => {
    const titleEle = document.getElementsByTagName("title")[0] // 문서객체에서 타이틀이라는 태그네임을 갖는 모든 엘리먼트를 다 가져와라! 배열로 반환된다.
    titleEle.innerText = `My Emotion diary - ${id}번 일기 수정` 
  },[])

  useEffect(() => {
    if(diaryList.length >= 1) {
      const targetDiary = diaryList.find((it) => parseInt(it.id) === parseInt(id))
      if(targetDiary) {
        setOriginData(targetDiary)
      }else {
         alert('없는 일기입니다.')
         navigate("/", { replace: true });
      }
    }
  },[id, diaryList])

  return(
    <div>
      {originData && <DiaryEditor isEdit={true} originData={originData} />}
    </div>
  )
}

export default Edit