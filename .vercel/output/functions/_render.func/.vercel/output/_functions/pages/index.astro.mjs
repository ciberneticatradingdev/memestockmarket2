/* empty css                                 */
import { a as createComponent, r as renderTemplate, m as maybeRenderHead, f as renderComponent } from '../chunks/astro/server_RJvOGqOn.mjs';
import { $ as $$Layout } from '../chunks/Layout_Dm2YuCJ7.mjs';
/* empty css                                 */
import { ssr, ssrHydrationKey, escape, createComponent as createComponent$1, ssrAttribute, Portal } from 'solid-js/web';
import { createSignal, Show, For } from 'solid-js';
import { createClient } from '@supabase/supabase-js';
export { renderers } from '../renderers.mjs';

const $$IntroScreen = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<div id="intro-screen" class="fixed inset-0 z-50 flex flex-col items-center justify-center py-12 px-4 md:px-8 bg-gradient-to-b from-blue-900 to-blue-700 transition-opacity duration-500" data-astro-cid-wehsio5x> <!-- Background Video for Intro --> <div class="fixed inset-0 z-0 overflow-hidden" data-astro-cid-wehsio5x> <video autoplay loop muted playsinline class="absolute inset-0 w-full h-full object-cover opacity-30" data-astro-cid-wehsio5x> <source src="/bg.MP4" type="video/mp4" data-astro-cid-wehsio5x> </video> </div> <!-- Entry Content --> <div class="z-10 text-center flex flex-col items-center" data-astro-cid-wehsio5x> <!-- <div class="mb-8">
      <img src="/mememarket-logo.png" alt="Meme Market Logo" class="w-64 h-auto mx-auto" onerror="this.src='/gtrump/gtrump.png'; this.onerror=null;" />
    </div> --> <h1 class="text-4xl md:text-6xl font-bold text-white mb-4 glow-text" data-astro-cid-wehsio5x>ACCESS RESTRICTED</h1> <h2 class="text-2xl md:text-3xl font-bold text-blue-300 mb-8 glow-text-blue" data-astro-cid-wehsio5x>MEME TRADERS ONLY</h2> <button id="enter-button" class="enter-button bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 px-8 rounded-lg text-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center" data-astro-cid-wehsio5x> <span data-astro-cid-wehsio5x>ENTER MEME STOCK MARKET</span> <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-astro-cid-wehsio5x> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" data-astro-cid-wehsio5x></path> </svg> </button> </div> </div>  `;
}, "/Users/joaquinmzumelzu/Desktop/Programming/memecoin/lolzzz/src/components/IntroScreen.astro", undefined);

const supabaseUrl = "https://zfasxsiqjlxjaqojtvzt.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpmYXN4c2lxamx4amFxb2p0dnp0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ1NTQ2NzEsImV4cCI6MjA3MDEzMDY3MX0.skvv6gB0mulDoZ-v-lcSf_2MNbZrWkAYM2lQeNW9nNQ";
const isSupabaseConfigured = true;
const supabase = createClient(supabaseUrl, supabaseAnonKey) ;
const authHelpers = {
  // Sign up with email and password
  async signUp(email, password, username) {
    if (!supabase) {
      return {
        data: null,
        error: { message: "Supabase is not configured. Please set up environment variables." }
      };
    }
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          username: username || email.split("@")[0]
        }
      }
    });
    return { data, error };
  },
  // Sign in with email and password
  async signIn(email, password) {
    if (!supabase) {
      return {
        data: null,
        error: { message: "Supabase is not configured. Please set up environment variables." }
      };
    }
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    return { data, error };
  },
  // Sign out
  async signOut() {
    if (!supabase) {
      return { error: { message: "Supabase is not configured. Please set up environment variables." } };
    }
    const { error } = await supabase.auth.signOut();
    return { error };
  },
  // Get current user
  async getCurrentUser() {
    if (!supabase) {
      return { user: null, error: { message: "Supabase is not configured. Please set up environment variables." } };
    }
    const { data: { user }, error } = await supabase.auth.getUser();
    return { user, error };
  },
  // Get user profile from users table
  async getUserProfile(userId) {
    if (!supabase) {
      return { data: null, error: { message: "Supabase is not configured. Please set up environment variables." } };
    }
    const { data, error } = await supabase.from("users").select("*").eq("id", userId).single();
    return { data, error };
  },
  // Create or update user profile
  async upsertUserProfile(userId, profile) {
    if (!supabase) {
      return { data: null, error: { message: "Supabase is not configured. Please set up environment variables." } };
    }
    const { data, error } = await supabase.from("users").upsert({ id: userId, ...profile }).select().single();
    return { data, error };
  }
};

const [user, setUser] = createSignal(null);
const [userProfile, setUserProfile] = createSignal(null);
const [loading, setLoading] = createSignal(true);
const [isAuthenticated, setIsAuthenticated] = createSignal(false);
const initializeAuth = async () => {
  try {
    if (!isSupabaseConfigured) ;
    const { user: currentUser } = await authHelpers.getCurrentUser();
    if (currentUser) {
      setUser(currentUser);
      setIsAuthenticated(true);
      const { data: profile } = await authHelpers.getUserProfile(currentUser.id);
      if (profile) {
        setUserProfile(profile);
      }
    }
  } catch (error) {
    console.error("Error initializing auth:", error);
  } finally {
    setLoading(false);
  }
};
if (supabase) {
  supabase.auth.onAuthStateChange(async (event, session) => {
    if (event === "SIGNED_IN" && session?.user) {
      setUser(session.user);
      setIsAuthenticated(true);
      const { data: profile } = await authHelpers.getUserProfile(session.user.id);
      if (profile) {
        setUserProfile(profile);
      } else {
        const { data: newProfile } = await authHelpers.upsertUserProfile(session.user.id, {
          email: session.user.email,
          username: session.user.user_metadata?.username || session.user.email?.split("@")[0],
          balance: 0,
          total_portfolio_value: 0
        });
        if (newProfile) {
          setUserProfile(newProfile);
        }
      }
    } else if (event === "SIGNED_OUT") {
      setUser(null);
      setUserProfile(null);
      setIsAuthenticated(false);
    }
    setLoading(false);
  });
}
initializeAuth();

var _tmpl$$7 = ["<button", ' class="text-gray-400 hover:text-white">✕</button>'], _tmpl$2$4 = ["<div", ' class="text-red-400 text-sm bg-red-900/20 p-3 rounded-md border border-red-800">', "</div>"], _tmpl$3$4 = ["<div", ' class="bg-gray-900 p-6 rounded-lg w-full max-w-md mx-auto"><div class="flex justify-between items-center mb-6"><h2 class="text-2xl font-bold text-white">Sign In</h2><!--$-->', '<!--/--></div><form class="space-y-4"><div><label for="email" class="block text-sm font-medium text-gray-300">Email</label><input id="email" type="email"', ' required class="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="you@example.com"></div><div><label for="password" class="block text-sm font-medium text-gray-300">Password</label><input id="password" type="password"', ' required class="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="••••••••"></div><!--$-->', '<!--/--><button type="submit" class="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"', ">", `</button></form><div class="mt-4 text-sm text-gray-400 text-center">Don't have an account? <button class="text-blue-400 hover:text-blue-300">Sign up</button></div></div>`];
function LoginForm(props) {
  const [email, setEmail] = createSignal("");
  const [password, setPassword] = createSignal("");
  const [error, setError] = createSignal("");
  const [isLoading, setIsLoading] = createSignal(false);
  return ssr(_tmpl$3$4, ssrHydrationKey(), escape(createComponent$1(Show, {
    get when() {
      return props.onClose;
    },
    get children() {
      return ssr(_tmpl$$7, ssrHydrationKey());
    }
  })), ssrAttribute("value", escape(email(), true), false), ssrAttribute("value", escape(password(), true), false), escape(createComponent$1(Show, {
    get when() {
      return error();
    },
    get children() {
      return ssr(_tmpl$2$4, ssrHydrationKey(), escape(error()));
    }
  })), ssrAttribute("disabled", isLoading(), true), isLoading() ? "Signing in..." : "Sign In");
}

var _tmpl$$6 = ["<button", ' class="text-gray-400 hover:text-white">✕</button>'], _tmpl$2$3 = ["<div", ' class="text-red-400 text-sm bg-red-900/20 p-3 rounded-md border border-red-800">', "</div>"], _tmpl$3$3 = ["<div", ' class="bg-gray-900 p-6 rounded-lg w-full max-w-md mx-auto"><div class="flex justify-between items-center mb-6"><h2 class="text-2xl font-bold text-white">Create Account</h2><!--$-->', '<!--/--></div><form class="space-y-4"><div><label for="email" class="block text-sm font-medium text-gray-300">Email</label><input id="email" type="email"', ' required class="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="you@example.com"></div><div><label for="username" class="block text-sm font-medium text-gray-300">Username</label><input id="username" type="text"', ' required class="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="your_username"></div><div><label for="password" class="block text-sm font-medium text-gray-300">Password</label><input id="password" type="password"', ' required class="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="••••••••"></div><div><label for="confirmPassword" class="block text-sm font-medium text-gray-300">Confirm Password</label><input id="confirmPassword" type="password"', ' required class="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="••••••••"></div><!--$-->', '<!--/--><button type="submit" class="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"', ">", '</button></form><div class="mt-4 text-sm text-gray-400 text-center">Already have an account? <button class="text-blue-400 hover:text-blue-300">Sign in</button></div></div>'];
function RegisterForm(props) {
  const [email, setEmail] = createSignal("");
  const [username, setUsername] = createSignal("");
  const [password, setPassword] = createSignal("");
  const [confirmPassword, setConfirmPassword] = createSignal("");
  const [error, setError] = createSignal("");
  createSignal(false);
  const [isLoading, setIsLoading] = createSignal(false);
  return ssr(_tmpl$3$3, ssrHydrationKey(), escape(createComponent$1(Show, {
    get when() {
      return props.onClose;
    },
    get children() {
      return ssr(_tmpl$$6, ssrHydrationKey());
    }
  })), ssrAttribute("value", escape(email(), true), false), ssrAttribute("value", escape(username(), true), false), ssrAttribute("value", escape(password(), true), false), ssrAttribute("value", escape(confirmPassword(), true), false), escape(createComponent$1(Show, {
    get when() {
      return error();
    },
    get children() {
      return ssr(_tmpl$2$3, ssrHydrationKey(), escape(error()));
    }
  })), ssrAttribute("disabled", isLoading(), true), isLoading() ? "Creating account..." : "Create Account");
}

var _tmpl$$5 = ["<div", ' class="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-[9999] p-4"><div class="bg-gray-900 rounded-lg shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto"><!--$-->', "<!--/--><!--$-->", "<!--/--></div></div>"];
function AuthModal(props) {
  const [mode, setMode] = createSignal(props.initialMode || "login");
  const handleClose = () => {
    props.onClose();
  };
  return createComponent$1(Portal, {
    get children() {
      return ssr(_tmpl$$5, ssrHydrationKey(), escape(createComponent$1(Show, {
        get when() {
          return mode() === "login";
        },
        get children() {
          return createComponent$1(LoginForm, {
            onClose: handleClose,
            onSwitchToRegister: () => setMode("register")
          });
        }
      })), escape(createComponent$1(Show, {
        get when() {
          return mode() === "register";
        },
        get children() {
          return createComponent$1(RegisterForm, {
            onClose: handleClose,
            onSwitchToLogin: () => setMode("login")
          });
        }
      })));
    }
  });
}

var _tmpl$$4 = ["<div", ' class="flex items-center space-x-3 text-white"><div class="flex flex-col leading-tight text-right"><span class="text-sm text-gray-300">Welcome</span><strong class="text-base">', '</strong></div><button title="Sign out" class="bg-gray-800 hover:bg-gray-700 text-white px-3 py-2 rounded">Sign out</button></div>'];
function UserProfile(props) {
  return ssr(_tmpl$$4, ssrHydrationKey(), escape(userProfile()?.username) || escape(user()?.email?.split("@")[0]) || "User");
}

var _tmpl$$3 = ["<div", '><button class="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded mr-2">REGISTER</button><button class="bg-blue-700 hover:bg-blue-600 text-white px-4 py-2 rounded">LOG IN</button></div>'];
function AuthButtons() {
  const [showModal, setShowModal] = createSignal(false);
  const [modalMode, setModalMode] = createSignal("login");
  const closeModal = () => {
    setShowModal(false);
  };
  return [createComponent$1(Show, {
    get when() {
      return isAuthenticated();
    },
    get fallback() {
      return ssr(_tmpl$$3, ssrHydrationKey());
    },
    get children() {
      return createComponent$1(UserProfile, {});
    }
  }), createComponent$1(Show, {
    get when() {
      return showModal();
    },
    get children() {
      return createComponent$1(AuthModal, {
        get isOpen() {
          return showModal();
        },
        get initialMode() {
          return modalMode();
        },
        onClose: closeModal
      });
    }
  })];
}

var _tmpl$$2 = ["<div", ` class="space-y-6"><div class="bg-gradient-to-r from-blue-900/50 to-purple-900/50 p-6 rounded-lg border border-blue-500/30"><h3 class="text-2xl font-bold text-white mb-4">Welcome to memestockmarket.fun</h3><p class="text-gray-300 text-lg leading-relaxed">The world's first decentralized meme stock market where internet culture meets financial innovation. Trade, invest, and profit from the most viral memes on the internet.</p></div><div class="grid md:grid-cols-2 gap-6"><div class="bg-gray-800/50 p-6 rounded-lg border border-gray-700"><div class="flex items-center mb-4"><div class="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mr-4"><svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg></div><h4 class="text-xl font-semibold text-white">Trade Memes</h4></div><p class="text-gray-400">Buy and sell shares of viral memes. Watch your portfolio grow as memes gain popularity across social media platforms.</p></div><div class="bg-gray-800/50 p-6 rounded-lg border border-gray-700"><div class="flex items-center mb-4"><div class="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mr-4"><svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg></div><h4 class="text-xl font-semibold text-white">Community Driven</h4></div><p class="text-gray-400">Join a vibrant community of meme enthusiasts, traders, and creators. Share insights and discover the next big meme.</p></div></div></div>`], _tmpl$2$2 = ["<div", ' class="space-y-6"><div class="grid gap-6"><div class="bg-gradient-to-r from-green-900/30 to-blue-900/30 p-6 rounded-lg border border-green-500/30"><h4 class="text-xl font-bold text-white mb-3 flex items-center"><span class="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mr-3 text-sm">📈</span>Real-time Meme Trading</h4><p class="text-gray-300">Track meme performance across social platforms with live price updates and market sentiment analysis.</p></div><div class="bg-gradient-to-r from-purple-900/30 to-pink-900/30 p-6 rounded-lg border border-purple-500/30"><h4 class="text-xl font-bold text-white mb-3 flex items-center"><span class="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center mr-3 text-sm">🎯</span>Smart Portfolio Management</h4><p class="text-gray-300">Advanced analytics and AI-powered recommendations to optimize your meme investment strategy.</p></div><div class="bg-gradient-to-r from-orange-900/30 to-red-900/30 p-6 rounded-lg border border-orange-500/30"><h4 class="text-xl font-bold text-white mb-3 flex items-center"><span class="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center mr-3 text-sm">🚀</span>Meme Launchpad</h4><p class="text-gray-300">Launch your own memes and watch them compete in the marketplace. Creators earn royalties from trading activity.</p></div><div class="bg-gradient-to-r from-cyan-900/30 to-blue-900/30 p-6 rounded-lg border border-cyan-500/30"><h4 class="text-xl font-bold text-white mb-3 flex items-center"><span class="w-8 h-8 bg-cyan-500 rounded-full flex items-center justify-center mr-3 text-sm">🏆</span>Leaderboards & Rewards</h4><p class="text-gray-300">Compete with other traders, climb the leaderboards, and earn exclusive rewards and NFT badges.</p></div></div></div>'], _tmpl$3$2 = ["<div", ` class="space-y-8"><div class="text-center mb-8"><h3 class="text-2xl font-bold text-white mb-4">Start Trading Memes in 3 Simple Steps</h3><p class="text-gray-400">Join thousands of traders in the world's most entertaining financial market</p></div><div class="grid md:grid-cols-3 gap-8"><div class="text-center"><div class="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4"><span class="text-2xl font-bold text-white">1</span></div><h4 class="text-xl font-semibold text-white mb-3">Create Account</h4><p class="text-gray-400">Sign up with your email and get started with virtual currency to begin trading immediately.</p></div><div class="text-center"><div class="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4"><span class="text-2xl font-bold text-white">2</span></div><h4 class="text-xl font-semibold text-white mb-3">Discover Memes</h4><p class="text-gray-400">Browse trending memes, analyze their social media performance, and identify investment opportunities.</p></div><div class="text-center"><div class="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4"><span class="text-2xl font-bold text-white">3</span></div><h4 class="text-xl font-semibold text-white mb-3">Trade & Profit</h4><p class="text-gray-400">Buy low, sell high, and watch your portfolio grow as memes go viral across the internet.</p></div></div><div class="bg-gradient-to-r from-yellow-900/20 to-orange-900/20 p-6 rounded-lg border border-yellow-500/30 mt-8"><div class="flex items-start"><div class="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center mr-4 flex-shrink-0"><svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg></div><div><h4 class="text-lg font-semibold text-white mb-2">Pro Tip</h4><p class="text-gray-300">Follow social media trends, monitor engagement metrics, and use our sentiment analysis tools to make informed trading decisions.</p></div></div></div></div>`], _tmpl$4$2 = ["<div", ' class="space-y-6"><div class="text-center mb-8"><h3 class="text-2xl font-bold text-white mb-4">Join Our Growing Community</h3><p class="text-gray-400">Connect with meme traders, creators, and enthusiasts from around the world</p></div><div class="grid md:grid-cols-2 gap-6"><div class="bg-[#5865F2]/10 p-6 rounded-lg border border-[#5865F2]/30"><div class="flex items-center mb-4"><div class="w-12 h-12 bg-[#5865F2] rounded-lg flex items-center justify-center mr-4"><svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"></path></svg></div><div><h4 class="text-xl font-semibold text-white">Discord Server</h4><p class="text-gray-400">24/7 active community</p></div></div><p class="text-gray-300 mb-4">Join our Discord for real-time market discussions, trading tips, and exclusive alpha calls.</p><button class="bg-[#5865F2] hover:bg-[#4752C4] text-white px-4 py-2 rounded-lg transition-colors">Join Discord</button></div><div class="bg-blue-500/10 p-6 rounded-lg border border-blue-500/30"><div class="flex items-center mb-4"><div class="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mr-4"><svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"></path></svg></div><div><h4 class="text-xl font-semibold text-white">Twitter/X</h4><p class="text-gray-400">Latest updates & news</p></div></div><p class="text-gray-300 mb-4">Follow us for market updates, new meme launches, and community highlights.</p><button class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors">Follow @MemeStockMarket</button></div></div><div class="bg-gradient-to-r from-green-900/20 to-blue-900/20 p-6 rounded-lg border border-green-500/30"><h4 class="text-xl font-bold text-white mb-4">Community Stats</h4><div class="grid grid-cols-2 md:grid-cols-4 gap-4"><div class="text-center"><div class="text-2xl font-bold text-green-400">50K+</div><div class="text-gray-400 text-sm">Active Traders</div></div><div class="text-center"><div class="text-2xl font-bold text-blue-400">1M+</div><div class="text-gray-400 text-sm">Memes Traded</div></div><div class="text-center"><div class="text-2xl font-bold text-purple-400">$10M+</div><div class="text-gray-400 text-sm">Volume Traded</div></div><div class="text-center"><div class="text-2xl font-bold text-yellow-400">24/7</div><div class="text-gray-400 text-sm">Market Open</div></div></div></div></div>'], _tmpl$5$2 = ["<div", ' class="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 p-6"><div class="max-w-6xl mx-auto"><div class="text-center mb-12"><h1 class="text-4xl md:text-6xl font-bold text-white mb-4">About <span class="text-green-400">memestockmarket.fun</span></h1><p class="text-xl text-gray-300 max-w-3xl mx-auto">Where internet culture meets financial innovation. The future of meme trading is here.</p></div><div class="flex flex-wrap justify-center gap-2 mb-8">', '</div><div class="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 shadow-2xl">', '</div><div class="text-center mt-12"><div class="bg-gradient-to-r from-green-600 to-blue-600 p-8 rounded-2xl"><h3 class="text-2xl font-bold text-white mb-4">Ready to Start Trading?</h3><p class="text-gray-200 mb-6">Join thousands of traders and start your meme investment journey today!</p><div class="flex flex-col sm:flex-row gap-4 justify-center"><button class="bg-white text-gray-900 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">Get Started Now</button><button class="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-gray-900 transition-colors">View Live Demo</button></div></div></div></div></div>'], _tmpl$6$2 = ["<button", ' class="', '">', "</button>"];
function About() {
  const [activeSection, setActiveSection] = createSignal("overview");
  const sections = {
    overview: {
      title: "Overview",
      content: ssr(_tmpl$$2, ssrHydrationKey())
    },
    features: {
      title: "Features",
      content: ssr(_tmpl$2$2, ssrHydrationKey())
    },
    howItWorks: {
      title: "How It Works",
      content: ssr(_tmpl$3$2, ssrHydrationKey())
    },
    community: {
      title: "Community",
      content: ssr(_tmpl$4$2, ssrHydrationKey())
    }
  };
  return ssr(_tmpl$5$2, ssrHydrationKey(), escape(Object.entries(sections).map(([key, section]) => ssr(_tmpl$6$2, ssrHydrationKey(), `px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${activeSection() === key ? "bg-blue-600 text-white shadow-lg shadow-blue-600/25" : "bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white"}`, escape(section.title)))), escape(sections[activeSection()].content));
}

var _tmpl$$1 = ["<div", ' class="mt-4 relative"><img', ' alt="Preview" class="max-w-full h-48 object-cover rounded-lg"><button class="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center transition-colors">×</button></div>'], _tmpl$2$1 = ["<div", ' class="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 p-6"><div class="max-w-2xl mx-auto"><div class="text-center mb-8"><h1 class="text-4xl font-bold text-white mb-2">Community Feed</h1><p class="text-gray-300">Share your trading insights and connect with fellow meme investors</p></div><div class="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 mb-6 border border-gray-700/50"><div class="flex items-start space-x-4"><img src="https://api.dicebear.com/7.x/avataaars/svg?seed=You" alt="Your avatar" class="w-12 h-12 rounded-full"><div class="flex-1"><textarea', ` placeholder="What's happening in the meme market?" class="w-full bg-gray-700/50 text-white placeholder-gray-400 rounded-lg p-4 border border-gray-600 focus:border-blue-500 focus:outline-none resize-none" rows="3"></textarea><!--$-->`, '<!--/--><div class="flex items-center justify-between mt-4"><div class="flex items-center space-x-4"><label class="cursor-pointer text-blue-400 hover:text-blue-300 transition-colors"><input type="file" accept="image/*,video/*" class="hidden"><svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg></label><span class="text-gray-400 text-sm">', "</span></div><button", ' class="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white px-6 py-2 rounded-lg font-semibold transition-colors">Post</button></div></div></div></div><div class="space-y-6">', "</div></div></div>"], _tmpl$3$1 = ["<img", ' alt="Post image" class="w-full max-h-96 object-cover rounded-lg mb-4">'], _tmpl$4$1 = ["<div", ' class="mt-4 space-y-3">', "</div>"], _tmpl$5$1 = ["<div", ' class="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50"><div class="flex items-center space-x-3 mb-4"><img', ' alt="', '" class="w-10 h-10 rounded-full"><div class="flex-1"><h3 class="text-white font-semibold">', '</h3><p class="text-gray-400 text-sm">', '</p></div></div><p class="text-gray-200 mb-4 leading-relaxed">', "</p><!--$-->", '<!--/--><div class="flex items-center space-x-6 py-3 border-t border-gray-700"><button class="', '"><svg class="w-5 h-5"', ' stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg><span>', '</span></button><button class="flex items-center space-x-2 text-gray-400 hover:text-blue-500 transition-colors"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg><span>', '</span></button><button class="flex items-center space-x-2 text-gray-400 hover:text-green-500 transition-colors"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"></path></svg><span>Share</span></button></div><!--$-->', '<!--/--><div class="flex items-center space-x-3 mt-4"><img src="https://api.dicebear.com/7.x/avataaars/svg?seed=You" alt="Your avatar" class="w-8 h-8 rounded-full"><div class="flex-1 flex space-x-2"><input type="text"', ' placeholder="Write a comment..." class="flex-1 bg-gray-700/50 text-white placeholder-gray-400 rounded-lg px-4 py-2 border border-gray-600 focus:border-blue-500 focus:outline-none"><button', ' class="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg transition-colors">Post</button></div></div></div>'], _tmpl$6$1 = ["<div", ' class="flex items-start space-x-3 bg-gray-700/30 rounded-lg p-3"><img', ' alt="', '" class="w-8 h-8 rounded-full"><div class="flex-1"><div class="flex items-center space-x-2 mb-1"><span class="text-white font-medium text-sm">', '</span><span class="text-gray-400 text-xs">', '</span></div><p class="text-gray-200 text-sm">', '</p><button class="', '"><svg class="w-4 h-4"', ' stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg><span>', "</span></button></div></div>"];
function Feed() {
  const [posts, setPosts] = createSignal([{
    id: "1",
    author: "MemeTrader_Pro",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=MemeTrader_Pro",
    content: 'Just bought 1000 shares of the "Distracted Boyfriend" meme! 📈 This one is going to the moon! 🚀',
    timestamp: new Date(Date.now() - 1e3 * 60 * 30),
    likes: 42,
    comments: [{
      id: "c1",
      author: "CryptoMemer",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=CryptoMemer",
      content: "Great choice! I've been holding this one for weeks 💎🙌",
      timestamp: new Date(Date.now() - 1e3 * 60 * 15),
      likes: 8,
      isLiked: false
    }],
    isLiked: true
  }, {
    id: "2",
    author: "ViralVestor",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=ViralVestor",
    content: 'New meme alert! 🚨 "Woman Yelling at Cat" just hit the market. Early investors are already seeing 200% gains!',
    image: "https://via.placeholder.com/400x300/1f2937/ffffff?text=Woman+Yelling+at+Cat+Meme",
    timestamp: new Date(Date.now() - 1e3 * 60 * 60 * 2),
    likes: 156,
    comments: [],
    isLiked: false
  }]);
  const [newPostContent, setNewPostContent] = createSignal("");
  const [selectedFile, setSelectedFile] = createSignal(null);
  const [previewUrl, setPreviewUrl] = createSignal(null);
  const [commentInputs, setCommentInputs] = createSignal({});
  const formatTimeAgo = (date) => {
    const now = /* @__PURE__ */ new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1e3);
    if (diffInSeconds < 60) return "just now";
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    return `${Math.floor(diffInSeconds / 86400)}d ago`;
  };
  return ssr(_tmpl$2$1, ssrHydrationKey(), ssrAttribute("value", escape(newPostContent(), true), false), escape(createComponent$1(Show, {
    get when() {
      return previewUrl();
    },
    get children() {
      return ssr(_tmpl$$1, ssrHydrationKey(), ssrAttribute("src", escape(previewUrl(), true), false));
    }
  })), selectedFile() ? escape(selectedFile().name) : "Add photo or video", ssrAttribute("disabled", !newPostContent().trim(), true), escape(createComponent$1(For, {
    get each() {
      return posts();
    },
    children: (post) => ssr(_tmpl$5$1, ssrHydrationKey(), ssrAttribute("src", escape(post.avatar, true), false), `${escape(post.author, true)} avatar`, escape(post.author), escape(formatTimeAgo(post.timestamp)), escape(post.content), escape(createComponent$1(Show, {
      get when() {
        return post.image;
      },
      get children() {
        return ssr(_tmpl$3$1, ssrHydrationKey() + ssrAttribute("src", escape(post.image, true), false));
      }
    })), `flex items-center space-x-2 transition-colors ${post.isLiked ? "text-red-500" : "text-gray-400 hover:text-red-500"}`, ssrAttribute("fill", post.isLiked ? "currentColor" : "none", false), escape(post.likes), escape(post.comments.length), escape(createComponent$1(Show, {
      get when() {
        return post.comments.length > 0;
      },
      get children() {
        return ssr(_tmpl$4$1, ssrHydrationKey(), escape(createComponent$1(For, {
          get each() {
            return post.comments;
          },
          children: (comment) => ssr(_tmpl$6$1, ssrHydrationKey(), ssrAttribute("src", escape(comment.avatar, true), false), `${escape(comment.author, true)} avatar`, escape(comment.author), escape(formatTimeAgo(comment.timestamp)), escape(comment.content), `flex items-center space-x-1 mt-2 text-xs transition-colors ${comment.isLiked ? "text-red-500" : "text-gray-400 hover:text-red-500"}`, ssrAttribute("fill", comment.isLiked ? "currentColor" : "none", false), escape(comment.likes))
        })));
      }
    })), ssrAttribute("value", escape(commentInputs()[post.id], true) || "", false), ssrAttribute("disabled", !commentInputs()[post.id]?.trim(), true))
  })));
}

var _tmpl$ = ["<div", ' class="text-center py-12"><div class="text-6xl mb-4">🔍</div><h3 class="text-2xl font-bold text-white mb-2">No memes found</h3><p class="text-gray-400">Try adjusting your search or filter criteria</p></div>'], _tmpl$2 = ["<div", ' class="text-center mt-12"><button class="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors">Load More Memes</button></div>'], _tmpl$3 = ["<div", ' class="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 p-6"><div class="max-w-7xl mx-auto"><div class="text-center mb-8"><h1 class="text-4xl md:text-5xl font-bold text-white mb-4">Latest <span class="text-green-400">Memes</span></h1><p class="text-xl text-gray-300 max-w-2xl mx-auto">Discover and invest in the hottest memes on the platform. From viral classics to fresh launches.</p></div><div class="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 mb-8 border border-gray-700/50"><div class="flex flex-col lg:flex-row gap-4 items-center justify-between"><div class="relative flex-1 max-w-md"><input type="text"', ' placeholder="Search memes..." class="w-full bg-gray-700/50 text-white placeholder-gray-400 rounded-lg pl-10 pr-4 py-3 border border-gray-600 focus:border-blue-500 focus:outline-none"><svg class="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg></div><div class="flex flex-wrap gap-2"><select', ' class="bg-gray-700 text-white rounded-lg px-4 py-2 border border-gray-600 focus:border-blue-500 focus:outline-none"><option value="all">All Memes</option><option value="hot">🔥 Hot</option><option value="trending">📈 Trending</option></select><select', ' class="bg-gray-700 text-white rounded-lg px-4 py-2 border border-gray-600 focus:border-blue-500 focus:outline-none"><option value="newest">Newest First</option><option value="price">Highest Price</option><option value="volume">Highest Volume</option><option value="marketCap">Highest Market Cap</option></select></div></div></div><div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"><div class="bg-gradient-to-r from-blue-600/20 to-blue-800/20 p-4 rounded-lg border border-blue-500/30"><div class="text-2xl font-bold text-blue-400">', '</div><div class="text-gray-300 text-sm">Total Memes</div></div><div class="bg-gradient-to-r from-green-600/20 to-green-800/20 p-4 rounded-lg border border-green-500/30"><div class="text-2xl font-bold text-green-400">', '</div><div class="text-gray-300 text-sm">Hot Memes</div></div><div class="bg-gradient-to-r from-purple-600/20 to-purple-800/20 p-4 rounded-lg border border-purple-500/30"><div class="text-2xl font-bold text-purple-400">', '</div><div class="text-gray-300 text-sm">Trending</div></div><div class="bg-gradient-to-r from-yellow-600/20 to-yellow-800/20 p-4 rounded-lg border border-yellow-500/30"><div class="text-2xl font-bold text-yellow-400">', '</div><div class="text-gray-300 text-sm">Total Market Cap</div></div></div><div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">', "</div><!--$-->", "<!--/--><!--$-->", "<!--/--></div></div>"], _tmpl$4 = ["<span", ' class="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold flex items-center">🔥 Hot</span>'], _tmpl$5 = ["<span", ' class="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-semibold flex items-center">📈 Trending</span>'], _tmpl$6 = ["<div", ' class="bg-gray-800/50 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300 hover:transform hover:scale-105"><div class="relative"><img', ' class="w-full h-48 object-cover"><div class="absolute top-3 left-3 flex gap-2"><!--$-->', "<!--/--><!--$-->", '<!--/--></div><div class="absolute top-3 right-3"><span class="bg-gray-900/80 text-white px-2 py-1 rounded-full text-xs">', '</span></div></div><div class="p-6"><div class="flex items-center justify-between mb-3"><div><h3 class="text-xl font-bold text-white">', '</h3><p class="text-gray-400 text-sm">$<!--$-->', '<!--/--></p></div><div class="text-right"><div class="text-2xl font-bold text-white">$<!--$-->', '<!--/--></div><div class="', '"><!--$-->', "<!--/--><!--$-->", '<!--/-->%</div></div></div><p class="text-gray-300 text-sm mb-4 line-clamp-2">', '</p><div class="flex flex-wrap gap-1 mb-4">', '</div><div class="grid grid-cols-2 gap-4 mb-4 text-sm"><div><div class="text-gray-400">Market Cap</div><div class="text-white font-semibold">', '</div></div><div><div class="text-gray-400">24h Volume</div><div class="text-white font-semibold">', '</div></div><div><div class="text-gray-400">Holders</div><div class="text-white font-semibold">', '</div></div><div><div class="text-gray-400">Creator</div><div class="text-blue-400 font-semibold">', '</div></div></div><div class="flex gap-2"><button class="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg font-semibold transition-colors">Buy</button><button class="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg font-semibold transition-colors">Sell</button><button class="bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded-lg transition-colors"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg></button></div></div></div>'], _tmpl$7 = ["<span", ' class="bg-blue-600/20 text-blue-300 px-2 py-1 rounded text-xs">#<!--$-->', "<!--/--></span>"];
function Memes() {
  const [memes, setMemes] = createSignal([{
    id: "1",
    name: "Distracted Boyfriend",
    symbol: "DISTRACT",
    image: "https://via.placeholder.com/300x300/3b82f6/ffffff?text=Distracted+Boyfriend",
    description: "The classic meme that started it all. A man looking back at another woman while his girlfriend looks disapproving.",
    currentPrice: 12.45,
    priceChange24h: 15.3,
    marketCap: 245e4,
    volume24h: 125e3,
    holders: 1250,
    launchDate: new Date(Date.now() - 1e3 * 60 * 60 * 24 * 2),
    creator: "MemeKing2024",
    tags: ["classic", "relationship", "viral"],
    isHot: true,
    isTrending: true
  }, {
    id: "2",
    name: "Woman Yelling at Cat",
    symbol: "YELLCAT",
    image: "https://via.placeholder.com/300x300/10b981/ffffff?text=Woman+Yelling+Cat",
    description: "The perfect reaction meme featuring a woman yelling and a confused white cat at a dinner table.",
    currentPrice: 8.92,
    priceChange24h: -5.7,
    marketCap: 178e4,
    volume24h: 89e3,
    holders: 890,
    launchDate: new Date(Date.now() - 1e3 * 60 * 60 * 24 * 5),
    creator: "CatMemeQueen",
    tags: ["reaction", "cat", "dinner"],
    isHot: false,
    isTrending: true
  }, {
    id: "3",
    name: "Drake Pointing",
    symbol: "DRAKE",
    image: "https://via.placeholder.com/300x300/f59e0b/ffffff?text=Drake+Pointing",
    description: "Drake disapproving of one thing and approving of another. The ultimate choice meme.",
    currentPrice: 15.67,
    priceChange24h: 8.2,
    marketCap: 3134e3,
    volume24h: 156e3,
    holders: 1567,
    launchDate: new Date(Date.now() - 1e3 * 60 * 60 * 24 * 1),
    creator: "DrakeMemeLord",
    tags: ["choice", "drake", "approval"],
    isHot: true,
    isTrending: false
  }, {
    id: "4",
    name: "This is Fine Dog",
    symbol: "FINE",
    image: "https://via.placeholder.com/300x300/ef4444/ffffff?text=This+Is+Fine",
    description: 'A dog sitting in a burning room saying "This is fine". Perfect for chaotic situations.',
    currentPrice: 6.33,
    priceChange24h: -12.1,
    marketCap: 1266e3,
    volume24h: 63e3,
    holders: 633,
    launchDate: new Date(Date.now() - 1e3 * 60 * 60 * 24 * 7),
    creator: "ChaosTrader",
    tags: ["chaos", "dog", "fire"],
    isHot: false,
    isTrending: false
  }, {
    id: "5",
    name: "Expanding Brain",
    symbol: "BRAIN",
    image: "https://via.placeholder.com/300x300/8b5cf6/ffffff?text=Expanding+Brain",
    description: "Four panels showing increasingly enlightened thoughts. The evolution of intelligence meme.",
    currentPrice: 9.78,
    priceChange24h: 22.5,
    marketCap: 1956e3,
    volume24h: 97e3,
    holders: 978,
    launchDate: new Date(Date.now() - 1e3 * 60 * 60 * 24 * 3),
    creator: "BigBrainInvestor",
    tags: ["intelligence", "evolution", "enlightenment"],
    isHot: true,
    isTrending: true
  }]);
  const [sortBy, setSortBy] = createSignal("newest");
  const [filterBy, setFilterBy] = createSignal("all");
  const [searchQuery, setSearchQuery] = createSignal("");
  const filteredAndSortedMemes = () => {
    let filtered = memes();
    const query = searchQuery().toLowerCase();
    if (query) {
      filtered = filtered.filter((meme) => meme.name.toLowerCase().includes(query) || meme.symbol.toLowerCase().includes(query) || meme.description.toLowerCase().includes(query) || meme.tags.some((tag) => tag.toLowerCase().includes(query)));
    }
    const filter = filterBy();
    if (filter === "hot") {
      filtered = filtered.filter((meme) => meme.isHot);
    } else if (filter === "trending") {
      filtered = filtered.filter((meme) => meme.isTrending);
    }
    const sort = sortBy();
    filtered.sort((a, b) => {
      switch (sort) {
        case "newest":
          return b.launchDate.getTime() - a.launchDate.getTime();
        case "price":
          return b.currentPrice - a.currentPrice;
        case "volume":
          return b.volume24h - a.volume24h;
        case "marketCap":
          return b.marketCap - a.marketCap;
        default:
          return 0;
      }
    });
    return filtered;
  };
  const formatNumber = (num) => {
    if (num >= 1e6) {
      return `$${(num / 1e6).toFixed(1)}M`;
    } else if (num >= 1e3) {
      return `$${(num / 1e3).toFixed(1)}K`;
    }
    return `$${num.toFixed(2)}`;
  };
  const formatTimeAgo = (date) => {
    const now = /* @__PURE__ */ new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1e3 * 60 * 60));
    if (diffInHours < 24) {
      return `${diffInHours}h ago`;
    }
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays}d ago`;
  };
  return ssr(_tmpl$3, ssrHydrationKey(), ssrAttribute("value", escape(searchQuery(), true), false), ssrAttribute("value", escape(filterBy(), true), false), ssrAttribute("value", escape(sortBy(), true), false), escape(memes().length), escape(memes().filter((m) => m.isHot).length), escape(memes().filter((m) => m.isTrending).length), escape(formatNumber(memes().reduce((sum, meme) => sum + meme.marketCap, 0))), escape(createComponent$1(For, {
    get each() {
      return filteredAndSortedMemes();
    },
    children: (meme) => ssr(_tmpl$6, ssrHydrationKey(), ssrAttribute("src", escape(meme.image, true), false) + ssrAttribute("alt", escape(meme.name, true), false), escape(createComponent$1(Show, {
      get when() {
        return meme.isHot;
      },
      get children() {
        return ssr(_tmpl$4, ssrHydrationKey());
      }
    })), escape(createComponent$1(Show, {
      get when() {
        return meme.isTrending;
      },
      get children() {
        return ssr(_tmpl$5, ssrHydrationKey());
      }
    })), escape(formatTimeAgo(meme.launchDate)), escape(meme.name), escape(meme.symbol), escape(meme.currentPrice), `text-sm font-semibold ${meme.priceChange24h >= 0 ? "text-green-400" : "text-red-400"}`, meme.priceChange24h >= 0 ? "+" : "", escape(meme.priceChange24h.toFixed(1)), escape(meme.description), escape(createComponent$1(For, {
      get each() {
        return meme.tags;
      },
      children: (tag) => ssr(_tmpl$7, ssrHydrationKey(), escape(tag))
    })), escape(formatNumber(meme.marketCap)), escape(formatNumber(meme.volume24h)), escape(meme.holders.toLocaleString()), escape(meme.creator))
  })), escape(createComponent$1(Show, {
    get when() {
      return filteredAndSortedMemes().length === 0;
    },
    get children() {
      return ssr(_tmpl$, ssrHydrationKey());
    }
  })), escape(createComponent$1(Show, {
    get when() {
      return filteredAndSortedMemes().length > 0;
    },
    get children() {
      return ssr(_tmpl$2, ssrHydrationKey());
    }
  })));
}

const $$Index = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "$mememarket - Meme Stock Market", "description": "Welcome to the stock market for memes!", "keywords": "mememarket, meme, stock market, cryptocurrency", "canonicalURL": "https:///", "robots": "index, follow", "data-astro-cid-j7pv25f6": true }, { "default": ($$result2) => renderTemplate`  ${renderComponent($$result2, "IntroScreen", $$IntroScreen, { "data-astro-cid-j7pv25f6": true })} ${maybeRenderHead()}<main class="min-h-screen flex flex-col items-center justify-between relative overflow-hidden bg-gradient-to-b from-blue-900 to-blue-700" data-astro-cid-j7pv25f6> <!-- Background Video --> <div class="fixed inset-0 z-0 overflow-hidden" data-astro-cid-j7pv25f6> <video autoplay loop muted playsinline class="absolute inset-0 w-full h-full object-cover opacity-15" data-astro-cid-j7pv25f6> <source src="/bg.MP4" type="video/mp4" data-astro-cid-j7pv25f6> </video> </div> <!-- Audio Player (Hidden) --> <audio id="background-music" loop data-astro-cid-j7pv25f6> <source src="/tecno.mp3" type="audio/mp3" data-astro-cid-j7pv25f6> </audio> <!-- Sound Toggle Button --> <button id="sound-toggle" class="fixed top-4 right-4 z-40 bg-blue-600 hover:bg-blue-500 text-white p-2 rounded-full" data-astro-cid-j7pv25f6> <svg xmlns="http://www.w3.org/2000/svg" id="sound-on-icon" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-astro-cid-j7pv25f6> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.536 8.464a5 5 0 010 7.072M17.95 6.05a8 8 0 010 11.9M6.5 8.5l4-4v15l-4-4H3a1 1 0 01-1-1v-5a1 1 0 011-1h3.5z" data-astro-cid-j7pv25f6></path> </svg> <svg xmlns="http://www.w3.org/2000/svg" id="sound-off-icon" class="h-6 w-6 hidden" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-astro-cid-j7pv25f6> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" data-astro-cid-j7pv25f6></path> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" data-astro-cid-j7pv25f6></path> </svg> </button> <!-- Header with Navigation --> <header class="w-full bg-blue-800 text-white py-4 z-10 border-b border-blue-600" data-astro-cid-j7pv25f6> <div class="container mx-auto flex justify-between items-center px-4" data-astro-cid-j7pv25f6> <div class="flex items-center" data-astro-cid-j7pv25f6> <h1 class="text-2xl font-bold text-white" data-astro-cid-j7pv25f6>memestockmarket<span class="text-green-400" data-astro-cid-j7pv25f6>.fun</span></h1> </div> <div data-astro-cid-j7pv25f6> ${renderComponent($$result2, "AuthButtons", AuthButtons, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/Users/joaquinmzumelzu/Desktop/Programming/memecoin/lolzzz/src/components/auth/AuthButtons.tsx", "client:component-export": "default", "data-astro-cid-j7pv25f6": true })} </div> </div> <!-- Navigation Menu --> <nav class="container mx-auto mt-4 px-4" data-astro-cid-j7pv25f6> <ul class="flex space-x-4 overflow-x-auto pb-2" data-astro-cid-j7pv25f6> <li data-astro-cid-j7pv25f6><a href="#" id="nav-home" class="nav-link text-white hover:text-blue-300 px-4 py-2 bg-blue-700 rounded" data-astro-cid-j7pv25f6>HOME</a></li> <li data-astro-cid-j7pv25f6><a href="#" id="nav-about" class="nav-link text-white hover:text-blue-300 px-4 py-2" data-astro-cid-j7pv25f6>ABOUT</a></li> <li data-astro-cid-j7pv25f6><a href="#" id="nav-feed" class="nav-link text-white hover:text-blue-300 px-4 py-2" data-astro-cid-j7pv25f6>FEED</a></li> <li data-astro-cid-j7pv25f6><a href="#" id="nav-memes" class="nav-link text-white hover:text-blue-300 px-4 py-2" data-astro-cid-j7pv25f6>MEMES</a></li> </ul> </nav> </header> <!-- Top Ticker --> <div class="w-full bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 overflow-hidden py-2 border-b border-blue-600 z-10" data-astro-cid-j7pv25f6> <div class="ticker-container" data-astro-cid-j7pv25f6> <div class="ticker-content ticker-left" data-astro-cid-j7pv25f6> <span class="ticker-item" data-astro-cid-j7pv25f6>LZI: <span class="text-green-400" data-astro-cid-j7pv25f6>5,299.10</span> <span class="text-green-400" data-astro-cid-j7pv25f6>▲ 0.37%</span></span> <span class="ticker-item" data-astro-cid-j7pv25f6>DMI: <span class="text-green-400" data-astro-cid-j7pv25f6>442.42</span> <span class="text-green-400" data-astro-cid-j7pv25f6>▲ 1.57%</span></span> <span class="ticker-item" data-astro-cid-j7pv25f6>GRB: <span class="text-green-400" data-astro-cid-j7pv25f6>12.12</span> <span class="text-green-400" data-astro-cid-j7pv25f6>▲ 0%</span></span> <span class="ticker-item" data-astro-cid-j7pv25f6>STAB: <span class="text-green-400" data-astro-cid-j7pv25f6>106.06</span> <span class="text-green-400" data-astro-cid-j7pv25f6>▲ 0%</span></span> <span class="ticker-item" data-astro-cid-j7pv25f6>CUTE: <span class="text-green-400" data-astro-cid-j7pv25f6>701.10</span> <span class="text-green-400" data-astro-cid-j7pv25f6>▲ 0%</span></span> <span class="ticker-item" data-astro-cid-j7pv25f6>LZI: <span class="text-green-400" data-astro-cid-j7pv25f6>5,299.10</span> <span class="text-green-400" data-astro-cid-j7pv25f6>▲ 0.37%</span></span> <span class="ticker-item" data-astro-cid-j7pv25f6>DMI: <span class="text-green-400" data-astro-cid-j7pv25f6>442.42</span> <span class="text-green-400" data-astro-cid-j7pv25f6>▲ 1.57%</span></span> <span class="ticker-item" data-astro-cid-j7pv25f6>GRB: <span class="text-green-400" data-astro-cid-j7pv25f6>12.12</span> <span class="text-green-400" data-astro-cid-j7pv25f6>▲ 0%</span></span> <span class="ticker-item" data-astro-cid-j7pv25f6>STAB: <span class="text-green-400" data-astro-cid-j7pv25f6>106.06</span> <span class="text-green-400" data-astro-cid-j7pv25f6>▲ 0%</span></span> <span class="ticker-item" data-astro-cid-j7pv25f6>CUTE: <span class="text-green-400" data-astro-cid-j7pv25f6>701.10</span> <span class="text-green-400" data-astro-cid-j7pv25f6>▲ 0%</span></span> </div> </div> </div> <!-- About Section --> <div id="about-section" class="content-section hidden" data-astro-cid-j7pv25f6> ${renderComponent($$result2, "About", About, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/Users/joaquinmzumelzu/Desktop/Programming/memecoin/lolzzz/src/components/About.tsx", "client:component-export": "default", "data-astro-cid-j7pv25f6": true })} </div> <!-- Feed Section --> <div id="feed-section" class="content-section hidden" data-astro-cid-j7pv25f6> ${renderComponent($$result2, "Feed", Feed, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/Users/joaquinmzumelzu/Desktop/Programming/memecoin/lolzzz/src/components/Feed.tsx", "client:component-export": "default", "data-astro-cid-j7pv25f6": true })} </div> <!-- Memes Section --> <div id="memes-section" class="content-section hidden" data-astro-cid-j7pv25f6> ${renderComponent($$result2, "Memes", Memes, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/Users/joaquinmzumelzu/Desktop/Programming/memecoin/lolzzz/src/components/Memes.tsx", "client:component-export": "default", "data-astro-cid-j7pv25f6": true })} </div> <!-- Content Sections --> <div id="content-container" class="flex-1 w-full z-10" data-astro-cid-j7pv25f6> <!-- Home Section --> <div id="home-section" class="content-section" data-astro-cid-j7pv25f6> <!-- Welcome Message --> <div class="container mx-auto px-4 py-4" data-astro-cid-j7pv25f6> <h2 class="text-xl text-white" data-astro-cid-j7pv25f6>Welcome to the stock market for memes!</h2> <!-- Social Icons --> <div class="flex space-x-4 mt-4" data-astro-cid-j7pv25f6> <a href="#" class="bg-[#5865F2] p-2 rounded" data-astro-cid-j7pv25f6> <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" data-astro-cid-j7pv25f6> <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" data-astro-cid-j7pv25f6></path> </svg> </a> <a href="#" class="bg-[#1DA1F2] p-2 rounded" data-astro-cid-j7pv25f6> <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" data-astro-cid-j7pv25f6> <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" data-astro-cid-j7pv25f6></path> </svg> </a> <a href="#" class="bg-green-600 p-2 rounded" data-astro-cid-j7pv25f6> <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" data-astro-cid-j7pv25f6> <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-5-9h10v2H7z" data-astro-cid-j7pv25f6></path> </svg> </a> <a href="#" class="bg-green-600 p-2 rounded" data-astro-cid-j7pv25f6> <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" data-astro-cid-j7pv25f6> <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" data-astro-cid-j7pv25f6></path> </svg> </a> </div> </div> <!-- Main Title --> <div class="text-center py-6" data-astro-cid-j7pv25f6> <h1 class="text-5xl md:text-7xl font-bold text-white mb-2 glow-text" data-astro-cid-j7pv25f6>MEME STOCK MARKET</h1> <h2 class="text-3xl md:text-4xl font-bold text-green-400 glow-text-green" data-astro-cid-j7pv25f6>$mememarket</h2> </div> <!-- Meme Grid --> <div class="container mx-auto px-4 py-8" data-astro-cid-j7pv25f6> <div class="bg-blue-800 rounded-lg p-4 mb-6" data-astro-cid-j7pv25f6> <h3 class="text-white text-xl mb-4" data-astro-cid-j7pv25f6>Recent Activity</h3> <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-7 gap-4" data-astro-cid-j7pv25f6> <a href="#" class="bg-blue-700 hover:bg-blue-600 text-white text-center py-2 rounded-lg" data-astro-cid-j7pv25f6>All</a> <a href="#" class="bg-blue-700 hover:bg-blue-600 text-white text-center py-2 rounded-lg" data-astro-cid-j7pv25f6>Created Order</a> <a href="#" class="bg-blue-700 hover:bg-blue-600 text-white text-center py-2 rounded-lg" data-astro-cid-j7pv25f6>Order Fulfilled</a> <a href="#" class="bg-blue-700 hover:bg-blue-600 text-white text-center py-2 rounded-lg" data-astro-cid-j7pv25f6>Tokens Applied</a> <a href="#" class="bg-blue-700 hover:bg-blue-600 text-white text-center py-2 rounded-lg" data-astro-cid-j7pv25f6>Meme Liked</a> <a href="#" class="bg-blue-700 hover:bg-blue-600 text-white text-center py-2 rounded-lg" data-astro-cid-j7pv25f6>Meme Created</a> <a href="#" class="bg-blue-700 hover:bg-blue-600 text-white text-center py-2 rounded-lg" data-astro-cid-j7pv25f6>New User</a> </div> </div> <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6" data-astro-cid-j7pv25f6> <!-- Meme Card 1 --> <div class="bg-blue-800 rounded-lg overflow-hidden shadow-lg" data-astro-cid-j7pv25f6> <div class="p-2 bg-blue-700" data-astro-cid-j7pv25f6> <img src="https://via.placeholder.com/300x300/2563eb/ffffff?text=Meme+1" alt="Meme 1" class="w-full h-48 object-cover rounded" data-astro-cid-j7pv25f6> </div> <div class="p-4" data-astro-cid-j7pv25f6> <div class="flex justify-between items-center" data-astro-cid-j7pv25f6> <span class="text-white" data-astro-cid-j7pv25f6>Sold: 10 at $0.56</span> <div class="bg-green-600 rounded-full w-8 h-8 flex items-center justify-center" data-astro-cid-j7pv25f6> <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" data-astro-cid-j7pv25f6> <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" data-astro-cid-j7pv25f6></path> </svg> </div> </div> </div> </div> <!-- Meme Card 2 --> <div class="bg-blue-800 rounded-lg overflow-hidden shadow-lg" data-astro-cid-j7pv25f6> <div class="p-2 bg-blue-700" data-astro-cid-j7pv25f6> <img src="https://via.placeholder.com/300x300/2563eb/ffffff?text=Meme+2" alt="Meme 2" class="w-full h-48 object-cover rounded" data-astro-cid-j7pv25f6> </div> <div class="p-4" data-astro-cid-j7pv25f6> <div class="flex justify-between items-center" data-astro-cid-j7pv25f6> <span class="text-white" data-astro-cid-j7pv25f6>Sold: 200 at $2.00</span> <div class="bg-green-600 rounded-full w-8 h-8 flex items-center justify-center" data-astro-cid-j7pv25f6> <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" data-astro-cid-j7pv25f6> <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" data-astro-cid-j7pv25f6></path> </svg> </div> </div> </div> </div> <!-- Meme Card 3 --> <div class="bg-blue-800 rounded-lg overflow-hidden shadow-lg" data-astro-cid-j7pv25f6> <div class="p-2 bg-blue-700" data-astro-cid-j7pv25f6> <img src="https://via.placeholder.com/300x300/2563eb/ffffff?text=Meme+3" alt="Meme 3" class="w-full h-48 object-cover rounded" data-astro-cid-j7pv25f6> </div> <div class="p-4" data-astro-cid-j7pv25f6> <div class="flex justify-between items-center" data-astro-cid-j7pv25f6> <span class="text-white" data-astro-cid-j7pv25f6>Sold: 2000 at $0.56</span> <div class="bg-red-600 rounded-full w-8 h-8 flex items-center justify-center" data-astro-cid-j7pv25f6> <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" data-astro-cid-j7pv25f6> <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" data-astro-cid-j7pv25f6></path> </svg> </div> </div> </div> </div> <!-- Meme Card 4 --> <div class="bg-blue-800 rounded-lg overflow-hidden shadow-lg" data-astro-cid-j7pv25f6> <div class="p-2 bg-blue-700" data-astro-cid-j7pv25f6> <img src="https://via.placeholder.com/300x300/2563eb/ffffff?text=Meme+4" alt="Meme 4" class="w-full h-48 object-cover rounded" data-astro-cid-j7pv25f6> </div> <div class="p-4" data-astro-cid-j7pv25f6> <div class="flex justify-between items-center" data-astro-cid-j7pv25f6> <span class="text-white" data-astro-cid-j7pv25f6>Sold: 10 at $0.56</span> <div class="bg-green-600 rounded-full w-8 h-8 flex items-center justify-center" data-astro-cid-j7pv25f6> <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" data-astro-cid-j7pv25f6> <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" data-astro-cid-j7pv25f6></path> </svg> </div> </div> </div> </div> </div> </div> <!-- Bottom Ticker --> <div class="w-full bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 overflow-hidden py-2 border-t border-blue-600 z-10 mt-auto" data-astro-cid-j7pv25f6> <div class="ticker-container" data-astro-cid-j7pv25f6> <div class="ticker-content ticker-right" data-astro-cid-j7pv25f6> <span class="ticker-item" data-astro-cid-j7pv25f6>LZI: <span class="text-green-400" data-astro-cid-j7pv25f6>5,299.10</span> <span class="text-green-400" data-astro-cid-j7pv25f6>▲ 0.37%</span></span> <span class="ticker-item" data-astro-cid-j7pv25f6>DMI: <span class="text-green-400" data-astro-cid-j7pv25f6>442.42</span> <span class="text-green-400" data-astro-cid-j7pv25f6>▲ 1.57%</span></span> <span class="ticker-item" data-astro-cid-j7pv25f6>GRB: <span class="text-green-400" data-astro-cid-j7pv25f6>12.12</span> <span class="text-green-400" data-astro-cid-j7pv25f6>▲ 0%</span></span> <span class="ticker-item" data-astro-cid-j7pv25f6>STAB: <span class="text-green-400" data-astro-cid-j7pv25f6>106.06</span> <span class="text-green-400" data-astro-cid-j7pv25f6>▲ 0%</span></span> <span class="ticker-item" data-astro-cid-j7pv25f6>CUTE: <span class="text-green-400" data-astro-cid-j7pv25f6>701.10</span> <span class="text-green-400" data-astro-cid-j7pv25f6>▲ 0%</span></span> <span class="ticker-item" data-astro-cid-j7pv25f6>LZI: <span class="text-green-400" data-astro-cid-j7pv25f6>5,299.10</span> <span class="text-green-400" data-astro-cid-j7pv25f6>▲ 0.37%</span></span> <span class="ticker-item" data-astro-cid-j7pv25f6>DMI: <span class="text-green-400" data-astro-cid-j7pv25f6>442.42</span> <span class="text-green-400" data-astro-cid-j7pv25f6>▲ 1.57%</span></span> <span class="ticker-item" data-astro-cid-j7pv25f6>GRB: <span class="text-green-400" data-astro-cid-j7pv25f6>12.12</span> <span class="text-green-400" data-astro-cid-j7pv25f6>▲ 0%</span></span> <span class="ticker-item" data-astro-cid-j7pv25f6>STAB: <span class="text-green-400" data-astro-cid-j7pv25f6>106.06</span> <span class="text-green-400" data-astro-cid-j7pv25f6>▲ 0%</span></span> <span class="ticker-item" data-astro-cid-j7pv25f6>CUTE: <span class="text-green-400" data-astro-cid-j7pv25f6>701.10</span> <span class="text-green-400" data-astro-cid-j7pv25f6>▲ 0%</span></span> </div> </div> </div> <!-- Footer --> <footer class="w-full bg-blue-900 text-white py-4 text-center z-10 border-t border-blue-700" data-astro-cid-j7pv25f6> <p data-astro-cid-j7pv25f6> 2025 memestockmarket.fun - The Meme Stock Market</p> <p class="text-sm text-blue-400" data-astro-cid-j7pv25f6>See All Indexes</p> </footer> </div></div></main>   ` })}`;
}, "/Users/joaquinmzumelzu/Desktop/Programming/memecoin/lolzzz/src/pages/index.astro", undefined);

const $$file = "/Users/joaquinmzumelzu/Desktop/Programming/memecoin/lolzzz/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
