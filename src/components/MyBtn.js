import '../App.css'

const MyBtn = ({text, type, onClick}) => {

  // 새로운 버튼이 멋대로 생길 수 있기 때문에 클래스-타입 명을 default로 줘야한다.
  // positive, negative 글자가 아니고 다른 글자가 오면, 디폴트가 기본값으로 간다.
  const btnType = ['positive', 'negative'].includes(type) ? type: 'default'; // eslint-disable-line no-unused-vars

  return(
    <div>
      <button className={["MyBtn", `MyBtn_${type}`].join(" ")} onClick={onClick}> {text} </button>
    </div>
  )
}

MyBtn.defaultProps = {
  type: "default",
}

export default MyBtn