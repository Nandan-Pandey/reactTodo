import React from "react";
import "./App.css";

class App extends React.Component {
  constructor() {
    // console.log(props);
    super();
    this.state = {
      newItem:"",
      arrayOfList: [],
      editItem:"",
    };
  }
  //update()
  updateValue(e) {
    console.log(e);
    const { name, value } = e.target;
    this.setState({
      ...this.state,
      [name]:value,
    });
  }

  addItem(todovalue) {
    console.log("in addItem" + todovalue);
    if (todovalue !== "") {
      const newItemobj = {
        id: Date.now(),
        value: todovalue,
        isEdit: false,
      };
      const ArrayOfList = [...this.state.arrayOfList];
      ArrayOfList.push(newItemobj);
      this.setState({
        ...this.state,
        arrayOfList: ArrayOfList,
        newItem: "",
      });
    }
    console.log(this.state);
  }
  deleteItem(id) {
    const List = [...this.state.arrayOfList];
    const updateList = List.filter((item) => id !== item.id);
    this.setState({ ...this.state, arrayOfList: updateList });
  }
  EditItem(id) {
    let editvalues = "";
    const List = [...this.state.arrayOfList];
    for (let i = 0; i < List.length; i++) {
      //const List[i]=List[i];
      if (List[i].id === id) {
        List[i].isEdit = true;
        editvalues = List[i].value;
        break;
      }
    }
    this.setState({ ...this.state, arrayOfList: List, editItem: editvalues });
  }

  saveEdit(id) {
    const List = [...this.state.arrayOfList];
    for (let i = 0; i < List.length; i++) {
      //const List[i]=List[i];
      if (List[i].id === id) {
        List[i].value = this.state.editItem;
        List[i].isEdit = false;
        break;
      }
    }
    console.log(List);
    this.setState({ ...this.state, arrayOfList: List, editItem: "" });
  }

  render() {
    return (
      <div className="mainDiv">
        <h1>TODO USING REACT</h1>
        <div className="1childdiv">
          <table className="tableClass">
            <p>add an Items</p>

            <input
              className="inputFromWeb"
              value={this.state.newItem}
              placeholder="write what Todo"
              name="newItem"
              onInput={(e) => this.updateValue(e)}
            />

            <button
              className="summitting"
              onClick={() => this.addItem(this.state.newItem)}
            >
              submit
            </button>
          </table>
          <div className="List">
            <ul>
              {this.state.arrayOfList.map((item) => (
                <li key={item.id}>
                  {item.value}
                  <button onClick={() => this.deleteItem(item.id)}>
                    delete
                  </button>
                  <button onClick={() => this.EditItem(item.id)}>Edit</button>
                  {item.isEdit ? (
                    <div>

                      <input
                        value={this.state.editItem}
                        name="editItem"
                        onInput={(e) => this.updateValue(e)}
                      />


                      <button onClick={() => this.saveEdit(item.id)}>
                        save
                      </button>
                    </div>
                  ) : (
                    ""
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}
// function App() {
//   return " nandan";
// }

export default App;
