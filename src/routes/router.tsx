import {
    createBrowserRouter
} from "react-router-dom";
import UserLayout from "../layout/UserLayout";
import Home from "../pages/Home/Home";
import ServiceLayout from "../layout/ServiceLayout";
import Chats from "../pages/Chats/Chats";
import Rewrite from "../pages/Rewrite/Rewrite";


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