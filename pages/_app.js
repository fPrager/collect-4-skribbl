import React from 'react';

import { GeistProvider, CssBaseline, Page } from '@geist-ui/react';

// import '../styles/antd.less';

const App = ({ Component, pageProps }) => (
  <>
    <GeistProvider>
      <CssBaseline />
      <Page>
        <Page.Content>
          <Component {...pageProps} />
        </Page.Content>
      </Page>
    </GeistProvider>
  </>
);

export default App;
