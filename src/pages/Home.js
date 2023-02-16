import { useContext, useEffect, useState } from "react"
import { DiaryStateContext } from "../App"

import MyHeader from "../components/MyHeader"
import MyBtn from "../components/MyBtn"
import DiaryList from "../components/DiaryList"


const Home = () => {

  const diaryList = useContext(DiaryStateContext) // dummy data 공급! 상태관리

  const [data, setData] = useState([]) // curdata에 따라 가공해서 useState로 관리한다
  const [curDate, setCurDate] = useState(new Date()) //날짜 저장하는 state가 필요하다
  const headText = `${curDate.getFullYear()}년 ${curDate.getMonth()+1}월` //getMonth는 0~11월까지 있다. 그래서 +1 해준다.

  useEffect(() => {
    const titleEle = document.getElementsByTagName("title")[0] // 문서객체에서 타이틀이라는 태그네임을 갖는 모든 엘리먼트를 다 가져와라! 배열로 반환된다.
    titleEle.innerText = `My Emotion diary`
  },[])

  useEffect(() => {
      if(diaryList.length >= 1) {
        const firstDay = new Date(
          curDate.getFullYear(),
          curDate.getMonth(),
          1
        ).getTime(); //달의 첫번째 날이 나온다
    
        const lastDay = new Date(
          curDate.getFullYear(),
          curDate.getMonth() +1,
          0,
          23,
          59,
          59
        ).getTime(); //달의 마지막 날이 나온다
    
        setData(diaryList.filter((it) => firstDay <= it.date && it.date <= lastDay))
      }
  },[diaryList,curDate])

  useEffect(() => {
    console.log(data)
  },[data])

  const increaseMonth = () => {
    setCurDate(new Date(curDate.getFullYear(), curDate.getMonth()+1, curDate.getDate()))
  }
  const decreaseMonth = () => {
    setCurDate(new Date(curDate.getFullYear(), curDate.getMonth()-1, curDate.getDate()))
  }

  return(
    <div> 
      <MyHeader headText={headText}
                leftChild ={<MyBtn text={"이전"} onClick={decreaseMonth}/>}
                rightChild={<MyBtn text={"다음"} onClick={increaseMonth}/>}/>
      <DiaryList diaryList={data}/>           
    </div>
  )
}

export default Home