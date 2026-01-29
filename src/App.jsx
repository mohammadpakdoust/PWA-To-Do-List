import Quote from './components/Quote';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import OfflineIndicator from './components/OfflineIndicator';

function App() {
  return (
    <div className="app-container">
      <OfflineIndicator />
      <header>
        <h1>SMU Task Manager</h1>
        <p style={{ color: 'var(--color-text-secondary)' }}>Stay organized, stay motivated.</p>
      </header>

      <main style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        <section>
          <Quote />
        </section>

        <section>
          <TaskForm />
        </section>

        <section>
          <TaskList />
        </section>
      </main>
    </div>
  )
}

export default App
