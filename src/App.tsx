import { Toaster } from 'sonner';
import { MainLayout } from './layouts/MainLayout';
import { HomePage } from './features/home';

function App() {
  return (
    <>
      <MainLayout>
        <HomePage />
      </MainLayout>
      <Toaster position="top-right" richColors />
    </>
  );
}

export default App;
