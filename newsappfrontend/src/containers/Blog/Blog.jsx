import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import AppTheme from '../../theme/AppTheme';
import AppAppBar from './components/AppAppBar';
import MainContent from './components/MainContent';
import Latest from './components/Latest';
import Footer from './components/Footer';
import { useLoaderData, useOutletContext } from 'react-router';

export default function Blog(props) {

  const { loaderData } = useOutletContext();

  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <AppAppBar />
      <Container
        maxWidth="lg"
        component="main"
        sx={{ display: 'flex', flexDirection: 'column', my: 16, gap: 4 }}
      >
        <MainContent data={loaderData}/>
        <Latest />
      </Container>
      <Footer />
    </AppTheme>
  );
}
