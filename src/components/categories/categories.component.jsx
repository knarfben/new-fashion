import CategoryItem from '../category-item/category-item.component';
import './categories.styles.scss';

const Categories = ({ categories }) => {
  return (
    <div className="categories-container">
      {categories.map((c) => {
        return <CategoryItem key={c.id} category={c} />;
      })}
    </div>
  );
};

export default Categories;
