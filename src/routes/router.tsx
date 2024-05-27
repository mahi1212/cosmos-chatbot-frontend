import {
    createBrowserRouter
} from "react-router-dom";
import ServiceLayout from "src/layout/ServiceLayout";
import UserLayout from "src/layout/UserLayout";
import Chats from "src/pages/Chats/Chats";
import Home from "src/pages/Home/Home";
import Rewrite from "src/pages/Rewrite/Rewrite";


export const router = createBrowserRouter([
    {
        path: "/",
        element: <UserLayout />,
        children: [
            {
                path: "",
                element: <Home />
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
                        path: "rewrite",
                        element: <Rewrite />,
                    },
                ]
            },
        ]

    },


]);