import { describe, expect, it } from "vitest";
import {
  parseFollowers,
  parseInstagramFollowers,
  parseTiktokFollowers,
} from "@/lib/social.functions";

describe("parseFollowers", () => {
  it("lee 5.803 escrito con coma de millar (formato inglés)", () => {
    expect(parseFollowers("5,803")).toBe(5803);
  });

  it("lee 5.803 escrito con punto de millar (formato español)", () => {
    expect(parseFollowers("5.803")).toBe(5803);
  });

  it("lee cifras abreviadas como 5,8 mil", () => {
    expect(parseFollowers("5,8mil")).toBe(5800);
    expect(parseFollowers("5.8K")).toBe(5800);
  });

  it("no devuelve nada si no hay cifra", () => {
    expect(parseFollowers("")).toBeNull();
    expect(parseFollowers("seguidores")).toBeNull();
  });
});

describe("parseInstagramFollowers", () => {
  it("extrae la cifra de seguidores de la página pública", () => {
    const html = `<div class="x"><span>5,803 seguidores</span><span>191 publicaciones</span></div>`;
    expect(parseInstagramFollowers(html)).toBe(5803);
  });

  it("devuelve null si la página no muestra la cifra", () => {
    expect(parseInstagramFollowers("<html>Inicia sesión</html>")).toBeNull();
  });
});

describe("parseTiktokFollowers", () => {
  it("extrae followerCount de la página pública", () => {
    const html = `<script>{"userInfo":{"user":{"followerCount":3144}}}</script>`;
    expect(parseTiktokFollowers(html)).toBe(3144);
  });

  it("devuelve null si no aparece la cifra", () => {
    expect(parseTiktokFollowers("<html></html>")).toBeNull();
  });
});
