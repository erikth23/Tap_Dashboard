import React, {useEffect} from 'react';

// MetisMenu
import MetisMenu from "metismenujs";
import {withRouter} from "react-router-dom";
import {Link} from "react-router-dom";

//i18n
import { useTranslation } from 'react-i18next';

const SidebarContent = (props) => {

  const { t } = useTranslation();

  // Use ComponentDidMount and ComponentDidUpdate method symultaniously
  useEffect(() => {

    var pathName = props.location.pathname;

    const initMenu = () => {
      new MetisMenu("#side-menu");
      var matchingMenuItem = null;
      var ul = document.getElementById("side-menu");
      var items = ul.getElementsByTagName("a");
      for (var i = 0; i < items.length; ++i) {
        if (pathName === items[i].pathname) {
          matchingMenuItem = items[i];
          break;
        }
      }
      if (matchingMenuItem) {
        activateParentDropdown(matchingMenuItem);
      }
    }
    initMenu();
  }, [props.location.pathname]);

  function activateParentDropdown(item) {
    item.classList.add("active");
    const parent = item.parentElement;

    if (parent) {
      parent.classList.add("mm-active");
      const parent2 = parent.parentElement;

      if (parent2) {
        parent2.classList.add("mm-show");

        const parent3 = parent2.parentElement;

        if (parent3) {
          parent3.classList.add("mm-active"); // li
          parent3.childNodes[0].classList.add("mm-active"); //a
          const parent4 = parent3.parentElement;
          if (parent4) {
            parent4.classList.add("mm-active");
          }
        }
      }
      return false;
    }
    return false;
  };

  return (<React.Fragment>
    <div id="sidebar-menu">
      <ul className="metismenu list-unstyled" id="side-menu">
        <li className="menu-title">{t('Menu')}
        </li>
        <li>
          <Link to="/dashboard" className="waves-effect">
            <i className="bx bx-home-circle"></i>
            <span>{t('Dashboard')}</span>
          </Link>
        </li>
        <li>
          <Link to="/#" className="has-arrow waves-effect">
            <i className="bx bx-task"></i>
            <span>{t('Tasks')}</span>
          </Link>
          <ul className="sub-menu" aria-expanded="true">
              <li><Link to="/tasks">{t('View Tasks') }</Link></li>
              <li><Link to="/tasks-addTask">{t('Add Task') }</Link></li>
          </ul>
        </li>
        <li>
          <Link to="/metrics" className="waves-effect">
            <i className="bx bx-poll"></i>
            <span>{t('Metrics')}</span>
          </Link>
        </li>
        {
          // <li>
          //   <Link to="/#" className="has-arrow waves-effect">
          //     <i className="bx bx-vector"></i>
          //     <span>{props.t('Systems')}</span>
          //   </Link>
          //   <ul className="sub-menu" aria-expanded="true">
          //       <li><Link to="/systems">{props.t('View Systems') }</Link></li>
          //       <li><Link to="/systems-addUser">{props.t('Add User') }</Link></li>
          //   </ul>
          // </li>
        }
      </ul>
    </div>
  </React.Fragment>);
}

export default withRouter(SidebarContent);
