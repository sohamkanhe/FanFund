import { fetchAllUsers } from '@/actions/useractions';
import Link from 'next/link';

const CreatorsPage = async () => {
  const creators = await fetchAllUsers();

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-white">Find a Creator</h1>
        <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
          Browse our talented community of creators. Search by name or username to find and support your favorites.
        </p>
      </div>

      {/* We will add a search bar here in the next step */}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-8">
        {creators.map((creator) => (
          <Link href={`/${creator.username}`} key={creator._id}>
            <div className="bg-white/5 rounded-xl border border-white/10 hover:border-purple-400/50 transition-all duration-300 overflow-hidden group">
              <div className="h-40 bg-cover bg-center" style={{ backgroundImage: `url(${creator.coverpic || 'https://placehold.co/400x300/1a1a1a/ffffff?text=No+Cover'})` }}>
              </div>
              <div className="p-6 relative">
                <div className="absolute -top-12 left-1/2 -translate-x-1/2">
                  <img 
                    src={creator.profilepic || 'https://placehold.co/100x100/1a1a1a/ffffff?text=Avatar'} 
                    alt={`${creator.name || creator.username}'s profile`}
                    className="w-24 h-24 rounded-full border-4 border-gray-800 group-hover:border-purple-500 transition-all duration-300"
                  />
                </div>
                <div className="pt-14 text-center">
                  <h3 className="font-bold text-lg text-white">{creator.name || creator.username}</h3>
                  <p className="text-sm text-gray-400 mt-1">@{creator.username}</p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CreatorsPage;

export const metadata = {
    title: "All Creators - FanFund",
};
