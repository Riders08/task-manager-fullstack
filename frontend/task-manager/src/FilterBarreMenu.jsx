function FilterBarreMenu({filtered, setFiltered}){
    return  <div className="menu_barre_filter">
             <button className={filtered === "all" ? "all filter" : "filter"} onClick={() => setFiltered("all")}> Toutes les tâches </button>
             <button className={filtered === "done" ? "done filter" : "filter"} onClick={() => setFiltered("done")}> Tâches finies </button>
             <button className={filtered === "todo" ? "todo filter" : "filter"} onClick={() => setFiltered("todo")}> Tâches non finies </button>
            </div>
}

export default FilterBarreMenu;