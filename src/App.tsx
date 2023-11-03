import { CssBaseline } from '@mui/material';
import './index.css';
import Layout from './views/Layout';

export default function App() {
  return (
    <div className="w-screen h-screen">
      <CssBaseline />
      <Layout />
    </div>
  );
}
