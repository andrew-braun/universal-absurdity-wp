import React from "react";
import ReactDOM from "react-dom";
import "../css/style.css";

// Our modules / classes
import GoogleMap from "./modules/GoogleMap";
import MobileMenu from "./modules/MobileMenu";
import HeroSlider from "./modules/HeroSlider";
import Search from "./modules/Search";
import MyNotes from "./modules/MyNotes";
import Like from "./modules/Like";

// Instantiate a new object using our modules/classes
const googleMap = new GoogleMap("");
const mobileMenu = new MobileMenu();
const heroSlider = new HeroSlider();
const search = new Search();
const myNotes = new MyNotes();
const like = new Like();

// React
function ReactFooter() {
	return (
		<div>
			<h1>Hello world!</h1>
			<p>I am a React-powered footer!</p>
		</div>
	);
}

ReactDOM.render(<ReactFooter />, document.querySelector("#app"));

// Allow new JS and CSS to load in browser without a traditional page refresh
if (module.hot) {
	module.hot.accept();
}
