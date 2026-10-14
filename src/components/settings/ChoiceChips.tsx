import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Chip } from 'react-native-paper';

import { spacing } from '@/theme/spacing';

interface ChoiceChipsProps<T extends string> {
    options: readonly { value: T; label: string }[];
    selected: T | null;
    onSelect: (value: T) => void;
}

/** Single-choice group of chips (wraps on several lines). */
export function ChoiceChips<T extends string>({
    options,
    selected,
    onSelect,
}: ChoiceChipsProps<T>) {
    return (
        <View style={styles.wrap} accessibilityRole="radiogroup">
            {options.map((option) => {
                const isSelected = option.value === selected;
                return (
                    <Chip
                        key={option.value}
                        selected={isSelected}
                        showSelectedCheck
                        mode={isSelected ? 'flat' : 'outlined'}
                        onPress={() => onSelect(option.value)}
                        accessibilityRole="radio"
                        accessibilityState={{ checked: isSelected }}
                    >
                        {option.label}
                    </Chip>
                );
            })}
        </View>
    );
}

const styles = StyleSheet.create({
    wrap: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: spacing.sm,
    },
});
