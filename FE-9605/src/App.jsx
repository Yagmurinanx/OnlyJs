import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import ListGroup from "react-bootstrap/ListGroup";
import styled from "styled-components";
import CustomModal from "./components/CustomModal";
import "./App.css";
import addIcon from "./assets/add.png"

const StyledInput = styled(FormControl)`
  border: 1px solid #ccc;
  padding: 8px;
  border-radius: 9px;
  width: calc(100% - 56px);

`;

const StyledButton = styled(Button)`
  background-color: transparent;
  color: white;
  border: none;
  border-color: blue;
  padding-left: 0px 0px;
  border-radius: 8px;
  cursor: pointer;

`;

const StyledListItem = styled(ListGroup.Item)`
  cursor: pointer;
  &:hover {
    background-color: #eee;
  }
`;

function App() {
  const [todoInput, setTodoInput] = useState("");
  const [todos, setTodos] = useState(() => {
    const storedTodos = localStorage.getItem("todos");
    return storedTodos ? JSON.parse(storedTodos) : [];
  });
  const [showModal, setShowModal] = useState(false);
  const [selectedTodoIndex, setSelectedTodoIndex] = useState(null);

  const handleCloseModal = () => setShowModal(false);

  const handleConfirmRemoveTodo = () => {
    const updatedTodos = [...todos];
    updatedTodos.splice(selectedTodoIndex, 1);
    setTodos(updatedTodos);
    setShowModal(false);
  };

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = (e) => {
    e.preventDefault();
    if (todoInput.trim() !== "") {
      setTodos([...todos, { text: todoInput, completed: false }]);
      setTodoInput("");
    }
  };

  const removeTodo = (index) => {
    setSelectedTodoIndex(index);
    setShowModal(true);
  };

  const toggleCompletion = (index) => {
    const updatedTodos = [...todos];
    updatedTodos[index].completed = !updatedTodos[index].completed;
    setTodos(updatedTodos);
  };

  return (
    <div className="container-bg">
    <Container className="innerContainer" >
      <h1 className="h1">Yapılacaklar Listesi</h1>
      <Form onSubmit={addTodo}>
        <InputGroup>
          <StyledInput
            type="text"
            placeholder="Hedef"
            value={todoInput}
            onChange={(e) => setTodoInput(e.target.value)}
          />
          <StyledButton type="submit"><img  src={addIcon} alt="Add Icon" width="40" height="40"/></StyledButton>
        </InputGroup>
      </Form>
      <ListGroup>
        {todos.map((todo, index) => (
          <StyledListItem
            key={index}
            onClick={() => toggleCompletion(index)}
            style={{ textDecoration: todo.completed ? "line-through" : "none" }}
            className="bg-transparent"
          >
            {todo.text}
            <Button
              onClick={(e) => {
                e.stopPropagation();
                removeTodo(index);
              }}
              className="delete-icon"
            >
             
            </Button>
          </StyledListItem>
        ))}
      </ListGroup>
      <CustomModal
        show={showModal}
        handleClose={handleCloseModal}
        handleConfirm={handleConfirmRemoveTodo}
      />
    </Container>
    </div>
  );
}

export default App;
