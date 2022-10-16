import React, { useEffect, useState } from 'react';

function Category({ reqOption, setReqOption }) {
  const menu = [
    { id: 'all', txt: 'All' },
    { id: 'sim', txt: 'Simulation' },
    { id: 'rpq', txt: 'Rpq' },
    { id: 'act', txt: 'Action' },
    { id: 'bus', txt: 'Business' },
    { id: 'puz', txt: 'Puzzle' },
    { id: 'tip', txt: 'tips and know-how' },
    { id: 'rev', txt: 'Review' },
    { id: 'adv', txt: 'advance squad' }
  ];

  const [selected, setSelected] = useState(['all']);

  const onSetSearchOption = (e) => {
    const selectedValue = e.target.id;
    if (selectedValue === 'all') setSelected(['all']);
    else setSelected([...selected.filter((item) => item !== 'all'), e.target.id]);
  };

  useEffect(() => {
    setReqOption({ ...reqOption, category: selected });
  }, [selected]);

  return (
    <>
      {menu.map((item) => (
        <span
          style={{
            backgroundColor: selected.includes(item.id) && 'blue',
            marginRight: '0.5rem'
          }}
          key={item.id}
          id={item.id}
          onClick={onSetSearchOption}
          aria-hidden="true"
        >
          #{item.txt}
        </span>
      ))}
    </>
  );
}

export default Category;
