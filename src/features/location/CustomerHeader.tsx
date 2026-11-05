import { useRouter } from 'expo-router';
import { useState } from 'react';

import { AppHeader } from '@/components/layout';
import { OptionSheet } from '@/components/ui';
import { getAreaById, getAreaOptions } from '@/features/catalog';
import { useSession } from '@/features/session';

const DEFAULT_LOCATION_LABEL = 'Da Nang';

/** Customer tab header wired to the session: shows and changes the customer's area. */
export function CustomerHeader() {
  const router = useRouter();
  const { customerProfile, updateCustomerArea } = useSession();
  const [sheetOpen, setSheetOpen] = useState(false);

  const areaId = customerProfile?.areaId ?? null;
  const area = areaId ? getAreaById(areaId) : undefined;

  return (
    <>
      <AppHeader
        locationLabel={area?.name ?? DEFAULT_LOCATION_LABEL}
        onLocationPress={() => setSheetOpen(true)}
        onProfilePress={() => router.navigate('/profile')}
      />
      <OptionSheet
        visible={sheetOpen}
        title="Your area"
        options={getAreaOptions()}
        selectedValue={areaId}
        onSelect={updateCustomerArea}
        onClose={() => setSheetOpen(false)}
      />
    </>
  );
}
