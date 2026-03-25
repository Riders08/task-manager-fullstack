function ModificationTask({id, modification, setModification, taskModification}){
    return <div className="Modification">
        <p className="title_modif">Modifier la tâche : </p>
        <input type="text" className="modif_task" value={modification} onChange={(e) => setModification(e.target.value)}/>
        <button className="button_modif_task" type="button" onClick={() => taskModification(id)}> Modifier</button>
    </div>
}

export default ModificationTask;