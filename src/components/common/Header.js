import React, {PropTypes} from "react";
import {Link, IndexLink} from 'react-router';
import LoadingDots from './LoadingDots';

const Header = ({loading}) => {
  return (
    <nav>
      <IndexLink to="/" activeClassName="active">Home</IndexLink>
      {"|"}
      <Link to="courses" activeClassName="active">Courses</Link>
      {"|"}
      <Link to="about" activeClassName="active">About</Link>

      {loading && <LoadingDots interval={10} dots={10}/>}
    </nav>
  );
};

//{ loading && <LoadingDots interval={10} dots={10}/> }
// logical and.. right side is only evaluated only when left side value is true; that means
//lodingdots component is displayed only when loading is true

Header.propTypes = {
  loading: PropTypes.bool.isRequired
};

export default Header;
