import getAccountInformation from '~commands/getAccountInformation';
import { createConnection, destroyConnection } from '~dev/utils';
import type { ConnectionType } from '~types/Connection.model';

let connection: ConnectionType;

beforeAll((done) => {
  (async () => {
    try {
      connection = await createConnection();
    } catch (err) {
      Logger.error('Failed to connect', err);
    } finally {
      done();
    }
  })();
});

afterAll((done) => {
  (async () => {
    try {
      await destroyConnection(connection);
    } catch (err) {
      Logger.error('Failed to destroy', err);
    } finally {
      done();
    }
  })();
});

test('getAccountInformation', async () => {
  expect(connection).toBeDefined();
  const result = await getAccountInformation(connection);
  expect(result?.balance).toBeDefined();
});
