import type { Agenda } from 'agenda';
import type { Db as MongoDb } from 'mongodb';

interface LoggerType {
  error: (...args: any[]) => void;
  warn: (...args: any[]) => void;
  info: (...args: any[]) => void;
  debug: (...args: any[]) => void;
}

declare global {
  let Logger: LoggerType;
  let Mongo: MongoDb;
  let Agenda: Agenda;
}

export {};
