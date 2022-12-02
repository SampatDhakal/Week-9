import React, { useState, useEffect } from "react";
import Footer from "./Footer";
import Header from "./Header";
import Note from "./Note";
import CreateArea from "./CreateArea";
import axios from "axios";

export default function App() {
  const [notesArray, setNotesArray] = useState([]);
  const [update, setUpdate] = useState(false);
  const [selectedNote, setSelectedNote] = useState({
    id: null,
    title: null,
    content: null,
  });

  useEffect(() => {
    getNotes();
  }, []);

  async function getNotes() {
    try {
      const res = await axios.get("http://localhost:8000/api");
      setNotesArray(res.data);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <Header />
      <CreateArea
        // onAdd={addNote}
        getNotes={() => getNotes()}
        update={update}
        setUpdate={(data) => setUpdate(data)}
        selectedNote={selectedNote}
        setSelectedNote={(d) => setSelectedNote(d)}
      />
      {notesArray.map((data, index) => (
        <Note
          id={data._id}
          key={index}
          title={data.title}
          content={data.content}
          getNotes={() => getNotes()}
          update={update}
          setUpdate={(data) => setUpdate(data)}
          setSelectedNote={(data) => setSelectedNote(data)}
          // onDelete={deletes}
        />
      ))}
      <Footer />
    </>
  );
}
