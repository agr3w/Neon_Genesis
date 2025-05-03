import React from "react";
import FiltersSidebar from "../../filters/FiltersSidebar/FiltersSidebar";

/**
 * Componente para encapsular a lógica de filtros.
 * @param {Object} props - Propriedades do componente.
 */
const TotensFilter = ({
  categories,
  brands,
  selectedCategory,
  selectedBrand,
  onCategoryChange,
  onBrandChange,
}) => {
  return (
    <FiltersSidebar
      categories={categories}
      brands={brands}
      selectedCategory={selectedCategory}
      selectedBrand={selectedBrand}
      onCategoryChange={onCategoryChange}
      onBrandChange={onBrandChange}
    />
  );
};

export default TotensFilter;