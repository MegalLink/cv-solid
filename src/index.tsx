/* @refresh reload */
import { render } from "solid-js/web";
import "./index.css";
import { RouterProvider } from "@tanstack/solid-router";
import { router } from "./routes";

const root = document.getElementById("root");

render(() => <RouterProvider router={router} />, root!);
