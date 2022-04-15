import React from 'react';
import Base from '../core/Base';
import logo from '../logo.svg';

class TaskManager extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      newItem: "",
      list: []
    }
  }

  addItem(todoValue){
    if (todoValue !== "") {
      const newItem = {
        id: Date.now(),
        value: todoValue,
        isDone: false
      };
      const list = [...this.state.list];
      list.push(newItem);

      this.setState({
        list,
        newItem: ""
      });
    }
  }

  deleteItem(id){
    const list = [...this.state.list];
    const updatedlist = list.filter(item => item.id !== id);
    this.setState({list: updatedlist})
  }

  updateInput(input){
    this.setState({newItem: input});
  }

  render() {
    return (
      <Base title="Task Manager"
      description="Add your tasks here"
      className="container bg-light p-4">
      <div className="col-6 ">
        <img src={logo} width="100" height="100" className="logo" />
        <h1 className="app-title">Task Manager</h1>
        <div className="container">
          Add your tasks
          <br />
          <input 
           type="text" 
           className="input-text" 
           placeholder="Add task"
           required
           value = {this.state.newItem}
           onChange = {e=> this.updateInput(e.target.value)}
           />
          <button 
           className="add-btn btn btn-success"
           onClick ={() => this.addItem(this.state.newItem)}
           disabled={!this.state.newItem.length}
           >Add Task</button>
          <div className="list">
              <br />
            <ul>
              {this.state.list.map(item => {
                return(
                  <li key={item.id}>
                    <span className="btn btn-lg btn-secondary col-10">
                    <input
                    type="checkbox"
                    name="idDone"
                    checked={item.isDone}
                    onChange ={() =>{}}
                    />
                    {item.value}
                    </span>  
                    <button 
                    className="btn btn-danger btn-lg col-2"
                    onClick = {() => this.deleteItem(item.id)}
                    >Delete</button>
                  </li> 
                );
              })}
            </ul>
          </div>
        </div>
      </div>
      </Base>  
    );
  }
}

export default TaskManager;