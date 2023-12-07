// Importing useEffect
import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
// Importing the backend (main.mo)
import { dkeeper_backend } from "../../../declarations/dkeeper_backend";

function App() {
  const [notes, setNotes] = useState([]);

  function addNote(newNote) {
    setNotes(prevNotes => {
      // Calling createNote function from the backend.
      dkeeper_backend.createNote(newNote.title, newNote.content);
      return [newNote, ...prevNotes];
    });
  }

  // This functions triggers whenever the App component get rendered.
  // 1st param is a function that should be called whenever re-rendering happens.
  // 2nd param is an array where we can specify a particular prop or variable
  // which it checks if it's changed before it triggers the functions in useEffect.
  useEffect(() => {
    console.log("useEffect is triggered");
    // fetchData has to be asynchronous and useEffect can't really be turned
    // into an asyschronous function itself.
    fetchData();
  // 2nd param is an empty array so that it stops once the 1st param has completed once.
  }, []);

  async function fetchData() {
    // Fetch data from the backend which is readNote which returns an array.
    // We put await so we wait the return data from backend until we receive it then we'll continue.
    const notesArray = await dkeeper_backend.readNotes();

    // Update the state of notes array
    setNotes(notesArray);
  }

  function deleteNote(id) {
    dkeeper_backend.removeNote(id);
    setNotes(prevNotes => {
      return prevNotes.filter((noteItem, index) => {
        return index !== id;
      });
    });
  }

  return (
    <div>
      <Header />
      <CreateArea onAdd={addNote} />
      {notes.map((noteItem, index) => {
        return (
          <Note
            key={index}
            id={index}
            title={noteItem.title}
            content={noteItem.content}
            onDelete={deleteNote}
          />
        );
      })}
      <Footer />
    </div>
  );
}

export default App;
