/**
 * Routes
 * =====================
 * All app routes
 *
 * @contributors: Bastian Huber
 *
 * @license: MIT License
 *
 */
import Home from "@app/pages/home/home.svelte";
import NotFound from "@app/pages/404/404.svelte";

export default {
	"/": Home,
	"*": NotFound,
};
