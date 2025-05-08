Hooks.once("ready", async () => {
  if (!game.user.isGM) return;

  console.log("DSA5 Abenteuerkarten-Modul aktiv");

  const deckName = "Abenteuerkarten-Deck";
  const discardName = "Abenteuer-Ablagestapel";

  // Deck und Ablagestapel automatisch erstellen, falls nicht vorhanden
  let deck = game.cards.getName(deckName);
  if (!deck) {
    deck = await Cards.create({ name: deckName, type: "deck" });
    ui.notifications.info(`Deck "${deckName}" wurde erstellt.`);
  }

  let discard = game.cards.getName(discardName);
  if (!discard) {
    discard = await Cards.create({ name: discardName, type: "pile" });
    ui.notifications.info(`Ablagestapel "${discardName}" wurde erstellt.`);
  }

  // Karten ins Deck laden, wenn leer
  if (deck.cards.size === 0) {
    const allCards = game.cards.filter(c => c.type === "card");
    if (allCards.length > 0) {
      await deck.addCards(allCards.map(c => c.id));
      ui.notifications.info(`${allCards.length} Karten ins Deck geladen.`);
    }
  }

  const getDeck = () => game.cards.getName(deckName);
  const getDiscard = () => game.cards.getName(discardName);

  async function shuffleDeck() {
    const deck = getDeck();
    if (!deck) return ui.notifications.warn(`Deck "${deckName}" nicht gefunden.`);
    await deck.shuffle();
    ui.notifications.info("Deck wurde gemischt.");
  }

  async function resetDeck() {
    const deck = getDeck();
    const discard = getDiscard();
    if (!deck || !discard) return ui.notifications.warn("Deck oder Ablagestapel nicht gefunden.");
    const cards = discard.cards.contents;
    if (!cards.length) return ui.notifications.info("Ablagestapel ist leer.");
    await discard.pass(deck, cards.map(c => c.id));
    ui.notifications.info("Karten zurück ins Deck gelegt.");
  }

  async function dealToPlayers() {
    const deck = getDeck();
    if (!deck) return ui.notifications.warn(`Deck "${deckName}" nicht gefunden.`);

    for (const user of game.users.players) {
      const handName = `${user.name}'s Abenteuerhand`;
      const hand = game.cards.getName(handName);
      if (!hand) {
        ui.notifications.warn(`Keine Hand für ${user.name} gefunden.`);
        continue;
      }
      await deck.deal([hand], 1, { how: CONST.CARD_DRAW_MODES.TOP });
    }

    ui.notifications.info("Jedem Spieler wurde eine Karte gegeben.");
  }

  // Karte im Chat anzeigen (ausspielen)
  async function playCard(card) {
    const cardTemplate = "modules/dsa5-abenteuer-deck/templates/abenteuerkarten-chatkarte.hbs";
    const html = await renderTemplate(cardTemplate, {
      name: card.name,
      description: card.system?.description?.value || "",
      faces: card.faces
    });

    ChatMessage.create({
      user: game.user.id,
      type: CONST.CHAT_MESSAGE_TYPES.OTHER,
      content: html
    });
  }

  // Karte weitergeben oder abwerfen
  async function giveCard(card) {
    const templatePath = "modules/dsa5-abenteuer-deck/templates/abenteuerkarten_weitergabe.hbs";

    const html = await renderTemplate(templatePath, {
      users: game.users.filter(u => !u.isGM),
      card: card
    });

    return new Promise(resolve => {
      new Dialog({
        title: game.i18n.localize("ACG.GIVE_DIALOG.TITLE"),
        content: html,
        buttons: {},
        render: html => {
          html.find(".give-button").on("click", async event => {
            const targetId = event.currentTarget.dataset.userid;
            const targetHand = game.cards.getName(`${game.users.get(targetId).name}'s Abenteuerhand`);
            if (targetHand) await card.parent.pass(targetHand, [card.id]);
            resolve();
          });

          html.find(".discard-button").on("click", async () => {
            const discard = getDiscard();
            if (discard) await card.parent.pass(discard, [card.id]);
            resolve();
          });

          html.find(".cancel-button").on("click", () => {
            resolve();
          });
        }
      }).render(true);
    });
  }

  // Event-Handling in Kartenhand-UI
  Hooks.on("renderCardsHand", (app, html) => {
    html.find(".play-card").on("click", async (event) => {
      const uuid = event.currentTarget.dataset.cardUuid;
      const card = await fromUuid(uuid);
      playCard(card);
    });

    html.find(".give-card").on("click", async (event) => {
      const uuid = event.currentTarget.dataset.cardUuid;
      const card = await fromUuid(uuid);
      giveCard(card);
    });
  });

  // Buttons ins Kartenverzeichnis einfügen
  Hooks.on("renderCardsDirectory", async (_app, html) => {
    const footer = html.find("footer");
    if (!footer.length) return;

    const buttonStyle = 'margin-left: 0.5em;';

    const btnShuffle = $(`<button style="${buttonStyle}"><i class="fas fa-random"></i> Mischen</button>`);
    const btnReset = $(`<button style="${buttonStyle}"><i class="fas fa-undo"></i> Zurücklegen</button>`);
    const btnDeal = $(`<button style="${buttonStyle}"><i class="fas fa-hand-paper"></i> Austeilen</button>`);

    btnShuffle.on("click", shuffleDeck);
    btnReset.on("click", resetDeck);
    btnDeal.on("click", dealToPlayers);

    footer.append(btnShuffle, btnReset, btnDeal);
  });
});
