import test from 'node:test';
import assert from 'node:assert/strict';
import { getCharacters, createSession, getSession, switchSession, sendMessage, sendDecision, ApiError } from '../src/api.js';

test('usa o contrato público e o cookie do navegador nas rotas de conversa', async (t) => {
  const calls = [];
  t.mock.method(globalThis, 'fetch', async (path, options) => {
    calls.push([path, options.method ?? 'GET', options.body && JSON.parse(options.body)]);
    assert.equal(options.credentials, 'include');
    return Response.json({});
  });
  await getCharacters();
  await createSession(42);
  await getSession('a/b');
  await switchSession('a/b', 87);
  await sendMessage('t', 'Windows');
  await sendDecision('t', {action_id: 'p', version: 2, decision: 'no'});
  assert.deepEqual(calls, [
    ['/api/characters', 'GET', undefined], ['/api/sessions', 'POST', {character_id: 42}],
    ['/api/sessions/a%2Fb', 'GET', undefined], ['/api/sessions/a%2Fb/switch', 'POST', {character_id: 87}],
    ['/api/sessions/t/messages', 'POST', {text: 'Windows'}],
    ['/api/sessions/t/decisions', 'POST', {action_id: 'p', version: 2, decision: 'no'}],
  ]);
});

test('expõe o código de sessão expirada da API', async (t) => {
  t.mock.method(globalThis, 'fetch', async () => Response.json({error: {code:'session_not_found'}}, {status:404}));
  await assert.rejects(getSession('expirada'), e => e instanceof ApiError && e.code === 'session_not_found');
});
