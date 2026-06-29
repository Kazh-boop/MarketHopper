import React, { useMemo } from "react";
import { ScrollView, View, StyleSheet, TouchableOpacity } from "react-native";
import {
    Text,
    Divider,
    Chip,
    RadioButton,
    SegmentedButtons,
    useTheme,
} from "react-native-paper";
import { useSettings } from "@/context/SettingsContext";
import { useTranslation } from "@/i18n/useTranslation";
import { THEME_LIST, type ThemeName } from "@/theme/theme";
import { DATA_CENTERS, REGIONS } from "@/constants/universalis";
import type { Language } from "@/i18n/translations";

// ─── Theme card ───────────────────────────────────────────────────────────────

interface ThemeCardProps {
    name: ThemeName;
    primary: string;
    background: string;
    surface: string;
    label: string;
    selected: boolean;
    onPress: (name: ThemeName) => void;
}

function ThemeCard({
    name,
    primary,
    background,
    surface,
    label,
    selected,
    onPress,
}: ThemeCardProps) {
    const theme = useTheme();
    return (
        <TouchableOpacity
            style={[
                styles.themeCard,
                { backgroundColor: background },
                selected && {
                    borderColor: theme.colors.primary,
                    borderWidth: 2,
                },
            ]}
            onPress={() => onPress(name)}
            activeOpacity={0.8}
        >
            {/* Mini preview */}
            <View style={[styles.themeCardBar, { backgroundColor: surface }]}>
                <View
                    style={[styles.themeCardDot, { backgroundColor: primary }]}
                />
                <View
                    style={[
                        styles.themeCardLine,
                        { backgroundColor: primary, opacity: 0.4 },
                    ]}
                />
            </View>

            {/* Label + check */}
            <View style={styles.themeCardFooter}>
                <Text
                    style={[styles.themeCardLabel, { color: primary }]}
                    numberOfLines={1}
                >
                    {label}
                </Text>
                {selected && (
                    <View
                        style={[
                            styles.themeCheckBadge,
                            { backgroundColor: primary },
                        ]}
                    />
                )}
            </View>
        </TouchableOpacity>
    );
}

// ─── Section header ───────────────────────────────────────────────────────────

function SectionHeader({ label }: { label: string }) {
    const theme = useTheme();
    return (
        <Text
            style={[styles.sectionHeader, { color: theme.colors.primary }]}
            variant="labelLarge"
        >
            {label.toUpperCase()}
        </Text>
    );
}

// ─── Main screen ─────────────────────────────────────────────────────────────

export default function SettingsScreen() {
    const theme = useTheme();
    const {
        themeName,
        setThemeName,
        language,
        setLanguage,
        universalisPrefs,
        setUniversalisPrefs,
    } = useSettings();
    const t = useTranslation();

    // Universalis helpers
    const availableDCs = useMemo(
        () =>
            DATA_CENTERS.filter((dc) => dc.region === universalisPrefs.region),
        [universalisPrefs.region],
    );

    const availableWorlds = useMemo(
        () =>
            DATA_CENTERS.find((dc) => dc.id === universalisPrefs.dataCenter)
                ?.worlds ?? [],
        [universalisPrefs.dataCenter],
    );

    const handleRegionChange = (region: string) => {
        setUniversalisPrefs({ region, dataCenter: "", world: "" });
    };

    const handleDCPress = (dc: string) => {
        if (universalisPrefs.dataCenter === dc) {
            setUniversalisPrefs({ dataCenter: "", world: "" });
        } else {
            setUniversalisPrefs({ dataCenter: dc, world: "" });
        }
    };

    const handleWorldPress = (world: string) => {
        setUniversalisPrefs({
            world: universalisPrefs.world === world ? "" : world,
        });
    };

    const languageButtons = [
        { value: "fr" as Language, label: "Français" },
        { value: "en" as Language, label: "English" },
    ];

    return (
        <ScrollView
            style={[styles.root, { backgroundColor: theme.colors.background }]}
            contentContainerStyle={styles.content}
            keyboardShouldPersistTaps="handled"
        >
            {/* ── Appearance ─────────────────────────────────── */}
            <SectionHeader label={t.settings.appearance} />

            {/* Theme picker */}
            <Text
                variant="bodyMedium"
                style={[
                    styles.subLabel,
                    { color: theme.colors.onSurfaceVariant },
                ]}
            >
                {t.settings.theme}
            </Text>

            <View style={styles.themeGrid}>
                {THEME_LIST.map((meta) => (
                    <ThemeCard
                        key={meta.name}
                        name={meta.name}
                        primary={meta.primary}
                        background={meta.background}
                        surface={meta.surface}
                        label={t.settings.themes[meta.name]}
                        selected={themeName === meta.name}
                        onPress={setThemeName}
                    />
                ))}
            </View>

            <Divider style={styles.divider} />

            {/* Language */}
            <Text
                variant="bodyMedium"
                style={[
                    styles.subLabel,
                    { color: theme.colors.onSurfaceVariant },
                ]}
            >
                {t.settings.language}
            </Text>

            <SegmentedButtons
                value={language}
                onValueChange={(v) => setLanguage(v as Language)}
                buttons={languageButtons}
                style={styles.segmented}
            />

            <Divider style={styles.divider} />

            {/* ── Universalis ────────────────────────────────── */}
            <SectionHeader label={t.settings.universalis} />

            {/* Region */}
            <Text
                variant="bodyMedium"
                style={[
                    styles.subLabel,
                    { color: theme.colors.onSurfaceVariant },
                ]}
            >
                {t.settings.region}
            </Text>

            <RadioButton.Group
                value={universalisPrefs.region}
                onValueChange={handleRegionChange}
            >
                <View style={styles.radioRow}>
                    {REGIONS.map((r) => (
                        <View key={r} style={styles.radioItem}>
                            <RadioButton.Item
                                label={t.settings.regions[r]}
                                value={r}
                                position="leading"
                                labelStyle={{
                                    color: theme.colors.onSurface,
                                    fontSize: 13,
                                }}
                                style={styles.radioItemInner}
                            />
                        </View>
                    ))}
                </View>
            </RadioButton.Group>

            {/* Data Center */}
            <Text
                variant="bodyMedium"
                style={[
                    styles.subLabel,
                    { color: theme.colors.onSurfaceVariant },
                ]}
            >
                {t.settings.dataCenter}
            </Text>

            {availableDCs.length === 0 ? (
                <Text
                    variant="bodySmall"
                    style={[
                        styles.hint,
                        { color: theme.colors.onSurfaceVariant },
                    ]}
                >
                    {t.settings.dataCenterHint}
                </Text>
            ) : (
                <View style={styles.chipWrap}>
                    {availableDCs.map((dc) => (
                        <Chip
                            key={dc.id}
                            selected={universalisPrefs.dataCenter === dc.id}
                            onPress={() => handleDCPress(dc.id)}
                            style={styles.chip}
                            showSelectedCheck
                        >
                            {dc.id}
                        </Chip>
                    ))}
                </View>
            )}

            {/* World */}
            <Text
                variant="bodyMedium"
                style={[
                    styles.subLabel,
                    { color: theme.colors.onSurfaceVariant },
                ]}
            >
                {t.settings.world}
                {"  "}
                <Text
                    variant="bodySmall"
                    style={{
                        color: theme.colors.onSurfaceVariant,
                        fontStyle: "italic",
                    }}
                >
                    {t.settings.worldOptional}
                </Text>
            </Text>

            {universalisPrefs.dataCenter === "" ? (
                <Text
                    variant="bodySmall"
                    style={[
                        styles.hint,
                        { color: theme.colors.onSurfaceVariant },
                    ]}
                >
                    {t.settings.worldHint}
                </Text>
            ) : (
                <View style={styles.chipWrap}>
                    {availableWorlds.map((w) => (
                        <Chip
                            key={w}
                            selected={universalisPrefs.world === w}
                            onPress={() => handleWorldPress(w)}
                            style={styles.chip}
                            showSelectedCheck
                        >
                            {w}
                        </Chip>
                    ))}
                </View>
            )}

            <View style={styles.bottomPad} />
        </ScrollView>
    );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const CARD_WIDTH = "30%";

const styles = StyleSheet.create({
    root: {
        flex: 1,
    },
    content: {
        padding: 20,
        paddingTop: 16,
    },
    sectionHeader: {
        marginTop: 8,
        marginBottom: 12,
        letterSpacing: 1,
    },
    subLabel: {
        marginTop: 12,
        marginBottom: 8,
    },
    divider: {
        marginVertical: 20,
    },
    // Theme grid
    themeGrid: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 10,
    },
    themeCard: {
        width: CARD_WIDTH,
        borderRadius: 10,
        overflow: "hidden",
        borderWidth: 1.5,
        borderColor: "transparent",
    },
    themeCardBar: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 8,
        paddingVertical: 10,
        gap: 6,
    },
    themeCardDot: {
        width: 12,
        height: 12,
        borderRadius: 6,
    },
    themeCardLine: {
        flex: 1,
        height: 4,
        borderRadius: 2,
    },
    themeCardFooter: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 8,
        paddingVertical: 6,
    },
    themeCardLabel: {
        fontSize: 11,
        fontWeight: "600",
        flex: 1,
    },
    themeCheckBadge: {
        width: 8,
        height: 8,
        borderRadius: 4,
        marginLeft: 4,
    },
    // Language
    segmented: {
        alignSelf: "flex-start",
    },
    // Radio
    radioRow: {
        flexDirection: "row",
        flexWrap: "wrap",
    },
    radioItem: {
        width: "50%",
    },
    radioItemInner: {
        paddingVertical: 2,
        paddingHorizontal: 0,
    },
    // Chips
    chipWrap: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 8,
        marginTop: 4,
    },
    chip: {
        marginBottom: 2,
    },
    hint: {
        fontStyle: "italic",
        marginBottom: 8,
    },
    bottomPad: {
        height: 40,
    },
});
