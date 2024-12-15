interface IGizmekUkaTargetEntry {
  name: string; // TODO: distinguish between card name and pagename
  atkDef: number;
  attribute?: string;
  type?: string;
  level: string; // TODO: "stars"
  ssFromDeck: boolean;
  isNormalMonster: boolean;
}

export type { IGizmekUkaTargetEntry };
