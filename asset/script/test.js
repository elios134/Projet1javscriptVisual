// ===============================
//   ISLAND CHOICE
// ===============================

// --- Éléments du DOM
const sceneText = document.getElementById("sceneText");
const recapBox = document.getElementById("recap");
const choicesContainer = document.querySelector(".choices");
const menuScreen = document.getElementById("menuScreen");
const header=document.getElementById("header")
const gameScreen = document.getElementById("gameScreen");
const clickSound = document.getElementById("clickSound");
const sceneImage = document.getElementById("sceneImage");
const buttonStart = document.querySelector(".start")
const buttonRules=document.querySelector(".rules")
const buttonBackMenu=document.querySelector(".backMenu")
const buttonReturn=document.querySelector(".return")

// --- État du jeu
let index = 1;
let recap = "Pendant votre partie, vous avez choisi de :\n";

// --- Images par scène (réutilisées si besoin)
const sceneImages = {
    1: "asset/imgs/scene1.png", // île / mer
    2: "asset/imgs/scene2.png", // forêt
    3: "asset/imgs/scene3.png", // château ext
    4: "asset/imgs/scene4.png", // château int
    5: "asset/imgs/scene5.png", // trésor
    6: "asset/imgs/scene13.png", // couloir
    7: "asset/imgs/scene7.png", // sage
    8: "asset/imgs/scene8.png", // question / épreuve
    9: "asset/imgs/scene9.png", // victoire / connaissance
    10: "asset/imgs/scene10.png", // mer (fuite)
    11: "asset/imgs/scene11.png", // grotte
    12: "asset/imgs/scene12.png", // gobelins / capture
    13: "asset/imgs/scene6.png", // couloir lueur
    14: "asset/imgs/scene14.png", // village
    15: "asset/imgs/scene29.png", // dragon approche
    16: "asset/imgs/scene30.png", // combat dragon
    17: "asset/imgs/scene5.png", // montagne + trésor
    18: "asset/imgs/scene18.png", // dragon attaque (chemin)
    19: "asset/imgs/scene19.png", // chute dans salle trésor
    20: "asset/imgs/scene20.png", // effondrement
    21: "asset/imgs/scene21.png", // refuse au sage
    22: "asset/imgs/scene22.png", // renvoi mer
    23: "asset/imgs/scene11.png", // grotte bis
    24: "asset/imgs/scene24.png", // blessé / aide
    25: "asset/imgs/scene25.png", // maison / villageoise
    26: "asset/imgs/scene26.png", // lac / provocation
    27: "asset/imgs/scene27.png", // discussion Elydia
    28: "asset/imgs/scene27.png", // confidence / quête
    29: "asset/imgs/scene29.png", // choix combat/chemin
    30: "asset/imgs/scene30.png", // victoire dragon
    31: "asset/imgs/scene31.png", // affrontez encore
    32: "asset/imgs/scene32.png", // retour village
    33: "asset/imgs/scene33.png", // meilleure fin
    34: "asset/imgs/scene27.png", // silence → sauver enfant
    35: "asset/imgs/scene35.png", // cède à colère
    36: "asset/imgs/scene36.png", // mort blessures
    37: "asset/imgs/scene22.png", // perdu / renvoyé bateau
};
function updateSceneImage(i) {
    const src = sceneImages[i] || sceneImages[1];
    sceneImage.classList.remove("visible");
    setTimeout(() => {
        sceneImage.src = src;
        sceneImage.classList.add("visible");
    }, 200);
}

// --- Menu
buttonStart.addEventListener("click",startGame)
function startGame() {
    header.style.display="block"
    menuScreen.classList.add("hidden");
    gameScreen.classList.remove("hidden");
    try { ambient.volume = 0.4; ambient.play(); } catch { }
    recap = "Pendant votre partie, vous avez choisi de :\n";
    recapBox.textContent = recap;
    showScene(1);
}

buttonBackMenu.addEventListener("click",backToMenu)
function backToMenu() {
    gameScreen.classList.add("hidden");
    menuScreen.classList.remove("hidden");
    try { ambient.pause(); ambient.currentTime = 0; } catch { }
}

buttonRules.addEventListener("click",showRules)
function showRules() {
    document.getElementById("rules").classList.remove("hidden");
    document.getElementById("credits").classList.add("hidden");
}

buttonReturn.addEventListener("click",hidePanels)
function hidePanels() {
    document.getElementById("rules").classList.add("hidden");
    document.getElementById("credits").classList.add("hidden");
}

// --- Affichage scène & choix
function render(text, options = []) {
    sceneText.textContent = text;
    choicesContainer.innerHTML = "";
    options.forEach(opt => {
        const btn = document.createElement("button");
        btn.className = "choice";
        btn.textContent = opt.label;
        btn.onclick = () => {
            if (opt.recap) {
                recap += opt.recap;
                recapBox.textContent = recap;
            }
            if (opt.next === 0) { backToMenu(); return; }
            showScene(opt.next);
        };
        choicesContainer.appendChild(btn);
    });
}

function showScene(i) {
    index = i;
    updateSceneImage(i);

    // Texte & choix, fidèles à l’original (orthographe corrigée)
    switch (i) {
        case 1:
            render(
                "Tu viens d’arriver en bateau sur une île inconnue. Devant toi, une grande forêt à explorer. Souhaites-tu partir à l’aventure dans la forêt ou repartir en mer ?",
                [
                    { label: "Aller dans la forêt 🌲", next: 2, recap: "- Suivre la forêt\n" },
                    { label: "Reprendre la mer 🌊", next: 10, recap: "- Reprendre la mer et fuir !!\n" },
                ]
            );
            break;

        case 2:
            render(
                "La forêt te mène devant une grotte, et à côté, un chemin pavé. Que choisis-tu ?",
                [
                    { label: "Prendre le chemin 🛤️", next: 3, recap: "- Emprunter le chemin\n" },
                    { label: "Entrer dans la grotte 🕳️", next: 11, recap: "- Passer par la grotte\n" },
                ]
            );
            break;

        case 3:
            render(
                "Le chemin te mène à un château abandonné. Rentrer dedans ou rester dehors pour explorer les alentours ?",
                [
                    { label: "Entrer dans le château 🏰", next: 4, recap: "- Entrer dans le château\n" },
                    { label: "Rester dehors 🌿", next: 14, recap: "- Rester dehors pour explorer les alentours\n" },
                ]
            );
            break;

        case 4:
            render(
                "Le château est très délabré. Tu ne peux explorer que la cave, et tu vois un passage secret. Vas-tu prendre le passage ou continuer ton exploration dehors ?",
                [
                    { label: "Prendre le passage secret 🔦", next: 5, recap: "- Prendre le passage secret\n" },
                    { label: "Continuer dehors 🌳", next: 14, recap: "- Continuer l’exploration dehors\n" },
                ]
            );
            break;

        case 5:
            render(
                "Le passage te mène dans une salle remplie de trésors, mais au bout de la salle tu vois une autre porte. Vas-tu explorer ou prendre le trésor ?",
                [
                    { label: "Explorer plus loin 🚪", next: 6, recap: "- Explorer plus en profondeur\n" },
                    { label: "Prendre le trésor 💰", next: 20, recap: "- Prendre le trésor\n" },
                ]
            );
            break;

        case 6:
            render(
                "Tu as décidé de continuer ton exploration. Te voilà dans un couloir, au bout un vieux sage te fixe intensément. Décides-tu de lui parler ou de ne pas lui parler ?",
                [
                    { label: "Parler au vieux sage 🧙‍♂️", next: 7, recap: "- Parler au vieux sage\n" },
                    { label: "Ne pas lui parler ❌", next: 20, recap: "- Ne pas parler au vieux sage\n" },
                ]
            );
            break;

        case 7:
            render(
                "Le vieux t’annonce qu’il est le gardien de ce lieu qui contient toute la connaissance du monde. Tu as réussi l’épreuve précédente mais il te reste une dernière épreuve ! Tu ne peux pas refuser, sinon c’est la mort. Que fais-tu ?",
                [
                    { label: "Accepter le défi ⚔️", next: 8, recap: "- Accepter le défi\n" },
                    { label: "Refuser 🚫", next: 21, recap: "- Refuser le défi\n" },
                ]
            );
            break;

        case 8:
            render(
                "Le sage t’annonce la dernière épreuve : « Quel est le plat préféré du Roi Thomas ? La tartiflette ou la salade ? »",
                [
                    { label: "Tartiflette 🧀", next: 9, recap: "- Répondre : Tartiflette\n" },
                    { label: "Salade 🥗", next: 22, recap: "- Répondre : Salade\n" },
                ]
            );
            break;

        case 9:
            render(
                "Bravo, c’est la bonne réponse ! Tu es digne d’accéder à toute cette connaissance... Souhaites-tu recommencer une nouvelle aventure ?",
                [
                    { label: "Oui, recommencer 🔁", next: 1 },
                    { label: "Retour au menu 🏠", next: 0 },
                ]
            );
            break;

        case 10:
            render(
                "Tu as fui cette île ; tu peux avoir honte d’être si peureux !",
                [
                    { label: "Recommencer l’aventure 🔁", next: 1 },
                    { label: "Retour au menu 🏠", next: 0 },
                ]
            );
            break;

        case 11:
            render(
                "La grotte est remplie de gobelins. Derrière eux, un long couloir. Vas-tu utiliser la violence ou t’infiltrer discrètement ?",
                [
                    { label: "Utiliser la violence ⚔️", next: 12, recap: "- Choisir la violence (mauvaise idée !)\n" },
                    { label: "S’infiltrer 🕶️", next: 13, recap: "- T’infiltrer discrètement\n" },
                ]
            );
            break;

        case 12:
            render(
                "Tu te fais capturer et tu seras réduit en esclavage pour toujours.",
                [
                    { label: "Recommencer au checkpoint précédent 🔁", next: 11 },
                    { label: "Retour au menu 🏠", next: 0 },
                ]
            );
            break;

        case 13:
            render(
                "Tu te retrouves devant un long couloir ; tu vois une lueur au bout. Avancer ou reculer pour sortir de la grotte (les gobelins sont partout) ?",
                [
                    { label: "Avancer ➡️", next: 6, recap: "- Avancer\n" },
                    { label: "Reculer ⬅️", next: 24, recap: "- Reculer et affronter les gobelins\n" },
                ]
            );
            break;

        case 14:
            render(
                "Tu rencontres des villageois qui te demandent de l’aide. Acceptes-tu ou refuses-tu ?",
                [
                    { label: "Accepter 🤝", next: 15, recap: "- Aider les villageois\n" },
                    { label: "Refuser 🙅", next: 23, recap: "- Refuser d’aider les villageois\n" },
                ]
            );
            break;

        case 15:
            render(
                "Ils te disent qu’un enfant a été enlevé par un dragon parti dans une montagne au nord de l’île. En arrivant, le dragon te fait face mais, à gauche, un petit chemin est caché. Combattre le dragon ou prendre le chemin ?",
                [
                    { label: "Combattre le dragon 🐉", next: 16, recap: "- Combattre le dragon\n" },
                    { label: "Prendre le chemin 🛣️", next: 18, recap: "- Éviter le dragon par le chemin\n" },
                ]
            );
            break;

        case 16:
            render(
                "Après un combat acharné, tu terrasses le dragon et sauves l’enfant. Tu entends des bruits étranges venant de la montagne, comme une voix de vieil homme. Aller dans la montagne ou revenir au château ?",
                [
                    { label: "Aller à la montagne 🏔️", next: 17, recap: "- Aller vers la montagne\n" },
                    { label: "Revenir au château 🏰", next: 4, recap: "- Faire demi-tour\n" },
                ]
            );
            break;

        case 17:
            render(
                "Tu arrives là où la voix est la plus forte. Une porte s’ouvre, t’invitant à entrer. Dans la salle, des trésors et, derrière, une autre porte. Prendre le trésor ou voir ce qu’il y a derrière la porte ?",
                [
                    { label: "Prendre le trésor 💎", next: 20, recap: "- Prendre le trésor\n" },
                    { label: "Voir derrière la porte 🚪", next: 6, recap: "- Vouloir voir derrière la porte\n" },
                ]
            );
            break;

        case 18:
            render(
                "Tu arrives devant l’enfant, mais le dragon vous attaque. Tu n’as pas d’autre choix que d’affronter ce dragon !",
                [
                    { label: "Affronter le dragon ⚔️", next: 16, recap: "- Affronter le dragon\n" },
                ]
            );
            break;

        case 20:
            render(
                "Tu commences à t’en mettre plein les poches quand un bruit sourd retentit ! La salle est en train de s’effondrer. Tu n’as plus d’issue : tu meurs écrasé... Il ne fallait pas être si cupide !",
                [
                    { label: "Recommencer au checkpoint 🔁", next: 6 },
                    { label: "Retour au menu 🏠", next: 0 },
                ]
            );
            break;

        case 21:
            render(
                "Tu refuses de lui parler et décides de rebrousser chemin, mais la porte a disparu. Tu n’as pas le choix : tu dois parler au vieux !",
                [
                    { label: "Parler au vieux 🧙‍♂️", next: 37, recap: "- Parler au vieux sage (forcé)\n" },
                ]
            );
            break;

        case 22:
            render(
                "Tu as choisi la salade. Le sage te dit que tu n’as pas compris le sens de la vie : « Le gras, c’est la vie ! » Il te téléporte sur ton bateau déjà en mer, en route vers chez toi.",
                [
                    { label: "Revenir au checkpoint précédent 🔁", next: 8 },
                    { label: "Retour au menu 🏠", next: 0 },
                ]
            );
            break;

        case 23:
            render(
                "Tu refuses d’aider les villageois et explores finalement la grotte non loin du château. Elle est remplie de gobelins. Derrière eux, un long couloir. Violence ou infiltration ?",
                [
                    { label: "Violence ⚔️", next: 12, recap: "- Utiliser la violence\n" },
                    { label: "S’infiltrer 🕶️", next: 13, recap: "- S’infiltrer discrètement\n" },
                ]
            );
            break;

        case 24:
            render(
                "Vous avez combattu les gobelins et réussi à sortir de la grotte, blessé. Des villageois vous voient et proposent leur aide. Acceptez-vous ?",
                [
                    { label: "Accepter l’aide 🤝", next: 25, recap: "- Accepter l’aide des villageois\n" },
                    { label: "Refuser ❌", next: 36, recap: "- Refuser l’aide proposée\n" },
                ]
            );
            break;

        case 25:
            render(
                "Les villageois vous ont soigné. À la sortie, une villageoise rousse vous fait du charme. Acceptez-vous ses avances ou repartez explorer le château ?",
                [
                    { label: "Accepter ses avances ❤️", next: 26, recap: "- Accepter les avances de la ravissante rousse\n" },
                    { label: "Repartir explorer 🏰", next: 4, recap: "- Repartir vers le château\n" },
                ]
            );
            break;

        case 26:
            render(
                "Au bord du lac, tout se passe bien quand des hommes vous provoquent. Céder aux provocations ou rester calme ?",
                [
                    { label: "Céder à la colère 😠", next: 35, recap: "- Céder à la colère\n" },
                    { label: "Rester calme 😌", next: 27, recap: "- Garder son calme\n" },
                ]
            );
            break;

        case 27:
            render(
                "Vous gardez votre calme. Les hommes s’en vont et la villageoise apprécie. Elle se présente : elle s’appelle Elydia. Elle vous demande pourquoi vous êtes ici. Dire la vérité ou garder le silence ?",
                [
                    { label: "Dire la vérité 💬", next: 28, recap: "- Dire la vérité\n" },
                    { label: "Garder le silence 🤐", next: 34, recap: "- Rester muet\n" },
                ]
            );
            break;

        case 28:
            render(
                "Vous lui dites la vérité : vous êtes venu pour un fameux trésor, mais vous avez changé depuis l’aide des villageois. Elle comprend et parle d’un enfant enlevé par un dragon. Acceptez-vous d’aider ?",
                [
                    { label: "Accepter d’aider l’enfant 🧒", next: 29, recap: "- Accepter de sauver l’enfant\n" },
                ]
            );
            break;

        case 29:
            render(
                "Le dragon est parti vers une montagne au nord de l’île. En arrivant, il vous fait face, mais un petit chemin est visible à gauche. Combattre le dragon ou prendre le chemin ?",
                [
                    { label: "Combattre 🐉", next: 30, recap: "- Combattre le dragon\n" },
                    { label: "Prendre le chemin 🛣️", next: 31, recap: "- Éviter le dragon par le chemin\n" },
                ]
            );
            break;

        case 30:
            render(
                "Après un combat acharné, tu terrasses le dragon et sauves l’enfant. Tu entends une voix de vieil homme. Aller dans la montagne ou revenir au village ?",
                [
                    { label: "Aller dans la montagne 🏔️", next: 17, recap: "- Aller vers la montagne\n" },
                    { label: "Revenir au village 🏘️", next: 32, recap: "- Revenir au village\n" },
                ]
            );
            break;

        case 31:
            render(
                "Tu arrives devant l’enfant, mais le dragon vous attaque — tu n’as pas d’autre choix que de l’affronter !",
                [
                    { label: "Affronter le dragon ⚔️", next: 30, recap: "- Affronter le dragon (encore)\n" },
                ]
            );
            break;

        case 32:
            render(
                "Vous revenez au village avec l’enfant. Elydia vous remercie : c’est son fils. Voulez-vous rester encore un peu au village ou repartir à la recherche du trésor ?",
                [
                    { label: "Rester au village 🏡", next: 33, recap: "- Rester au village\n" },
                    { label: "Repartir en quête 🧭", next: 4, recap: "- Repartir vers le château\n" },
                ]
            );
            break;

        case 33:
            render(
                "Vous avez décidé de rester au village avec Elydia. Finalement, vous renoncez à votre quête de trésor pour vivre une vie paisible à ses côtés.\n***** BRAVO, VOUS AVEZ DÉCOUVERT LA MEILLEURE DES FINS *****",
                [
                    { label: "Recommencer une nouvelle aventure 🔁", next: 1 },
                    { label: "Retour au menu 🏠", next: 0 },
                ]
            );
            break;

        case 34:
            render(
                "Vous restez muet. Elydia comprend votre silence puis vous parle d’un enfant capturé par un dragon. Acceptez-vous d’aller le sauver ?",
                [
                    { label: "Accepter d’aider 🧒", next: 29, recap: "- Accepter de sauver l’enfant\n" },
                ]
            );
            break;

        case 35:
            render(
                "Vous confrontez les hommes et ils finissent par partir. La villageoise est impressionnée ! Elle se présente : Elydia. Elle vous demande pourquoi vous êtes ici. Dire la vérité ou garder le silence ?",
                [
                    { label: "Dire la vérité 💬", next: 28, recap: "- Dire la vérité\n" },
                    { label: "Garder le silence 🤐", next: 34, recap: "- Rester muet\n" },
                ]
            );
            break;

        case 36:
            render(
                "Vous refusez l’aide des villageois et vous mourez de vos blessures en voulant revenir à votre bateau.",
                [
                    { label: "Recommencer une nouvelle aventure 🔁", next: 1 },
                    { label: "Retour au menu 🏠", next: 0 },
                ]
            );
            break;

        case 37:
            render(
                "Le vieux te regarde et t’annonce que tu as perdu cette épreuve — tu ne t’es pas montré digne de la connaissance proposée. Tu décides de l’attaquer, mais tu es téléporté sur ton bateau en direction de chez toi, sans moyen de faire demi-tour.",
                [
                    { label: "Recommencer une nouvelle aventure 🔁", next: 1 },
                    { label: "Retour au menu 🏠", next: 0 },
                ]
            );
            break;

        default:
            render("Fin de l’aventure. Merci d’avoir joué à ISLAND CHOICE !", [
                { label: "Retour au menu 🏠", next: 0 },
            ]);
    }
}