import { useEffect, useRef, useState } from 'react';

export function BugFilter({ filterBy, onSetFilterBy }) {
   const [filterByToEdit, setFilterByToEdit] = useState(filterBy);

   useEffect(() => {
      onSetFilterBy(filterByToEdit);
   }, [filterByToEdit]);

   function handleChange({ target }) {
      const { name: field, type } = target;
      let { value } = target;
      switch (type) {
         case 'number':
         case 'range':
            value = +value || '';
            break;
         case 'checkbox':
            value = target.checked;
            break;

         default:
            break;
      }
      setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }));
   }

   const { title, severity, description } = filterByToEdit;
   return (
      <section className="bug-filter">
         <h2>Filter</h2>
         <label htmlFor="title">Title:</label>
         <input value={title} type="text" name="title" id="title" onChange={handleChange} />
         <label htmlFor="severity">Severity:</label>
         <input value={severity} type="number" name="severity" id="severity" onChange={handleChange} />
         <label htmlFor="description">Description:</label>
         <input value={description} type="text" name="description" id="description" onChange={handleChange} />
      </section>
   );
}
