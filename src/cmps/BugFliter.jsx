import { useEffect, useRef, useState } from 'react';

const sortOptions = [
   ['--', null],
   ['severity', 'Severity'],
   ['title', 'Title'],
   // ['description', 'Description'],
];

export function BugFilter({ filterBy, onSetFilterBy, sortBy, onSetSortBy }) {
   const [filterByToEdit, setFilterByToEdit] = useState(filterBy);
   const [sortByToEdit, setSortByToEdit] = useState(sortBy);

   console.log(filterByToEdit);

   useEffect(() => {
      onSetFilterBy(filterByToEdit);
   }, [filterByToEdit]);

   useEffect(() => {
      onSetSortBy(sortByToEdit);
   }, [sortByToEdit]);

   function handleChange({ target }, stateField) {
      const { name: field, type } = target;
      console.log(field);
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

      switch (stateField) {
         case 'filterBy':
            setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }));
            break;
         case 'sortBy':
            onSetSortBy({ [field]: value });
            break;
      }
   }

   function changePage(num) {
      setFilterByToEdit((prevFilter) => ({ ...prevFilter, pageIdx: prevFilter.pageIdx + num }));
   }

   function chaneSortDir({ target }) {
      console.log(target.checked);
      setSortByToEdit((prevSort) => ({ ...prevSort, sortDir: target.checked ? -1 : 1 }));
   }

   const { title, severity, description, pageIdx } = filterByToEdit;
   const { sortField, sortDir } = sortByToEdit;
   return (
      <section className="bug-filter">
         <h2>Filter</h2>
         <label htmlFor="title">Title:</label>
         <input value={title} type="text" name="title" id="title" onChange={(ev) => handleChange(ev, 'filterBy')} />
         <label htmlFor="severity">Severity:</label>
         <input
            value={severity}
            type="number"
            name="severity"
            id="severity"
            onChange={(ev) => handleChange(ev, 'filterBy')}
         />
         <label htmlFor="description">Description:</label>
         <input
            value={description}
            type="text"
            name="description"
            id="description"
            onChange={(ev) => handleChange(ev, 'filterBy')}
         />
         <div className="page-picker">
            <button onClick={() => changePage(-1)} className="page-picker-btn">
               {'<'}
            </button>
            <span>{pageIdx + 1}</span>
            <button onClick={() => changePage(1)} className="page-picker-btn">
               {'>'}
            </button>
         </div>
         <div className="bug-sort">
            <select onChange={(ev) => handleChange(ev, 'sortBy')} name="sortBy" className="sort-field">
               {sortOptions.map((opt) => (
                  <option key={opt[0]} value={opt[0]}>
                     {opt[1]}
                  </option>
               ))}
            </select>
            <label htmlFor="sortDir">Descending?</label>
            <input name="sortDir" type="checkbox" onChange={chaneSortDir} />
         </div>
      </section>
   );
}
