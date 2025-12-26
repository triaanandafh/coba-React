// single selection
// multiple selection
import { useState } from "react";
import data from "./data"
// import Style from "./style"

export default function Accordian(){
    const [selected, setSelected] = useState(null);

    function handleSingleSelection(getCurrentid){
        // console.log(getCurrentid);
        setSelected(getCurrentid === selected ? null : getCurrentid);
    }
    console.log(selected)

    return <div className="wrapper">
        <div className="accordian">
            {data && data.length > 0 ? (
                data.map((dataItem) => (
                    <div className="item">
                        <div className="title" onClick={()=>handleSingleSelection(dataItem.id)}>
                            <h3>{dataItem.question}</h3>
                            {/* <p>{dataItem.answer}</p> */}
                            <span>+</span>
                        </div>
                        {selected === dataItem.id ? (
                            <div className="content">{dataItem.answer}</div>
                        ) : null}
                    </div>
                ))
            ) : (
                <div className="">No data found!</div>
            )}
        </div>
    </div>
}