import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import LandingPage from './Pages/landingpage';
import AppLayout from './layouts/app-layout';
import OnBoarding from './Pages/onboarding';
import JobListing from './Pages/job-listing';
import JobPage from './Pages/Job';
import JobPost from './Pages/job-post';
import SavedJobs from './Pages/saved-jobs';
import MyJobs from './Pages/my-jobs';
import { ThemeProvider } from './components/theme-provider';
import ProtectedRoute from './components/protected-route';
import JobRecommendationForm from './Pages/SkillConnect';
import Gennie from './Pages/Gennie';

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: '/',
        element: <LandingPage />,
      },
      {
        path: '/onboarding',
        element:
          <ProtectedRoute>
            <OnBoarding />
          </ProtectedRoute>
      },
      {
        path: '/jobs',
        element: <ProtectedRoute>
          <JobListing />
        </ProtectedRoute>
      },
      {
        path: '/job/:id',
        element: <ProtectedRoute>
          <JobPage />
        </ProtectedRoute>
      },
      {
        path: '/post-job',
        element: <ProtectedRoute>
          <JobPost />
        </ProtectedRoute>
      },
      {
        path: '/saved-jobs',
        element: <ProtectedRoute>
          <SavedJobs />,
        </ProtectedRoute>
      },
      {
        path: '/my-jobs',
        element: <ProtectedRoute>
          <MyJobs />,
        </ProtectedRoute>
      },
      {
        path:'/skill_connect',
        element:<ProtectedRoute>
          <JobRecommendationForm/>
        </ProtectedRoute>
      },
      {
        path:'/chatbot',
        element:<ProtectedRoute>
          <Gennie/>
        </ProtectedRoute>
      },
    ]
  },
]);

function App() {

  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <RouterProvider router={router} />
      </ThemeProvider>

    </>
  )
}

export default App
