import { useState, useRef, useEffect } from 'react';
import { DISCORD_CHANNELS } from '../data/communityData';
import { Mic, MicOff, Headphones, Coffee, Sparkles, ChevronDown, Send } from 'lucide-react';

interface ChatMessage {
  id: string;
  user: string;
  avatarBg: string;
  text: string;
  time: string;
  isGuest?: boolean;
}

export function ServerExperience() {
  const [activeChannelId, setActiveChannelId] = useState<string>('chat');
  const [isCategoryOpen, setIsCategoryOpen] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [isDeafened, setIsDeafened] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [typingUser, setTypingUser] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Dynamic conversation state per channel
  const [channelMessages, setChannelMessages] = useState<Record<string, ChatMessage[]>>({
    chat: [
      {
        id: 'c1',
        user: 'kiran_vibes',
        avatarBg: 'bg-emerald-600',
        text: 'Mazha thudangi guys, time for hot black tea and good music 🌧️☕',
        time: 'Today at 9:42 PM',
      },
      {
        id: 'c2',
        user: 'amal_k',
        avatarBg: 'bg-teal-600',
        text: 'Chaya ready aanu! Ellarkkum welcome to Thattukada ✨',
        time: 'Today at 9:45 PM',
      },
    ],
    'english-chat': [
      {
        id: 'ec1',
        user: 'neha_plays',
        avatarBg: 'bg-amber-600',
        text: 'Welcome to the server everyone! Anyone up for games later tonight?',
        time: 'Today at 10:15 PM',
      },
    ],
    gallery: [
      {
        id: 'g1',
        user: 'fayiz_cam',
        avatarBg: 'bg-rose-600',
        text: 'Captured this evening rain on my camera. The lighting was surreal ✨',
        time: 'Yesterday at 7:20 PM',
      },
    ],
    pets: [
      {
        id: 'p1',
        user: 'sneha_pets',
        avatarBg: 'bg-purple-600',
        text: 'My cat decided to sit right on top of my headset during voice chat 😸',
        time: 'Today at 6:05 PM',
      },
    ],
    confessions: [
      {
        id: 'cf1',
        user: 'anon_user',
        avatarBg: 'bg-pink-600',
        text: 'Confession: I log into Discord at 1 AM just to listen to the rain bot and read chat while falling asleep 🌙',
        time: 'Yesterday at 11:42 PM',
      },
    ],
    talents: [
      {
        id: 't1',
        user: 'anand_tunes',
        avatarBg: 'bg-blue-600',
        text: 'Recorded an acoustic guitar cover of an old Malayalam melody 🎸',
        time: 'Today at 8:30 PM',
      },
    ],
  });

  const activeChannel = DISCORD_CHANNELS.find((c) => c.id === activeChannelId) || DISCORD_CHANNELS[0];
  const currentMessages = channelMessages[activeChannelId] || [];

  // Auto-scroll to bottom of chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [currentMessages, typingUser]);

  const sendSpecificMessage = async (rawText: string) => {
    const text = rawText.trim();
    if (!text) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      user: 'You (Guest)',
      avatarBg: 'bg-amber-500',
      text,
      time: 'Just now',
      isGuest: true,
    };

    // Add user message immediately
    setChannelMessages((prev) => ({
      ...prev,
      [activeChannelId]: [...(prev[activeChannelId] || []), userMsg],
    }));
    setInputMessage('');

    // Member pool to reply
    const communityMembers = [
      { name: 'neha_plays', bg: 'bg-amber-600' },
      { name: 'kiran_vibes', bg: 'bg-emerald-600' },
      { name: 'amal_k', bg: 'bg-teal-600' },
      { name: 'devika_m', bg: 'bg-purple-600' },
      { name: 'anand_tunes', bg: 'bg-blue-600' },
      { name: 'fayiz_cam', bg: 'bg-rose-600' },
    ];
    const pickedMember = communityMembers[Math.floor(Math.random() * communityMembers.length)];

    // Show typing status
    setTypingUser(pickedMember.name);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          channelName: activeChannel.name,
          history: currentMessages,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        setTimeout(() => {
          setTypingUser(null);
          setChannelMessages((prev) => ({
            ...prev,
            [activeChannelId]: [
              ...(prev[activeChannelId] || []),
              {
                id: (Date.now() + 1).toString(),
                user: data.user || pickedMember.name,
                avatarBg: data.avatarBg || pickedMember.bg,
                text: data.text || 'Machane! Welcome to the table ☕',
                time: 'Just now',
              },
            ],
          }));
        }, 700);
        return;
      }
    } catch {
      // Fallback below
    }

    // Natural fallback replies if API is slow or unavailable
    setTimeout(() => {
      setTypingUser(null);
      const fallbacks = [
        'Machane! Welcome to the table. Grab some hot kattan chaya ☕',
        'Haha set aanu! Glad to see you here in Thattukada ✨',
        'Adipoli! Hop into the veranda VC if you want to chat with us 🎙️',
        'Hey there! Love the energy. What are you up to tonight?',
        'Scene macha! The late night vibe here is always peaceful 🌧️',
        'Mazha kando? Time for acoustic music and tea ☕',
      ];
      const randomFallback = fallbacks[Math.floor(Math.random() * fallbacks.length)];
      setChannelMessages((prev) => ({
        ...prev,
        [activeChannelId]: [
          ...(prev[activeChannelId] || []),
          {
            id: (Date.now() + 1).toString(),
            user: pickedMember.name,
            avatarBg: pickedMember.bg,
            text: randomFallback,
            time: 'Just now',
          },
        ],
      }));
    }, 900);
  };

  const handleSendMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    await sendSpecificMessage(inputMessage);
  };

  // Quick suggestion prompts for user convenience
  const quickPrompts = [
    '☕ Chaya ready aano?',
    '🌧️ Mazha thudangiyo machane?',
    '🎮 Any games tonight?',
    '👋 Namaskaram! New here',
  ];

  // Simulated voice lounge participants
  const voiceMembers = [
    { name: 'amal_k', role: 'Server Host', speaking: true, color: 'bg-emerald-500' },
    { name: 'devika_m', role: 'Night Owl', speaking: false, color: 'bg-purple-500' },
    { name: 'rohit_guitar', role: 'Musician', speaking: true, color: 'bg-amber-500' },
    { name: 'anjali_art', role: 'Creator', speaking: false, color: 'bg-rose-500' },
  ];

  return (
    <section id="about" className="scroll-mt-16 py-16 md:py-24 border-t border-slate-800/80 bg-[#080d11]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Story section */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-2 text-[11px] font-sans tracking-[0.3em] uppercase text-amber-200/70 font-light mb-3">
            <Coffee className="w-3.5 h-3.5 text-amber-400" />
            <span>The Concept & Cultural Roots</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-editorial font-light tracking-tight text-white/95 leading-[1.15]">
            More than just a server. An informal <span className="italic text-amber-100 font-normal">digital sanctuary.</span>
          </h2>
          <p className="mt-4 text-base text-slate-300/80 font-light tracking-wide leading-relaxed font-sans">
            In Kerala, every town and village has a <span className="text-amber-200 font-normal">Thattukada</span>.
            It is where people from every walk of life step under the tin roof during torrential monsoons,
            holding a glass of steaming black sulaimani, trading stories, and feeling instantly connected.
          </p>
          <p className="mt-3 text-sm text-slate-400 font-light tracking-wide leading-relaxed font-sans">
            We brought that exact unpretentious warmth to Discord. Whether you are living in Kochi, Bengaluru, Dubai,
            London, or Toronto, Thattukada is your home away from home — open 24 hours with a warm bench waiting for you.
          </p>
        </div>

        {/* Discord Server Interactive Mockup */}
        <div id="channels" className="scroll-mt-24 rounded-2xl border border-slate-800 bg-[#0e1620] overflow-hidden shadow-2xl">
          {/* Mock Discord Window Header */}
          <div className="px-4 py-3 bg-[#0a0f16] border-b border-slate-800/80 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-500/80" />
              <span className="w-3 h-3 rounded-full bg-amber-500/80" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
              <span className="ml-3 text-xs font-mono text-slate-400">
                Thattukada Discord // Live Channels
              </span>
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-400">
              <span className="hidden sm:inline">Region: Kerala / Global</span>
              <span className="font-mono text-emerald-400">● 1,204 Online</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 min-h-[480px]">
            {/* Sidebar: Channel list matching user's exact screenshot */}
            <div className="md:col-span-4 lg:col-span-3 border-r border-slate-800/80 p-2.5 bg-[#141722] flex flex-col justify-between">
              {/* Top Section: Category & Channel List */}
              <div className="flex-1">
                {/* Category Header: 🧉 ഒ : ChatZ ⌄ */}
                <button
                  type="button"
                  onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                  className="btn-smooth active:scale-[0.98] w-full flex items-center justify-between px-2 py-2 text-xs font-medium text-slate-300 hover:text-white rounded-md transition-all group mb-1"
                >
                  <div className="flex items-center gap-1.5 font-sans tracking-wide text-xs text-slate-300 group-hover:text-white">
                    <span>🧉 ഒ : ChatZ</span>
                  </div>
                  <ChevronDown
                    className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${
                      isCategoryOpen ? 'rotate-0' : '-rotate-90'
                    }`}
                  />
                </button>

                {/* Channels matching user's exact screenshot */}
                {isCategoryOpen && (
                  <div className="space-y-0.5">
                    {DISCORD_CHANNELS.map((ch) => {
                      const isSelected = ch.id === activeChannelId;
                      return (
                        <button
                          key={ch.id}
                          onClick={() => setActiveChannelId(ch.id)}
                          type="button"
                          className={`btn-smooth active:scale-[0.98] w-full flex items-center gap-2 px-2.5 py-1.5 rounded-md text-xs sm:text-sm font-medium transition-all text-left ${
                            isSelected
                              ? 'bg-[#292e3d] text-white font-medium shadow-sm'
                              : 'text-slate-400 hover:text-slate-200 hover:bg-[#1f2330]'
                          }`}
                        >
                          <span className="text-slate-400 text-sm font-semibold select-none shrink-0 font-mono">
                            #
                          </span>
                          <span className="truncate">{ch.name}</span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* User Voice Bar Simulation Pinned at the very bottom */}
              <div className="mt-auto pt-3 border-t border-slate-800/80 px-2 py-1.5 flex items-center justify-between text-xs bg-[#10131d]/70 rounded-lg">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-8 h-8 rounded-full bg-amber-500 flex items-center justify-center font-bold text-slate-950 text-xs shrink-0 shadow-sm">
                    TK
                  </div>
                  <div className="truncate">
                    <div className="font-semibold text-white truncate text-xs">You (Guest)</div>
                    <div className="text-[10px] text-slate-400">Ready to chat</div>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    onClick={() => setIsMuted(!isMuted)}
                    type="button"
                    className={`btn-smooth active:scale-90 p-1.5 rounded-md border border-slate-700/80 hover:bg-slate-800 transition-all ${
                      isMuted ? 'text-rose-400 border-rose-500/50 bg-rose-500/10' : 'text-slate-300'
                    }`}
                    title={isMuted ? 'Unmute Mic' : 'Mute Mic'}
                  >
                    {isMuted ? <MicOff className="w-3.5 h-3.5" /> : <Mic className="w-3.5 h-3.5" />}
                  </button>

                  <button
                    onClick={() => setIsDeafened(!isDeafened)}
                    type="button"
                    className={`btn-smooth active:scale-90 p-1.5 rounded-md hover:bg-slate-800 transition-all ${
                      isDeafened ? 'text-rose-400' : 'text-slate-400 hover:text-slate-200'
                    }`}
                    title={isDeafened ? 'Undeafen' : 'Deafen Audio'}
                  >
                    <Headphones className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Main Interactive Chat Area */}
            <div className="md:col-span-8 lg:col-span-6 p-4 sm:p-5 flex flex-col justify-between bg-[#0e1620]">
              <div className="flex-1 flex flex-col min-h-0">
                {/* Mobile Channel Horizontal Switcher */}
                <div className="md:hidden flex items-center gap-1.5 overflow-x-auto pb-3 border-b border-slate-800/80 mb-3 no-scrollbar">
                  <span className="text-[10px] uppercase font-mono text-slate-500 shrink-0">Channels:</span>
                  {DISCORD_CHANNELS.map((ch) => {
                    const isSel = ch.id === activeChannelId;
                    return (
                      <button
                        key={ch.id}
                        type="button"
                        onClick={() => setActiveChannelId(ch.id)}
                        className={`btn-smooth px-2.5 py-1 rounded-md text-xs whitespace-nowrap transition-all ${
                          isSel
                            ? 'bg-amber-400/20 text-amber-200 border border-amber-400/40 font-medium shadow-sm'
                            : 'text-slate-400 hover:text-slate-200 bg-slate-900/60 border border-slate-800'
                        }`}
                      >
                        #{ch.name.split(':')[1]?.trim() || ch.name}
                      </button>
                    );
                  })}
                </div>

                {/* Active Channel Header */}
                <div className="pb-3 border-b border-slate-800/80 flex items-center justify-between shrink-0">
                  <div className="flex items-center gap-2">
                    <span className="text-slate-400 text-lg font-bold font-mono">#</span>
                    <h3 className="text-sm sm:text-base font-semibold text-white">
                      {activeChannel.name}
                    </h3>
                  </div>

                  <span className="text-[11px] text-slate-500 font-mono">
                    {activeChannel.category}
                  </span>
                </div>

                {/* Channel Purpose Banner */}
                <div className="my-3 p-3 rounded-lg bg-slate-900/40 border border-slate-800/80 text-xs text-slate-300 leading-relaxed shrink-0 flex items-start justify-between gap-3">
                  <div>
                    <span className="text-amber-200/90 font-medium mr-1.5">Channel Topic:</span>
                    <span>{activeChannel.description}</span>
                  </div>
                </div>

                {/* Real-time Message Stream */}
                <div className="flex-1 overflow-y-auto max-h-[300px] min-h-[200px] space-y-3 pr-1 py-1">
                  {currentMessages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`p-3 rounded-xl flex items-start gap-3 transition-colors ${
                        msg.isGuest
                          ? 'bg-amber-400/5 border border-amber-400/20 shadow-sm'
                          : 'bg-slate-900/40 border border-slate-800/60'
                      }`}
                    >
                      <div
                        className={`w-7 h-7 rounded-full ${msg.avatarBg} flex items-center justify-center font-bold text-white text-[10px] shrink-0 shadow-sm`}
                      >
                        {msg.isGuest ? 'TK' : msg.user.slice(0, 2).toUpperCase()}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-white">
                            {msg.user}
                          </span>
                          {msg.isGuest && (
                            <span className="text-[9px] uppercase font-mono px-1.5 py-0.2 bg-amber-400/20 text-amber-300 rounded font-semibold">
                              You
                            </span>
                          )}
                          <span className="text-[10px] text-slate-500 font-mono">
                            {msg.time}
                          </span>
                        </div>
                        <p className="mt-1 text-xs sm:text-sm text-slate-200 leading-relaxed break-words font-sans">
                          {msg.text}
                        </p>
                      </div>
                    </div>
                  ))}

                  {/* Typing Indicator */}
                  {typingUser && (
                    <div className="flex items-center gap-2 text-xs text-slate-400 animate-pulse pl-1 py-1">
                      <div className="flex items-center gap-1">
                        <span className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                        <span className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                        <span className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                      </div>
                      <span className="font-mono text-[11px] text-amber-300/90 font-medium">
                        {typingUser} is typing...
                      </span>
                    </div>
                  )}

                  <div ref={messagesEndRef} />
                </div>
              </div>

              {/* Messagable Chat Input Bar */}
              <div className="mt-3 pt-3 border-t border-slate-800/80 shrink-0">
                {/* Quick Suggestion Prompts */}
                <div className="flex items-center gap-1.5 overflow-x-auto pb-2 text-xs">
                  <span className="text-[10px] font-mono uppercase text-slate-500 whitespace-nowrap">Suggested:</span>
                  {quickPrompts.map((prompt) => (
                    <button
                      key={prompt}
                      type="button"
                      onClick={() => sendSpecificMessage(prompt)}
                      className="btn-smooth active:scale-95 px-2.5 py-1 rounded-full bg-slate-900/80 hover:bg-amber-400/15 text-slate-300 hover:text-amber-200 border border-slate-700/60 hover:border-amber-400/40 text-[11px] whitespace-nowrap transition-all shrink-0 cursor-pointer"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>

                <form
                  onSubmit={handleSendMessage}
                  className="flex items-center gap-2 p-1.5 pl-3 rounded-xl bg-slate-900 border border-slate-700/80 focus-within:border-amber-400 focus-within:ring-2 focus-within:ring-amber-400/20 transition-all shadow-inner"
                >
                  <input
                    id="chat-input"
                    name="chat-input"
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    placeholder={`Message #${activeChannel.name}...`}
                    autoComplete="off"
                    className="flex-1 bg-transparent text-xs sm:text-sm text-white placeholder-slate-500 outline-none font-sans"
                  />
                  <button
                    type="submit"
                    disabled={!inputMessage.trim()}
                    className="btn-smooth active:scale-90 p-2 text-slate-400 hover:text-amber-300 disabled:opacity-30 disabled:cursor-not-allowed transition-all rounded-lg bg-slate-800/40 hover:bg-slate-800"
                    title="Send message (Enter)"
                    aria-label="Send message"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>
                <div className="flex items-center justify-between mt-1.5 px-1 text-[10px] text-slate-500">
                  <span>Type anything and press Enter</span>
                </div>
              </div>
            </div>

            {/* Right Column: Voice Lounge Live Activity */}
            <div className="hidden lg:block lg:col-span-3 border-l border-slate-800/80 p-4 bg-[#0a1017]">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>Veranda VC Members</span>
                </span>
                <span className="text-[10px] font-mono text-emerald-400">LIVE</span>
              </div>

              <div className="space-y-3">
                {voiceMembers.map((member) => (
                  <div
                    key={member.name}
                    className="p-2.5 rounded-xl bg-slate-900/50 border border-slate-800/60 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className={`w-7 h-7 rounded-full ${member.color} flex items-center justify-center text-xs font-bold text-white shrink-0 relative`}>
                        {member.name.charAt(0).toUpperCase()}
                        {member.speaking && (
                          <span className="absolute -inset-0.5 rounded-full border-2 border-emerald-400 animate-pulse" />
                        )}
                      </div>
                      <div className="truncate">
                        <div className="text-xs font-medium text-slate-200 truncate">
                          {member.name}
                        </div>
                        <div className="text-[10px] text-slate-500">
                          {member.role}
                        </div>
                      </div>
                    </div>

                    {member.speaking ? (
                      <span className="text-[10px] text-emerald-400 font-mono flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                        Speaking
                      </span>
                    ) : (
                      <span className="text-[10px] text-slate-500 font-mono">Listening</span>
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-6 p-3 rounded-xl bg-amber-950/20 border border-amber-800/30 text-xs text-amber-200/80">
                💡 <span className="font-medium">Lofi Radio Bot</span> streams relaxing Malayalam & acoustic beats in VC round the clock.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
