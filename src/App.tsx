import { MantineProvider } from '@mantine/core';
import { Provider } from 'react-redux';
import { store } from './store';
import VacanciesPage from './pages/VacanciesPage';
import { Routes, Route, HashRouter } from 'react-router-dom';
import VacancyPage from './pages/VacancyPage';

function App() {
  return (
    <Provider store={store}>
      <MantineProvider
        theme={{
          fontFamily: '"Open Sans", -apple-system, BlinkMacSystemFont, sans-serif',
          primaryColor: 'blue',
          components: {
            Button: {
              defaultProps: {
                radius: 'md',
              },
              styles: {
                root: {
                  fontFamily: '"Open Sans", sans-serif',
                },
              },
            },
            Card: {
              defaultProps: {
                radius: 'md',
                withBorder: true,
              },
            },
            TextInput: {
              defaultProps: {
                radius: 'md',
              },
            },
            Select: {
              defaultProps: {
                radius: 'md',
              },
            },
            Text: {
              defaultProps: {
                ff: '"Open Sans", sans-serif',
              },
            },
            Group: {
              defaultProps: {
                wrap: 'nowrap',
              },
            },
          },
        }}
      >
        <HashRouter>
        <style>
          {`
             @import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;500;600;700&display=swap');
            
            * {
              margin: 0;
              padding: 0;
              box-sizing: border-box;
            }
            
            
            html, body, #root {
              background-color: #F6F6F7 !important;
              font-family: 'Open Sans', sans-serif;
              min-width: 1440px;
              height: 100%;
            }
            
            body {
              margin: 0;
              padding: 0;
            }
            
            #root {
              min-height: 100vh;
            }
            
           
            .mantine-Container-root {
              padding-left: 0 !important;
              padding-right: 0 !important;
            }
            
          
            main {
              min-height: 100vh;
              background-color: #F6F6F7;
            }
          `}
        </style>
         <Routes>
            <Route path="/" element={<VacanciesPage />} />
            <Route path="/vacancies" element={<VacanciesPage />} />
            <Route path="/vacancies/:id" element={<VacancyPage />} />
          </Routes>
        </HashRouter>
      </MantineProvider>
    </Provider>
  );
}

export default App;