import Link from "next/link";

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <div className="flex flex-col gap-6 items-center justify-center text-white h-[80vh] px-5 text-center">
        <div className="font-bold text-5xl md:text-7xl flex items-center gap-4">
          FanFund
          <img src="/growingtree.gif" width={80} alt="Funding GIF" className="rounded-full" />
        </div>
        <p className="text-lg md:text-xl text-gray-300 max-w-2xl">
          The ultimate platform for creators to connect with their fans and bring their projects to life through community support.
        </p>
        <div className="flex gap-4 mt-4">
          <Link href={"/login"}>
            <button type="button" className="text-white bg-purple-600 hover:bg-purple-700 transition-all duration-300 font-semibold rounded-lg text-base px-6 py-3 text-center shadow-lg shadow-purple-500/30">
              Get Started
            </button>
          </Link>
          <Link href="/about">
            <button type="button" className="text-white bg-white/10 hover:bg-white/20 border border-white/20 transition-all duration-300 font-semibold rounded-lg text-base px-6 py-3 text-center">
              Learn More
            </button>
          </Link>
        </div>
      </div>

      <div className="bg-white/10 h-px w-3/4 mx-auto"></div>

      {/* How It Works Section */}
      <div className="text-white container mx-auto py-24 px-10">
        <h2 className="text-4xl font-bold text-center mb-16">How Your Fans Can Support You</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="bg-white/5 p-8 rounded-xl border border-white/10 backdrop-blur-sm space-y-4 text-center hover:border-purple-400/50 hover:bg-white/10 transition-all duration-300 h-full">
            <div className="flex justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-purple-400"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
            </div>
            <p className="font-bold text-xl">Direct Support</p>
            <p className="text-gray-400">Your fans can directly contribute to your creative journey, helping you focus on what you do best.</p>
          </div>
          {/* Card 2 */}
          <div className="bg-white/5 p-8 rounded-xl border border-white/10 backdrop-blur-sm space-y-4 text-center hover:border-purple-400/50 hover:bg-white/10 transition-all duration-300 h-full">
            <div className="flex justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-purple-400"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l2 2"/><path d="M16 12h2a6 6 0 0 0-6-6v2"/><path d="M18 18a6 6 0 0 0-6-6"/></svg>
            </div>
            <p className="font-bold text-xl">Fund Projects</p>
            <p className="text-gray-400">Fans can contribute to specific goals, whether it's a new album, a short film, or a book.</p>
          </div>
          {/* Card 3 */}
          <div className="bg-white/5 p-8 rounded-xl border border-white/10 backdrop-blur-sm space-y-4 text-center hover:border-purple-400/50 hover:bg-white/10 transition-all duration-300 h-full">
            <div className="flex justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-purple-400"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
            </div>
            <p className="font-bold text-xl">Build Community</p>
            <p className="text-gray-400">Create a space for your most dedicated fans to connect with you and each other.</p>
          </div>
        </div>
      </div>

      <div className="bg-white/10 h-px w-3/4 mx-auto"></div>

      {/* NEW SECTION: Featured Creators */}
      <div className="text-white container mx-auto py-24 px-10">
        <h2 className="text-4xl font-bold text-center mb-16">Meet Our Creators</h2>
        <div className="grid md:grid-cols-4 gap-8">
          {/* Creator Card 1 */}
          <div className="bg-white/5 rounded-xl border border-white/10 hover:border-purple-400/50 transition-all duration-300 overflow-hidden">
          <video src="md.mp4" autoPlay muted loop playsInline className="w-full h-80 object-cover"/>
            <div className="p-6">
              <h3 className="font-bold text-lg">Leo the Illustrator</h3>
              <p className="text-sm text-gray-400 mt-1">Digital Art & Comics</p>
            </div>
          </div>
          {/* Creator Card 2 */}
          <div className="bg-white/5 rounded-xl border border-white/10 hover:border-purple-400/50 transition-all duration-300 overflow-hidden">
          <video src="source.mp4" autoPlay muted loop playsInline className="w-full h-80 object-cover"/>
            <div className="p-6">
              <h3 className="font-bold text-lg">Synthwave Beats</h3>
              <p className="text-sm text-gray-400 mt-1">Music Production</p>
            </div>
          </div>
          {/* Creator Card 3 */}
          <div className="bg-white/5 rounded-xl border border-white/10 hover:border-purple-400/50 transition-all duration-300 overflow-hidden">
          <video src="md-5.mp4" autoPlay muted loop playsInline className="w-full h-80 object-cover"/>
            <div className="p-6">
              <h3 className="font-bold text-lg">NatureWhispers</h3>
              <p className="text-sm text-gray-400 mt-1">Nature Videos</p>
            </div>
          </div>
          {/* Creator Card 4 */}
          <div className="bg-white/5 rounded-xl border border-white/10 hover:border-purple-400/50 transition-all duration-300 overflow-hidden">
          <video src="md-4.mp4" autoPlay muted loop playsInline className="w-full h-80 object-cover"/>
            <div className="p-6">
              <h3 className="font-bold text-lg">The Animator</h3>
              <p className="text-sm text-gray-400 mt-1">Animation Videos</p>
            </div>
          </div>
        </div>
      </div>

      {/* NEW SECTION: Final Call to Action */}
      <div className="text-white container mx-auto py-24 px-10 text-center">
        <h2 className="text-4xl font-bold mb-4">Ready to start your journey?</h2>
        <p className="text-gray-300 max-w-xl mx-auto mb-8">
          Whether you're a creator ready to build a community or a fan eager to support great work, FanFund is the place for you.
        </p>
        <Link href={"/login"}>
          <button type="button" className="text-white bg-purple-600 hover:bg-purple-700 transition-all duration-300 font-semibold rounded-lg text-lg px-8 py-4 text-center shadow-lg shadow-purple-500/30">
            Join the Community
          </button>
        </Link>
      </div>
    </>
  );
}
