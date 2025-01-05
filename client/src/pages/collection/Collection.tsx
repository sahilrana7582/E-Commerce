import { useState } from 'react';
import Filter from './Filter';
import AllProducts from './AllProducts';

type Filters = {
  genders: string[];
  sizes: string[];
  category: string[];
};

const Collection = () => {
  const [filter, setFilter] = useState<Filters>({
    genders: [],
    sizes: [],
    category: [],
  });
  return (
    <div className="grid grid-cols-[200px_1fr] h-screen">
      <div className="border-r px-2 mx-2">
        <Filter onFilterChange={setFilter} filter={filter} />
      </div>
      <div>
        <AllProducts filter={filter} />
      </div>
    </div>
  );
};

export default Collection;
