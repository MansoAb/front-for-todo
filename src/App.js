import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  patchTodos,
  postTodos,
  deleteTodos,
  fetchTodos,
} from "./features/todosSlice";

function App() {
  const todos = useSelector((state) => state.todos);
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.loading);

  const [text, setText] = useState("");

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  const handleAd = (id, bl) => {
    dispatch(patchTodos({ id, bl }));
  };

  const handleDel = (id) => {
    dispatch(deleteTodos(id));
  };

  const handleText = (e) => {
    setText(e.target.value);
  };
  const handlePost = (text) => {
    dispatch(postTodos(text));
    setText("");
  };

  return (
    <div className="App">
      <div className="form">
        <input type="text" onChange={handleText} value={text} />
        <input
          type="button"
          onClick={() => handlePost(text)}
          value="добавить"
        />
      </div>

      <div className="todos">
        {loading ? (
          todos.map((item, index) => {
            return (
              <div
                key={item.id}
                className={`todoBlock ${item.bl ? "added" : null}`}
              >
                <button onClick={() => handleAd(item._id, item.bl)}>✅</button>
                <h1 className="textTodo">{item.text}</h1>
                <button onClick={() => handleDel(item._id)}>❌</button>
              </div>
            );
          })
        ) : (
          <span>Загрузка...</span>
        )}
      </div>
    </div>
  );
}

export default App;
