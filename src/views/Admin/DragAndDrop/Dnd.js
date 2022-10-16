import React, { useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import DndColumn from './DndColumn';
import 'views/Admin/DragAndDrop/Dnd.scss';
import DndBoardGroup from './DndBoardGroup';

const Dnd = () => {
  const [boardGroups, setBoardGroups] = useState([
    {
      id: 'boardGroup1',
      name: 'group1',
      boards: [
        { id: 'board101', name: 'board 101' },
        { id: 'board102', name: 'board 102' },
        { id: 'board103', name: 'board 103' }
      ],
      expanded: false
    },
    {
      id: 'boardGroup2',
      name: 'group2',
      boards: [
        { id: 'board201', name: 'board 201' },
        { id: 'board202', name: 'board 202' },
        { id: 'board203', name: 'board 203' }
      ],
      expanded: false
    },
    {
      id: 'boardGroup3',
      name: 'group3',
      boards: [
        { id: 'board301', name: 'board 301' },
        { id: 'board302', name: 'board 302' },
        { id: 'board303', name: 'board 303' },
        { id: 'board304', name: 'board 304' },
        { id: 'board305', name: 'board 305' },
        { id: 'board306', name: 'board 306' },
        { id: 'board307', name: 'board 307' }
      ],
      expanded: false
    },
    {
      id: 'boardGroup4',
      name: 'group4',
      boards: [
        { id: 'board401', name: 'board 401' },
        { id: 'board402', name: 'board 402' },
        { id: 'board403', name: 'board 403' },
        { id: 'board404', name: 'board 404' },
        { id: 'board405', name: 'board 405' },
        { id: 'board406', name: 'board 406' },
        { id: 'board407', name: 'board 407' }
      ],
      expanded: false
    }
  ]);

  const [expandList, setExpandList] = useState([]);

  function sleep(ms) {
    const wakeUpTime = Date.now() + ms;
    while (Date.now() < wakeUpTime) {}
  }

  const onDragEnd = (props) => {
    // document.body.style.color = 'inherit';
    // document.body.style.backgroundColor = 'inherit';

    const { destination, draggableId, source, type } = props;

    if (!destination) {
      return;
    }

    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }
    if (type === 'parent') {
      setBoardGroups((prev) => {
        const _prev = [...prev];
        _prev.splice(destination.index, 0, _prev.splice(source.index, 1)[0]);
        return _prev;
      });
    } else {
      setBoardGroups((prev) => {
        let targetBoard = {};
        outer: for (const bg of prev) {
          for (const board of bg.boards) {
            if (board.id === draggableId) {
              targetBoard = board;
              break outer;
            }
          }
        }
        return prev.map((bg) => {
          const _bg = { ...bg };
          if (bg.id === source.droppableId) {
            _bg.boards.splice(source.index, 1);
          }
          if (bg.id === destination.droppableId) {
            _bg.boards.splice(destination.index, 0, targetBoard);
          }
          return _bg;
        });
      });
    }
  };

  const onDragStart = (props) => {
    // document.body.style.color = 'orange';
    // document.body.style.transition = 'background-color 0.2s ease';
    // const { draggableId } = props;
    // if (expandList.includes(draggableId)) {
    //   console.log('포하아아아ㅏㅁ');
    //   setExpandList((prev) => prev.filter((item) => item !== draggableId));
    // }
  };

  const onBeforeDragStart = (props) => {
    // console.log(1);
    // // document.body.style.color = 'orange';
    // // document.body.style.transition = 'background-color 0.2s ease';
    // const { draggableId } = props;
    // if (expandList.includes(draggableId)) {
    //   console.log('포하아아아ㅏㅁ');
    //   setExpandList((prev) => prev.filter((item) => item !== draggableId));
    // }
  };

  const onBeforeCapture = (before) => {
    const { draggableId } = before;
    // if (expandList.includes(draggableId)) {
    //   setExpandList((prev) => prev.filter((item) => item !== draggableId));
    // }
  };

  const onDragUpdate = (update) => {
    console.log(update);
    const { destination } = update;
    // if (destination?.droppableId) {
    //   if (!expandList.includes(destination?.droppableId)) {
    //     setExpandList((prev) => [...prev, destination?.droppableId]);
    //   }
    // }
    // if (destination?.droppableId) {
    //   if (!boardGroups.filter((bg) => bg.id === destination?.droppableId)[0].expanded) {
    //     setBoardGroups((prev) =>
    //       prev.map((bg) => (bg.id === destination?.droppableId ? { ...bg, expanded: true } : bg))
    //     );
    //   }
    // }
  };

  const onClickExpand = (boardGroupId) => {
    // setBoardGroups((prev) => prev.map((bg) => (bg.id === boardGroupId ? { ...bg, expanded: !bg.expanded } : bg)));
    if (expandList.includes(boardGroupId)) {
      setExpandList((prev) => prev.filter((item) => item !== boardGroupId));
    } else {
      setExpandList((prev) => [...prev, boardGroupId]);
    }
  };

  return (
    <div className="dnd">
      <DragDropContext
        onDragEnd={onDragEnd}
        onDragStart={onDragStart}
        onDragUpdate={onDragUpdate}
        onBeforeDragStart={onBeforeDragStart}
        onBeforeCapture={onBeforeCapture}
      >
        <Droppable
          droppableId={'root'}
          type={'parent'}
          // mode={'virtual'}
          // renderClone={(rcProvided, snapshot) => (
          //   <div ref={rcProvided.innerRef} {...rcProvided.droppableProps} {...rcProvided.draggableProps}>
          //     hello
          //   </div>
          // )}
        >
          {(provided, snapshot) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {/* <DragDropContext onDragEnd={onDragEnd} onDragUpdate={onDragUpdate} onDragStart={onDragStart}> */}
              {boardGroups.map((boardGroup, index) => (
                <Draggable key={boardGroup.id} draggableId={boardGroup.id} index={index}>
                  {(p, sp) => (
                    <div ref={p.innerRef} {...p.draggableProps}>
                      <DndBoardGroup
                        a={p.dragHandleProps}
                        boardGroup={boardGroup}
                        onClickExpand={onClickExpand}
                        expandList={expandList}
                      />
                    </div>
                  )}
                </Draggable>
              ))}
              {/* </DragDropContext> */}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default Dnd;

// import React, { useState } from 'react';
// import { DragDropContext } from 'react-beautiful-dnd';
// import DndColumn from './DndColumn';
// import 'views/Admin/DragAndDrop/Dnd.scss';

// const Dnd = () => {
//   const [state, setState] = useState(initialData);

//   const onDragEnd = (props) => {
//     document.body.style.color = 'inherit';
//     document.body.style.backgroundColor = 'inherit';

//     const { destination, draggableId, source } = props;

//     if (!destination) {
//       return;
//     }

//     if (destination.droppableId === source.droppableId && destination.index === source.index) {
//       return;
//     }

//     setState((prev) => {
//       const _prev = { ...prev };
//       _prev.columns[source.droppableId].taskIds.splice(source.index, 1);
//       _prev.columns[destination.droppableId].taskIds.splice(destination.index, 0, draggableId);
//       return _prev;
//     });
//   };

//   const onDragStart = () => {
//     document.body.style.color = 'orange';
//     document.body.style.transition = 'background-color 0.2s ease';
//   };

//   const onDragUpdate = (update) => {
//     const { destination } = update;
//     const opacity = destination ? destination.index / Object.keys(state.tasks).length : 0;
//     document.body.style.backgroundColor = `rgba(153, 141, 217, ${opacity})`;
//   };

//   const onClickExpand = (columnId) => {
//     setState((prev) => ({
//       ...prev,
//       columns: {
//         ...prev.columns,
//         [columnId]: {
//           ...prev.columns[columnId],
//           expanded: !prev.columns[columnId].expanded
//         }
//       }
//     }));
//   };

//   return (
//     <div className="dnd">
//       <DragDropContext onDragEnd={onDragEnd} onDragUpdate={onDragUpdate} onDragStart={onDragStart}>
//         {state.columnOrder.map((columnId) => {
//           const column = state.columns[columnId];
//           const tasks = column.taskIds.map((taskId) => state.tasks[taskId]);
//           return <DndColumn key={column.id} column={column} tasks={tasks} onClickExpand={onClickExpand} />;
//         })}
//       </DragDropContext>
//     </div>
//   );
// };

// export default Dnd;

// export const initialData = {
//   tasks: {
//     'task-1': { id: 'task-1', content: 'Take out the garbage' },
//     'task-2': { id: 'task-2', content: 'Watch my favorite show' },
//     'task-3': { id: 'task-3', content: 'Charge my phone' },
//     'task-4': { id: 'task-4', content: 'Cook dinner' },

//     'task-a': { id: 'task-a', content: 'task-atask-atask-atask-a' },
//     'task-b': { id: 'task-b', content: 'task-btask-btask-btask-b' },
//     'task-c': { id: 'task-c', content: 'task-ctask-ctask-ctask-c' },
//     'task-d': { id: 'task-d', content: 'task-dtask-dtask-dtask-d' }
//   },
//   columns: {
//     'column-1': {
//       id: 'column-1',
//       title: 'To do',
//       taskIds: ['task-1', 'task-2', 'task-3', 'task-4'],
//       expanded: false
//     },
//     'column-2': {
//       id: 'column-2',
//       title: '2222222',
//       taskIds: ['task-a', 'task-b', 'task-c', 'task-d'],
//       expanded: false
//     }
//   },
//   // Facilitate reordering of the columns
//   columnOrder: ['column-1', 'column-2']
// };
