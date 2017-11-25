# SARAH-V5-Livebox (incomplet... en cours de publication...)

> Node-RED node to connect Sarah framework to Orange Livebox TV decoder.
>
> <img src="../master/images/liveboxnode.PNG" width="20%" height="20%"/>

### Module Node-Red pour S.A.R.A.H V5

Le module `LiveboxRemote` permet d'émuler la télécommande du décodeur TV Livebox.

## Installation

- Télécharger, extraire puis copier le repertoire **Livebox-V5** dans le dossier `\sarah\viseo-bot-framework\node_modules\`.

- Copier le fichier **./grammar/sarah-livebox.xml** dans le dossier configuré dans le node **SARAH** (win-sarah).
Par defaut, il s'agit du répertoire `sarah\viseo-bot-project\data\grammar`.

- Relancez via la commande **start.bat** et actualisez l'onglet de votre explorateur.

## Configuration du module

- Ouvrez l'onglet de l'editeur ci-dessous (double click sur l'icone du module).<img src="../master/images/liveboxconfig.PNG" width="50%" height="50%"/>

- Renseigner les champs :

  - <code>Host</code> : L'adresse **IP** du décodeur.
  - <code>Port</code> : Le numéro du **Port** qui est le **8080** par défaut, n'est généralement pas à changer !

## Inputs

Aprés reconnaissance vocale, le node **SARAH** retourne l'objet suivant selon les directives notées dans le fichier **sarah-livebox.xml**.

- `msg.payload` : {JSON} **"options"**

    ```json
    Exemple de retour = Envoyer commande pour couper le son (mute)...
    {
      "options":
        {
          "plugin": "livebox",
          "cmd": "Mute"
        }
    }
    ```
> ##### La valeur *`plugin`* est toujours présente dans le retour.

- `msg.payload.options.plugin` : {string} **"livebox"**.

  - A utiliser avec un module **switch** pour rediriger vers le bon plugin...
  - Valeur de `out.action.plugin` du fichier **sarah-livebox.xml**
  
> ##### Les valeurs *`stby`*, *`cmd`* et *`epg`* sont présentes dans le retour suivant les cas et les commandes à envoyer à la livebox.

- `msg.payload.options.stby` : {string} **"0"** ou **"1"**

  - Teste l'état de la Livebox, allumée ou en veille.
  - Valeur de `out.action.stby` du fichier **sarah-livebox.xml**

- `msg.payload.options.cmd` : {string} **"commandes"**

  - Correspond à l'appui "physique" sur les touches de la télécommande (Volume, digits, prog, etc...).
  - Valeur de `out.action.cmd` du fichier **sarah-livebox.xml**.
  
- `msg.payload.options.epg` : {string} **"code\_EPG\_de\_la\_chaîne"**.

  - Permet d'appeler une chaîne directement grâce à son code **EPG**, sans avoir à simuler d'appuis sur la ou les touches de la télécommande.
  - Valeur de `out.action.epg` du fichier **sarah-livebox.xml**.

## Outputs

- `msg.payload` : {JSON} **"result"**

   - Retour de la livebox concernant la commande envoyée.
  
    ```json
    Exemple de retour = commande envoyée traitée et OK...
    {
      "result":
        {
          "responseCode": "0",
          "message": "ok",
          "data": {}
        }
    }
    ```

- `msg.speak`: {JSON} **"tts"**

  - Texte à lire par le node <code>Speak</code> (win-speak), ou autre...

## Utilisation

- Les commandes disponibles sont listées dans le fichier **sarah-livebox.xml**.
- Exemples :

    ```sarah {allumes,eteins} la {box,livebox}```

    ```sarah mets {la, la chaine, le programme} {3, france 3}```

    ```sarah appui sur la touche 1 de la {box, livebox}```

    ```sarah monte le son de la {box, livebox}```

## Compatibilité

Normalement, tous les decodeurs Orange Livebox sont compatibles.

## Restrictions

Le décodeur TV V4 ne peux pas (pour l'instant) être allumé lorsqu'il est en veille profonde...
Il vous faudra donc l'allumer manuelement avant de l'utiliser...
