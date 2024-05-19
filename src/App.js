import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [modules, setModules] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const createModule = (moduleName) => {
    const newModule = { id: modules.length, content: moduleName };
    setModules([...modules, newModule]);
  };

  const editModule = (moduleId, updatedContent) => {
    const updatedModules = modules.map((module) =>
      module.id === moduleId ? { ...module, content: updatedContent } : module
    );
    setModules(updatedModules);
  };

  const deleteModule = (moduleId) => {
    const updatedModules = modules.filter((module) => module.id !== moduleId);
    setModules(updatedModules);
  };

  const handleFileChange = (e) => {
    const files = e.target.files;
    if (!files.length) return;

    for (const file of files) {
      console.log(`File uploaded: ${file.name}`);
      createModule(file.name);
    }
  };

  const addLinkModule = (link) => {
    const newModule = {
      id: modules.length,
      content: <a href={link} target="_blank" rel="noopener noreferrer">Link</a>,
    };
    setModules([...modules, newModule]);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div>
      <button className="add-button" type="button" onClick={toggleDropdown}>
        Add
      </button>
      {isDropdownOpen && (
        <div className="dropdown">
          <button onClick={() => createModule(prompt('Enter module name'))} type="button">
            Create Module
          </button>
          <input type="file" onChange={handleFileChange} multiple />
          <button onClick={() => addLinkModule(prompt('Enter link URL'))} type="button">
            Add Link
          </button>
        </div>
      )}

      {modules.map((module) => (
        <div key={module.id}>
          {module.content}
          <button onClick={() => editModule(module.id, prompt('Enter updated content'))} type="button">
            Edit
          </button>
          <button onClick={() => deleteModule(module.id)} type="button">
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default App;