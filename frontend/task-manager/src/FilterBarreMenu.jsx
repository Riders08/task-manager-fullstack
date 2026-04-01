function FilterBarreMenu({filtered, setFiltered}){
    return  <div className="menu_barre_filter">
                <button className={filtered === "all" ? "all filter" : "filter"} onClick={() => setFiltered("all")}> Toutes les tâches </button>
                <button className={filtered === "done" ? "done filter" : "filter"} onClick={() => setFiltered("done")}> Tâches finies </button>
                <button className={filtered === "todo" ? "todo filter" : "filter"} onClick={() => setFiltered("todo")}> Tâches non finies </button>
                <button className={filtered === "late" ? "late filter" : "filter"} onClick={() => setFiltered("late")}> Tâches urgente </button>
                <button className={filtered === "isTime" ? "isTime filter" : "filter"} onClick={() => setFiltered("isTime")}> Tâches à réaliser avant la deadline </button>
                <button className={filtered === "late_todo" ? "late_todo filter" : "filter"} onClick={() => setFiltered("late_todo")}> Tâches qui n'ont pas été fais a temps </button>
                <button className={filtered === "finish" ? "finish filter" : "filter"} onClick={() => setFiltered("finish")}> Tâches qui ont été faites a l'heure </button>
        
            </div>
}

export default FilterBarreMenu;