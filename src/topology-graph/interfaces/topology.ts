/*
 * @interface
 */
export interface ITopology {
  items: ITopologyItems;
  relations: Array<ITopologyRelation>[];
  kinds: Array<string>[];
  icons: Array<ITopologyIcons>[];
}

/*
 * @interface
 */
export interface ITopologyItems {
  [name: string]: ITopologyItemDetail;
}

/*
 * @interface
 */
export interface ITopologyItemDetail {
  kind: string;
  miq_id: string;
  status: string;
  display_kind: string;
  provider?: string;
}

/*
 * @interface
 */
export interface ITopologyRelation {
  source: string;
  target: string;
}

/*
 * @interface
 */
export interface ITopologyIcons {
  [kind: string]: ITopologyIcon;
}

/*
 * @interface
 */
export interface ITopologyIcon {
  type: string;
  class: string;
  path: string;
}
