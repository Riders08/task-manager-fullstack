function CompteurTask({listTasks}){
    return listTasks.filter(task => !task.done).length;
}

export default CompteurTask;