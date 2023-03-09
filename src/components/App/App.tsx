import Router from '@/components/Router/Router';
import AppProvider from '@/providers/app';

function App() {
  return (
    <AppProvider>
      <Router />
    </AppProvider>
  );
}

export default App;
