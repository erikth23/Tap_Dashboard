import React from 'react';
import {Container} from 'reactstrap';

import Breadcrumbs from '../../components/Common/Breadcrumb';

import { withNamespaces } from 'react-i18next';

const Systems = (props) => {

  return(
    <React.Fragment>
      <div className="page-content">
        <Container fluid="fluid">
          <Breadcrumbs title={props.t('Systems')} breadcrumbItem={props.t('Systems')}/>
        </Container>
      </div>
    </React.Fragment>
  );

}

export default withNamespaces()(Systems);
