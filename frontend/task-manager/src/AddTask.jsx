function AddTask({input, setInput, addTask}){
  return <div className="menu_barre">
            <input type="text" className="new_task" value={input} onChange={(e) => setInput(e.target.value)} />
            <button className="button_new_task" type="button" onClick={addTask}> Ajouter </button>
         </div>
}

export default AddTask;