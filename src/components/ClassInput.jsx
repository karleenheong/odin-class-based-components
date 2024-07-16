/* eslint-disable react/destructuring-assignment */
import { Component } from 'react';

class ClassInput extends Component {
  constructor(props) {
    super(props);

    const initialTodos = [{id: 0, task: 'Just some demo tasks', isEditing: false}, {id: 1, task: 'As an example', isEditing: false}];

    this.state = {
      todos: initialTodos,
      inputVal: '',
      inputValEdit: '',
      count: initialTodos.length,
    };
    
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleInputValEdit = this.handleInputValEdit.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleResubmit = this.handleResubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
  }

  handleInputChange(e) {
    this.setState((state) => ({
      ...state,
      inputVal: e.target.value,
    }));
  }

  handleInputValEdit(e) {
    this.setState((state) => ({
      ...state,
      inputValEdit: e.target.value,
    }));
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState((state) => ({
      todos: state.todos.concat({id: state.todos.length, task: state.inputVal, isEditing: false}),
      inputVal: '',
      count: this.state.count + 1,
    }));
  }

  handleResubmit(e, id) {
    e.preventDefault();
    this.setState((state) => ({
      todos: state.todos.map((todo) => (
        todo.id === id ? { ...todo, task: state.inputValEdit, isEditing: false} : todo)),
    }));
  }

  handleDelete(todoToDelete) {
    this.setState((state) => ({
      todos: state.todos.filter(todo => todo !== todoToDelete),
      count: this.state.count - 1,
    }));
  }

  handleEdit(todo) {
    this.setState((state) => ({
      inputValEdit: todo.task,
      todos: state.todos.map((t) => (
        t.id === todo.id ? { ...t, isEditing: true} : { ...t, isEditing: false}))
    }));
  }

  render() {
    return (
      <section>
        {/* eslint-disable-next-line react/prop-types */}
        <h3>{this.props.name}</h3>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="task-entry">Enter a task: </label>
          <input
            type="text"
            name="task-entry"
            value={this.state.inputVal}
            onChange={this.handleInputChange}
          />
          <button type="submit">Submit</button>
        </form>
        <h4>All the tasks!</h4>
        <h4>{this.state.count} tasks to complete</h4>
        <ul>
          {this.state.todos.map((todo) => (
            <div key={todo.id}>
              {todo.isEditing ? (
                <form onSubmit={(e) => this.handleResubmit(e, todo.id)}>
                  <input type="text" value={this.state.inputValEdit} onChange={this.handleInputValEdit}/>
                  <button type="submit">Resubmit</button>
                </form>
              ) : (
                <div className='todoDiv'>
                  <li key={todo.id}>{todo.task}</li>
                  <button onClick={() => this.handleEdit(todo)}>Edit</button>
                  <button onClick={() => this.handleDelete(todo)}>Delete</button>
                </div>
              )}
            </div>
          ))}
        </ul>
      </section>
    );
  }
}

export default ClassInput;
