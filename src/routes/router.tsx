import {
    createBrowserRouter
} from "react-router-dom";
import ServiceLayout from "src/layout/ServiceLayout";
import UserLayout from "src/layout/UserLayout";
import Login from "src/pages/Auth/Login";
import Chats from "src/pages/Chats/Chats";
import Contact from "src/pages/Contact/Contact";
import Home from "src/pages/Home/Home";
import Rewrite from "src/pages/Rewrite/Rewrite";
import Settings from "src/pages/Settings/Settings";
import Translator from "src/pages/Translator/Translator";


export const router = createBrowserRouter([
    {
        path: "/",
        element: <UserLayout />,
        errorElement: <div>Something went wrong</div>,
        children: [
            {
                path: "",
                element: <Home />
            },
            {
                path: "settings",
                element: <Settings />
            },
            {
                path: "contact",
                element: <Contact />
            },
            {
                path: "login",
                element: <Login />
            },
            {
                path: "",
                element: <ServiceLayout />,
                children: [
                    {
                        path: "",
                        element: <Chats />
                    },
                    {
                        path: "chats",
                        element: <Chats />
                    },
                    {
                        path: "translator",
                        element: <Translator />
                    },
                    {
                        path: "rewrite",
                        element: <Rewrite />,
                    },
                ]
            },
        ]
    },
    {
        path: "*",
        element: <div>404 Not Found</div>
    }


]);