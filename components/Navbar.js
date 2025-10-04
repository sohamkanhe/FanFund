"use client"
import React, { useState, useEffect } from 'react'
import { useSession, signIn, signOut } from "next-auth/react"
import Link from 'next/link'
import { searchUsers } from '@/actions/useractions'

const Navbar = () => {
  const { data: session } = useSession()
  const [showDropdown, setShowDropdown] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState([])

  // This is a "debounce" effect. It waits for the user to stop typing for 300ms
  // before it actually searches the database. This prevents sending too many requests.
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchQuery.length > 0) {
        performSearch();
      } else {
        setSearchResults([]);
      }
    }, 300); 

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const performSearch = async () => {
    let results = await searchUsers(searchQuery);
    setSearchResults(results);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // This function clears the search results when a user clicks a link
  const handleResultClick = () => {
    setSearchQuery("");
    setSearchResults([]);
  };

  return (
    <nav className='sticky top-0 z-50 bg-black/30 backdrop-blur-sm text-white flex justify-between items-center px-4 md:px-8 h-16 border-b border-white/10 shadow-lg'>

      {/* Logo Section (Left) */}
      <div className="flex-1">
        <Link className="logo font-bold text-xl flex justify-start items-center gap-2" href={"/"}>
          <span className='my-3 md:my-0'>FanFund</span>
          <img src="/growingtree.gif" width={50} alt="Funding GIF" className="rounded-full" />
        </Link>
      </div>

      {/* Center Search Section */}
      <div className="hidden md:flex flex-1 justify-center relative">
        <div className="w-full max-w-md">
          <input 
            type="text" 
            value={searchQuery}
            onChange={handleSearchChange}
            onBlur={() => setTimeout(() => setSearchResults([]), 200)}
            placeholder="Search for a creator..." 
            className="w-full bg-white/10 border border-white/20 rounded-full px-4 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          {searchResults.length > 0 && (
            <div className="absolute top-full mt-2 w-full bg-gray-800/80 backdrop-blur-md border border-white/10 rounded-lg shadow-lg max-h-60 overflow-y-auto">
              <ul>
                {searchResults.map(user => (
                  <li key={user.username}>
                    <Link 
                      href={`/${user.username}`} 
                      onClick={handleResultClick}
                      className="flex items-center gap-3 p-3 hover:bg-gray-700/80"
                    >
                      <img src={user.profilepic || 'https://placehold.co/40x40/1a1a1a/ffffff?text=A'} alt="" className="w-10 h-10 rounded-full" />
                      <span className="font-semibold">{user.name || user.username}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Right Buttons Section */}
      <div className='flex-1 flex justify-end items-center gap-4'>
        {session ? (
          <>
            <button 
              onClick={() => setShowDropdown(!showDropdown)} 
              onBlur={() => setTimeout(() => setShowDropdown(false), 200)} 
              className="flex items-center gap-2 px-3 py-1.5 bg-purple-600 hover:bg-purple-700 transition-all duration-300 font-medium rounded-full text-sm text-center" 
              type="button"
            >
              <img 
                src={session.user.image} 
                alt="User Avatar" 
                width={32} 
                height={32} 
                className="rounded-full"
              />
              <span className="hidden md:inline">{session.user.name}</span>
            </button>

            {/* Dropdown Menu */}
            <div className={`z-10 ${showDropdown ? "block" : "hidden"} absolute right-0 top-12 bg-gray-800/50 backdrop-blur-md border border-white/10 divide-y divide-gray-600 rounded-lg shadow w-44`}>
              <ul className="py-2 text-sm text-gray-200" aria-labelledby="dropdownDefaultButton">
                <li>
                  <Link href="/dashboard" className="block px-4 py-2 hover:bg-gray-700/80">Dashboard</Link>
                </li>
                <li>
                  <Link href="/payments" className="block px-4 py-2 hover:bg-gray-700/80">Your Payments</Link>
                </li>
                <li>
                  <Link href={`/${session.user.username}`} className="block px-4 py-2 hover:bg-gray-700/80">Your Page</Link>
                </li>
                <li>
                  <button onClick={() => signOut({ callbackUrl: '/' })} className="block w-full text-left px-4 py-2 hover:bg-gray-700/80">Sign out</button>
                </li>
              </ul>
            </div>
          </>
        ) : (
          <Link href={"/login"}>
            <button className='px-5 py-2.5 bg-purple-600 hover:bg-purple-700 transition-all duration-300 font-medium rounded-lg text-sm text-center'>
              Login
            </button>
          </Link>
        )}
      </div>
    </nav>
  )
}

export default Navbar
