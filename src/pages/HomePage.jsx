import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  patchTodos,
  postTodos,
  deleteTodos,
  fetchTodos,
} from "../features/todosSlice";

import { Link } from "react-router-dom";

function HomePage() {
  const todos = useSelector((state) => state.todosReducer.todos);
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.todosReducer.loading);

  const token = useSelector((state) => state.userReducer.token);

  const [text, setText] = useState("");

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  const handleAd = (id, bl, token) => {
    dispatch(patchTodos({ id, bl, token }));
    console.log(token);
  };

  const handleDel = (id, token) => {
    dispatch(deleteTodos({ id, token }));
  };

  const handleText = (e) => {
    setText(e.target.value);
  };
  const handlePost = (text, token) => {
    dispatch(postTodos({ text, token }));
    setText("");
  };

  return (
    <div className="forLogin">
      <div className="App">
        <div className="form">
          <input type="text" onChange={handleText} value={text} />
          <input
            type="button"
            onClick={() => handlePost(text, token)}
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
                  <button onClick={() => handleAd(item._id, item.bl, token)}>
                    ✅
                  </button>
                  <h1 className="textTodo">{item.text}</h1>
                  <button onClick={() => handleDel(item._id, token)}>❌</button>
                </div>
              );
            })
          ) : (
            <span>Загрузка...</span>
          )}
        </div>
      </div>

      <div className="forRegister">
        <Link to="/signIn" className="login">
          Вход
        </Link>
        <Link to="/signUp" className="register">
          Регистрация
        </Link>
      </div>
    </div>
  );
}

export default HomePage;
