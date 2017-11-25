# SARAH-V5-Livebox
Node-RED node to connect Sarah framework to Orange Livebox TV decoder ![GitHub Logo](/images/livebox-node.jpg)

### Module Node-Red pour S.A.R.A.H V5

Ce module `sarah-livebox` permet d'émuler la télécommande du décodeur TV Livebox.

télécharger, extraire puis copier le repertoire **sarah-livebox** dans le dossier `\sarah\viseo-bot-framework\node_modules\`

relancer sarah

### configuration du module :

renseigner l'adresse ip et le port du serveur domoticz.

![GitHub Logo](/images/domoticz.png)

Copier le fichier xml **./grammar/sarah-domoticz.xml** dans le dossier grammar configuré sur le module **win-sarah**

modifier le fichier **sarah-domoticz.xml** pour qu'il corresponde à vos equipements sur domoticz

`out.action.plugin` ==> utilisé comme discriminant pour identifier le plugin

`out.action.device` ==> id du périphérique dans domoticz

`out.action.command` ==> **switch** / **status** en fonction de l'action à réaliser. (Piloter un périphérique ou recevoir un état)

`out.action.type` ==> **light** ou **scene**
	
`out.action.action` ==> **On** / **Off** / **temp** / **humidity**

dans le cas de plusieurs plugins utiliser un module **switch** avec comme discriminant `msg.payload.options.plugin` renvoyé par **win-sarah** (ici **domticz-http**)

![GitHub Logo](/images/switch.png)

![GitHub Logo](/images/flow_all.png)

### Inputs

- `msg.payload.options.plugin`:

à utiliser avec un module **switch** pour rediriger vers le bon plugin

valeur de `out.action.plugin` du fichier **sarah-domoticz.xml**

- `msg.payload.options.action`:

**On** / **Off** / **temp** / **humidity**

valeur de `out.action.action` du fichier **sarah-domoticz.xml**

- `msg.payload.options.command`:

**switch** / **status**

valeur de `out.action.command` du fichier **sarah-domoticz.xml**

- `msg.payload.options.device`:

**id** du device dans domoticz

valeur de `out.action.device` du fichier **sarah-domoticz.xml**

- `msg.payload.options.type`:

**light** / **scene**

valeur de `out.action.type` du fichier **sarah-domoticz.xml**

### Outputs

- `msg.payload`: renvoyé par win-sarah

- `msg.speak`: texte à lire par win-speak(ou autre)

![GitHub Logo](/images/speak1.png)

### Utilisation:

sarah allumes/eteins le salon

sarah mets rmc

sarah quelle est la température/humidité du salon

sarah comment est le salon
