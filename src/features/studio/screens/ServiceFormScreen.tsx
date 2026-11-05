import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { PlaceholderScreen, Screen, TopBar } from '@/components/layout';
import { AppText, Button, Chip, FieldLabel, TextField } from '@/components/ui';
import { OCCASION_LABELS, type Occasion, type ServiceVariant } from '@/domain/models';
import { deleteVariant, saveVariant, useServices } from '@/features/catalog';
import { spacing } from '@/theme';
import { formatDuration } from '@/utils/dateTime';
import { formatPrice } from '@/utils/formatPrice';

import { useArtistIdentity } from '../hooks/useArtistIdentity';
import { DESCRIPTION_MAX_LENGTH, DURATION_OPTIONS, useServiceForm } from '../hooks/useServiceForm';

const OCCASIONS = Object.keys(OCCASION_LABELS) as Occasion[];

/** Create a package (`/services/new`) or edit one (`/services/edit/[variantId]`). */
export function ServiceFormScreen() {
  const router = useRouter();
  const { variantId } = useLocalSearchParams<{ variantId?: string }>();
  const identity = useArtistIdentity();
  const services = useServices();

  if (!identity) return null;
  const artistId = identity.profile.artistId;
  const variants = services.find((service) => service.artistId === artistId)?.variants ?? [];
  const existing = variantId ? (variants.find((variant) => variant.id === variantId) ?? null) : null;

  if (variantId && !existing) {
    return (
      <PlaceholderScreen
        icon="sell"
        title="Package not found"
        message="It may have been deleted."
        action={{ label: 'Go back', onPress: () => router.back() }}
      />
    );
  }
  return (
    <ServiceForm
      key={existing?.id ?? 'new'}
      artistId={artistId}
      initial={existing}
      canDelete={existing !== null && variants.length > 1}
    />
  );
}

type ServiceFormProps = { artistId: string; initial: ServiceVariant | null; canDelete: boolean };

function ServiceForm({ artistId, initial, canDelete }: ServiceFormProps) {
  const router = useRouter();
  const form = useServiceForm(artistId, initial);
  // Show validation messages only after the first save attempt.
  const [showErrors, setShowErrors] = useState(false);

  const handleSave = () => {
    if (!form.isValid) {
      setShowErrors(true);
      return;
    }
    saveVariant(artistId, form.toVariant());
    router.back();
  };

  const confirmDelete = () => {
    if (!initial) return;
    Alert.alert(`Delete ${initial.name}?`, 'Customers will no longer be able to book this package. Existing bookings are not affected.', [
      { text: 'Keep', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => {
          deleteVariant(artistId, initial.id);
          router.back();
        },
      },
    ]);
  };

  return (
    <Screen
      header={
        <TopBar
          onBack={() => router.back()}
          center={<AppText variant="titleMd">{initial ? 'Edit package' : 'New package'}</AppText>}
        />
      }
      footer={
        <View style={styles.actions}>
          <Button label={initial ? 'Save changes' : 'Create package'} onPress={handleSave} />
          {canDelete ? <Button label="Delete package" variant="ghost" onPress={confirmDelete} /> : null}
        </View>
      }
    >
      <View style={styles.field}>
        <FieldLabel label="Category" />
        <View style={styles.chips} accessibilityRole="radiogroup">
          {OCCASIONS.map((occasion) => (
            <Chip
              key={occasion}
              label={OCCASION_LABELS[occasion]}
              selected={form.occasion === occasion}
              onPress={() => form.selectOccasion(occasion)}
            />
          ))}
        </View>
      </View>

      <View style={styles.field}>
        <TextField
          label="Package name"
          value={form.name}
          onChangeText={form.setName}
          error={showErrors ? form.errors.name : null}
          maxLength={40}
        />
      </View>

      <View style={styles.field}>
        <TextField
          label="Price (VND)"
          value={form.priceText}
          onChangeText={form.setPriceText}
          keyboardType="number-pad"
          placeholder="e.g. 550000"
          error={showErrors ? form.errors.price : null}
          helper={
            form.price > 0
              ? `Shown to customers as ${formatPrice(form.price)} · travel included`
              : 'Include travel within your service radius.'
          }
        />
      </View>

      <View style={styles.field}>
        <FieldLabel label="Duration" />
        <View style={styles.chips} accessibilityRole="radiogroup">
          {DURATION_OPTIONS.map((minutes) => (
            <Chip
              key={minutes}
              label={formatDuration(minutes)}
              selected={form.durationMinutes === minutes}
              onPress={() => form.setDuration(minutes)}
            />
          ))}
        </View>
      </View>

      <View style={[styles.field, styles.lastField]}>
        <TextField
          label="Description"
          value={form.description}
          onChangeText={form.setDescription}
          multiline
          maxLength={DESCRIPTION_MAX_LENGTH}
          showCounter
          placeholder="What is included, e.g. skin prep, lashes, setting spray"
          error={showErrors ? form.errors.description : null}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  field: { marginTop: spacing.xl },
  lastField: { marginBottom: spacing.xl },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  actions: { gap: spacing.xs },
});
