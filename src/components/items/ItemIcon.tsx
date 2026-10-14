import React, { useState } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { Icon, useTheme } from 'react-native-paper';

import { radius } from '@/theme/spacing';

interface ItemIconProps {
    uri: string;
    size?: number;
}

/** Item icon with a neutral placeholder while loading or when the image is unavailable. */
export function ItemIcon({ uri, size = 40 }: ItemIconProps) {
    const theme = useTheme();
    const [hasError, setHasError] = useState(false);
    const boxStyle = {
        width: size,
        height: size,
        backgroundColor: theme.colors.surfaceVariant,
        borderColor: theme.colors.outline,
    };

    return (
        <View
            style={[styles.box, boxStyle]}
            accessibilityElementsHidden
            importantForAccessibility="no"
        >
            {hasError ? (
                <Icon
                    source="package-variant"
                    size={size * 0.6}
                    color={theme.colors.onSurfaceVariant}
                />
            ) : (
                <Image
                    source={{ uri }}
                    style={{ width: size, height: size }}
                    onError={() => setHasError(true)}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    box: {
        borderRadius: radius.sm,
        borderWidth: StyleSheet.hairlineWidth,
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
