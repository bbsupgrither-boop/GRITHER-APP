// src/bot.js
import { Telegraf } from "telegraf";
import { supabase } from "./db.js";

// === РРќРР¦РРђР›РР—РђР¦РРЇ Р‘РћРўРђ ===
const token = process.env.BOT_TOKEN;
if (!token) throw new Error("BOT_TOKEN is missing");
export const bot = new Telegraf(token);

// === РҐР•Р›РџР•Р : РџР РћР’Р•Р РљРђ РђР”РњРРќРђ ===
async function isAdmin(userId) {
  const { data, error } = await supabase
    .from("admins")
    .select("user_id")
    .eq("user_id", userId)
    .limit(1);
  if (error) {
    console.error("[admins select] error:", error.message);
    return false;
  }
  return Array.isArray(data) && data.length === 1;
}

// === Р›РћР“ Р’РЎР•РҐ РўР•РљРЎРўРћР’Р«РҐ РЎРћРћР‘Р©Р•РќРР™ (РґР»СЏ РґРёР°РіРЅРѕСЃС‚РёРєРё) ===
bot.on("text", async (ctx, next) => {
  try {
    console.log("[text]", ctx.message?.text, "from", ctx.from?.id);
  } catch {}
  return next();
});

// === РЎРўРђР Рў ===
bot.start(async (ctx) => {
  const webAppUrl = 'https://bright-tiramisu-4df5d7.netlify.app/?v=5';
  await ctx.reply('РћС‚РєСЂС‹С‚СЊ РїСЂРёР»РѕР¶РµРЅРёРµ рџ‘‡', {
    reply_markup: {
      keyboard: [[{ text: 'РћС‚РєСЂС‹С‚СЊ GRITHER', web_app: { url: webAppUrl } }]],
      resize_keyboard: true,
      one_time_keyboard: true
    }
  });
});

// === РџРћРњРћР©Р¬ ===
bot.command("help", async (ctx) => {
  await ctx.reply(
    [
      "РљРѕРјР°РЅРґС‹:",
      "/ping вЂ” РїСЂРѕРІРµСЂРєР° СЃРІСЏР·Рё",
      "/admin вЂ” РїСЂРѕРІРµСЂРёС‚СЊ РїСЂР°РІР°",
      "/list вЂ” СЃРїРёСЃРѕРє РєРѕРЅС‚РµРЅС‚-Р±Р»РѕРєРѕРІ (Р°РґРјРёРЅ)",
      "/get <slug> вЂ” РїРѕРєР°Р·Р°С‚СЊ Р±Р»РѕРє РєРѕРЅС‚РµРЅС‚Р°",
      "/set <slug>|Р—Р°РіРѕР»РѕРІРѕРє|РўРµРєСЃС‚ вЂ” СЃРѕР·РґР°С‚СЊ/РѕР±РЅРѕРІРёС‚СЊ Р±Р»РѕРє (Р°РґРјРёРЅ)",
    ].join("\n")
  );
});

// === PING ===
bot.command("ping", async (ctx) => {
  await ctx.reply("pong");
});

// === РџР РћР’Р•Р РљРђ РђР”РњРРќРђ ===
bot.command("admin", async (ctx) => {
  const ok = await isAdmin(ctx.from.id);
  await ctx.reply(ok ? "РўС‹ Р°РґРјРёРЅ вњ…" : "РќРµС‚ РґРѕСЃС‚СѓРїР° вќЊ");
});

// === РЎРџРРЎРћРљ Р‘Р›РћРљРћР’ (РђР”РњРРќ) ===
bot.command("list", async (ctx) => {
  if (!(await isAdmin(ctx.from.id))) {
    await ctx.reply("РќРµС‚ РґРѕСЃС‚СѓРїР° вќЊ");
    return;
  }
  const { data, error } = await supabase
    .from("content_blocks")
    .select("slug,title,updated_at")
    .order("updated_at", { ascending: false })
    .limit(30);

  if (error) {
    await ctx.reply("РћС€РёР±РєР°: " + error.message);
    return;
  }
  if (!data || data.length === 0) {
    await ctx.reply("РџСѓСЃС‚Рѕ");
    return;
  }
  await ctx.reply(data.map((r) => `вЂў ${r.slug} вЂ” ${r.title}`).join("\n"));
});

// === РџРћР›РЈР§РРўР¬ РљРћРќРўР•РќРў: /get about ===
bot.command("get", async (ctx) => {
  const txt = ctx.message?.text || "";
  // РїРѕРґРґРµСЂР¶РёРј /get Рё /get@РёРјСЏР±РѕС‚Р°
  const payload = txt.replace(/^\/get(@\S+)?\s*/i, "");
  const slug = payload.trim();
  if (!slug) {
    await ctx.reply("Р¤РѕСЂРјР°С‚: /get slug");
    return;
  }

  const { data, error } = await supabase
    .from("content_blocks")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error || !data) {
    await ctx.reply("РќРµ РЅР°Р№РґРµРЅРѕ");
    return;
  }
  await ctx.reply(`*${data.title}*\n\n${data.body}`, { parse_mode: "Markdown" });
});

// === РЎРћР—Р”РђРўР¬/РћР‘РќРћР’РРўР¬ РљРћРќРўР•РќРў: /set about|Р—Р°РіРѕР»РѕРІРѕРє|РўРµРєСЃС‚ ===
bot.command("set", async (ctx) => {
  if (!(await isAdmin(ctx.from.id))) {
    await ctx.reply("РќРµС‚ РґРѕСЃС‚СѓРїР° вќЊ");
    return;
  }

  const txt = ctx.message?.text || "";
  // РїРѕРґРґРµСЂР¶РёРј /set Рё /set@РёРјСЏР±РѕС‚Р°
  const payload = txt.replace(/^\/set(@\S+)?\s*/i, "");
  const parts = payload.split("|");
  const slug = (parts[0] || "").trim();
  const title = (parts[1] || "").trim();
  const body = parts.slice(2).join("|").trim();

  if (!slug || !title || !body) {
    await ctx.reply("Р¤РѕСЂРјР°С‚: /set slug|Р—Р°РіРѕР»РѕРІРѕРє|РўРµРєСЃС‚");
    return;
  }

  const { data, error } = await supabase
    .from("content_blocks")
    .upsert({
      slug,
      title,
      body,
      updated_by: String(ctx.from.id),
    })
    .select()
    .single();

  if (error) {
    await ctx.reply("РћС€РёР±РєР°: " + error.message);
    return;
  }

  console.log("[content_updated]", { slug, by: ctx.from.id });
  await ctx.reply(`OK: ${data.slug} РѕР±РЅРѕРІР»С‘РЅ`);
});

// === Р­РљРЎРџРћР Рў Р’Р•Р‘РҐРЈРљРђ ===
export const webhookCallback = bot.webhookCallback("/");
