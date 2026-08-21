import React, { useState, useMemo } from 'react';
import { Sparkles, Flame, Search, Filter } from 'lucide-react';
import { menuCategories, allMenuItems } from '../data/menu';
import { MenuItem } from '../types';

export const Menu: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<MenuItem['category']>('starters');
  const [dietaryFilter, setDietaryFilter] = useState<'all' | 'veg' | 'non-veg'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Filtered menu items
  const filteredDishes = useMemo(() => {
    return allMenuItems.filter((dish) => {
      // Category filter (if search query is active, search everywhere or within category)
      const matchesCategory = searchQuery.trim() !== '' ? true : dish.category === activeCategory;

      // Dietary filter
      const matchesDiet =
        dietaryFilter === 'all'
          ? true
          : dietaryFilter === 'veg'
          ? dish.isVeg
          : !dish.isVeg;

      // Search query
      const matchesSearch =
        searchQuery.trim() === '' ||
        dish.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dish.description.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesDiet && matchesSearch;
    });
  }, [activeCategory, dietaryFilter, searchQuery]);

  const currentCategoryObj = menuCategories.find((c) => c.id === activeCategory);

  return (
    <section id="menu" className="py-24 bg-[#FAF7F2] border-b border-[#E8E0D5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs uppercase font-semibold tracking-[0.25em] text-[#C85A32] block mb-2">
            Freshly Prepared Daily
          </span>
          <h2
            id="menu-heading"
            className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#1F1D1A] tracking-tight"
          >
            Explore Our Menu
          </h2>
          <div className="w-12 h-0.5 bg-[#C85A32] mx-auto mt-4 mb-4" />
          <p className="text-sm sm:text-base text-[#4A4642] font-light">
            Indulge in a rich journey of authentic Indian spices, slow-cooked gravies, and aromatic clay-oven specialties.
          </p>
        </div>

        {/* Controls: Search & Dietary Filter */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 bg-white p-3 sm:p-4 rounded-2xl border border-[#E8E0D5] shadow-xs">
          {/* Dietary Buttons */}
          <div className="flex items-center space-x-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
            <button
              id="filter-all-diet"
              onClick={() => setDietaryFilter('all')}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-colors whitespace-nowrap cursor-pointer ${
                dietaryFilter === 'all'
                  ? 'bg-[#1F1D1A] text-white'
                  : 'bg-[#FAF7F2] text-[#4A4642] hover:bg-[#F3ECE1]'
              }`}
            >
              All Dishes
            </button>

            <button
              id="filter-veg-diet"
              onClick={() => setDietaryFilter('veg')}
              className={`inline-flex items-center px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-colors whitespace-nowrap cursor-pointer ${
                dietaryFilter === 'veg'
                  ? 'bg-emerald-800 text-white'
                  : 'bg-[#FAF7F2] text-emerald-800 hover:bg-emerald-50'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500 mr-1.5" />
              Pure Veg
            </button>

            <button
              id="filter-nonveg-diet"
              onClick={() => setDietaryFilter('non-veg')}
              className={`inline-flex items-center px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-colors whitespace-nowrap cursor-pointer ${
                dietaryFilter === 'non-veg'
                  ? 'bg-red-800 text-white'
                  : 'bg-[#FAF7F2] text-red-800 hover:bg-red-50'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-red-500 mr-1.5" />
              Non-Veg
            </button>
          </div>

          {/* Quick Search */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-[#7A736C] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              id="menu-search-input"
              type="text"
              placeholder="Search dishes, spices, gravies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm bg-[#FAF7F2] border border-[#E8E0D5] rounded-full focus:outline-none focus:border-[#C85A32] text-[#1F1D1A] placeholder-[#7A736C]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#7A736C] hover:text-[#1F1D1A]"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Category Tabs (Shown when not in universal search mode) */}
        {!searchQuery && (
          <div className="mb-10">
            <div className="flex items-center justify-start md:justify-center space-x-2 sm:space-x-3 overflow-x-auto pb-4 no-scrollbar">
              {menuCategories.map((category) => {
                const isActive = activeCategory === category.id;
                return (
                  <button
                    key={category.id}
                    id={`menu-tab-${category.id}`}
                    onClick={() => setActiveCategory(category.id)}
                    className={`px-5 py-3 rounded-full text-xs sm:text-sm font-medium uppercase tracking-wider transition-all duration-200 whitespace-nowrap cursor-pointer ${
                      isActive
                        ? 'bg-[#C85A32] text-white shadow-sm font-semibold'
                        : 'bg-white text-[#4A4642] border border-[#E8E0D5] hover:border-[#C85A32]/40 hover:text-[#C85A32]'
                    }`}
                  >
                    {category.name}
                  </button>
                );
              })}
            </div>

            {/* Category Description */}
            {currentCategoryObj && (
              <p className="text-center text-xs sm:text-sm text-[#7A736C] font-light mt-2 italic">
                {currentCategoryObj.description}
              </p>
            )}
          </div>
        )}

        {/* Search Results indicator if searching */}
        {searchQuery && (
          <div className="mb-6 flex items-center justify-between text-xs text-[#4A4642]">
            <span>
              Found <strong>{filteredDishes.length}</strong> results for &ldquo;{searchQuery}&rdquo;
            </span>
            <button
              onClick={() => setSearchQuery('')}
              className="text-[#C85A32] hover:underline font-medium"
            >
              Reset Search
            </button>
          </div>
        )}

        {/* Dishes Grid */}
        {filteredDishes.length > 0 ? (
          <div
            id="menu-items-grid"
            className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8"
          >
            {filteredDishes.map((dish) => (
              <div
                key={dish.id}
                id={`menu-item-${dish.id}`}
                className="group bg-white p-5 sm:p-6 rounded-2xl border border-[#E8E0D5] hover:border-[#C85A32]/40 transition-all duration-200 hover:shadow-md flex flex-col sm:flex-row gap-5 items-start"
              >
                {/* Food Image */}
                <div className="relative w-full sm:w-28 sm:h-28 aspect-4/3 sm:aspect-square rounded-xl overflow-hidden shrink-0 bg-[#FAF7F2]">
                  <img
                    src={dish.image}
                    alt={dish.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  {/* Dietary marker on image */}
                  <div className="absolute top-2 left-2 bg-white/90 backdrop-blur-xs p-1 rounded-sm border border-black/10">
                    <div
                      className={`w-2.5 h-2.5 rounded-full border flex items-center justify-center ${
                        dish.isVeg ? 'border-emerald-600' : 'border-red-600'
                      }`}
                    >
                      <div
                        className={`w-1 h-1 rounded-full ${
                          dish.isVeg ? 'bg-emerald-600' : 'bg-red-600'
                        }`}
                      />
                    </div>
                  </div>
                </div>

                {/* Info */}
                <div className="flex-1 w-full flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-1.5">
                      <div className="flex items-center flex-wrap gap-1.5">
                        <h3 className="font-serif text-lg sm:text-xl font-bold text-[#1F1D1A] group-hover:text-[#C85A32] transition-colors">
                          {dish.name}
                        </h3>

                        {dish.isBestseller && (
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#C85A32] text-white">
                            <Sparkles className="w-2.5 h-2.5 mr-0.5" />
                            Bestseller
                          </span>
                        )}

                        {dish.isChefSpecial && (
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#C5A059] text-white">
                            Chef&apos;s Special
                          </span>
                        )}

                        {dish.isSpicy && (
                          <span className="inline-flex items-center text-[10px] text-red-600">
                            <Flame className="w-3 h-3 text-red-600" />
                          </span>
                        )}
                      </div>

                      <span className="font-serif text-lg font-bold text-[#C85A32] shrink-0">
                        ₹{dish.price}
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-[#5C5650] font-light leading-relaxed">
                      {dish.description}
                    </p>
                  </div>

                  <div className="mt-3 pt-2 border-t border-[#FAF7F2] flex items-center justify-between text-[11px] text-[#7A736C]">
                    <span className="capitalize">{dish.category.replace('-', ' ')}</span>
                    <span className="text-emerald-700 font-medium">Made Fresh</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-2xl border border-[#E8E0D5]">
            <Filter className="w-8 h-8 text-[#7A736C] mx-auto mb-3 opacity-60" />
            <h4 className="font-serif text-lg font-bold text-[#1F1D1A] mb-1">
              No matching dishes found
            </h4>
            <p className="text-xs text-[#7A736C] mb-4">
              Try adjusting your dietary filter or search keywords.
            </p>
            <button
              onClick={() => {
                setDietaryFilter('all');
                setSearchQuery('');
              }}
              className="px-5 py-2 rounded-full text-xs font-semibold bg-[#FAF7F2] text-[#C85A32] border border-[#E8E0D5] hover:bg-[#F3ECE1]"
            >
              Reset Filters
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
