import { FilterProps } from "../interfaces";

export const Filter: React.FC<FilterProps> = ({
  changeFilter,
  filterName,
  isActive,
}) => (
  <div
    className={`inline-block px-6 py-2 bg-[#F5F5F5] rounded-full cursor-pointer mr-4 border-2 ${
      isActive ? "border-black" : "border-[#F5F5F5]"
    } `}
    onClick={changeFilter}
  >
    <span className="text-sm font-bold text-black">{filterName}</span>
  </div>
);
