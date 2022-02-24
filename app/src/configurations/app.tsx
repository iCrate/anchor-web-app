import {
  AnchorConstants,
  AnchorContractAddress,
  AnchorWebappProvider,
} from '@anchor-protocol/app-provider';
import { AppProvider } from '@libs/app-provider';
import { GlobalStyle } from '@libs/neumorphism-ui/themes/GlobalStyle';
import { patchReactQueryFocusRefetching } from '@libs/patch-react-query-focus-refetching';
import { SnackbarProvider } from '@libs/snackbar';
import { useLongtimeNoSee } from '@libs/use-longtime-no-see';
import { RouterScrollRestoration } from '@libs/use-router-scroll-restoration';
import { captureException } from '@sentry/react';
import { useRequestReloadDialog } from 'components/dialogs/useRequestReloadDialog';
import { RedemptionSnackbar } from 'components/RedemptionSnackbar';
import { SnackbarContainer } from 'components/SnackbarContainer';
import { NotificationProvider } from 'contexts/notification';
import {
  ANCHOR_CONSTANTS,
  ANCHOR_CONTRACT_ADDRESS,
  ANCHOR_INDEXER_API_ENDPOINTS,
  ANCHOR_QUERY_CLIENT,
  ANCHOR_TX_REFETCH_MAP,
} from 'env';
import { JobsProvider } from 'jobs/Jobs';
import React, { ReactNode, useCallback } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter as Router } from 'react-router-dom';

patchReactQueryFocusRefetching();

const queryClient = new QueryClient();

const errorReporter =
  process.env.NODE_ENV === 'production' ? captureException : undefined;

function Providers({ children }: { children: ReactNode }) {
  return (
    <Router>
      <QueryClientProvider client={queryClient}>
        <AppProvider<AnchorContractAddress, AnchorConstants>
          defaultQueryClient={ANCHOR_QUERY_CLIENT}
          contractAddress={ANCHOR_CONTRACT_ADDRESS}
          constants={ANCHOR_CONSTANTS}
          refetchMap={ANCHOR_TX_REFETCH_MAP}
          txErrorReporter={errorReporter}
          queryErrorReporter={errorReporter}
        >
          <AnchorWebappProvider
            indexerApiEndpoints={ANCHOR_INDEXER_API_ENDPOINTS}
          >
            <SnackbarProvider>
              <NotificationProvider>
                <JobsProvider>{children}</JobsProvider>
              </NotificationProvider>
            </SnackbarProvider>
          </AnchorWebappProvider>
        </AppProvider>
      </QueryClientProvider>
    </Router>
  );
}

export function AppProviders({
  children,
  dialogs,
}: {
  children: ReactNode;
  dialogs?: ReactNode;
}) {
  const [_openRequestReload, requestReloadElement] = useRequestReloadDialog();

  const openRequestReload = useCallback(
    () => _openRequestReload({}),
    [_openRequestReload],
  );

  // If the user didn't see the app over 2 days,
  // reload browser for more stablity when the user visit again.
  useLongtimeNoSee({ longtime: 1000 * 60 * 60 * 48, onSee: openRequestReload });

  // const { redemptions } = useRedemptionStorage();

  // TODO: hardcode for now, add real redemptions once bot is unstuck
  const redemptions = [1];

  return (
    <Providers>
      <RouterScrollRestoration />
      <GlobalStyle />
      {children}
      <SnackbarContainer>
        {redemptions.map((r) => (
          <RedemptionSnackbar key={r} redemption={r} />
        ))}
      </SnackbarContainer>
      {dialogs}
      {requestReloadElement}
    </Providers>
  );
}
