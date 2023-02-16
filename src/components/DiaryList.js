// 상단 컨트롤 메뉴

import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import DiaryItem from "./DiaryItem"
import MyBtn from "./MyBtn"

// value 컨트롤 메뉴가 랜더링하는 셀렉트가 어떤 걸 선택하고 있는지
// onch 셀렉트가 선택하는게 바뀌었을 때
// onthi 셀렉트 안에 들어가는 옵션

const sortOptionList = [
  {value: "latest", name: "최신순"},
  {value: "oldest", name: "오래된 순"},
]

const filterOptionList = [
  {value: "all", name: "전부"},
  {value: "good", name: "좋은 감정만"},
  {value: "bad", name: "안 좋은 감정만"},
]


// 리액트 메모라는 함수에 컴포넌트를 인자로 삼으면 강화되는 컴포넌트를 돌려주는 고차컴포넌트(컴포넌트 하나를 인자를 전달 받아서 강화된 컴포넌트를 돌려줌.)
const ControlMenu = React.memo(({value, onChange, optionList}) => {
  useEffect(()=>{
    console.log(ControlMenu)
  },[])
  return(
    <select className="ControlMenu" value={value} onChange={(e) =>
      onChange(e.target.value)
    }>
      {optionList.map((it, idx) => (
        <option key={idx} value={it.value}>{it.name}</option>
      ) )}
    </select>
  )
})

const DiaryList = ({ diaryList }) => {
  const navigate = useNavigate();

  const[sortType, setSortType] = useState('latest') //정렬 기준의 useState
  const[filter, setFilter] = useState('all') //감정 useState

  // 최신순, 오래된 순 클릭할 때 내용 변함
  const getProcessedDiaryList = () => {
    
    const filterCallBack = (item) => { //감정 번호에 따라 걸러주는 필터
      if(filter === 'good'){
        return parseInt(item.emotion) <= 3;
      } else {
        return parseInt(item.emotion) > 3;
      }
    };

    const compare = (a,b) => { // 비교함수
      if(sortType === 'latest') {
        return parseInt(b.date) - parseInt(a.date);
      } else {
        return parseInt(a.date) - parseInt(b.date);
      }
    }
    const copyList = JSON.parse(JSON.stringify(diaryList)) 
          //다이어리리스트를 넣으면 이 배열을 제이슨화 시켜서 문자열로 바꾼다. 문자열로 반환된 게 파슨으로 실행되서 다시 배열로 복구화된다. 그 후에 변수에 넣는다.
          // 원본배열이 문자열 -> 배열로 바뀌어서 값만 들어가기 때문에. 배열을 건드리지 않고 복사 붙여넣기 기능?
    const filteredList = filter === 'all' ? copyList : copyList.filter((it) => filterCallBack(it));
    const sortedList = filteredList.sort(compare);
    return sortedList
  }

  return(
    <div className="DiaryList">
      <div className="menu_wrapper">
        <div className="left_col">
          <ControlMenu value={sortType} onChange={setSortType} optionList={sortOptionList} />
          <ControlMenu value={filter} onChange={setFilter} optionList={filterOptionList} />
        </div>
        <div className="right_col">
          <MyBtn type={'positive'} text={'새 일기 쓰기'} onClick={() => navigate('/new')}/>
        </div>
      </div>

      {getProcessedDiaryList().map((it) => (
        <DiaryItem key={it.id} {...it} />
      ))}
    </div>

  )
}

DiaryList.defaultProps ={
  diaryList: [],
}

export default DiaryList