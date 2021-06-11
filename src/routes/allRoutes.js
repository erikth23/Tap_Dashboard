import React from "react";
import { Redirect } from "react-router-dom";


// Profile
import UserProfile from "../pages/Authentication/user-profile";

//Tasks
import TasksList from "../pages/Tasks/tasks-list";
import AddTask from "../pages/Tasks/addTask";

// Authentication related pages
import Login from "../pages/Authentication/Login";
import Logout from "../pages/Authentication/Logout";
import Register from "../pages/Authentication/Register";
import ForgetPwd from "../pages/Authentication/ForgetPassword";

//Inner Authentication
import Login1 from "../pages/AuthenticationInner/Login";
import Register1 from "../pages/AuthenticationInner/Register";
import ForgetPwd1 from "../pages/AuthenticationInner/ForgetPassword";
import LockScreen from "../pages/AuthenticationInner/auth-lock-screen";

// Dashboard
import Dashboard from "../pages/Dashboard/index";

//Systems
import Systems from "../pages/Systems/index";
import AddUser from "../pages/Systems/addUser";

//Metrics
import Metrics from "../pages/Metrics/index";

//Guests
import Guests from "../pages/Guests/addGuest";
import GuestsList from "../pages/Guests/guestsList";

//Pages
import PagesStarter from "../pages/Utility/pages-starter";
import PagesMaintenance from "../pages/Utility/pages-maintenance";
import PagesComingsoon from "../pages/Utility/pages-comingsoon";
import PagesTimeline from "../pages/Utility/pages-timeline";
import PagesFaqs from "../pages/Utility/pages-faqs";
import PagesPricing from "../pages/Utility/pages-pricing";
import Pages404 from "../pages/Utility/pages-404";
import Pages500 from "../pages/Utility/pages-500";

const userRoutes = [

	{ path: "/dashboard", component: Dashboard },
	{ path: "/tasks", component: TasksList},
	{ path: "/systems", component: Systems},
	{ path: "/systems-addUser", component: AddUser},
	{ path: "/tasks-addTask", component: AddTask},
	{ path: "/metrics", component: Metrics},
	{ path: "/guests", component: GuestsList},
	{ path: "/guests-addGuest", component: Guests},

	// this route should be at the end of all other routes
	{ path: "/", exact: true, component: () => <Redirect to="/dashboard" /> }
];

const authRoutes = [
	{ path: "/logout", component: Logout },
	{ path: "/login", component: Login },
	{ path: "/forgot-password", component: ForgetPwd },
	{ path: "/register", component: Register },

	{ path: "/pages-maintenance", component: PagesMaintenance },
	{ path: "/pages-comingsoon", component: PagesComingsoon },
	{ path: "/pages-404", component: Pages404 },
	{ path: "/pages-500", component: Pages500 },

	// Authentication Inner
	{ path: "/pages-login", component: Login1 },
	{ path: "/pages-register", component: Register1 },
	{ path: "/pages-forget-pwd", component: ForgetPwd1 },
	{ path : "/auth-lock-screen", component: LockScreen }
];

export { userRoutes, authRoutes };
