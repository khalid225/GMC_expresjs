const express = require("express");
const path = require("path");
const expressLayouts = require("express-ejs-layouts");
const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(expressLayouts);

// Serve static files (like CSS) from the 'public' directory
app.use(express.static(path.join(__dirname, "public")));

const timeVerifierMiddleware = (req, res, next) => {
	const now = new Date();
	const dayOfWeek = now.getDay();
	const hour = now.getHours();

	if (dayOfWeek >= 1 && dayOfWeek <= 5 && hour >= 9 && hour < 17) {
		next();
	} else {
		res.render("unavailable", {
			title: "Application Unavailable",
			message:
				"Our web application is only available during working hours (Monday to Friday, from 9 AM to 5 PM).",
		});
	}
};

app.use(timeVerifierMiddleware);

// Route for the Home page
app.get("/", (req, res) => {
	res.render("home", { title: "Home Page" });
});

app.get("/services", (req, res) => {
	res.render("services", { title: "Our Services" });
});

app.get("/contact", (req, res) => {
	res.render("contact", { title: "Contact Us" });
});

// A fallback page for when the application is unavailable (used by the middleware)
app.get("/unavailable", (req, res) => {
	res.render("unavailable", {
		title: "Application Unavailable",
		message:
			"Our web application is currently unavailable. Please visit us during working hours (Monday to Friday, 9 AM to 5 PM).",
	});
});

// Start the server
app.listen(port, () => {
	console.log(`Web application listening at http://localhost:${port}`);
	console.log(
		"Access the application during working hours (Mon-Fri, 9 AM - 5 PM) for full functionality."
	);
});
