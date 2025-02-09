import { ElementItem } from "./ElementItem";

export interface BaseItemData {
  text: string;
  href: string;
  icon: string;
  tooltip: string;
}

type ItemDataset = Record<string, string> & BaseItemData;

type ItemData = Record<string, string | undefined | Array<ItemData>> & BaseItemData;

interface NestedItemData extends ItemData {
  children?: Array<NestedItemData>;
}

interface ItemOptions {
  sortableClassname: string;
}

interface ItemParameters {
  item: ElementItem;
}

type Itemlistener = (params: ItemParameters) => void;

interface MenuEditorOptions {
  maxLevel: number;
}

export type {
  NestedItemData,
  ItemOptions,
  Itemlistener,
  ItemParameters,
  ItemData,
  ItemDataset,
  MenuEditorOptions
};
