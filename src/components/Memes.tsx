import { createSignal, createEffect, For, Show } from 'solid-js'

interface Meme {
  id: string
  name: string
  symbol: string
  image: string
  description: string
  currentPrice: number
  priceChange24h: number
  marketCap: number
  volume24h: number
  holders: number
  launchDate: Date
  creator: string
  tags: string[]
  isHot: boolean
  isTrending: boolean
}

export default function Memes() {
  const [memes, setMemes] = createSignal<Meme[]>([
    {
      id: '1',
      name: 'Distracted Boyfriend',
      symbol: 'DISTRACT',
      image: 'https://via.placeholder.com/300x300/3b82f6/ffffff?text=Distracted+Boyfriend',
      description: 'The classic meme that started it all. A man looking back at another woman while his girlfriend looks disapproving.',
      currentPrice: 12.45,
      priceChange24h: 15.3,
      marketCap: 2450000,
      volume24h: 125000,
      holders: 1250,
      launchDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2),
      creator: 'MemeKing2024',
      tags: ['classic', 'relationship', 'viral'],
      isHot: true,
      isTrending: true
    },
    {
      id: '2',
      name: 'Woman Yelling at Cat',
      symbol: 'YELLCAT',
      image: 'https://via.placeholder.com/300x300/10b981/ffffff?text=Woman+Yelling+Cat',
      description: 'The perfect reaction meme featuring a woman yelling and a confused white cat at a dinner table.',
      currentPrice: 8.92,
      priceChange24h: -5.7,
      marketCap: 1780000,
      volume24h: 89000,
      holders: 890,
      launchDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5),
      creator: 'CatMemeQueen',
      tags: ['reaction', 'cat', 'dinner'],
      isHot: false,
      isTrending: true
    },
    {
      id: '3',
      name: 'Drake Pointing',
      symbol: 'DRAKE',
      image: 'https://via.placeholder.com/300x300/f59e0b/ffffff?text=Drake+Pointing',
      description: 'Drake disapproving of one thing and approving of another. The ultimate choice meme.',
      currentPrice: 15.67,
      priceChange24h: 8.2,
      marketCap: 3134000,
      volume24h: 156000,
      holders: 1567,
      launchDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1),
      creator: 'DrakeMemeLord',
      tags: ['choice', 'drake', 'approval'],
      isHot: true,
      isTrending: false
    },
    {
      id: '4',
      name: 'This is Fine Dog',
      symbol: 'FINE',
      image: 'https://via.placeholder.com/300x300/ef4444/ffffff?text=This+Is+Fine',
      description: 'A dog sitting in a burning room saying "This is fine". Perfect for chaotic situations.',
      currentPrice: 6.33,
      priceChange24h: -12.1,
      marketCap: 1266000,
      volume24h: 63000,
      holders: 633,
      launchDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7),
      creator: 'ChaosTrader',
      tags: ['chaos', 'dog', 'fire'],
      isHot: false,
      isTrending: false
    },
    {
      id: '5',
      name: 'Expanding Brain',
      symbol: 'BRAIN',
      image: 'https://via.placeholder.com/300x300/8b5cf6/ffffff?text=Expanding+Brain',
      description: 'Four panels showing increasingly enlightened thoughts. The evolution of intelligence meme.',
      currentPrice: 9.78,
      priceChange24h: 22.5,
      marketCap: 1956000,
      volume24h: 97000,
      holders: 978,
      launchDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3),
      creator: 'BigBrainInvestor',
      tags: ['intelligence', 'evolution', 'enlightenment'],
      isHot: true,
      isTrending: true
    }
  ])

  const [sortBy, setSortBy] = createSignal<'newest' | 'price' | 'volume' | 'marketCap'>('newest')
  const [filterBy, setFilterBy] = createSignal<'all' | 'hot' | 'trending'>('all')
  const [searchQuery, setSearchQuery] = createSignal('')

  const filteredAndSortedMemes = () => {
    let filtered = memes()

    // Apply search filter
    const query = searchQuery().toLowerCase()
    if (query) {
      filtered = filtered.filter(meme => 
        meme.name.toLowerCase().includes(query) ||
        meme.symbol.toLowerCase().includes(query) ||
        meme.description.toLowerCase().includes(query) ||
        meme.tags.some(tag => tag.toLowerCase().includes(query))
      )
    }

    // Apply category filter
    const filter = filterBy()
    if (filter === 'hot') {
      filtered = filtered.filter(meme => meme.isHot)
    } else if (filter === 'trending') {
      filtered = filtered.filter(meme => meme.isTrending)
    }

    // Apply sorting
    const sort = sortBy()
    filtered.sort((a, b) => {
      switch (sort) {
        case 'newest':
          return b.launchDate.getTime() - a.launchDate.getTime()
        case 'price':
          return b.currentPrice - a.currentPrice
        case 'volume':
          return b.volume24h - a.volume24h
        case 'marketCap':
          return b.marketCap - a.marketCap
        default:
          return 0
      }
    })

    return filtered
  }

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return `$${(num / 1000000).toFixed(1)}M`
    } else if (num >= 1000) {
      return `$${(num / 1000).toFixed(1)}K`
    }
    return `$${num.toFixed(2)}`
  }

  const formatTimeAgo = (date: Date) => {
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))
    
    if (diffInHours < 24) {
      return `${diffInHours}h ago`
    }
    const diffInDays = Math.floor(diffInHours / 24)
    return `${diffInDays}d ago`
  }

  return (
    <div class="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 p-6">
      <div class="max-w-7xl mx-auto">
        {/* Header */}
        <div class="text-center mb-8">
          <h1 class="text-4xl md:text-5xl font-bold text-white mb-4">
            Latest <span class="text-green-400">Memes</span>
          </h1>
          <p class="text-xl text-gray-300 max-w-2xl mx-auto">
            Discover and invest in the hottest memes on the platform. From viral classics to fresh launches.
          </p>
        </div>

        {/* Controls */}
        <div class="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 mb-8 border border-gray-700/50">
          <div class="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div class="relative flex-1 max-w-md">
              <input
                type="text"
                value={searchQuery()}
                onInput={(e) => setSearchQuery(e.target.value)}
                placeholder="Search memes..."
                class="w-full bg-gray-700/50 text-white placeholder-gray-400 rounded-lg pl-10 pr-4 py-3 border border-gray-600 focus:border-blue-500 focus:outline-none"
              />
              <svg class="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>

            {/* Filters */}
            <div class="flex flex-wrap gap-2">
              <select
                value={filterBy()}
                onChange={(e) => setFilterBy(e.target.value as any)}
                class="bg-gray-700 text-white rounded-lg px-4 py-2 border border-gray-600 focus:border-blue-500 focus:outline-none"
              >
                <option value="all">All Memes</option>
                <option value="hot">🔥 Hot</option>
                <option value="trending">📈 Trending</option>
              </select>

              <select
                value={sortBy()}
                onChange={(e) => setSortBy(e.target.value as any)}
                class="bg-gray-700 text-white rounded-lg px-4 py-2 border border-gray-600 focus:border-blue-500 focus:outline-none"
              >
                <option value="newest">Newest First</option>
                <option value="price">Highest Price</option>
                <option value="volume">Highest Volume</option>
                <option value="marketCap">Highest Market Cap</option>
              </select>
            </div>
          </div>
        </div>

        {/* Stats Bar */}
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div class="bg-gradient-to-r from-blue-600/20 to-blue-800/20 p-4 rounded-lg border border-blue-500/30">
            <div class="text-2xl font-bold text-blue-400">{memes().length}</div>
            <div class="text-gray-300 text-sm">Total Memes</div>
          </div>
          <div class="bg-gradient-to-r from-green-600/20 to-green-800/20 p-4 rounded-lg border border-green-500/30">
            <div class="text-2xl font-bold text-green-400">{memes().filter(m => m.isHot).length}</div>
            <div class="text-gray-300 text-sm">Hot Memes</div>
          </div>
          <div class="bg-gradient-to-r from-purple-600/20 to-purple-800/20 p-4 rounded-lg border border-purple-500/30">
            <div class="text-2xl font-bold text-purple-400">{memes().filter(m => m.isTrending).length}</div>
            <div class="text-gray-300 text-sm">Trending</div>
          </div>
          <div class="bg-gradient-to-r from-yellow-600/20 to-yellow-800/20 p-4 rounded-lg border border-yellow-500/30">
            <div class="text-2xl font-bold text-yellow-400">
              {formatNumber(memes().reduce((sum, meme) => sum + meme.marketCap, 0))}
            </div>
            <div class="text-gray-300 text-sm">Total Market Cap</div>
          </div>
        </div>

        {/* Memes Grid */}
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <For each={filteredAndSortedMemes()}>
            {(meme) => (
              <div class="bg-gray-800/50 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300 hover:transform hover:scale-105">
                {/* Meme Image */}
                <div class="relative">
                  <img 
                    src={meme.image} 
                    alt={meme.name} 
                    class="w-full h-48 object-cover"
                  />
                  <div class="absolute top-3 left-3 flex gap-2">
                    <Show when={meme.isHot}>
                      <span class="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold flex items-center">
                        🔥 Hot
                      </span>
                    </Show>
                    <Show when={meme.isTrending}>
                      <span class="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-semibold flex items-center">
                        📈 Trending
                      </span>
                    </Show>
                  </div>
                  <div class="absolute top-3 right-3">
                    <span class="bg-gray-900/80 text-white px-2 py-1 rounded-full text-xs">
                      {formatTimeAgo(meme.launchDate)}
                    </span>
                  </div>
                </div>

                {/* Meme Info */}
                <div class="p-6">
                  <div class="flex items-center justify-between mb-3">
                    <div>
                      <h3 class="text-xl font-bold text-white">{meme.name}</h3>
                      <p class="text-gray-400 text-sm">${meme.symbol}</p>
                    </div>
                    <div class="text-right">
                      <div class="text-2xl font-bold text-white">${meme.currentPrice}</div>
                      <div class={`text-sm font-semibold ${
                        meme.priceChange24h >= 0 ? 'text-green-400' : 'text-red-400'
                      }`}>
                        {meme.priceChange24h >= 0 ? '+' : ''}{meme.priceChange24h.toFixed(1)}%
                      </div>
                    </div>
                  </div>

                  <p class="text-gray-300 text-sm mb-4 line-clamp-2">{meme.description}</p>

                  {/* Tags */}
                  <div class="flex flex-wrap gap-1 mb-4">
                    <For each={meme.tags}>
                      {(tag) => (
                        <span class="bg-blue-600/20 text-blue-300 px-2 py-1 rounded text-xs">
                          #{tag}
                        </span>
                      )}
                    </For>
                  </div>

                  {/* Stats */}
                  <div class="grid grid-cols-2 gap-4 mb-4 text-sm">
                    <div>
                      <div class="text-gray-400">Market Cap</div>
                      <div class="text-white font-semibold">{formatNumber(meme.marketCap)}</div>
                    </div>
                    <div>
                      <div class="text-gray-400">24h Volume</div>
                      <div class="text-white font-semibold">{formatNumber(meme.volume24h)}</div>
                    </div>
                    <div>
                      <div class="text-gray-400">Holders</div>
                      <div class="text-white font-semibold">{meme.holders.toLocaleString()}</div>
                    </div>
                    <div>
                      <div class="text-gray-400">Creator</div>
                      <div class="text-blue-400 font-semibold">{meme.creator}</div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div class="flex gap-2">
                    <button class="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg font-semibold transition-colors">
                      Buy
                    </button>
                    <button class="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg font-semibold transition-colors">
                      Sell
                    </button>
                    <button class="bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded-lg transition-colors">
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </For>
        </div>

        {/* Empty State */}
        <Show when={filteredAndSortedMemes().length === 0}>
          <div class="text-center py-12">
            <div class="text-6xl mb-4">🔍</div>
            <h3 class="text-2xl font-bold text-white mb-2">No memes found</h3>
            <p class="text-gray-400">Try adjusting your search or filter criteria</p>
          </div>
        </Show>

        {/* Load More */}
        <Show when={filteredAndSortedMemes().length > 0}>
          <div class="text-center mt-12">
            <button class="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
              Load More Memes
            </button>
          </div>
        </Show>
      </div>
    </div>
  )
}