import { useState } from "react";
import { TrailCard } from "./TrailCard"
import { useSelector } from "react-redux";
export const TrailsList = () => {

    const trails = useSelector(state => state.trails.trails);

    const [value, setValue] = useState();
    const [isFiltered, setIsFiltered] = useState(false);

    const searchDiv={padding:"1rem", padding:"12px", position:"sticky",top:"12vh"};
    
    return <>
        <div style={searchDiv}>
            <input style={{border:"none", boxShadow:"4px 4px 6px 0px #8080805c", padding:"5px", borderRadius:"0rem 5rem 5rem 0rem"}} type="text" placeholder="הכנס אתר לחיפוש" onChange={(e) => setValue(e.target.value)} />
            <button onClick={() => { setIsFiltered(!isFiltered) }} style={{borderRadius:"5rem 0rem 0rem 5rem", padding:"5px 10px", boxShadow:"4px 4px 6px 0px #8080805c", color:"white", backgroundColor:"#8c8c8c", border:"#8c8c8c solid 1px" }}>{isFiltered ? 'הצג הכל' : 'חפש'}</button>
        </div>
        <div id="allCardsDiv">
            {trails != null && <div className="grid">
                {isFiltered == false
                    ? trails.map((t, i) => <TrailCard key={"trail" + i} trail={t}></TrailCard>)
                    : trails.filter(t => t.name.includes(value)).map((t, i) => <TrailCard key={"trail" + i} trail={t}></TrailCard>)
                }
            </div>
            }
        </div>
    </>
}