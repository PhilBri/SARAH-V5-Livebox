# SARAH-V5-Livebox 

Node-RED node to connect Sarah framework to Orange Livebox TV decoder.

### Module Node-Red pour S.A.R.A.H V5

Le module `LiveboxRemote` permet d'émuler la télécommande du décodeur TV Livebox.

<img src="../master/images/liveboxnode.PNG" width="20%" height="20%"/>

### Installation :

- Télécharger, extraire puis copier le repertoire **Livebox-V5** dans le dossier `\sarah\viseo-bot-framework\node_modules\`.
- Copier le fichier **./grammar/sarah-livebox.xml** dans le dossier configuré dans le module (node) **SARAH** (win-sarah).
Par defaut, il s'agit du répertoire `sarah\viseo-bot-project\data\grammar`.
- Relancez via la commande **start.bat** et actualisez l'onglet de votre explorateur.

### Configuration du module :

- Ouvrez l'onglet de l'editeur ci-dessous (double click sur l'icone du module).

<img src="../master/images/liveboxconfig.PNG" width="50%" height="50%"/>

- Renseigner :
  - L'adresse **IP** du décodeur.
  - Le numéro du **port** qui est le **8080** par défaut n'est généralement pas à changer !

### Inputs

- `msg.payload.options.plugin`:
**livebox**
  - A utiliser avec un module **switch** pour rediriger vers le bon plugin...
  - Valeur de `out.action.plugin` du fichier **sarah-livebox.xml**

- `msg.payload.options.action`:

**On** / **Off** / **temp** / **humidity**

valeur de `out.action.action` du fichier **sarah-livebox.xml**

- `msg.payload.options.command`:

**switch** / **status**

valeur de `out.action.command` du fichier **sarah-livebox.xml**

### Outputs

- Objet JSON `msg.payload`: renvoyé par win-sarah

- Objet JSON `msg.speak`: texte à lire par win-speak (ou autre).

### Utilisation:

sarah {allumes,eteins} la {box,livebox}

sarah mets {la, la chaine, le programme} {3, france 3}

sarah appui sur la touche 1 de la {box, livebox}

sarah monte le son de la {box, livebox}
