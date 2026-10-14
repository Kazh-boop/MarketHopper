import Constants from 'expo-constants';
import React, { useMemo } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SegmentedButtons, Surface, Text, useTheme } from 'react-native-paper';

import { SectionHeader } from '@/components/common/SectionHeader';
import { ChoiceChips } from '@/components/settings/ChoiceChips';
import { ThemeCard } from '@/components/settings/ThemeCard';
import { getDataCentersByRegion, getWorldsByDataCenter, REGIONS } from '@/constants/universalis';
import { useSettings } from '@/context/SettingsContext';
import { LANGUAGES, type Language } from '@/i18n/translations';
import { useTranslation } from '@/i18n/useTranslation';
import { radius, spacing } from '@/theme/spacing';
import { THEME_NAMES } from '@/theme/theme';

export default function SettingsScreen() {
    const theme = useTheme();
    const t = useTranslation();
    const {
        settings,
        marketScope,
        setThemeName,
        setLanguage,
        selectRegion,
        toggleDataCenter,
        toggleWorld,
    } = useSettings();
    const { market } = settings;

    const regionOptions = useMemo(
        () => REGIONS.map((region) => ({ value: region, label: t.settings.regions[region] })),
        [t],
    );
    const dataCenterOptions = useMemo(
        () => getDataCentersByRegion(market.region).map((dc) => ({ value: dc.id, label: dc.id })),
        [market.region],
    );
    const worldOptions = useMemo(
        () =>
            getWorldsByDataCenter(market.dataCenter).map((world) => ({
                value: world,
                label: world,
            })),
        [market.dataCenter],
    );

    const mutedText = { color: theme.colors.onSurfaceVariant };

    return (
        <ScrollView
            style={{ backgroundColor: theme.colors.background }}
            contentContainerStyle={styles.content}
        >
            {/* Market */}
            <SectionHeader title={t.settings.market} subtitle={t.settings.marketDescription} />
            <Surface style={styles.scopeBanner} elevation={1}>
                <Text variant="bodyMedium" style={!marketScope && mutedText}>
                    {marketScope
                        ? t.settings.currentScope(
                              `${marketScope.name} (${t.itemDetail.scopeKinds[marketScope.kind]})`,
                          )
                        : t.settings.noScope}
                </Text>
            </Surface>

            <Text variant="labelLarge" style={styles.label}>
                {t.settings.region}
            </Text>
            <ChoiceChips options={regionOptions} selected={market.region} onSelect={selectRegion} />

            <Text variant="labelLarge" style={styles.label}>
                {t.settings.dataCenter}
            </Text>
            {dataCenterOptions.length === 0 ? (
                <Text variant="bodySmall" style={[styles.hint, mutedText]}>
                    {t.settings.dataCenterHint}
                </Text>
            ) : (
                <ChoiceChips
                    options={dataCenterOptions}
                    selected={market.dataCenter}
                    onSelect={toggleDataCenter}
                />
            )}

            <Text variant="labelLarge" style={styles.label}>
                {t.settings.world}{' '}
                <Text variant="bodySmall" style={mutedText}>
                    ({t.settings.worldOptional})
                </Text>
            </Text>
            {worldOptions.length === 0 ? (
                <Text variant="bodySmall" style={[styles.hint, mutedText]}>
                    {t.settings.worldHint}
                </Text>
            ) : (
                <ChoiceChips
                    options={worldOptions}
                    selected={market.world}
                    onSelect={toggleWorld}
                />
            )}

            {/* Appearance */}
            <SectionHeader title={t.settings.appearance} />
            <Text variant="labelLarge" style={styles.label}>
                {t.settings.theme}
            </Text>
            <View style={styles.themeGrid} accessibilityRole="radiogroup">
                {THEME_NAMES.map((name) => (
                    <ThemeCard
                        key={name}
                        name={name}
                        label={t.settings.themes[name]}
                        selected={settings.themeName === name}
                        onPress={setThemeName}
                    />
                ))}
            </View>

            <Text variant="labelLarge" style={styles.label}>
                {t.settings.language}
            </Text>
            <SegmentedButtons
                value={settings.language}
                onValueChange={(value) => setLanguage(value as Language)}
                buttons={LANGUAGES.map(({ value, label }) => ({ value, label }))}
            />

            {/* About */}
            <SectionHeader title={t.settings.about} />
            <Text variant="bodyMedium">{t.settings.dataSources}</Text>
            <Text variant="bodySmall" style={[styles.about, mutedText]}>
                {t.settings.disclaimer}
            </Text>
            <Text variant="bodySmall" style={[styles.about, mutedText]}>
                {t.settings.version(Constants.expoConfig?.version ?? '-')}
            </Text>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    content: {
        paddingHorizontal: spacing.lg,
        paddingBottom: spacing.xxl,
    },
    scopeBanner: {
        padding: spacing.md,
        borderRadius: radius.md,
        marginTop: spacing.xs,
    },
    label: {
        marginTop: spacing.lg,
        marginBottom: spacing.sm,
    },
    hint: {
        fontStyle: 'italic',
    },
    themeGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: spacing.sm,
    },
    about: {
        marginTop: spacing.sm,
    },
});
