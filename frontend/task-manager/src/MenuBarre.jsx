import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faBorderAll, faSquareCheck, faListCheck, faTriangleExclamation, faHourglassHalf } from "@fortawesome/free-solid-svg-icons";
function MenuBarre({filtered, setFiltered}){
    return (
        <div className="menu">
            <span className={filtered === "all" ? "all element-barre" : "element-barre"} onClick={() => setFiltered("all")}><FontAwesomeIcon icon={faBorderAll} />Toutes les tâches</span>
            <span className={filtered === "myTask" ? "myTask element-barre" : "element-barre"} onClick={() => setFiltered("late")}><FontAwesomeIcon icon={faListCheck} />Mes tâches</span>
            <span className={filtered === "late" ? "late element-barre" : "element-barre"} onClick={() => setFiltered("late")}><FontAwesomeIcon icon={faTriangleExclamation} />Tâches en retard</span>
            <span className={filtered === "todo" ? "todo element-barre" : "element-barre"} onClick={() => setFiltered("todo")}><FontAwesomeIcon icon={faHourglassHalf} />Tâches à faire</span>
            <span className={filtered === "done" ? "done element-barre" : "element-barre"} onClick={() => setFiltered("done")}><FontAwesomeIcon icon={faSquareCheck} />Tâches finies</span>
            <span className="element-barre element-barre-connection"><FontAwesomeIcon icon={faUser} /></span>
        </div>
    )
}

export default MenuBarre;