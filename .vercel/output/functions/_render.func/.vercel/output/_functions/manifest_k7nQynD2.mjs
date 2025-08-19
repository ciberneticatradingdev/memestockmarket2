import { g as decodeKey } from './chunks/astro/server_RJvOGqOn.mjs';
import { N as NOOP_MIDDLEWARE_FN } from './chunks/astro-designed-error-pages_BR_x4EVM.mjs';

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || undefined,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : undefined,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///Users/joaquinmzumelzu/Desktop/Programming/memecoin/lolzzz/","adapterName":"@astrojs/vercel/serverless","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/.pnpm/astro@4.16.18_@types+node@22.10.7_rollup@4.46.3_typescript@5.7.3/node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"inline","value":"window.location.href=\"/\";\n"}],"styles":[{"type":"external","src":"/_astro/index.D-_KkPFo.css"}],"routeData":{"route":"/404","isIndex":false,"type":"page","pattern":"^\\/404\\/?$","segments":[[{"content":"404","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/404.astro","pathname":"/404","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"inline","value":"document.addEventListener(\"DOMContentLoaded\",()=>{const e=document.getElementById(\"background-music\"),c=document.getElementById(\"sound-toggle\"),t=document.getElementById(\"sound-on-icon\"),n=document.getElementById(\"sound-off-icon\");let d=!1;function l(){d||e.play().then(()=>{d=!0,t?.classList.remove(\"hidden\"),n?.classList.add(\"hidden\")}).catch(s=>{console.error(\"Audio play failed:\",s)})}c?.addEventListener(\"click\",()=>{d?(e.pause(),d=!1,t?.classList.add(\"hidden\"),n?.classList.remove(\"hidden\")):l()}),document.addEventListener(\"introScreenDismissed\",()=>{d=!0,t?.classList.remove(\"hidden\"),n?.classList.add(\"hidden\")});const i=document.querySelectorAll(\".nav-link\"),u=document.querySelectorAll(\".content-section\");i.forEach(s=>{s.addEventListener(\"click\",r=>{r.preventDefault(),i.forEach(o=>{o.classList.remove(\"bg-blue-700\",\"rounded\")}),s.classList.add(\"bg-blue-700\",\"rounded\"),u.forEach(o=>{o.classList.add(\"hidden\")});const m=s.id.replace(\"nav-\",\"\")+\"-section\",a=document.getElementById(m);a&&a.classList.remove(\"hidden\")})})});document.addEventListener(\"DOMContentLoaded\",()=>{const e=document.getElementById(\"intro-screen\");document.getElementById(\"enter-button\")?.addEventListener(\"click\",()=>{e?.classList.add(\"opacity-0\");const t=document.getElementById(\"background-music\");t&&t.play().catch(n=>{console.error(\"Audio play failed:\",n)}),setTimeout(()=>{e&&(e.style.display=\"none\")},500),document.dispatchEvent(new CustomEvent(\"introScreenDismissed\"))})});\n"}],"styles":[{"type":"external","src":"/_astro/index.D-_KkPFo.css"},{"type":"inline","content":".glow-text[data-astro-cid-wehsio5x]{text-shadow:0 0 10px rgba(255,255,255,.7),0 0 20px rgba(255,255,255,.5)}.glow-text-blue[data-astro-cid-wehsio5x]{text-shadow:0 0 10px rgba(147,197,253,.7),0 0 20px rgba(147,197,253,.5)}.enter-button[data-astro-cid-wehsio5x]{box-shadow:0 0 15px #2563ebb3}@keyframes pulse{0%,to{transform:scale(1)}50%{transform:scale(1.05)}}.enter-button[data-astro-cid-wehsio5x]{animation:pulse 2s infinite}.ticker-container[data-astro-cid-j7pv25f6]{width:100%;overflow:hidden;white-space:nowrap}.ticker-content[data-astro-cid-j7pv25f6]{display:inline-block;white-space:nowrap;padding-left:100%;min-width:200%}.ticker-item[data-astro-cid-j7pv25f6]{display:inline-block;padding:0 2rem;font-family:Roboto Mono,monospace;font-weight:700}.ticker-left[data-astro-cid-j7pv25f6]{animation:ticker-left 20s linear infinite}.ticker-right[data-astro-cid-j7pv25f6]{animation:ticker-right 20s linear infinite}@keyframes ticker-left{0%{transform:translateZ(0)}to{transform:translate3d(-100%,0,0)}}@keyframes ticker-right{0%{transform:translate3d(-100%,0,0)}to{transform:translateZ(0)}}.glow-text[data-astro-cid-j7pv25f6]{text-shadow:0 0 10px rgba(255,255,255,.7),0 0 20px rgba(255,255,255,.5)}.glow-text-green[data-astro-cid-j7pv25f6]{text-shadow:0 0 10px rgba(74,222,128,.7),0 0 20px rgba(74,222,128,.5)}.content-section[data-astro-cid-j7pv25f6]{min-height:60vh}.hidden[data-astro-cid-j7pv25f6]{display:none!important}\n"}],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}}],"site":"https://astro-simple-starter.netlify.app/","base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["/Users/joaquinmzumelzu/Desktop/Programming/memecoin/lolzzz/src/pages/404.astro",{"propagation":"none","containsHead":true}],["/Users/joaquinmzumelzu/Desktop/Programming/memecoin/lolzzz/src/pages/index.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(o,t)=>{let i=async()=>{await(await o())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var s=(i,t)=>{let a=async()=>{await(await i())()};if(t.value){let e=matchMedia(t.value);e.matches?a():e.addEventListener(\"change\",a,{once:!0})}};(self.Astro||(self.Astro={})).media=s;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var l=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let a of e)if(a.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=l;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000noop-middleware":"_noop-middleware.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-page:src/pages/404@_@astro":"pages/404.astro.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astro-page:node_modules/.pnpm/astro@4.16.18_@types+node@22.10.7_rollup@4.46.3_typescript@5.7.3/node_modules/astro/dist/assets/endpoint/generic@_@js":"pages/_image.astro.mjs","/Users/joaquinmzumelzu/Desktop/Programming/memecoin/lolzzz/node_modules/.pnpm/astro@4.16.18_@types+node@22.10.7_rollup@4.46.3_typescript@5.7.3/node_modules/astro/dist/env/setup.js":"chunks/astro/env-setup_Cr6XTFvb.mjs","\u0000@astrojs-manifest":"manifest_k7nQynD2.mjs","/Users/joaquinmzumelzu/Desktop/Programming/memecoin/lolzzz/src/components/auth/AuthButtons.tsx":"_astro/AuthButtons.B6PyBIY-.js","/Users/joaquinmzumelzu/Desktop/Programming/memecoin/lolzzz/src/components/About.tsx":"_astro/About.LvH5LRpY.js","/Users/joaquinmzumelzu/Desktop/Programming/memecoin/lolzzz/src/components/Feed.tsx":"_astro/Feed.DgQZNy1C.js","/Users/joaquinmzumelzu/Desktop/Programming/memecoin/lolzzz/src/components/Memes.tsx":"_astro/Memes.CThJps16.js","@astrojs/solid-js/client.js":"_astro/client.hxCpx9Sc.js","/astro/hoisted.js?q=0":"_astro/hoisted.1TishdO7.js","/astro/hoisted.js?q=1":"_astro/hoisted.D2rNm9Ej.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[],"assets":["/_astro/index.D-_KkPFo.css","/bg.MP4","/tecno.mp3","/_astro/About.LvH5LRpY.js","/_astro/AuthButtons.B6PyBIY-.js","/_astro/Feed.DgQZNy1C.js","/_astro/Memes.CThJps16.js","/_astro/client.hxCpx9Sc.js","/_astro/web.BthMpCye.js","/seo/banner.png","/seo/icon.png","/social/dex-gold.svg","/social/dex.png","/social/jup.png","/social/raydium-gold.svg","/social/telegram-icon-gold.svg","/social/telegram.svg","/social/telegram3.svg","/social/x2.png"],"buildFormat":"directory","checkOrigin":false,"serverIslandNameMap":[],"key":"nDqwge5nQo0CsbZZyilV8tFLziPdMqQL0Y4yzYzw2Gc=","experimentalEnvGetSecretEnabled":false});

export { manifest };
