import './directory-item.styles.scss';
import { Link } from 'react-router-dom';

const DirectoryItem = ({ category }) => {
  const { title, imageUrl } = category;
  return (
    <Link to={`/shop/${title}`} className="directory-item-container">
      <div
        className="background-image"
        style={{
          backgroundImage: `url(${imageUrl})`,
        }}
      />
      <div className="directory-item-body">
        <h2>{title}</h2>
        <p>Shop Now</p>
      </div>
    </Link>
  );
};

export default DirectoryItem;
