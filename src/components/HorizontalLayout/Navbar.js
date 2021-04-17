import React, { useState,useEffect } from 'react';
import { Row, Col, Collapse } from "reactstrap";
import { Link, withRouter } from "react-router-dom";
import classname from "classnames";

//i18n
import { useTranslation } from 'react-i18next';

import { connect } from "react-redux";

const Navbar = (props) => {

    const [dashboard, setdashboard] = useState(false);
    const [ui, setui] = useState(false);
    const [app, setapp] = useState(false);
    const [email, setemail] = useState(false);
    const [ecommerce, setecommerce] = useState(false);
    const [crypto, setcrypto] = useState(false);
    const [project, setproject] = useState(false);
    const [task, settask] = useState(false);
    const [contact, setcontact] = useState(false);
    const [component, setcomponent] = useState(false);
    const [form, setform] = useState(false);
    const [table, settable] = useState(false);
    const [chart, setchart] = useState(false);
    const [icon, seticon] = useState(false);
    const [map, setmap] = useState(false);
    const [extra, setextra] = useState(false);
    const [invoice, setinvoice] = useState(false);
    const [auth, setauth] = useState(false);
    const [utility, setutility] = useState(false);
    const { t } = useTranslation();

useEffect(() => {
     var matchingMenuItem = null;
        var ul = document.getElementById("navigation");
        var items = ul.getElementsByTagName("a");
        for (var i = 0; i < items.length; ++i) {
            if (props.location.pathname === items[i].pathname) {
                matchingMenuItem = items[i];
                break;
            }
        }
        if (matchingMenuItem) {
            activateParentDropdown(matchingMenuItem);
        }
  });
  function activateParentDropdown(item)  {
        item.classList.add("active");
        const parent = item.parentElement;
        if (parent) {
            parent.classList.add("active"); // li
            const parent2 = parent.parentElement;
            parent2.classList.add("active"); // li
            const parent3 = parent2.parentElement;
            if (parent3) {
                parent3.classList.add("active"); // li
                const parent4 = parent3.parentElement;
                if (parent4) {
                    parent4.classList.add("active"); // li
                    const parent5 = parent4.parentElement;
                    if (parent5) {
                        parent5.classList.add("active"); // li
                        const parent6 = parent5.parentElement;
                        if (parent6) {
                            parent6.classList.add("active"); // li
                        }
                    }
                }
            }
        }
        return false;
    };

    return (<React.Fragment>
                <div className="topnav">
                    <div className="container-fluid">
                        <nav className="navbar navbar-light navbar-expand-lg topnav-menu" id="navigation">
                            <Collapse isOpen={props.leftMenu} className="navbar-collapse" id="topnav-menu-content">
                                <ul className="navbar-nav">
                                    <li className="nav-item dropdown">
                                        <Link className="nav-link dropdown-toggle arrow-none" onClick={e => { e.preventDefault();  setdashboard(!dashboard); }} to="dashboard">
                                            <i className="bx bx-home-circle mr-2"></i>{t('Dashboard')} {props.menuOpen}<div className="arrow-down"></div>
                                        </Link>
                                        <div className={classname("dropdown-menu", { show: dashboard })}>
                                            <Link to="index" className="dropdown-item">{t('Default')}</Link>
                                            <Link to="dashboard-saas" className="dropdown-item">{t('Saas')}</Link>
                                            <Link to="dashboard-crypto" className="dropdown-item">{t('Crypto')}</Link>
                                        </div>
                                    </li>

                                    <li className="nav-item dropdown">
                                        <Link to="/#" onClick={e => { e.preventDefault(); setui(!ui); }} className="nav-link dropdown-toggle arrow-none">
                                            <i className="bx bx-tone mr-2"></i>{t('UI Elements')} <div className="arrow-down"></div>
                                        </Link>
                                        <div
                                            className={classname(
                                                "dropdown-menu mega-dropdown-menu dropdown-menu-left dropdown-mega-menu-xl",
                                                { show: ui })}>
                                            <Row>
                                                <Col lg={4}>
                                                    <div>
                                                        <Link to="ui-alerts" className="dropdown-item">{t('Alerts')}</Link>
                                                        <Link to="ui-buttons" className="dropdown-item">{t('Buttons')}</Link>
                                                        <Link to="ui-cards" className="dropdown-item">{t('Cards')}</Link>
                                                        <Link to="ui-carousel" className="dropdown-item">{t('Carousel')}</Link>
                                                        <Link to="ui-dropdowns" className="dropdown-item">{t('Dropdowns')}</Link>
                                                        <Link to="ui-grid" className="dropdown-item">{t('Grid')}</Link>
                                                        <Link to="ui-images" className="dropdown-item">{t('Images')}</Link>
                                                    </div>
                                                </Col>
                                                <Col lg={4}>
                                                    <div>
                                                        <Link to="ui-lightbox" className="dropdown-item">{t('Lightbox')}</Link>
                                                        <Link to="ui-modals" className="dropdown-item">{t('Modals')}</Link>
                                                        <Link to="ui-rangeslider" className="dropdown-item">{t('Range Slider')}</Link>
                                                        <Link to="ui-session-timeout" className="dropdown-item">{t('Session Timeout')}</Link>
                                                        <Link to="ui-progressbars" className="dropdown-item">{t('Progress Bars')}</Link>
                                                        <Link to="ui-sweet-alert" className="dropdown-item">{t('Sweet-Alert')}</Link>
                                                        <Link to="ui-tabs-accordions" className="dropdown-item">{t('Tabs & Accordions')}</Link>
                                                    </div>
                                                </Col>
                                                <Col lg={4}>
                                                    <div>
                                                        <Link to="ui-typography" className="dropdown-item">{t('Typography')}</Link>
                                                        <Link to="ui-video" className="dropdown-item">{t('Video')}</Link>
                                                        <Link to="ui-general" className="dropdown-item">{t('General')}</Link>
                                                        <Link to="ui-colors" className="dropdown-item">{t('Colors')}</Link>
                                                        <Link to="ui-rating" className="dropdown-item">{t('Rating')}</Link>
                                                        <Link to="ui-notifications" className="dropdown-item">{t('Notifications')}</Link>
                                                        <Link to="ui-image-cropper" className="dropdown-item">{t('Image Cropper')}</Link>
                                                    </div>
                                                </Col>
                                            </Row>
                                        </div>
                                    </li>

                                    <li className="nav-item dropdown">
                                        <Link to="/#" onClick={e => { e.preventDefault(); setapp(!app); }} className="nav-link dropdown-togglez arrow-none"  >
                                            <i className="bx bx-customize mr-2"></i>{t('Apps')} <div className="arrow-down"></div>
                                        </Link>
                                        <div className={classname("dropdown-menu", { show: app })} >
                                            <Link to="calendar" className="dropdown-item">{t('Calendar')}</Link>
                                            <Link to="chat" className="dropdown-item">{t('Chat')}</Link>
                                            <div className="dropdown">
                                                <Link to="/#" className="dropdown-item dropdown-toggle arrow-none"
                                                    onClick={e => {
                                                        e.preventDefault();
                                                        setemail(!email);
                                                    }}>
                                                    {t('Email')} <div className="arrow-down"></div>
                                                </Link>
                                                <div className={classname("dropdown-menu", { show: email })} >
                                                    <Link to="email-inbox" className="dropdown-item">{t('Inbox')}</Link>
                                                    <Link to="email-read" className="dropdown-item">{t('Read Email')}</Link>
                                                </div>
                                            </div>
                                            <div className="dropdown">
                                                <Link to="/#" className="dropdown-item dropdown-toggle arrow-none"
                                                    onClick={e => {
                                                        e.preventDefault();
                                                        setecommerce(!ecommerce);
                                                    }}>
                                                   {t(' Ecommerce')} <div className="arrow-down"></div>
                                                </Link>
                                                <div className={classname("dropdown-menu", { show: ecommerce })}>
                                                    <Link to="ecommerce-products" className="dropdown-item">{t('Products')}</Link>
                                                    <Link to="ecommerce-product-detail" className="dropdown-item">{t('Product Detail')}</Link>
                                                    <Link to="ecommerce-orders" className="dropdown-item">{t('Orders')}</Link>
                                                    <Link to="ecommerce-customers" className="dropdown-item">{t('Customers')}</Link>
                                                    <Link to="ecommerce-cart" className="dropdown-item">{t('Cart')}</Link>
                                                    <Link to="ecommerce-checkout" className="dropdown-item">{t('Checkout')}</Link>
                                                    <Link to="ecommerce-shops" className="dropdown-item">{t('Shops')}</Link>
                                                    <Link to="ecommerce-add-product" className="dropdown-item">{t('Add Product')}</Link>
                                                </div>
                                            </div>

                                            <div className="dropdown">
                                                <Link to="/#" className="dropdown-item dropdown-toggle arrow-none"
                                                    onClick={e => {
                                                        e.preventDefault();
                                                        setcrypto(!crypto);
                                                    }}>
                                                   {t('Crypto')} <div className="arrow-down"></div>
                                                </Link>
                                                <div className={classname("dropdown-menu", { show: crypto })}>
                                                    <Link to="crypto-wallet" className="dropdown-item">{t('Wallet')}</Link>
                                                    <Link to="crypto-buy-sell" className="dropdown-item">{t('Buy/Sell')}</Link>
                                                    <Link to="crypto-exchange" className="dropdown-item">{t('Exchange')}</Link>
                                                    <Link to="crypto-lending" className="dropdown-item">{t('Lending')}</Link>
                                                    <Link to="crypto-orders" className="dropdown-item">{t('Orders')}</Link>
                                                    <Link to="crypto-kyc-application" className="dropdown-item">{t('KYC Application')}</Link>
                                                    <Link to="crypto-ico-landing" className="dropdown-item">{t('ICO Landing')}</Link>
                                                </div>
                                            </div>

                                            <div className="dropdown">
                                                <Link to="/#" className="dropdown-item dropdown-toggle arrow-none"
                                                    onClick={e => {
                                                        e.preventDefault();
                                                        setproject(!project);
                                                    }}>
                                                    {t('Projects')} <div className="arrow-down"></div>
                                                </Link>
                                                <div className={classname("dropdown-menu", { show: project })}>
                                                    <Link to="projects-grid" className="dropdown-item">{t('Projects Grid')}</Link>
                                                    <Link to="projects-list" className="dropdown-item">{t('Projects List')}</Link>
                                                    <Link to="projects-overview" className="dropdown-item">{t('Project Overview')}</Link>
                                                    <Link to="projects-create" className="dropdown-item">{t('Create New')}</Link>
                                                </div>
                                            </div>
                                            <div className="dropdown">
                                                <Link to="/#" className="dropdown-item dropdown-toggle arrow-none"
                                                    onClick={e => {
                                                        e.preventDefault();
                                                        settask(!task);
                                                    }}>
                                                  {t('Tasks')} <div className="arrow-down"></div>
                                                </Link>
                                                <div className={classname("dropdown-menu", { show: task })}>
                                                    <Link to="tasks-list" className="dropdown-item">{t('Task List')}</Link>
                                                    <Link to="tasks-kanban" className="dropdown-item">{t('Kanban Board')}</Link>
                                                    <Link to="tasks-create" className="dropdown-item">{t('Create Task')}</Link>
                                                </div>
                                            </div>
                                            <div className="dropdown">
                                                <Link to="/#" className="dropdown-item dropdown-toggle arrow-none"
                                                    onClick={e => {
                                                        e.preventDefault();
                                                        setcontact(!contact);
                                                    }}>
                                                    {t('Contacts')} <div className="arrow-down"></div>
                                                </Link>
                                                <div className={classname("dropdown-menu", { show: contact })}>
                                                    <Link to="contacts-grid" className="dropdown-item">{t('User Grid')}</Link>
                                                    <Link to="contacts-list" className="dropdown-item">{t('User List')}</Link>
                                                    <Link to="contacts-profile" className="dropdown-item">{t('Profile')}</Link>
                                                </div>
                                            </div>
                                        </div>
                                    </li>

                                    <li className="nav-item dropdown">
                                        <Link to="/#" className="nav-link dropdown-toggle arrow-none"
                                            onClick={e => {
                                                e.preventDefault();
                                                setcomponent(!component);
                                            }}>
                                            <i className="bx bx-collection mr-2"></i>{t('Components')} <div className="arrow-down"></div>
                                        </Link>
                                        <div className={classname("dropdown-menu", { show: component })}>
                                            <div className="dropdown">
                                                <Link to="/#" className="dropdown-item dropdown-toggle arrow-none"
                                                    onClick={e => {
                                                        e.preventDefault();
                                                        setform(!form);
                                                    }}>
                                                   {t('Forms')}  <div className="arrow-down"></div>
                                                </Link>
                                                <div className={classname("dropdown-menu", { show:form })}>
                                                    <Link to="form-elements" className="dropdown-item">{t('Form Elements')}</Link>
                                                    <Link to="form-validation" className="dropdown-item">{t('Form Validation')}</Link>
                                                    <Link to="form-advanced" className="dropdown-item">{t('Form Advanced')}</Link>
                                                    <Link to="form-editors" className="dropdown-item">{t('Form Editors')}</Link>
                                                    <Link to="form-uploads" className="dropdown-item">{t('Form File Upload')} </Link>
                                                    <Link to="form-xeditable" className="dropdown-item">{t('Form Xeditable')}</Link>
                                                    <Link to="form-repeater" className="dropdown-item">{t('Form Repeater')}</Link>
                                                    <Link to="form-wizard" className="dropdown-item">{t('Form Wizard')}</Link>
                                                    <Link to="form-mask" className="dropdown-item">{t('Form Mask')}</Link>
                                                </div>
                                            </div>
                                            <div className="dropdown">
                                                <Link to="/#" className="dropdown-item dropdown-toggle arrow-none"
                                                    onClick={e => {
                                                        e.preventDefault();
                                                        settable(!table);
                                                    }}>
                                                    {t('Tables')} <div className="arrow-down"></div>
                                                </Link>
                                                <div className={classname("dropdown-menu", { show: table })}>
                                                    <Link to="tables-basic" className="dropdown-item">{t('Basic Tables')}</Link>
                                                    <Link to="tables-datatable" className="dropdown-item">{t('Data Tables')}</Link>
                                                    <Link to="tables-responsive" className="dropdown-item">{t('Responsive Table')}</Link>
                                                    <Link to="tables-editable" className="dropdown-item">{t('Editable Table')}</Link>
                                                </div>
                                            </div>
                                            <div className="dropdown">
                                                <Link to="/#" className="dropdown-item dropdown-toggle arrow-none"
                                                    onClick={e => {
                                                        e.preventDefault();
                                                        setchart(!chart);
                                                    }}>
                                                     {t('Charts')} <div className="arrow-down"></div>
                                                </Link>
                                                <div className={classname("dropdown-menu", { show: chart })}>
                                                    <Link to="apex-charts" className="dropdown-item"> {t('Apex charts')}</Link>
                                                    <Link to="chartist-charts" className="dropdown-item"> {t('Chartjs Chart')}</Link>
                                                    <Link to="e-charts" className="dropdown-item"> {t('E Chart')}</Link>
                                                    <Link to="tui-charts" className="dropdown-item">{t('Toast UI Chart')}</Link>
                                                    <Link to="sparkline-charts" className="dropdown-item"> {t('Sparkline Chart')}</Link>
                                                    <Link to="charts-knob" className="dropdown-item">{t('Knob Chart')}</Link>
                                                </div>
                                            </div>
                                            <div className="dropdown">
                                                <Link to="/#" className="dropdown-item dropdown-toggle arrow-none"
                                                    onClick={e => {
                                                        e.preventDefault();
                                                        seticon(!icon);
                                                    }}>
                                                     {t('Icons')} <div className="arrow-down"></div>
                                                </Link>
                                                <div className={classname("dropdown-menu", { show: icon })}>
                                                    <Link to="icons-boxicons" className="dropdown-item">{t('Boxicons')}</Link>
                                                    <Link to="icons-materialdesign" className="dropdown-item">{t('Material Design')}</Link>
                                                    <Link to="icons-dripicons" className="dropdown-item">{t('Dripicons')}</Link>
                                                    <Link to="icons-fontawesome" className="dropdown-item">{t('Font awesome')} </Link>
                                                </div>
                                            </div>
                                            <div className="dropdown">
                                                <Link to="/#" className="dropdown-item dropdown-toggle arrow-none"
                                                    onClick={e => {
                                                        e.preventDefault();
                                                        setmap(!map);
                                                    }}>
                                                    {t('Maps')} <div className="arrow-down"></div>
                                                </Link>
                                                <div className={classname("dropdown-menu", { show: map })}>
                                                    <Link to="maps-google" className="dropdown-item">{t('Google Maps')} </Link>
                                                    <Link to="maps-vector" className="dropdown-item">{t('Vector Maps')} </Link>
                                                    <Link to="maps-leaflet" className="dropdown-item">{t('Leaflet Maps')} </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </li>

                                    <li className="nav-item dropdown">
                                        <Link className="nav-link dropdown-toggle arrow-none" to="#"
                                            onClick={e => {
                                                e.preventDefault();
                                                setextra(!extra);
                                            }}>
                                            <i className="bx bx-file mr-2"></i>{t('Extra pages')}  <div className="arrow-down"></div>
                                        </Link>
                                        <div className={classname("dropdown-menu", { show: extra })}>
                                            <div className="dropdown">
                                                <Link to="/#" className="dropdown-item dropdown-toggle arrow-none"
                                                    onClick={e => {
                                                        e.preventDefault();
                                                        setinvoice(!invoice);
                                                    }}>
                                                   {t('Invoices')} <div className="arrow-down"></div>
                                                </Link>
                                                <div className={classname("dropdown-menu", { show: invoice })}>
                                                    <Link to="invoices-list" className="dropdown-item">{t('Invoice List')}</Link>
                                                    <Link to="invoices-detail" className="dropdown-item">{t('Invoice Detail')}</Link>
                                                </div>
                                            </div>

                                            <div className="dropdown">
                                                <Link to="/#" className="dropdown-item dropdown-toggle arrow-none"
                                                    onClick={e => {
                                                        e.preventDefault();
                                                        setauth(!auth);
                                                    }}>
                                                  {t('Authentication')}   <div className="arrow-down"></div>
                                                </Link>
                                                <div className={classname("dropdown-menu", { show: auth })}>
                                                    <Link to="pages-login" className="dropdown-item">{t('Login')}</Link>
                                                    <Link to="pages-register" className="dropdown-item">{t('Register')}</Link>
                                                    <Link to="pages-forget-pwd" className="dropdown-item">{t('Forget Password')}</Link>
                                                    <Link to="auth-lock-screen" className="dropdown-item">{t('Lock Screen')}</Link>
                                                </div>
                                            </div>

                                            <div className="dropdown">
                                                <Link className="dropdown-item dropdown-toggle arrow-none" to="#"
                                                    onClick={e => {
                                                        e.preventDefault();
                                                        setutility(!utility);                                                    }}>
                                                    {t('Utility')} <div className="arrow-down"></div>
                                                </Link>
                                                <div className={classname("dropdown-menu", { show: utility })}>
                                                    <Link to="pages-starter" className="dropdown-item">{t('Starter Page')}</Link>
                                                    <Link to="pages-maintenance" className="dropdown-item">{t('Maintenance')}</Link>
                                                    <Link to="pages-comingsoon" className="dropdown-item">{t('Coming Soon')}</Link>
                                                    <Link to="pages-timeline" className="dropdown-item">{t('Timeline')}</Link>
                                                    <Link to="pages-faqs" className="dropdown-item">{t('FAQs')}</Link>
                                                    <Link to="pages-pricing" className="dropdown-item">{t('Pricing')}</Link>
                                                    <Link to="pages-404" className="dropdown-item">{t('Error 404')}</Link>
                                                    <Link to="pages-500" className="dropdown-item">{t('Error 500')}</Link>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </Collapse>
                        </nav>
                    </div>
                </div>
            </React.Fragment>
          );
}

const mapStatetoProps = state => {
  const { leftMenu } = state.Layout;
  return { leftMenu };
};

export default withRouter(connect(mapStatetoProps, {  })(Navbar));
