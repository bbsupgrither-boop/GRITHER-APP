// src/bot.js
import { Telegraf } from "telegraf";
import { supabase } from "./db.js";

// === Р В Р’ВР В РЎСљР В Р’ВР В Р’В¦Р В Р’ВР В РЎвЂ™Р В РІР‚С”Р В Р’ВР В РІР‚вЂќР В РЎвЂ™Р В Р’В¦Р В Р’ВР В Р вЂЎ Р В РІР‚ВР В РЎвЂєР В РЎС›Р В РЎвЂ™ ===
const token = process.env.BOT_TOKEN;
if (!token) throw new Error("BOT_TOKEN is missing");
export const bot = new Telegraf(token);

// === Р В РўС’Р В РІР‚СћР В РІР‚С”Р В РЎСџР В РІР‚СћР В Р’В : Р В РЎСџР В Р’В Р В РЎвЂєР В РІР‚в„ўР В РІР‚СћР В Р’В Р В РЎв„ўР В РЎвЂ™ Р В РЎвЂ™Р В РІР‚СњР В РЎС™Р В Р’ВР В РЎСљР В РЎвЂ™ ===
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

// === Р В РІР‚С”Р В РЎвЂєР В РІР‚Сљ Р В РІР‚в„ўР В Р Р‹Р В РІР‚СћР В РўС’ Р В РЎС›Р В РІР‚СћР В РЎв„ўР В Р Р‹Р В РЎС›Р В РЎвЂєР В РІР‚в„ўР В Р’В«Р В РўС’ Р В Р Р‹Р В РЎвЂєР В РЎвЂєР В РІР‚ВР В Р’В©Р В РІР‚СћР В РЎСљР В Р’ВР В РІвЂћСћ (Р В РўвЂР В Р’В»Р РЋР РЏ Р В РўвЂР В РЎвЂР В Р’В°Р В РЎвЂ“Р В Р вЂ¦Р В РЎвЂўР РЋР С“Р РЋРІР‚С™Р В РЎвЂР В РЎвЂќР В РЎвЂ) ===
bot.on("text", async (ctx, next) => {
  try {
    console.log("[text]", ctx.message?.text, "from", ctx.from?.id);
  } catch {}
  return next();
});

// === Р В Р Р‹Р В РЎС›Р В РЎвЂ™Р В Р’В Р В РЎС› ===
bot.start(async (ctx) => {
  const webAppUrl = 'https://bright-tiramisu-4df5d7.netlify.app/?v=5';
  await ctx.reply('Р В РЎвЂєР РЋРІР‚С™Р В РЎвЂќР РЋР вЂљР РЋРІР‚в„–Р РЋРІР‚С™Р РЋР Р‰ Р В РЎвЂ”Р РЋР вЂљР В РЎвЂР В Р’В»Р В РЎвЂўР В Р’В¶Р В Р’ВµР В Р вЂ¦Р В РЎвЂР В Р’Вµ РЎР‚РЎСџРІР‚ВРІР‚РЋ', {
    reply_markup: {
      keyboard: [[{ text: 'Р В РЎвЂєР РЋРІР‚С™Р В РЎвЂќР РЋР вЂљР РЋРІР‚в„–Р РЋРІР‚С™Р РЋР Р‰ GRITHER', web_app: { url: webAppUrl } }]],
      resize_keyboard: true,
      one_time_keyboard: true
    }
  });
});

// === Р В РЎСџР В РЎвЂєР В РЎС™Р В РЎвЂєР В Р’В©Р В Р’В¬ ===
bot.command("help", async (ctx) => {
  await ctx.reply(
    [
      "Р В РЎв„ўР В РЎвЂўР В РЎВР В Р’В°Р В Р вЂ¦Р В РўвЂР РЋРІР‚в„–:",
      "/ping Р Р†Р вЂљРІР‚Сњ Р В РЎвЂ”Р РЋР вЂљР В РЎвЂўР В Р вЂ Р В Р’ВµР РЋР вЂљР В РЎвЂќР В Р’В° Р РЋР С“Р В Р вЂ Р РЋР РЏР В Р’В·Р В РЎвЂ",
      "/admin Р Р†Р вЂљРІР‚Сњ Р В РЎвЂ”Р РЋР вЂљР В РЎвЂўР В Р вЂ Р В Р’ВµР РЋР вЂљР В РЎвЂР РЋРІР‚С™Р РЋР Р‰ Р В РЎвЂ”Р РЋР вЂљР В Р’В°Р В Р вЂ Р В Р’В°",
      "/list Р Р†Р вЂљРІР‚Сњ Р РЋР С“Р В РЎвЂ”Р В РЎвЂР РЋР С“Р В РЎвЂўР В РЎвЂќ Р В РЎвЂќР В РЎвЂўР В Р вЂ¦Р РЋРІР‚С™Р В Р’ВµР В Р вЂ¦Р РЋРІР‚С™-Р В Р’В±Р В Р’В»Р В РЎвЂўР В РЎвЂќР В РЎвЂўР В Р вЂ  (Р В Р’В°Р В РўвЂР В РЎВР В РЎвЂР В Р вЂ¦)",
      "/get <slug> Р Р†Р вЂљРІР‚Сњ Р В РЎвЂ”Р В РЎвЂўР В РЎвЂќР В Р’В°Р В Р’В·Р В Р’В°Р РЋРІР‚С™Р РЋР Р‰ Р В Р’В±Р В Р’В»Р В РЎвЂўР В РЎвЂќ Р В РЎвЂќР В РЎвЂўР В Р вЂ¦Р РЋРІР‚С™Р В Р’ВµР В Р вЂ¦Р РЋРІР‚С™Р В Р’В°",
      "/set <slug>|Р В РІР‚вЂќР В Р’В°Р В РЎвЂ“Р В РЎвЂўР В Р’В»Р В РЎвЂўР В Р вЂ Р В РЎвЂўР В РЎвЂќ|Р В РЎС›Р В Р’ВµР В РЎвЂќР РЋР С“Р РЋРІР‚С™ Р Р†Р вЂљРІР‚Сњ Р РЋР С“Р В РЎвЂўР В Р’В·Р В РўвЂР В Р’В°Р РЋРІР‚С™Р РЋР Р‰/Р В РЎвЂўР В Р’В±Р В Р вЂ¦Р В РЎвЂўР В Р вЂ Р В РЎвЂР РЋРІР‚С™Р РЋР Р‰ Р В Р’В±Р В Р’В»Р В РЎвЂўР В РЎвЂќ (Р В Р’В°Р В РўвЂР В РЎВР В РЎвЂР В Р вЂ¦)",
    ].join("\n")
  );
});

// === PING ===
bot.command("ping", async (ctx) => {
  await ctx.reply("pong");
});

// === Р В РЎСџР В Р’В Р В РЎвЂєР В РІР‚в„ўР В РІР‚СћР В Р’В Р В РЎв„ўР В РЎвЂ™ Р В РЎвЂ™Р В РІР‚СњР В РЎС™Р В Р’ВР В РЎСљР В РЎвЂ™ ===
bot.command("admin", async (ctx) => {
  const ok = await isAdmin(ctx.from.id);
  await ctx.reply(ok ? "Р В РЎС›Р РЋРІР‚в„– Р В Р’В°Р В РўвЂР В РЎВР В РЎвЂР В Р вЂ¦ Р Р†РЎС™РІР‚В¦" : "Р В РЎСљР В Р’ВµР РЋРІР‚С™ Р В РўвЂР В РЎвЂўР РЋР С“Р РЋРІР‚С™Р РЋРЎвЂњР В РЎвЂ”Р В Р’В° Р Р†РЎСљР Р‰");
});

// === Р В Р Р‹Р В РЎСџР В Р’ВР В Р Р‹Р В РЎвЂєР В РЎв„ў Р В РІР‚ВР В РІР‚С”Р В РЎвЂєР В РЎв„ўР В РЎвЂєР В РІР‚в„ў (Р В РЎвЂ™Р В РІР‚СњР В РЎС™Р В Р’ВР В РЎСљ) ===
bot.command("list", async (ctx) => {
  if (!(await isAdmin(ctx.from.id))) {
    await ctx.reply("Р В РЎСљР В Р’ВµР РЋРІР‚С™ Р В РўвЂР В РЎвЂўР РЋР С“Р РЋРІР‚С™Р РЋРЎвЂњР В РЎвЂ”Р В Р’В° Р Р†РЎСљР Р‰");
    return;
  }
  const { data, error } = await supabase
    .from("content_blocks")
    .select("slug,title,updated_at")
    .order("updated_at", { ascending: false })
    .limit(30);

  if (error) {
    await ctx.reply("Р В РЎвЂєР РЋРІвЂљВ¬Р В РЎвЂР В Р’В±Р В РЎвЂќР В Р’В°: " + error.message);
    return;
  }
  if (!data || data.length === 0) {
    await ctx.reply("Р В РЎСџР РЋРЎвЂњР РЋР С“Р РЋРІР‚С™Р В РЎвЂў");
    return;
  }
  await ctx.reply(data.map((r) => `Р Р†Р вЂљРЎС› ${r.slug} Р Р†Р вЂљРІР‚Сњ ${r.title}`).join("\n"));
});

// === Р В РЎСџР В РЎвЂєР В РІР‚С”Р В Р в‚¬Р В Р’В§Р В Р’ВР В РЎС›Р В Р’В¬ Р В РЎв„ўР В РЎвЂєР В РЎСљР В РЎС›Р В РІР‚СћР В РЎСљР В РЎС›: /get about ===
bot.command("get", async (ctx) => {
  const txt = ctx.message?.text || "";
  // Р В РЎвЂ”Р В РЎвЂўР В РўвЂР В РўвЂР В Р’ВµР РЋР вЂљР В Р’В¶Р В РЎвЂР В РЎВ /get Р В РЎвЂ /get@Р В РЎвЂР В РЎВР РЋР РЏР В Р’В±Р В РЎвЂўР РЋРІР‚С™Р В Р’В°
  const payload = txt.replace(/^\/get(@\S+)?\s*/i, "");
  const slug = payload.trim();
  if (!slug) {
    await ctx.reply("Р В Р’В¤Р В РЎвЂўР РЋР вЂљР В РЎВР В Р’В°Р РЋРІР‚С™: /get slug");
    return;
  }

  const { data, error } = await supabase
    .from("content_blocks")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error || !data) {
    await ctx.reply("Р В РЎСљР В Р’Вµ Р В Р вЂ¦Р В Р’В°Р В РІвЂћвЂ“Р В РўвЂР В Р’ВµР В Р вЂ¦Р В РЎвЂў");
    return;
  }
  await ctx.reply(`*${data.title}*\n\n${data.body}`, { parse_mode: "Markdown" });
});

// === Р В Р Р‹Р В РЎвЂєР В РІР‚вЂќР В РІР‚СњР В РЎвЂ™Р В РЎС›Р В Р’В¬/Р В РЎвЂєР В РІР‚ВР В РЎСљР В РЎвЂєР В РІР‚в„ўР В Р’ВР В РЎС›Р В Р’В¬ Р В РЎв„ўР В РЎвЂєР В РЎСљР В РЎС›Р В РІР‚СћР В РЎСљР В РЎС›: /set about|Р В РІР‚вЂќР В Р’В°Р В РЎвЂ“Р В РЎвЂўР В Р’В»Р В РЎвЂўР В Р вЂ Р В РЎвЂўР В РЎвЂќ|Р В РЎС›Р В Р’ВµР В РЎвЂќР РЋР С“Р РЋРІР‚С™ ===
bot.command("set", async (ctx) => {
  if (!(await isAdmin(ctx.from.id))) {
    await ctx.reply("Р В РЎСљР В Р’ВµР РЋРІР‚С™ Р В РўвЂР В РЎвЂўР РЋР С“Р РЋРІР‚С™Р РЋРЎвЂњР В РЎвЂ”Р В Р’В° Р Р†РЎСљР Р‰");
    return;
  }

  const txt = ctx.message?.text || "";
  // Р В РЎвЂ”Р В РЎвЂўР В РўвЂР В РўвЂР В Р’ВµР РЋР вЂљР В Р’В¶Р В РЎвЂР В РЎВ /set Р В РЎвЂ /set@Р В РЎвЂР В РЎВР РЋР РЏР В Р’В±Р В РЎвЂўР РЋРІР‚С™Р В Р’В°
  const payload = txt.replace(/^\/set(@\S+)?\s*/i, "");
  const parts = payload.split("|");
  const slug = (parts[0] || "").trim();
  const title = (parts[1] || "").trim();
  const body = parts.slice(2).join("|").trim();

  if (!slug || !title || !body) {
    await ctx.reply("Р В Р’В¤Р В РЎвЂўР РЋР вЂљР В РЎВР В Р’В°Р РЋРІР‚С™: /set slug|Р В РІР‚вЂќР В Р’В°Р В РЎвЂ“Р В РЎвЂўР В Р’В»Р В РЎвЂўР В Р вЂ Р В РЎвЂўР В РЎвЂќ|Р В РЎС›Р В Р’ВµР В РЎвЂќР РЋР С“Р РЋРІР‚С™");
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
    await ctx.reply("Р В РЎвЂєР РЋРІвЂљВ¬Р В РЎвЂР В Р’В±Р В РЎвЂќР В Р’В°: " + error.message);
    return;
  }

  console.log("[content_updated]", { slug, by: ctx.from.id });
  await ctx.reply(`OK: ${data.slug} Р В РЎвЂўР В Р’В±Р В Р вЂ¦Р В РЎвЂўР В Р вЂ Р В Р’В»Р РЋРІР‚ВР В Р вЂ¦`);
});

// === Р В Р’В­Р В РЎв„ўР В Р Р‹Р В РЎСџР В РЎвЂєР В Р’В Р В РЎС› Р В РІР‚в„ўР В РІР‚СћР В РІР‚ВР В РўС’Р В Р в‚¬Р В РЎв„ўР В РЎвЂ™ ===
export const webhookCallback = bot.webhookCallback("/");
