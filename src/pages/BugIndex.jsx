import { bugService } from '../services/bug.service.js';
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js';
import { BugList } from '../cmps/BugList.jsx';
import { useState } from 'react';
import { useEffect } from 'react';
import { BugFilter } from '../cmps/BugFliter.jsx';

export function BugIndex() {
   const [bugs, setBugs] = useState([]);
   const [filterBy, setFilterBy] = useState({});

   useEffect(() => {
      loadBugs();
   }, []);

   function onSetFilterBy(newFilter) {
      setFilterBy((prevFilter) => ({ ...prevFilter, ...newFilter }));
   }

   async function loadBugs() {
      const bugs = await bugService.query(filterBy);
      setBugs(bugs);
   }

   async function onRemoveBug(bugId) {
      try {
         await bugService.remove(bugId);
         console.log('Deleted Succesfully!');
         setBugs((prevBugs) => prevBugs.filter((bug) => bug._id !== bugId));
         showSuccessMsg('Bug removed');
      } catch (err) {
         console.log('Error from onRemoveBug ->', err);
         showErrorMsg('Cannot remove bug');
      }
   }

   async function onAddBug() {
      const bug = {
         title: prompt('Bug title?'),
         severity: +prompt('Bug severity?'),
         description: prompt('Description:'),
      };
      try {
         const savedBug = await bugService.save(bug);
         console.log('Added Bug', savedBug);
         setBugs((prevBugs) => [...prevBugs, savedBug]);
         showSuccessMsg('Bug added');
      } catch (err) {
         console.log('Error from onAddBug ->', err);
         showErrorMsg('Cannot add bug');
      }
   }

   async function onEditBug(bug) {
      const severity = +prompt('New severity?');
      const description = prompt('Update Description:', bug.description);
      const bugToSave = { ...bug, severity, description };
      try {
         const savedBug = await bugService.save(bugToSave);
         console.log('Updated Bug:', savedBug);
         setBugs((prevBugs) => prevBugs.map((currBug) => (currBug._id === savedBug._id ? savedBug : currBug)));
         showSuccessMsg('Bug updated');
      } catch (err) {
         console.log('Error from onEditBug ->', err);
         showErrorMsg('Cannot update bug');
      }
   }

   return (
      <section>
         <h3>Bugs App</h3>
         <main>
            <BugFilter filterBy={filterBy} onSetFilterBy={onSetFilterBy} />
            <button onClick={onAddBug}>Add Bug ⛐</button>
            <BugList bugs={bugs} onRemoveBug={onRemoveBug} onEditBug={onEditBug} />
         </main>
      </section>
   );
}
