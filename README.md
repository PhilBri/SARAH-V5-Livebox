# SARAH-V5-Livebox (incomplet... en cours de publication...)

> Node-RED node to connect Sarah framework to Orange Livebox TV decoder.
>
> <img src="./images/liveboxnode.svg" width="20%" height="20%"/>

### Module Node-Red pour S.A.R.A.H V5

Le module `sarah-livebox` permet d'émuler la télécommande du décodeur TV Livebox.

## ★ Installation

1. Télécharger, extraire puis copier le repertoire **sarah-livebox** dans le dossier `\sarah\viseo-bot-framework\node_modules\`.

2. Copier le fichier **./grammar/sarah-livebox.xml** dans le dossier configuré dans le module **SARAH** (win-sarah).
Par defaut, il s'agit du répertoire `sarah\viseo-bot-project\data\grammar`.

3. Relancez via la commande **start.bat** et actualisez l'onglet de votre explorateur.

## ★ Configuration du module <img src="./images/liveboxnode.svg" width="13%" height="13%"/>

- Ouvrez l'onglet de l'editeur comme ci-dessous.

  <img src="./images/liveboxconfig.PNG" width="50%" height="50%"/>

- Renseigner les champs :

  - <code>Host</code> : L'adresse **IP** du décodeur.
  - <code>Port</code> : Le numéro du **Port** qui est le **8080** par défaut, n'est généralement pas à changer !

## ★ Fontionnement

### Inputs

Aprés reconnaissance de la commande vocale - selon les paramétres du fichier **sarah-livebox.xml** - le module **SARAH** (win-sarah) passe l'objet ci-dessous en entrée.

- `msg.payload` : {JSON} **"options"**
  
  ##### Exemple de retour pour la commande ➜ ```SARAH coupe le son de la box``` (mute).

    ```json
    {
      "options":
        {
          "plugin": "livebox",
          "cmd": "Mute"
        }
    }
    ```

#### La valeur *`plugin`* est toujours présente dans le retour.

- `msg.payload.options.plugin` : {string} **"livebox"**.

  - Le module teste la valeur **livebox** pour valider la commande _(Nul besoin d'un module **switch** pour rediriger vers le bon plugin...)_.
  - Valeur de `out.action.plugin` du fichier **sarah-livebox.xml**
  
#### Les valeurs *`stby`*, *`cmd`* et *`epg`* sont présentes dans le retour suivant les cas et les commandes à envoyer à la livebox.

- `msg.payload.options.stby` : {string} **"0"** ou **"1"**

  - Teste l'état de la Livebox, allumée ou en veille.
  - Valeur de `out.action.stby` du fichier **sarah-livebox.xml**

- `msg.payload.options.cmd` : {string} **"commandes"**

  - Correspond à l'appui "physique" sur les touches de la télécommande (Volume, digits, prog, etc...).
  - Valeur de `out.action.cmd` du fichier **sarah-livebox.xml**.
  
- `msg.payload.options.epg` : {string} **"code\_EPG\_de\_la\_chaîne"**.

  - Permet d'appeler une chaîne directement grâce à son code **EPG**, sans avoir à simuler d'appuis sur la ou les touches de la télécommande.
  - Valeur de `out.action.epg` du fichier **sarah-livebox.xml**.

### Outputs

Aprés l'envoi de la requète à la Livebox, le module renvoie (en sortie) le résultat de l'action.

- `msg.payload` : {JSON} **"result"**

  ##### Exemple de retour ➜ Commande OK.
  
    ```json
    {
      "result":
        {
          "responseCode": "0",
          "message": "ok",
          "data": {}
        }
    }
    ```

- `msg.payload`: {JSON} **"tts"**

    ```json
    {
      "tts": "c'est fait"
    }
    ```

  - Text-To-Speech destiné au module **SARAH** (win-speak), ou autre...

## ★ Utilisation

- Les commandes disponibles sont listées dans le fichier **sarah-livebox.xml**.
- Exemples :

    ```sarah {allumes,eteins} la {box,livebox}```

    ```sarah mets {la, la chaine, le programme} {3, france 3}```

    ```sarah appui sur la touche 1 de la {box, livebox}```

    ```sarah monte le son de la {box, livebox}```

## ★ Compatibilité

Normalement, tous les decodeurs Orange Livebox sont compatibles.

## ★ Restrictions

Le décodeur TV V5 ne peux pas (pour l'instant) être allumé lorsqu'il est en veille profonde...
Il vous faudra donc l'allumer manuelement avant de l'utiliser...
