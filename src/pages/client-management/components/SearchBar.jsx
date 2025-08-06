import React from 'react';
import Icon from '../../../components/AppIcon';

const SearchBar = ({ value, onChange, placeholder = "Buscar..." }) => {
  return (
    <div className="relative">
      <Icon 
        name="Search" 
        size={20} 
        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
      />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange?.(e?.target?.value)}
        placeholder={placeholder}
        className="w-full pl-10 pr-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground placeholder:text-muted-foreground"
      />
      {value && (
        <button
          onClick={() => onChange?.('')}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
        >
          <Icon name="X" size={16} />
        </button>
      )}
    </div>
  );
};

export default SearchBar;