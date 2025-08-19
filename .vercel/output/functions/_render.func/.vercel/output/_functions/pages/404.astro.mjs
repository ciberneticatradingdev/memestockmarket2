/* empty css                                 */
import { a as createComponent, r as renderTemplate, f as renderComponent, m as maybeRenderHead } from '../chunks/astro/server_RJvOGqOn.mjs';
import { $ as $$Layout } from '../chunks/Layout_Dm2YuCJ7.mjs';
export { renderers } from '../renderers.mjs';

const $$404 = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "404 Page Not Found", "description": "This page was not found. Please return to the home page.", "keywords": "", "canonicalURL": "https://gtrump.io/404", "robots": "noindex, follow" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main class=""> <section class="p-8 max-w-xl mx-auto">  </section> </main> ` })} `;
}, "/Users/joaquinmzumelzu/Desktop/Programming/memecoin/lolzzz/src/pages/404.astro", undefined);

const $$file = "/Users/joaquinmzumelzu/Desktop/Programming/memecoin/lolzzz/src/pages/404.astro";
const $$url = "/404";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$404,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
