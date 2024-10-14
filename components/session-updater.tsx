'use client';

import updateSessionViaAPI from '@/lib/update-session-via-api';
import { FC, useEffect } from 'react';

interface Props {}

const SessionUpdater: FC<Props> = () => {
  useEffect(() => {
    updateSessionViaAPI();
  }, []);

  return null;
};

export default SessionUpdater;
