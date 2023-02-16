import DiaryEditor from "../components/DiaryEditor"
import { useEffect } from "react"

const New = () => {

  useEffect(() => {
    const titleEle = document.getElementsByTagName("title")[0] // 문서객체에서 타이틀이라는 태그네임을 갖는 모든 엘리먼트를 다 가져와라! 배열로 반환된다.
    titleEle.innerText = `My Emotion diary - 새 일기`
  },[])

  return(
    <DiaryEditor />
  )
}

export default New