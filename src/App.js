
import './App.css';
import KanbanBoard from './KanbanBoard';

function App() {
  const columns = [
    { kanbanOrder: 0, title: 'To Do', active: true },
    { kanbanOrder: 1, title: 'In Analysis', active: false },
    { kanbanOrder: 1.5, title: 'Ready for dev', active: false },
    { kanbanOrder: 2, title: 'In dev', active: true },
    { kanbanOrder: 2.5, title: 'Ready for QA', active: false },
    { kanbanOrder: 3, title: 'In QA', active: false },
    { kanbanOrder: 3.5, title: 'Ready for release', active: false },
    { kanbanOrder: 4, title: 'Done', active: true },
    { kanbanOrder: 5, title: 'Complete', active: false }
  ];

  return (
    <div className="App">
      <header className="App-header">
        Kanban Simulation
      </header>
      <KanbanBoard columns={columns} />
    </div>
  );
}

export default App;
