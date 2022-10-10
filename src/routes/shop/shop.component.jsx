import { useContext } from 'react';
import { ProductsContext } from '../../contexts/products.context';

const Shop = () => {
  const { products } = useContext(ProductsContext);
  return (
    <div>
      {products.map(({ id, name }) => (
        <div key={id}>{name}</div>
      ))}
    </div>
  );
};

export default Shop;
