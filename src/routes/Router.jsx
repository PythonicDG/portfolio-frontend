import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import Loading from "../components/common/loading/Loading";

const Home = lazy(() => import("../pages/Home"));
const Main = lazy(() => import("../layouts/Main"));

const getBasename = () => {
  if (import.meta.env.VERCEL === "1" || import.meta.env.DEV) {
    return "/";
  }
  
  const repoName = import.meta.env.VITE_REPO_NAME;
  if (repoName && repoName !== "undefined") {
    return `/${repoName}`;
  }
  
  return "/";
};

export const router = createBrowserRouter(
  [
    {
      path: "/",
      element: (
        <Suspense fallback={<Loading />}>
          <Main />
        </Suspense>
      ),
      children: [
        { index: true, element: <Home /> },
      ],
    },
  ],
  { basename: getBasename() }
);