import { type Logform } from 'winston';

interface IMessageInfo extends Logform.TransformableInfo {
  message: unknown[];
}

interface IMessageFormater {
  (info: IMessageInfo): string;
}

interface IMessageFormaterCreatorOptions {
  isColored?: boolean;
}

interface IMessageFormaterCreator {
  (options?: IMessageFormaterCreatorOptions): IMessageFormater;
}

interface IJsonReplacer {
  (key: string, value: unknown): unknown;
}

export type { IJsonReplacer, IMessageFormaterCreator };
