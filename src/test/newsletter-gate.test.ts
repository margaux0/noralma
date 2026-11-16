import { describe, expect, it, vi } from "vitest";

const adminLoad = vi.hoisted(() => vi.fn());
vi.mock("@/integrations/supabase/client.server", () => {
  adminLoad();
  return { supabaseAdmin: {} };
});
vi.mock("@tanstack/react-start", () => ({
  createServerFn: () => ({
    inputValidator: () => ({ handler: (fn: unknown) => fn }),
  }),
}));
import { subscribeNewsletter } from "@/lib/notifications.functions";

describe("Altas cerradas de La carta de Noralma", () => {
  it("rechaza una petición directa sin acceder a los suscriptores", async () => {
    const handler = subscribeNewsletter as unknown as (input: { data: { email: string } }) => Promise<{ ok: boolean }>;
    expect(await handler({ data: { email: "test@example.org" } })).toEqual({ ok: false });
    expect(adminLoad).not.toHaveBeenCalled();
  });
});