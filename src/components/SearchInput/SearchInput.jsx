
import './SearchInput.css';
import { Search } from 'lucide-react';

function SearchInput({
  value = '',
  onChange,
  placeholder = 'Pesquisar...',
}) {

  return (
    <div className="search-input">
      <Search size={18} className="search-input-icon" />

      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
  );
}

export default SearchInput;
