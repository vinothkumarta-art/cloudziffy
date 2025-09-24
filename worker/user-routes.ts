import { Hono } from "hono";
import type { Env } from './core-utils';
import { DealEntity, CategoryEntity, BrandEntity, UserEntity } from "./entities";
import { ok, bad, isStr } from './core-utils';
// Simple password hashing using Web Crypto API
async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}
export function userRoutes(app: Hono<{ Bindings: Env }>) {
  // --- Auth Routes ---
  app.post('/api/auth/signup', async (c) => {
    const { name, email, password } = await c.req.json();
    if (!isStr(name) || !isStr(email) || !isStr(password)) {
      return bad(c, 'Name, email, and password are required.');
    }
    const userExists = await new UserEntity(c.env, email).exists();
    if (userExists) {
      return bad(c, 'User with this email already exists.');
    }
    const passwordHash = await hashPassword(password);
    const newUser = {
      id: crypto.randomUUID(),
      name,
      email,
      passwordHash,
    };
    await UserEntity.create(c.env, newUser);
    // In a real app, you'd generate a JWT. For this demo, we'll return a simple token.
    const token = `fake-token-for-${newUser.id}`;
    const { passwordHash: _, ...userResponse } = newUser;
    return ok(c, { user: userResponse, token });
  });
  app.post('/api/auth/login', async (c) => {
    const { email, password } = await c.req.json();
    if (!isStr(email) || !isStr(password)) {
      return bad(c, 'Email and password are required.');
    }
    const userEntity = new UserEntity(c.env, email);
    if (!(await userEntity.exists())) {
      return bad(c, 'Invalid email or password.');
    }
    const user = await userEntity.getState();
    const passwordHash = await hashPassword(password);
    if (user.passwordHash !== passwordHash) {
      return bad(c, 'Invalid email or password.');
    }
    const token = `fake-token-for-${user.id}`;
    const { passwordHash: _, ...userResponse } = user;
    return ok(c, { user: userResponse, token });
  });
  // --- Data Routes ---
  app.get('/api/deals', async (c) => {
    await DealEntity.ensureSeed(c.env);
    const page = await DealEntity.list(c.env);
    return ok(c, page.items);
  });
  app.get('/api/categories', async (c) => {
    await CategoryEntity.ensureSeed(c.env);
    const page = await CategoryEntity.list(c.env);
    return ok(c, page.items);
  });
  app.get('/api/brands', async (c) => {
    await BrandEntity.ensureSeed(c.env);
    const page = await BrandEntity.list(c.env);
    return ok(c, page.items);
  });
}