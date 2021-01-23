import React, { useState } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors }) => {
  console.log(colors);
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  const [adding, setAdding] = useState(false);
  const [newColor, setNewColor] = useState(initialColor);

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = e => {
    e.preventDefault();
    console.log('id', colorToEdit.id);
    console.log(colorToEdit);
    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is is saved right now?
    axiosWithAuth().put(`/colors/${colorToEdit.id}`, colorToEdit)
      .then(res => {
        console.log(res);
        axiosWithAuth().get('/colors')
        .then(res => {
          const colorsArr = res.data;
          updateColors(colorsArr);
        })
        .catch(err => console.log(err))
      })
      .catch(err => console.log(err))
  };

  const deleteColor = color => {
    // make a delete request to delete this color
    axiosWithAuth().delete(`/colors/${color.id}`)
      .then(res => {
        console.log(res);
        axiosWithAuth().get('/colors')
        .then(res => {
          const colorsArr = res.data;
          updateColors(colorsArr);
        })
        .catch(err => console.log(err))
      })
      .catch(err => console.log(err))
  };

  const handleNewColorChange = (e) => {
    setNewColor({
      ...newColor,
      [e.target.name]: e.target.value
    })
  }
  const addColor = e => {
    e.preventDefault();
    console.log(newColor);
    axiosWithAuth().post('/colors', newColor)
      .then(res => {
        console.log(res);
        const colorsArr = res.data;
        updateColors(colorsArr);
        setNewColor(initialColor);
      })
      .catch(err => console.log(err))
  };

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <button onClick={() => setAdding(true)}>Add a Color</button>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={e => {
                    e.stopPropagation();
                    deleteColor(color)
                  }
                }>
                  x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      {/* stretch - build another form here to add a color */}
      {console.log(adding)}
      {adding && (
        <form onSubmit={addColor}>
          <legend>add a color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setNewColor({
                  ...newColor,
                  color: e.target.value 
                })}
              value={newColor.color}
              required
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setNewColor({
                  ...newColor,
                  code: { hex: e.target.value }
                })
              }
              value={newColor.code.hex}
              required
            />
          </label>
          <div className="button-row">
            <button type="submit">add</button>
            <button onClick={() => setAdding(false)}>done</button>
          </div>
        </form>
      )}
        <div className="spacer" />
    </div>
  );
};

export default ColorList;
