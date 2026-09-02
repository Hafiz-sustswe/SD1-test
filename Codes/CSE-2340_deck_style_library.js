// Shared style library for CSE-2340 lecture decks (IIUC theme)
const C = {
  navy: "003366",
  navyDark: "00224A",
  ink: "1A2733",
  body: "3D4A57",
  muted: "6B7A88",
  line: "D6DEE6",
  panel: "F2F5F8",
  panelAlt: "E8EEF4",
  amber: "E39A18",
  amberSoft: "FDF3E1",
  green: "1F7A55",
  greenSoft: "E7F4EE",
  red: "B3261E",
  redSoft: "FBEAE8",
  white: "FFFFFF",
  code: "0D1B2A",
  codeText: "E8EEF7",
  codeTag: "8FD3FF",
  codeStr: "A8E6A3",
  codeCmt: "8296A8",
  codeKey: "FFC46B",
};

const F = { head: "Arial", body: "Arial", mono: "Courier New" };

const W = 13.333, H = 7.5, M = 0.6;

function newDeck(title, subject) {
  const pptxgen = require("pptxgenjs");
  const p = new pptxgen();
  p.layout = "LAYOUT_WIDE";
  p.author = "Md Sadman Hafiz";
  p.company = "International Islamic University Chittagong";
  p.title = title;
  p.subject = subject;
  return p;
}

// ---------- code highlighting ----------
function htmlRuns(line) {
  const runs = [];
  const re = /(<!--[\s\S]*?-->)|(<\/?[A-Za-z!][^>]*>?)/g;
  let last = 0, m;
  while ((m = re.exec(line)) !== null) {
    if (m.index > last) runs.push({ text: line.slice(last, m.index), color: C.codeText });
    const tok = m[0];
    if (tok.startsWith("<!--")) {
      runs.push({ text: tok, color: C.codeCmt });
    } else {
      tok.split(/("[^"]*")/).forEach((part) => {
        if (!part) return;
        runs.push({ text: part, color: part.startsWith('"') ? C.codeStr : C.codeTag });
      });
    }
    last = m.index + tok.length;
  }
  if (last < line.length) runs.push({ text: line.slice(last), color: C.codeText });
  if (runs.length === 0) runs.push({ text: line || " ", color: C.codeText });
  return runs;
}

function bashRuns(line) {
  if (line.trim().startsWith("#")) return [{ text: line || " ", color: C.codeCmt }];
  const runs = [];
  // split off a trailing inline comment that is not inside quotes
  let body = line, tail = "";
  const hashAt = line.indexOf(" #");
  if (hashAt !== -1 && (line.slice(0, hashAt).match(/"/g) || []).length % 2 === 0) {
    body = line.slice(0, hashAt); tail = line.slice(hashAt);
  }
  const lead = body.match(/^(\s*)(git|cd|mkdir|echo)\b(.*)$/);
  let rest = body;
  if (lead) {
    if (lead[1]) runs.push({ text: lead[1], color: C.codeText });
    runs.push({ text: lead[2], color: C.codeKey });
    rest = lead[3];
  }
  rest.split(/("[^"]*")/).forEach((part) => {
    if (!part) return;
    runs.push({ text: part, color: part.startsWith('"') ? C.codeStr : C.codeText });
  });
  if (tail) runs.push({ text: tail, color: C.codeCmt });
  if (runs.length === 0) runs.push({ text: line || " ", color: C.codeText });
  return runs;
}

function plainRuns(line, color) {
  return [{ text: line || " ", color: color || C.codeText }];
}

// Code panel. opts: x,y,w,code,lang('html'|'bash'|'text'),fs, h(optional), title(optional)
function codeBox(slide, o) {
  const fs = o.fs || 12;
  const lines = o.code.replace(/\t/g, "  ").split("\n");
  const lh = fs * 1.28 / 72;
  const h = o.h || lines.length * lh + 0.30;
  slide.addShape("roundRect", {
    x: o.x, y: o.y, w: o.w, h: h,
    fill: { color: o.bg || C.code }, rectRadius: 0.06, line: { color: o.bg || C.code },
  });
  const runs = [];
  lines.forEach((ln, i) => {
    const r = o.lang === "bash" ? bashRuns(ln) : o.lang === "text" ? plainRuns(ln, o.fg) : htmlRuns(ln);
    r.forEach((x, j) => {
      runs.push({
        text: x.text,
        options: {
          color: o.fg || x.color, fontFace: F.mono, fontSize: fs,
          breakLine: i < lines.length - 1 && j === r.length - 1,
        },
      });
    });
  });
  slide.addText(runs, {
    x: o.x + 0.12, y: o.y + 0.12, w: o.w - 0.24, h: h - 0.24,
    isTextBox: true, margin: 0, valign: "top", lineSpacing: fs * 1.28,
  });
  return o.y + h;
}

// ---------- slide chrome ----------
function titleSlide(pres, o) {
  const s = pres.addSlide();
  s.background = { color: C.navy };
  s.addShape("ellipse", { x: 10.2, y: -1.6, w: 5.2, h: 5.2, fill: { color: "0A4A85" }, line: { color: "0A4A85" } });
  s.addShape("ellipse", { x: 11.6, y: 4.6, w: 3.4, h: 3.4, fill: { color: "07386A" }, line: { color: "07386A" } });
  s.addText("INTERNATIONAL ISLAMIC UNIVERSITY CHITTAGONG", {
    x: M, y: 0.85, w: 9.5, h: 0.3, isTextBox: true, margin: 0,
    fontFace: F.head, fontSize: 12, bold: true, color: C.amber, charSpacing: 1.5,
  });
  s.addText("Department of Computer Science and Engineering", {
    x: M, y: 1.18, w: 9.5, h: 0.3, isTextBox: true, margin: 0,
    fontFace: F.body, fontSize: 12, color: "BFD3E6",
  });
  s.addText(o.course, {
    x: M, y: 2.0, w: 9.5, h: 0.45, isTextBox: true, margin: 0,
    fontFace: F.head, fontSize: 18, bold: true, color: C.white,
  });
  s.addText(o.title, {
    x: M, y: 2.55, w: 9.6, h: 1.5, isTextBox: true, margin: 0,
    fontFace: F.head, fontSize: 42, bold: true, color: C.white, lineSpacing: 46,
  });
  s.addText(o.subtitle, {
    x: M, y: 4.15, w: 9.6, h: 0.4, isTextBox: true, margin: 0,
    fontFace: F.body, fontSize: 15, color: "9FC0DE", italic: true,
  });
  s.addShape("rect", { x: M, y: 4.85, w: 1.1, h: 0.035, fill: { color: C.amber }, line: { color: C.amber } });
  s.addText("Md Sadman Hafiz", {
    x: M, y: 5.15, w: 8, h: 0.35, isTextBox: true, margin: 0,
    fontFace: F.head, fontSize: 17, bold: true, color: C.white,
  });
  s.addText("Lecturer, Dept. of CSE, IIUC", {
    x: M, y: 5.5, w: 8, h: 0.3, isTextBox: true, margin: 0,
    fontFace: F.body, fontSize: 13, color: "BFD3E6",
  });
  s.addText(o.session, {
    x: M, y: 6.25, w: 8, h: 0.3, isTextBox: true, margin: 0,
    fontFace: F.body, fontSize: 12, color: "8FB3D4",
  });
  return s;
}

let SLIDE_N = 1;
function resetNum() { SLIDE_N = 1; }

function slide(pres, title, kicker) {
  const s = pres.addSlide();
  s.background = { color: C.white };
  SLIDE_N += 1;
  if (kicker) {
    s.addText(kicker.toUpperCase(), {
      x: M, y: 0.42, w: 9, h: 0.26, isTextBox: true, margin: 0,
      fontFace: F.head, fontSize: 11, bold: true, color: C.amber, charSpacing: 1.2,
    });
  }
  s.addText(title, {
    x: M, y: kicker ? 0.72 : 0.55, w: 12.1, h: 0.62, isTextBox: true, margin: 0,
    fontFace: F.head, fontSize: 32, bold: true, color: C.navy,
  });
  s.addText("CSE-2340 Software Development 1", {
    x: M, y: 6.95, w: 6, h: 0.28, isTextBox: true, margin: 0,
    fontFace: F.body, fontSize: 9, color: C.muted,
  });
  s.addText(String(SLIDE_N), {
    x: 12.0, y: 6.95, w: 0.73, h: 0.28, isTextBox: true, margin: 0, align: "right",
    fontFace: F.body, fontSize: 9, color: C.muted,
  });
  return s;
}

function sectionSlide(pres, num, title, sub) {
  const s = pres.addSlide();
  s.background = { color: C.navy };
  SLIDE_N += 1;
  s.addShape("ellipse", { x: 11.2, y: 4.9, w: 3.0, h: 3.0, fill: { color: "07386A" }, line: { color: "07386A" } });
  s.addText(num, {
    x: M, y: 2.25, w: 2, h: 0.9, isTextBox: true, margin: 0,
    fontFace: F.head, fontSize: 64, bold: true, color: C.amber,
  });
  s.addText(title, {
    x: M, y: 3.25, w: 11, h: 0.8, isTextBox: true, margin: 0,
    fontFace: F.head, fontSize: 38, bold: true, color: C.white,
  });
  if (sub) s.addText(sub, {
    x: M, y: 4.1, w: 10.5, h: 0.5, isTextBox: true, margin: 0,
    fontFace: F.body, fontSize: 15, color: "9FC0DE",
  });
  s.addText(String(SLIDE_N), {
    x: 12.0, y: 6.95, w: 0.73, h: 0.28, isTextBox: true, margin: 0, align: "right",
    fontFace: F.body, fontSize: 9, color: "6E93B8",
  });
  return s;
}

// A soft card with heading + body lines
function card(slide, o) {
  slide.addShape("roundRect", {
    x: o.x, y: o.y, w: o.w, h: o.h, rectRadius: 0.08,
    fill: { color: o.fill || C.panel }, line: { color: o.border || (o.fill ? o.fill : C.panel) },
    shadow: o.shadow === false ? undefined : { type: "outer", color: "9AA9B8", blur: 6, offset: 1, angle: 90, opacity: 0.18 },
  });
  let y = o.y + 0.22;
  if (o.badge) {
    slide.addShape("ellipse", { x: o.x + 0.22, y: y, w: 0.42, h: 0.42, fill: { color: o.badgeFill || C.navy }, line: { color: o.badgeFill || C.navy } });
    slide.addText(o.badge, {
      x: o.x + 0.22, y: y, w: 0.42, h: 0.42, isTextBox: true, margin: 0, align: "center", valign: "middle",
      fontFace: F.head, fontSize: 15, bold: true, color: o.badgeText || C.white,
    });
  }
  if (o.head) {
    slide.addText(o.head, {
      x: o.x + (o.badge ? 0.78 : 0.28), y: y + (o.badge ? 0.03 : 0), w: o.w - (o.badge ? 1.0 : 0.56), h: 0.36,
      isTextBox: true, margin: 0, valign: "middle",
      fontFace: F.head, fontSize: o.headSize || 17, bold: true, color: o.headColor || C.navy,
    });
    y += 0.46;
  }
  if (o.lines && o.lines.length) {
    const runs = o.lines.map((t, i) => ({
      text: t,
      options: {
        bullet: o.bullet === false ? false : { characterCode: "2022" },
        breakLine: i < o.lines.length - 1,
        color: o.textColor || C.body, fontFace: F.body, fontSize: o.fs || 14,
        paraSpaceAfter: o.gap === undefined ? 6 : o.gap,
      },
    }));
    slide.addText(runs, {
      x: o.x + 0.28, y: y, w: o.w - 0.56, h: o.y + o.h - y - 0.18,
      isTextBox: true, margin: 0, valign: "top",
    });
  }
  return slide;
}

function label(slide, text, x, y, w, color) {
  slide.addText(text, {
    x, y, w, h: 0.28, isTextBox: true, margin: 0,
    fontFace: F.head, fontSize: 12, bold: true, color: color || C.navy, charSpacing: 0.6,
  });
}

function para(slide, text, o) {
  slide.addText(text, {
    x: o.x, y: o.y, w: o.w, h: o.h || 0.5, isTextBox: true, margin: 0, valign: "top",
    fontFace: F.body, fontSize: o.fs || 15, color: o.color || C.body, lineSpacing: (o.fs || 15) * 1.35,
    bold: o.bold || false, italic: o.italic || false, align: o.align || "left",
  });
}

// Rendered-output preview panel (what the browser shows)
function browserPanel(slide, o) {
  slide.addShape("roundRect", {
    x: o.x, y: o.y, w: o.w, h: o.h, rectRadius: 0.06,
    fill: { color: C.white }, line: { color: C.line },
    shadow: { type: "outer", color: "9AA9B8", blur: 6, offset: 1, angle: 90, opacity: 0.2 },
  });
  slide.addShape("rect", { x: o.x, y: o.y, w: o.w, h: 0.32, fill: { color: C.panelAlt }, line: { color: C.line } });
  ["E06C5E", "E3B341", "5FB878"].forEach((col, i) => {
    slide.addShape("ellipse", { x: o.x + 0.14 + i * 0.2, y: o.y + 0.10, w: 0.12, h: 0.12, fill: { color: col }, line: { color: col } });
  });
  slide.addText(o.caption || "Browser output", {
    x: o.x + 0.85, y: o.y + 0.03, w: o.w - 1.0, h: 0.26, isTextBox: true, margin: 0, valign: "middle",
    fontFace: F.body, fontSize: 9, color: C.muted,
  });
}

module.exports = { C, F, W, H, M, newDeck, titleSlide, slide, sectionSlide, card, codeBox, label, para, browserPanel, resetNum };
