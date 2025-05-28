import * as React from 'react';

const Search: React.FC = () => {
  const [query, setQuery] = React.useState('');

  const handleSubmit = (event: React.FormEvent): void => {
    event.preventDefault();
    if (query.trim()) {
      const searchUrl = `https://cptraining.litmoseu.com/home/library?SearchTerm=${encodeURIComponent(query)}`;
      window.open(searchUrl, '_blank');
    }
  };

  return (
    <form className="relative w-[331px] h-[34px] px-2  py-3 bg-white rounded-[81.08px] outline outline-1 outline-offset-[-1.08px] outline-zinc-400 inline-flex justify-start items-center overflow-hidden" onSubmit={handleSubmit}>
      <div className="absolute inset-y-0 left-3 flex items-center">
        <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M18.0916 17.409L14.9999 14.3423C16.2 12.846 16.7812 10.9467 16.6239 9.03507C16.4667 7.1234 15.583 5.34464 14.1545 4.06452C12.7261 2.78441 10.8614 2.10024 8.94402 2.15271C7.02662 2.20518 5.20219 2.99029 3.84587 4.3466C2.48956 5.70292 1.70445 7.52735 1.65198 9.44476C1.59951 11.3622 2.28368 13.2268 3.56379 14.6553C4.84391 16.0837 6.62267 16.9674 8.53434 17.1247C10.446 17.2819 12.3453 16.7007 13.8416 15.5007L16.9083 18.5673C16.9857 18.6454 17.0779 18.7074 17.1794 18.7497C17.281 18.792 17.3899 18.8138 17.4999 18.8138C17.6099 18.8138 17.7189 18.792 17.8204 18.7497C17.9219 18.7074 18.0141 18.6454 18.0916 18.5673C18.2418 18.4119 18.3257 18.2043 18.3257 17.9882C18.3257 17.772 18.2418 17.5644 18.0916 17.409ZM9.16659 15.5007C8.01286 15.5007 6.88505 15.1585 5.92576 14.5176C4.96647 13.8766 4.2188 12.9655 3.77729 11.8996C3.33578 10.8337 3.22026 9.66085 3.44534 8.52929C3.67042 7.39774 4.22599 6.35834 5.0418 5.54253C5.8576 4.72672 6.897 4.17115 8.02856 3.94607C9.16012 3.72099 10.333 3.83651 11.3989 4.27802C12.4648 4.71953 13.3759 5.46721 14.0168 6.42649C14.6578 7.38578 14.9999 8.5136 14.9999 9.66732C14.9999 11.2144 14.3853 12.6981 13.2914 13.7921C12.1974 14.8861 10.7137 15.5007 9.16659 15.5007Z" fill="#3C3B3B" />
        </svg>
      </div>
      <input
        type="text"
        id="simple-search"
        className="bg-white rounded-full text-[#000000] text-sm pl-[30px] focus:outline-none focus:bg-white font-Poppins placeholder:font-Poppins placeholder:neutral-500  placeholder:text-base"
        placeholder="Search training"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        required
      />
    </form>
  );
};

export default Search;