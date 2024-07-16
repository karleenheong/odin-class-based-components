import { useState } from 'react';

// eslint-disable-next-line react/function-component-definition, react/prop-types
const FunctionalInput = ({ name }) => {

  const [todos, setTodos] = useState([
    {id: 0, task: 'Just some demo tasks', isEditing: false},
    {id: 1, task: 'As an example', isEditing: false}
  ]);

  const [inputVal, setInputVal] = useState('');
  const [inputValEdit, setInputValEdit] = useState('');
  const [count, setCount] = useState(todos.length);

  const handleInputChange = (e) => {
    setInputVal(e.target.value);
  };

  const handleInputValEdit = (e) => {
    setInputValEdit(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setTodos((todo) => [...todo, inputVal]);
    setTodos([...todos, { task: inputVal, id: todos.length, isEditing: false}]);
    setInputVal('');
    setCount(count + 1);
  };

  const handleResubmit = (e, id) => {
    e.preventDefault();
    setTodos(todos.map((todo) => (
      todo.id === id ? { ...todo, task: inputValEdit, isEditing: false} : todo
    )))
  }

  const handleDelete = (todoToDelete) => {
    setTodos(todos.filter(todo => todo !== todoToDelete));
    setCount(count - 1);
  }

  const handleEdit = (todo) => {
    setInputValEdit(todo.task);
    setTodos(todos.map((t) => (
      t.id === todo.id ? { ...t, isEditing: true} : { ...t, isEditing: false}
    )));
  }

  return (
    <section>
      <h3>{name}</h3>
      <form onSubmit={handleSubmit}>
        <label htmlFor="task-entry">Enter a task: </label>
        <input
          type="text"
          name="task-entry"
          value={inputVal}
          onChange={handleInputChange}
        />
        <button type="submit">Submit</button>
      </form>
      <h4>All the tasks!</h4>
      <h4>{count} tasks to complete</h4>
      <ul>
        {todos.map((todo) => (
          <div key={todo.id}>
            {todo.isEditing ? (
              <form onSubmit={(e) => handleResubmit(e, todo.id)}>
                <input type="text" value={inputValEdit} onChange={handleInputValEdit}/>
                <button type="submit">Resubmit</button>
              </form>
            ) : (
              <div className='todoDiv'>
                <li key={todo.id}>{todo.task}</li>
                <button onClick={() => handleEdit(todo)
                }>Edit</button>
                <button onClick={() => handleDelete(todo)}>Delete</button>
              </div>
            )}
          </div>
        ))}
      </ul>
    </section>
  );
};

export default FunctionalInput;
