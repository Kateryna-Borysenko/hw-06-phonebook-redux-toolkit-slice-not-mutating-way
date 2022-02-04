import PropTypes from 'prop-types';
import styles from './Paper.module.css';

const Paper = ({ children }) => {
  return <div className={styles.paper}>{children}</div>;
};

Paper.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Paper;
