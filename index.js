class AbenteuerkartenHandSheet extends CardsHand {
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      classes: ["acg-hand"],
      template: "modules/onkeldom-abenteuerkarten-deck/templates/adventurehandsheet.hbs",
      width: 500,
      height: 600,
      resizable: true,
      dragDrop: [{
        dragSelector: "div.adventure-hand-row div.card",
        dropSelector: "div.adventure-hand-row"
      }]
    });
  }

  activateListeners(html) {
    super.activateListeners(html);

    html.find(".play-card").on("click", this._onPlayCard.bind(this));
    html.find(".give-card").on("click", this._onGiveCard.bind(this));
    html.find(".card-details").on("click", this._onPopImage.bind(this));
    html.find(".hand-card-face").on("click", this._onPopImage.bind(this));

    html.find(".card").on("contextmenu", async ev => {
      ev.preventDefault();
      const uuid = ev.currentTarget.dataset.cardUuid;
      const card = await fromUuid(uuid);

      new ContextMenu($(ev.currentTarget), html, [
        {
          name: "Ausspielen",
          icon: '<i class="fas fa-play"></i>',
          callback: () => this._onPlayCard({ preventDefault: () => {}, currentTarget: { dataset: { cardUuid: uuid } } })
        },
        {
          name: "Geben",
          icon: '<i class="fas fa-hand-holding"></i>',
          callback: () => this._onGiveCard({ preventDefault: () => {}, currentTarget: { dataset: { cardUuid: uuid } } })
        }
      ]).render(true);
    });
  }

  async _onPlayCard(event) {
    event.preventDefault();
    const uuid = event.currentTarget.dataset.cardUuid;
    const card = await fromUuid(uuid);
    const img = card.faces?.[0]?.img || card.img;

    const html = await renderTemplate("modules/onkeldom-abenteuerkarten-deck/templates/adventurecard-chatcard.hbs", {
      name: card.name,
      img: img
    });

    await ChatMessage.create({
      user: game.user.id,
      style: CONST.CHAT_MESSAGE_STYLES.OTHER,
      content: html
    });

    const pileName = game.settings.get("Abenteuerkarten", "discardPileName");
    const pile = game.cards.find(c => c.name === pileName && c.type === "pile");
    if (pile) await card.pass(pile);
  }

  async _onGiveCard(event) {
    event.preventDefault();
    const uuid = event.currentTarget.dataset.cardUuid;
    const card = await fromUuid(uuid);

    const hands = game.cards.filter(c => c.type === "hand" && c.id !== this.object.id);
    if (!hands.length) {
      ui.notifications.warn("Keine anderen Spielerhände gefunden.");
      return;
    }

    await GiveCardDialog.create(card, hands);
  }

  async _onPopImage(event) {
    event.preventDefault();
    const uuid = event.currentTarget.dataset.cardUuid;
    const card = await fromUuid(uuid);
    new ImagePopout(card.img, {
      title: card.name,
      uuid,
      shareable: true
    }).render(true);
  }
}

window.Abenteuerkarten = window.Abenteuerkarten || {};
Abenteuerkarten.AbenteuerkartenHandSheet = AbenteuerkartenHandSheet;

class GiveCardDialog extends Dialog {
  static async create(card, hands) {
    const html = await renderTemplate("modules/onkeldom-abenteuerkarten-deck/templates/chooserecipientdialog.hbs", { hands });

    return new Promise(resolve => {
      const dlg = new this({
        title: "An wen soll die Karte gegeben werden?",
        content: html,
        buttons: {
          cancel: {
            label: "Abbrechen",
            callback: () => resolve(false)
          }
        },
        render: html => {
          html.find(".recipient-button").on("click", async ev => {
            const handId = ev.currentTarget.dataset.handId;
            const targetHand = game.cards.get(handId);
            await card.pass(targetHand);
            resolve(true);
            dlg.close();
          });
        },
        default: "cancel"
      });

      dlg.render(true);
    });
  }
}

Hooks.once("init", () => {
  game.settings.register("Abenteuerkarten", "discardPileName", {
    name: "Name des Ablagestapels",
    hint: "Name des Stapels, in den gespielte Karten abgelegt werden.",
    scope: "world",
    config: true,
    type: String,
    default: "Abenteuer-Ablagestapel"
  });

  DocumentSheetConfig.registerSheet(Cards, "Abenteuerkarten", AbenteuerkartenHandSheet, {
    label: "Abenteuerkarten Hand",
    types: ["hand"],
    makeDefault: false
  });
});

Hooks.once("ready", async () => {
  if (!game.user.isGM) return;

  const pileName = game.settings.get("Abenteuerkarten", "discardPileName");
  let pile = game.cards.find(c => c.name === pileName && c.type === "pile");

  if (!pile) {
    await game.cards.documentClass.create({
      name: pileName,
      type: "pile",
      description: "Ablagestapel für gespielte Abenteuerkarten",
      img: "modules/onkeldom-abenteuerkarten-deck/assets/ablage.png"
    });
    ui.notifications.info(`Ablagestapel "${pileName}" wurde automatisch erstellt.`);
  }

  const existingDeck = game.cards.getName("Abenteuerkarten");
  if (!existingDeck) {
    const filePath = "modules/onkeldom-abenteuerkarten-deck/abenteuerkarten.json";
    try {
      const response = await fetch(filePath);
      const json = await response.json();
      await Cards.create(json);
      ui.notifications.info("Abenteuerkarten-Deck wurde automatisch erstellt.");
    } catch (e) {
      console.error("Fehler beim automatischen Deck-Import:", e);
      ui.notifications.warn("Das Abenteuerkarten-Deck konnte nicht geladen werden.");
    }
  }

  const PERMISSION_OWNER = CONST?.DOCUMENT_PERMISSION_LEVELS?.OWNER ?? 3;

  for (const player of game.users.players.filter(u => !u.isGM)) {
    const actors = game.actors.filter(a =>
      a.type === "character" && a.testUserPermission(player, "OWNER")
    );

    for (const actor of actors) {
      const handName = `Kartenhand von ${actor.name}`;
      const exists = game.cards.some(c => c.type === "hand" && c.name === handName);
      if (exists) continue;

      await game.cards.documentClass.create({
        name: handName,
        type: "hand",
        img: actor.img,
        ownership: { [player.id]: PERMISSION_OWNER },
        flags: {
          core: {
            sheetClass: "Abenteuerkarten.AbenteuerkartenHandSheet"
          }
        }
      });

      console.log(`?? Kartenhand für ${handName} erstellt.`);
    }
  }
});

Hooks.on("renderChatMessage", (message, html, data) => {
  html.find(".chat-card-popout").on("click", ev => {
    const img = ev.currentTarget.dataset.cardImg;
    if (!img) {
      console.warn("?? Kein Bildpfad im Element");
      ui.notifications.warn("Bild der Karte konnte nicht angezeigt werden.");
      return;
    }

    const title = html.find(".result-text").text().trim() || "Abenteuerkarte";

    new ImagePopout(img, {
      title: title,
      shareable: true
    }).render(true);
  });
});
