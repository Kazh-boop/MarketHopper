import type { StackScreenProps } from '@react-navigation/stack';

import type { Item } from '@/types/item';

export type RootStackParamList = {
    Home: undefined;
    ItemDetail: { item: Item };
    Settings: undefined;
};

export type RootStackScreenProps<T extends keyof RootStackParamList> = StackScreenProps<
    RootStackParamList,
    T
>;

declare global {
    namespace ReactNavigation {
        // eslint-disable-next-line @typescript-eslint/no-empty-object-type
        interface RootParamList extends RootStackParamList {}
    }
}
