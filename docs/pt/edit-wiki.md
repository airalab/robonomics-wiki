---
title: Como editar Wiki
contributors: [positivecrash]
description: Ways to help us improve our wiki
---

**A Robonomics Wiki é de código aberto. Quaisquer correções são bem-vindas: corrigir erros, erros de digitação, informações não claras ou desatualizadas, tradução para qualquer idioma. Você precisará de uma [GitHub](https://github.com/) conta.**


## Como editar

Se você precisar editar os documentos da Robonomics Wiki, siga estas etapas

Assegure-se de ter [Node.js](https://nodejs.org/en/download/package-manager/) e [Gridsome](https://gridsome.org/docs/#1-install-gridsome-cli-tool) instalado.

### 1. Clonar repositório

Primeiro, você precisa clonar o repositório da wiki:

```
git clone https://github.com/airalab/robonomics-wiki.git
```

Vá para o diretório do repositório e execute os seguintes comandos:

`usando npm`
```
cd robonomics-wiki
npm install 
```

`usando yarn`
```
cd robonomics-wiki
yarn install
```

### 2. Servir localmente (develop, develop-m1)

Em seguida, implante o projeto localmente: 

```
gridsome develop
```

> Se você tiver o erro `node: --openssl-legacy-provider is not allowed in NODE_OPTIONS`,, execute o seguinte comando:
```
gridsome develop-m1
```

### 3. Fazer PR

[Fazer solicitação de pull](https://docs.github.com/github/collaborating-with-issues-and-pull-requests/creating-a-pull-request) para [repositório da wiki](https://github.com/airalab/robonomics-wiki)

## Componentes

### Asciinema
A Robonomics Wiki tem suporte para Asciinema. Para inserir o Asciinema, siga estas instruções:
* Importe o componente após o bloco frontmatter `import Asciinema from '~/components/Asciinema.vue'`
* Insira como parágrafo separado `<Asciinema vid="WCFcx8C6M8e52UKDNei1xZloU"/>`, onde vid é o ID do asciicast específico

> Você pode obter o script do widget para um asciicast específico clicando no link “Embed” na página do asciicast.
> Parece assim:
> `<script src="https://asciinema.org/a/14.js" id="asciicast-14" async></script>`
[Documentação do Asciinema](https://asciinema.org/docs/embedding)

No exemplo acima, vid é 14.

### Código

Você pode adicionar extras úteis ao seu código: 

`código com botão de cópia`

```c
<code-helper copy>
  YOUR CODE HERE
</code-helper>
```

ou `código com linha adicional`

```c
<code-helper additionalLine="this line will be added above your code :)">
  YOUR CODE HERE
</code-helper>
```

**Propriedades para code-helper**

<probs-table :items="[{ id: 0, items: [{ name: 'copy', code: true}, {name: 'Boolean', code: true}, {name: false, code: true}, {name: false, code: true}, {name: 'add a copy button for your code'}]}, { id: 1, items: [{ name: 'additional line', code: true}, {name: 'String', code: true}, {name: false, code: true}, {name: null, code: false}, {name: `additional line for you code that will be displayed above`}]}]" />

<code-helper copy>

```bash
$ ls -l /dev/serial/by-id
```

</code-helper>

<code-helper copy additionalLine="your@helper">

```bash
$ ls -l /dev/serial/by-id
```

</code-helper>


### Frontmatter
Os documentos na Robonomics Wiki contêm um bloco frontmatter. Ele deve estar no topo do arquivo Markdown e deve ter a forma de YAML válido entre linhas tracejadas triplas. Entre as linhas tracejadas triplas, você pode definir ou editar as seguintes opções:

```YAML
---
title: How to contribute # Título da página, você não precisa duplicá-lo no texto
contributors: [positivecrash] # Principais colaboradores (que cuidam ativamente desta página). Apelido do GitHub necessário, sem nenhum símbolo adicional
tools:   
  - rust 1.62.0 
    https://blog.rust-lang.org/2022/06/30/Rust-1.62.0.html
  - Robonomics 1.4.0
  - baxter
    http://wiki.ros.org/melodic/Instalaration
    # Ferramentas que foram usadas para testes de tecnologia
---
```

### Grid 
Ajuda a adicionar layout de grade aos elementos:

- Use primeiro o componente de wrapper de grade: 

```c
<robo-wiki-grid-element-wrapper></robo-wiki-grid-element-wrapper>
```

- E então use quantos componentes de itens de grade você quiser dentro do wrapper:

```c
  <robo-wiki-grid-element-wrapper :columns="2" textAlign="center">
    <robo-wiki-grid-element>
      <robo-wiki-picture src="home-assistant/need_5.png" />
      <p>Zigbee smart devices (any from <a href="https://slsys.io/action/supported_devices.html">supported devices</a>)</p>
    </robo-wiki-grid-element>
    <robo-wiki-grid-element>
      <robo-wiki-picture src="home-assistant/need_6.png" /> 
      <p>Zigbee adapter <a href="https://jethome.ru/z2/">JetHome USB JetStick Z2</a> (or one of <a href="https://www.zigbee2mqtt.io/information/supported_adapters.html">supported</a>) or 
      <a href="https://easyeda.com/ludovich88/robonomics_sls_gateway_v01">Robonomics SLS Gateway</a></p>
    </robo-wiki-grid-element/>
  </robo-wiki-grid-element-wrapper>
```

**Propriedades para robo-wiki-grid-element-wrapper**

<probs-table :items="[{ id: 0, items: [{ name: 'columns', code: true}, {name: 'Number', code: true}, {name: false, code: true}, {name: 4, code: true}, {name: [{text: 'you can choose column number:'}, {text: `from`, codeText: ' 1 to 5'}]}]}, { id: 1, items: [{ name: 'align', code: true}, {name: 'String', code: true}, {name: false, code: true}, {name: null, code: false}, {name: [{text: 'align items on the block axis:'}, {text: `options:`, codeText: 'start, center, end'}]}]}, { id: 2, items: [{ name: 'justify', code: true}, {name: 'String', code: true}, {name: false, code: true}, {name: null, code: false}, {name: [{text: 'align items on the inline axis:'}, {text: `options:`, codeText: 'start, center, end'}]}]}, { id: 3, items: [{ name: 'textAlign', code: true}, {name: 'String', code: true}, {name: false, code: true}, {name: 'left', code: true}, {name: [{text: 'align text inside grid'}, {text: `options:`, codeText: 'left, center, right'}]}]}, ]" />


<robo-wiki-grid-element-wrapper textAlign="center">
  <robo-wiki-grid-element>
    <robo-wiki-picture src="home-assistant/need_1.png" /> 
    <p><a href="https://www.home-assistant.io/">Home Assistant</a> as control system software</p> 
  </robo-wiki-grid-element>
  <robo-wiki-grid-element>
    <robo-wiki-picture src="home-assistant/need_2.png" /> 
    <p>Raspberry Pi 4 (at least 2 GB RAM)</p>  
  </robo-wiki-grid-element>
  <robo-wiki-grid-element>
    <robo-wiki-picture src="home-assistant/need_3.png" /> 
    <p>SD card (minimum 16 GB)</p>  
  </robo-wiki-grid-element>
  <robo-wiki-grid-element>
    <robo-wiki-picture src="home-assistant/need_4.png" /> 
    <p>SD adapter</p>
  </robo-wiki-grid-element>
</robo-wiki-grid-element-wrapper>

<robo-wiki-grid-element-wrapper :columns="2" textAlign="center">
  <robo-wiki-grid-element>
    <robo-wiki-picture src="home-assistant/need_5.png" />
    <p>Zigbee smart devices (any from <a href="https://slsys.io/action/supported_devices.html">supported devices</a>)</p>
  </robo-wiki-grid-element>
  <robo-wiki-grid-element>
    <robo-wiki-picture src="home-assistant/need_6.png" /> 
    <p>Zigbee adapter <a href="https://jethome.ru/z2/">JetHome USB JetStick Z2</a> (or one of <a href="https://www.zigbee2mqtt.io/information/supported_adapters.html">supported</a>) or 
    <a href="https://easyeda.com/ludovich88/robonomics_sls_gateway_v01">Robonomics SLS Gateway</a></p>
  </robo-wiki-grid-element/>
</robo-wiki-grid-element-wrapper>


### Imagens

#### Como fazer upload 
Faça o upload da imagem na pasta `/docs/images/url-of-your-doc`
* Se a imagem precisar ser localizada, insira todas elas em uma única pasta
* Use um apêndice de localidade no nome das imagens se estiver localizado, por exemplo, `image_en.jpg`
* Certifique-se de que sua imagem esteja otimizada para a web e, ao mesmo tempo, tenha uma boa aparência

#### Como inserir 

Existem duas maneiras de inserir imagens em seus documentos:

<robo-wiki-note type="warning">

É recomendado inserir imagens com a tag embutida `<robo-wiki-picture>`, no entanto, você também pode usar o modo padrão para arquivos Markdown.

</robo-wiki-note>

`com legenda`

```c
<robo-wiki-picture link="/docs/community" src="example_image.jpg" caption="EXPLORE ROBONOMICS WIKI" />
```

`ou sem legenda` 

```c
<robo-wiki-picture link="/docs/community" src="example_image.jpg" />
```

`ou imagem simples` 

```c
<robo-wiki-picture src="example_image.jpg" />
```

`ou imagem simples com legenda`

```c
<robo-wiki-picture src="example_image.jpg" caption="EXPLORE ROBONOMICS WIKI" />
```

`imagem com texto alternativo`

```c
<robo-wiki-picture src="example_image.jpg" caption="EXPLORE ROBONOMICS WIKI" alt="this is alternative text for image" />
```
**Propriedades para robo-wiki-picture:**

<probs-table :items="[{ id: 0, items: [{ name: 'src', code: true}, {name: 'String', code: true}, {name: true, code: true}, {name: null, code: false}, {name: [{text: `path to the image:`}, {text: `if you uploaded your image directly to the /docs/images/ use:`, codeText: 'url-of-your-doc'}, {text: `if you uploaded image in one of the folders than use:`, codeText:  `folder-name/url-of-your-doc`}]}]}, { id: 1, items: [{ name: 'link', code: true}, {name: 'String', code: true}, {name: false, code: true}, {name: null, code: false}, {name: `link to the needed page`}]}, {id: 2, items: [{ name: 'caption', code: true}, {name: 'String', code: true}, {name: false, code: true}, {name: null, code: false}, {name: `caption for the image`}]}]" />

### Notas e avisos
Você pode adicionar notas e atribuir a elas tipos específicos:
* warning (<span style="color:#f08432">**orange color**</span>)
* okay (<span style="color:#3eaf7c">**green color**</span>)
* note (<span style="color:#90a4b7">**grey color**</span>)

`nota com título`

```c
<robo-wiki-note type="okay" title="Some information about robots" />
```

`nota com conteúdo`

```c
<robo-wiki-note type="okay">Fascinating information about robonomics here only</robo-wiki-note>
```

`nota com título e conteúdo`

```c
<robo-wiki-note type="okay" title="Robonomics for you">
  Fascinating information about robonomics here only
</robo-wiki-note>
```

<robo-wiki-note type="okay" title="Join Discord">

[Join Robonomics Developers Discord](https://discord.gg/jTxqGeF5Qy) to connect with community and get technical support.

</robo-wiki-note>

<robo-wiki-note type="note" title="Join Discord">

[Join Robonomics Developers Discord](https://discord.gg/jTxqGeF5Qy) to connect with community and get technical support.

</robo-wiki-note>

<robo-wiki-note type="warning" title="Join Discord">

[Join Robonomics Developers Discord](https://discord.gg/jTxqGeF5Qy) to connect with community and get technical support.

</robo-wiki-note>

**Propriedades para robo-wiki-note**

<probs-table :items="[{ id: 0, items: [{ name: 'type', code: true}, {name: 'String', code: true}, {name: false, code: true}, {name: 'note', code: false}, {name: [{text: `there are three types in total:`, codeText: 'note, warning, okay'}]}]}, { id: 1, items: [{ name: 'title', code: true}, {name: 'String', code: true}, {name: false, code: true}, {name: null, code: false}, {name: `adds title to your note`}]}]" />

### Tabs
Você pode adicionar abas ao documento:

- Use o componente de wrapper de abas: 

```c
<robo-wiki-tabs></robo-wiki-tabs>
```

- E então use quantos componentes de itens de aba você quiser dentro do wrapper:

```c
  <robo-wiki-tabs>
    <robo-wiki-tab title="Linux">
      <pre>ip a</pre>
    </robo-wiki-tab>
    <robo-wiki-tab title="OSX">
      ifconfig
    </robo-wiki-tab>
  </robo-wiki-tabs>
```


`abas horizontais`

```c
  <robo-wiki-tabs>
    <robo-wiki-tab title="Linux">
      <pre>ip a</pre>
    </robo-wiki-tab>
    <robo-wiki-tab title="OSX">
      ifconfig
    </robo-wiki-tab>
  </robo-wiki-tabs>
```

`abas verticais`

```c
  <robo-wiki-tabs mode="vertical">
    <robo-wiki-tab title="Linux">
      <pre>ip a</pre>
    </robo-wiki-tab>
    <robo-wiki-tab title="OSX">
      <pre>ifconfig</pre>
    </robo-wiki-tab>
  </robo-wiki-tabs>
```

`item de aba com borda`

```c
  <robo-wiki-tabs>
    <robo-wiki-tab title="Linux">
      <pre>ip a</pre>
    </robo-wiki-tab>
    <robo-wiki-tab title="OSX" border>
      ifconfig
    </robo-wiki-tab>
  </robo-wiki-tabs>
```

**Propriedades para robo-wiki-tabs (wrapper)**

<probs-table :items="[{ id: 0, items: [{ name: 'mode', code: true}, {name: 'String', code: true}, {name: false, code: true}, {name: 'horizontal', code: false}, {name: [{text: 'you can choose tabs mode:'}, {text: ``, codeText: ' horizontal'}, {text: ``, codeText: 'vertical'}]}]}]" />

**Propriedades para robo-wiki-tab (item)**

<probs-table :items="[{ id: 0, items: [{ name: 'title', code: true}, {name: 'String', code: true}, {name: true, code: true}, {name: null, code: false}, {name: 'title for the tab'}]}, { id: 1, items: [{ name: 'border', code: true}, {name: 'Boolean', code: true}, {name: false, code: true}, {name: false, code: true}, {name: 'add border to the content wrapper'}]}]" />


<robo-wiki-tabs>
  <robo-wiki-tab title="Linux">
    <pre>ip a</pre>
  </robo-wiki-tab>
  <robo-wiki-tab title="OSX" border >
      ifconfig 
  </robo-wiki-tab>
</robo-wiki-tabs>


<robo-wiki-tabs mode="vertical">
  <robo-wiki-tab title="Linux">
    <pre>ip a</pre>
  </robo-wiki-tab>
  <robo-wiki-tab title="OSX">
    <pre>ifconfig</pre>
  </robo-wiki-tab>
</robo-wiki-tabs>


### Título com âncoras
Você pode criar títulos personalizados com âncoras e atribuir a eles um valor específico

`título com âncora`

```c
<robo-wiki-title :type="2" anchor="Some information about robots"> 
  Learn Robonomics :)
</robo-wiki-title>
```

ou

`título sem âncora`

```c
<robo-wiki-title :type="5"> 
  Learn with us ;)
</robo-wiki-title>
```

**Propriedades para robo-wiki-title**

<probs-table :items="[{ id: 0, items: [{ name: 'type', code: true}, {name: 'Number (from 2 to 6)', code: true}, {name: true, code: true}, {name: null, code: false}, {name: 'choose heading level'}]}, { id: 1, items: [{ name: 'anchor', code: true}, {name: 'String', code: true}, {name: false, code: true}, {name: null, code: false}, {name: `value for the anchor`}]}]" />

<robo-wiki-title :type="6"> 
 I'm custom title :)
</robo-wiki-title>

### Vídeos

Existem duas maneiras de inserir vídeos em seus documentos:

<robo-wiki-note type="warning">

É recomendado inserir vídeos com a tag embutida `<robo-wiki-video>`, no entanto, você também pode usar o modo padrão para arquivos Markdown.

</robo-wiki-note>

#### IPFS / Server
Você precisa especificar o formato do vídeo

<robo-wiki-note type="warning" title="About gateways">

Gateway for the link is chosen automatically from config file - `data/video_config.yaml`. You can add or remove some gateways by changing the file.

</robo-wiki-note>

```c
<robo-wiki-video autoplay loop controls :videos="[{src: 'QmdZKkPJCa9GEN43iUBX81jfrFTDxcn7J6wWURrwNVwcKx', type:'webm'}, {src: 'QmStCDsEHCYwVYvnDdmZBMnobPmrgZx3iJLm65b8XNzKQa', type:'mp4'}]" />
```

#### Local

```c
<robo-wiki-video autoplay loop controls :videos="[{src: '/videos/add-ext.mp4', type:'mp4'}]" />
```

##### Propriedades

- Se você estiver adicionando um arquivo com tamanho superior a <span style="color:#af1c1c">10MB</span>, please, upload it on server, not in repo.

- Você pode usar qualquer propriedade para [HTML5 video tag](https://www.w3schools.com/tags/tag_video.asp).

- Formatos aceitáveis - mp4, webm, ogg.

<probs-table :items="[{ id: 0, items: [{ name: 'videos', code: true}, {name: 'Array', code: true}, {name: true, code: true}, {name: null, code: false}, {name: [{text: `Array of objects [{src: 'path to video', type: 'type of video'}]`}]}]}]" />


#### YouTube 
Você pode incorporar qualquer vídeo do YouTube no documento inserindo o link de compartilhamento como um parágrafo separado, sem aspas ou tags adicionais, por exemplo: `https://youtu.be/kQaSwNYHJQ8`

No entanto, se você precisar de reprodução automática, deverá usar um componente especial:

```c
<robo-wiki-youtube autoplay link="https://www.youtube.com/watch?v=5s4-S_z4VYE" />
```

**Propriedades para robo-wiki-youtube**

<probs-table :items="[{ id: 0, items: [{ name: 'link', code: true}, {name: 'String', code: true}, {name: true, code: true}, {name: null, code: false}, {name: [{text: `link to youtube video`}]}]}, { id: 1, items: [{ name: 'autoplay', code: true}, {name: 'Boolean', code: true}, {name: false, code: true}, {name: false, code: true}, {name: [{text: `autoplays youtube video`}]}]}, { id: 2, items: [{ name: 'loop', code: true}, {name: 'Boolean', code: true}, {name: false, code: true}, {name: false, code: true}, {name: [{text: `loop youtube video`}]}]}]" />


## Como editar a navegação da barra lateral

Se você precisar editar a navegação da barra lateral da Robonomics Wiki, siga estas etapas:

* Editar arquivo `/data/sidebar_docs.yaml`.

* Decidir onde colocar seu documento

* Use YAML válido para `/data/sidebar_docs.yaml` e confie na estrutura de arquivo existente

* **NOTA IMPORTANTE:** se você estiver usando o mesmo documento em diferentes seções/subseções, por exemplo: 

```

    - title_en: Upgrade Home Assistant OS
      items:
        - title_en: Buying a Subscription
          link: /docs/sub-activate
    - title_en: Imagem pré-instalada para Raspberry Pi
      items:
        - title_en: Buying a Subscription
          link: /docs/sub-activate

```

VERIFIQUE SE ADICIONAR O PARÂMETRO `topic` COMO ESTE: 

(para que a navegação funcione corretamente)

```
    - title_en: Upgrade Home Assistant OS
      items:
        - title_en: Buying a Subscription
          link: /docs/sub-activate
          topic: Upgrade Home Assistant OS
    - title_en: Imagem pré-instalada para Raspberry Pi
      items:
        - title_en: Buying a Subscription
          link: /docs/sub-activate
          topic: Pre-installed Image For Raspberry Pi

```

## Como adicionar navegação personalizada para documentos

* Edite o arquivo `/data/sidebar_docs.yaml`.

* Encontre o documento correto e adicione os parâmetros `prev` e `next` assim:

```
    - title_en: How to Edit Wiki
      link: /docs/edit-wiki
      prev: 
        - title: title of the previous page
          link: /docs/prev_page_url
      next: 
        - title: title of the next page
          link: /docs/next_page_url

```

* Se você deseja remover completamente a navegação, adicione o parâmetro `withoutNav`:

```
    - title_en: How to Edit Wiki
      link: /docs/edit-wiki
      withoutNav: true
```

* Se você deseja remover apenas a navegação `página anterior` ou `próxima página`, adicione o parâmetro `withoutPrev` ou `withoutNext`:

```
- title_en: How to Edit Wiki
link: /docs/edit-wiki
withoutPrev: true
```

ou

```
- title_en: How to Edit Wiki
link: /docs/edit-wiki
withoutNext: true
```