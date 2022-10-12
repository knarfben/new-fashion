import './category-preview.styles.scss';
import { Link } from 'react-router-dom';
import ProductCard from '../product-card/product-card.component';
import { Fragment } from 'react';

const CategoryPreview = ({ title, products }) => {
  return (
    <Fragment>
      <div className="category-preview-container">
        <h2>
          <Link className="title" to={title}>
            {title.toUpperCase()}
          </Link>
        </h2>
        <div className="preview">
          {products
            .filter((_, idx) => idx < 4)
            .map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
        </div>
      </div>
    </Fragment>
  );
};

export default CategoryPreview;
