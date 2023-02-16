import React from "react"

const EmotionItem = ({emotion_id, emotion_img, emotion_descript, onClick, isSelected}) => {

    return(
        <div className={["emotionItem",
                        isSelected ? `emotionItem_on_${emotion_id}` : `emotionItem_off`,].join(" ")}
             onClick={() => onClick(emotion_id)}>
            <img src={emotion_img} alt="img" />
            <span>{emotion_descript}</span>
        </div>
    )
}

export default React.memo(EmotionItem)