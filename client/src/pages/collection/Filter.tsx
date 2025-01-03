import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';

type Filter = {
  genders: string[];
  sizes: string[];
  category: string[];
};

type FilterProps = {
  filter: Filter;
  onFilterChange: React.Dispatch<React.SetStateAction<Filter>>;
};

const Filter = ({ onFilterChange, filter }: FilterProps) => {
  const handleFilterChange = (key: string, value: string) => {
    onFilterChange((prev) => {
      const currentValue = prev[key];

      const updatedValue = currentValue.includes(value)
        ? currentValue.filter((v) => v !== value)
        : [...currentValue, value];

      return {
        ...prev,
        [key]: updatedValue,
      };
    });
  };

  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-lg font-lato font-medium">Filter</h1>
      <div className="border py-6 px-4 space-y-2 rounded-[5px]">
        <h1 className="text-lg font-lato font-medium">Gender</h1>

        <div className="flex gap-4 items-center">
          <Input
            type="checkbox"
            className="w-4 h-4"
            checked={filter.genders.includes('Male')}
            onChange={() => handleFilterChange('genders', 'Male')}
          />
          <Label>Male</Label>
        </div>
        <div className="flex gap-4 items-center">
          <Input
            type="checkbox"
            className="w-4 h-4"
            checked={filter.genders.includes('Female')}
            onChange={() => handleFilterChange('genders', 'Female')}
          />
          <Label>Female</Label>
        </div>
      </div>

      <div className="border py-6 px-4 space-y-2 rounded-[5px]">
        <h1 className="text-lg font-lato font-medium">Size</h1>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex gap-4 items-center">
            <Input
              type="checkbox"
              className="w-4 h-4"
              checked={filter.sizes.includes('SMALL')}
              onChange={() => handleFilterChange('sizes', 'SMALL')}
            />
            <Label>S</Label>
          </div>
          <div className="flex gap-4 items-center">
            <Input
              type="checkbox"
              className="w-4 h-4"
              checked={filter.sizes.includes('MEDIUM')}
              onChange={() => handleFilterChange('sizes', 'MEDIUM')}
            />
            <Label>M</Label>
          </div>

          <div className="flex gap-4 items-center">
            <Input
              type="checkbox"
              className="w-4 h-4"
              checked={filter.sizes.includes('LARGE')}
              onChange={() => handleFilterChange('sizes', 'LARGE')}
            />
            <Label>L</Label>
          </div>
          <div className="flex gap-4 items-center">
            <Input
              type="checkbox"
              className="w-4 h-4"
              checked={filter.sizes.includes('XL')}
              onChange={() => handleFilterChange('sizes', 'XL')}
            />
            <Label>XL</Label>
          </div>
          <div className="flex gap-4 items-center">
            <Input
              type="checkbox"
              className="w-4 h-4"
              checked={filter.sizes.includes('XXL')}
              onChange={() => handleFilterChange('sizes', 'XXL')}
            />
            <Label>XXL</Label>
          </div>
        </div>
      </div>
      <div className="border py-6 px-4 space-y-2 rounded-[5px]">
        <h1 className="text-lg font-lato font-medium">Category</h1>

        <div className="flex gap-4 items-center">
          <Input
            type="checkbox"
            className="w-4 h-4"
            checked={filter.category.includes('TopWear')}
            onChange={() => handleFilterChange('category', 'TopWear')}
          />
          <Label>Topwear</Label>
        </div>
        <div className="flex gap-4 items-center">
          <Input
            type="checkbox"
            className="w-4 h-4"
            checked={filter.category.includes('BottomWear')}
            onChange={() => handleFilterChange('category', 'BottomWear')}
          />
          <Label>Bottomwear</Label>
        </div>
      </div>
    </div>
  );
};

export default Filter;
