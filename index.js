var F = Object.defineProperty;
var m = (s, e) => F(s, "name", { value: e, configurable: !0 });
var x = (s, e, t) => {
  if (!e.has(s))
    throw TypeError("Cannot " + t);
};
var T = (s, e, t) => {
  if (e.has(s))
    throw TypeError("Cannot add the same private member more than once");
  e instanceof WeakSet ? e.add(s) : e.set(s, t);
};
var N = (s, e, t) => (x(s, e, "access private method"), t);
const f = { id: "adventure-deck", title: "Savage Worlds Adventure Deck", bugs: "https://support.metamorphic-digital.com", relationships: { requires: [], systems: [{ id: "swade", type: "system", manifest: "https://gitlab.com/api/v4/projects/16269883/packages/generic/swade/latest/system.json", compatibility: { minimum: "4.0.0", verified: "4" }, flags: { sigil: { localDevVersion: { distPath: "dist" } } } }], recommends: [], conflicts: [], flags: {} }, description: "<p><strong>The Adventure Deck</strong> puts some story control in the hands of the players and lots of spice into the action. Add story twists like romantic interests, enemies, and larger-than-life opponents at the drop of a hat. See characters pull off amazing feats. Bring more excitement to your gaming table than ever before!</p>", authors: [{ name: "Pinnacle Entertainment Group", url: "https://peginc.com" }], flags: { sigil: { sheetClass: "AdventureDeckJournalSheet", parent: "adventure-deck", productTitle: "Adventure Deck Sheet by Pinnacle", cssClass: "adventure-deck" } }, media: [{ type: "cover", url: "https://gitlab.com/peginc/core-rules-issues/-/raw/master/ADVDECK/advdeck_cover.webp" }, { type: "icon", url: "https://gitlab.com/peginc/core-rules-issues/-/raw/master/ADVDECK/advdeck-logo.webp" }], version: "4.0.0", compatibility: { minimum: "12", verified: "12.325" }, scripts: [], esmodules: ["./index.js"], styles: ["./style.css"], languages: [{ lang: "en", name: "English", path: "lang/en.json" }], packs: [{ name: "adventure-deck", label: "Adventure Deck", ownership: { PLAYER: "OBSERVER", ASSISTANT: "OWNER" }, type: "Cards", system: "swade", flags: {}, path: "packs/adventure-deck" }, { name: "adventure-edge", label: "Adventure Edge", ownership: { PLAYER: "OBSERVER", ASSISTANT: "OWNER" }, type: "Item", system: "swade", flags: {}, path: "packs/adventure-edge" }, { name: "adventure-instructions", label: "Adventure Deck Instructions", ownership: { PLAYER: "OBSERVER", ASSISTANT: "OWNER" }, type: "JournalEntry", system: "swade", flags: {}, path: "packs/adventure-instructions" }, { name: "adventure-macro", label: "Adventure Macro", ownership: { PLAYER: "OBSERVER", ASSISTANT: "OWNER" }, type: "Macro", system: "swade", flags: {}, path: "packs/adventure-macro" }], packFolders: [{ name: "SWADE Adventure Deck", sorting: "m", color: "#DD5F3C", packs: ["adventure-deck", "adventure-edge", "adventure-instructions", "adventure-macro"], folders: [] }], socket: !1, protected: !0, exclusive: !1, persistentStorage: !1, coreTranslation: !1, library: !1, documentTypes: {}, manifest: "https://sigil-fvtt.s3.amazonaws.com/adventure-deck/module.json", changelog: "https://support.metamorphic-digital.com/changelog/adventure-deck", url: "https://www.peginc.com/" }, d = f.id, W = f.version, y = f.flags?.sigil?.productTitle, z = f.flags?.sigil?.productSlug, p = f.flags?.sigil?.cssClass, O = f.flags?.sigil?.featureConfigurations, D = f.flags?.sigil?.sheetClass, B = { packageId: "adventure-deck" };
(/* @__PURE__ */ m(function() {
  Promise.resolve();
}, "enableDocumentsHMR"))();
function V() {
  Hooks.once("init", async () => {
    const s = game.modules.filter(
      (e) => e.active && e.flags[d]?.adventureImporter
    );
    for (const e of s)
      game.settings.register(e.id, "firstStartup", {
        name: "One-Time Startup Prompt",
        scope: "world",
        config: !1,
        type: Boolean,
        default: !0
      });
    Hooks.on("updateSetting", (e) => {
      if (e.key === "core.moduleConfiguration")
        for (const t of s)
          game.settings.set(t.id, "firstStartup", !e.value[t.id]);
    });
  }), Hooks.on("ready", async () => {
    const s = game.modules.filter(
      (e) => e.active && e.flags[d]?.adventureImporter
    );
    for (const e of s)
      if (game.settings.get(e.id, "firstStartup") && game.user.isGM)
        for (const a of e.packs.filter((n) => n.type === "Adventure")) {
          const i = await game.packs.get(`${e.id}.${a.name}`).getDocuments();
          for (const o of i)
            o.sheet.render(!0);
        }
  }), Hooks.on("activateNote", function(s, e) {
    if (!s.entry)
      return;
    const a = s.document.flags.sigil?.scroll;
    a && (e.scrollTag = a);
  });
}
m(V, "adventures");
function q() {
  Hooks.once("init", () => {
    game.settings.register(d, "distraction-free", {
      name: "Distraction Free Mode",
      hint: "Replaces Journal borders with a less visually distracting style.",
      scope: "client",
      config: !0,
      type: Boolean,
      default: !1,
      onChange: (s) => {
        s ? document.querySelectorAll(`.journal-sheet.${p}-wrapper`).forEach((e) => e.classList.add("distraction-free")) : document.querySelectorAll(`.journal-sheet.${p}-wrapper`).forEach((e) => e.classList.remove("distraction-free"));
      }
    });
  });
}
m(q, "distractionFreeMode");
function J() {
  window.sigilMacros = window.sigilMacros ?? {}, window.sigilMacros[`${z.toLowerCase()}Macros`] = {
    async toggleTokens(s, e) {
      let t = !1, a;
      s.sceneId && ({ sceneId: s, ids: e, force: t, state: a } = s), await this.toggleDocumentHiddenState({
        sceneId: s,
        ids: e,
        type: "Token",
        force: t,
        state: a
      });
    },
    async toggleTiles(s, e) {
      let t = !1, a;
      s.sceneId && ({ sceneId: s, ids: e, force: t, state: a } = s), await this.toggleDocumentHiddenState({
        sceneId: s,
        ids: e,
        type: "Tile",
        force: t,
        state: a
      });
    },
    async toggleDoors(s, e) {
      let t = !1, a;
      s.sceneId && ({ sceneId: s, ids: e, force: t, state: a } = s), await this.toggleDocumentHiddenState({
        sceneId: s,
        ids: e,
        type: "Wall",
        force: t,
        state: a
      });
    },
    async toggleSounds(s, e) {
      let t = !1, a;
      s.sceneId && ({ sceneId: s, ids: e, force: t, state: a } = s), await this.toggleDocumentHiddenState({
        sceneId: s,
        ids: e,
        type: "AmbientSound",
        force: t,
        state: a
      });
    },
    async toggleLights(s, e) {
      let t = !1, a;
      s.sceneId && ({ sceneId: s, ids: e, force: t, state: a } = s), await this.toggleDocumentHiddenState({
        sceneId: s,
        ids: e,
        type: "AmbientLight",
        force: t,
        state: a
      });
    },
    async toggleRegions(s, e) {
      let t = !1, a;
      s.sceneId && ({ sceneId: s, ids: e, force: t, state: a } = s), await this.toggleDocumentHiddenState({
        sceneId: s,
        ids: e,
        type: "Region",
        force: t,
        state: a
      });
    },
    async playSound(s) {
      let e, t = !1;
      if (typeof s == "object" && ({ soundUuid: s = "", playing: e, stopAll: t } = s), t)
        for (const n of game.playlists.playing)
          await n.stopAll();
      const a = await fromUuid(s);
      a && (e ??= !a.playing, a.documentName === "PlaylistSound" && (e ? await a.parent.playSound(a) : await a.parent.stopSound(a)), a.documentName === "Playlist" && (e ? await a.playAll() : await a.stopAll()));
    },
    async changeScene({ sceneId: s, ambience: e, weather: t, darkness: a, force: n }) {
      if (canvas.scene.id === s || n) {
        const i = game.scenes.get(s);
        if (!i)
          return;
        const o = {};
        e && (o.playlistSound = i.playlistSound.id === e.ambienceId1 ? e.ambienceId2 : e.ambienceId1), t && (o.weather = i.weather === t.weatherId1 ? t.weatherId2 : t.weatherId1), a && (o.darkness = i.darkness === a.darknessValue1 ? a.darknessValue2 : a.darknessValue1), await i.update(o);
      }
    },
    // legacy call for changeScene
    async changeAmbience(s, e, t) {
      const a = {};
      s.sceneId ? a = s : a.sceneId = s, a.ambience ??= {}, a.ambience.ambienceId1 ??= e, a.ambience.ambienceId2 ??= t, await this.changeScene(a);
    },
    // legacy call for changeScene
    async changeWeather(s, e, t) {
      const a = {};
      s.sceneId ? a = s : a.sceneId = s, a.weather ??= {}, a.weather.weatherId1 ??= e, a.weather.weatherId2 ??= t, await this.changeScene(a);
    },
    async pickTileImage(s, e, t, a, n) {
      s.sceneId && ({ sceneId: s, tileId: e, title: t, prompt: a, tileOptions: n } = s);
      const i = `async function changeTileImage(img, sceneId, tileId) {
        await game.scenes.get(sceneId)?.tiles.get(tileId)?.update({ "texture.src": img });
      }`;
      async function o() {
        await new Promise(async (l) => {
          setTimeout(l, 200), await new Dialog(
            {
              title: t,
              content: r,
              buttons: { Close: { label: "Close" } }
            },
            { width: 300 }
          ).render(!0);
        });
      }
      m(o, "callTileMenu");
      let r = `<style>
      .mhmenumain {
          margin: 1px auto;
          background: url(systems/pf2e/assets/sheet/parchment.webp);
      }
      .mhmenu {
          margin: 1px auto;
          column-count: 1;
          column-width: auto;
      }
      .mhbutton {
          width: 100%;
          height: fit-content;
      }
      </style><script>${i}<\/script><div class="mhmenumain">`;
      r += `<p style="text-align:center;">${a}</p>`, n.forEach((l, c) => {
        r += `<button name="button${c}" class="mhbutton" type="button" onclick="changeTileImage('${l.img}','${s}','${e}')">${l.name}</button>`;
      }), r += "</div><br></div>", o();
    },
    async pickMacro({ title: s, prompt: e, macroOptions: t }) {
      const a = `async function callMacro(macro) {
        let pickedMacro = game.macros.find((m) => m.id === macro.id || (m.name === macro.macroName && m.folder?.id === macro.macroFolder));
        if (pickedMacro) {
          await pickedMacro.execute()
        }
      }`;
      async function n() {
        await new Promise(async (o) => {
          setTimeout(o, 200), await new Dialog(
            {
              title: s,
              content: i,
              buttons: { Close: { label: "Close" } }
            },
            { width: 300 }
          ).render(!0);
        });
      }
      m(n, "callMacroMenu");
      let i = `<style>
      .mhmenumain {
          margin: 1px auto;
          background: url(systems/pf2e/assets/sheet/parchment.webp);
      }
      .mhmenu {
          margin: 1px auto;
          column-count: 1;
          column-width: auto;
      }
      .mhbutton {
          width: 100%;
          height: fit-content;
      }
      </style><script>${a}<\/script><div class="mhmenumain">`;
      i += `<p style="text-align:center;">${e}</p>`, t.forEach((o, r) => {
        i += `<button name="button${r}" class="mhbutton" type="button" onclick="callMacro({macroName: '${o.macroName}', macroFolder: '${o.macroFolder}', id: '${o.id}'})">${o.name}</button>`;
      }), i += "</div><br></div>", n();
    },
    async moveTile(s, e, t) {
      let a;
      if (s.sceneId && ({ sceneId: s, tileId: e, states: t, force: a } = s), canvas.scene.id === s || a) {
        const n = game.scenes.get(s).tiles.get(e);
        let i = !0;
        Object.keys(t[0]).forEach((o) => {
          Object.keys(diffObject(n, t[0])).length > 0 && (i = !1);
        }), n.update(t[i ? 1 : 0]);
      }
    },
    async updateSceneChildDocuments({ sceneId: s, documentName: e, data: t, animate: a = !1 }) {
      let n;
      const i = game.scenes.get(s);
      switch (e) {
        case "Token":
          n = i.tokens;
          break;
        case "Wall":
          n = i.walls;
          break;
        case "AmbientLight":
          n = i.lights;
          break;
        case "Note":
          n = i.notes;
          break;
        case "Tile":
          n = i.tiles;
          break;
        case "AmbientSound":
          n = i.sounds;
          break;
        default:
          return;
      }
      const o = Object.entries(t).reduce((r, [l, c]) => (n.has(l) && r.push({ _id: l, ...c }), r), []);
      return canvas.scene.updateEmbeddedDocuments(e, o, { animate: a });
    },
    async changeToken(s, e, t) {
      let a, n;
      if (s.sceneId && ({ sceneId: s, tokenId: e, states: t, force: a, checkAlive: n } = s), canvas.scene.id === s || a) {
        const i = game.scenes.get(s), o = i.tokens.get(e) || i.tokens.getName(e);
        if (!o || t.length !== 2)
          return;
        if (t[0] = foundry.utils.expandObject(t[0]), t[1] = foundry.utils.expandObject(t[1]), n && game.system.id === "pf2e") {
          let u = !1;
          if (Array.isArray(n))
            for (const h of n)
              u = u || (await fromUuid(h))?.actor?.isDead;
          if (u = u || o.actor.isDead, u) {
            o.actor.update({ "system.attributes.hp.value": 0 });
            return;
          }
        }
        let r = !0;
        Object.keys(diffObject(o, t[0])).length > 0 && (r = !1);
        const { actor: l, ...c } = t[r ? 1 : 0];
        await o.update(c, { animate: !1 }), l && await o.actor.update(l);
      }
    },
    async toggleDocumentHiddenState({ sceneId: s, ids: e, type: t, force: a, state: n }) {
      if (canvas.scene.id === s || a) {
        typeof e == "string" && (e = [e]);
        const { SECRET: i } = CONST.WALL_DOOR_TYPES, o = game.scenes.get(s);
        let r = [], l = [];
        switch (t) {
          case "Tile":
            r = o.tiles.filter((c) => e.includes(c.id)), l = r.map((c) => ({ _id: c.id, hidden: n === void 0 ? !c.hidden : n }));
            break;
          case "Token":
            r = o.tokens.filter((c) => e.includes(c.id)), l = r.map((c) => ({ _id: c.id, hidden: n === void 0 ? !c.hidden : n }));
            break;
          case "Wall":
            e[0] === "all" ? r = o.walls.filter((c) => c.door === i) : r = o.walls.filter((c) => e.includes(c.id)), l = r.map((c) => ({ _id: c.id, ds: n === void 0 ? c.ds === 1 ? 0 : 1 : n }));
            break;
          case "AmbientLight":
            r = o.lights.filter((c) => e.includes(c.id)), l = r.map((c) => ({ _id: c.id, hidden: n === void 0 ? !c.hidden : n }));
            break;
          case "AmbientSound":
            r = o.sounds.filter((c) => e.includes(c.id)), l = r.map((c) => ({ _id: c.id, hidden: n === void 0 ? !c.hidden : n }));
            break;
          case "Region":
            r = o.regions.filter((c) => e.includes(c.id)), l = r.map((c) => ({
              _id: c.id,
              visibility: n === void 0 ? c.visibility ? 0 : 2 : n ? 0 : 2,
              behaviors: c.behaviors.map((u) => ({
                _id: u._id,
                disabled: n === void 0 ? !u.disabled : n
              }))
            }));
            break;
          default:
            ui.notifications.warn("Attempting to change unknown Document Type");
        }
        l.length > 0 && await o.updateEmbeddedDocuments(t, l);
      }
    },
    async teleportDialog(s) {
      if (!s.data.token || !canvas.tokens.controlled.map((t) => t.document.id).includes(s.data.token.id))
        return;
      await Dialog.confirm({
        title: "Teleport",
        content: "Are you sure you want to teleport?"
      }) && await s.data.token.update({ elevation: -1 });
    }
  }, window.sigilMacros[`${B.productSlug.toLowerCase()}Macros`] = window.sigilMacros[`${z.toLowerCase()}Macros`];
}
m(J, "globalMacroHelpers");
function Y() {
  Hooks.once("init", () => {
    game.settings.register(d, "safe-journal", {
      name: "Journal Freeze Workaround",
      hint: "Workaround for a Chrome issue that can cause all journals to freeze under certain circumstances.",
      scope: "client",
      config: !0,
      type: Boolean,
      default: !1,
      onChange: (s) => {
        s ? document.querySelectorAll(`.journal-sheet.${p}-wrapper`).forEach((e) => e.classList.add("safe-journal")) : document.querySelectorAll(`.journal-sheet.${p}-wrapper`).forEach((e) => e.classList.remove("safe-journal"));
      }
    });
  });
}
m(Y, "safeJournalMode");
const K = {
  adventures: V,
  "distraction-free-mode": q,
  "global-macro-helpers": J,
  "safe-journal-mode": Y
};
for (const [s, e] of Object.entries(K))
  O?.[s] && e();
const Q = "modules/adventure-deck/templates/importer.hbs";
var b, j, C, U;
const L = class L extends AdventureImporter {
  /**
   *  Add adventure stuff
   * @param {Adventure} adventure
   * @param {object} options
   */
  constructor(t, a) {
    super(t, a);
    /* -------------------------------------------- */
    /**
     * Handle toggling the import all checkbox.
     * @param {Event} event  The change event.
     */
    T(this, b);
    /**
     * Handle toggling the don't show again checkbox.
     * @param {Event} event  The change event.
     */
    T(this, C);
    this.options.classes.push(p);
    const n = game.modules.get(this.adventure.compendium.metadata.packageName), {
      initialSceneId: i,
      initialJournalEntryId: o,
      initialJournalPageId: r,
      initialLoginScreenBackground: l,
      chatMessage: c
    } = n.flags?.[d]?.adventureImporter?.[this.adventure.uuid] || {};
    this.importOptions = {}, i && (this.importOptions.activateScene = {
      label: "Activate Initial Scene",
      default: !0,
      handler: () => game.scenes.get(i)?.activate()
    }), o && r && (this.importOptions.displayJournal = {
      label: "Display Introduction Journal Entry",
      default: !0,
      handler: () => {
        game.journal.get(o).sheet.render(!0, { pageId: r });
      }
    }), l && (this.importOptions.customizeJoin = {
      label: "Style Login Screen",
      default: !1,
      handler: async () => {
        const u = {
          id: game.world.id,
          action: "editWorld",
          description: n.description,
          background: `modules/${n.id}/${l}`
        }, h = await foundry.utils.fetchJsonWithTimeout(
          foundry.utils.getRoute("setup"),
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(u)
          }
        );
        game.world.updateSource(h);
      }
    }), c?.label && c?.content && (this.importOptions.chatMessage = {
      label: c.label,
      default: !0,
      handler: () => {
        ChatMessage.create({
          content: c.content,
          whisper: ChatMessage.getWhisperRecipients("GM")
        });
      }
    });
  }
  /**
   *
   */
  get template() {
    return Q;
  }
  /* -------------------------------------------- */
  /** @inheritDoc */
  async getData(t = {}) {
    const a = await super.getData(), n = game.modules.get(this.adventure.compendium.metadata.packageName);
    return a.importOptions = this.importOptions || {}, a.hasImportOptions = Object.keys(a.importOptions).length > 0, a.dontShowAgain = !game.settings.get(n.id, "firstStartup"), a.changelog = n.changelog, a;
  }
  /* -------------------------------------------- */
  /** @inheritDoc */
  activateListeners(t) {
    super.activateListeners(t);
    const a = t[0];
    a.querySelectorAll('input[value="all"]').forEach(
      (n) => n.addEventListener("change", (i) => {
        N(this, b, j).call(this, i);
      })
    ), a.querySelectorAll('input[name="dontShowAgain"]').forEach(
      (n) => n.addEventListener("change", (i) => {
        N(this, C, U).call(this, i);
      })
    ), a.querySelectorAll(".changelog-link").forEach(
      (n) => n.addEventListener("click", (i) => {
        i.preventDefault(), i.stopPropagation();
        const r = game.modules.get(this.adventure.compendium.metadata.packageName).changelog;
        window.open(r, "_blank").focus();
      })
    );
  }
  /* -------------------------------------------- */
  /**
   * Prepare a list of content types provided by this adventure.
   * @returns {{icon: string, label: string, count: number}[]} array of document types, names, and icons.
   * @protected
   */
  _getContentList() {
    return Object.entries(Adventure.contentFields).reduce((t, [a, n]) => {
      const i = this.adventure[a].size;
      return i && t.push({
        field: a,
        icon: CONFIG[n.documentName].sidebarIcon,
        label: game.i18n.localize(i > 1 ? n.metadata.labelPlural : n.metadata.label),
        count: i
      }), t;
    }, []);
  }
  /* -------------------------------------------- */
  /** @inheritDoc */
  async _prepareImportData(t) {
    this.submitOptions = t;
    const { toCreate: a, toUpdate: n, documentCount: i } = await super._prepareImportData(t);
    return this.applyImportControls(t, a, n), "Scene" in a && await this.mergeCompendiumScenes(a.Scene), "Scene" in n && await this.mergeCompendiumScenes(n.Scene), { toCreate: a, toUpdate: n, documentCount: i };
  }
  /* -------------------------------------------- */
  /** @inheritDoc */
  async _importContent(t, a, n) {
    const i = await super._importContent(t, a, n);
    for (const [r, l] of Object.entries(this.importOptions ?? {}))
      !l.handler || !this.submitOptions[r] || await l.handler();
    const o = game.modules.get(this.adventure.compendium.metadata.packageName);
    return game.settings.set(o.id, "firstStartup", !1), i;
  }
  /* -------------------------------------------- */
  /**
   *
   * @param scenes
   */
  async mergeCompendiumScenes(t) {
    const a = game.settings.get("core", "defaultToken");
    for (const n of t)
      for (let i of n.tokens)
        i = Object.assign(i, foundry.utils.mergeObject(i, a));
  }
  /* -------------------------------------------- */
  /**
   * Remove adventure content that the user indicated they did not want to import.
   * @param {object} formData  The submitted adventure form data.
   * @param {object} toCreate  An object of document data to create.
   * @param {object} toUpdate  An object of document data to update.
   */
  applyImportControls(t, a, n) {
    const i = t.importFields.filter((r) => r);
    if (i.push("folders"), !i || !Array.isArray(i) || i.some((r) => r === "all"))
      return;
    const o = new Set(i.map((r) => Adventure.contentFields[r].documentName));
    [a, n].forEach((r) => {
      for (const l of Object.keys(r))
        o.has(l) || delete r[l];
      r.Folder && (r.Folder = r.Folder.filter((l) => o.has(l.type)));
    });
  }
};
b = new WeakSet(), j = /* @__PURE__ */ m(function(t) {
  const a = t.currentTarget, n = a.closest(".import-controls"), i = a.checked;
  n.querySelectorAll("input").forEach((o) => {
    o.value !== "folders" && (o.disabled = i), i && (o.checked = !0);
  }), a.disabled = !1;
}, "#onToggleImportAll"), C = new WeakSet(), U = /* @__PURE__ */ m(function(t) {
  const n = t.currentTarget.checked, i = game.modules.get(this.adventure.compendium.metadata.packageName);
  game.settings.set(i.id, "firstStartup", !n);
}, "#onToggleDontShowAgain"), m(L, "SigilAdventureImporter");
let _ = L;
Hooks.once("init", () => {
  DocumentSheetConfig.registerSheet(Adventure, d, _, {
    label: `${y} Importer`,
    makeDefault: !1
  });
});
const G = class G extends JournalImagePageSheet {
};
m(G, "SigilJournalSheetImagePage");
let k = G;
const X = "modules/adventure-deck/templates/dialog-show.hbs", Z = "modules/adventure-deck/templates/page-edit.hbs", ee = "modules/adventure-deck/templates/page-view.hbs", M = class M extends JournalTextPageSheet {
  /**
   *
   */
  get template() {
    return this.isEditable ? Z : ee;
  }
  /**
   *
   * @param doc
   * @param whisperContent
   */
  async showWhisperDialog(e, t) {
    if (!(e instanceof JournalEntry || e instanceof JournalEntryPage))
      return;
    if (!e.isOwner)
      return ui.notifications.error("JOURNAL.ShowBadPermissions", {
        localize: !0
      });
    if (game.users.size < 2)
      return ui.notifications.warn("JOURNAL.ShowNoPlayers", {
        localize: !0
      });
    const a = game.users.filter((i) => i.id !== game.userId), n = await renderTemplate(X, { users: a });
    return Dialog.prompt({
      // title: game.i18n.format("JOURNAL.ShowEntry", {name: doc.name}),
      // label: game.i18n.localize("JOURNAL.ActionShow"),
      title: "Whisper Selected Content to...",
      label: "Whisper to Selected Players",
      content: n,
      render: (i) => {
        const o = i.querySelector("form");
        o.elements.allPlayers.addEventListener("change", (r) => {
          const l = r.currentTarget.checked;
          o.querySelectorAll('[name="players"]').forEach((c) => {
            c.checked = l, c.disabled = l;
          });
        });
      },
      callback: async (i) => {
        const o = i.querySelector("form"), r = new FormDataExtended(o).object, l = r.allPlayers ? game.users.filter((u) => !u.isSelf) : r.players.reduce((u, h) => {
          const E = game.users.get(h);
          return E && !E.isSelf && u.push(E), u;
        }, []);
        if (!l.length)
          return;
        const c = l.map((u) => u.id);
        return ChatMessage.create({
          whisper: c,
          content: t
        });
      },
      rejectClose: !1,
      options: { jQuery: !1 }
    });
  }
  /**
   *
   * @param event
   */
  async _onClickReadAloud(e) {
    if (e.preventDefault(), ["IMG", "A"].includes(e.target.tagName))
      return;
    const a = `<div data-sigil-chatable>${e.currentTarget.innerHTML}</div>`;
    this.showWhisperDialog(this.object.parent, a);
  }
  /**
   *
   * @param event
   */
  async _onClickContentLink(e) {
    e.preventDefault();
    const t = e.currentTarget;
    if (!t.dataset.uuid.startsWith("Scene"))
      return;
    const a = game.scenes.get(t.dataset.id);
    a && (e.stopPropagation(), a.view(), a.journal?.sheet?.render(!0, { pageId: a.journalEntryPage }));
  }
  /**
   *
   * @param html
   */
  activateListeners(e) {
    super.activateListeners(e), e[0].querySelectorAll(".read-aloud").forEach((t) => {
      t.addEventListener("click", this._onClickReadAloud.bind(this));
    }), game.user.isGM && e[0].querySelectorAll("a.content-link[type=Scene]").forEach((t) => {
      t.addEventListener("click", this._onClickContentLink.bind(this));
    }), this?.document?.parent?.flags?.sigil?.variations && e[0].querySelectorAll("[data-option][data-variation]").forEach((t) => {
      const a = t.dataset.variation, n = t.dataset.option, i = this.document.parent.flags.sigil.variations.find(
        (o) => o.name === a
      )?.option;
      i && n !== i && (t.style.display = "none");
    });
  }
};
m(M, "SigilJournalSheetPage");
let S = M;
const te = "modules/adventure-deck/templates/journal.hbs", R = class R extends JournalSheet {
  /**
   *
   */
  static get defaultOptions() {
    const e = {
      classes: ["sheet", "journal-sheet", "journal-entry", `${p}-wrapper`],
      width: window.innerWidth < 800 ? 720 : 960,
      height: window.innerHeight < 1e3 ? 700 : 800
    };
    return O?.["distraction-free-mode"] && game.settings.get(d, "distraction-free") && e.classes.push("distraction-free"), O?.["safe-journal-mode"] && game.settings.get(d, "safe-journal") && e.classes.push("safe-journal"), foundry.utils.mergeObject(super.defaultOptions, e);
  }
  /**
   *
   */
  get template() {
    return te;
  }
  /**
   *
   * @param options
   */
  getData(e) {
    const t = super.getData(e);
    t.cssClass = p;
    let a = this?.document?.flags?.sigil?.additionalCssClass;
    return typeof a == "string" && (a = a.split(" ")), Array.isArray(a) && (typeof this?.document?.flags[d]?.additionalCssClass == "string" && a.push(this.document.flags[d].additionalCssClass.split(" ")), typeof this?.document?.flags[d]?.additionalCssClass == "string" && a.push(this.document.flags[d].additionalCssClass.split(" ")), Array.isArray(this?.document?.flags[d]?.additionalCssClass) && a.push(this.document.flags[d].additionalCssClass), a && (t.cssClass = [p, ...a].join(" "))), t;
  }
  /**
   *
   */
  _getPageData() {
    let e = 1;
    return super._getPageData().map((t) => (t?.flags[d]?.pageNumber ? (t.number = t.flags[d].pageNumber, typeof t?.flags[d]?.pageNumber == "number" && (e = t.number + 1)) : t.number = e++, t?.flags[d]?.pageNumberClass && (t.pageNumberClass = t.flags[d].pageNumberClass ?? ""), t.editable = t.editable && t?.flags[d]?.editable, t.cssClasses = [
      this.cssClass,
      t?.flags?.sigil?.additionalCssClass,
      t.flags[d]?.additionalCssClass
    ].join(" "), t));
  }
  /**
   *
   * @param pageNode
   * @param toc
   */
  async _renderHeadings(e, t) {
    return Object.entries(t || {}).forEach(([a, n]) => {
      n.element.classList.contains("no-toc") && delete t[a];
      const i = n.element?.querySelectorAll("span");
      i.length > 0 && (n.text = i[0].textContent);
    }), await super._renderHeadings(e, t);
  }
  /**
   *
   * @param event
   */
  _onResizeMouseDown(e) {
    this._chromeShapeOutsideFreezeWorkaround(!0);
  }
  /**
   *
   * @param event
   */
  _onResize(e) {
    this._onResizeMouseUp(e);
  }
  /**
   *
   * @param event
   */
  _onResizeMouseUp(e) {
    this._chromeShapeOutsideFreezeWorkaround(!1);
  }
  /**
   *
   * @param toggle
   */
  _chromeShapeOutsideFreezeWorkaround(e) {
    this.element[0].classList[e ? "add" : "remove"]("resizing");
  }
  /**
   *
   */
  async minimize() {
    !this.rendered || !this.popOut || [!0, null].includes(this._minimized) || (this._chromeShapeOutsideFreezeWorkaround(!0), await super.minimize());
  }
  /**
   *
   */
  async maximize() {
    !this.popOut || [!1, null].includes(this._minimized) || (await super.maximize(), this._chromeShapeOutsideFreezeWorkaround(!1));
  }
  /**
   *
   */
  async close() {
    !this.rendered || !this.popOut || [!0, null].includes(this._minimized) || (this._chromeShapeOutsideFreezeWorkaround(!0), await super.close());
  }
  /**
   *
   */
  async _renderOuter() {
    const e = await super._renderOuter();
    return e.find("div.window-resizable-handle")[0].addEventListener("pointerdown", this._onResizeMouseDown.bind(this)), e;
  }
  /** @override */
  async _render(e = !1, t = {}) {
    let a = this?.document?.flags?.sigil?.additionalCssClass ?? this?.document?.flags[d]?.additionalCssClass;
    if (typeof a == "string" && (a = a.split(" ")), t.classes = t.classes || this.constructor.defaultOptions.classes, Array.isArray(a))
      for (const n of a)
        t.classes.includes(n + "-wrapper") || t.classes.push(n + "-wrapper");
    if (t.action === "update" && this._state !== Application.RENDER_STATES.NONE && JSON.stringify(this.options.classes) !== JSON.stringify(t.classes))
      return this.close();
    if (await super._render(e, t), "scrollTag" in t) {
      this._scrollPositions ??= {};
      const n = this._scrollPositions[".scrollable"] ??= [], i = this.element[0].querySelector(`[data-scroll='${t.scrollTag}']`)?.offsetTop;
      if (!i)
        return;
      n.length ? n[1] = i : n.push(0, i), this._restoreScrollPositions(this.element);
    }
  }
};
m(R, "SigilJournalSheet");
let v = R;
Hooks.once("init", () => {
  Object.defineProperty(v, "name", {
    value: `${D}`
  }), Object.defineProperty(S, "name", {
    value: `${D}Page`
  }), Object.defineProperty(k, "name", {
    value: `${D}ImagePage`
  }), DocumentSheetConfig.registerSheet(JournalEntry, d, v, {
    types: ["base"],
    makeDefault: !1,
    canBeDefault: !1,
    label: `${y}`
  }), DocumentSheetConfig.registerSheet(JournalEntryPage, d, S, {
    types: ["text"],
    makeDefault: !1,
    canBeDefault: !1,
    label: `${y}`
  }), DocumentSheetConfig.registerSheet(JournalEntryPage, d, k, {
    types: ["image"],
    makeDefault: !1,
    canBeDefault: !1,
    label: `${y}`
  });
});
const P = class P extends Application {
  /** @override */
  constructor(e, t) {
    super(t), this.senderId = e.senderId, this.card = e.card;
  }
  /** @override */
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      classes: ["acg-give"],
      height: 730,
      resizable: !1,
      template: "modules/adventure-deck/templates/chooserecipientdialog.hbs",
      title: game.i18n.localize("ACG.GIVE_DIALOG.TITLE"),
      width: 750
    });
  }
  /** @override */
  getData() {
    return {
      senderId: this.senderId,
      card: this.card
    };
  }
  /** @override */
  activateListeners(e) {
    super.activateListeners(e);
    const t = e[0];
    console.log(`${d} | Activating Listeners`), t.querySelectorAll(".give").forEach((a) => a.addEventListener("click", this.passCard.bind(this))), t.querySelectorAll(".cancel").forEach((a) => a.addEventListener("click", this.close)), t.querySelectorAll(".discard").forEach((a) => a.addEventListener("click", this.passCard.bind(this)));
  }
  /**
   * Pass card to another pile
   *
   * @param {MouseEvent} ev Jquery click event
   */
  async passCard(e) {
    e.preventDefault;
    const t = game.cards.get(this.senderId), a = e.target.dataset.recipientId;
    if (console.log("Attempting to Pass", a), a === "discard") {
      const i = game.settings.get("adventure-deck", "dumpPileName"), o = game.cards.getName(i);
      await t.pass(o, [this.card.id]), this.close();
      return;
    }
    const n = game.cards.get(a);
    await t.pass(n, [this.card.id]), this.close();
  }
};
m(P, "GiveAdventureCardDialog");
let I = P;
const H = class H extends CardsHand {
  /** @override */
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      classes: ["acg-hand"],
      dragDrop: [
        { dragSelector: "div.adventure-hand-row div.card", dropSelector: "div.adventure-hand-row" }
      ],
      height: 310,
      resizable: !0,
      template: "modules/adventure-deck/templates/adventurehandsheet.hbs",
      width: 900
    });
  }
  /** @override */
  activateListeners(e) {
    super.activateListeners(e), e.find(".play-card").on("click", this.playCard.bind(this)), e.find(".give-card").on("click", this.showPassCardDialog.bind(this)), e.find(".card-details").on("click", this.popUpImage.bind(this));
  }
  /**
   * Play a card from hand
   *
   * @param {MouseEvent} ev ClickEvent
   */
  async playCard(e) {
    e.preventDefault(), e.stopPropagation();
    const t = await fromUuid(e.currentTarget.dataset.cardUuid), a = await renderTemplate(
      "modules/adventure-deck/templates/adventurecard-chatcard.hbs",
      t
    );
    ChatMessage.create({
      user: game.user.id,
      type: CONST.CHAT_MESSAGE_TYPES.OTHER,
      content: a,
      sound: game.settings.get("adventure-deck", "toggleSoundOnPlayCard") ? "systems/swade/assets/card-flip.wav" : ""
    });
    const n = game.settings.get("adventure-deck", "dumpPileName"), i = await game.cards.getName(n);
    this.object.pass(i, [t.id], { chatNotification: !1 });
  }
  /**
   * Opens the GiveAdventureCardDialog
   *
   * @param {MouseEvent} ev ClickEvent
   */
  async showPassCardDialog(e) {
    e.preventDefault(), e.stopPropagation();
    const t = await fromUuid(e.currentTarget.dataset.cardUuid);
    new I({
      senderId: this.object.id,
      card: t
    }).render(!0);
  }
  /**
   * Opens the image
   *
   * @param {MouseEvent} ev The ClickEvent
   */
  async popUpImage(e) {
    e.preventDefault(), e.stopPropagation();
    const t = e.currentTarget.dataset.cardUuid, a = await fromUuid(t);
    new ImagePopout(a.img, {
      title: a.name,
      shareable: game.user.isGM,
      uuid: t
    }).render(!0);
  }
};
m(H, "AdventureHandSheet");
let w = H;
async function ae({
  type: s = "text",
  prompt: e = "",
  defaultValue: t = "",
  title: a = "Input Dialog"
}) {
  return await Dialog.wait({
    title: a,
    content: `<table style="width:100%"><tr><th style="width:50%"><label>${e}</label></th><td style="width:50%"><input type="${s}" name="input" value="${t}"/></td></tr></table>`,
    buttons: {
      Ok: {
        label: "Ok",
        callback: (n) => n[0].querySelector("input").value
      }
    }
  });
}
m(ae, "input");
function se(s) {
  return s.itemTypes.edge.map((e) => e.name);
}
m(se, "getEdges");
function ne(s) {
  const e = s.system.advances.value;
  return Math.max(0, Math.min(4, Math.floor(e / 4))) + 1;
}
m(ne, "getRank");
async function ie(s) {
  return s.character ? ne(s.character) + se(s.character).includes(game.settings.get("adventure-deck", "destinyChild")) : await Dialog.wait({
    title: "Input Dialog",
    content: `Player ${s.name} has no character assigned. How many cards do you want to deal?`,
    buttons: Array.fromRange(7).map((e) => ({
      label: e,
      callback: () => e
    }))
  });
}
m(ie, "getCardsAmount");
const A = class A {
  /**
   * Initialization
   */
  static async setup() {
    console.log("ACG | Initialising..."), DocumentSheetConfig.registerSheet(Cards, "adventure-deck", w, {
      label: game.i18n.localize("ACG.HAND_SHEET"),
      types: ["hand"]
    }), game.settings.register("adventure-deck", "destinyChild", {
      name: game.i18n.localize("ACG.SETTINGS.DESTINY_CHILD_LABEL"),
      hint: game.i18n.localize("ACG.SETTINGS.DESTINY_CHILD_HINT"),
      scope: "world",
      config: !0,
      type: String,
      default: game.i18n.localize("ACG.SETTINGS.DESTINY_CHILD_DEFAULT")
    }), game.settings.register("adventure-deck", "deckName", {
      name: game.i18n.localize("ACG.SETTINGS.DECK_NAME_LABEL"),
      hint: game.i18n.localize("ACG.SETTINGS.DECK_NAME_HINT"),
      scope: "world",
      config: !0,
      type: String,
      default: game.i18n.localize("ACG.SETTINGS.DECK_NAME_DEFAULT")
    }), game.settings.register("adventure-deck", "handNames", {
      name: game.i18n.localize("ACG.SETTINGS.HAND_NAMES_LABEL"),
      hint: game.i18n.localize("ACG.SETTINGS.HAND_NAMES_HINT"),
      scope: "world",
      config: !0,
      type: String,
      default: game.i18n.localize("ACG.SETTINGS.HAND_NAMES_DEFAULT")
    }), game.settings.register("adventure-deck", "dumpPileName", {
      name: game.i18n.localize("ACG.SETTINGS.DUMP_PILE_LABEL"),
      hint: game.i18n.localize("ACG.SETTINGS.DUMP_PILE_HINT"),
      scope: "world",
      config: !0,
      type: String,
      default: game.i18n.localize("ACG.SETTINGS.DUMP_PILE_DEFAULT")
    }), game.settings.register("adventure-deck", "toggleSoundOnPlayCard", {
      name: game.i18n.localize("ACG.SETTINGS.TOGGLE_SOUND_LABEL"),
      hint: game.i18n.localize("ACG.SETTINGS.TOGGLE_SOUND_HINT"),
      scope: "world",
      config: !0,
      type: Boolean,
      default: !0
    }), game.settings.register("adventure-deck", "soundFileOnPlayCard", {
      name: game.i18n.localize("ACG.SETTINGS.PLAY_SOUND_LABEL"),
      hint: game.i18n.localize("ACG.SETTINGS.PLAY_SOUND_HINT"),
      scope: "world",
      config: !0,
      type: String,
      default: game.i18n.localize("ACG.SETTINGS.PLAY_SOUND_DEFAULT")
    }), game.settings.register("adventure-deck", "announceCards", {
      name: game.i18n.localize("ACG.SETTINGS.ANNOUNCE_CARDS_LABEL"),
      hint: game.i18n.localize("ACG.SETTINGS.ANNOUNCE_CARDS_HINT"),
      scope: "world",
      config: !0,
      type: Boolean,
      default: !1
    }), Handlebars.registerHelper("getGroupHands", (e) => {
      const t = game.cards.get(e);
      return game.cards.filter(
        (a) => a.type === "hand" && t.getFlag("adventure-deck", "group") === a.getFlag("adventure-deck", "group")
      );
    });
  }
  /**
   * Ready hook
   *
   * @param {boolean} reset Reset the adventure deck
   */
  static async ready(e = !1) {
    if (game.modules.get("adventure-deck").adventureDeckControl ??= A, game.user.isGM) {
      const t = game.settings.get("adventure-deck", "deckName"), a = game.cards.find((r) => r.type === "deck" && r.name === t), n = game.settings.get("adventure-deck", "handNames");
      if (!a) {
        const r = game.packs.get("adventure-deck.adventure-deck"), l = (await r.getIndex()).filter((u) => u.name === "Adventure Deck")[0]._id;
        await (await game.cards.importFromCompendium(r, l)).update({ name: t });
      }
      a && e && await a.recall();
      const i = game.settings.get("adventure-deck", "dumpPileName"), o = await game.cards.getName(i);
      o && e && await o.delete(), e && await Cards.deleteDocuments(
        game.cards.filter(
          (r) => ["adventure hands", "adventure dump"].includes(r.getFlag("adventure-deck", "group"))
        ).map((r) => r.id)
      ), (!o || e) && await Cards.create({
        name: i,
        type: "pile",
        flags: {
          "adventure-deck": { group: "adventure dump" }
        }
      });
      for (const r of game.users.filter((l) => !l.isGM && l.role > CONST.USER_ROLES.NONE)) {
        const l = n.replace("[NAME]", r.name);
        game.cards.filter((u) => u.type === "hand").map((u) => u.name).includes(l) || await Cards.create({
          name: l,
          type: "hand",
          flags: {
            core: { sheetClass: "adventure-deck.AdventureHandSheet" },
            "adventure-deck": { group: "adventure hands" }
          },
          ownership: {
            default: CONST.DOCUMENT_OWNERSHIP_LEVELS.OBSERVER,
            [r.id]: CONST.DOCUMENT_OWNERSHIP_LEVELS.OWNER
          }
        });
      }
    }
  }
  /**
   *
   * @param {*} html JQuery element
   * @param {Array<object>} context Array of context menu options
   */
  static onGetUserContextOptions(e, t) {
    e.find("#players") && t.push(
      {
        name: game.i18n.localize("ACG.SETTINGS.DEAL_ADVENTURE_CARDS"),
        icon: '<i class="fa-solid fa-cards"></i>',
        condition: () => game.user?.isGM,
        callback: () => dealAdventureCards()
      },
      {
        name: game.i18n.localize("ACG.SETTINGS.RESET_ADVENTURE_CARDS"),
        icon: '<i class="fa-solid fa-cards"></i>',
        condition: (n) => game.user?.isGM,
        callback: () => resetAdventureCards()
      }
    );
  }
  /**
   * Shuffles the adventure deck
   */
  static async shuffleAdventureCards() {
    await game.cards.getName(game.settings.get("adventure-deck", "deckName")).shuffle();
  }
  /**
   * Opens the dialog prompt to reset the adventure deck
   */
  static async resetAdventureCards() {
    await game.cards.getName(game.settings.get("adventure-deck", "deckName")).resetDialog();
  }
  /**
   * Deals adventure cards
   */
  static async dealAdventureCards() {
    const e = game.cards.getName(game.settings.get("adventure-deck", "deckName")), t = game.settings.get("adventure-deck", "handNames");
    for (const a of game.users.filter((n) => !n.isGM)) {
      const n = game.cards.getName(t.replace("[NAME]", a.name)), i = await ie(a), o = e.drawnCards, r = (await e.deal([n], i, { how: CONST.CARD_DRAW_MODES.RANDOM })).drawnCards.filter((l) => !o.includes(l));
      if (game.settings.get("adventure-deck", "announceCards")) {
        const l = await renderTemplate(
          "modules/adventure-deck/templates/dealtcards-chatcard.hbs",
          {
            player: a.name,
            cards: r
          }
        );
        ChatMessage.create({
          user: game.user.id,
          type: CONST.CHAT_MESSAGE_TYPES.OTHER,
          content: l
        });
      }
    }
  }
};
m(A, "AdventureDeckControl");
let g = A;
Hooks.on("setup", g.setup);
Hooks.on("ready", g.ready);
Hooks.on("getUserContextOptions", g.onGetUserContextOptions);
Hooks.on("getApplicationHeaderButtons", (s, e) => {
  game.user.isGM && s instanceof w && e.unshift({
    class: "group-confog",
    icon: "fas fa-layer-group",
    label: "Group",
    onclick: async () => {
      s.object.setFlag(
        "adventure-deck",
        "group",
        await ae({
          prompt: "set group",
          defaultValue: s.object.getFlag("adventure-deck", "group")
        })
      );
    }
  });
});
Hooks.on("renderCardsDirectory", async (s, e) => {
  if (e.find(".adventure-deck-deal-btn").length > 0)
    return;
  const t = $(
    `<button class="adventure-deck-deal-btn"> ${game.i18n.localize(
      "ACG.SETTINGS.DEAL_ADVENTURE_CARDS"
    )}</button>`
  ), a = $(
    `<button class="adventure-deck-deal-btn"> ${game.i18n.localize(
      "ACG.SETTINGS.SHUFFLE_ADVENTURE_CARDS"
    )}</button>`
  ), n = $(
    `<button class="adventure-deck-deal-btn"> ${game.i18n.localize(
      "ACG.SETTINGS.RESET_ADVENTURE_CARDS"
    )}</button>`
  );
  game.user.isGM && (e.find("footer").append(t), e.find("footer").append(a), e.find("footer").append(n)), t.on("click", (i) => {
    g.dealAdventureCards();
  }), a.on("click", (i) => {
    g.shuffleAdventureCards();
  }), n.on("click", (i) => {
    g.resetAdventureCards();
  });
});
Hooks.on("getCardsDirectoryEntryContext", (s, e) => {
  const t = {
    name: "Give Adventure Card",
    icon: '<i class="fa-solid fa-card-spade"></i>',
    condition: (a) => game.cards.get(a.data("documentId"), { strict: !0 }).type === "hand",
    callback: (a) => {
      const n = game.cards.get(a.data("documentId"), { strict: !0 });
      re(n);
    }
  };
  e.push(t);
});
async function re(s) {
  await game.cards.getName(game.settings.get("adventure-deck", "deckName")).deal([s], 1), foundry.audio.AudioHelper.play({ src: "systems/swade/assets/card-flip.wav" });
}
m(re, "dealPlayerCard");
window.dealAdventureCards = g.dealAdventureCards;
window.resetAdventureCards = g.resetAdventureCards;
window.shuffleAdventureCards = g.shuffleAdventureCards;
console.log(`[${d}@${W}...] successfully loaded!`);
