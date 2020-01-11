/* tslint:disable:variable-name */
import extend from 'lodash/extend';
import isArray from 'lodash/isArray';
import isBoolean from 'lodash/isBoolean';
import isNumber from 'lodash/isNumber';
import isObject from 'lodash/isObject';
import isString from 'lodash/isString';
import mapValues from 'lodash/mapValues';

export interface KnobsInterface {
  text: (name: string, val: string) => string,
  number: (name: string, val: number) => number,
  boolean: (name: string, val: boolean) => boolean,
  object: (name: string, val: any) => any,
  select: (name: string, options: any, val: any) => any,
};

export const mockKnobs: KnobsInterface = {
  text: (_name: string, val: string) => val,
  number: (_name: string, val: number) => val,
  boolean: (_name: string, val: boolean) => val,
  object: (_name: string, val: object) => val,
  select: (_name: string, _options: any, val: any) => val,
};

export const injectKnobs = (
  knobs: KnobsInterface,
  knobValues: any,
  baseProps: any,
) => extend(
  {},
  baseProps,
  mapValues(
    knobValues,
    (value, key) => {
      switch (true) {
        case isBoolean(baseProps[key]):
          return knobs.boolean(key, value)
        case isNumber(baseProps[key]):
          return knobs.number(key, value)
        case isObject(baseProps[key]):
        case isArray(baseProps[key]):
          return knobs.object(key, value)
        case isString(baseProps[key]):
        default:
          return knobs.text(key, value)
      }
    },
  ),
);
