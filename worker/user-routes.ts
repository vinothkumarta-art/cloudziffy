import { Hono } from "hono";
import type { Env } from './core-utils';
import { DealEntity, CategoryEntity, BrandEntity } from "./entities";
import { ok } from './core-utils';
export function userRoutes(app: Hono<{ Bindings: Env }>) {
  // Endpoint to fetch all deals
  app.get('/api/deals', async (c) => {
    await DealEntity.ensureSeed(c.env);
    const page = await DealEntity.list(c.env);
    return ok(c, page.items);
  });
  // Endpoint to fetch all categories
  app.get('/api/categories', async (c) => {
    await CategoryEntity.ensureSeed(c.env);
    const page = await CategoryEntity.list(c.env);
    return ok(c, page.items);
  });
  // Endpoint to fetch all brands
  app.get('/api/brands', async (c) => {
    await BrandEntity.ensureSeed(c.env);
    const page = await BrandEntity.list(c.env);
    return ok(c, page.items);
  });
}